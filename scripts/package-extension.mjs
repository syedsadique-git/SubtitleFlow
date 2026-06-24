import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const EXTENSION_SRC = join(root, 'extension')
const OUTPUT_DIR = join(root, 'public', 'downloads')
const ZIP_NAME = 'subtitleflow-extension-v1.0.0.zip'
const OUTPUT_PATH = join(OUTPUT_DIR, ZIP_NAME)

const files = [
  'manifest.json',
  'background.js',
  'content.js',
  'popup.html',
  'popup.js',
  'popup.css',
  'styles.css',
  'icons/icon16.svg',
  'icons/icon48.svg',
  'icons/icon128.svg',
]

async function buildZip() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log('Packaging SubtitleFlow extension...')

  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  for (const file of files) {
    const srcPath = join(EXTENSION_SRC, file)
    try {
      const content = readFileSync(srcPath)
      zip.file(file, content)
      console.log(`  Added: ${file}`)
    } catch (err) {
      console.error(`  ERROR: Could not read ${file}: ${err.message}`)
    }
  }

  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } })
  writeFileSync(OUTPUT_PATH, content)

  const sizeKB = (content.length / 1024).toFixed(1)
  console.log(`\nExtension packaged successfully!`)
  console.log(`  Output: ${OUTPUT_PATH}`)
  console.log(`  Size:   ${sizeKB} KB`)
}

buildZip().catch(console.error)
