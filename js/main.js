class PortfolioApp {
  constructor() {
    this.loadingProgress = 0;
    this.initTheme();
    i18n.init().then(() => {
      this.initLoading();
      this.initNavbar();
      this.initScrollProgress();
      this.initBackToTop();
      this.initMouseGlow();
      this.initScrollAnimations();
      this.initBackground();
      this.initLangToggle();
    });
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggle = document.getElementById('themeToggle');
    const icon = toggle.querySelector('i');

    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      const icon = toggle.querySelector('i');
      icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

      toggle.style.transform = 'rotate(360deg)';
      setTimeout(() => { toggle.style.transform = ''; }, 300);
    });
  }

  initLoading() {
    this.loader = document.getElementById('loadingScreen');
    this.loadingBar = document.getElementById('loadingProgress');
  }

  updateLoadingProgress(loaded, total) {
    const pct = Math.round((loaded / total) * 80);
    if (pct > this.loadingProgress) {
      this.loadingProgress = pct;
      this.loadingBar.style.width = this.loadingProgress + '%';
    }
  }

  finishLoading() {
    this.loadingBar.style.width = '100%';
    setTimeout(() => {
      this.loader.classList.add('hidden');
      this.initHeroContent();
      this.initHeroParticles();
      this.initTypewriterEffect();
      this.initMottoScroller();
      this.initSkillTags();
      this.initTimeline();
      this.initProjects();
      this.initWisdomUniverse();
      this.initGuestbook();
      this.initMusicPlayer();
      this.initFooter();
    }, 400);
  }

  initHeroContent() {
    const p = portfolioData.personal;
    const greeting = document.getElementById('heroGreeting');
    const name = document.getElementById('heroName');
    const typewriter = document.getElementById('typewriterText');
    const motto = document.getElementById('mottoText');
    const avatar = document.getElementById('aboutAvatar');

    if (greeting) greeting.textContent = i18n.t('hero.greeting');
    if (name) name.textContent = p.name;
    if (typewriter) typewriter.dataset.text = p.title;
    if (motto) motto.textContent = `"${p.mottos ? p.mottos[0] : p.motto}"`;
    if (avatar) {
      avatar.src = p.avatar;
      avatar.alt = p.name;
    }

    document.title = `${p.name} | ${p.title}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = `${p.name} - ${p.title}. ${p.motto}`;

    const bioContainer = document.getElementById('bioContainer');
    if (bioContainer && p.bio) {
      bioContainer.innerHTML = p.bio.map((text) =>
        `<p class="text-base mb-4 fade-in-right visible" style="color: var(--text-secondary); line-height: 1.8">${this.escapeHtml(text)}</p>`
      ).join('');
    }
  }

  initMottoScroller() {
    const el = document.getElementById('mottoText');
    if (!el || !portfolioData.personal.mottos) return;

    const mottos = portfolioData.personal.mottos;
    let index = 0;

    setInterval(() => {
      index = (index + 1) % mottos.length;
      el.classList.remove('visible');
      el.classList.add('fade-out');

      setTimeout(() => {
        el.textContent = `"${mottos[index]}"`;
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
        requestAnimationFrame(() => {
          el.classList.remove('fade-in');
          el.classList.add('visible');
        });
      }, 500);
    }, 4000);
  }

  initHeroParticles() {
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
      new HeroParticles(heroCanvas);
    }
  }

  async initBackground() {
    const hero = document.getElementById('hero');
    if (!hero) {
      this.finishLoading();
      return;
    }

    this.bgSwitcher = new BackgroundSwitcher(hero, backgroundImages);
    this.bgSwitcher.onProgress = (loaded, total) => {
      this.updateLoadingProgress(loaded, total);
    };
    this.bgSwitcher.onReady = () => {
      this.finishLoading();
    };

    const fontsReady = document.fonts.ready;
    const windowLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });

    Promise.all([fontsReady, windowLoaded]).then(() => {
      this.loadingBar.style.width = Math.max(parseInt(this.loadingBar.style.width) || 0, 85) + '%';
    });

    this.bgSwitcher.load();

    hero.addEventListener('click', (e) => {
      if (!this.bgSwitcher || this.bgSwitcher.isTransitioning) return;

      const available = this.bgSwitcher.loadedImages.filter(Boolean).length;
      if (available < 2) return;

      const isBgClick = e.target === hero ||
        e.target.classList.contains('hero__bg-canvas') ||
        e.target.classList.contains('hero__gradient-orb') ||
        e.target.classList.contains('bg-reveal');
      if (!isBgClick) return;

      let idx;
      do {
        idx = Math.floor(Math.random() * this.bgSwitcher.images.length);
      } while (idx === this.bgSwitcher.currentIndex);

      this.bgSwitcher.switchTo(idx, e.clientX, e.clientY);
    });
  }

  initTypewriterEffect() {
    const element = document.getElementById('typewriterText');
    if (!element) return;
    const text = element.dataset.text || portfolioData.personal.title;
    element.textContent = '';
    element.classList.add('visible');
    let i = 0;
    const speed = 40;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed + Math.random() * 30);
      }
    }
    setTimeout(type, 500);
  }

  initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.navbar__links');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    mobileBtn?.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      links.classList.toggle('mobile-open');
      document.body.style.overflow = links.classList.contains('mobile-open') ? 'hidden' : '';
    });

    links?.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        links.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      bar.style.width = progress + '%';
    });
  }

  initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > window.innerHeight);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initMouseGlow() {
    const glow = document.getElementById('mouseGlow');
    let isMobile = window.innerWidth <= 768;

    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 768;
    });

    document.addEventListener('mousemove', (e) => {
      if (isMobile) return;
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
      glow.classList.remove('visible');
    });
  }

  initLangToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    btn.textContent = i18n.currentLang.toUpperCase();
    i18n.onDataChange(() => {
      this.initHeroContent();
      this.initTypewriterEffect();
      this.initMottoScroller();
      this.initSkillTags();
      this.initTimeline();
      this.initProjects();
      this.initFooter();
      const randomBtn = document.querySelector('.btn-random-wisdom');
      if (randomBtn) randomBtn.innerHTML = '<i class="fas fa-dice"></i> ' + i18n.t('wisdom.randomBtn');
      const submitBtn = document.querySelector('.wisdom-submit-btn');
      if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + i18n.t('wisdom.submit');
    });
    btn.addEventListener('click', async () => {
      await i18n.toggle();
      btn.textContent = i18n.currentLang.toUpperCase();
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach((el) => {
      observer.observe(el);
    });
  }

  initSkillTags() {
    const container = document.getElementById('skillTags');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#165DFF', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#EC4899'];
    portfolioData.skills.forEach((skill, i) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill.name;
      tag.style.setProperty('--tag-hover-color', colors[i % colors.length]);
      tag.addEventListener('mouseenter', () => {
        tag.style.setProperty('background', colors[i % colors.length]);
        tag.style.setProperty('border-color', colors[i % colors.length]);
        tag.style.setProperty('color', 'white');
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.background = '';
        tag.style.borderColor = '';
        tag.style.color = '';
      });
      container.appendChild(tag);
    });
  }

  initTimeline() {
    const container = document.getElementById('timeline');
    if (!container) return;
    container.innerHTML = '';

    portfolioData.timeline.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'timeline__item fade-in visible';
      const isEducation = item.type === 'education';
      div.innerHTML = `
        <div class="timeline__dot ${isEducation ? 'timeline__dot--education' : ''} timeline__dot--pulse"></div>
        <div class="timeline__year">${item.year}</div>
        <div class="timeline__title">${item.title}</div>
        <div class="timeline__company">${item.company}</div>
        <div class="timeline__description">${item.description}</div>
      `;
      container.appendChild(div);
    });
  }

  initProjects() {
    const featured = document.getElementById('featuredProjects');
    const other = document.getElementById('otherProjects');
    if (featured) featured.innerHTML = '';
    if (other) other.innerHTML = '';
    this.renderProjects('featuredProjects', portfolioData.featuredProjects, true);
    this.renderProjects('otherProjects', portfolioData.otherProjects, false);
    this.initProjectCardListeners();
  }

  renderProjects(containerId, projects, featured) {
    const container = document.getElementById(containerId);
    if (!container) return;

    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = `glass-card project-card p-6 fade-in visible`;
      card.dataset.projectId = project.id;

      card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold mb-1" style="color: var(--text-primary)">${project.name}</h3>
            <div class="flex flex-wrap gap-2 mb-3">
              ${project.tags.slice(0, 3).map((tag) => `<span class="tag">${tag}</span>`).join('')}
              ${project.tags.length > 3 ? `<span class="tag">+${project.tags.length - 3}</span>` : ''}
            </div>
          </div>
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="flex-shrink-0 ml-3 w-9 h-9 flex items-center justify-center rounded-lg border" style="border-color: var(--border-color); color: var(--text-secondary); transition: all 0.2s ease-in-out" onmouseover="this.style.background='#165DFF';this.style.color='white';this.style.borderColor='#165DFF'" onmouseout="this.style.background='transparent';this.style.color='';this.style.borderColor=''">
            <i class="fab fa-github text-sm"></i>
          </a>
        </div>
        <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-secondary); line-height: 1.6">${project.description}</p>
        <div class="project-card__expand" style="padding: 0">
          <div class="pt-4 border-t" style="border-color: var(--border-color)">
            <div class="flex flex-wrap gap-2 mb-4">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p class="text-sm mb-4" style="color: var(--text-secondary); line-height: 1.6">${project.description}</p>
            <div class="flex gap-3">
              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-outline text-sm py-2 px-4">
                <i class="fab fa-github"></i> ${i18n.t('btn.source')}
              </a>
              ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm py-2 px-4">
                <i class="fas fa-external-link-alt"></i> ${i18n.t('btn.demo')}
              </a>` : ''}
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  initProjectCardListeners() {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const expand = card.querySelector('.project-card__expand');
        const isOpen = expand.classList.contains('open');
        document.querySelectorAll('.project-card__expand.open').forEach((el) => {
          if (el !== expand) el.classList.remove('open');
        });
        expand.classList.toggle('open');
      });
    });
  }

  initWisdomUniverse() {
    const container = document.getElementById('wisdomUniverse');
    if (!container) return;

    const wisdoms = [];
    portfolioData.wisdoms = wisdoms;
    this.wisdomUniverse = new WisdomUniverse(container, wisdoms);

    fetch('data/wisdoms/wisdoms.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        wisdoms.length = 0;
        wisdoms.push(...data);
      })
      .catch(() => {});

    const randomBtn = container.querySelector('.btn-random-wisdom');
    if (randomBtn) randomBtn.innerHTML = '<i class="fas fa-dice"></i> ' + i18n.t('wisdom.randomBtn');
    randomBtn?.addEventListener('click', () => {
      randomBtn.classList.add('spinning');
      setTimeout(() => randomBtn.classList.remove('spinning'), 600);
      setTimeout(() => this.wisdomUniverse.getRandomWisdom(), 300);
    });

    const input = container.querySelector('.wisdom-input');
    const submitBtn = container.querySelector('.wisdom-submit-btn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + i18n.t('wisdom.submit');
    submitBtn?.addEventListener('click', () => {
      const text = input.value.trim();
      if (text) {
        wisdoms.push(text);
        input.value = '';
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ' + i18n.t('wisdom.added');
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + i18n.t('wisdom.submit');
        }, 1500);
      }
    });

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitBtn.click();
    });
  }

  initGuestbook() {
    const container = document.getElementById('guestbookMessages');
    const form = document.getElementById('guestbookForm');
    if (!container || !form) return;

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const API = '/api/guestbook';
    const messages = [];

    const renderMessages = () => {
      container.innerHTML = '';
      [...messages].reverse().forEach((msg) => {
        const div = document.createElement('div');
        div.className = 'guestbook__message fade-in';
        div.innerHTML = `
          <div class="guestbook__message-text">${this.escapeHtml(msg.text)}</div>
          <div class="guestbook__message-meta">
            <span>${this.escapeHtml(msg.name || 'Anonymous')}</span>
            <span class="mx-1">·</span>
            <span>${msg.date}</span>
          </div>
        `;
        container.appendChild(div);
        requestAnimationFrame(() => div.classList.add('visible'));
      });
    };

    const loadMessages = async () => {
      if (isLocal) {
        const local = JSON.parse(localStorage.getItem('guestbook') || '[]');
        messages.length = 0;
        messages.push(...local);
        renderMessages();
        return;
      }
      try {
        const res = await fetch(API);
        if (res.ok) {
          const data = await res.json();
          messages.length = 0;
          data.forEach((item) => {
            messages.push({
              name: item.name || 'Anonymous',
              text: item.text,
              date: item.date,
            });
          });
        } else {
          throw new Error('API error');
        }
      } catch (e) {
        const local = JSON.parse(localStorage.getItem('guestbook') || '[]');
        messages.length = 0;
        messages.push(...local);
      }
      renderMessages();
    };

    const saveToLocal = (msg) => {
      const local = JSON.parse(localStorage.getItem('guestbook') || '[]');
      local.push(msg);
      localStorage.setItem('guestbook', JSON.stringify(local));
    };

    loadMessages();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"]');
      const textInput = form.querySelector('[name="message"]');
      const name = nameInput.value.trim() || 'Anonymous';
      const text = textInput.value.trim();

      if (!text) return;

      const msg = {
        name,
        text,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      };

      try {
        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(msg),
        });
        if (res.ok) {
          messages.push(msg);
        } else {
          throw new Error('API error');
        }
      } catch (e) {
        saveToLocal(msg);
        messages.push(msg);
      }

      renderMessages();
      nameInput.value = '';
      textInput.value = '';
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  initMusicPlayer() {
    const container = document.getElementById('musicPlayer');
    if (!container) return;
    this.musicPlayer = new MusicPlayer(container, portfolioData.musicPlaylist);
  }

  initFooter() {
    const socialContainer = document.getElementById('socialLinks');
    const updateEl = document.getElementById('lastUpdated');
    if (socialContainer) {
      socialContainer.innerHTML = '';
      portfolioData.socialLinks.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'footer__social-link';
        a.title = link.name;
        a.innerHTML = `<i class="${link.icon}"></i>`;
        socialContainer.appendChild(a);
      });
    }

    if (updateEl) {
      updateEl.textContent = `Last updated: ${portfolioData.lastUpdated}`;
    }

    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    document.getElementById('footerName').textContent = portfolioData.personal.name;
    const footerName2 = document.getElementById('footerName2');
    if (footerName2) footerName2.textContent = portfolioData.personal.name;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new PortfolioApp();
});
