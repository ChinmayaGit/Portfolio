export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems';
  categoryLabel: string;
  language: string;
  tags: string[];
  stars: number;
  fork?: boolean;
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  stats?: string;
  highlights: string[];
  architecture?: string;
}

export interface CategoryInfo {
  id: 'all' | 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems';
  label: string;
  iconName: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  glowColor: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'All Projects',
    iconName: 'LayoutGrid',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    glowColor: 'shadow-cyan-500/20',
    description: 'Explore the full spectrum of 70+ open-source engineering projects across 6 domains.'
  },
  {
    id: 'ai',
    label: 'AI & Agents',
    iconName: 'Bot',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10',
    glowColor: 'shadow-purple-500/20',
    description: 'Autonomous AI agent builders, personal assistant daemons, and n8n AI workflow automations.'
  },
  {
    id: 'cloud',
    label: 'Cloud & Cyber',
    iconName: 'ShieldCheck',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10',
    glowColor: 'shadow-rose-500/20',
    description: 'AWS certified architectures, SailPoint ISC identity governance, and enterprise security.'
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Web',
    iconName: 'Globe',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/10',
    glowColor: 'shadow-sky-500/20',
    description: 'Modern reactive web platforms, fintech offer monitors, and assessment portals.'
  },
  {
    id: 'mobile',
    label: 'Mobile & Flutter',
    iconName: 'Smartphone',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    glowColor: 'shadow-emerald-500/20',
    description: 'Cross-platform Flutter & native Android apps published with thousands of active downloads.'
  },
  {
    id: 'games3d',
    label: '3D, Games & AR',
    iconName: 'Gamepad2',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    glowColor: 'shadow-amber-500/20',
    description: 'Real-time multiplayer fighting games, 360-degree panoramic tours, and C++ AR viewers.'
  },
  {
    id: 'systems',
    label: 'Systems & IoT',
    iconName: 'Cpu',
    color: 'text-teal-400',
    borderColor: 'border-teal-500/30',
    badgeBg: 'bg-teal-500/10',
    glowColor: 'shadow-teal-500/20',
    description: 'Embedded ESP32 microcontrollers, low-level C++ drivers, and terminal productivity CLI tools.'
  }
];

export const PROJECTS: Project[] = [
  // AI & INTELLIGENT AGENTS
  {
    id: 'ai-mini-agent-builder',
    title: 'AI Mini Agent Builder',
    tagline: 'Visual Flow & Execution Engine for Autonomous AI Agents',
    description: 'A modular visual builder for orchestrating autonomous AI agents. Connect LLM reasoning engines, tool calling nodes, external APIs, and memory stores to build goal-oriented autonomous workflows.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'JavaScript',
    tags: ['AI Agents', 'LLM Tool Calling', 'Workflow Engine', 'Node.js', 'Automation'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/AI_Mini_Agent_Builder',
    highlights: [
      'Visual directed acyclic graph (DAG) execution pipeline for multi-step AI reasoning',
      'Dynamic function and API tool invocation with sandboxed runtime',
      'Stateful memory buffers preserving context across agent thought chains'
    ],
    architecture: 'Node.js event-driven agent loop with structured schema output parsing and dynamic tool dispatch.'
  },
  {
    id: 'project-mello',
    title: 'Project MELLO',
    tagline: 'Cross-Platform Personal AI Daemon & Desktop Companion',
    description: 'Your own personal AI assistant designed to run locally across any OS or device. Features natural language command execution, system automation, desktop shortcuts, and real-time conversation.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'JavaScript',
    tags: ['AI Assistant', 'Cross-Platform', 'System Automation', 'CLI & GUI', 'LLM'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/Project_MELLO',
    highlights: [
      'Cross-platform desktop companion running across macOS, Linux, and Windows',
      'Local system task execution via authorized shell hooks',
      'Fast natural-language intent recognition and dynamic response generation'
    ]
  },
  {
    id: 'openclaw-skills',
    title: 'OpenClaw Custom Skills',
    tagline: 'Modular Skill Extensions for Autonomous Agents',
    description: 'Curated repository of custom shell and automation skills designed for the OpenClaw AI assistant framework, enabling agents to execute complex developer operations, environment diagnostics, and automated workflows.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'Shell',
    tags: ['AI Skills', 'Agent Tooling', 'Bash', 'Automation', 'DevOps'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/openclaw_skills',
    highlights: [
      'Automated environment diagnostic recipes for developer environments',
      'Declarative skill manifests with argument verification'
    ]
  },
  {
    id: 'n8n-render-gen-clip',
    title: 'n8n AI Video Workflow Pipeline',
    tagline: 'Automated Generative Media & Content Production',
    description: 'Production-ready n8n automated workflow combining AI LLMs, prompt generation, image synthesis, and automated video clip compilation deployed on cloud infrastructure.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'TypeScript',
    fork: true,
    tags: ['n8n', 'Generative AI', 'Cloud Pipeline', 'Workflow Automation'],
    stars: 0,
    githubUrl: 'https://github.com/ChinmayaGit/n8n-render-gen-clip',
    highlights: ['End-to-end automated pipeline transforming raw topics into synthesized media assets.']
  },

  // CLOUD & CYBERSECURITY
  {
    id: 'deloitte-jpa-demo',
    title: 'Deloitte Enterprise JPA & Microservices',
    tagline: 'Enterprise Persistence, Spring Boot & Hibernate Architecture',
    description: 'Production-grade enterprise Java backend demonstrating Spring Data JPA, Hibernate ORM, entity lifecycle management, transactional boundaries, and high-performance database querying.',
    category: 'cloud',
    categoryLabel: 'Cloud & Cyber',
    language: 'Java',
    tags: ['Java', 'Spring Boot', 'JPA', 'Hibernate', 'Enterprise Architecture', 'PostgreSQL'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/deloitte-jpa-demo',
    highlights: [
      'Enterprise database entity mappings with cascading rules and lazy fetching',
      'Transaction management and acid-compliant data pipelines',
      'RESTful service layer with validation, exception handling, and DTO mappers'
    ],
    architecture: 'Layered Spring Boot architecture (Controller -> Service -> Repository) with PostgreSQL.'
  },
  {
    id: 'deloitte-labs',
    title: 'Deloitte Labs & Cloud Experiments',
    tagline: 'Enterprise Distributed Systems & Backend Engineering',
    description: 'Hands-on repository containing enterprise microservices, API integrations, security testing, and database optimization experiments.',
    category: 'cloud',
    categoryLabel: 'Cloud & Cyber',
    language: 'Java',
    tags: ['Java', 'Microservices', 'Enterprise Security', 'APIs'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/deloitte_labs',
    highlights: ['Microservice communication patterns and enterprise software design practices.']
  },
  {
    id: 'employee-management-system',
    title: 'Employee Management System',
    tagline: 'Enterprise Role-Based Access & Organization Portal',
    description: 'Full-stack enterprise application featuring fine-grained role-based access control (RBAC), employee lifecycle onboarding, department auditing, and secure record keeping.',
    category: 'cloud',
    categoryLabel: 'Cloud & Cyber',
    language: 'Java',
    tags: ['Java', 'RBAC', 'IAM', 'Enterprise Security', 'Spring', 'MySQL'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/Employee-Management-System',
    highlights: [
      'Role-based access authorization distinguishing employees, managers, and system admins',
      'Audit logging of credential updates and employee profile transitions',
      'Automated payroll and attendance tracking database schemas'
    ]
  },
  {
    id: 'podroid',
    title: 'Podroid Container Runtime',
    tagline: 'Rootless Alpine Linux Container Engine on Android',
    description: 'An advanced rootless Android application booting Alpine Linux inside userland, allowing developers to execute containers (Podman/Docker/LXC) and GUI desktop environments directly on mobile hardware.',
    category: 'cloud',
    categoryLabel: 'Cloud & Cyber',
    language: 'Kotlin',
    fork: true,
    tags: ['Android', 'Containers', 'Docker', 'Podman', 'Linux', 'Alpine'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/Podroid',
    highlights: ['Rootless container virtualization and terminal shell orchestration on Android.']
  },

  // FULL-STACK WEB
  {
    id: 'reclaim-web',
    title: 'Reclaim Web Portal',
    tagline: 'High-Performance Productivity Dashboard & Companion',
    description: 'The modern web companion for the Reclaim productivity ecosystem. Offers deep time-auditing charts, weekly focus heatmaps, habit goal setting, and real-time cloud sync.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'TypeScript',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Data Visualization', 'REST APIs'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/Reclaim_Web',
    highlights: [
      'Interactive time-block analysis with interactive charting',
      'Fluid responsive dashboard designed for desktop and tablet screens',
      'Optimistic state updates for instant user interactions'
    ]
  },
  {
    id: 'cards-apps-offertracker',
    title: 'Cards & Apps OfferTracker',
    tagline: 'Fintech Rewards, Credit Card & Cashback Intelligence',
    description: 'A centralized tracking platform to monitor, categorize, and maximize cashback deals, credit card perks, dining rewards, and subscription offers across major providers.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'TypeScript',
    tags: ['TypeScript', 'Fintech', 'Next.js', 'React', 'Tailwind CSS'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/Cards-Apps_OfferTracker',
    highlights: [
      'Automated calculation of effective reward percentage and expiry dates',
      'Categorized search by credit card issuer, merchant, and discount tier',
      'Notification triggers before reward expirations'
    ]
  },
  {
    id: 'playstore-purchase-tracker',
    title: 'PlayStore Purchase Tracker',
    tagline: 'Digital License, Subscription & App Spend Tracker',
    description: 'Web utility designed to analyze Google Play and mobile app purchases, calculating lifetime software expenditures, active subscriptions, and renewal budgets.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'HTML',
    tags: ['JavaScript', 'Financial Analytics', 'Dashboard', 'Google Play'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/PlayStorePurchaseTracker',
    highlights: ['Visual breakdown of monthly recurring app expenses and one-time unlock costs.']
  },
  {
    id: 'simpleshare',
    title: 'simpleShare',
    tagline: 'Instant Zero-Friction Peer-to-Peer File Transfer',
    description: 'Browser-based file transfer utility allowing instant link-sharing, fast drag-and-drop transfers, and peer-to-peer data piping without cumbersome account logins.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'HTML',
    tags: ['JavaScript', 'WebRTC', 'P2P Transfer', 'File Streaming'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/simpleShare',
    highlights: ['Direct browser-to-browser encrypted transfers with progress indicators.']
  },
  {
    id: 'recipe-finder-app',
    title: 'Recipe Finder App',
    tagline: 'Ingredient-Based Algorithmic Culinary Search',
    description: 'Smart web application that takes whatever ingredients you currently have in your pantry and recommends delicious recipes with nutritional info and preparation instructions.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'JavaScript',
    tags: ['JavaScript', 'Recipe API', 'Responsive UI', 'Search Algorithm'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/recipe_finder_app',
    highlights: ['Pantry ingredient matching algorithm with step-by-step cooking steps.']
  },
  {
    id: 'mcq-web',
    title: 'MCQ Examination Portal',
    tagline: 'Dynamic Timed Assessment & Quiz Platform',
    description: 'Web-based testing and examination platform with countdown timers, randomized question banks, real-time score grading, and comprehensive performance analytics.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'Dart',
    tags: ['Flutter Web', 'Dart', 'Assessment', 'Timer Engine', 'Analytics'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/mcq_web',
    highlights: ['Question bank shuffling, auto-submission on timer expiry, and instant report card generation.']
  },
  {
    id: 'angular-projects',
    title: 'Angular Projects Showcase',
    tagline: 'Enterprise Single Page Applications in Angular',
    description: 'Comprehensive suite of enterprise Angular applications utilizing RxJS observables, reactive forms, dependency injection, and modular routing.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    language: 'TypeScript',
    tags: ['Angular', 'TypeScript', 'RxJS', 'Enterprise SPA'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/Angular-Projects',
    highlights: ['Reactive state handling with RxJS pipelines and reusable UI modules.']
  },

  // MOBILE & FLUTTER
  {
    id: 'odia-bhagabata',
    title: 'Odia Bhagabata',
    tagline: 'Published Devotional & Cultural Android App',
    description: 'A production Flutter application published on Google Play Store featuring the sacred Jagannatha Dasa Odia Bhagabata. Engineered with offline chapter caching, audio playback, night reading mode, and Odia typography rendering.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Google Play', 'Offline SQLite', 'Audio Player', 'Localization'],
    stars: 1,
    featured: true,
    stats: '1,000+ Downloads on Play Store',
    githubUrl: 'https://github.com/ChinmayaGit/odia_bhagabata',
    highlights: [
      'Published on Google Play Store with thousands of active devotional readers',
      'Custom Odia font engine with smooth responsive text scaling',
      'Background audio player service for synchronized shloka chanting',
      'Zero-latency offline reader with indexed SQLite chapter caching'
    ],
    architecture: 'Clean Architecture with Provider state management, persistent SQLite caching, and Android audio foreground services.'
  },
  {
    id: 'findwho',
    title: 'FindWho Game',
    tagline: 'Interactive Visual Pattern & Object Finding Game',
    description: 'An engaging, gamified Flutter mobile game challenging players to spot hidden elements, visual anomalies, and intricate patterns across timed dynamic levels with fluid score tracking.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Game Dev', 'Animation Controller', 'State Management'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/findwho',
    highlights: [
      'Custom canvas rendering for interactive hidden object zones',
      'Dynamic progressive difficulty scaling and high-score records',
      'Haptic feedback and 60 FPS transition animations'
    ],
    architecture: 'Custom Flutter RenderObjects with Riverpod state management.'
  },
  {
    id: 'p-manager',
    title: 'P_Manager',
    tagline: 'Encrypted Vault & Password Security Manager',
    description: 'Zero-knowledge client-side encrypted password and credential vault for mobile devices. Implements AES-256 GCM encryption, biometric authentication (fingerprint/Face ID), and secure clipboard auto-clearing.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Cybersecurity', 'AES-256', 'Biometrics', 'Local Auth'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/P_Manager',
    highlights: [
      'AES-256 GCM cryptographic key derivation using PBKDF2',
      'Biometric fingerprint and Face ID gatekeeper',
      'Automatic clipboard sanitization after 30 seconds of inactivity'
    ],
    architecture: 'Flutter Secure Storage + Cryptography library with Zero-Knowledge local persistence.'
  },
  {
    id: 'reclaim',
    title: 'Reclaim Mobile',
    tagline: 'Digital Wellbeing & Focus Habit Tracker',
    description: 'A cross-platform productivity and digital minimalism application designed to help users track focus blocks, minimize app addiction, and reclaim productive daily hours.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Productivity', 'Habit Tracking', 'Analytics UI'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/reclaim',
    highlights: [
      'Visual focus streaks and intuitive timeline graphs',
      'Custom daily goal setting with smart reminder notifications',
      'Offline-first synchronization'
    ]
  },
  {
    id: 'pixel-reducer',
    title: 'Pixel Reducer',
    tagline: 'High-Efficiency Media & Document Compression Utility',
    description: 'Utility app for instant on-device image and PDF compression without compromising optical clarity. Helps users bypass strict upload size limits on job portals and document forms.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Image Processing', 'PDF Engine', 'Compression'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/pixel_reducer',
    highlights: [
      'Lossless and lossy multi-ratio image compression',
      'Batch PDF compression engine with file size preview',
      'Zero cloud transmission—100% on-device processing'
    ]
  },
  {
    id: 'pixcuts',
    title: 'PixCuts Android',
    tagline: 'Native Android Photo & Graphic Precision Editor',
    description: 'A native Kotlin Android image editing application with hardware-accelerated bitmap transformations, crop presets, and real-time color grading filters.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Kotlin',
    tags: ['Kotlin', 'Android SDK', 'Jetpack', 'Canvas API', 'Bitmap Processing'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/pixcuts',
    highlights: [
      'Native Kotlin Coroutines for non-blocking bitmap transformations',
      'Custom Android Jetpack UI components'
    ]
  },
  {
    id: 'unzip',
    title: 'UnZip Native Suite',
    tagline: 'Native iOS / macOS File Archive & Extraction Manager',
    description: 'Swift-powered file management and archive decompression tool for iOS and macOS. Supports zip, tar, gzip, and 7z extraction with clean Apple design aesthetics.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Swift',
    tags: ['Swift', 'iOS', 'macOS', 'File Manager', 'Compression', 'SwiftUI'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/UnZip',
    highlights: [
      'Native Swift compression streams with background extraction',
      'Deep iOS Files app integration and Share Sheet extensions'
    ]
  },
  {
    id: 'jhoom',
    title: 'Jhoom Stream',
    tagline: 'Fluid Video & Music Streaming Experience',
    description: 'High-performance audio and video player app featuring custom buffer controls, background playlist queuing, and smooth adaptive bitrate playback.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    tags: ['Flutter', 'Dart', 'Streaming', 'Video Player', 'ExoPlayer'],
    stars: 1,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/jhoom',
    highlights: [
      'Low-latency HLS & MP4 video streaming integration',
      'Custom gesture-based volume, brightness, and seeking controls'
    ]
  },
  {
    id: 'quicknest',
    title: 'QuickNest',
    tagline: 'Lightweight Android App Architecture Template',
    description: 'Modern Android Kotlin template showcasing MVVM architecture, Retrofit network layers, Room database caching, and Jetpack Compose state management.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Kotlin',
    tags: ['Kotlin', 'Android', 'MVVM', 'Room DB', 'Jetpack Compose'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/QuickNest',
    highlights: ['Production MVVM boilerplate with dependency injection and clean separation of concerns.']
  },
  {
    id: 'betterplayer',
    title: 'BetterPlayer Custom Engine',
    tagline: 'Extended Flutter Multimedia Playback Pipeline',
    description: 'Customized fork and enhancement of the Flutter video playback engine with picture-in-picture, subtitle track handling, and notification media controls.',
    category: 'mobile',
    categoryLabel: 'Mobile & Flutter',
    language: 'Dart',
    fork: true,
    tags: ['Flutter', 'Dart', 'ExoPlayer', 'AVPlayer', 'Video Streaming'],
    stars: 0,
    githubUrl: 'https://github.com/ChinmayaGit/betterplayer',
    highlights: ['Native bridging between Flutter and ExoPlayer / AVPlayer pipelines.']
  },

  // 3D, GAME SYSTEMS & AR
  {
    id: 'bloodline',
    title: 'Bloodline',
    tagline: 'Real-Time Multiplayer Combat & Arena Fighting Game',
    description: 'An adrenaline-fueled multiplayer 2D fighting arena game featuring precise hitbox detection, character combo systems, responsive movement physics, and real-time state synchronization over WebSockets.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'TypeScript',
    tags: ['TypeScript', 'Canvas API', 'WebSockets', 'Multiplayer', 'Physics Engine', 'Game Dev'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/Bloodline',
    highlights: [
      'Low-latency WebSocket multiplayer networking with state interpolation',
      'Pixel-perfect AABB hitbox and hurtbox collision detection',
      'Stamina, combo chains, special attacks, and fluid sprite animations'
    ],
    architecture: 'Authoritative server loop running at 60 FPS with client prediction and HTML5 Canvas renderer.'
  },
  {
    id: 'ar-view',
    title: 'AR_View',
    tagline: 'High-Performance Augmented Reality 3D Model Inspector',
    description: 'C++ augmented reality application enabling real-time 3D object rendering, spatial positioning, surface detection, and model manipulation in physical spaces.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'C++',
    tags: ['C++', 'Augmented Reality', 'OpenGL', 'Computer Vision', '3D Graphics'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/AR_View',
    highlights: [
      'Hardware-accelerated C++ graphics pipeline for 3D asset rendering',
      'Real-time spatial anchor tracking and plane projection',
      'Multi-format 3D model parsing and shader lighting'
    ]
  },
  {
    id: 'ar-expo',
    title: 'AR_Expo',
    tagline: 'Interactive Augmented Reality Exhibition Platform',
    description: 'C++ 3D showcase engine engineered for digital expositions, allowing users to interact with high-detail virtual exhibits placed into physical real-world environments.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'C++',
    tags: ['C++', 'AR', 'Spatial Computing', '3D Rendering', 'Matrix Math'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/AR_Expo',
    highlights: ['Optimized 3D transformation matrices and spatial orientation algorithms.']
  },
  {
    id: '360-tour',
    title: '360_Tour',
    tagline: 'Interactive 360-Degree Panoramic Virtual Tour Engine',
    description: 'Web-based immersive panoramic viewer supporting spherical projection, interactive hotspots, spatial audio narration, and frictionless scene transitions.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'JavaScript',
    tags: ['JavaScript', 'WebGL', 'Three.js', 'Panoramic 360', 'Virtual Tour'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/360_Tour',
    highlights: [
      'Equirectangular texture mapping onto 3D inner spheres',
      'Interactive spatial waypoints linking multiple virtual rooms',
      'Device orientation sensor support for mobile gyroscope navigation'
    ]
  },
  {
    id: 'slugbattle',
    title: 'SlugBattle',
    tagline: 'Fast-Paced Arcade Arena & Creature Combat',
    description: 'Dynamic browser arcade game featuring character abilities, projectile physics, arena boundaries, and escalating enemy waves.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'JavaScript',
    tags: ['JavaScript', 'HTML5 Canvas', 'Game Loop', 'Particle Effects'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/SlugBattle',
    highlights: ['Particle explosion systems and smooth 60 FPS keyboard/touch inputs.']
  },
  {
    id: 'dead-mans-wake',
    title: 'Dead-Man-s-Wake',
    tagline: 'Atmospheric Narrative & Survival Experience',
    description: 'An interactive survival story game with atmospheric soundscapes, dynamic decision trees, inventory management, and suspense-driven progression.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'JavaScript',
    tags: ['JavaScript', 'Story Engine', 'State Tree', 'Audio Design'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/Dead-Man-s-Wake',
    highlights: ['Branching narrative engine with persistent local game saves.']
  },
  {
    id: 'minigames',
    title: 'MiniGames Suite',
    tagline: 'Retro Arcade & Casual Browser Games Collection',
    description: 'A curated collection of responsive mini-games built with vanilla web technologies, testing reflexes, memory, and strategy.',
    category: 'games3d',
    categoryLabel: '3D, Games & AR',
    language: 'HTML',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Arcade Games'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/MiniGames',
    highlights: ['Zero-dependency lightweight arcade games with instant loading.']
  },

  // SYSTEMS & IOT
  {
    id: 'esp32-sd-reader',
    title: 'ESP32 SD Reader Driver',
    tagline: 'Embedded IoT Hardware & SPI Filesystem Driver',
    description: 'Embedded C++ firmware for the ESP32 microcontroller enabling high-speed SPI communication with SD cards, continuous sensor logging, and resilient file indexing.',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    language: 'C++',
    tags: ['C++', 'ESP32', 'IoT', 'Embedded Systems', 'SPI Protocol', 'Hardware'],
    stars: 0,
    featured: true,
    githubUrl: 'https://github.com/ChinmayaGit/ESP32SDReader',
    highlights: [
      'Low-overhead hardware SPI bus initialization and block read/write operations',
      'Fault-tolerant data logger buffering readings during power blips',
      'Direct integration with IoT telemetry pipelines'
    ],
    architecture: 'Bare-metal C++ on FreeRTOS task scheduling.'
  },
  {
    id: 'cli-clock',
    title: 'CLI Clock & Focus Timer',
    tagline: 'Terminal Productivity HUD & Stopwatch Engine',
    description: 'A customizable command-line interface clock, pomodoro timer, and stopwatch built for software engineers who live in the terminal. Features custom ANSI color schemes and low CPU overhead.',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    language: 'Python',
    tags: ['Python', 'CLI', 'Terminal', 'ANSI Graphics', 'Productivity'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/CLI_Clock',
    highlights: [
      'ANSI terminal font rendering with millisecond precision',
      'Integrated customizable Pomodoro intervals for deep work focus'
    ]
  },
  {
    id: 'custom-icon-folder-library',
    title: 'Custom Folder Icon Automation',
    tagline: 'Automated Filesystem Staging & Visual Directory Decorator',
    description: 'Python automation tool that parses developer projects, downloads thematic icons, and injects customized OS directory icons to maintain visually organized workspaces.',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    language: 'Python',
    tags: ['Python', 'Automation', 'Filesystem', 'OS Shell API', 'DevTools'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/Custom-Icon-Folder-Library',
    highlights: ['System desktop.ini & icon resource hacking with batch folder processing.']
  },
  {
    id: 'google-unlimited-photo-api',
    title: 'Google Unlimited Photo Album API',
    tagline: 'C++ Metadata Sync & Album Automation Helper',
    description: 'C++ utility engineered to correct image metadata and programmatically generate organized cloud albums when transferring photos across custom ROMs and pixelified Android devices.',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    language: 'C++',
    tags: ['C++', 'Android Customization', 'EXIF Metadata', 'Automation'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/googleUnlimtedPhotoAlbumApi',
    highlights: ['Batch EXIF timestamp preservation and automated album creation.']
  },
];

