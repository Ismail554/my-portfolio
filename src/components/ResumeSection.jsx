// src/components/ResumeSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, EDUCATION } from '../data/portfolioData';

export const ResumeSection = () => {
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  return (
    <section id="resume" className="resume-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-eyebrow">Verified Credentials</span>
          <h2 className="section-heading">Resume & Academic Background</h2>
          <p className="section-subtext">
            Comprehensive overview of professional history, educational qualifications, and downloadable technical resume.
          </p>
        </div>

        <div className="resume-layout-grid">
          {/* Resume Download & Highlights Card */}
          <motion.div
            className="resume-download-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="resume-card-header">
              <div className="pdf-icon-badge">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div>
                <h3 className="resume-doc-title">MD Ismail Hosen — Curriculum Vitae</h3>
                <p className="resume-doc-meta">Updated for 2026 • PDF Format • 145 KB</p>
              </div>
            </div>

            <p className="resume-summary-text">
              Detailed technical CV highlighting production Flutter implementations, 90fps rendering pipeline optimizations, Clean Architecture patterns, and Google Play / Apple App Store publishing records.
            </p>

            <div className="resume-cta-buttons">
              <a
                href={PERSONAL_INFO.resumePdf}
                download="MD_Ismail_Hosen_Flutter_Resume.pdf"
                className="btn btn-primary"
              >
                <i className="fas fa-download"></i>
                <span>Download Resume (PDF)</span>
              </a>

              <button
                className="btn btn-secondary"
                onClick={() => setShowPdfViewer(!showPdfViewer)}
              >
                <i className={`fas ${showPdfViewer ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                <span>{showPdfViewer ? 'Hide Preview' : 'Preview Resume'}</span>
              </button>

              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <i className="fas fa-up-right-from-square"></i>
                <span>Open in Tab</span>
              </a>
            </div>

            {/* Embedded Resume Viewer Toggle */}
            {showPdfViewer && (
              <motion.div
                className="resume-embedded-viewer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="viewer-bar">
                  <span>Document Viewer: ismail-resume.pdf</span>
                  <button onClick={() => setShowPdfViewer(false)} className="viewer-close-btn">
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
          </motion.div>

          {/* Academic Credentials List */}
          <div className="education-column">
            <h3 className="column-subtitle">
              <i className="fas fa-graduation-cap"></i> Academic Qualifications
            </h3>

            <div className="education-cards-stack">
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="edu-top-line">
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <span className="edu-badge">{edu.status}</span>
                  </div>

                  <div className="edu-institution">
                    <i className="fas fa-building-columns"></i>
                    <span>{edu.institution}</span>
                  </div>

                  <div className="edu-meta-row">
                    <span className="edu-period">
                      <i className="fas fa-calendar-day"></i> {edu.period}
                    </span>
                    <span className="edu-location">
                      <i className="fas fa-map-pin"></i> {edu.location}
                    </span>
                  </div>

                  {edu.note && (
                    <div className="edu-note-tag">
                      <i className="fas fa-award"></i> {edu.note}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
