// src/components/FeaturedProjects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURED_PROJECTS, OTHER_PROJECTS } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';

export const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filters = [
    { id: 'all', label: 'All Projects', count: FEATURED_PROJECTS.length + OTHER_PROJECTS.length },
    { id: 'live', label: 'Production & Stores', count: 5 },
    { id: 'client', label: 'Client Solutions', count: 1 },
    { id: 'opensource', label: 'Architecture & OSS', count: 3 }
  ];

  const filteredFeatured = FEATURED_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const filteredOther = OTHER_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="projects-section section-padding-compact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-heading">Featured Applications</h2>
          <p className="section-subtext">
            Clean, production-grade Flutter apps. Click any card or expand to inspect architecture & features.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="project-filter-bar compact-filter-bar">
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

        {/* Minimalist 16:9 Row Grid */}
        <div className="projects-row-grid">
          {filteredFeatured.map((project) => {
            const isExpanded = !!expandedCards[project.id];

            return (
              <motion.article
                key={project.id}
                className={`project-row-card ${isExpanded ? 'is-expanded' : ''}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3 }}
              >
                {/* 16:9 Image Container */}
                <div
                  className="project-image-16-9-wrapper"
                  onClick={() => setSelectedCaseStudy(project)}
                  title="Click to view full case study"
                >
                  <img
                    src={project.image}
                    alt={`${project.name} Application Showcase`}
                    className="project-image-16-9"
                    loading="lazy"
                  />
                  <div className="image-hover-overlay">
                    <span className="overlay-inspect-btn">
                      <i className="fas fa-expand"></i> View Case Study
                    </span>
                  </div>
                  <div className="card-floating-badge-bar">
                    <span className="badge-tag live-badge">{project.badge}</span>
                    {project.rating && (
                      <span className="rating-tag">
                        <i className="fas fa-star"></i> {project.rating}
                      </span>
                    )}
                  </div>
                </div>

                {/* Minimalist Default Card Body */}
                <div className="project-card-body">
                  <div className="card-top-meta">
                    <span className="platform-tag">
                      <i className="fas fa-mobile-screen"></i> {project.platform}
                    </span>
                    <span className="card-role-pill">
                      <i className="fas fa-user-check"></i> {project.role}
                    </span>
                  </div>

                  <h3 className="project-card-title">{project.name}</h3>
                  <p className="project-card-tagline">{project.tagline}</p>

                  {/* Core Tech Stack */}
                  <div className="project-tech-pills">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="tech-tag tech-tag-more">+{project.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Expandable In-Depth Details (Hidden by Default for Simplicity) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="project-expandable-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="expandable-inner-box">
                          <div className="detail-item">
                            <span className="detail-label">Challenge:</span>
                            <p className="detail-text">{project.problem}</p>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Solution:</span>
                            <p className="detail-text">{project.solution}</p>
                          </div>

                          <div className="detail-features">
                            <span className="detail-label">Key Capabilities:</span>
                            <ul className="project-features-list">
                              {project.keyFeatures.map((feat, idx) => (
                                <li key={idx}>
                                  <i className="fas fa-check-circle"></i>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Row */}
                  <div className="project-card-actions">
                    <button
                      className="btn-toggle-expand"
                      onClick={() => toggleExpand(project.id)}
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Less Details' : 'Expand Details'}</span>
                      <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </button>

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedCaseStudy(project)}
                      title="Open full interactive case study"
                    >
                      <i className="fas fa-file-lines"></i>
                      <span>Case Study</span>
                    </button>

                    <div className="card-direct-links">
                      {project.links.map((link, idx) => {
                        if (link.isBadgeOnly) return null;
                        return (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-icon-link"
                            aria-label={link.label}
                            title={link.label}
                          >
                            <i className={link.icon}></i>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Additional Architecture & Open-Source Projects */}
        {filteredOther.length > 0 && (
          <div className="other-projects-block compact-other-block">
            <div className="sub-header-block compact-sub-header">
              <h3 className="sub-heading">Additional Systems & OSS</h3>
            </div>

            <div className="other-projects-grid">
              {filteredOther.map((proj) => (
                <motion.div
                  key={proj.id}
                  className="other-project-card"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.25 }}
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
