// src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectsManager } from './ProjectsManager';
import { ExperienceManager } from './ExperienceManager';
import { SkillsManager } from './SkillsManager';
import { EducationManager } from './EducationManager';
import { ProfileManager } from './ProfileManager';
import './AdminStyles.css';

export const AdminDashboard = ({ onNavigateToPortfolio, isDarkMode, toggleTheme }) => {
  const {
    logout,
    portfolioState,
    siteSettings,
    toggleSection,
    resetToDefaults,
    exportAsJson,
    importFromJson,
    generatePortfolioDataCode,
    downloadPortfolioDataJs
  } = usePortfolio();

  const {
    featuredProjects,
    otherProjects,
    experiences,
    skillCategories,
    education
  } = portfolioState;

  const [activeTab, setActiveTab] = useState('overview');
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const handleCopyCode = () => {
    const code = generatePortfolioDataCode();
    navigator.clipboard.writeText(code).then(() => {
      setCopyCodeSuccess(true);
      setTimeout(() => setCopyCodeSuccess(false), 2500);
    });
  };

  const handleJsonFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = importFromJson(event.target.result);
        if (result.success) {
          setImportStatus('Backup restored successfully!');
        } else {
          setImportStatus('Error: ' + result.message);
        }
        setTimeout(() => setImportStatus(''), 3000);
      };
      reader.readAsText(file);
    }
  };

  const totalSkillsCount = skillCategories.reduce(
    (acc, cat) => acc + (cat.skills ? cat.skills.length : 0),
    0
  );

  return (
    <div className="admin-dashboard-container">
      {/* Top Navigation Bar */}
      <header className="admin-navbar">
        <div className="admin-nav-brand">
          <div className="admin-brand-icon">IH</div>
          <span className="admin-brand-title">
            Ismail Portfolio CMS
            <span className="admin-badge-live">Live Sync</span>
          </span>
        </div>

        <div className="admin-nav-actions">
          <button
            type="button"
            className="admin-btn-action"
            onClick={onNavigateToPortfolio}
            title="Open public portfolio view"
          >
            <i className="fas fa-eye"></i>
            <span>View Public Site</span>
          </button>

          <button
            type="button"
            className="admin-btn-action"
            onClick={downloadPortfolioDataJs}
            title="Download clean updated portfolioData.js"
          >
            <i className="fas fa-file-code"></i>
            <span>Export portfolioData.js</span>
          </button>

          <button
            type="button"
            className="admin-btn-action"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button
            type="button"
            className="admin-btn-action admin-btn-logout"
            onClick={() => {
              if (window.confirm('Sign out of Portfolio Admin?')) {
                logout();
              }
            }}
            title="Sign Out"
          >
            <i className="fas fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="admin-body">
        {/* Left Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-sidebar-nav" aria-label="CMS Navigation">
            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-chart-pie"></i>
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <i className="fas fa-cubes"></i>
              <span>Projects (CRUD)</span>
              <span className="admin-sidebar-count">
                {featuredProjects.length + otherProjects.length}
              </span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <i className="fas fa-briefcase"></i>
              <span>Experience</span>
              <span className="admin-sidebar-count">{experiences.length}</span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <i className="fas fa-screwdriver-wrench"></i>
              <span>Skills &amp; Tech</span>
              <span className="admin-sidebar-count">{totalSkillsCount}</span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <i className="fas fa-graduation-cap"></i>
              <span>Education &amp; CV</span>
              <span className="admin-sidebar-count">{education.length}</span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-gear"></i>
              <span>Profile &amp; About</span>
            </button>

            <button
              type="button"
              className={`admin-sidebar-item ${activeTab === 'export' ? 'active' : ''}`}
              onClick={() => setActiveTab('export')}
            >
              <i className="fas fa-cloud-arrow-down"></i>
              <span>Sync &amp; Export</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="admin-main-content">
          {activeTab === 'overview' && (
            <div>
              <div className="admin-content-header">
                <div>
                  <h2 className="admin-page-title">Portfolio CMS Overview</h2>
                  <p className="admin-page-subtext">
                    Live operational overview of your portfolio content, section visibility, and quick actions.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    className="admin-btn-primary"
                    onClick={() => setActiveTab('projects')}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Manage Projects</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="admin-metrics-grid">
                <div className="admin-metric-card">
                  <div className="admin-metric-icon">
                    <i className="fas fa-mobile-screen"></i>
                  </div>
                  <div>
                    <div className="admin-metric-value">{featuredProjects.length}</div>
                    <div className="admin-metric-label">Featured Apps</div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon indigo">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <div>
                    <div className="admin-metric-value">{otherProjects.length}</div>
                    <div className="admin-metric-label">OSS / Systems</div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon emerald">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div>
                    <div className="admin-metric-value">{experiences.length}</div>
                    <div className="admin-metric-label">Roles &amp; Positions</div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon amber">
                    <i className="fas fa-screwdriver-wrench"></i>
                  </div>
                  <div>
                    <div className="admin-metric-value">{totalSkillsCount}</div>
                    <div className="admin-metric-label">Total Tech Skills</div>
                  </div>
                </div>
              </div>

              {/* Section Visibility Switches */}
              <div className="admin-panel-card">
                <h3 className="admin-panel-title">
                  <i className="fas fa-sliders"></i>
                  <span>Live Section Visibility Controls</span>
                </h3>
                <p className="admin-panel-desc">
                  Toggle portfolio sections on or off on the public website instantaneously.
                </p>

                <div className="admin-switches-grid">
                  {Object.entries(siteSettings.sections || {}).map(([key, isVisible]) => {
                    const sectionLabels = {
                      hero: 'Hero & Availability Header',
                      streak: 'GitHub Daily Streak & Heatmap',
                      projects: 'Featured Applications & OSS',
                      experience: 'Professional Experience Timeline',
                      skills: 'Skills & Competencies Grid',
                      resume: 'Resume Hub & Education',
                      about: 'About Profile & 4 Pillars',
                      contact: 'Interactive Contact Form'
                    };

                    const sectionIcons = {
                      hero: 'fas fa-rocket',
                      streak: 'fab fa-github',
                      projects: 'fas fa-cubes',
                      experience: 'fas fa-briefcase',
                      skills: 'fas fa-screwdriver-wrench',
                      resume: 'fas fa-graduation-cap',
                      about: 'fas fa-user-check',
                      contact: 'fas fa-envelope'
                    };

                    return (
                      <div key={key} className="admin-switch-item">
                        <div className="admin-switch-info">
                          <i className={sectionIcons[key] || 'fas fa-circle'}></i>
                          <span className="admin-switch-name">{sectionLabels[key] || key}</span>
                        </div>
                        <label className="admin-toggle-switch">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={() => toggleSection(key)}
                          />
                          <span className="admin-slider"></span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="admin-panel-card">
                <h3 className="admin-panel-title">
                  <i className="fas fa-bolt"></i>
                  <span>Quick Management Portals</span>
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('projects')}
                  >
                    <i className="fas fa-cubes"></i>
                    <span>Edit Projects ({featuredProjects.length + otherProjects.length})</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('experience')}
                  >
                    <i className="fas fa-briefcase"></i>
                    <span>Edit Experience ({experiences.length})</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('skills')}
                  >
                    <i className="fas fa-screwdriver-wrench"></i>
                    <span>Edit Skills ({totalSkillsCount})</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('education')}
                  >
                    <i className="fas fa-graduation-cap"></i>
                    <span>Edit Education &amp; Resume</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="fas fa-id-card"></i>
                    <span>Edit Personal Identity</span>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={() => setActiveTab('export')}
                  >
                    <i className="fas fa-cloud-arrow-down"></i>
                    <span>Export &amp; Code Generator</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'experience' && <ExperienceManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'education' && <EducationManager />}
          {activeTab === 'profile' && <ProfileManager />}

          {activeTab === 'export' && (
            <div>
              <div className="admin-content-header">
                <div>
                  <h2 className="admin-page-title">Sync, Backup &amp; Code Export</h2>
                  <p className="admin-page-subtext">
                    Export your changes as clean JavaScript source code, backup complete snapshots in JSON, or restore anytime.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button
                    type="button"
                    className="admin-btn-primary"
                    onClick={downloadPortfolioDataJs}
                  >
                    <i className="fas fa-download"></i>
                    <span>Download portfolioData.js</span>
                  </button>
                </div>
              </div>

              {/* JSON Backup & Restore Card */}
              <div className="admin-panel-card">
                <h3 className="admin-panel-title">
                  <i className="fas fa-box-archive"></i>
                  <span>JSON Snapshot Backup &amp; Restore</span>
                </h3>
                <p className="admin-panel-desc">
                  Download a complete portable JSON backup file of all your projects, experiences, skills, education, and bio info.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="admin-btn-action"
                    onClick={exportAsJson}
                  >
                    <i className="fas fa-file-arrow-down"></i>
                    <span>Download JSON Backup</span>
                  </button>

                  <label className="admin-btn-action" style={{ cursor: 'pointer' }}>
                    <i className="fas fa-file-arrow-up"></i>
                    <span>Restore from JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={handleJsonFileUpload}
                    />
                  </label>

                  {importStatus && (
                    <span style={{ fontSize: '0.85rem', color: importStatus.startsWith('Error') ? '#f87171' : '#34d399', fontWeight: 600 }}>
                      {importStatus}
                    </span>
                  )}
                </div>
              </div>

              {/* Live portfolioData.js Code Preview */}
              <div className="admin-panel-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 className="admin-panel-title" style={{ margin: 0 }}>
                      <i className="fas fa-code"></i>
                      <span>Live Generated src/data/portfolioData.js</span>
                    </h3>
                    <p className="admin-panel-desc" style={{ margin: '0.25rem 0 0 0' }}>
                      Clean ES Module code reflecting every change in your admin panel. Replace <code style={{ color: 'var(--flutter-cyan)' }}>src/data/portfolioData.js</code> to make changes permanent in Git.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="admin-btn-action"
                      onClick={handleCopyCode}
                    >
                      <i className={`fas ${copyCodeSuccess ? 'fa-check' : 'fa-copy'}`}></i>
                      <span>{copyCodeSuccess ? 'Copied!' : 'Copy Code'}</span>
                    </button>

                    <button
                      type="button"
                      className="admin-btn-primary"
                      onClick={downloadPortfolioDataJs}
                    >
                      <i className="fas fa-download"></i>
                      <span>Download File</span>
                    </button>
                  </div>
                </div>

                <pre className="admin-code-box">
                  <code>{generatePortfolioDataCode()}</code>
                </pre>
              </div>

              {/* Danger Zone: Factory Reset */}
              <div className="admin-panel-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.04)' }}>
                <h3 className="admin-panel-title" style={{ color: '#f87171' }}>
                  <i className="fas fa-triangle-exclamation"></i>
                  <span>Reset to Factory Defaults</span>
                </h3>
                <p className="admin-panel-desc">
                  Clear custom localStorage modifications and restore the original initial portfolio data from repository code.
                </p>

                <button
                  type="button"
                  className="admin-btn-action admin-btn-logout"
                  onClick={() => {
                    if (window.confirm('Reset all CMS modifications back to repository factory defaults? This action cannot be undone unless you have a JSON backup.')) {
                      resetToDefaults();
                      alert('Portfolio data reset to defaults.');
                    }
                  }}
                >
                  <i className="fas fa-rotate-left"></i>
                  <span>Reset All Data to Defaults</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
