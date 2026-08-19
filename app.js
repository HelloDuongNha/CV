const printButton = document.querySelector('[data-print]')

printButton?.addEventListener('click', () => window.print())

if (window.lucide) {
  window.lucide.createIcons()
}
