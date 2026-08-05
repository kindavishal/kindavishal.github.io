#!/usr/bin/env node
'use strict';

/**
 * Renders content/writing/*.md into the site's hand-written HTML shell and
 * regenerates everything that has to stay in sync with the post list:
 * writing/index.html, sitemap.xml, feed.xml, the homepage blog cards, and
 * per-post OG images.
 *
 * The design is not owned by this script — it reproduces the markup that used
 * to be copy-pasted into each page. See scripts/partials.js.
 *
 *   node scripts/build.js
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const yaml = require('js-yaml');
const P = require('./partials');

// How posts are ordered on the writing index, the homepage, and in the
// next/prev links. 'featured' uses the `featured` rank in frontmatter, which is
// currently set to tell the strongest career story rather than to follow the
// calendar. Switch to 'date' for reverse-chronological once there is enough
// published for recency to be the more useful signal. The RSS feed is always
// date-ordered regardless, because that is what feed readers expect.
const ORDER = 'featured'; // 'featured' | 'date'

// How many post cards the homepage shows. Three reads better than four — the
// cards get room to breathe instead of sitting at the grid's 280px minimum.
//
// Which three is a separate question from reading order: the homepage is a
// shop window, the writing index is a sequence. Give a post a `homepage` rank
// in frontmatter to pin it to a card slot. Posts without one fill any
// remaining slots in display order.
const HOMEPAGE_CARDS = 3;

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'writing');
const OUT = path.join(ROOT, 'writing');
const OG_DIR = path.join(ROOT, 'assets', 'og');
const { origin } = P.SITE;

const warnings = [];

/* ---------- helpers ---------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// For values that land inside JSON-LD string literals.
const jsonStr = (s) => JSON.stringify(String(s));

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing YAML frontmatter`);
  return { data: yaml.load(m[1]) || {}, body: m[2] };
}

function readingTime(markdown) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// "2026-05-01" -> "May 2026"
function displayDate(iso) {
  const [y, m] = iso.split('-');
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${months[Number(m) - 1]} ${y}`;
}

function rfc822(iso) {
  return new Date(`${iso}T09:00:00Z`).toUTCString();
}

/* ---------- load posts ---------- */

function loadPosts() {
  if (!fs.existsSync(CONTENT)) return [];
  const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith('.md'));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT, file), 'utf8');
    const { data, body } = parseFrontmatter(raw, file);
    const slug = data.slug || file.replace(/\.md$/, '');

    for (const key of ['title', 'description', 'date']) {
      if (!data[key]) throw new Error(`${file}: frontmatter is missing "${key}"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) {
      throw new Error(`${file}: date must be YYYY-MM-DD, got "${data.date}"`);
    }

    return {
      ...data,
      slug,
      file,
      body,
      draft: data.draft === true,
      faq: Array.isArray(data.faq) ? data.faq : [],
      url: `${origin}/writing/${slug}`,
      readtime: data.readtime || readingTime(body),
      dateDisplay: data.dateDisplay || displayDate(String(data.date)),
    };
  });

  // Newest first. Ties broken by slug so ordering is stable across builds.
  const byDate = (a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : (a.date < b.date ? 1 : -1);

  // Curated reading order. Posts without a `featured` rank fall to the end and
  // sort among themselves by date.
  const byFeatured = (a, b) => {
    const fa = a.featured ?? Infinity;
    const fb = b.featured ?? Infinity;
    return fa === fb ? byDate(a, b) : fa - fb;
  };

  posts.sort(ORDER === 'featured' ? byFeatured : byDate);

  const live = posts.filter((p) => !p.draft);
  // "Next" follows the display order, so the bottom-of-post link matches the
  // reading path the posts hand off to each other in their closing lines.
  live.forEach((p, i) => {
    p.next = live[i + 1] || null;
    p.prev = live[i - 1] || null;
  });
  return { all: posts, live, byDate: [...live].sort(byDate) };
}

/* ---------- markdown ---------- */

marked.setOptions({ mangle: false, headerIds: false, gfm: true });

function renderBody(md) {
  let html = marked.parse(md);
  // Tables must scroll inside their own container on mobile rather than
  // pushing the page wider.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>')
             .replace(/<\/table>/g, '</table></div>');
  return html.trim();
}

/* ---------- JSON-LD ---------- */

function articleLd(post) {
  const img = `${origin}/assets/og/${post.slug}.png`;
  return `  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${jsonStr(post.title)},
    "description": ${jsonStr(post.description)},
    "image": ${jsonStr(img)},
    "author": { "@type": "Person", "name": "Vishal Das", "url": ${jsonStr(origin)} },
    "publisher": { "@type": "Person", "name": "Vishal Das" },
    "datePublished": ${jsonStr(post.date)},
    "dateModified": ${jsonStr(post.updated || post.date)},
    "mainEntityOfPage": { "@type": "WebPage", "@id": ${jsonStr(post.url)} },
    "url": ${jsonStr(post.url)}
  }</script>`;
}

function faqLd(post) {
  if (!post.faq.length) return '';
  const items = post.faq.map((f) => `      {
        "@type": "Question",
        "name": ${jsonStr(f.q)},
        "acceptedAnswer": { "@type": "Answer", "text": ${jsonStr(f.a)} }
      }`).join(',\n');
  return `\n  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
${items}
    ]
  }</script>`;
}

/* ---------- page templates ---------- */

// Search results truncate around 60 characters. A post's on-page headline can be
// as long as it needs to be; the <title> cannot. `seoTitle` in frontmatter
// overrides it, and the byline suffix is only appended when it still fits.
const TITLE_SUFFIX = ' — Vishal Das';

function pageTitle(post) {
  if (post.seoTitle) return post.seoTitle;
  return post.title.length + TITLE_SUFFIX.length <= 60
    ? post.title + TITLE_SUFFIX
    : post.title;
}

function renderPost(post) {
  const faqHtml = post.faq.length ? `
      <section class="faq">
        <h2>Questions worth answering</h2>
${post.faq.map((f) => `        <div class="faq-item">
          <p class="faq-q">${esc(f.q)}</p>
          <p class="faq-a">${esc(f.a)}</p>
        </div>`).join('\n')}
      </section>
` : '';

  const nextLink = post.next
    ? `<a href="/writing/${post.next.slug}" class="article-nav-link">Next: ${esc(post.next.shortTitle || post.next.title)} →</a>`
    : `<a href="/#contact" class="article-nav-link">Work with me →</a>`;

  // "Back to writing" already sits at the top of the article, so the bottom-left
  // slot carries the previous post instead. Empty span on the first post so the
  // next link stays right-aligned under space-between.
  const prevLink = post.prev
    ? `<a href="/writing/${post.prev.slug}" class="article-nav-link">&larr; Prev: ${esc(post.prev.shortTitle || post.prev.title)}</a>`
    : `<span></span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
${P.ga()}
${P.meta({
    title: pageTitle(post),
    description: post.description,
    url: post.url,
    ogType: 'article',
    image: `${origin}/assets/og/${post.slug}.png`,
    imageAlt: esc(post.title),
  })}
${articleLd(post)}${faqLd(post)}
${P.fonts()}
<style>
${P.BASE_CSS}
${P.ARTICLE_CSS}
${P.BASE_RESPONSIVE}
${P.ARTICLE_RESPONSIVE}
</style>
</head>
<body>
${P.nav()}
<article>
  <div class="article-wrap">
    <a href="/writing" class="back-link">
      <svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Back to writing
    </a>

    <header class="article-header reveal">
      <h1 class="article-title">${esc(post.title)}</h1>
      <div class="article-meta">
        <span class="article-date">${esc(post.dateDisplay)}</span>
        <span class="article-readtime">~${post.readtime} min read</span>
      </div>
    </header>

    <div class="article-body">
${renderBody(post.body)}
    </div>
${faqHtml}
    <div class="article-bottom">
      ${prevLink}
      ${nextLink}
    </div>
  </div>
</article>
${P.footer()}
${P.scripts()}
</body>
</html>
`;
}

function renderIndex(posts) {
  // Two jobs, two strings. `subtitle` is the line a reader actually sees, so it
  // has to sound like him. `desc` is only ever seen in a search result or a feed
  // reader, so it can name the subject plainly without dragging keywords on-page.
  const subtitle = "Every program here is one I built. Including the parts that didn't work.";
  const desc = 'Write-ups on building developer community, DevRel and creator programs — how they were designed, how they were measured, and what went wrong.';

  // Group order on the index page. Each entry is [frontmatter-category, header
  // label the reader sees]. Order is fixed here so the sequence — built,
  // shipped, proving, state of the field — reads as a deliberate arc rather
  // than a bucket dump. A post whose `category` is not in this list will
  // throw in the loop below; add it here rather than letting it fall off.
  const GROUPS = [
    ['Creator programs', 'Programs I built'],
    ['Internal tooling', 'Tools I shipped'],
    ['Attribution',      'Proving the work'],
    ['The field',        'The state of the field'],
  ];

  // "2026-02-11" -> "Feb 2026". The row meta needs the short form; the long
  // form still lives on the post page and in JSON-LD via displayDate().
  const shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const metaOf = (p) => {
    const [y, m] = String(p.date).split('-');
    return `${shortMonths[Number(m) - 1]} ${y} · ${p.readtime} min`;
  };

  const list = (() => {
    if (!posts.length) {
      return `      <p class="reveal" style="color:#78716C;margin-top:24px;font-style:italic">
        Nothing published yet. Check back soon.
      </p>`;
    }

    // Bucket in the order posts already sit in — that preserves the featured
    // rank within each group without a second sort.
    const buckets = new Map(GROUPS.map(([k]) => [k, []]));
    for (const p of posts) {
      if (!buckets.has(p.category)) {
        throw new Error(`${p.file}: category "${p.category || ''}" is not in the writing-index GROUPS list. Add it in scripts/build.js:renderIndex.`);
      }
      buckets.get(p.category).push(p);
    }

    // One counter across the whole visible list, so numbering runs 01..N in
    // the order the reader actually sees the rows, not in per-group resets.
    let n = 0;
    const chunks = [];
    for (const [key, header] of GROUPS) {
      const bucket = buckets.get(key);
      if (!bucket.length) continue;
      chunks.push(`      <h2 class="article-group reveal">${esc(header)}</h2>`);
      for (const p of bucket) {
        n += 1;
        const num = ORDER === 'featured' ? String(n).padStart(2, '0') : '';
        const delay = n <= 4 ? ` reveal-delay-${n}` : '';
        chunks.push(`      <a href="/writing/${p.slug}" class="article-item reveal${delay}">
        ${num ? `<span class="article-item-num">${num}</span>` : ''}
        <h3 class="article-item-title">${esc(p.title)}</h3>
        <span class="article-item-meta">${esc(metaOf(p))}</span>
      </a>`);
      }
    }
    return chunks.join('\n');
  })();

  const ld = `  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Writing — Vishal Das",
    "description": ${jsonStr(desc)},
    "url": ${jsonStr(`${origin}/writing`)},
    "author": { "@type": "Person", "name": "Vishal Das", "url": ${jsonStr(origin)} },
    "blogPost": [
${posts.map((p) => `      {
        "@type": "BlogPosting",
        "headline": ${jsonStr(p.title)},
        "description": ${jsonStr(p.description)},
        "datePublished": ${jsonStr(p.date)},
        "url": ${jsonStr(p.url)}
      }`).join(',\n')}
    ]
  }</script>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
${P.ga()}
${P.meta({
    title: 'Writing on DevRel, community and attribution',
    description: desc,
    url: `${origin}/writing`,
    ogType: 'website',
  })}
${ld}
${P.fonts()}
<style>
${P.BASE_CSS}
${P.INDEX_CSS}
${P.BASE_RESPONSIVE}
${P.INDEX_RESPONSIVE}
</style>
</head>
<body>
${P.nav()}
<main>
  <div class="page-wrap">
    <header class="page-header reveal">
      <h1 class="page-title">Writing</h1>
      <p class="page-desc">${esc(subtitle)}</p>
    </header>

    <div class="article-list">
${list}
    </div>
  </div>
</main>
${P.footer()}
${P.scripts()}
</body>
</html>
`;
}

/* ---------- generated files ---------- */

function renderSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const newest = posts.length ? posts[0].date : today;

  const urls = [
    { loc: `${origin}/`, lastmod: today, changefreq: 'monthly', priority: '1.0' },
    { loc: `${origin}/writing`, lastmod: newest, changefreq: 'weekly', priority: '0.9' },
    ...posts.map((p) => ({
      loc: p.url,
      lastmod: p.updated || p.date,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function renderFeed(posts) {
  const desc = 'Write-ups on building developer community, DevRel and creator programs — how they were designed, how they were measured, and what went wrong.';
  const built = posts.length ? rfc822(posts[0].date) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vishal Das — Writing</title>
    <link>${origin}/writing</link>
    <description>${esc(desc)}</description>
    <language>en</language>
    <lastBuildDate>${built}</lastBuildDate>
    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`;
}

// The homepage stays hand-written; the build only swaps what's between the
// markers so post cards never go stale.
function injectHomepage(posts) {
  const file = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const START = '<!-- BUILD:blog-cards -->';
  const END = '<!-- /BUILD:blog-cards -->';

  if (!html.includes(START) || !html.includes(END)) {
    warnings.push('index.html has no BUILD:blog-cards markers — homepage cards not updated');
    return;
  }

  // Pinned posts claim their slot first; the rest fill up in display order.
  const pinned = posts.filter((p) => p.homepage).sort((a, b) => a.homepage - b.homepage);
  const rest = posts.filter((p) => !p.homepage);
  const chosen = [...pinned, ...rest].slice(0, HOMEPAGE_CARDS);

  const cards = chosen.map((p, i) => `      <a href="/writing/${p.slug}" class="blog-card reveal reveal-delay-${i + 1}">
        <div class="blog-card-img ${i % 2 === 0 ? 'amber' : 'dark'}"><span>${esc(p.cardLabel || p.dateDisplay)}</span></div>
        <div class="blog-card-body">
          <span class="blog-cat">${esc(p.category || 'Writing')}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
        </div>
      </a>`).join('\n');

  const body = posts.length ? cards : `      <div class="blog-card reveal reveal-delay-1" style="cursor:default">
        <div class="blog-card-img amber"><span>Coming Soon</span></div>
        <div class="blog-card-body">
          <span class="blog-cat">Writing</span>
          <h3>Essays on Developer Ecosystems, Communities, and Building</h3>
          <p>I'm currently revising a series of essays about lessons learned scaling programs at Google and Firecrawl. Check back soon.</p>
        </div>
      </div>`;

  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  html = html.replace(re, `${START}\n${body}\n      ${END}`);

  // Say how many posts are behind the link, so the section reads as a preview
  // of something bigger rather than the whole list.
  const CTA_START = '<!-- BUILD:writing-cta -->';
  const CTA_END = '<!-- /BUILD:writing-cta -->';
  if (html.includes(CTA_START) && html.includes(CTA_END)) {
    const label = posts.length > HOMEPAGE_CARDS
      ? `Read all ${posts.length} pieces`
      : 'View all writing';
    const cta = `      <a href="/writing" class="btn-link" style="display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:#D97706">${label} <span style="font-size:18px">→</span></a>`;
    html = html.replace(
      new RegExp(`${CTA_START}[\\s\\S]*?${CTA_END}`),
      `${CTA_START}\n${cta}\n      ${CTA_END}`);
  } else {
    warnings.push('index.html has no BUILD:writing-cta markers — link text not updated');
  }

  fs.writeFileSync(file, html);
}

/* ---------- OG images ---------- */

// Brand-coloured card generated per post. Falls back to the shared preview
// card if sharp is unavailable, so image tooling can never break a deploy.
function wrapText(text, max) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) { lines.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function ogSvg(post) {
  const lines = wrapText(post.title, 30);
  const size = lines.length > 3 ? 52 : lines.length > 2 ? 60 : 68;
  const startY = 300 - ((lines.length - 1) * size * 0.62);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#F8F6F2"/>
  <rect width="1200" height="10" fill="#D97706"/>
  <text x="80" y="130" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#D97706" letter-spacing="3">VISHAL DAS</text>
${lines.map((l, i) => `  <text x="80" y="${startY + i * size * 1.2}" font-family="Georgia,serif" font-size="${size}" font-weight="bold" fill="#1C1917">${esc(l)}</text>`).join('\n')}
  <text x="80" y="540" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#78716C">${esc(post.dateDisplay)} · ~${post.readtime} min read</text>
  <text x="80" y="580" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="bold" fill="#D97706">kindavishal.js.org</text>
</svg>`;
}

async function buildOgImages(posts) {
  if (!posts.length) return;
  let sharp;
  try {
    sharp = require('sharp');
  } catch {
    warnings.push('sharp not installed — posts fall back to the shared preview card');
    return;
  }

  fs.mkdirSync(OG_DIR, { recursive: true });
  for (const post of posts) {
    const dest = path.join(OG_DIR, `${post.slug}.png`);
    try {
      await sharp(Buffer.from(ogSvg(post))).png().toFile(dest);
    } catch (err) {
      warnings.push(`OG image failed for ${post.slug}: ${err.message}`);
    }
  }
}

/* ---------- main ---------- */

async function main() {
  const { all, live, byDate } = loadPosts();
  const drafts = all.filter((p) => p.draft);

  fs.mkdirSync(OUT, { recursive: true });

  // Remove generated posts that no longer have a source file, so deleting or
  // drafting a post actually takes it off the site.
  const expected = new Set(live.map((p) => `${p.slug}.html`));
  for (const f of fs.readdirSync(OUT)) {
    if (f.endsWith('.html') && f !== 'index.html' && !expected.has(f)) {
      fs.unlinkSync(path.join(OUT, f));
      console.log(`  removed stale writing/${f}`);
    }
  }

  await buildOgImages(live);

  for (const post of live) {
    fs.writeFileSync(path.join(OUT, `${post.slug}.html`), renderPost(post));
    console.log(`  writing/${post.slug}.html`);
  }

  fs.writeFileSync(path.join(OUT, 'index.html'), renderIndex(live));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), renderSitemap(byDate));
  // Feed readers expect newest first, whatever the site is ordered by.
  fs.writeFileSync(path.join(ROOT, 'feed.xml'), renderFeed(byDate));
  injectHomepage(live);

  console.log(`\nBuilt ${live.length} post(s)${drafts.length ? `, skipped ${drafts.length} draft(s)` : ''}.`);
  console.log('  writing/index.html, sitemap.xml, feed.xml, index.html');
  for (const w of warnings) console.warn(`  ! ${w}`);
}

main().catch((err) => {
  console.error(`\nBuild failed: ${err.message}\n`);
  process.exit(1);
});
