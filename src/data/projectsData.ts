export type ProjectTab = 'main' | 'exploring';
export type ProjectSubgroup =
  | 'web'
  | 'mobile'
  | 'ai'
  | 'cloud'
  | 'networking'
  | 'games'
  | '3d'
  | 'iot'
  | 'hardware'
  | 'academic'
  | 'archives'
  | 'games3d'
  | 'other';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems';
  categoryLabel: string;
  tab?: ProjectTab;
  subgroup?: ProjectSubgroup;
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

export const getProjectTab = (project: Project): ProjectTab => {
  if (project.tab) return project.tab;
  if (project.category === 'games3d' || project.category === 'systems') return 'exploring';
  return 'main';
};

export const getProjectSubgroup = (project: Project): ProjectSubgroup => {
  if (project.subgroup) {
    if (project.subgroup === 'games3d') {
      if (['ar-view', 'ar-expo', '360-tour', 'lastevidence-demo', 'owcp', 'dice'].includes(project.id)) {
        return '3d';
      }
      return 'games';
    }
    if (project.subgroup === 'other') return 'academic';
    return project.subgroup;
  }
  if (project.category === 'fullstack') return 'web';
  if (project.category === 'mobile') return 'mobile';
  if (project.category === 'ai') return 'ai';
  if (project.category === 'cloud') {
    if (project.id === 'employee-management-system' || project.id === 'deloitte-labs') return 'networking';
    return 'cloud';
  }
  if (project.category === 'games3d') {
    if (['ar-view', 'ar-expo', '360-tour', 'lastevidence-demo', 'owcp', 'dice'].includes(project.id)) {
      return '3d';
    }
    return 'games';
  }
  if (project.category === 'systems') {
    if (['esp32-sd-reader', 'cli-clock', 'custom-icon-folder-library', 'folderikon', 'collage-mit-inventory'].includes(project.id)) {
      return 'hardware';
    }
    return 'iot';
  }
  return 'academic';
};

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
    tab: 'exploring',
    subgroup: 'games',
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
    tab: 'exploring',
    subgroup: '3d',
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
    tab: 'exploring',
    subgroup: '3d',
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
    tab: 'exploring',
    subgroup: '3d',
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
    tab: 'exploring',
    subgroup: 'games',
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
    tab: 'exploring',
    subgroup: 'games',
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
    tab: 'exploring',
    subgroup: 'games',
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
    tab: 'exploring',
    subgroup: 'hardware',
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
    tab: 'exploring',
    subgroup: 'hardware',
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
    tab: 'exploring',
    subgroup: 'hardware',
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
    tab: 'exploring',
    subgroup: 'iot',
    language: 'C++',
    tags: ['C++', 'Android Customization', 'EXIF Metadata', 'Automation'],
    stars: 0,
    featured: false,
    githubUrl: 'https://github.com/ChinmayaGit/googleUnlimtedPhotoAlbumApi',
    highlights: ['Batch EXIF timestamp preservation and automated album creation.']
  },

  // --- NEWLY SYNCHRONIZED GITHUB REPOSITORIES (ALL 71 REPOS) ---
  {
    id: "openclaw",
    title: "OpenClaw Assistant",
    tagline: "Cross-Platform Autonomous AI Assistant Framework",
    description: "Your own personal AI assistant. Any OS. Any platform. The lobster way. Features multimodal reasoning, tool orchestration, and local system automation.",
    category: "ai",
    categoryLabel: "AI & Agents",
    tab: "main",
    subgroup: "ai",
    language: "TypeScript",
    tags: ["AI Assistant","Autonomous Agents","LLM","Cross-Platform","TypeScript"],
    stars: 0,
    featured: true,
    githubUrl: "https://github.com/ChinmayaGit/openclaw",
    highlights: ["Multi-platform daemon architecture executing local and cloud tool requests","Extensible skill extension engine with sandboxed execution"]
  },
  {
    id: "portfolio",
    title: "Cinematic 3D Portfolio",
    tagline: "Three.js Canvas Frame Orchestration & Reactive Architecture",
    description: "High-performance interactive developer portfolio featuring canvas scroll-scrubbed frame sequences, dark titanium aesthetics, responsive modals, and verified telemetry.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "main",
    subgroup: "web",
    language: "TypeScript",
    tags: ["React","TypeScript","Tailwind CSS","Vite","Framer Motion"],
    stars: 0,
    featured: true,
    githubUrl: "https://github.com/ChinmayaGit/Portfolio",
    demoUrl: "https://chinmayagit.github.io/Portfolio",
    highlights: ["Pre-rendered frame sequence scrubbing with zero scroll jitter","Dual-modal architecture with real-time multi-criteria filtering and sorting"]
  },
  {
    id: "clipdownloader",
    title: "ClipDownloader",
    tagline: "High-Speed Media & Video Downloader Engine",
    description: "Modern web and Node.js utility for fetching and extracting video/audio streams with format conversion, progress telemetry, and metadata parsing.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "main",
    subgroup: "web",
    language: "JavaScript",
    tags: ["JavaScript","Node.js","Media Tools","Streams","Web APIs"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/ClipDownloader",
    highlights: ["Asynchronous chunk streaming for large media payloads","Clean reactive web client with real-time download status"]
  },
  {
    id: "icon-pack",
    title: "Android Custom Icon Pack",
    tagline: "Dynamic Vector Icon Engine for Android Launchers",
    description: "Native Android launcher icon pack featuring adaptive vector drawables, dynamic calendar hooks, and high-DPI icon assets for third-party launchers.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "main",
    subgroup: "mobile",
    language: "Kotlin",
    tags: ["Android","Kotlin","Icons","UI/UX","Mobile"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Icon_pack",
    highlights: ["Adaptive vector icon XML definitions compatible with Nova, Lawnchair, and Niagara launchers."]
  },
  {
    id: "flutter-html",
    title: "Flutter HTML Renderer",
    tagline: "Static HTML-to-Widget Tree Rendering Engine",
    description: "Advanced Flutter library parsing and compiling over 80 static HTML tags directly into native Flutter widget trees with custom stylers and inline renderers.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "main",
    subgroup: "mobile",
    language: "Dart",
    tags: ["Flutter","Dart","HTML Parser","Widgets","Mobile"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/flutter_html",
    highlights: ["Deep DOM AST parser mapping HTML tags to performant Flutter RenderObjects."]
  },
  {
    id: "flutter-custom-animation-grocery-app",
    title: "Animated Grocery Experience",
    tagline: "Complex Motion Design & Micro-Interactions in Flutter",
    description: "Interactive shopping UI demonstrating advanced choreography, custom bezier transitions, hero animations, and fluid cart state management.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "main",
    subgroup: "mobile",
    language: "Dart",
    tags: ["Flutter","Dart","Animations","E-Commerce","UI/UX"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Flutter-Custom-Animation-Grocery-App",
    highlights: ["Physics-based gesture animations and fluid item transition cards."]
  },
  {
    id: "the-gorgeous-login",
    title: "The Gorgeous Login",
    tagline: "Modern Polished Authentication Interface",
    description: "Production-ready sign-in and registration screen with clean tab transitions, animated gradient backgrounds, and form validation.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "main",
    subgroup: "mobile",
    language: "Dart",
    tags: ["Flutter","Dart","Authentication","UI Design"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/TheGorgeousLogin",
    highlights: ["Sleek custom sliding indicator tab controller with smooth page routing."]
  },
  {
    id: "autologin",
    title: "AutoLogin Null-Safety Client",
    tagline: "Persistent Token & Session Management for Mobile",
    description: "Flutter authentication helper managing null-safe session caches, biometric checks, and automated token refreshes with secure storage.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "main",
    subgroup: "mobile",
    language: "Dart",
    tags: ["Flutter","Dart","Null Safety","Security","Auth"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/autologin",
    highlights: ["Cryptographically secure device keychain token persistence with auto-expiry handling."]
  },
  {
    id: "render-n8n",
    title: "Render n8n Cloud Deployment",
    tagline: "Declarative Render Blueprint for n8n & PostgreSQL",
    description: "Infrastructure-as-code blueprint deploying a production-grade n8n workflow engine connected to managed PostgreSQL on Render cloud with persistent disks.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "main",
    subgroup: "cloud",
    language: "YAML",
    tags: ["Render","n8n","DevOps","PostgreSQL","Docker","Cloud"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Render_n8n",
    highlights: ["Zero-config render.yaml blueprint setting up multi-service orchestration with health checks."]
  },
  {
    id: "pocket-dev-server",
    title: "PocketDevServer",
    tagline: "Lightweight Portable Local HTTP & API Testing Daemon",
    description: "Minimalist standalone development server for rapid API mock prototyping, local asset hosting, and network diagnostics across local development environments.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "main",
    subgroup: "cloud",
    language: "Shell",
    tags: ["DevOps","Server","Networking","Developer Tools"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/PocketDevServer",
    highlights: ["Instant zero-dependency HTTP file server and test proxy with CORS support."]
  },
  {
    id: "pirates",
    title: "Pirates: High Seas Battle",
    tagline: "Real-Time Naval Strategy & Combat Engine",
    description: "Interactive TypeScript strategy game featuring physics-based cannonball ballistics, fleet management, and real-time ship maneuvers on canvas.",
    category: "games3d",
    categoryLabel: "3D, Games & AR",
    tab: "exploring",
    subgroup: "games",
    language: "TypeScript",
    tags: ["GameDev","TypeScript","Canvas","Physics Engine"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Pirates",
    highlights: ["Particle physics for cannon fire and collision detection with island obstacles."]
  },
  {
    id: "lastevidence-demo",
    title: "Last Evidence 3D Demo",
    tagline: "Atmospheric Detective Mystery & Spatial Engine",
    description: "Interactive 3D crime investigation game demo with dynamic scene illumination, clue inspection systems, and cinematic narrative scripting.",
    category: "games3d",
    categoryLabel: "3D, Games & AR",
    tab: "exploring",
    subgroup: "3d",
    language: "C++",
    tags: ["GameDev","3D Graphics","Interactive Demo","Spatial"],
    stars: 16,
    featured: true,
    githubUrl: "https://github.com/ChinmayaGit/LastEvidence_Demo",
    highlights: ["16 GitHub Stars: Highly rated interactive narrative detective experience","Realistic 3D scene lighting, raytraced shadows, and camera movement"]
  },
  {
    id: "owcp",
    title: "OWCp Core Engine",
    tagline: "Low-Level C++ Graphic & Windowing Pipeline",
    description: "Custom C++ graphics experiments and windowing pipeline testing low-level buffer management, frame pacing, and shader compilation.",
    category: "games3d",
    categoryLabel: "3D, Games & AR",
    tab: "exploring",
    subgroup: "3d",
    language: "C++",
    tags: ["C++","OpenGL","Graphics Engine","Windowing"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/OWCp",
    highlights: ["Direct GPU vertex buffer streaming and low-latency input event pump."]
  },
  {
    id: "dice",
    title: "Dice 3D Simulation",
    tagline: "Randomized Physical Dice Roller App",
    description: "Interactive mobile dice simulator with realistic physics rolling, haptic and audio cues, and multi-dice tallying.",
    category: "games3d",
    categoryLabel: "3D, Games & AR",
    tab: "exploring",
    subgroup: "3d",
    language: "Dart",
    tags: ["Flutter","Dart","Casual Game","Physics"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/dice",
    highlights: ["Gyroscope-driven motion roll detection and smooth 3D rotation interpolation."]
  },
  {
    id: "infinite-storage-glitch",
    title: "Infinite Storage Glitch (ISG)",
    tagline: "Encoding Arbitrary Files into YouTube Video Streams",
    description: "High-performance Rust utility utilizing video compression frames as an unbounded decentralized storage layer by encoding files into YouTube video streams.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "iot",
    language: "Rust",
    tags: ["Rust","Systems","Video Encoding","Data Storage","Steganography"],
    stars: 0,
    featured: true,
    githubUrl: "https://github.com/ChinmayaGit/Infinite-Storage-Glitch",
    highlights: ["Binary-to-visual RGB block mapping with Reed-Solomon error correction","High-throughput video rendering pipeline tolerating lossy codec compression"]
  },
  {
    id: "folderikon",
    title: "FolderIkon Utility",
    tagline: "Automated Windows Directory Customization Engine",
    description: "Python-based utility automating Windows shell directory .ico assignment, desktop.ini attributes, thumbnail caching, and batch directory styling.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "hardware",
    language: "Python",
    tags: ["Python","Windows Automation","CLI","Productivity"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/FolderIkon",
    highlights: ["Direct Windows Shell API calls with attribute bitmask enforcement."]
  },
  {
    id: "idm",
    title: "IDM Lifecycle Automation Tool",
    tagline: "Scripted Downloader Lifecycle Automation",
    description: "Batch automation and registry configuration recipes optimizing network socket limits, multi-threaded connection concurrency, and transfer performance.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "iot",
    language: "Batchfile",
    tags: ["Batch","Windows Automation","Download Engine"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/idm",
    highlights: ["Automated registry patching and socket connection tuning scripts."]
  },
  {
    id: "collage-ecom-project",
    title: "Campus E-Commerce Portal",
    tagline: "Full-Featured Online Retail Store Demo",
    description: "College engineering e-commerce demo with cart checkout, product catalogue categorization, payment gateway integration, and order placement.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "exploring",
    subgroup: "academic",
    language: "Dart",
    tags: ["Flutter","E-Commerce","Mobile","College Project"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Collage-Ecom_Project",
    highlights: ["End-to-end shopping workflow with mock payment validation and cart state."]
  },
  {
    id: "ecom-servicesandshop",
    title: "Services & Shop Commerce App",
    tagline: "Service Booking & Retail Marketplace Mobile Application",
    description: "Service booking and retail product marketplace application developed in Flutter with schedule management and order tracking.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "exploring",
    subgroup: "academic",
    language: "Dart",
    tags: ["Flutter","Dart","Service Marketplace","Mobile"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Ecom_Servicesandshop",
    highlights: ["Dual service appointment scheduler and item catalogue interface."]
  },
  {
    id: "college-erp-tact",
    title: "College ERP Tact Portal",
    tagline: "Institutional Student Information System",
    description: "Academic ERP mobile client managing student records, course attendance, semester timetables, fee statuses, and examination notifications.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "exploring",
    subgroup: "academic",
    language: "Dart",
    tags: ["Flutter","ERP","Education","Mobile App"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/College-ERP_Tact",
    highlights: ["Centralized dashboard for academic metrics and timetable alerts."]
  },
  {
    id: "collage-mit-inventory",
    title: "MIT Campus Inventory Manager",
    tagline: "Laboratory Equipment & Departmental Asset Tracking",
    description: "Inventory auditing application tracking college lab hardware, serial number records, equipment checkouts, and asset condition statuses.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "exploring",
    subgroup: "hardware",
    language: "Dart",
    tags: ["Flutter","Inventory Management","Assets","Mobile"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Collage-mit_inventory",
    highlights: ["Barcode asset check-in/check-out workflow with audit history."]
  },
  {
    id: "collage-bookstore",
    title: "Java Bookstore System",
    tagline: "Enterprise Java MVC Bookstore Catalog & Billing",
    description: "Enterprise Java application featuring MVC architecture, book catalog management, customer invoicing, and transactional stock adjustments.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "exploring",
    subgroup: "academic",
    language: "Java",
    tags: ["Java","MVC","SQL","Academic Project"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Collage-bookstore",
    highlights: ["Relational schema for inventory stock and invoice generation."]
  },
  {
    id: "collage-advance-java",
    title: "Advanced Java Enterprise Labs",
    tagline: "Servlets, JSP & Enterprise Beans Lab Suite",
    description: "Practical repository demonstrating Servlet lifecycle, JavaServer Pages (JSP), custom tags, session cookies, and database connectivity.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "exploring",
    subgroup: "academic",
    language: "Java",
    tags: ["Java","Servlets","JSP","Enterprise Java"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Collage-Advance_Java",
    highlights: ["Stateful session tracking and server-side view rendering examples."]
  },
  {
    id: "collage-angular-work",
    title: "College Angular Workspace",
    tagline: "Early Frontend Single-Page Application Labs",
    description: "Early collegiate single-page application labs exploring Angular CLI, reactive forms, RxJS observables, and client-side routing.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "exploring",
    subgroup: "academic",
    language: "TypeScript",
    tags: ["Angular","TypeScript","Frontend","SPA"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/collage_angular_work",
    highlights: ["Component hierarchical communication and custom service dependency injection."]
  },
  {
    id: "deloitte-java-docs",
    title: "Enterprise Java Reference Docs",
    tagline: "Curated Documentation on Java Concurrency & ORM Patterns",
    description: "Curated enterprise documentation covering modern Java 17/21 features, multithreading, concurrency locks, Spring Boot practices, and Hibernate query optimization.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "exploring",
    subgroup: "archives",
    language: "Markdown",
    tags: ["Java","Documentation","Spring Boot","Best Practices"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/deloitte_Java_Docs",
    highlights: ["Comprehensive cheat sheets on concurrency models and entity relationship lifecycle."]
  },
  {
    id: "jdbc",
    title: "JDBC Connector Labs",
    tagline: "Low-Level JDBC Connection Pools & Statement Optimization",
    description: "Hands-on Java database connectivity exercises testing connection pooling, batch statement execution, SQL injection prevention, and metadata introspection.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "exploring",
    subgroup: "academic",
    language: "Java",
    tags: ["Java","JDBC","SQL","Databases"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/JDBC",
    highlights: ["Benchmarking PreparedStatement vs Statement execution overhead with batching."]
  },
  {
    id: "java-assignment-3-div-b",
    title: "Java Academic Assignment Suite",
    tagline: "Data Structures, Polymorphism & File I/O Labs",
    description: "Collection of collegiate programming assignments covering OOP inheritance hierarchies, custom exception classes, and robust binary/text file I/O.",
    category: "cloud",
    categoryLabel: "Cloud & Cyber",
    tab: "exploring",
    subgroup: "academic",
    language: "Java",
    tags: ["Java","OOP","Data Structures","Academic"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/java-assignment-3-div-B",
    highlights: ["Demonstrations of polymorphic dispatch and recursive collection operations."]
  },
  {
    id: "gmap",
    title: "GMap Location Navigator",
    tagline: "Native Android Google Maps SDK Integration",
    description: "Native Java Android app utilizing Google Play Services and Maps SDK to plot markers, query reverse geocoding, and render interactive polylines.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "exploring",
    subgroup: "academic",
    language: "Java",
    tags: ["Android","Java","Google Maps API","Geolocation"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Gmap",
    highlights: ["Custom map overlays and real-time GPS coordinate listeners."]
  },
  {
    id: "mcq-web-test",
    title: "MCQ Evaluation Engine Prototype",
    tagline: "Automated Examination Runner & Scoring Tests",
    description: "JavaScript test harness verifying randomized question ordering, anti-cheat tab-blur detection, and instant timer-based submission routines.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "exploring",
    subgroup: "academic",
    language: "JavaScript",
    tags: ["JavaScript","Testing","MCQ","Web"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/mcq_web_test",
    highlights: ["Test suite validating question scoring formulas and edge condition handling."]
  },
  {
    id: "exercises",
    title: "Frontend Web Exercises",
    tagline: "HTML5 & CSS3 Layout Mastery Experiments",
    description: "Curated set of responsive web design drills exploring CSS Grid, Flexbox alignment, CSS custom variables, and DOM event listeners.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "exploring",
    subgroup: "academic",
    language: "HTML",
    tags: ["HTML5","CSS3","Web Design","Exercises"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/exercises",
    highlights: ["Practical responsive layouts built with semantic HTML elements."]
  },
  {
    id: "docs-flutter",
    title: "Flutter Developer Compendium",
    tagline: "Architecture & State Management Reference Guide",
    description: "Personal reference notes on Flutter rendering mechanics, RenderObjects, InheritedWidget data flow, Riverpod/Bloc architectures, and native MethodChannels.",
    category: "mobile",
    categoryLabel: "Mobile & Flutter",
    tab: "exploring",
    subgroup: "archives",
    language: "Markdown",
    tags: ["Flutter","Documentation","Architecture","Dart"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Docs-Flutter",
    highlights: ["Deep dive notes on Flutter widget lifecycle and render tree pipeline."]
  },
  {
    id: "docs-git",
    title: "Git & Version Control Guide",
    tagline: "Advanced Git Workflows & Rebase Strategies",
    description: "Comprehensive guide covering trunk-based development, interactive git rebasing, cherry-picking, bisect debugging, and clean commit hygiene.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "archives",
    language: "Markdown",
    tags: ["Git","DevOps","Documentation","CLI"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Docs-Git",
    highlights: ["Interactive rebase recipes and resolving complicated merge conflicts."]
  },
  {
    id: "nodejs-docs",
    title: "Node.js Backend Notes",
    tagline: "Event Loop Internals & Asynchronous Architecture",
    description: "Technical notes explaining libuv event loop phases, microtask queuing, stream pipelines, worker threads, and memory heap monitoring.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    tab: "exploring",
    subgroup: "archives",
    language: "Markdown",
    tags: ["Node.js","JavaScript","Backend","Documentation"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/NodeJS-Docs",
    highlights: ["Analysis of libuv event loop stages and non-blocking asynchronous I/O."]
  },
  {
    id: "terminal-oh-my-posh",
    title: "Terminal Oh-My-Posh Config",
    tagline: "Modern Terminal Styling & Segment Customization",
    description: "Shell configuration suite featuring Oh-My-Posh prompts, dynamic git branch status indicators, execution time metrics, and custom glyph themes.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "archives",
    language: "PowerShell",
    tags: ["Terminal","PowerShell","DevOps","CLI Customization"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/Terminal-oh-my-posh-",
    highlights: ["Optimized terminal shell configuration with prompt latency reduction."]
  },
  {
    id: "chinmayagit",
    title: "ChinmayaGit Profile Matrix",
    tagline: "GitHub Dynamic README & Metrics Dashboard",
    description: "GitHub profile repository featuring automated statistics workflows, tech stack shields, verified certification badges, and dynamic telemetry.",
    category: "systems",
    categoryLabel: "Systems & IoT",
    tab: "exploring",
    subgroup: "archives",
    language: "Markdown",
    tags: ["GitHub","Profile","Automation","CI/CD"],
    stars: 0,
    featured: false,
    githubUrl: "https://github.com/ChinmayaGit/ChinmayaGit",
    highlights: ["Automated GitHub Actions workflows updating commit statistics and profile activity."]
  }
];
