// src/components/Footer.jsx
import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-brand-block">
            <div className="footer-logo">
              <span className="logo-badge">IH</span>
              <span className="logo-name">{PERSONAL_INFO.name}</span>
            </div>
            <p className="footer-bio">
              Junior Software Engineer & Flutter Developer specializing in high-performance cross-platform iOS & Android engineering, Clean Architecture, and real-time APIs.
            </p>
            <div className="footer-availability">
              <span className="footer-avail-dot"></span>
              <span>Available for engineering roles & select contracts</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-links">
              <li><a href="#about">About Profile</a></li>
              <li><a href="#projects">Case Studies</a></li>
              <li><a href="#skills">Skills & Tech Stack</a></li>
              <li><a href="#experience">Experience Timeline</a></li>
              <li><a href="#resume">Resume & Education</a></li>
              <li><a href="#contact">Contact Me</a></li>
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Profiles & Social</h4>
            <ul className="footer-social-links">
              <li>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i> GitHub (@Ismail554)
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i> LinkedIn (@ismail554)
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSONAL_INFO.email}`}>
                  <i className="fas fa-envelope"></i> Email ({PERSONAL_INFO.email})
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i> WhatsApp ({PERSONAL_INFO.phone})
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Crafted with React & Clean Design.
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            <span>Back to top</span>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};
