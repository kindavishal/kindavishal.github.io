'use strict';

// Shared HTML furniture. Every chunk here was lifted verbatim from the
// hand-written pages so the build produces the same markup that used to be
// copy-pasted. If you change nav/footer/tokens, change them here only.

const SITE = {
  origin: 'https://kindavishal.js.org',
  author: 'Vishal Das',
  title: 'Vishal Das',
  ga: 'G-HRM34FM9F4',
  ogAlt: 'Vishal Das — Developer Community &amp; Program Manager',
};

const ga = () => `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${SITE.ga}');
  </script>`;

const fonts = () => `  <link rel="icon" type="image/png" href="/assets/favicon.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="alternate" type="application/rss+xml" title="Vishal Das — Writing" href="${SITE.origin}/feed.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,400;1,7..72,500&display=swap" rel="stylesheet">`;

// Meta block shared by every generated page.
function meta({ title, description, url, ogType, image, imageAlt }) {
  const img = image || `${SITE.origin}/assets/preview-card.png`;
  const alt = imageAlt || SITE.ogAlt;
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="${SITE.author}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Vishal Das Portfolio">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${img}"><meta property="og:image:secure_url" content="${img}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${alt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${url}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${img}">
  <meta name="twitter:image:alt" content="${alt}">`;
}

// Base tokens + nav + footer + reveal. Identical across pages.
const BASE_CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:'Space Grotesk',system-ui,sans-serif;color:#1C1917;background:#F8F6F2;line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{text-decoration:none;color:inherit}
a:hover{color:#D97706}
::selection{background:#D97706;color:#fff}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(248,246,242,0.95);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,0.04)}
.nav-inner{max-width:1320px;margin:0 auto;padding:0 64px;height:68px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{display:flex;align-items:center;gap:10px}
.nav-logo-icon{width:36px;height:36px;background:#1C1917;border-radius:10px;display:flex;align-items:center;justify-content:center}
.nav-logo-icon span{color:#D97706;font-family:'Literata',serif;font-weight:700;font-size:16px}
.nav-logo-name{font-weight:600;font-size:15px}
.nav-links{display:flex;gap:28px;align-items:center;font-size:13px;font-weight:500;color:#57534E}
.nav-links a{cursor:pointer;transition:color .2s}
.nav-links a:hover{color:#1C1917}
.nav-links a.active{color:#D97706;font-weight:600}
.nav-btns{display:flex;gap:8px}
.btn-outline{border:1.5px solid #E7E5E0;color:#1C1917;padding:9px 20px;border-radius:10px;font-size:13px;font-weight:600;transition:all .2s;display:inline-block}
.btn-outline:hover{border-color:#D97706;color:#D97706}
.btn-primary{background:#B45309;color:#fff;padding:10px 22px;border-radius:10px;font-size:13px;font-weight:600;transition:all .2s;display:inline-block}
.btn-primary:hover{background:#92400E;color:#fff}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;background:none;border:none}
.hamburger span{width:22px;height:2px;background:#1C1917;border-radius:2px;transition:all .3s}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.hamburger.active span:nth-child(2){opacity:0}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;bottom:0;background:rgba(248,246,242,0.98);backdrop-filter:blur(16px);z-index:99;flex-direction:column;padding:32px;gap:8px}
.mobile-menu.open{display:flex}
.mobile-menu a{font-size:18px;font-weight:500;padding:16px 0;border-bottom:1px solid rgba(0,0,0,0.06);color:#1C1917}
.mobile-menu .nav-btns{flex-direction:column;gap:12px;margin-top:24px}
.mobile-menu .nav-btns a{text-align:center;padding:14px 24px}
.nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.06)}
.footer{padding:24px 64px;background:#1C1917;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#A8A29E}
.footer-links{display:flex;gap:20px}
.footer a{color:#A8A29E;transition:color .2s}
.footer a:hover{color:#D97706}
.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:0.05s}
.reveal-delay-2{transition-delay:0.1s}
.reveal-delay-3{transition-delay:0.15s}
.reveal-delay-4{transition-delay:0.2s}`;

const BASE_RESPONSIVE = `@media(max-width:1024px){
.nav-inner{padding:0 32px}
.footer{padding:24px 32px}
}`;

// Article-specific styles. Everything up to .article-nav-link is verbatim from
// the previous post template; tables and the FAQ block are new.
const ARTICLE_CSS = `.article-wrap{max-width:680px;margin:0 auto;padding:120px 24px 80px}
.back-link{display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#B45309;font-weight:600;margin-bottom:32px;transition:color .2s}
.back-link:hover{color:#92400E}
.back-link svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2}
.article-header{margin-bottom:40px}
.article-title{font-family:'Literata',serif;font-size:36px;line-height:1.15;letter-spacing:-0.5px;margin:0 0 16px;color:#1C1917}
.article-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.article-date{font-size:13px;font-weight:600;color:#D97706;background:#FEF3C7;padding:4px 12px;border-radius:6px;display:inline-block}
.article-readtime{font-size:13px;color:#57534E}
.article-body{font-size:16px;line-height:1.8;color:#44403C}
.article-body h2{font-family:'Literata',serif;font-size:24px;color:#1C1917;margin:40px 0 16px;letter-spacing:-0.3px;line-height:1.3}
.article-body h3{font-size:18px;font-weight:600;color:#1C1917;margin:32px 0 12px}
.article-body p{margin:0 0 20px}
.article-body ul,.article-body ol{margin:0 0 20px;padding-left:24px}
.article-body li{margin-bottom:8px;line-height:1.7}
.article-body li::marker{color:#D97706}
.article-body strong{color:#1C1917;font-weight:600}
.article-body a{color:#B45309;font-weight:500;border-bottom:1px solid rgba(180,83,9,0.4)}
.article-body a:hover{border-bottom-color:#B45309}
.article-body blockquote{border-left:3px solid #D97706;padding-left:20px;margin:32px 0;font-family:'Literata',serif;font-style:italic;font-size:18px;color:#1C1917;line-height:1.6}
.article-body blockquote p:last-child{margin-bottom:0}
.article-body .bv-figure{margin:32px 0}
.article-body .bv-figure img{width:100%;height:auto;display:block;border-radius:8px}
.article-body .bv-figure figcaption{font-family:'Space Grotesk',ui-monospace,monospace;font-size:12px;color:#78716C;margin-top:10px;letter-spacing:0.02em}
.article-body .bv-hero{margin:24px 0 40px}
.callout{background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;padding:24px 28px;margin:32px 0}
.callout-title{font-size:13px;font-weight:700;color:#92400E;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.callout ul,.callout ol{margin:0;padding-left:20px}
.callout li{margin-bottom:6px;font-size:14px;line-height:1.6;color:#44403C}
.callout li::marker{color:#D97706}
.callout p:last-child{margin-bottom:0}
.mono{font-family:'Space Grotesk',monospace;background:#F0EDE8;padding:2px 8px;border-radius:4px;font-size:14px;color:#1C1917}
.article-body code{font-family:'Space Grotesk',monospace;background:#F0EDE8;padding:2px 8px;border-radius:4px;font-size:14px;color:#1C1917}
.article-body pre{background:#1C1917;color:#F8F6F2;padding:20px 24px;border-radius:12px;overflow-x:auto;margin:0 0 24px;font-size:14px;line-height:1.6}
.article-body pre code{background:none;padding:0;color:inherit;font-size:14px}
.table-wrap{overflow-x:auto;margin:32px 0;border:1px solid rgba(0,0,0,0.08);border-radius:12px}
.article-body table{border-collapse:collapse;width:100%;font-size:14px;background:#fff}
.article-body th{text-align:left;font-weight:600;color:#1C1917;background:#F0EDE8;padding:12px 16px;border-bottom:1px solid rgba(0,0,0,0.08);white-space:nowrap}
.article-body td{padding:12px 16px;border-bottom:1px solid rgba(0,0,0,0.05);vertical-align:top;line-height:1.6}
.article-body tr:last-child td{border-bottom:none}
.faq{border-top:1px solid rgba(0,0,0,0.06);margin-top:48px;padding-top:32px}
.faq h2{font-family:'Literata',serif;font-size:24px;color:#1C1917;margin:0 0 24px;letter-spacing:-0.3px}
.faq-item{margin-bottom:24px}
.faq-q{font-size:16px;font-weight:600;color:#1C1917;margin:0 0 8px}
.faq-a{font-size:15px;color:#44403C;line-height:1.7;margin:0}
.article-bottom{border-top:1px solid rgba(0,0,0,0.06);margin-top:48px;padding-top:32px;display:flex;justify-content:space-between;align-items:center;gap:16px}
.article-nav-link{font-size:14px;color:#B45309;font-weight:600;transition:color .2s;display:inline-block;padding:6px 0}
.article-nav-link:hover{color:#92400E}
.article-bottom>a:last-child{text-align:right}`;

const ARTICLE_RESPONSIVE = `@media(max-width:768px){
.nav-links{display:none}
.hamburger{display:flex}
.nav-inner{padding:0 20px}
.article-wrap{padding:88px 20px 60px}
.article-title{font-size:28px}
.article-bottom{gap:12px}
.article-nav-link{font-size:13px}
.footer{padding:20px;flex-direction:column;gap:12px;text-align:center}
}`;

// Writing index styles. Posts render as a two-column card grid so titles,
// descriptions and category get room to breathe. Themes and sources are
// surfaced as filter chips above the grid rather than as group headers, and
// the list is sorted newest first by default.
const INDEX_CSS = `body{min-height:100vh;display:flex;flex-direction:column}
main{flex:1 0 auto}
.footer{flex-shrink:0}
.page-wrap{max-width:1040px;margin:0 auto;padding:120px 32px 80px}
.page-header{margin-bottom:32px;max-width:680px}
.page-title{font-family:'Literata',serif;font-size:36px;letter-spacing:-0.5px;margin:0 0 12px;color:#1C1917}
.page-desc{font-size:16px;color:#57534E;font-style:italic;line-height:1.7}
.filter-group{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.filter-row{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-top:10px;padding-bottom:20px;border-bottom:1px solid rgba(0,0,0,0.08);flex-wrap:wrap}
.filter-row .filter-group{margin:0}
.filter-row .filter-group:first-child{flex:1 1 auto;min-width:0}
.filter-row .filter-sort{flex:none}
.filter-label{font-family:'Literata',serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#A8A29E;flex:none}
.filter-bar{display:flex;flex-wrap:wrap;gap:6px}
.filter-chip{font-family:'Space Grotesk',system-ui,sans-serif;font-size:13px;font-weight:500;color:#57534E;background:transparent;border:1px solid rgba(0,0,0,0.12);border-radius:999px;padding:6px 14px;cursor:pointer;transition:all .15s;line-height:1.4}
.filter-chip:hover{border-color:#D97706;color:#D97706}
.filter-chip.active{background:#1C1917;border-color:#1C1917;color:#F8F6F2}
.sort-select{font-family:'Space Grotesk',system-ui,sans-serif;font-size:13px;font-weight:500;color:#1C1917;background:transparent;border:1px solid rgba(0,0,0,0.12);border-radius:999px;padding:6px 32px 6px 14px;cursor:pointer;line-height:1.4;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='none' stroke='%2357534E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1l4 4 4-4'/></svg>");background-repeat:no-repeat;background-position:right 12px center}
.sort-select:hover{border-color:#D97706;color:#D97706}
.sort-select:focus{outline:none;border-color:#D97706}
.article-list{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:28px}
.article-card{display:flex;flex-direction:column;gap:14px;padding:22px 24px 20px;background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:14px;transition:transform .2s,box-shadow .25s,border-color .2s;min-height:100%}
.article-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(0,0,0,0.07);border-color:rgba(217,119,6,0.35)}
.article-card:hover .article-card-title{color:#B45309}
.article-card:hover .article-card-arrow{transform:translateX(3px)}
.article-card.hidden{display:none}
.article-card-cat{display:inline-flex;align-items:center;gap:6px;font-family:'Space Grotesk',system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#B45309;background:#FEF3C7;padding:5px 11px 5px 9px;border-radius:999px;align-self:flex-start;line-height:1.2}
.article-card-cat svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
.article-card-title{font-family:'Literata',serif;font-size:20px;font-weight:600;line-height:1.3;letter-spacing:-0.2px;color:#1C1917;margin:0;transition:color .2s}
.article-card-desc{font-size:14.5px;line-height:1.6;color:#57534E;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.article-card-foot{margin-top:auto;padding-top:14px;border-top:1px solid rgba(0,0,0,0.06);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#A8A29E;font-variant-numeric:tabular-nums}
.article-card-arrow{color:#B45309;font-weight:600;font-size:13px;transition:transform .2s}
.article-empty{grid-column:1/-1;color:#78716C;margin-top:24px;font-style:italic}`;

const INDEX_RESPONSIVE = `@media(max-width:900px){
.article-list{grid-template-columns:1fr;gap:16px}
.page-wrap{max-width:680px}
}
@media(max-width:768px){
.nav-links{display:none}
.hamburger{display:flex}
.nav-inner{padding:0 20px}
.page-wrap{padding:88px 20px 60px}
.page-title{font-size:28px}
.filter-group{gap:8px;align-items:flex-start;flex-direction:column}
.filter-row{flex-direction:column;gap:14px;margin-top:14px;padding-bottom:18px}
.filter-row .filter-sort{width:100%}
.sort-select{width:100%}
.filter-chip{font-size:12px;padding:5px 12px}
.sort-select{font-size:12px}
.article-card{padding:20px 20px 18px;gap:12px}
.article-card-title{font-size:17px}
.article-card-desc{font-size:14px}
.footer{padding:20px;flex-direction:column;gap:12px;text-align:center}
}`;

// Single source of truth for the nav on every page. `active` highlights one
// link — pass 'writing' from writing pages; omit on the homepage.
const NAV_ITEMS = [
  { href: '/#what-i-do',  label: 'How I Work',  key: 'how' },
  { href: '/#flagships',  label: 'Flagships',   key: 'flagships' },
  { href: '/#work',       label: 'Work',        key: 'work' },
  { href: '/#career',     label: 'Experience',  key: 'career' },
  { href: '/writing',     label: 'Writing',     key: 'writing' },
];

const nav = (active) => {
  const cls = (k) => k === active ? ' class="active"' : '';
  const links = NAV_ITEMS.map((i) => `      <a href="${i.href}"${cls(i.key)}>${i.label}</a>`).join('\n');
  const mobile = NAV_ITEMS.map((i) => `  <a href="${i.href}" onclick="closeMenu()">${i.label}</a>`).join('\n');
  return `<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <div class="nav-logo-icon"><span>V</span></div>
      <span class="nav-logo-name">Vishal Das</span>
    </a>
    <div class="nav-links">
${links}
      <div class="nav-btns">
        <a href="/#contact" class="btn-outline">Request Resume</a>
        <a href="https://calendar.app.google/WXY4AVd5ScqExaLD6" target="_blank" rel="noopener" class="btn-primary">Book a Chat →</a>
      </div>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Menu" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
${mobile}
  <div class="nav-btns">
    <a href="/#contact" class="btn-outline" onclick="closeMenu()">Request Resume</a>
    <a href="https://calendar.app.google/WXY4AVd5ScqExaLD6" target="_blank" rel="noopener" class="btn-primary">Book a Chat →</a>
  </div>
</div>`;
};

const footer = () => `<footer class="footer">
  <span>&copy; 2026 Vishal Das</span>
  <div class="footer-links">
    <a href="https://github.com/kindavishal" target="_blank" rel="noopener">GitHub</a>
    <a href="https://www.linkedin.com/in/kindavishal/" target="_blank" rel="noopener">LinkedIn</a>
    <a href="/feed.xml">RSS</a>
  </div>
</footer>`;

const scripts = () => `<script>
function toggleMenu(){
  var m=document.getElementById('mobile-menu');
  var h=document.getElementById('hamburger');
  var open=m.classList.toggle('open');
  h.classList.toggle('active',open);
  document.body.style.overflow=open?'hidden':'';
}
function closeMenu(){
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
  document.body.style.overflow='';
}
window.addEventListener('resize',function(){if(window.innerWidth>768)closeMenu()});
var nav=document.getElementById('nav');
window.addEventListener('scroll',function(){
  nav.classList.toggle('scrolled',window.scrollY>20);
},{passive:true});
var reveals=document.querySelectorAll('.reveal');
var ro=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}
  });
// threshold 0, not 0.1: an element taller than the viewport can never reach a
// ratio of 0.1, which would leave it stuck at opacity 0 forever.
},{threshold:0,rootMargin:'0px 0px -40px 0px'});
reveals.forEach(function(el){ro.observe(el)});
</script>`;

module.exports = {
  SITE, ga, fonts, meta, nav, footer, scripts,
  BASE_CSS, BASE_RESPONSIVE,
  ARTICLE_CSS, ARTICLE_RESPONSIVE,
  INDEX_CSS, INDEX_RESPONSIVE,
};
