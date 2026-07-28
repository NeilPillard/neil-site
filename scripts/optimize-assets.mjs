import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = path.resolve(import.meta.dirname, '..')
const sourceDirectory = path.join(projectRoot, 'public', 'deck-assets')
const outputDirectory = path.join(sourceDirectory, 'optimized')

const assets = ['mockup', 'intro', 'journey', 'solution', 'neil', 'aazam']
const extensions = {
  mockup: 'png',
  intro: 'jpg',
  journey: 'jpg',
  solution: 'jpg',
  neil: 'jpg',
  aazam: 'jpg',
}

await mkdir(outputDirectory, { recursive: true })

for (const asset of assets) {
  const source = path.join(sourceDirectory, `${asset}.${extensions[asset]}`)

  for (const width of [640, 1200]) {
    const pipeline = sharp(source).resize({
      width,
      withoutEnlargement: true,
    })

    await Promise.all([
      pipeline
        .clone()
        .avif({ quality: 68, effort: 5 })
        .toFile(path.join(outputDirectory, `${asset}-${width}.avif`)),
      pipeline
        .clone()
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(outputDirectory, `${asset}-${width}.webp`)),
    ])
  }
}

await sharp(path.join(sourceDirectory, 'intro.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 86, progressive: true })
  .toFile(path.join(projectRoot, 'public', 'og-kouponly.jpg'))
