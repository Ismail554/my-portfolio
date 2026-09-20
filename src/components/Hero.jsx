// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-bg"></div>
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="status-indicator-dot"></span>
            <span className="status-text">Available for Full-time Roles & Freelance Projects</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="highlight-gradient">{PERSONAL_INFO.name}</span>
          </h1>

          <h2 className="hero-subtitle">
            <span className="role-accent">Junior Software Engineer</span>
            <span className="role-divider">|</span>
            <span className="flutter-accent">Flutter Developer</span>
          </h2>

          <p className="hero-description">
            Specializing in high-performance, cross-platform iOS and Android mobile engineering with Flutter & Dart. 
            Passionate about Clean Architecture, 90fps responsive user experiences, and production-ready APIs.
          </p>

          {/* Quick Technical Highlights */}
          <div className="hero-quick-tags">
            <span className="tech-badge"><i className="fab fa-flutter"></i> Flutter & Dart</span>
            <span className="tech-badge"><i className="fas fa-layer-group"></i> Clean Architecture</span>
            <span className="tech-badge"><i className="fas fa-bolt"></i> 90 FPS Fluidity</span>
            <span className="tech-badge"><i className="fas fa-cubes"></i> Provider & GetX</span>
            <span className="tech-badge"><i className="fas fa-cloud"></i> Firebase & REST APIs</span>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="hero-cta-group">
            <button
              onClick={() => scrollTo('projects')}
              className="btn btn-primary"
            >
              <span>View Projects</span>
              <i className="fas fa-arrow-down"></i>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="btn btn-secondary"
            >
              <span>Contact Me</span>
              <i className="fas fa-envelope"></i>
            </button>

            <a
              href={PERSONAL_INFO.resumePdf}
              download="MD_Ismail_Hosen_Resume.pdf"
              className="btn btn-outline"
            >
              <span>Resume</span>
              <i className="fas fa-file-arrow-down"></i>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
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
          </div>
        </motion.div>

        {/* Visual Element: Profile Card with Interactive Flutter Code Mockup */}
        <motion.div
          className="hero-visual-card-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-photo-container">
            <div className="hero-photo-ring">
              <img
                src={PERSONAL_INFO.profilePhoto}
                alt={PERSONAL_INFO.name}
                className="hero-photo-img"
              />
            </div>
            <div className="hero-floating-badge badge-flutter">
              <i className="fab fa-flutter"></i>
              <span>Production Ready</span>
            </div>
            <div className="hero-floating-badge badge-performance">
              <i className="fas fa-gauge-high"></i>
              <span>90 FPS Rendering</span>
            </div>
          </div>

          {/* Clean Code Snippet Window */}
          <div className="hero-code-snippet">
            <div className="snippet-header">
              <div className="snippet-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="snippet-file">clean_architecture.dart</span>
            </div>
            <pre className="snippet-body">
              <code>
                <span className="code-kw">class</span> <span className="code-type">FlutterEngineer</span> <span className="code-kw">implements</span> <span className="code-type">ProblemSolver</span> &#123;{'\n'}
                {'  '}<span className="code-kw">final</span> String name = <span className="code-str">'MD Ismail Hosen'</span>;{'\n'}
                {'  '}<span className="code-kw">final</span> List&lt;String&gt; focus = [{'\n'}
                {'    '}<span className="code-str">'Clean Architecture'</span>,{'\n'}
                {'    '}<span className="code-str">'High-Performance 90fps'</span>,{'\n'}
                {'    '}<span className="code-str">'App Store & Google Play'</span>{'\n'}
                {'  '}];{'\n'}
                {'  '}<span className="code-type">void</span> <span className="code-fn">shipProductionApp</span>() =&gt; <span className="code-type">Success</span>();{'\n'}
                &#125;
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
