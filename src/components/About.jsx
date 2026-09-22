// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About = () => {
  return (
    <section id="about" className="about-section about-compact-section section-padding-compact">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Engineering Profile</span>
          <h2 className="section-heading">About My Engineering Journey</h2>
          <p className="section-subtext">
            Production-focused Flutter engineering: Clean Architecture, 90fps UI fluidity, and store deployment.
          </p>
        </div>

        {/* Compact Glassmorphic Journey Card */}
        <motion.div
          className="about-compact-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
        >
          <div className="about-compact-grid">
            {/* Left: Engineering Discipline & Pillars */}
            <div className="about-compact-left">
              <div className="about-compact-summary">
                <p className="about-compact-lead">
                  Junior Software Engineer specializing in cross-platform mobile apps with published products on the Google Play Store &amp; Apple App Store.
                </p>
                <p className="about-compact-desc">
                  Driven by Clean Architecture, MVVM design, and frame-rate optimization. Experienced in managing WebSocket streams, Stripe payments, Agora streaming, and offline-first caching.
                </p>
              </div>

              {/* Compact 4 Pillars Grid */}
              <div className="compact-pillars-grid">
                <div className="compact-pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <div className="pillar-text">
                    <span className="pillar-title">Clean Architecture &amp; MVVM</span>
                    <span className="pillar-sub">Decoupled UI, domain logic, and data repository layers.</span>
                  </div>
                </div>

                <div className="compact-pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-gauge-high"></i>
                  </div>
                  <div className="pillar-text">
                    <span className="pillar-title">Frame-Rate Optimization</span>
                    <span className="pillar-sub">Targeting 90fps rendering and zero UI stutter across devices.</span>
                  </div>
                </div>

                <div className="compact-pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-plug-circle-bolt"></i>
                  </div>
                  <div className="pillar-text">
                    <span className="pillar-title">Real-Time APIs &amp; SDKs</span>
                    <span className="pillar-sub">WebSockets, REST endpoints, Stripe, and Agora integration.</span>
                  </div>
                </div>

                <div className="compact-pillar-item">
                  <div className="pillar-icon">
                    <i className="fas fa-cloud-arrow-up"></i>
                  </div>
                  <div className="pillar-text">
                    <span className="pillar-title">Store Deployment &amp; QA</span>
                    <span className="pillar-sub">CI/CD, APK binary reduction, and App Store / Play Store releases.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Metrics & Quick Specs */}
            <div className="about-compact-right">
              {/* Production Metrics */}
              <div className="compact-metrics-block">
                <span className="compact-block-label">Production Track Record</span>
                <div className="compact-metrics-grid">
                  {PERSONAL_INFO.stats.map((stat, i) => (
                    <div key={i} className="compact-metric-tile">
                      <span className="c-metric-val">{stat.value}</span>
                      <span className="c-metric-lbl">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Specs Strip */}
              <div className="compact-specs-box">
                <span className="compact-block-label">At a Glance</span>
                <ul className="compact-specs-list">
                  <li>
                    <i className="fas fa-code"></i>
                    <span><strong>Stack:</strong> Flutter, Dart, Java</span>
                  </li>
                  <li>
                    <i className="fas fa-location-dot"></i>
                    <span><strong>Base:</strong> Mohakhali, Dhaka, Bangladesh</span>
                  </li>
                  <li>
                    <i className="fas fa-briefcase"></i>
                    <span><strong>Role:</strong> Join Venture AI &amp; Freelance Lead</span>
                  </li>
                  <li>
                    <i className="fas fa-graduation-cap"></i>
                    <span><strong>Education:</strong> BSc in CSE (Expected 2028)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

