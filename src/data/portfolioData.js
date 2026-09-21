// src/data/portfolioData.js
import scoreLiveImg from '../assets/images/ScoreLivePRO.png';
import hireNearbyImg from '../assets/images/HireNearby.png';
import spartstImg from '../assets/images/spartst.png';
import quranAzkarImg from '../assets/images/quran_azkar.png';
import profilePic from '../assets/images/ismail_potrait.jpg';

export const PERSONAL_INFO = {
  name: 'MD Ismail Hosen',
  shortName: 'Ismail',
  role: 'Junior Software Engineer | Flutter Developer',
  tagline: 'Crafting production-ready, 90fps mobile apps with Clean Architecture & modern engineering.',
  location: 'Mohakhali, Dhaka, Bangladesh',
  phone: '+880 1619-524736',
  email: 'mdismail.cse59@gmail.com',
  whatsapp: 'https://wa.me/8801619524736',
  linkedin: 'https://linkedin.com/in/ismail554',
  github: 'https://github.com/Ismail554',
  portfolioUrl: 'https://my-portfolio-lake-three-88.vercel.app/',
  resumePdf: '/resume/ismail-resume.pdf',
  profilePhoto: profilePic,
  bioParagraphs: [
    "Junior Software Engineer specializing in high-performance Flutter mobile applications with published products on the Google Play Store and Apple App Store.",
    "Driven by Clean Architecture, MVVM, and 90fps UI fluidity. Experienced in managing WebSocket streams, Stripe payments, Agora audio/video, and offline-first caching."
  ],
  stats: [
    { value: '6+', label: 'Shipped Apps', helper: 'App Store & Google Play' },
    { value: '99.5%', label: 'Crash-Free', helper: 'Production Reliability' },
    { value: '90 FPS', label: 'UI Fluidity', helper: 'Zero Jank Target' },
    { value: '2,000+', label: 'Store Users', helper: 'Active Audience' }
  ]
};

export const FEATURED_PROJECTS = [
  {
    id: 'scorelivepro',
    name: 'ScoreLivePro',
    badge: 'Live on Stores',
    category: 'live',
    tagline: 'Sports Companion with 100+ WebSocket Events/Sec',
    image: scoreLiveImg,
    rating: '4.8 ★',
    platform: 'iOS · Android',
    role: 'QA & Flutter Engineer',
    problem: 'Live match statistics require sub-second latency without draining battery or causing UI lag.',
    solution: 'Engineered a Flutter app processing 100+ WebSocket events/sec with 6-language i18n and 4.8 store rating.',
    keyFeatures: [
      'WebSocket stream engine handling 100+ events/sec with zero jank',
      '6-Language internationalization (i18n) and push alert notifications'
    ],
    tech: ['Flutter', 'WebSockets', 'Provider', 'i18n', 'QA Automation'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.scorelivepro.app', icon: 'fab fa-google-play' },
      { label: 'App Store', url: 'https://apps.apple.com/app/scorelivepro/id6758834768', icon: 'fab fa-app-store-ios' }
    ]
  },
  {
    id: 'hirenearby',
    name: 'HireNearby',
    badge: 'Client Production',
    category: 'client',
    tagline: 'Proximity Job Search & On-Demand Hiring Marketplace',
    image: hireNearbyImg,
    rating: 'Production',
    platform: 'iOS · Android',
    role: 'Lead Flutter Developer',
    problem: 'Local employers need instant geolocation job discovery and automated subscription billing.',
    solution: 'Built a modular Flutter app featuring interactive Google Maps filters, in-app messaging, and Stripe subscriptions.',
    keyFeatures: [
      'Proximity-based job feed powered by Google Maps SDK',
      'Automated employer subscription tiers via Stripe SDK'
    ],
    tech: ['Flutter', 'Stripe SDK', 'REST API', 'Clean Architecture', 'Google Maps'],
    links: [
      { label: 'Client Production App', url: '#', icon: 'fas fa-shield-halved', isBadgeOnly: true }
    ]
  },
  {
    id: 'sparts',
    name: 'SPARTS Companion',
    badge: 'Production Showcase',
    category: 'live',
    tagline: 'Sports Training, Court Booking & Athlete Hub',
    image: spartstImg,
    rating: '90 FPS UI',
    platform: 'iOS · Android',
    role: 'Mobile Software Engineer',
    problem: 'Athletes lack a unified platform to reserve courts, monitor workouts, and checkout seamlessly.',
    solution: 'Designed a high-refresh-rate Flutter app with interactive slot booking calendars and workout analytics.',
    keyFeatures: [
      'Real-time venue booking calendar with zero reservation conflicts',
      'Athlete performance progression telemetry and digital invoicing'
    ],
    tech: ['Flutter', 'Clean Architecture', 'State Management', 'REST API'],
    links: [
      { label: 'Production Showcase', url: '#', icon: 'fas fa-mobile-screen', isBadgeOnly: true }
    ]
  },
  {
    id: 'quran-azkar',
    name: 'Quran & Azkar Companion',
    badge: 'Lifestyle & Utility',
    category: 'live',
    tagline: 'Offline Islamic Companion with Solar Prayer Engine',
    image: quranAzkarImg,
    rating: 'Offline-First',
    platform: 'iOS · Android',
    role: 'Solo Mobile Engineer',
    problem: 'Users need instant offline access to verses, recitations, and accurate prayer timings.',
    solution: 'Engineered an offline-first SQLite Flutter app with native Arabic typography and GPS-based prayer algorithms.',
    keyFeatures: [
      'Full offline SQLite storage for Surahs, translations, and audio',
      'Astronomical solar prayer calculation algorithm based on GPS'
    ],
    tech: ['Flutter', 'SQLite', 'Audio Streaming', 'Local Notifications'],
    links: [
      { label: 'Production Showcase', url: '#', icon: 'fas fa-book-open', isBadgeOnly: true }
    ]
  }
];

export const OTHER_PROJECTS = [
  {
    id: 'geography-geyser',
    name: 'Geography Geyser',
    category: 'live',
    badge: '2,000+ Users',
    tagline: 'Interactive Educational Learning Platform',
    description: 'Shipped to 2,000+ users across Google Play and App Store with offline caching reducing bounce rate by 15%.',
    tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Offline Caching'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.geographygeyser.simon', icon: 'fab fa-google-play' },
      { label: 'App Store', url: 'https://apps.apple.com/app/geography-geyser/id6760274426', icon: 'fab fa-app-store-ios' }
    ]
  },
  {
    id: 'anchor-up',
    name: 'AnchorUP',
    category: 'opensource',
    badge: 'Agora & AI',
    tagline: 'Social Network with Video & AI Assistant',
    description: 'Modular widget architecture with Agora real-time video calls and embedded conversational AI agent.',
    tech: ['Flutter', 'Agora SDK', 'AI Agent', 'WebSockets'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Ismail554/AnchorApp', icon: 'fab fa-github' }
    ]
  },
  {
    id: 'reflections-notes',
    name: 'Reflections (My Notes App)',
    category: 'opensource',
    badge: 'Clean Architecture',
    tagline: 'Note Taking with GetX & GoRouter',
    description: 'Clean Architecture implementation featuring GetX state management and Firebase Firestore repository pattern.',
    tech: ['Flutter', 'GetX', 'GoRouter', 'Firebase Firestore'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Ismail554/my_note_app_reflections', icon: 'fab fa-github' }
    ]
  },
  {
    id: 'swiss-car-exchange',
    name: 'SwissCarExchange',
    category: 'opensource',
    badge: 'B2B Marketplace',
    tagline: 'B2B Automotive Listing Platform',
    description: 'B2B marketplace with advanced vehicle search, listing, and messaging using MVVM with Provider and GoRouter.',
    tech: ['Flutter', 'MVVM', 'Provider', 'GoRouter', 'REST API'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Ismail554/SwissCarExchange', icon: 'fab fa-github' }
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: 'fas fa-mobile-screen-button',
    skills: [
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', isDevicon: true },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', isDevicon: true },
      { name: 'Android SDK', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', isDevicon: true },
      { name: 'iOS Development', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', isDevicon: true },
      { name: 'State Management (Provider / GetX)', icon: 'fas fa-cubes' },
      { name: 'GoRouter & Deep Linking', icon: 'fas fa-route' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Integration',
    icon: 'fas fa-server',
    skills: [
      { name: 'REST APIs & WebSockets', icon: 'fas fa-network-wired' },
      { name: 'Firebase (Auth, Firestore, Storage)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', isDevicon: true },
      { name: 'Stripe Payments SDK', icon: 'fab fa-stripe' },
      { name: 'Agora Video / Audio SDK', icon: 'fas fa-video' },
      { name: 'Push Notifications (FCM)', icon: 'fas fa-bell' }
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture & Engineering',
    icon: 'fas fa-sitemap',
    skills: [
      { name: 'Clean Architecture & MVVM', icon: 'fas fa-layer-group' },
      { name: 'SOLID Principles & OOP', icon: 'fas fa-shield-halved' },
      { name: 'Repository Pattern', icon: 'fas fa-database' },
      { name: 'Offline-First Caching', icon: 'fas fa-hard-drive' },
      { name: '90 FPS UI Optimization', icon: 'fas fa-gauge-high' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: 'fas fa-screwdriver-wrench',
    skills: [
      { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', isDevicon: true },
      { name: 'VS Code & Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', isDevicon: true },
      { name: 'Xcode & CocoaPods', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg', isDevicon: true },
      { name: 'Play Console & App Store Connect', icon: 'fab fa-google-play' },
      { name: 'Postman & Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', isDevicon: true }
    ]
  }
];

export const EXPERIENCES = [
  {
    role: 'Junior Flutter Developer · Assistant Team Leader',
    company: 'Join Venture AI',
    location: 'Dhaka, Bangladesh',
    period: 'Sep 2025 — Present',
    type: 'Full-Time',
    highlights: [
      'Engineered cross-platform Flutter apps using Clean Architecture, cutting feature delivery cycles by ~25%.',
      'Optimized rendering pipelines for low-end devices, targeting 90fps and improving frame rate consistency by 20%.',
      'Integrated REST APIs, WebSockets, Agora streaming, and Stripe payments while mentoring 3 junior developers.'
    ],
    tech: ['Flutter', 'Clean Architecture', 'WebSockets', 'Agora', 'Stripe']
  },
  {
    role: 'Lead Flutter Developer',
    company: 'Freelance / App_Oreo Team Lead',
    location: 'Remote',
    period: 'Jan 2025 — Present',
    type: 'Contract',
    highlights: [
      'Technical lead for international clients; engineered the LIVU App predictive health dashboard for Apple.',
      'Implemented subscription-based monetization models using Stripe for Flutter job-hunting applications.'
    ],
    tech: ['Flutter', 'iOS Ecosystem', 'Stripe Subscriptions', 'REST API']
  },
  {
    role: 'Mobile App Developer',
    company: 'Innovation IT',
    location: 'Dhaka, Bangladesh',
    period: 'Mar 2025 — Sep 2025',
    type: 'Full-Time',
    highlights: [
      'Developed native Android applications in Java following Material Design patterns and lifecycle best practices.',
      'Reduced APK binary size by 15% and maintained 99.5% crash-free user sessions across production.'
    ],
    tech: ['Android SDK', 'Java', 'Firebase', 'REST APIs']
  }
];

export const EDUCATION = [
  {
    degree: 'BSc in Computer Science and Engineering',
    institution: 'Canadian University of Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: '2025 — Present',
    note: 'Expected 2028',
    status: 'In Progress'
  },
  {
    degree: 'Diploma in Computer Science & Technology',
    institution: 'Feni Computer Institute',
    location: 'Feni, Bangladesh',
    period: '2020 — 2024',
    note: 'CGPA: 3.56 / 4.00',
    status: 'Graduated'
  },
  {
    degree: 'Secondary School Certificate (Vocational)',
    institution: 'Computer Technology Board',
    location: 'Feni, Bangladesh',
    period: '2018 — 2020',
    note: 'GPA: 5.00 / 5.00',
    status: 'Distinction'
  }
];
