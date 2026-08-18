'use strict';

// <audio-summary-player slug="profile-bio"></audio-summary-player>
// Reads /public/audio/<slug>-<lang>.wav and /public/locales/<slug>-<lang>.json
// so it works on top of the plain static-file server.

(function () {
  const LANGS = [
    { code: 'en-IN', label: 'English', voices: [{ id: 'priya', label: 'Priya (F)' }, { id: 'shubh', label: 'Shubh (M)' }] },
    { code: 'hi-IN', label: 'हिंदी',   voices: [{ id: 'shubh', label: 'Shubh (M)' }, { id: 'priya', label: 'Priya (F)' }] },
    { code: 'ta-IN', label: 'தமிழ்',   voices: [{ id: 'priya', label: 'Priya (F)' }, { id: 'shubh', label: 'Shubh (M)' }] },
    { code: 'te-IN', label: 'తెలుగు',  voices: [{ id: 'priya', label: 'Priya (F)' }, { id: 'shubh', label: 'Shubh (M)' }] },
    { code: 'bn-IN', label: 'বাংলা',   voices: [{ id: 'shubh', label: 'Shubh (M)' }, { id: 'priya', label: 'Priya (F)' }] },
    { code: 'mr-IN', label: 'मराठी',   voices: [{ id: 'shubh', label: 'Shubh (M)' }, { id: 'priya', label: 'Priya (F)' }] },
  ];
  const SPEEDS = [1, 1.25];
  const AUDIO_BASE = '/public/audio';
  const LOCALE_BASE = '/public/locales';

  const fmt = (s) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
  };

  class AudioSummaryPlayer extends HTMLElement {
    connectedCallback() {
      this.slug = this.getAttribute('slug') || 'profile-bio';
      this.lang = 'en-IN';
      this.voice = LANGS[0].voices[0].id;
      this.speed = 1;
      this.render();
      this.load();
    }

    voicesFor(lang) {
      const l = LANGS.find((x) => x.code === lang);
      return l ? l.voices : [];
    }

    renderVoiceOptions() {
      return this.voicesFor(this.lang)
        .map((v) => `<option value="${v.id}">${v.label}</option>`).join('');
    }

    render() {
      const langOpts = LANGS.map((l) => `<option value="${l.code}">${l.label}</option>`).join('');
      const speedOpts = SPEEDS.map((s) => `<option value="${s}">${s}x</option>`).join('');
      this.innerHTML = `
        <style>
          audio-summary-player{display:block;background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:14px;padding:20px 22px;margin:24px 0;font-family:'Space Grotesk',system-ui,sans-serif}
          .asp-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap}
          .asp-label{font-family:'Literata',serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#A8A29E}
          .asp-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
          .asp-select{font:inherit;font-size:13px;color:#1C1917;background:#F8F6F2;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:6px 28px 6px 10px;cursor:pointer;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='none' stroke='%2357534E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' d='M1 1l4 4 4-4'/></svg>");background-repeat:no-repeat;background-position:right 10px center}
          .asp-row{display:flex;align-items:center;gap:12px}
          .asp-play{width:40px;height:40px;border-radius:50%;background:#1C1917;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;transition:background .15s}
          .asp-play:hover{background:#B45309}
          .asp-play svg{width:16px;height:16px;fill:currentColor}
          .asp-progress{flex:1;height:4px;background:rgba(0,0,0,0.08);border-radius:2px;overflow:hidden;cursor:pointer;position:relative}
          .asp-bar{height:100%;width:0;background:#B45309;transition:width .1s linear}
          .asp-time{font-size:12px;color:#78716C;font-variant-numeric:tabular-nums;min-width:78px;text-align:right}
          .asp-text{margin-top:14px;font-size:14.5px;line-height:1.7;color:#44403C;background:#F8F6F2;border-radius:10px;padding:14px 16px;min-height:56px;white-space:pre-wrap}
          .asp-error{color:#B45309;font-size:13px;margin-top:10px}
        </style>
        <div class="asp-head">
          <span class="asp-label">Audio summary</span>
          <div class="asp-controls">
            <select class="asp-select asp-lang" aria-label="Language">${langOpts}</select>
            <select class="asp-select asp-voice" aria-label="Voice">${this.renderVoiceOptions()}</select>
            <select class="asp-select asp-speed" aria-label="Playback speed">${speedOpts}</select>
          </div>
        </div>
        <div class="asp-row">
          <button class="asp-play" type="button" aria-label="Play">
            <svg viewBox="0 0 24 24" class="asp-icon-play"><path d="M8 5v14l11-7z"/></svg>
            <svg viewBox="0 0 24 24" class="asp-icon-pause" style="display:none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
          </button>
          <div class="asp-progress"><div class="asp-bar"></div></div>
          <span class="asp-time">0:00 / 0:00</span>
        </div>
        <p class="asp-text" aria-live="polite"></p>
        <audio class="asp-audio" preload="metadata"></audio>
      `;

      this.$lang = this.querySelector('.asp-lang');
      this.$voice = this.querySelector('.asp-voice');
      this.$speed = this.querySelector('.asp-speed');
      this.$play = this.querySelector('.asp-play');
      this.$iconPlay = this.querySelector('.asp-icon-play');
      this.$iconPause = this.querySelector('.asp-icon-pause');
      this.$progress = this.querySelector('.asp-progress');
      this.$bar = this.querySelector('.asp-bar');
      this.$time = this.querySelector('.asp-time');
      this.$text = this.querySelector('.asp-text');
      this.$audio = this.querySelector('.asp-audio');

      this.$lang.addEventListener('change', () => {
        this.lang = this.$lang.value;
        const voices = this.voicesFor(this.lang);
        this.voice = voices[0] ? voices[0].id : '';
        this.$voice.innerHTML = this.renderVoiceOptions();
        this.load();
      });
      this.$voice.addEventListener('change', () => {
        this.voice = this.$voice.value;
        this.load();
      });
      this.$speed.addEventListener('change', () => {
        this.speed = Number(this.$speed.value);
        this.$audio.playbackRate = this.speed;
      });
      this.$play.addEventListener('click', () => this.toggle());
      this.$audio.addEventListener('timeupdate', () => this.tick());
      this.$audio.addEventListener('loadedmetadata', () => this.tick());
      this.$audio.addEventListener('ended', () => this.setPlaying(false));
      this.$progress.addEventListener('click', (e) => {
        const rect = this.$progress.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (this.$audio.duration) this.$audio.currentTime = pct * this.$audio.duration;
      });
    }

    async load() {
      const audioUrl = `${AUDIO_BASE}/${this.slug}-${this.lang}-${this.voice}.wav`;
      const localeUrl = `${LOCALE_BASE}/${this.slug}-${this.lang}.json`;
      this.setPlaying(false);
      this.$audio.pause();
      this.$audio.src = audioUrl;
      this.$audio.playbackRate = this.speed;
      this.$text.textContent = 'Loading…';
      try {
        const res = await fetch(localeUrl);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        this.$text.textContent = data.text || '';
      } catch (err) {
        this.$text.innerHTML = '<span class="asp-error">Transcript not generated yet. Run <code>npm run generate:audio</code>.</span>';
      }
    }

    toggle() {
      if (!this.$audio.src) return;
      if (this.$audio.paused) {
        this.$audio.play().then(() => this.setPlaying(true)).catch(() => {
          this.$text.innerHTML = '<span class="asp-error">Audio not generated yet. Run <code>npm run generate:audio</code>.</span>';
        });
      } else {
        this.$audio.pause();
        this.setPlaying(false);
      }
    }

    setPlaying(on) {
      this.$iconPlay.style.display = on ? 'none' : '';
      this.$iconPause.style.display = on ? '' : 'none';
      this.$play.setAttribute('aria-label', on ? 'Pause' : 'Play');
    }

    tick() {
      const d = this.$audio.duration || 0;
      const c = this.$audio.currentTime || 0;
      this.$bar.style.width = d ? `${(c / d) * 100}%` : '0%';
      this.$time.textContent = `${fmt(c)} / ${fmt(d)}`;
    }
  }

  if (!customElements.get('audio-summary-player')) {
    customElements.define('audio-summary-player', AudioSummaryPlayer);
  }
})();
