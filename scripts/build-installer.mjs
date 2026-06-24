import { execSync } from 'child_process'
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const CS_SRC = join(root, 'installer', 'SubtitleFlowSetup.cs')
const OUTPUT_EXE = join(root, 'installer', 'SubtitleFlowSetup.exe')
const PUBLIC_DIR = join(root, 'public', 'downloads')
const PUBLIC_EXE = join(PUBLIC_DIR, 'SubtitleFlow-Setup.exe')

async function buildInstaller() {
  console.log('Building Windows installer...')

  const csc = 'C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\csc.exe'

  if (!existsSync(csc)) {
    console.log('  C# compiler not found (not Windows). Skipping installer build.')
    return
  }

  const args = [
    `/out:${OUTPUT_EXE}`,
    '/target:exe',
    '/reference:System.IO.Compression.dll',
    '/reference:System.IO.Compression.FileSystem.dll',
    '/reference:System.Net.dll',
    '/platform:anycpu',
    '/optimize+',
    CS_SRC,
  ]

  try {
    execSync(`"${csc}" ${args.join(' ')}`, { stdio: 'pipe', timeout: 30000 })
    console.log('  Compiled: SubtitleFlowSetup.exe')

    if (!existsSync(PUBLIC_DIR)) {
      mkdirSync(PUBLIC_DIR, { recursive: true })
    }

    copyFileSync(OUTPUT_EXE, PUBLIC_EXE)
    console.log(`  Published: ${PUBLIC_EXE}`)

    const sizeKB = statSync(PUBLIC_EXE).size / 1024
    console.log(`  Size: ${sizeKB.toFixed(1)} KB`)

    rmSync(OUTPUT_EXE)
    console.log('  Installer build complete!')
  } catch (err) {
    console.error(`  Build failed: ${err.message}`)
  }
}

buildInstaller().catch(err => {
  console.error('Installer build error:', err.message)
})
