# Steve Leve — Professional Profile Site

Static site hosted at https://steveleve.github.io showcasing Steve Leve's reliability-first consulting services, case studies, and contact information. The site is built with semantic HTML, a single CSS stylesheet, and lightweight JavaScript, augmented with Material Web components loaded from a CDN.

## Repository Layout

- `index.html` — Landing page with service pillars and calls to action.
- `services.html` and `services-onepager.html` — Detailed service offerings for audits, modernization, AI readiness, and advisory support.
- `case-studies.html` — Selected project outcomes highlighting modernization and reliability work.
- `about.html` — Biographical context (currently mirrors services content and ready for future copy).
- `contact.html` — Email-first contact options with placeholder scheduler CTA.
- `styles.css` — Theme, layout, and responsive styling (Material-inspired palette and cards).
- `site.js` — Minimal helpers for active navigation highlighting and dynamic footer year.

## Getting Started Locally

1. Clone the repository and change into the project directory:
   ```bash
   git clone https://github.com/SteveLeve/steveleve.github.io.git
   cd steveleve.github.io
   ```
2. Start a local web server (Python example shown):
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000 in a browser to browse the site.

Because the pages reference modules served from https://unpkg.com, make sure you have an internet connection when previewing locally.

## Updating Content

- Edit the HTML files directly to update copy, add case studies, or adjust navigation.
- Update `styles.css` for visual changes; the theme tokens at the top of the file keep colors and spacing consistent.
- Extend `site.js` if more dynamic behavior is needed—for example, handling future routing or animations.
- Keep assets optimized; this repo intentionally avoids build tooling for simplicity on GitHub Pages.

## Deployment

This repository is published through GitHub Pages. Pushes to the `main` branch are automatically served at https://steveleve.github.io. No additional CI/CD steps are required.

## Contributing

This is a personal profile site; contributions happen directly by the site owner. For issues or suggestions, reach out via the contact information on the site.
