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
  tagline: 'Crafting production-ready, 90fps cross-platform mobile apps with Clean Architecture & modern engineering practices.',
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
    "I am a Junior Software Engineer specializing in cross-platform mobile application engineering with Flutter and Dart. With hands-on experience taking products from initial architecture to Google Play and the Apple App Store, I focus on building reliable, clean, and maintainable software systems.",
    "My engineering approach is rooted in Clean Architecture and MVVM, ensuring modular codebases with strict separation of UI, business logic, and network layers. Having led development teams and managed QA pipelines for high-concurrency apps, I prioritize 90fps UI fluidity, memory optimization, and bulletproof offline-first caching.",
    "Beyond mobile frameworks, I have solid experience integrating complex REST APIs, WebSockets, Firebase ecosystems, and third-party SDKs like Stripe and Agora. I enjoy collaborating with cross-functional teams, solving tough algorithmic bugs, and shipping products users love."
  ],
  stats: [
    { value: '6+', label: 'Shipped Apps', helper: 'App Store & Google Play' },
    { value: '99.5%', label: 'Crash-Free Sessions', helper: 'Production Reliability' },
    { value: '90 FPS', label: 'UI Rendering Target', helper: 'Lag-Free User Experience' },
    { value: '2,000+', label: 'Active Users Served', helper: 'Across Multiple Stores' }
  ]
};

export const FEATURED_PROJECTS = [
  {
    id: 'scorelivepro',
    name: 'ScoreLivePro',
    badge: 'Live on Stores',
    category: 'live',
    tagline: 'Real-Time Sports Companion with 100+ WebSocket Events/Sec',
    image: scoreLiveImg,
    rating: '4.8 ★',
    platform: 'iOS · Android',
    role: 'QA Manager & Cross-Platform Flutter Engineer',
    problem: 'Sports enthusiasts expect millisecond-level live score updates, multilingual commentary, and detailed player stats without battery drain or stuttering UI during peak match events.',
    solution: 'Engineered a resilient Flutter client using WebSocket stream handlers to process over 100 concurrent data points per second with zero UI jank. Implemented 6-language internationalization, optimized background tasks, and managed full store deployment.',
    keyFeatures: [
      'High-throughput WebSocket stream processing handling 100+ events/sec',
      '6-Language dynamic localization (i18n) for international audiences',
      'Millisecond-accurate live timelines, card alerts, and match lineups',
      'Smart caching layer for historical match statistics and player profiles',
      'Published to Google Play and Apple App Store with 4.8 average rating'
    ],
    tech: ['Flutter', 'Dart', 'WebSockets', 'Provider', 'Localization (i18n)', 'QA Automation', 'REST API'],
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
    tagline: 'Localized Job Search & Direct On-Demand Hiring Marketplace',
    image: hireNearbyImg,
    rating: 'Production',
    platform: 'iOS · Android',
    role: 'Lead Flutter Developer',
    problem: 'Local employers and hourly workers needed a friction-free mobile platform to connect based on precise geolocation, alongside a sustainable recurring subscription model for employers.',
    solution: 'Built a clean, modular Flutter application featuring interactive map queries, candidate filtering, real-time in-app application status tracking, and end-to-end Stripe payment integration with subscription tier management.',
    keyFeatures: [
      'Proximity-based job discovery powered by Google Maps SDK and custom markers',
      'Automated recurring employer subscriptions via secure Stripe API integration',
      'Instant candidate-to-employer chat and streamlined application pipeline',
      'MVVM architecture ensuring clear separation of data contracts and presentation'
    ],
    tech: ['Flutter', 'Dart', 'Stripe SDK', 'REST API', 'Clean Architecture', 'Google Maps SDK'],
    links: [
      { label: 'Client Production App', url: '#', icon: 'fas fa-shield-halved', isBadgeOnly: true }
    ]
  },
  {
    id: 'sparts',
    name: 'SPARTS Companion',
    badge: 'Production Showcase',
    category: 'live',
    tagline: 'Sports Training, Court Booking & Athlete Community Hub',
    image: spartstImg,
    rating: '90 FPS UI',
    platform: 'iOS · Android',
    role: 'Mobile Software Engineer',
    problem: 'Athletes and sports facilities struggle with fragmented booking tools, manual scheduling errors, and lack of visual progress tracking for training regimens.',
    solution: 'Developed a high-performance, dark-themed sports mobile experience featuring real-time calendar slot reservations, athlete workout analytics, seamless checkout flows, and 90fps animated UI transitions.',
    keyFeatures: [
      'Interactive venue reservation calendar with conflict-free slot booking',
      'Visual training telemetry and performance progression graphs',
      'Streamlined digital checkout with automated digital receipts',
      'Custom micro-interactions and high refresh rate UI rendering'
    ],
    tech: ['Flutter', 'Dart', 'Clean Architecture', 'State Management', 'REST API', 'Figma to Code'],
    links: [
      { label: 'Production Showcase', url: '#', icon: 'fas fa-mobile-screen', isBadgeOnly: true }
    ]
  },
  {
    id: 'quran-azkar',
    name: 'Quran & Azkar Companion',
    badge: 'Lifestyle & Utility',
    category: 'live',
    tagline: 'Offline-First Islamic Companion with Accurate Prayer Engine',
    image: quranAzkarImg,
    rating: 'Offline-First',
    platform: 'iOS · Android',
    role: 'Solo Mobile Engineer',
    problem: 'Users traveling in remote areas require quick, offline access to Surahs, recitations, and prayer timings without intrusive advertisements or heavy data consumption.',
    solution: 'Constructed an offline-first Flutter application featuring SQLite local persistence, high-resolution Arabic typography with font scaling, GPS-based astronomical prayer calculation, and daily Azkar counter.',
    keyFeatures: [
      'Offline SQLite database for instant Surah search and bookmarked verses',
      'Astronomical solar prayer calculation algorithm based on GPS coordinates',
      'Smooth audio playback engine with background stream buffering',
      'Haptic feedback Azkar counter with customized daily reminder notifications'
    ],
    tech: ['Flutter', 'Dart', 'SQLite', 'Audio Streaming', 'Local Notifications', 'Geolocation'],
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
    tagline: 'Educational Quiz & Interactive Learning Platform',
    description: 'Transitioned the application from closed testing to production, shipping to 2,000+ active users across Google Play and the App Store. Engineered offline-first caching which reduced bounce rates by 15%, and managed end-to-end release pipelines.',
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Offline Caching', 'REST API'],
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
    tagline: 'Scalable Social Network with Live Video & AI Assistant',
    description: 'Architected a scalable Flutter social networking application with a reusable modular widget library, accelerating feature development by 30%. Integrated Agora SDK for real-time video calls and embedded an interactive AI bot to drive user communication.',
    tech: ['Flutter', 'Agora SDK', 'AI Agent', 'WebSockets', 'Modular Widgets', 'Clean Architecture'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Ismail554/AnchorApp', icon: 'fab fa-github' }
    ]
  },
  {
    id: 'reflections-notes',
    name: 'Reflections (My Notes App)',
    category: 'opensource',
    badge: 'Clean Architecture',
    tagline: 'Full-Featured Note Taking with GetX & GoRouter',
    description: 'Constructed an architectural showcase note-taking application following strict Clean Architecture principles. Features GetX state management, GoRouter declarative URL routing, and Firebase Firestore persistence using the repository pattern.',
    tech: ['Flutter', 'GetX', 'GoRouter', 'Firebase Firestore', 'Repository Pattern'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Ismail554/my_note_app_reflections', icon: 'fab fa-github' }
    ]
  },
  {
    id: 'swiss-car-exchange',
    name: 'SwissCarExchange',
    category: 'opensource',
    badge: 'B2B Marketplace',
    tagline: 'B2B Automotive Listing & Negotiation Platform',
    description: 'Built a B2B automotive marketplace featuring vehicle inventory browsing, multi-criteria filtering, and buyer-seller connection flows. Implemented Provider for state management, GoRouter for navigation, and robust REST API networking.',
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
    description: 'Cross-platform native-feeling applications built for high performance and smooth framerates.',
    skills: [
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', isDevicon: true },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', isDevicon: true },
      { name: 'Android SDK', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', isDevicon: true },
      { name: 'iOS Development', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', isDevicon: true },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', isDevicon: true },
      { name: 'State Management (Provider/GetX)', icon: 'fas fa-cubes' },
      { name: 'GoRouter & Deep Linking', icon: 'fas fa-route' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Integration',
    icon: 'fas fa-server',
    description: 'Seamless integration with real-time sockets, cloud databases, and third-party APIs.',
    skills: [
      { name: 'REST APIs & JSON', icon: 'fas fa-network-wired' },
      { name: 'WebSockets (Real-Time)', icon: 'fas fa-bolt' },
      { name: 'Firebase Auth & Firestore', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', isDevicon: true },
      { name: 'Firebase Cloud Storage', icon: 'fas fa-cloud' },
      { name: 'Stripe Payments SDK', icon: 'fab fa-stripe' },
      { name: 'Agora Video/Audio SDK', icon: 'fas fa-video' },
      { name: 'Google Maps API', icon: 'fas fa-map-location-dot' },
      { name: 'Push Notifications (FCM)', icon: 'fas fa-bell' }
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture & Engineering',
    icon: 'fas fa-sitemap',
    description: 'Scalable software engineering practices prioritizing code health and maintainability.',
    skills: [
      { name: 'Clean Architecture', icon: 'fas fa-layer-group' },
      { name: 'MVVM Pattern', icon: 'fas fa-cubes-stacked' },
      { name: 'SOLID Principles', icon: 'fas fa-shield-halved' },
      { name: 'Object-Oriented Programming (OOP)', icon: 'fas fa-code' },
      { name: 'Repository Pattern', icon: 'fas fa-database' },
      { name: 'Offline-First Caching', icon: 'fas fa-hard-drive' },
      { name: '90 FPS UI Optimization', icon: 'fas fa-gauge-high' }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Release Management',
    icon: 'fas fa-screwdriver-wrench',
    description: 'Modern developer workflow tools and production store deployment pipelines.',
    skills: [
      { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', isDevicon: true },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', isDevicon: true },
      { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', isDevicon: true },
      { name: 'Xcode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg', isDevicon: true },
      { name: 'Google Play Console', icon: 'fab fa-google-play' },
      { name: 'App Store Connect', icon: 'fab fa-app-store-ios' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', isDevicon: true },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', isDevicon: true }
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
      'Engineered cross-platform Flutter mobile applications following Clean Architecture, reducing new feature delivery cycles by ~25% through modular package separation.',
      'Optimized rendering pipelines on low-end Android and iOS devices, eliminating rendering jank and consistently maintaining a 90fps target (20% frame rate improvement).',
      'Integrated mission-critical REST APIs, high-throughput WebSockets, Agora audio/video streaming, and Stripe payment gateways.',
      'Led and mentored a squad of 3 junior developers, conducted rigorous code reviews, and reduced production hotfix occurrences by 30%.'
    ],
    tech: ['Flutter', 'Dart', 'Clean Architecture', 'WebSockets', 'Agora SDK', 'Stripe', 'Git']
  },
  {
    role: 'Lead Flutter Developer',
    company: 'Freelance Mobile Developer / App_Oreo Team Lead',
    location: 'Remote / Dhaka',
    period: 'Jan 2025 — Present',
    type: 'Contract & Leadership',
    highlights: [
      'Spearheaded end-to-end mobile architecture and served as primary technical lead for international clients across freelance marketplaces.',
      'Engineered the LIVU App for the Apple ecosystem, implementing complex predictive health dashboards calculating user performance scores and fatigue risk.',
      'Implemented subscription-based monetization models using Stripe for Flutter job-hunting applications, adhering to platform guideline compliance.'
    ],
    tech: ['Flutter', 'iOS Ecosystem', 'Stripe Subscriptions', 'REST API', 'Data Visualization']
  },
  {
    role: 'Mobile App Developer',
    company: 'Innovation IT',
    location: 'Dhaka, Bangladesh',
    period: 'Mar 2025 — Sep 2025',
    type: 'Full-Time',
    highlights: [
      'Developed native Android applications in Java utilizing responsive Material Design UI patterns and adhering to Android platform lifecycle guidelines.',
      'Configured REST API clients and integrated Firebase backend services (Authentication, Cloud Firestore, Storage) for dynamic data delivery.',
      'Reduced compiled APK binary size by 15% through ProGuard rules and asset optimization, maintaining 99.5% crash-free user sessions.'
    ],
    tech: ['Android SDK', 'Java', 'Firebase (Auth, Firestore)', 'REST APIs', 'Material Design']
  }
];

export const EDUCATION = [
  {
    degree: 'BSc in Computer Science and Engineering',
    institution: 'Canadian University of Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: '2025 — Present',
    note: 'Undergraduate Program (Expected 2028)',
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
    degree: 'Secondary School Certificate (Dhakil Vocational)',
    institution: 'Computer Technology Board',
    location: 'Feni, Bangladesh',
    period: '2018 — 2020',
    note: 'GPA: 5.00 / 5.00',
    status: 'Completed with Distinction'
  }
];
