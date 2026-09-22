// src/components/ResumeSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export const ResumeSection = () => {
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  return (
    <section id="resume" className="resume-section section-padding-compact">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Verified Credentials</span>
          <h2 className="section-heading">Resume &amp; Education</h2>
          <p className="section-subtext">
            Official technical CV, verified production records, and computer science degrees.
          </p>
        </div>

        <div className="credentials-compact-layout">
          {/* Top Hub: Resume Download & Quick Actions */}
          <motion.div
            className="resume-hub-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35 }}
          >
            <div className="resume-hub-main">
              <div className="resume-hub-info">
                <div className="pdf-icon-badge">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <div>
                  <div className="hub-title-row">
                    <h3 className="resume-doc-title">MD Ismail Hosen — Curriculum Vitae</h3>
                    <span className="hub-badge">2026 Edition</span>
                  </div>
                  <p className="resume-doc-meta">
                    <span className="meta-item"><i className="fas fa-file-code"></i> PDF Format (145 KB)</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item"><i className="fas fa-shield-halved"></i> Verified Production Record</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item"><i className="fas fa-mobile-screen"></i> Flutter / Mobile Engineer</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="resume-hub-actions">
                <a
                  href={PERSONAL_INFO.resumePdf}
                  download="MD_Ismail_Hosen_Flutter_Resume.pdf"
                  className="btn btn-primary"
                >
                  <i className="fas fa-download"></i>
                  <span>Download CV</span>
                </a>

                <button
                  className={`btn ${showPdfViewer ? 'btn-secondary active' : 'btn-secondary'}`}
                  onClick={() => setShowPdfViewer(!showPdfViewer)}
                  aria-expanded={showPdfViewer}
                >
                  <i className={`fas ${showPdfViewer ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  <span>{showPdfViewer ? 'Close Preview' : 'Quick Preview'}</span>
                </button>

                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fas fa-up-right-from-square"></i>
                  <span>Open Tab</span>
                </a>
              </div>
            </div>

            {/* Embedded Resume Viewer */}
            <AnimatePresence>
              {showPdfViewer && (
                <motion.div
                  className="resume-embedded-viewer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="viewer-bar">
                    <span>Document Viewer: ismail-resume.pdf</span>
                    <button
                      onClick={() => setShowPdfViewer(false)}
                      className="viewer-close-btn"
                      title="Close viewer"
                      aria-label="Close resume preview"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <iframe
                    src={PERSONAL_INFO.resumePdf}
                    title="MD Ismail Hosen Resume PDF"
                    className="resume-iframe"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Academic Background: 3 Equal Column Balanced Cards */}
          <div className="academic-credentials-block">
            <div className="academic-header-row">
              <span className="academic-row-title">
                <i className="fas fa-graduation-cap"></i> Academic Qualifications
              </span>
              <span className="academic-row-sub">Formal Computer Science &amp; Engineering Degrees</span>
            </div>

            <div className="academic-cards-grid">
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-compact-card"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <div className="edu-card-top">
                    <span className="edu-status-pill">{edu.status}</span>
                    <span className="edu-period-tag">
                      <i className="fas fa-calendar-day"></i> {edu.period}
                    </span>
                  </div>

                  <div className="edu-card-body">
                    <h4 className="edu-compact-degree">{edu.degree}</h4>
                    <div className="edu-compact-inst">
                      <i className="fas fa-building-columns"></i>
                      <span>{edu.institution}</span>
                    </div>
                  </div>

                  <div className="edu-card-footer">
                    <span className="edu-compact-loc">
                      <i className="fas fa-location-dot"></i> {edu.location}
                    </span>
                    {edu.note && (
                      <span className="edu-compact-note">
                        <i className="fas fa-award"></i> {edu.note}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

