# Vishal Das - Developer Community Manager & Program Manager Portfolio

A lightweight, static portfolio website showcasing my experience as a Developer Community Manager & Program Manager.

**Live Site:** [kindavishal.js.org](https://kindavishal.js.org/)

## Tech Stack

- **Core**: Semantic HTML5, Vanilla JavaScript (ES6+)
- **Fonts**: Space Grotesk, Literata
- **Styling**: two systems, mid-migration —
  - `index.html` and `writing/*` use a self-contained inline `<style>` design (no Tailwind)
  - `now.html` and `work-with-me.html` still use Tailwind via `src/output.css`

## Project structure

HTML is edited directly at the repo root — that is the deployed source. There is no
HTML build step, and Netlify serves the repo as-is (no CI, no build command).

`src/` holds **only** the Tailwind stylesheet:

- `src/input.css` — Tailwind source
- `src/output.css` — generated; loaded at runtime by `now.html` and `work-with-me.html`

Do not delete `src/output.css` — those two pages lose all styling without it.

## Development

- `npm start`: Start local static server on port 8080
- `npm run dev`: Start Tailwind CLI in watch mode
- `npm run build`: Build and minify Tailwind output (alias of `build:css`)

## Disclaimer

The source for this site was created for my own personal use and is not intended to be a template or theme for others. While you are welcome to view the source code for inspiration, it was not written to be cloned or deployed by others.

## Author

**Vishal Das** - [LinkedIn](https://linkedin.com/in/kindavishal) | [GitHub](https://github.com/kindavishal)
