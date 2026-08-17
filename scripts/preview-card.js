#!/usr/bin/env node
'use strict';

/**
 * Regenerates assets/preview-card.png — the shared social preview used for the
 * homepage and /writing (per-post cards live in assets/og/ and are generated
 * from build.js).
 *
 * Design source: claude.ai/design "Link Preview" project, variant 2a — cream
 * editorial card with the portrait on the left and the byline on the right.
 * Text set with libvips' system fonts (Georgia / Helvetica / Menlo), same as
 * ogSvg() in build.js.
 *
 *   node scripts/preview-card.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'profile.jpg');
const OUT = path.join(ROOT, 'assets', 'preview-card.png');

const W = 1200;
const H = 630;

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS  = 'Helvetica, Arial, sans-serif';
const MONO  = 'Menlo, Consolas, monospace';

const cream     = '#F5F1E8';
const amber     = '#D97706';
const ink       = '#1C1917';
const inkMuted  = '#57534E';
const inkFaint  = '#78716C';

// Portrait: 360x360 circle at (64, 135) with a 4px amber ring.
const PORTRAIT = 360;
const P_X = 64;
const P_Y = 135;
const P_CX = P_X + PORTRAIT / 2;
const P_CY = P_Y + PORTRAIT / 2;

// Right column starts after portrait + 56px gap.
const R_X = P_X + PORTRAIT + 56;

// Vertical stack (roughly matches the design's flex column, 18px gap):
//   logo row (36) → name (88) → role (26 × 2 lines) → quote (18 × 2 lines).
const CONTENT_TOP = 168;

function bgSvg() {
  const logoY = CONTENT_TOP;
  const nameBase = CONTENT_TOP + 36 + 18 + 84;             // ~ 306
  const roleTop = nameBase + 18;                           // ~ 324
  const role1 = roleTop + 22;
  const role2 = role1 + 34;
  const quoteTop = role2 + 24;
  const quote1 = quoteTop + 16;
  const quote2 = quote1 + 26;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${cream}"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${amber}"/>

  <!-- Logo tile + URL -->
  <rect x="${R_X}" y="${logoY}" width="36" height="36" rx="9" fill="${ink}"/>
  <text x="${R_X + 18}" y="${logoY + 25}" font-family="${SERIF}" font-size="20" font-weight="700" fill="${amber}" text-anchor="middle">V</text>
  <text x="${R_X + 48}" y="${logoY + 24}" font-family="${MONO}" font-size="12" font-weight="600" fill="${inkFaint}" letter-spacing="2">KINDAVISHAL.JS.ORG</text>

  <!-- Name -->
  <text x="${R_X}" y="${nameBase}" font-family="${SERIF}" font-size="88" font-weight="700" fill="${ink}" letter-spacing="-2.4">Vishal Das</text>

  <!-- Role -->
  <text x="${R_X}" y="${role1}" font-family="${SANS}" font-size="26" font-weight="500" fill="${inkMuted}">Developer Community</text>
  <text x="${R_X}" y="${role2}" font-family="${SANS}" font-size="26" font-weight="500" fill="${inkMuted}">&amp; Program Manager</text>

  <!-- Pull quote (amber left rule + italic serif) -->
  <rect x="${R_X}" y="${quoteTop - 4}" width="2" height="48" fill="${amber}"/>
  <text x="${R_X + 14}" y="${quote1}" font-family="${SERIF}" font-style="italic" font-size="18" fill="${inkFaint}">&#8220;Untangles complex programs, builds the systems</text>
  <text x="${R_X + 14}" y="${quote2}" font-family="${SERIF}" font-style="italic" font-size="18" fill="${inkFaint}">to run them, and makes sure they land.&#8221;</text>

  <!-- Amber ring around the portrait (portrait itself is composited on top) -->
  <circle cx="${P_CX}" cy="${P_CY}" r="${PORTRAIT / 2 + 2}" fill="none" stroke="${amber}" stroke-width="4"/>
</svg>`;
}

const maskSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" width="${PORTRAIT}" height="${PORTRAIT}">
  <circle cx="${PORTRAIT / 2}" cy="${PORTRAIT / 2}" r="${PORTRAIT / 2}" fill="#fff"/>
</svg>`;

async function main() {
  const portrait = await sharp(SRC)
    .resize(PORTRAIT, PORTRAIT, { fit: 'cover', position: 'top' })
    .composite([{ input: Buffer.from(maskSvg()), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(Buffer.from(bgSvg()))
    .composite([{ input: portrait, left: P_X, top: P_Y }])
    .png()
    .toFile(OUT);

  console.log(`  wrote ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(`\npreview-card failed: ${err.message}\n`);
  process.exit(1);
});
