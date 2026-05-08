const portfolioData = {
  personal: {
    name: 'Romi Brooks',
    title: 'Life infinite, coding eternal.',
    motto: 'Wide as the world may be, keep loving yourself with all your heart.',
    mottos: [
      'What do you want to be, It is what do you do, Not what you think.',
      'Design is intelligence made visible.',
      'Code is poetry written for both machines and humans.',
      'Simplicity is the ultimate sophistication in engineering.',
      'Every pixel tells a story — make it meaningful.',
      'The best interface is no interface at all.',
      'Innovation distinguishes between a leader and a follower.',
      'Great things are built one line of code at a time.'
    ],
    avatar: 'images/avator/romi.jpg',
    bio: [
      'I’m Romi Brooks — you can call me Romi. An undergraduate at Xinjiang University, a developer and music producer born in a quiet corner of China. I believe the work you do is the story you tell.',
      'My path winds through full-stack development, audio engineering, and AI research, where I love untangling messy problems into simple, elegant creations. At the crossroads of code, sound, and creativity, I build C++ audio engines, craft Vue/TypeScript web apps, produce music, dive into machine learning and deep learning, and learn Go and Rust to keep growing.',
      'When the screen goes dark, you’ll find me exploring generative audio, contributing to open source, or just pausing to breathe in the world around me.'
    ],
    resumeUrl: '#'
  },

  skills: [
    { name: 'C++', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'Vue.js', level: 85 },
    { name: 'TypeScript', level: 88 },
    { name: 'Go', level: 92 },
    { name: 'Rust', level: 75 },
  ],

  timeline: [
    {
      year: '2026 - Present',
      title: 'AI Research Learner',
      company: 'Xinjiang University',
      description: 'Specialized in Human-Computer Interaction and Visual Computing. Focused on Audio AI, speech enhancement, and high-fidelity audio reconstruction research.',
      type: 'education'
    },
    {
      year: '2025 - 2026',
      title: 'Full Stack Developer',
      company: 'Xinjiang University',
      description: 'Participated in horizontal research projects under academic supervision, responsible for full-stack development and system implementation.',
      type: 'work'
    },
    {
      year: '2024 - 2025',
      title: 'Undergraduate Student',
      company: 'Xinjiang University',
      description: 'Major in Software Engineering, with a focus on front-end and full-stack development.',
      type: 'education'
    },
    {
      year: '2022',
      title: 'High School Graduate',
      company: 'High School',
      description: 'Self-taught C/C++ since 2018, began my journey in software development.',
      type: 'education'
    }
  ],

  featuredProjects: [
    {
      id: 1,
      name: 'Better Music',
      description: 'A beautiful GUI-based local music player developed by Tauri using Vue 3, TypeScript and Rust.',
      tags: ['Tauri', 'TypeScript', 'Rust'],
      github: 'https://github.com/Romi-Brooks/bettermusic',
      featured: true
    },
    {
      id: 2,
      name: 'Homeless',
      description: 'A cross-platform post-apocalyptic survival game developed in C++.',
      tags: ['C++', 'Game Engine'],
      github: 'https://github.com/Romi-Brooks/Homeless',
      featured: true
    },
    {
      id: 3,
      name: 'Beeplayer',
      description: 'A lightweight and cross-platform music player based on miniaudio and C++.',
      tags: ['C++', 'Music Player'],
      github: 'https://github.com/Romi-Brooks/beeplayer',
      featured: true
    },
    {
      id: 4,
      name: 'Go Stream',
      description: 'A cross-platform WebUI music player with Go and TypeScript.',
      tags: ['Go', 'TypeScript', 'Web App'],
      github: 'https://github.com/Romi-Brooks/gostream',
      featured: true
    }
  ],

  otherProjects: [
    {
      id: 5,
      name: 'Musicookie',
      description: 'An open-source DAW with a built-in musicookie core engine for music production.',
      tags: ['DAW', 'Audio Engine'],
      github: 'https://github.com/Romi-Brooks/musicookie'
    },
    {
      id: 6,
      name: 'Aurora',
      description: 'An AI companion app with customizable personality and emotional interaction.',
      tags: ['AI', 'Companion'],
      github: 'https://github.com/Romi-Brooks/aurora'
    },
    {
      id: 7,
      name: 'My Blog',
      description: 'Personal blog sharing insights on development, audio, and AI research.',
      tags: ['Blog', 'Website'],
      github: 'https://github.com/Romi-Brooks/Romi-Brooks.github.io'
    }
  ],

  socialLinks: [
    { name: 'Website', icon: 'fas fa-globe', url: 'https://www.heyromi.icu/' },
    { name: 'Blog', icon: 'fas fa-blog', url: 'https://blog.heyromi.icu' },
    { name: 'X', icon: 'fab fa-x-twitter', url: 'https://x.com/RomiBrooks1' },
    { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://www.facebook.com/profile.php?id=100087271397689' }
  ],

  musicPlaylist: [
    { title: '脏艺术家', neteaseId: '2084008711' },
    { title: 'Hypertube', neteaseId: '2631210352' },
    { title: '平行线', neteaseId: '1983761233' },
    { title: 'off the hook', neteaseId: '28692785' }
  ],

  lastUpdated: '2026-05-08'
};
