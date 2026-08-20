const printButton = document.querySelector('[data-print]')
const downloadButton = document.querySelector('[data-download]')
const languageButtons = document.querySelectorAll('[data-locale]')
const languageControl = document.querySelector('.language-control')
const themeButton = document.querySelector('[data-theme-toggle]')
const toolbar = document.querySelector('.utility-actions')
const portrait = document.querySelector('.portrait-placeholder img')
const description = document.querySelector('meta[name="description"]')
const themeColor = document.querySelector('meta[name="theme-color"]')
const cvPaper = document.querySelector('.cv-paper')

const collectTextNodes = (root) => {
  const nodes = []

  const visit = (node) => {
    if (node.nodeType === 3 && node.nodeValue.trim()) {
      const value = node.nodeValue
      nodes.push({
        node,
        prefix: value.match(/^\s*/)?.[0] || '',
        suffix: value.match(/\s*$/)?.[0] || ''
      })
      return
    }

    node.childNodes.forEach(visit)
  }

  visit(root)
  return nodes
}

const textNodes = collectTextNodes(cvPaper)
const englishText = textNodes.map(({ node }) => node.nodeValue.trim())
let currentLocale = 'en'
let currentTheme = 'light'

const localeFromLocation = () => {
  const queryLocale = new URLSearchParams(window.location.search).get('lang')
  if (queryLocale === 'vi' || queryLocale === 'en') return queryLocale
  return window.location.pathname === '/vi' ? 'vi' : 'en'
}

const localeUrl = (locale) => {
  if (window.location.protocol === 'file:') {
    return `${window.location.pathname}?lang=${locale}`
  }
  return `/${locale}`
}

const updateThemeButton = () => {
  const config = window.CV_I18N[currentLocale]
  const useLightMode = currentTheme === 'dark'
  themeButton?.setAttribute('aria-label', useLightMode ? config.lightLabel : config.darkLabel)
  themeButton?.setAttribute('data-tooltip', useLightMode ? config.lightTooltip : config.darkTooltip)
}

const applyTheme = (theme) => {
  currentTheme = theme
  document.documentElement.dataset.theme = theme
  themeColor?.setAttribute('content', theme === 'dark' ? '#151a19' : '#dfe6e4')
  updateThemeButton()
}

const applyLocale = (locale) => {
  const config = window.CV_I18N[locale]
  const translatedText = locale === 'vi' ? config.text : englishText

  if (translatedText.length !== textNodes.length) {
    throw new Error(`CV i18n text count mismatch: expected ${textNodes.length}, received ${translatedText.length}`)
  }

  textNodes.forEach(({ node, prefix, suffix }, index) => {
    node.nodeValue = `${prefix}${translatedText[index]}${suffix}`
  })

  currentLocale = locale
  document.documentElement.lang = locale
  document.title = config.title
  description?.setAttribute('content', config.description)
  portrait?.setAttribute('alt', config.portraitAlt)
  toolbar?.setAttribute('aria-label', config.toolbarLabel)
  languageControl?.setAttribute('aria-label', config.languageLabel)
  languageControl.dataset.active = locale
  languageButtons.forEach((button) => {
    const isActive = button.dataset.locale === locale
    button.classList.toggle('active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
  printButton?.setAttribute('aria-label', config.printLabel)
  printButton?.setAttribute('data-tooltip', config.printLabel)
  downloadButton?.setAttribute('aria-label', config.downloadLabel)
  downloadButton?.setAttribute('data-tooltip', config.downloadLabel)
  downloadButton?.setAttribute('href', config.pdf)
  updateThemeButton()
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextLocale = button.dataset.locale
    if (nextLocale === currentLocale) return
    window.history.pushState({ locale: nextLocale }, '', localeUrl(nextLocale))
    applyLocale(nextLocale)
  })
})

themeButton?.addEventListener('click', () => {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(nextTheme)
  try {
    window.localStorage.setItem('cv-theme', nextTheme)
  } catch {}
})

printButton?.addEventListener('click', () => window.print())

window.addEventListener('popstate', () => applyLocale(localeFromLocation()))

const initialLocale = localeFromLocation()
let savedTheme = null
try {
  savedTheme = window.localStorage.getItem('cv-theme')
} catch {}
const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
  ? savedTheme
  : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
if (window.location.protocol !== 'file:' && !['/en', '/vi'].includes(window.location.pathname)) {
  window.history.replaceState({ locale: initialLocale }, '', localeUrl(initialLocale))
}
applyLocale(initialLocale)
applyTheme(initialTheme)

if (window.lucide) {
  window.lucide.createIcons()
}
