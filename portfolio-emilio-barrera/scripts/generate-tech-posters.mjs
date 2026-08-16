import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  siJavascript,
  siSharp,
  siTypescript,
  siReact,
  siTailwindcss,
  siHtml5,
  siCss,
  siVite,
  siNodedotjs,
  siFastify,
  siDotnet,
  siOpenapiinitiative,
  siMongodb,
  siPostgresql,
  siMongoose,
  siDocker,
  siVercel,
  siRender,
  siGit,
  siGithub,
  siPostman,
  siPnpm,
  siCursor,
} from 'simple-icons'
import { technologies } from '../src/data/technologies.js'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const outputDirectory = path.resolve(currentDirectory, '../assets/tech-posters')

const iconMap = {
  SiJavascript: siJavascript,
  SiSharp: siSharp,
  SiTypescript: siTypescript,
  SiReact: siReact,
  SiTailwindcss: siTailwindcss,
  SiHtml5: siHtml5,
  SiCss3: siCss,
  SiVite: siVite,
  SiNodedotjs: siNodedotjs,
  SiFastify: siFastify,
  SiDotnet: siDotnet,
  SiOpenapiinitiative: siOpenapiinitiative,
  SiMongodb: siMongodb,
  SiPostgresql: siPostgresql,
  SiMongoose: siMongoose,
  SiDocker: siDocker,
  SiVercel: siVercel,
  SiRender: siRender,
  SiGit: siGit,
  SiGithub: siGithub,
  SiPostman: siPostman,
  SiPnpm: siPnpm,
  SiCursor: siCursor,
  SiOpenai: null,
}

const fontFamilies = {
  'font-space-grotesk': 'Space Grotesk',
  'font-manrope': 'Manrope',
  'font-jetbrains': 'JetBrains Mono',
  'font-lato': 'Lato',
  'font-fraunces': 'Fraunces',
  'font-sans': 'Inter',
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function gradientColor(color) {
  return color === '#FFFFFF' || color === '#000000' ? '#334155' : color
}

function createPosterSvg(technology, icon) {
  const fontFamily = fontFamilies[technology.font] ?? 'Inter'
  const googleFontFamily = fontFamily.replaceAll(' ', '+')
  const iconMarkup = icon
    ? `<svg x="96" y="96" width="448" height="448" viewBox="0 0 24 24" fill="#FFFFFF" opacity="0.1" aria-hidden="true"><path d="${icon.path}" /></svg>`
    : ''
  const color = gradientColor(technology.color)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(technology.name)} technology poster</title>
  <desc id="description">Poster for ${escapeXml(technology.name)} in the ${escapeXml(technology.category)} category.</desc>
  <defs>
    <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(160 .5 .5)">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.13" />
      <stop offset="70%" stop-color="#05070D" />
      <stop offset="100%" stop-color="#05070D" />
    </linearGradient>
    <style><![CDATA[
      @import url('https://fonts.googleapis.com/css2?family=${googleFontFamily}:wght@700&family=JetBrains+Mono:wght@400&display=swap');
    ]]></style>
  </defs>
  <rect width="640" height="800" fill="#05070D" />
  <rect width="640" height="800" fill="url(#brand-gradient)" />
  ${iconMarkup}
  <text x="48" y="690" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="22" letter-spacing="3">${escapeXml(technology.category.toUpperCase())}</text>
  <text x="48" y="740" fill="#FFFFFF" font-family="${fontFamily}, sans-serif" font-size="56" font-weight="700">${escapeXml(technology.name.toUpperCase())}</text>
</svg>
`
}

async function generatePosters() {
  await mkdir(outputDirectory, { recursive: true })

  const missingIcons = []
  let generatedCount = 0

  for (const technology of technologies) {
    const icon = iconMap[technology.icon]
    if (!icon) missingIcons.push(`${technology.name} (${technology.icon})`)

    const outputPath = path.join(outputDirectory, `${slugify(technology.name)}.svg`)
    await writeFile(outputPath, createPosterSvg(technology, icon), 'utf8')
    generatedCount += 1
  }

  console.log(`Generated ${generatedCount} technology posters in ${outputDirectory}`)
  if (missingIcons.length) {
    console.warn(`Missing Simple Icons mappings (${missingIcons.length}): ${missingIcons.join(', ')}`)
  } else {
    console.log('All technology icons were found in Simple Icons.')
  }
}

generatePosters().catch((error) => {
  console.error('Unable to generate technology posters:', error)
  process.exitCode = 1
})
