// Composes the 5:7 portrait source for《57號小豹》from the landscape flat scan.
//
// The picture book ships landscape art, so its shelf card needs a portrait asset.
// `book-cover-57號小豹-flat.jpg` is a photo scan: magenta spine + fold on the left,
// ~1% paper margin, a drop shadow under the book, and keystone (the cover's top
// edge runs y=9→48 and its bottom edge y=772→732 across x). A plain extract box
// cannot remove every margin without slicing the artwork, so instead each column
// is resampled vertically between the detected top and bottom cover edges, the
// fold is dropped, and the rectified cover is centred on a 5:7 canvas filled with
// the cover's own background green.
//
// Run before `pnpm images` (which turns this file into the webp/OG outputs):
//   node scripts/compose-leopard-portrait.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'assets/source-images/book-cover-57號小豹-flat.jpg')
const OUT = path.join(ROOT, 'assets/source-images/book-cover-57號小豹-portrait.jpg')

const X0 = 54 // first front-cover column; the spine and its fold shading end around x=49
const X1 = 991 // last front-cover column; paper starts after this
const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 1400 // 5:7
const JPEG_QUALITY = 92
const BG_SAMPLE_ROWS = 40 // rows of the rectified cover averaged for the fill colour

const isPaper = (p) => Math.min(p[0], p[1], p[2]) >= 240 && saturation(p) < 12

function saturation(p) {
  return Math.max(p[0], p[1], p[2]) - Math.min(p[0], p[1], p[2])
}

// Least squares fit with two rounds of 2px outlier rejection, so JPEG noise at a
// single column cannot tilt the edge line.
function fitLine(points) {
  let kept = points
  let slope = 0
  let intercept = 0
  for (let round = 0; round < 4; round++) {
    const n = kept.length
    const sx = kept.reduce((sum, [x]) => sum + x, 0)
    const sy = kept.reduce((sum, [, y]) => sum + y, 0)
    const sxx = kept.reduce((sum, [x]) => sum + x * x, 0)
    const sxy = kept.reduce((sum, [x, y]) => sum + x * y, 0)
    slope = (n * sxy - sx * sy) / (n * sxx - sx * sx)
    intercept = (sy - slope * sx) / n
    kept = kept.filter(([x, y]) => Math.abs(y - (slope * x + intercept)) <= 2)
  }
  return (x) => slope * x + intercept
}

if (!fs.existsSync(SRC)) throw new Error(`missing source scan: ${SRC}`)

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
const pixel = (x, y) => {
  const i = (y * width + x) * channels
  return [data[i], data[i + 1], data[i + 2]]
}

// Top edge: first row that is not paper. Bottom edge: last row that is still
// coloured — below the book is a neutral drop shadow, then paper.
const topSamples = []
const bottomSamples = []
for (let x = X0; x <= X1; x++) {
  let top = 0
  while (top < height && (isPaper(pixel(x, top)) || isPaper(pixel(x, top + 1)))) top++
  topSamples.push([x, top])

  let bottom = height - 1
  while (bottom > 0 && saturation(pixel(x, bottom)) < 12) bottom--
  bottomSamples.push([x, bottom])
}

const topAt = fitLine(topSamples)
const bottomAt = fitLine(bottomSamples)
const spanAt = (x) => bottomAt(x) - topAt(x)

const artWidth = X1 - X0 + 1
const artHeight = Math.round((spanAt(X0) + spanAt(X1)) / 2)
const rectified = Buffer.alloc(artWidth * artHeight * 3)

// Per-column vertical resample: map each column's own cover span onto artHeight,
// which removes the keystone without cropping any artwork.
for (let u = 0; u < artWidth; u++) {
  const x = X0 + u
  const top = topAt(x)
  const step = spanAt(x) / artHeight
  for (let v = 0; v < artHeight; v++) {
    const sy = Math.min(height - 1.001, Math.max(0, top + (v + 0.5) * step))
    const y0 = Math.floor(sy)
    const weight = sy - y0
    const above = pixel(x, y0)
    const below = pixel(x, y0 + 1)
    const o = (v * artWidth + u) * 3
    for (let c = 0; c < 3; c++) {
      rectified[o + c] = Math.round(above[c] * (1 - weight) + below[c] * weight)
    }
  }
}

const art = await sharp(rectified, { raw: { width: artWidth, height: artHeight, channels: 3 } })
  .resize({ width: CANVAS_WIDTH })
  .toBuffer({ resolveWithObject: true })

// Fill colour: the cover's own background sampled just inside its top edge.
const { data: artData } = await sharp(art.data, {
  raw: { width: art.info.width, height: art.info.height, channels: 3 },
})
  .raw()
  .toBuffer({ resolveWithObject: true })
const sums = [0, 0, 0]
let samples = 0
for (let y = 2; y < BG_SAMPLE_ROWS; y++) {
  for (let x = 2; x < art.info.width - 2; x++) {
    const i = (y * art.info.width + x) * 3
    for (let c = 0; c < 3; c++) sums[c] += artData[i + c]
    samples++
  }
}
const background = `#${sums
  .map((sum) => Math.round(sum / samples).toString(16).padStart(2, '0'))
  .join('')}`

const top = Math.round((CANVAS_HEIGHT - art.info.height) / 2)
await sharp({
  create: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, channels: 3, background },
})
  .composite([
    {
      input: art.data,
      raw: { width: art.info.width, height: art.info.height, channels: 3 },
      top,
      left: 0,
    },
  ])
  .jpeg({ quality: JPEG_QUALITY })
  .toFile(OUT)

console.log(
  `Wrote ${path.relative(ROOT, OUT)} ${CANVAS_WIDTH}x${CANVAS_HEIGHT} ` +
    `(art ${art.info.width}x${art.info.height}, fill ${background}, top margin ${top}px).`,
)
