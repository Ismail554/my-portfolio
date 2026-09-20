// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience = () => {
  return (
    <section id="experience" className="experience-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-eyebrow">Career Timeline</span>
          <h2 className="section-heading">Professional Experience</h2>
          <p className="section-subtext">
            Demonstrated track record of delivering cross-platform solutions, leading engineering squads, and driving production releases.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="experience-timeline">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-card-wrapper"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>

              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div>
                    <div className="role-and-type">
                      <h3 className="timeline-role">{exp.role}</h3>
                      <span className="timeline-job-type">{exp.type}</span>
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

                  <div className="timeline-period-badge">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="timeline-achievements">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <i className="fas fa-arrow-right"></i>
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
          ))}
        </div>
      </div>
    </section>
  );
};
