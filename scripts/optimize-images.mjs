import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'assets/source-images')
const IMAGES_OUT = path.join(ROOT, 'public/images')
const OG_OUT = path.join(ROOT, 'public/og')
const PDF_SRC = path.join(ROOT, 'assets/files/57號小豹著色本.pdf')
const PDF_OUT = path.join(ROOT, 'public/assets/files/57號小豹著色本.pdf')
const OG_BG = '#F7F1E6'
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i
const OG_PREFIXES = ['book-cover-', 'play-cover-', 'post-cover-']

let generated = 0

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listImages(full)
    return entry.isFile() && IMAGE_EXT.test(entry.name) ? [full] : []
  })
}

const images = listImages(SRC)

for (const file of images) {
  const base = path.parse(file).name
  const maxWidth = base.startsWith('bio-photo-') ? 800 : 1600

  await sharp(file)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(IMAGES_OUT, `${base}.webp`))
  generated += 1

  if (OG_PREFIXES.some((prefix) => base.startsWith(prefix))) {
    await sharp(file)
      .rotate()
      .resize({
        width: 1200,
        height: 630,
        fit: 'contain',
        background: OG_BG,
        withoutEnlargement: false,
      })
      .flatten({ background: OG_BG })
      .jpeg({ quality: 82 })
      .toFile(path.join(OG_OUT, `${base}.jpg`))
    generated += 1
  }

  if (base === 'blog-cover-tina') {
    await sharp(file)
      .rotate()
      .resize({ width: 1200, height: 630, fit: 'cover' })
      .jpeg({ quality: 82 })
      .toFile(path.join(OG_OUT, 'home.jpg'))
    generated += 1
  }
}

// Turtle logo: keep PNG (favicon + inline logo) and mirror it into the app dir.
const logo = path.join(SRC, 'turtle-brown-02.png')
if (fs.existsSync(logo)) {
  fs.copyFileSync(logo, path.join(IMAGES_OUT, 'turtle-brown-02.png'))
  fs.copyFileSync(logo, path.join(ROOT, 'app/icon.png'))
  generated += 2
}

// Legacy download URL must keep working.
if (fs.existsSync(PDF_SRC)) {
  fs.copyFileSync(PDF_SRC, PDF_OUT)
  generated += 1
}

console.log(`Generated ${generated} files from ${images.length} source images.`)
