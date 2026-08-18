#!/usr/bin/env node
'use strict';

/**
 * Generate Indic multilingual audio summaries via Sarvam AI.
 *
 * Cache-first: for each (item, language) we skip both API calls when the
 * translated JSON and the .wav already exist on disk. Rerunning after adding
 * a single new post therefore only spends credits on that one post.
 *
 *   node scripts/generate-multilingual-audio.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'public', 'locales');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');
const CONTENT_DIR = path.join(ROOT, 'content', 'writing');
const ENV_FILE = path.join(ROOT, '.env');

const TRANSLATE_URL = 'https://api.sarvam.ai/translate';
const TTS_URL = 'https://api.sarvam.ai/text-to-speech';
const REQUEST_DELAY_MS = 250;

const LANGUAGES = [
  { code: 'en-IN', speaker: 'anushka' },
  { code: 'hi-IN', speaker: 'shubh' },
  { code: 'ta-IN', speaker: 'anushka' },
  { code: 'te-IN', speaker: 'anushka' },
  { code: 'bn-IN', speaker: 'shubh' },
  { code: 'mr-IN', speaker: 'shubh' },
];

// Short bio for the homepage player. Kept as one paragraph so it fits comfortably
// inside a summary (Sarvam TTS caps a single input around ~500 chars).
const PROFILE_BIO = "I'm Vishal Das, a Developer Community and Program Manager. I build creator programs, ambassador tiers, and adoption loops for developer platforms. My work turns scattered contributor energy into measurable engagement, referrals, and revenue for the teams I partner with.";

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) return;
  const raw = fs.readFileSync(ENV_FILE, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    const [, k, v] = m;
    if (!process.env[k]) process.env[k] = v.replace(/^['"]|['"]$/g, '');
  }
}

function requireApiKey() {
  const key = process.env.SARVAM_API_KEY;
  if (!key || key === 'YOUR_SARVAM_API_KEY_HERE') {
    console.error('\nSARVAM_API_KEY is not set.');
    console.error('  cp .env.example .env');
    console.error('  # then edit .env and paste your Sarvam key\n');
    process.exit(1);
  }
  return key;
}

function ensureDirs() {
  fs.mkdirSync(LOCALES_DIR, { recursive: true });
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return yaml.load(m[1]);
}

function collectItems() {
  const items = [{ slug: 'profile-bio', text: PROFILE_BIO }];
  if (!fs.existsSync(CONTENT_DIR)) return items;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm || !fm.description) continue;
    const slug = fm.slug || file.replace(/\.md$/, '');
    items.push({ slug, text: String(fm.description) });
  }
  return items;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translate(apiKey, text, targetLang) {
  const res = await fetch(TRANSLATE_URL, {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      source_language_code: 'en-IN',
      target_language_code: targetLang,
      model: 'mayura:v1',
      mode: 'formal',
    }),
  });
  if (!res.ok) throw new Error(`translate ${targetLang}: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.translated_text || json.output || json.text || '';
}

async function synthesize(apiKey, text, targetLang, speaker) {
  const res = await fetch(TTS_URL, {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [text],
      target_language_code: targetLang,
      speaker,
      model: 'bulbul:v3',
      pace: 1.0,
    }),
  });
  if (!res.ok) throw new Error(`tts ${targetLang}: ${res.status} ${await res.text()}`);
  const json = await res.json();
  const b64 = json.audios && json.audios[0];
  if (!b64) throw new Error(`tts ${targetLang}: no audio in response`);
  return Buffer.from(b64, 'base64');
}

async function processItem(apiKey, item) {
  for (const { code, speaker } of LANGUAGES) {
    const localePath = path.join(LOCALES_DIR, `${item.slug}-${code}.json`);
    const audioPath = path.join(AUDIO_DIR, `${item.slug}-${code}.wav`);

    if (fs.existsSync(localePath) && fs.existsSync(audioPath)) {
      console.log(`[CACHED] Skipping ${item.slug} in ${code}`);
      continue;
    }

    try {
      let text = item.text;
      if (code !== 'en-IN') {
        text = await translate(apiKey, item.text, code);
        await sleep(REQUEST_DELAY_MS);
      }
      fs.writeFileSync(localePath, JSON.stringify({ slug: item.slug, lang: code, text }, null, 2));
      console.log(`[TEXT]   ${item.slug} ${code}`);

      const audio = await synthesize(apiKey, text, code, speaker);
      fs.writeFileSync(audioPath, audio);
      console.log(`[AUDIO]  ${item.slug} ${code} (${audio.length} bytes)`);
      await sleep(REQUEST_DELAY_MS);
    } catch (err) {
      console.error(`[FAIL]   ${item.slug} ${code}: ${err.message}`);
    }
  }
}

async function main() {
  loadEnv();
  const apiKey = requireApiKey();
  ensureDirs();
  const items = collectItems();
  console.log(`Processing ${items.length} items across ${LANGUAGES.length} languages.`);
  for (const item of items) {
    await processItem(apiKey, item);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
