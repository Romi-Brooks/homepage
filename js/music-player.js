class MusicPlayer {
  constructor(container, playlist) {
    this.container = container;
    this.playlist = playlist;
    this.currentTrack = 0;
    this.isCollapsed = container.classList.contains('music-player--collapsed');
    this.playlistOpen = false;

    this.elements = {
      btn: container.querySelector('.music-player__btn'),
      nextBtn: container.querySelector('.music-player__toggle--next'),
      playlistBtn: container.querySelector('.music-player__toggle--playlist'),
      iframe: container.querySelector('#neteaseIframe'),
      playlistEl: container.querySelector('#musicPlaylist'),
    };

    this.renderPlaylist();
    this.bindEvents();
  }

  bindEvents() {
    this.elements.btn.addEventListener('click', () => {
      this.isCollapsed = !this.isCollapsed;
      this.container.classList.toggle('music-player--collapsed');
      if (!this.isCollapsed) {
        if (this.elements.iframe.src === 'about:blank' || this.elements.iframe.src === '') {
          this.loadTrack(this.currentTrack, false);
        }
      }
    });

    this.elements.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    this.elements.playlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.playlistOpen = !this.playlistOpen;
      this.elements.playlistEl.classList.toggle('open');
    });
  }

  loadTrack(index, autoPlay = true) {
    const track = this.playlist[index];
    if (!track || !track.neteaseId) return;
    this.currentTrack = index;
    this.elements.iframe.src = `https://music.163.com/outchain/player?type=2&id=${track.neteaseId}&auto=${autoPlay ? 1 : 0}&height=66`;
    this.elements.playlistEl.querySelectorAll('.music-player__playlist-item').forEach((item) => {
      item.classList.toggle('active', +item.dataset.index === index);
    });
    this.playlistOpen = false;
    this.elements.playlistEl.classList.remove('open');
  }

  next() {
    this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
    this.loadTrack(this.currentTrack, true);
  }

  renderPlaylist() {
    this.elements.playlistEl.innerHTML = this.playlist.map((track, i) => `
      <div class="music-player__playlist-item ${i === this.currentTrack ? 'active' : ''}" data-index="${i}">
        <span class="music-player__playlist-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="music-player__playlist-name">${track.title}</span>
        <span class="music-player__playlist-status">${track.neteaseId ? '<i class="fas fa-music"></i>' : '<i class="fas fa-ban"></i>'}</span>
      </div>
    `).join('');

    this.elements.playlistEl.querySelectorAll('.music-player__playlist-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = +item.dataset.index;
        const track = this.playlist[index];
        if (track && track.neteaseId) {
          this.loadTrack(index, true);
        }
      });
    });
  }
}
