// src/components/FeaturedProjects.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';

export const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects', count: FEATURED_PROJECTS.length + OTHER_PROJECTS.length },
    { id: 'live', label: 'Production / Stores', count: 5 },
    { id: 'client', label: 'Client Solutions', count: 1 },
    { id: 'opensource', label: 'Architecture & OSS', count: 3 }
  ];

  // Filter featured projects
  const filteredFeatured = FEATURED_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  // Filter other projects
  const filteredOther = OTHER_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="projects-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-eyebrow">Case Studies & Engineering Work</span>
          <h2 className="section-heading">Featured Mobile Applications</h2>
          <p className="section-subtext">
            Production Flutter systems engineered with Clean Architecture, high-frequency WebSockets, offline-first caching, and 90fps user interfaces.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="project-filter-bar">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              <span>{f.label}</span>
              <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Featured Projects - Large Case Study Showcases */}
        <div className="featured-projects-stack">
          {filteredFeatured.map((project, index) => (
            <motion.article
              key={project.id}
              className={`featured-case-study ${index % 2 === 1 ? 'reverse-layout' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Device Mockup Display with Real App Screenshot */}
              <div className="case-study-visual">
                <div className="device-mockup-wrapper">
                  <div className="device-phone">
                    <div className="device-notch"></div>
                    <div className="device-screen">
                      <img
                        src={project.image}
                        alt={`${project.name} UI showcase`}
                        className="device-screenshot"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="device-glow-shadow"></div>
                </div>

                <button
                  className="quick-expand-btn"
                  onClick={() => setSelectedCaseStudy(project)}
                  title="Expand Case Study"
                >
                  <i className="fas fa-up-right-and-down-left-from-center"></i>
                  <span>Inspect Case Study</span>
                </button>
              </div>

              {/* Case Study Technical Narrative */}
              <div className="case-study-content">
                <div className="case-study-header-tags">
                  <span className="badge-tag live-badge">{project.badge}</span>
                  <span className="platform-tag">
                    <i className="fas fa-mobile-screen"></i> {project.platform}
                  </span>
                  {project.rating && (
                    <span className="rating-tag">
                      <i className="fas fa-star"></i> {project.rating}
                    </span>
                  )}
                </div>

                <h3 className="case-study-title">{project.name}</h3>
                <p className="case-study-tagline">{project.tagline}</p>

                <div className="case-study-role-box">
                  <span className="role-label">Role:</span>
                  <span className="role-value">{project.role}</span>
                </div>

                {/* Problem & Solution Brief */}
                <div className="case-study-synopsis">
                  <div className="synopsis-item">
                    <span className="synopsis-label">Challenge:</span>
                    <p className="synopsis-text">{project.problem}</p>
                  </div>
                  <div className="synopsis-item">
                    <span className="synopsis-label">Solution:</span>
                    <p className="synopsis-text">{project.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="case-study-highlights">
                  <span className="highlights-label">Key Engineering Features:</span>
                  <ul className="highlights-list">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx}>
                        <i className="fas fa-circle-check"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="case-study-tech-row">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>

                {/* Actions & Links */}
                <div className="case-study-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedCaseStudy(project)}
                  >
                    <i className="fas fa-file-lines"></i>
                    <span>Full Case Study</span>
                  </button>

                  {project.links.map((link, idx) => {
                    if (link.isBadgeOnly) return null;
                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        <i className={link.icon}></i>
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Notable Engineering Projects */}
        {filteredOther.length > 0 && (
          <div className="other-projects-block">
            <div className="sub-header-block">
              <h3 className="sub-heading">Additional Systems & Open-Source Repositories</h3>
              <p className="sub-description">
                Clean Architecture implementations, real-time Agora SDK video tools, and marketplace backends.
              </p>
            </div>

            <div className="other-projects-grid">
              {filteredOther.map((proj) => (
                <motion.div
                  key={proj.id}
                  className="other-project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="other-card-top">
                    <span className="project-badge">{proj.badge}</span>
                    <div className="other-card-links">
                      {proj.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link-btn"
                          aria-label={link.label}
                          title={link.label}
                        >
                          <i className={link.icon}></i>
                        </a>
                      ))}
                    </div>
                  </div>

                  <h4 className="other-card-title">{proj.name}</h4>
                  <p className="other-card-tagline">{proj.tagline}</p>
                  <p className="other-card-desc">{proj.description}</p>

                  <div className="other-card-tech">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="tech-pill-sm">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Case Study Modal */}
        {selectedCaseStudy && (
          <CaseStudyModal
            project={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
          />
        )}
      </div>
    </section>
  );
};
