// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

const FlutterIcon = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4z" fill="#46D1FD" />
    <path d="M14.286 11.286L6.857 18.714 10.571 22.429 18 15 21.714 11.286h-7.428z" fill="#46D1FD" />
    <path d="M14.286 18.714l3.714 3.715H21.714l-3.714-3.715-3.714 3.715z" fill="#02569B" />
  </svg>
);

// Staggered entrance for the left column
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// Signature Dart snippet rendered beneath the portrait - [text, tokenClass?]
const CODE_LINES = [
  [['class ', 'tok-key'], ['FlutterEngineer ', 'tok-cls'], ['implements ', 'tok-key'], ['ProblemSolver', 'tok-cls'], [' {']],
  [['  final ', 'tok-key'], ['String ', 'tok-cls'], ['name = '], ["'MD Ismail Hosen'", 'tok-str'], [';']],
  [['  final ', 'tok-key'], ['List<String>', 'tok-cls'], [' focus = [']],
  [["    'Clean Architecture'", 'tok-str'], [',']],
  [["    'High-Performance 90fps'", 'tok-str'], [',']],
  [["    'App Store & Google Play'", 'tok-str']],
  [['  ];']],
  [['  void ', 'tok-key'], ['shipProductionApp', 'tok-fn'], ['() => '], ['Success', 'tok-cls'], ['();']],
  [['}']],
];

export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Ambient background glows */}
      <div className="hero-glow-bg" aria-hidden="true"></div>
      <div className="hero-glow-secondary" aria-hidden="true"></div>

      <div className="container hero-container">
        {/* Left Column: Identity, Value Proposition & Actions */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Availability Badge */}
          <motion.div className="hero-status-pill" variants={itemVariants}>
            <span className="status-indicator-dot"></span>
            <span className="status-text">Available for Full-Time Roles &amp; Contracts</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="highlight-gradient">{PERSONAL_INFO.name}</span>
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            <span className="role-accent">Junior Software Engineer</span>
            <span className="role-divider" aria-hidden="true"></span>
            <span className="flutter-accent">
              <FlutterIcon size={18} /> Flutter Developer
            </span>
          </motion.h2>

          <motion.p className="hero-description" variants={itemVariants}>
            Production-focused Flutter developer building high-performance iOS &amp; Android applications with Clean Architecture and fluid 90fps interfaces.
          </motion.p>

          {/* Technical Highlights */}
          <motion.div className="hero-quick-tags" variants={itemVariants}>
            <span className="tech-badge"><FlutterIcon size={14} /> Flutter &amp; Dart</span>
            <span className="tech-badge"><i className="fas fa-layer-group"></i> Clean Architecture</span>
            <span className="tech-badge"><i className="fas fa-bolt"></i> 90 FPS Fluidity</span>
            <span className="tech-badge"><i className="fas fa-cubes"></i> Provider &amp; GetX</span>
            <span className="tech-badge"><i className="fas fa-cloud"></i> Firebase &amp; REST APIs</span>
          </motion.div>

          {/* Primary & Secondary Actions */}
          <motion.div className="hero-cta-group" variants={itemVariants}>
            <button onClick={() => scrollTo('projects')} className="btn btn-primary">
              <span>View Projects</span>
              <i className="fas fa-arrow-down"></i>
            </button>

            <button onClick={() => scrollTo('experience')} className="btn btn-secondary">
              <span>Experience</span>
              <i className="fas fa-briefcase"></i>
            </button>

            <a
              href={PERSONAL_INFO.resumePdf}
              download="MD_Ismail_Hosen_Resume.pdf"
              className="btn btn-outline"
            >
              <span>Resume</span>
              <i className="fas fa-file-arrow-down"></i>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div className="hero-socials" variants={itemVariants}>
            <span className="socials-label">Connect:</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="social-icon-btn"
              aria-label="Send Email"
              title="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <span className="location-tag">
              <i className="fas fa-location-dot"></i> {PERSONAL_INFO.location}
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: Engineer Spotlight */}
        <motion.div
          className="hero-spotlight-wrapper"
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Floating Circular Portrait with Credential Chips */}
          <div className="hero-portrait-stage">
            <div className="spotlight-portrait-ring">
              <div className="spotlight-portrait-inner">
                <img
                  src={PERSONAL_INFO.profilePhoto}
                  alt={PERSONAL_INFO.name}
                  className="spotlight-portrait-img"
                  loading="eager"
                />
              </div>
            </div>

            <div className="spotlight-chip chip-top-left">
              <i className="fas fa-circle-check"></i>
              <span>Production Ready</span>
            </div>
            <div className="spotlight-chip chip-bottom-right">
              <i className="fas fa-gauge-high"></i>
              <span>90 FPS Rendering</span>
            </div>
          </div>

          {/* Signature Dart Code Snippet */}
          <div className="spotlight-code-card">
            <div className="code-card-header">
              <div className="code-dots" aria-hidden="true">
                <span className="code-dot dot-red"></span>
                <span className="code-dot dot-amber"></span>
                <span className="code-dot dot-green"></span>
              </div>
              <span className="code-filename">clean_architecture.dart</span>
            </div>
            <pre className="code-snippet">
              <code>
                {CODE_LINES.map((line, i) => (
                  <span className="code-line" key={i}>
                    {line.map((tok, j) => (
                      <span key={j} className={tok[1]}>{tok[0]}</span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
