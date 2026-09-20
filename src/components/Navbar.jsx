// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar = ({ activeSection, isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <div className="brand-logo-circle">
            <span>IH</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">MD Ismail Hosen</span>
            <span className="brand-role">Flutter Developer</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-links-list">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA / Theme Toggle */}
        <div className="navbar-actions">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <i className="fas fa-sun theme-icon-sun"></i>
            ) : (
              <i className="fas fa-moon theme-icon-moon"></i>
            )}
          </button>

          <a
            href={PERSONAL_INFO.resumePdf}
            download="MD_Ismail_Hosen_Flutter_Resume.pdf"
            className="navbar-resume-btn"
          >
            <i className="fas fa-file-arrow-down"></i>
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links-list">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
          <li className="mobile-drawer-cta">
            <a
              href={PERSONAL_INFO.resumePdf}
              download="MD_Ismail_Hosen_Flutter_Resume.pdf"
              className="btn btn-primary btn-block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fas fa-file-arrow-down"></i> Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
