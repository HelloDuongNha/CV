# Nguyen Ngoc Hoang Duong - CV

Responsive web CV for Nguyen Ngoc Hoang Duong, a Software Engineering student and Software Developer.

## View locally

Open `index.html` directly in a browser. The page includes separate controls for printing the CV and downloading the prepared two-page PDF.

When deployed on Vercel, the shareable language routes are:

- `/en`: English CV.
- `/vi`: Vietnamese CV.

The language switcher keeps both versions directly accessible, while `vercel.json` maps the clean URLs to their static HTML files.

## Main files

- `index.html`: CV content and semantic structure.
- `vi.html`: Vietnamese CV content.
- `styles.css`: responsive screen layout and A4 print styles.
- `app.js`: print action and interface icon initialisation.
- `assets/nguyen-ngoc-hoang-duong-profile.jpg`: optimised profile photograph.
- `Nguyen-Ngoc-Hoang-Duong-CV.pdf`: printable CV.
- `Nguyen-Ngoc-Hoang-Duong-CV-VI.pdf`: printable Vietnamese CV.
- `vercel.json`: Vercel routes for `/en` and `/vi`.
