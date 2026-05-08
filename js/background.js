class BackgroundSwitcher {
  constructor(container, images) {
    this.container = container;
    this.images = images;
    this.loadedImages = [];
    this.currentIndex = -1;
    this.isTransitioning = false;
    this.onProgress = null;
    this.onReady = null;
  }

  async load() {
    const total = this.images.length;
    let loaded = 0;

    const loadOne = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.loadedImages[index] = img;
          loaded++;
          resolve();
        };
        img.onerror = () => {
          this.loadImageWithFetch(this.images[index].fallback).then((fallbackImg) => {
            if (fallbackImg) {
              this.loadedImages[index] = fallbackImg;
            }
            loaded++;
            resolve();
          });
        };
        img.src = this.images[index].src;
      });
    };

    const priorityCount = Math.min(3, total);
    const priorityIndices = [];
    const remainingIndices = [];
    for (let i = 0; i < total; i++) {
      if (i < priorityCount) {
        priorityIndices.push(i);
      } else {
        remainingIndices.push(i);
      }
    }

    const priorityPromises = priorityIndices.map((i) =>
      loadOne(i).then(() => {
        if (this.onProgress) this.onProgress(loaded, priorityCount);
      })
    );

    if (this.onProgress) this.onProgress(0, priorityCount);
    await Promise.all(priorityPromises);

    if (this.loadedImages.filter(Boolean).length > 0) {
      this.showRandom();
    }
    if (this.onReady) this.onReady();

    remainingIndices.forEach((i) => {
      loadOne(i);
    });
  }

  loadImageWithFetch(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  getImageUrl(index) {
    const img = this.loadedImages[index];
    if (img) return img.src;
    if (this.images[index]) return this.images[index].fallback;
    return null;
  }

  showRandom() {
    const available = this.loadedImages.filter(Boolean);
    if (available.length === 0) return;

    let idx;
    do {
      idx = Math.floor(Math.random() * this.images.length);
    } while (idx === this.currentIndex && this.images.length > 1);

    this.applyBackground(idx);
  }

  getOverlayForIndex(index) {
    const item = this.images[index];
    if (!item) return 'rgba(0, 0, 0, 0.45)';
    return item.tone === 'light' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.45)';
  }

  buildBackground(imageUrl, overlay) {
    return `linear-gradient(${overlay}, ${overlay}), url(${imageUrl})`;
  }

  applyBackground(index) {
    const imgUrl = this.getImageUrl(index);
    if (!imgUrl) return;

    this.currentIndex = index;
    this.container.style.backgroundImage = this.buildBackground(imgUrl, this.getOverlayForIndex(index));
    this.applyThemeFromTone(index);
    this.safeExtractColor(index);
  }

  switchTo(index, clickX, clickY) {
    if (this.isTransitioning || index === this.currentIndex) return;
    this.isTransitioning = true;

    const imgUrl = this.getImageUrl(index);
    if (!imgUrl) {
      this.isTransitioning = false;
      return;
    }

    const overlay = this.getOverlayForIndex(index);
    this.applyThemeFromTone(index);

    const rect = this.container.getBoundingClientRect();
    const x = ((clickX - rect.left) / rect.width) * 100;
    const y = ((clickY - rect.top) / rect.height) * 100;

    const reveal = document.createElement('div');
    reveal.className = 'bg-reveal';
    reveal.style.setProperty('--x', x + '%');
    reveal.style.setProperty('--y', y + '%');
    reveal.style.backgroundImage = this.buildBackground(imgUrl, overlay);
    this.container.appendChild(reveal);

    reveal.offsetHeight;

    requestAnimationFrame(() => {
      reveal.classList.add('active');
    });

    let transitionEnded = false;
    const onComplete = () => {
      if (transitionEnded) return;
      transitionEnded = true;
      this.currentIndex = index;
      this.container.style.backgroundImage = this.buildBackground(imgUrl, overlay);
      if (reveal.parentNode) reveal.remove();
      this.isTransitioning = false;
    };

    reveal.addEventListener('transitionend', onComplete, { once: true });
    setTimeout(onComplete, 1000);
  }

  setRootVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  applyThemeFromTone(index) {
    const item = this.images[index];
    if (!item) return;
    const isLight = item.tone === 'light';

    this.setRootVar('--hero-text-primary', 'rgba(255,255,255,0.95)');
    this.setRootVar('--hero-text-secondary', isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.7)');
    this.setRootVar('--hero-text-tertiary', isLight ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.5)');
    this.setRootVar('--hero-accent', isLight ? 'rgb(200, 200, 200)' : 'rgb(60, 60, 120)');
    this.setRootVar('--hero-bg-luminance', isLight ? 'light' : 'dark');
  }

  safeExtractColor(index) {
    const img = this.loadedImages[index];
    if (!img) {
      this.applyThemeFromFallback(index);
      return;
    }

    this.extractDominantColor(img)
      .then((color) => this.applyThemeFromColor(color))
      .catch(() => this.applyThemeFromFallback(index));
  }

  applyThemeFromFallback(index) {
    const item = this.images[index];
    if (item && item.tone === 'light') {
      this.applyThemeFromColor({ r: 200, g: 200, b: 200 });
    } else if (item && item.tone === 'dark') {
      this.applyThemeFromColor({ r: 24, g: 24, b: 48 });
    } else {
      this.applyThemeFromColor({ r: 18, g: 18, b: 30 });
    }
  }

  extractDominantColor(img) {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);

        let imageData;
        try {
          imageData = ctx.getImageData(0, 0, size, size).data;
        } catch (e) {
          reject(new Error('CORS tainted canvas'));
          return;
        }

        const colorBuckets = {};
        let maxCount = 0;
        let dominantColor = { r: 32, g: 32, b: 64 };

        for (let i = 0; i < imageData.length; i += 12) {
          const r = Math.round(imageData[i] / 32) * 32;
          const g = Math.round(imageData[i + 1] / 32) * 32;
          const b = Math.round(imageData[i + 2] / 32) * 32;
          const key = `${r},${g},${b}`;
          colorBuckets[key] = (colorBuckets[key] || 0) + 1;
          if (colorBuckets[key] > maxCount) {
            maxCount = colorBuckets[key];
            dominantColor = { r, g, b };
          }
        }

        resolve(dominantColor);
      } catch (e) {
        reject(e);
      }
    });
  }

  applyThemeFromColor(color) {
    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
    const isLight = luminance > 0.55;

    this.setRootVar('--hero-text-primary', 'rgba(255,255,255,0.95)');
    this.setRootVar('--hero-text-secondary', isLight ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.7)');
    this.setRootVar('--hero-text-tertiary', isLight ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.5)');

    const accentR = Math.min(255, Math.round(color.r * 0.8 + 40));
    const accentG = Math.min(255, Math.round(color.g * 0.8 + 40));
    const accentB = Math.min(255, Math.round(color.b * 0.8 + 40));
    this.setRootVar('--hero-accent', `rgb(${accentR}, ${accentG}, ${accentB})`);
    this.setRootVar('--hero-bg-luminance', isLight ? 'light' : 'dark');
  }
}
