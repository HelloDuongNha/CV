import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const baseUrl = process.env.CV_BASE_URL || 'http://127.0.0.1:4181/'
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || chromium.executablePath()
})

const outputs = [
  { locale: 'en', file: 'Nguyen-Ngoc-Hoang-Duong-CV.pdf' },
  { locale: 'vi', file: 'Nguyen-Ngoc-Hoang-Duong-CV-VI.pdf' }
]

try {
  for (const output of outputs) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(`${baseUrl}?lang=${output.locale}`, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print', colorScheme: 'light' })
    await page.pdf({
      path: output.file,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    })
    await page.close()
  }
} finally {
  await browser.close()
}
