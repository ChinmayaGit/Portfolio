export interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  accentBg: string;
  skills: {
    name: string;
    level: string;
    icon?: string;
    highlight?: boolean;
  }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI & Agents',
    icon: 'Bot',
    color: 'text-purple-400',
    accentBg: 'bg-purple-500/10 border-purple-500/20',
    skills: [
      { name: 'Oracle Fusion AI Agent Studio (Rel 26-2)', level: 'Certified Expert', highlight: true },
      { name: 'Claude Certified Developer (Anthropic)', level: 'Certified Expert', highlight: true },
      { name: 'Autonomous Agent Workflows & DAGs', level: 'Advanced', highlight: true },
      { name: 'LLM Tool Calling & Function Invocation', level: 'Advanced', highlight: true },
      { name: 'Prompt Engineering & Context Optimization', level: 'Advanced' },
      { name: 'n8n Cloud Generative Media Automation', level: 'Advanced', highlight: true },
      { name: 'Python & Node.js AI Runtime Engine', level: 'Advanced' },
      { name: 'AI Application Security & Guardrails', level: 'Practitioner', highlight: true }
    ]
  },
  {
    category: 'Cloud & Cyber',
    icon: 'ShieldCheck',
    color: 'text-rose-400',
    accentBg: 'bg-rose-500/10 border-rose-500/20',
    skills: [
      { name: 'AWS Cloud (Solutions Architect SAA-C03)', level: 'Certified Expert', highlight: true },
      { name: 'AWS Data Engineering (DEA-C01)', level: 'Certified Expert', highlight: true },
      { name: 'SailPoint Identity Security Cloud (ISC)', level: 'Enterprise Practitioner', highlight: true },
      { name: 'Identity & Access Management (IAM)', level: 'Enterprise Advisory', highlight: true },
      { name: 'Zero Trust Security Architecture', level: 'Practitioner', highlight: true },
      { name: 'Docker & Containerization', level: 'Advanced', highlight: true },
      { name: 'Active Directory & Entra ID', level: 'Advanced' },
      { name: 'Linux System Administration & Rootless Podman', level: 'Advanced' }
    ]
  },
  {
    category: 'Full-Stack Web',
    icon: 'Globe',
    color: 'text-sky-400',
    accentBg: 'bg-sky-500/10 border-sky-500/20',
    skills: [
      { name: 'React & TypeScript', level: 'Advanced', highlight: true },
      { name: 'Next.js Modern Architecture', level: 'Advanced', highlight: true },
      { name: 'Java Spring Boot & Hibernate ORM', level: 'Advanced', highlight: true },
      { name: 'Tailwind CSS & Framer Motion', level: 'Expert', highlight: true },
      { name: 'Node.js & Express.js', level: 'Advanced' },
      { name: 'PostgreSQL, MySQL & Redshift', level: 'Advanced', highlight: true },
      { name: 'RESTful API Design & OpenAPI', level: 'Advanced' },
      { name: 'WebSockets & Real-Time Sync', level: 'Advanced' }
    ]
  },
  {
    category: 'Mobile & Flutter',
    icon: 'Smartphone',
    color: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20',
    skills: [
      { name: 'Flutter & Dart Framework', level: 'Production Specialist', highlight: true },
      { name: 'Native Android (Kotlin / Java)', level: 'Advanced', highlight: true },
      { name: 'Native iOS / macOS (Swift)', level: 'Intermediate' },
      { name: 'Riverpod, Bloc & Provider State', level: 'Advanced', highlight: true },
      { name: 'Google Play Store Release & CI/CD', level: 'Production Deployed', highlight: true },
      { name: 'Offline SQLite & Hive Caching', level: 'Advanced' },
      { name: 'Background Audio Services & Foreground Tasks', level: 'Advanced' },
      { name: 'Biometric Auth & AES-256 Vault', level: 'Advanced', highlight: true }
    ]
  },
  {
    category: '3D, Games & AR',
    icon: 'Gamepad2',
    color: 'text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    skills: [
      { name: 'HTML5 Canvas 60 FPS Game Loop', level: 'Advanced', highlight: true },
      { name: 'Real-Time Multiplayer State Sync (WebSockets)', level: 'Advanced', highlight: true },
      { name: 'Three.js & WebGL 3D Graphics', level: 'Advanced', highlight: true },
      { name: 'Hitbox Math & Collision Physics', level: 'Advanced' },
      { name: 'C++ Augmented Reality (AR) Viewers', level: 'Proficient', highlight: true },
      { name: '360-Degree Panoramic Projections', level: 'Advanced' },
      { name: 'Spatial Math & Vector Geometry', level: 'Proficient' }
    ]
  },
  {
    category: 'Systems & IoT',
    icon: 'Cpu',
    color: 'text-teal-400',
    accentBg: 'bg-teal-500/10 border-teal-500/20',
    skills: [
      { name: 'C++ Systems & Embedded Firmware', level: 'Advanced', highlight: true },
      { name: 'ESP32 Microcontrollers & FreeRTOS', level: 'Hardware Deployed', highlight: true },
      { name: 'Hardware SPI & I2C Protocols', level: 'Advanced', highlight: true },
      { name: 'Terminal Productivity & CLI Tooling', level: 'Advanced', highlight: true },
      { name: 'Linux Daemons & Userland Runtimes', level: 'Advanced' },
      { name: 'Filesystem Drivers & Low-Level I/O', level: 'Advanced' },
      { name: 'Python System Automation Scripts', level: 'Advanced' }
    ]
  }
];

