# Nguyen Ngoc Hoang Duong - CV

Responsive web CV for Nguyen Ngoc Hoang Duong, a Software Engineering student and Software Developer.

## View locally

Open `index.html` directly in a browser or serve this folder with a static web server. The page includes icon controls for switching language, printing the CV and downloading the prepared two-page PDF.

When deployed on Vercel, the shareable language routes are:

- `/en`: English CV.
- `/vi`: Vietnamese CV.

The toolbar switches languages in the current page without a reload and provides print, PDF download and a persistent light/dark theme. The browser History API updates the clean URL on Vercel and uses a local query parameter when the HTML file is opened directly. The `vercel.json` file serves the same application entry point for both deployed routes.

## Main files

- `index.html`: CV content and semantic structure.
- `locales.js`: Vietnamese content and locale-specific metadata.
- `styles.css`: responsive screen layout and A4 print styles.
- `app.js`: in-page i18n, URL history, print, download and icon initialisation.
- `generate-pdfs.mjs`: generates both colour downloadable PDFs from the same one-column web layout, while browser printing remains monochrome.
- `assets/nguyen-ngoc-hoang-duong-profile.jpg`: optimised profile photograph.
- `Nguyen-Ngoc-Hoang-Duong-CV.pdf`: printable CV.
- `Nguyen-Ngoc-Hoang-Duong-CV-VI.pdf`: printable Vietnamese CV.
- `vercel.json`: Vercel routes for `/en` and `/vi`.
