const printButton = document.querySelector('[data-print]')
const languageLinks = document.querySelectorAll('.language-option')

printButton?.addEventListener('click', () => window.print())

if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
  languageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      window.location.href = link.getAttribute('lang') === 'vi' ? '/vi.html' : '/'
    })
  })
}

if (window.lucide) {
  window.lucide.createIcons()
}
