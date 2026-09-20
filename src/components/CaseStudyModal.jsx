// src/components/CaseStudyModal.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CaseStudyModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div>
              <div className="modal-badge-row">
                <span className="project-badge">{project.badge}</span>
                {project.platform && (
                  <span className="platform-tag">
                    <i className="fas fa-mobile-screen"></i> {project.platform}
                  </span>
                )}
                {project.rating && (
                  <span className="rating-tag">
                    <i className="fas fa-star"></i> {project.rating}
                  </span>
                )}
              </div>
              <h3 className="modal-title">{project.name}</h3>
              <p className="modal-subtitle">{project.tagline}</p>
            </div>
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close case study dialog"
            >
              <i className="fas fa-xmark"></i>
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Screenshot Hero in Modal */}
            {project.image && (
              <div className="modal-image-showcase">
                <div className="modal-device-frame">
                  <div className="modal-device-notch"></div>
                  <img
                    src={project.image}
                    alt={`${project.name} Application Screenshot`}
                    className="modal-screen-img"
                  />
                </div>
              </div>
            )}

            <div className="modal-details-grid">
              {/* Role & Problem */}
              <div className="modal-section-card">
                <h4 className="modal-section-title">
                  <i className="fas fa-user-gear"></i> Role & Scope
                </h4>
                <p className="modal-text">{project.role || 'Flutter Mobile Engineer'}</p>

                <h4 className="modal-section-title" style={{ marginTop: '1.25rem' }}>
                  <i className="fas fa-circle-exclamation"></i> The Problem
                </h4>
                <p className="modal-text">{project.problem || project.description}</p>
              </div>

              {/* Technical Solution */}
              <div className="modal-section-card">
                <h4 className="modal-section-title">
                  <i className="fas fa-lightbulb"></i> Engineering Solution
                </h4>
                <p className="modal-text">{project.solution || project.description}</p>

                <h4 className="modal-section-title" style={{ marginTop: '1.25rem' }}>
                  <i className="fas fa-cubes"></i> Technologies & Architecture
                </h4>
                <div className="modal-tech-pills">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Features List */}
            {project.keyFeatures && (
              <div className="modal-features-card">
                <h4 className="modal-section-title">
                  <i className="fas fa-list-check"></i> Key Capabilities & Engineering Feats
                </h4>
                <ul className="modal-features-list">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links Footer */}
            <div className="modal-actions-footer">
              <div className="modal-links-group">
                {project.links && project.links.map((link, idx) => {
                  if (link.isBadgeOnly) {
                    return (
                      <span key={idx} className="btn btn-outline btn-sm">
                        <i className={link.icon}></i> {link.label}
                      </span>
                    );
                  }
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <i className={link.icon}></i> {link.label}
                    </a>
                  );
                })}
              </div>

              <button className="btn btn-secondary btn-sm" onClick={onClose}>
                Close Overview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
