class MusicPlayer {
  constructor(container, playlist) {
    this.container = container;
    this.playlist = playlist;
    this.audio = new Audio();
    this.currentTrack = 0;
    this.isPlaying = false;
    this.isCollapsed = false;

    this.elements = {
      btn: container.querySelector('.music-player__btn'),
      title: container.querySelector('.music-player__title'),
      playBtn: container.querySelector('.music-player__toggle--play'),
      nextBtn: container.querySelector('.music-player__toggle--next'),
      volumeSlider: container.querySelector('.music-player__volume'),
    };

    this.init();
    this.bindEvents();
  }

  init() {
    this.elements.title.textContent = this.playlist[0].title;
    this.audio.volume = 0.5;
    this.elements.volumeSlider.value = 50;
    this.audio.addEventListener('ended', () => this.next());
  }

  bindEvents() {
    this.elements.btn.addEventListener('click', () => {
      this.isCollapsed = !this.isCollapsed;
      this.container.classList.toggle('music-player--collapsed');
    });

    this.elements.playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePlay();
    });

    this.elements.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    this.elements.volumeSlider.addEventListener('input', (e) => {
      this.audio.volume = e.target.value / 100;
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.elements.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      if (!this.audio.src) {
        this.audio.src = this.playlist[0].url;
      }
      this.audio.play().catch(() => {});
      this.elements.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    this.isPlaying = !this.isPlaying;
  }

  next() {
    this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
    this.audio.src = this.playlist[this.currentTrack].url;
    this.elements.title.textContent = this.playlist[this.currentTrack].title;
    if (this.isPlaying) {
      this.audio.play().catch(() => {});
    }
  }

  prev() {
    this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
    this.audio.src = this.playlist[this.currentTrack].url;
    this.elements.title.textContent = this.playlist[this.currentTrack].title;
    if (this.isPlaying) {
      this.audio.play().catch(() => {});
    }
  }
}
