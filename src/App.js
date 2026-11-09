// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import './components/admin/AdminStyles.css';

import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GithubStreak } from './components/GithubStreak';
import { About } from './components/About';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SwarmCursors } from './components/SwarmCursors';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function PortfolioApp() {
  const { isAdminLoggedIn, logout, siteSettings } = usePortfolio();
  const { sections = {} } = siteSettings || {};

  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/admin') || hash.startsWith('#/admin')) {
      return '/admin';
    }
    return '/';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // Sleek modern dark mode by default
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync route on popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.startsWith('/admin') || hash.startsWith('#/admin')) {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    window.history.pushState({}, '', '/admin');
    setCurrentRoute('/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPortfolio = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    window.history.pushState({}, '', '/');
    setCurrentRoute('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply Theme
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
    setIsDarkMode((prev) => !prev);
  };

  // Scroll Progress Tracker for public portfolio
  useEffect(() => {
    if (currentRoute === '/admin') return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  // Intersection Observer for Active Section Highlighting
  useEffect(() => {
    if (currentRoute === '/admin') return;

    const sectionIds = ['hero', 'projects', 'experience', 'skills', 'resume', 'about', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [currentRoute]);

  // If on /admin route
  if (currentRoute === '/admin') {
    if (!isAdminLoggedIn) {
      return <AdminLogin onBackToPortfolio={navigateToPortfolio} />;
    }
    return (
      <AdminDashboard
        onNavigateToPortfolio={navigateToPortfolio}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    );
  }

  // Public Portfolio View
  return (
    <div className="App">
      {/* Dynamic Scroll Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      {/* Global Navigation */}
      <Navbar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Portfolio Content with dynamic section visibility */}
      <main id="main-content">
        {sections.hero !== false && <Hero />}
        {sections.streak !== false && <GithubStreak />}
        {sections.projects !== false && <FeaturedProjects />}
        {sections.experience !== false && <Experience />}
        {sections.skills !== false && <Skills />}
        {sections.resume !== false && <ResumeSection />}
        {sections.about !== false && <About />}
        {sections.contact !== false && <Contact />}
      </main>

      {/* Footer */}
      <Footer onNavigateToAdmin={navigateToAdmin} />

      {/* Multiplayer Swarm Cursors Rebuild Engine */}
      <SwarmCursors />

      {/* Floating Admin Quick Bar if logged in */}
      {isAdminLoggedIn && (
        <aside className="admin-floating-bar" aria-label="Admin Navigation Control">
          <div className="admin-floating-badge">
            <span className="admin-floating-pulse" aria-hidden="true"></span>
            <span>Admin Active</span>
          </div>

          <button
            type="button"
            className="admin-floating-btn"
            onClick={navigateToAdmin}
            title="Open Admin Dashboard"
          >
            <i className="fas fa-gauge-high"></i>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="admin-btn-action admin-btn-logout"
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', borderRadius: '999px' }}
            onClick={logout}
            title="Log Out Admin"
          >
            <i className="fas fa-right-from-bracket"></i>
          </button>
        </aside>
      )}
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
