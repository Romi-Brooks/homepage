class WisdomUniverse {
  constructor(container, wisdoms) {
    this.container = container;
    this.wisdoms = wisdoms;
    this.canvas = container.querySelector('.wisdom-universe__canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.meteors = [];
    this.galaxyAngle = 0;
    this.hoveredStar = null;
    this.hoverPos = { x: null, y: null };
    this.currentWisdom = null;
    this.card = container.querySelector('.wisdom-universe__card');
    this.cardText = this.card.querySelector('.wisdom-universe__card-text');
    this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.meteorTimer = 0;

    this.resize();
    this.initStars();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  initStars() {
    const count = this.isReduced ? 20 : Math.min(Math.floor((this.canvas.width * this.canvas.height) / 10000), 70);
    for (let i = 0; i < count; i++) {
      this.stars.push(this.createStar(i));
    }
  }

  createStar(index) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * Math.min(this.canvas.width, this.canvas.height) * 0.6;
    return {
      index: index,
      cx: this.canvas.width / 2 + Math.cos(angle) * radius,
      cy: this.canvas.height / 2 + Math.sin(angle) * radius,
      orbitRadius: radius,
      orbitAngle: angle,
      orbitSpeed: (0.0003 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2.5 + 0.8,
      baseOpacity: Math.random() * 0.4 + 0.3,
      hue: Math.random() * 80 + 200,
      pulseSpeed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.15,
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.stars = [];
      this.initStars();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.hoverPos.x = e.clientX - rect.left;
      this.hoverPos.y = e.clientY - rect.top;

      this.hoveredStar = null;
      for (const star of this.stars) {
        const dx = this.hoverPos.x - star.x;
        const dy = this.hoverPos.y - star.y;
        if (Math.sqrt(dx * dx + dy * dy) < star.size * 8) {
          this.hoveredStar = star;
          this.canvas.style.cursor = 'pointer';
          break;
        }
      }
      if (!this.hoveredStar) {
        this.canvas.style.cursor = 'default';
      }
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredStar = null;
      this.hoverPos.x = null;
      this.hoverPos.y = null;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const star of this.stars) {
        const dx = mx - star.x;
        const dy = my - star.y;
        if (Math.sqrt(dx * dx + dy * dy) < star.size * 8) {
          this.showWisdom(star.index);
          break;
        }
      }
    });

    this.card.querySelector('.btn-close-wisdom')?.addEventListener('click', () => {
      this.hideWisdom();
    });
  }

  showWisdom(index) {
    this.currentWisdom = index;
    const text = this.wisdoms[index % this.wisdoms.length];
    this.cardText.textContent = `"${text}"`;
    this.card.classList.add('visible');
  }

  hideWisdom() {
    this.card.classList.remove('visible');
    this.currentWisdom = null;
  }

  getRandomWisdom() {
    const idx = Math.floor(Math.random() * this.wisdoms.length);
    this.showWisdom(idx);
  }

  spawnMeteor() {
    const fromLeft = Math.random() > 0.5;
    this.meteors.push({
      x: fromLeft ? -50 : this.canvas.width + 50,
      y: Math.random() * this.canvas.height * 0.5,
      vx: fromLeft ? (3 + Math.random() * 4) : -(3 + Math.random() * 4),
      vy: 1.5 + Math.random() * 2.5,
      length: 60 + Math.random() * 80,
      life: 1,
      size: 1.5 + Math.random() * 1.5,
      hue: 20 + Math.random() * 30,
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const time = Date.now();
    this.galaxyAngle += 0.0004;

    this.drawGalaxyBackground(time);

    this.stars.forEach((star) => {
      star.orbitAngle += star.orbitSpeed;
      star.x = this.canvas.width / 2 + Math.cos(star.orbitAngle) * star.orbitRadius + Math.sin(time * 0.0005 + star.phase) * star.driftX * 20;
      star.y = this.canvas.height / 2 + Math.sin(star.orbitAngle) * star.orbitRadius + Math.cos(time * 0.0005 + star.phase) * star.driftY * 20;

      const isHovered = this.hoveredStar === star;
      const opacity = star.baseOpacity + Math.sin(time * star.pulseSpeed + star.phase) * 0.3;
      const displayOpacity = Math.min(1, isHovered ? opacity * 2.5 : opacity);
      const displaySize = isHovered ? star.size * 3 : star.size;

      const gradient = this.ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, displaySize * 4);
      gradient.addColorStop(0, `hsla(${star.hue}, 90%, ${isHovered ? 95 : 85}%, ${displayOpacity})`);
      gradient.addColorStop(0.3, `hsla(${star.hue}, 70%, 75%, ${displayOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${star.hue}, 50%, 60%, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, displaySize * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, displaySize, 0, Math.PI * 2);
      this.ctx.fillStyle = isHovered ? 'white' : `hsla(${star.hue}, 80%, 90%, ${displayOpacity})`;
      this.ctx.fill();

      if (isHovered) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, displaySize * 6, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${star.hue}, 80%, 90%, 0.06)`;
        this.ctx.fill();
      }
    });

    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (0.04 * (1 - dist / 120)) * (this.stars[i].baseOpacity + this.stars[j].baseOpacity) / 1.2;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `hsla(220, 50%, 70%, ${alpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
          this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
          this.ctx.stroke();
        }
      }
    }

    if (!this.isReduced) {
      this.meteorTimer++;
      if (this.meteorTimer > 60 + Math.random() * 100) {
        this.spawnMeteor();
        this.meteorTimer = 0;
      }

      this.meteors = this.meteors.filter((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.004;

        const tail = m.x - Math.cos(Math.atan2(m.vy, m.vx)) * m.length;
        const ty = m.y - Math.sin(Math.atan2(m.vy, m.vx)) * m.length;

        const grad = this.ctx.createLinearGradient(m.x, m.y, tail, ty);
        grad.addColorStop(0, `hsla(${m.hue}, 100%, 90%, ${Math.max(0, m.life)})`);
        grad.addColorStop(0.3, `hsla(${m.hue}, 90%, 80%, ${Math.max(0, m.life * 0.5)})`);
        grad.addColorStop(1, `hsla(${m.hue}, 80%, 70%, 0)`);

        this.ctx.beginPath();
        this.ctx.moveTo(m.x, m.y);
        this.ctx.lineTo(tail, ty);
        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth = m.size;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        return m.life > 0 && m.x > -100 && m.x < this.canvas.width + 100;
      });
    }

    requestAnimationFrame(() => this.animate());
  }

  drawGalaxyBackground(time) {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2,
      Math.min(this.canvas.width, this.canvas.height) * 0.7
    );
    gradient.addColorStop(0, 'rgba(20, 15, 60, 0)');
    gradient.addColorStop(0.4, `rgba(15, 10, 40, ${0.15 + Math.sin(time * 0.0003) * 0.03})`);
    gradient.addColorStop(0.7, `rgba(30, 15, 60, ${0.1 + Math.cos(time * 0.0002) * 0.02})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, Math.min(this.canvas.width, this.canvas.height) * 0.7, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.galaxyAngle);

    for (let r = 0; r < 4; r++) {
      const ringGrad = this.ctx.createRadialGradient(0, 0, r * 60 + 30, 0, 0, r * 60 + 80);
      const hue = 220 + r * 15;
      ringGrad.addColorStop(0, `hsla(${hue}, 40%, 50%, 0)`);
      ringGrad.addColorStop(0.5, `hsla(${hue}, 35%, 45%, ${0.03 + Math.sin(time * 0.0005 + r) * 0.01})`);
      ringGrad.addColorStop(1, `hsla(${hue}, 30%, 40%, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(0, 0, r * 60 + 60, 0, Math.PI * 2);
      this.ctx.fillStyle = ringGrad;
      this.ctx.fill();
    }

    this.ctx.restore();
  }
}
