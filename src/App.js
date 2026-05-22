// App.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import profilePic from './assets/images/ismail_potrait.jpg';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <div className="cursor-glow"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <Navbar scrollToSection={scrollToSection} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Summary id="summary" />
      <Skills id="skills" />
      <Experience id="experience" />
      <Projects id="projects" />
      <Education id="education" />
      <Footer />
    </div>
  );
}

const Navbar = ({ scrollToSection, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="nav-container">
        <div className="nav-logo">MH</div>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('summary')}>Summary</button></li>
          <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
          <li><button onClick={() => scrollToSection('experience')}>Experience</button></li>
          <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
          <li><button onClick={() => scrollToSection('education')}>Education</button></li>
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <a
              href="/resume/ismail-resume.pdf"
              download="MD-Ismail-Hosen-Resume.pdf"
              className="resume-btn"
            >
              <i className="fas fa-download"></i> Resume PDF
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

// Hero Component
const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            MD Ismail Hosen
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Flutter Developer | Mobile Software Engineer
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Architecting and shipping cross-platform applications to App Store & Google Play
          </motion.p>
          <motion.div
            className="tech-stack"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <span className="tech-badge flutter">Flutter</span>
            <span className="tech-badge dart">Dart</span>
            <span className="tech-badge firebase">Firebase</span>
            <span className="tech-badge android">Android</span>
            <span className="tech-badge ios">iOS</span>
            <span className="tech-badge play">Google Play</span>
            <span className="tech-badge store">App Store</span>
          </motion.div>
          <motion.div
            className="hero-highlights"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <span><i className="fas fa-rocket"></i> Production-ready shipping</span>
            <span><i className="fas fa-bolt"></i> 90fps UI performance</span>
            <span><i className="fas fa-diagram-project"></i> Clean Architecture</span>
          </motion.div>
          <motion.div
            className="hero-contact"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="tel:+8801619524736" className="contact-link">
              <i className="fas fa-phone"></i> +880 1619-524736
            </a>
            <a href="mailto:mdismail.cse59@gmail.com" className="contact-link">
              <i className="fas fa-envelope"></i> mdismail.cse59@gmail.com
            </a>
            <a href="https://linkedin.com/in/ismail554" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-linkedin"></i> /ismail554
            </a>
            <a href="https://github.com/Ismail554" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-github"></i> /Ismail554
            </a>
            <a href="https://my-portfolio-lake-three-88.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fas fa-globe"></i> Portfolio
            </a>
          </motion.div>
          <motion.div
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <button className="btn primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
              View Projects
            </button>
            <button className="btn secondary" onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
              Experience
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="hero-image-stack">
            <div className="flutter-emblem" aria-hidden="true">
              <span className="flutter-shape flutter-shape-a"></span>
              <span className="flutter-shape flutter-shape-b"></span>
              <span className="flutter-shape flutter-shape-c"></span>
            </div>
            <div className="profile-image-container">
              <img src={profilePic} alt="MD Ismail Hosen" className="profile-photo" />
            </div>
            <div className="store-pills">
              <span><i className="fab fa-google-play"></i> Google Play</span>
              <span><i className="fab fa-app-store"></i> App Store</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Summary Component
const Summary = ({ id }) => {
  return (
    <motion.section
      id={id}
      className="section summary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <h2 className="section-title">Professional Summary</h2>
        <motion.div className="summary-content" variants={itemVariants}>
          <p>
            Results-driven Flutter Developer and Technical Lead with a proven track record of architecting
            and shipping cross-platform applications to the App Store and Google Play. Expertise in delivering
            pixel-perfect, 90fps user experiences utilizing Clean Architecture, MVVM, and robust state management
            (Provider, GetX). Adept at driving end-to-end development—from QA execution to production—while
            seamlessly integrating real-time capabilities (WebSockets, Agora), AI features, and secure payment
            gateways (Stripe).
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Skills Component
const Skills = ({ id }) => {
  const skills = {
    languages: ['Dart', 'Java', 'C / C++', 'Python'],
    frameworks: ['Flutter', 'Android SDK', 'Provider', 'GetX', 'GoRouter'],
    architecture: ['Clean Architecture', 'MVVM', 'REST API Integration', 'WebSockets'],
    backendServices: ['Firebase (Auth, Firestore, Storage)', 'Agora SDK', 'Stripe SDK', 'Google Maps SDK'],
    tools: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Xcode', 'Postman', 'Google Play Console', 'App Store Connect'],
    languagesSpoken: ['Bengali (Native)', 'English (Professional Working)']
  };

  return (
    <motion.section
      id={id}
      className="section skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-code"></i> Languages</h3>
            <div className="skill-tags">
              {skills.languages.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-mobile-alt"></i> Mobile Frameworks</h3>
            <div className="skill-tags">
              {skills.frameworks.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-layer-group"></i> Architecture</h3>
            <div className="skill-tags">
              {skills.architecture.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-server"></i> Backend & Services</h3>
            <div className="skill-tags">
              {skills.backendServices.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-tools"></i> Tools & Platforms</h3>
            <div className="skill-tags">
              {skills.tools.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
          <motion.div className="skill-category" variants={itemVariants}>
            <h3><i className="fas fa-language"></i> Spoken Languages</h3>
            <div className="skill-tags">
              {skills.languagesSpoken.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Experience Component
const Experience = ({ id }) => {
  const experiences = [
    {
      title: 'Junior Flutter Developer · Assistant Team Leader',
      company: 'Join Venture AI',
      location: 'Dhaka, Bangladesh',
      period: 'Sep 2025 — Present',
      points: [
        'Engineered cross-platform Flutter applications following Clean Architecture, reducing feature delivery time by ~25% through modular design.',
        'Optimized UI rendering pipelines, resolving jank on low-end devices and targeting 90fps to improve frame rate consistency by 20%.',
        'Integrated REST APIs, WebSockets, and third-party SDKs including Agora (video/audio) and Stripe (payments).',
        'Led a team of 3 junior developers; conducted code reviews, technical mentorship, and reduced production hotfixes by 30%.'
      ]
    },
    {
      title: 'Lead Flutter Developer',
      company: 'Freelance Mobile Developer / App_Oreo Team Lead',
      location: 'Dhaka, Bangladesh',
      period: 'Jan 2025 — Present',
      points: [
        'Spearheaded end-to-end app development and acted as the primary technical point of contact for international clients via freelance platforms.',
        'Engineered the LIVU App for the Apple ecosystem, featuring a complex predictive dashboard that calculates performance scores and fatigue risk.',
        'Implemented a subscription-based monetization model using Stripe for a Flutter-based job-searching application, managing deployment and platform fee considerations.'
      ]
    },
    {
      title: 'Mobile App Developer',
      company: 'Innovation IT',
      location: 'Dhaka, Bangladesh',
      period: 'Mar 2025 — Sep 2025',
      points: [
        'Built native Android applications in Java with responsive Material Design UIs aligned to platform lifecycle best practices.',
        'Integrated REST APIs and Firebase backend services (Auth, Firestore, Storage) for dynamic content delivery.',
        'Reduced APK size by 15% and resolved platform-specific crashes to maintain 99.5% crash-free sessions.'
      ]
    }
  ];

  return (
    <motion.section
      id={id}
      className="section experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div key={index} className="timeline-item" variants={itemVariants}>
              <div className="timeline-header">
                <h3>{exp.title}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>
              <div className="timeline-company">
                <i className="fas fa-building"></i> {exp.company} | {exp.location}
              </div>
              <ul className="timeline-points">
                {exp.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Projects Component
const Projects = ({ id }) => {
  const projects = [
    {
      name: 'ScoreLivePro',
      description: 'Real-time sports companion app with live scoring',
      tech: ['Flutter', 'WebSockets', 'Localization', 'QA'],
      points: [
        'Managed quality assurance (QA) and development tracking for a real-time sports companion app.',
        'Implemented 6-language localization and handled 100+ concurrent data updates per second via WebSocket streams without UI lag.',
        'Published cross-platform to both stores, achieving 4.8 average rating.'
      ],
      links: [
        { url: 'https://play.google.com/store/apps/details?id=com.scorelivepro.app', icon: 'fab fa-google-play', label: 'Google Play' },
        { url: 'https://apps.apple.com/app/scorelivepro/id6758834768', icon: 'fab fa-app-store', label: 'App Store' }
      ]
    },
    {
      name: 'Geography Geyser',
      description: 'Educational quiz app published to 2,000+ users',
      tech: ['Flutter', 'Dart', 'Firebase', 'REST API'],
      points: [
        'Transitioned the application from closed testing to production, shipping to 2,000+ users across Google Play and the App Store.',
        'Engineered offline-first caching, which reduced bounce rates by 15%, and managed the end-to-end release pipeline.'
      ],
      links: [
        { url: 'https://play.google.com/store/apps/details?id=com.geographygeyser.simon', icon: 'fab fa-google-play', label: 'Google Play' },
        { url: 'https://apps.apple.com/app/geography-geyser/id6760274426', icon: 'fab fa-app-store', label: 'App Store' }
      ]
    },
    {
      name: 'NetworkX Mobile App',
      description: 'Enterprise mobile application with API-driven dashboards',
      tech: ['Flutter', 'Provider', 'REST API'],
      points: [
        'Built an enterprise mobile app with API-driven dashboards; engineered the network layer with automatic token refresh for seamless authentication.'
      ],
      links: [
        { url: 'https://play.google.com/store/apps/details?id=com.app.neworkx', icon: 'fab fa-google-play', label: 'Google Play' }
      ]
    },
    {
      name: 'AnchorUP',
      description: 'Social networking app with real-time video & AI bot',
      tech: ['Flutter', 'Agora SDK', 'AI', 'Social Media'],
      points: [
        'Architected a scalable Flutter social networking application with a reusable modular widget library, accelerating feature development by 30%.',
        'Integrated the Agora SDK for seamless real-time video calling and embedded an interactive AI bot to drive user engagement and communication.'
      ],
      links: [
        { url: 'https://github.com/Ismail554/AnchorApp', icon: 'fab fa-github', label: 'GitHub' }
      ]
    },
    {
      name: 'Reflections (My Notes App)',
      description: 'Note-taking app with Clean Architecture & Firebase',
      tech: ['Flutter', 'GetX', 'GoRouter', 'Firebase'],
      points: [
        'Built a note-taking app using Clean Architecture with GetX and GoRouter; integrated Firebase persistence using the repository pattern.'
      ],
      links: [
        { url: 'https://github.com/Ismail554/my_note_app_reflections', icon: 'fab fa-github', label: 'GitHub' }
      ]
    },
    {
      name: 'SwissCarExchange',
      description: 'B2B car marketplace with listing & buyer-seller flows',
      tech: ['Flutter', 'MVVM', 'Provider', 'GoRouter', 'REST API'],
      points: [
        'Built a B2B car marketplace with listing, browsing, and buyer-seller connection flows using MVVM architecture.',
        'Implemented Provider for state management, GoRouter for declarative navigation, and REST API integration throughout.',
        'Delivered cross-platform for both iOS and Android with Clean Architecture from data layer to presentation.'
      ],
      links: [
        { url: 'https://github.com/Ismail554/SwissCarExchange', icon: 'fab fa-github', label: 'GitHub' }
      ]
    }
  ];

  return (
    <motion.section
      id={id}
      className="section projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div key={index} className="project-card" variants={itemVariants}>
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className="project-badge">{project.tech.join(' • ')}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <ul className="project-points">
                {project.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className={link.icon}></i> {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Education Component
const Education = ({ id }) => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Canadian University of Bangladesh',
      location: 'Dhaka, Bangladesh',
      period: '2025 — Present',
      note: 'Expected 2027'
    },
    {
      degree: 'Diploma in Computer Science and Technology',
      institution: 'Feni Computer Institute',
      location: 'Feni, Bangladesh',
      period: '2020 — 2024',
      note: 'CGPA: 3.56/4.00'
    },
    {
      degree: 'Computer Technology',
      institution: 'Dhakil Vocational',
      location: 'Feni, Bangladesh',
      period: '2018 — 2020',
      note: 'GPA: 5.00/5.00'
    }
  ];

  return (
    <motion.section
      id={id}
      className="section education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <motion.div key={index} className="education-item" variants={itemVariants}>
              <div className="education-header">
                <h3>{edu.degree}</h3>
                <span className="education-period">{edu.period}</span>
              </div>
              <div className="education-institution">
                <i className="fas fa-university"></i> {edu.institution} | {edu.location}
              </div>
              {edu.note && <span className="education-note">{edu.note}</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-pattern"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo">MH</span>
              <p className="footer-tagline">Building cross-platform mobile applications with Flutter.</p>
            </div>
            <div className="footer-links">
              <a href="https://linkedin.com/in/ismail554" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/Ismail554" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="mailto:mdismail.cse59@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} MD Ismail Hosen. All rights reserved.</p>
            <p className="footer-made-with">Made with <span className="heart">❤️</span> & React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
