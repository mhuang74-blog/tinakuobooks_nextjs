import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Legacy Chinese routes are exported as flat .html files (or moved to
      // directory indexes by scripts/postbuild.mjs). Plain anchors keep those
      // navigations as full page loads so no RSC payload is required.
      '@next/next/no-html-link-for-pages': 'off',
      // The site is a static export with unoptimized images; next/image cannot
      // run its optimizer without a server.
      '@next/next/no-img-element': 'off',
      // AdSense must load before the page becomes interactive to measure
      // impressions on static pages.
      '@next/next/no-before-interactive-script-outside-document': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
  ]),
])
