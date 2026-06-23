import { cpSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const src = join(root, 'dist', 'assets')
const dest = join(root, 'assets')

if (existsSync(src)) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true })
  cpSync(src, dest, { recursive: true, dereference: true })
  console.log('Copied dist/assets/ to assets/')
} else {
  console.log('dist/assets/ not found, skipping copy')
}
