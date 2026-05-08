const portfolioDataZh = {
  personal: {
    name: '默茉',
    title: 'Life infinite, coding eternal.',
    motto: '这个世界很大，请坚定不移的爱着自己。',
    mottos: [
      '你想成为什么，取决于你做什么，而非你想什么。',
      '设计是可视化的智慧。',
      '代码是写给机器和人类的诗。',
      '简洁是工程学的终极优雅。',
      '每个像素都在讲述一个故事——让它有意义。',
      '最好的界面就是没有界面。',
      '创新是区分领导者和追随者的关键。',
      '伟大的事物是一行行代码构建的。'
    ],
    avatar: 'images/avator/romi.jpg',
    bio: [
      '我是 Romi Brooks——叫我 默茉 就好。一名新疆大学的本科生，诞生于中国一个宁静角落的开发者和音乐制作人。我相信，你做的工作就是你讲述的故事。',
      '我的道路贯穿全栈开发、音频工程和 AI 研究，我热衷于将混乱的问题拆解为简洁优雅的创造。在代码、声音和创造力的交汇处，我构建 C++ 音频引擎、打造 Vue/TypeScript 网页应用、制作音乐、探索机器学习和深度学习，并持续学习 Go 和 Rust。',
      '当屏幕暗下，你会发现我在探索生成式音频、贡献开源项目，或只是停下来，感受这个世界。'
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
      year: '2026 - 至今',
      title: 'AI 研究学习者',
      company: '新疆大学',
      description: '专注于人机交互与视觉计算，研究方向为音频 AI、语音增强和高保真音频重建。',
      type: 'education'
    },
    {
      year: '2025 - 2026',
      title: '全栈开发者',
      company: '新疆大学',
      description: '在导师指导下参与横向科研项目，负责全栈开发与系统实现。',
      type: 'work'
    },
    {
      year: '2024 - 2025',
      title: '本科生',
      company: '新疆大学',
      description: '软件工程专业，专注于前端与全栈开发。',
      type: 'education'
    },
    {
      year: '2022',
      title: '高中毕业',
      company: '高中',
      description: '自 2018 年开始自学 C/C++，踏上软件开发之旅。',
      type: 'education'
    }
  ],

  featuredProjects: [
    {
      id: 1,
      name: 'Better Music',
      description: '基于 Tauri 的优雅本地音乐播放器，使用 Vue 3、TypeScript 和 Rust 构建。',
      tags: ['Tauri', 'TypeScript', 'Rust'],
      github: 'https://github.com/Romi-Brooks/bettermusic',
      featured: true
    },
    {
      id: 2,
      name: 'Homeless',
      description: '使用 C++ 开发的跨平台末日生存游戏。',
      tags: ['C++', '游戏引擎'],
      github: 'https://github.com/Romi-Brooks/Homeless',
      featured: true
    },
    {
      id: 3,
      name: 'Beeplayer',
      description: '基于 miniaudio 和 C++ 的轻量级跨平台音乐播放器。',
      tags: ['C++', '音乐播放器'],
      github: 'https://github.com/Romi-Brooks/beeplayer',
      featured: true
    },
    {
      id: 4,
      name: 'Go Stream',
      description: '使用 Go 和 TypeScript 开发的跨平台 WebUI 音乐播放器。',
      tags: ['Go', 'TypeScript', 'Web 应用'],
      github: 'https://github.com/Romi-Brooks/gostream',
      featured: true
    }
  ],

  otherProjects: [
    {
      id: 5,
      name: 'Musicookie',
      description: '开源数字音频工作站(DAW)，内置 musicookie 核心引擎用于音乐制作。',
      tags: ['DAW', '音频引擎'],
      github: 'https://github.com/Romi-Brooks/musicookie'
    },
    {
      id: 6,
      name: 'Aurora',
      description: '具有可定制个性和情感交互的 AI 陪伴应用。',
      tags: ['AI', '陪伴'],
      github: 'https://github.com/Romi-Brooks/aurora'
    },
    {
      id: 7,
      name: '我的博客',
      description: '分享开发、音频、日常和 AI 研究见解的个人博客。',
      tags: ['博客', '网站'],
      github: 'https://github.com/Romi-Brooks/Romi-Brooks.github.io'
    }
  ],

  socialLinks: [
    { name: '网站', icon: 'fas fa-globe', url: 'https://www.heyromi.icu/' },
    { name: '博客', icon: 'fas fa-blog', url: 'https://blog.heyromi.icu' },
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
