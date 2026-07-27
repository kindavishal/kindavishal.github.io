# Vishal Das - Developer Community Manager & Program Manager Portfolio

A lightweight, static portfolio website showcasing my experience as a Developer Community Manager & Program Manager.

**Live Site:** [kindavishal.js.org](https://kindavishal.js.org/)

## Tech Stack

- **Core**: Semantic HTML5, Vanilla JavaScript (ES6+)
- **Styling**: a self-contained inline `<style>` block per page — no framework, no build step
- **Fonts**: Space Grotesk, Literata

## Project structure

HTML is edited directly and is the deployed source. **There is no build step** — Netlify
serves the repo as-is (no CI, no build command), so what is committed is what ships.

```
index.html          the homepage
writing/index.html  the writing index
drafts/             unpublished pieces — not linked, noindex, disallowed in robots.txt
assets/             images and icons
_redirects          Netlify redirects for retired URLs
```

Each page carries its own CSS inline. There is no shared stylesheet, so a change to
shared furniture (nav, footer, buttons) has to be applied to each page that uses it.

## Development

- `npm start`: Start a local static server on port 8080

The only dependency is `http-server`, used for local preview. Nothing is required to build
or deploy.

## Disclaimer

The source for this site was created for my own personal use and is not intended to be a template or theme for others. While you are welcome to view the source code for inspiration, it was not written to be cloned or deployed by others.

## Author

**Vishal Das** - [LinkedIn](https://linkedin.com/in/kindavishal) | [GitHub](https://github.com/kindavishal)
