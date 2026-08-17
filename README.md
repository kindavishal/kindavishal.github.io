# Vishal Das - Developer Community & Program Manager Portfolio

A lightweight, static portfolio website showcasing my experience as a Developer Community & Program Manager.

**Live Site:** [kindavishal.js.org](https://kindavishal.js.org/)

## Tech Stack

- **Core**: Semantic HTML5, Vanilla JavaScript (ES6+)
- **Styling**: a self-contained inline `<style>` block per page — no CSS framework
- **Fonts**: Space Grotesk, Literata
- **Build**: one Node script; posts are Markdown, everything else is hand-written HTML

## Project structure

The homepage and drafts are edited directly and ship as committed. Blog posts are the
exception: they are written in Markdown and rendered by `scripts/build.js`, which also
regenerates every file that has to stay in sync with the post list.

```
index.html            the homepage — hand-edited, except the block between
                      the BUILD:blog-cards markers
content/writing/*.md  post sources — the only place post prose is written
scripts/build.js      renders posts, writing index, sitemap, feed, OG images
scripts/partials.js   shared nav / footer / CSS / meta — edit shared furniture here
drafts/               unpublished pieces — not linked, noindex, disallowed in robots.txt
assets/               images and icons; assets/og/ is generated
_redirects            Netlify redirects for retired URLs and the canonical host
```

**Generated — do not hand-edit.** `writing/*.html`, `sitemap.xml`, `feed.xml`,
`assets/og/*.png`, and the homepage block between the `BUILD:blog-cards` markers. Any
change made to those directly is overwritten on the next build.

Pages still carry their CSS inline, but shared furniture for generated pages now lives in
`scripts/partials.js` rather than being copy-pasted. `index.html` and `drafts/` are still
standalone, so nav or footer changes there have to be applied by hand as well.

## Writing a post

Add a Markdown file to `content/writing/`. Frontmatter requires `title`, `description`,
and `date` (`YYYY-MM-DD`); `slug` defaults to the filename. Optional: `category`,
`cardLabel`, `shortTitle`, `updated`, `faq` (a list of `q`/`a` pairs, which becomes both
the on-page FAQ and the `FAQPage` structured data), and `draft: true` to build everything
except that post.

Two fields control ordering, and they answer different questions:

- **`featured`** — position on the writing index, and the order the next/prev links walk.
  This is the reading sequence, so each post's closing line should hand off to whatever
  comes after it. Set `ORDER = 'date'` in `scripts/build.js` to ignore it and go
  reverse-chronological instead.
- **`homepage`** — which posts get a card on the homepage, and in what order. The homepage
  is a shop window rather than a sequence, so it deliberately doesn't have to match
  `featured`. Posts without a `homepage` rank fill any leftover slots in reading order.

Then `npm run build`. Deleting or drafting a post removes its generated HTML.

## Development

- `npm run build`: Render posts and regenerate the sitemap, feed, and OG images
- `npm start`: Build, then serve on port 8080

Netlify runs `npm run build` on deploy (see `netlify.toml`). `sharp` generates the
per-post OG cards; if it is unavailable the build still succeeds and posts fall back to
the shared preview card.

## Disclaimer

The source for this site was created for my own personal use and is not intended to be a template or theme for others. While you are welcome to view the source code for inspiration, it was not written to be cloned or deployed by others.

## Author

**Vishal Das** - [LinkedIn](https://linkedin.com/in/kindavishal) | [GitHub](https://github.com/kindavishal)
