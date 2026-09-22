// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../data/portfolioData';

const getCompanyIcon = (company) => {
  if (company.includes('Join Venture')) return 'fas fa-users-gear';
  if (company.includes('Freelance') || company.includes('App_Oreo')) return 'fas fa-rocket';
  if (company.includes('Innovation')) return 'fab fa-android';
  return 'fas fa-briefcase';
};

export const Experience = () => {
  return (
    <section id="experience" className="experience-section section-padding-compact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Work &amp; Leadership</span>
          <h2 className="section-heading">Professional Experience</h2>
          <p className="section-subtext">
            Proven track record of production app delivery, mobile squad leadership, and 90fps performance.
          </p>
        </div>

        {/* Experience Highlights Quick Bar */}
        <div className="experience-highlights-strip">
          <div className="exp-highlight-item">
            <div className="exp-highlight-icon">
              <i className="fas fa-layer-group"></i>
            </div>
            <div className="exp-highlight-text">
              <span className="highlight-val">Clean Architecture</span>
              <span className="highlight-sub">Scalable &amp; Testable Codebases</span>
            </div>
          </div>

          <div className="exp-highlight-item">
            <div className="exp-highlight-icon">
              <i className="fas fa-gauge-high"></i>
            </div>
            <div className="exp-highlight-text">
              <span className="highlight-val">90 FPS Fluidity</span>
              <span className="highlight-sub">Zero Jank Rendering Pipeline</span>
            </div>
          </div>

          <div className="exp-highlight-item">
            <div className="exp-highlight-icon">
              <i className="fas fa-cloud-arrow-up"></i>
            </div>
            <div className="exp-highlight-text">
              <span className="highlight-val">Stores QA &amp; CI/CD</span>
              <span className="highlight-sub">Google Play &amp; Apple App Store</span>
            </div>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="experience-timeline">
          {EXPERIENCES.map((exp, index) => {
            const isCurrent = exp.period.toLowerCase().includes('present');
            const iconClass = getCompanyIcon(exp.company);

            return (
              <motion.div
                key={index}
                className={`timeline-card-wrapper ${isCurrent ? 'is-current-role' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Timeline Visual Node & Connecting Line */}
                <div className="timeline-marker">
                  <div className={`timeline-node-icon ${isCurrent ? 'is-active-node' : ''}`}>
                    <i className={iconClass}></i>
                  </div>
                  <div className="marker-line"></div>
                </div>

                {/* Experience Card */}
                <div className={`timeline-card ${isCurrent ? 'current-card-highlight' : ''}`}>
                  <div className="timeline-card-header">
                    <div className="header-left-col">
                      <div className="role-and-type">
                        <h3 className="timeline-role">{exp.role}</h3>
                        <span className={`timeline-job-type ${exp.type.toLowerCase().includes('contract') ? 'type-contract' : 'type-fulltime'}`}>
                          {exp.type}
                        </span>
                      </div>

                      <div className="timeline-company-row">
                        <span className="company-name">
                          <i className="fas fa-building"></i> {exp.company}
                        </span>
                        <span className="company-dot">•</span>
                        <span className="company-location">
                          <i className="fas fa-location-dot"></i> {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Period & Active Indicator */}
                    <div className="header-right-col">
                      <div className="timeline-period-badge">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{exp.period}</span>
                        {isCurrent && (
                          <span className="active-pill">
                            <span className="pulse-dot"></span> Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Achievements List */}
                  <ul className="timeline-achievements">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>
                        <i className="fas fa-circle-check"></i>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="timeline-tech-row">
                    {exp.tech.map((tech, idx) => (
                      <span key={idx} className="timeline-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

