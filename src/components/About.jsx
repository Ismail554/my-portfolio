// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About = () => {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-eyebrow">Professional Profile</span>
          <h2 className="section-heading">About My Engineering Journey</h2>
          <p className="section-subtext">
            Dedicated to crafting resilient, scalable, and responsive mobile experiences with modern software standards.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Story & Technical Philosophy */}
          <motion.div
            className="about-narrative-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-inner">
              <h3 className="narrative-heading">
                Building Cross-Platform Mobile Apps with Engineering Discipline
              </h3>

              {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="narrative-p">
                  {paragraph}
                </p>
              ))}

              <div className="engineering-pillars">
                <div className="pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <div>
                    <h4 className="pillar-title">Clean Architecture & MVVM</h4>
                    <p className="pillar-desc">Separation of UI, domain logic, and data repository layers.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-gauge-high"></i>
                  </div>
                  <div>
                    <h4 className="pillar-title">Frame-Rate Optimization</h4>
                    <p className="pillar-desc">Targeting 90fps rendering and zero UI stutter across devices.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-plug-circle-bolt"></i>
                  </div>
                  <div>
                    <h4 className="pillar-title">Reliable Real-Time APIs</h4>
                    <p className="pillar-desc">WebSockets, REST endpoints, Stripe, and Agora integration.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-cloud-arrow-up"></i>
                  </div>
                  <div>
                    <h4 className="pillar-title">App Store & Play Store QA</h4>
                    <p className="pillar-desc">Continuous deployment, APK size reductions, and release management.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics & Highlights */}
          <motion.div
            className="about-metrics-sidebar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="metrics-card-wrapper">
              <h4 className="metrics-card-title">Production Metrics</h4>
              <div className="metrics-items-grid">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div key={i} className="metric-box">
                    <span className="metric-val">{stat.value}</span>
                    <span className="metric-lbl">{stat.label}</span>
                    <span className="metric-hlp">{stat.helper}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Overview */}
            <div className="quick-info-box">
              <h4 className="quick-info-title">At a Glance</h4>
              <ul className="quick-info-list">
                <li>
                  <span className="info-label"><i className="fas fa-code"></i> Primary Stack:</span>
                  <span className="info-value">Flutter, Dart, Java</span>
                </li>
                <li>
                  <span className="info-label"><i className="fas fa-location-dot"></i> Base:</span>
                  <span className="info-value">Mohakhali, Dhaka, Bangladesh</span>
                </li>
                <li>
                  <span className="info-label"><i className="fas fa-briefcase"></i> Experience:</span>
                  <span className="info-value">Join Venture AI & Freelance Lead</span>
                </li>
                <li>
                  <span className="info-label"><i className="fas fa-graduation-cap"></i> Education:</span>
                  <span className="info-value">BSc in CSE (Expected 2028)</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
