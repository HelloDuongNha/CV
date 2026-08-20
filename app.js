const printButton = document.querySelector('[data-print]')
const downloadButton = document.querySelector('[data-download]')
const languageButton = document.querySelector('[data-language-toggle]')
const toolbar = document.querySelector('.utility-actions')
const portrait = document.querySelector('.portrait-placeholder img')
const description = document.querySelector('meta[name="description"]')
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
  languageButton?.setAttribute('aria-label', config.switchLabel)
  languageButton?.setAttribute('data-tooltip', config.switchTooltip)
  printButton?.setAttribute('aria-label', config.printLabel)
  printButton?.setAttribute('data-tooltip', config.printLabel)
  downloadButton?.setAttribute('aria-label', config.downloadLabel)
  downloadButton?.setAttribute('data-tooltip', config.downloadLabel)
  downloadButton?.setAttribute('href', config.pdf)
}

languageButton?.addEventListener('click', () => {
  const nextLocale = currentLocale === 'en' ? 'vi' : 'en'
  window.history.pushState({ locale: nextLocale }, '', localeUrl(nextLocale))
  applyLocale(nextLocale)
})

printButton?.addEventListener('click', () => window.print())

window.addEventListener('popstate', () => applyLocale(localeFromLocation()))

const initialLocale = localeFromLocation()
if (window.location.protocol !== 'file:' && !['/en', '/vi'].includes(window.location.pathname)) {
  window.history.replaceState({ locale: initialLocale }, '', localeUrl(initialLocale))
}
applyLocale(initialLocale)

if (window.lucide) {
  window.lucide.createIcons()
}
