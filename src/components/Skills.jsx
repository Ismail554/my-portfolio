// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills = () => {
  return (
    <section id="skills" className="skills-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <span className="section-eyebrow">Technical Competencies</span>
          <h2 className="section-heading">Core Skills & Tooling</h2>
          <p className="section-subtext">
            Categorized technical stack focused on scalable architecture, native performance, and production release pipelines.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-category-grid">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              className="skill-category-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="skill-cat-header">
                <div className="skill-cat-icon">
                  <i className={category.icon}></i>
                </div>
                <div>
                  <h3 className="skill-cat-title">{category.title}</h3>
                  <p className="skill-cat-desc">{category.description}</p>
                </div>
              </div>

              <div className="skill-pills-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item-pill">
                    {skill.isDevicon ? (
                      <img
                        src={skill.icon}
                        alt=""
                        className="skill-icon-img"
                        loading="lazy"
                      />
                    ) : (
                      <i className={`${skill.icon} skill-icon-fa`}></i>
                    )}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Methodology Note */}
        <div className="engineering-approach-banner">
          <div className="approach-badge">
            <i className="fas fa-check-double"></i>
          </div>
          <div className="approach-content">
            <h4 className="approach-title">Production-First Quality Standard</h4>
            <p className="approach-text">
              Every mobile application is structured around strict Clean Architecture (UI &rarr; Controller/Bloc &rarr; Repository &rarr; Data Sources), ensuring decoupling from platform-specific APIs, high testability, and seamless code reviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
