const portfolioData = {
  personal: {
    name: 'Romi Brooks',
    title: 'Life infinite, coding eternal.',
    motto: 'Wide as the world may be, keep loving yourself with all your heart.',
    mottos: [
      'Wide as the world may be, keep loving yourself with all your heart.',
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
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Vue.js', level: 85 },
    { name: 'Node.js', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'Three.js', level: 75 },
    { name: 'Figma', level: 85 },
    { name: 'Python', level: 78 },
    { name: 'GraphQL', level: 80 },
    { name: 'Docker', level: 72 },
    { name: 'Next.js', level: 88 },
    { name: 'GSAP', level: 82 }
  ],

  timeline: [
    {
      year: '2024 - Present',
      title: 'Senior Frontend Engineer',
      company: 'TechVision Labs',
      description: 'Leading the design system team, building scalable component libraries used by 50+ engineers.',
      type: 'work'
    },
    {
      year: '2022 - 2024',
      title: 'Full Stack Developer',
      company: 'DataFlow Inc.',
      description: 'Built real-time data visualization platforms serving 100K+ daily active users.',
      type: 'work'
    },
    {
      year: '2021 - 2022',
      title: 'UI/UX Designer & Developer',
      company: 'Creative Studio',
      description: 'Designed and developed interactive web experiences for Fortune 500 clients.',
      type: 'work'
    },
    {
      year: '2020',
      title: 'M.S. Computer Science',
      company: 'Stanford University',
      description: 'Specialized in Human-Computer Interaction and Visual Computing.',
      type: 'education'
    },
    {
      year: '2018',
      title: 'B.S. Digital Media Art',
      company: 'MIT Media Lab',
      description: 'Cross-disciplinary studies in art, technology, and design thinking.',
      type: 'education'
    }
  ],

  featuredProjects: [
    {
      id: 1,
      name: 'Lumina Design System',
      description: 'A comprehensive design system with 60+ accessible components, built with React and TypeScript. Features dark mode, responsive layouts, and interactive documentation.',
      tags: ['React', 'TypeScript', 'Storybook', 'Design Systems'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true
    },
    {
      id: 2,
      name: 'VizFlow Analytics',
      description: 'Real-time data visualization platform processing 1M+ events daily. Includes interactive dashboards, custom chart engine, and collaborative annotations.',
      tags: ['D3.js', 'WebSocket', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true
    },
    {
      id: 3,
      name: 'EcoTrack',
      description: 'A carbon footprint tracking app that gamifies sustainable living. Features social challenges, AI-powered suggestions, and blockchain-verified offsets.',
      tags: ['Next.js', 'AI/ML', 'Blockchain', 'Mobile'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true
    },
    {
      id: 4,
      name: 'Neural Canvas',
      description: 'Generative art platform that creates unique artworks using neural networks. Users can guide the AI with style references and watch the creation process.',
      tags: ['TensorFlow.js', 'Canvas API', 'WebGL', 'Generative Art'],
      github: 'https://github.com',
      demo: 'https://example.com',
      featured: true
    }
  ],

  otherProjects: [
    {
      id: 5,
      name: 'DevBook',
      description: 'A social platform for developers to share knowledge, with real-time code collaboration and peer review features.',
      tags: ['React', 'Firebase', 'CodeMirror'],
      github: 'https://github.com'
    },
    {
      id: 6,
      name: 'WeatherViz',
      description: 'Minimalist weather app with beautiful 3D particle visualizations representing current weather conditions.',
      tags: ['Three.js', 'APIs', 'Geolocation'],
      github: 'https://github.com'
    },
    {
      id: 7,
      name: 'PulseFit',
      description: 'A workout tracking PWA with motion-based exercise recognition and progress visualization.',
      tags: ['PWA', 'TensorFlow', 'Chart.js'],
      github: 'https://github.com'
    },
    {
      id: 8,
      name: 'MarkDown Wiki',
      description: 'A lightweight wiki system that renders markdown files into a beautiful knowledge base with full-text search.',
      tags: ['Vue.js', 'Markdown', 'PWA'],
      github: 'https://github.com'
    }
  ],

  wisdoms: [
    'The best code is the code you never had to write.',
    'Design is not just what it looks like — design is how it works.',
    'Simplicity is the ultimate sophistication in engineering.',
    'A bug is just a feature that hasn\'t found its purpose yet.',
    'Great developers write code for humans first, computers second.',
    'Creativity is intelligence having fun — let your code dance.',
    'The only way to go fast is to go well: quality is velocity.',
    'Every expert was once a beginner who never gave up.',
    'Your most unhappy customers are your greatest source of learning.',
    ' innovation distinguishes between a leader and a follower.',
    'Code is like poetry — every line should have purpose and beauty.',
    'The best interface is no interface — let things feel natural.',
    'In the middle of difficulty lies opportunity — and great refactoring.',
    'Good artists copy, great artists steal — and cite their sources.',
    'Technology is best when it brings people together.'
  ],

  socialLinks: [
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'fab fa-x-twitter', url: 'https://twitter.com' },
    { name: 'Dribbble', icon: 'fab fa-dribbble', url: 'https://dribbble.com' },
    { name: 'Medium', icon: 'fab fa-medium-m', url: 'https://medium.com' }
  ],

  musicPlaylist: [
    { title: 'Midnight Serenity', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Ocean Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Starlight Journey', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Gentle Rain', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
  ],

  lastUpdated: '2026-05-08'
};
