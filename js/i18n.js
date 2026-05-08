class I18n {
  constructor() {
    this.locales = {};
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.listeners = [];
    this.dataListeners = [];
  }

  async init() {
    try {
      const res = await fetch('data/locales/en.json');
      this.locales.en = await res.json();
    } catch (e) {
      this.locales.en = {};
    }
    try {
      if (this.currentLang !== 'en') {
        const res = await fetch(`data/locales/${this.currentLang}.json`);
        this.locales[this.currentLang] = await res.json();
      }
    } catch (e) {
      this.currentLang = 'en';
    }
    this.apply();
  }

  t(key) {
    const lang = this.locales[this.currentLang];
    if (lang && lang[key] !== undefined) return lang[key];
    if (this.locales.en && this.locales.en[key] !== undefined) return this.locales.en[key];
    return key;
  }

  async setLang(lang) {
    if (lang === this.currentLang) return;
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    if (!this.locales[lang]) {
      try {
        const res = await fetch(`data/locales/${lang}.json`);
        this.locales[lang] = await res.json();
      } catch (e) {
        this.currentLang = 'en';
        return;
      }
    }
    this.apply();
  }

  apply() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const isPlaceholder = el.hasAttribute('data-i18n-placeholder');
      if (isPlaceholder) {
        el.placeholder = this.t(key);
      } else {
        el.textContent = this.t(key);
      }
    });
    document.documentElement.lang = this.currentLang;
    this.listeners.forEach((fn) => fn(this.currentLang));
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  onDataChange(fn) {
    this.dataListeners.push(fn);
  }

  async toggle() {
    const next = this.currentLang === 'en' ? 'zh' : 'en';
    await this.setLang(next);

    const isZh = next === 'zh';

    if (isZh) {
      if (typeof portfolioDataZh !== 'undefined') {
        Object.assign(portfolioData, portfolioDataZh);
      }
    } else {
      document.location.reload();
      return;
    }

    let wisdoms = [];
    try {
      const res = await fetch(isZh ? 'data/wisdoms/wisdoms-zh.json' : 'data/wisdoms/wisdoms.json');
      wisdoms = await res.json();
    } catch (e) {
      try {
        const res = await fetch('data/wisdoms/wisdoms.json');
        wisdoms = await res.json();
      } catch (e2) {}
    }

    if (portfolioData.wisdoms !== undefined) {
      portfolioData.wisdoms.length = 0;
      portfolioData.wisdoms.push(...wisdoms);
    }

    this.dataListeners.forEach((fn) => fn(next, wisdoms));
  }
}

const i18n = new I18n();
