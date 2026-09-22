// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills = () => {
  return (
    <section id="skills" className="skills-section section-padding-compact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Technical Competencies</span>
          <h2 className="section-heading">Core Skills &amp; Tooling</h2>
          <p className="section-subtext">
            Categorized technical stack focused on scalable architecture, native performance, and tooling.
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
      </div>
    </section>
  );
};
