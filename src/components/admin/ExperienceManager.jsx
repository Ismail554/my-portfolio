// src/components/admin/ExperienceManager.jsx
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceManager = () => {
  const {
    portfolioState,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences
  } = usePortfolio();

  const { experiences } = portfolioState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    type: 'Full-Time',
    highlights: [''],
    tech: ['Flutter', 'Clean Architecture']
  });

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({
      role: '',
      company: '',
      location: 'Dhaka, Bangladesh',
      period: 'Jan 2026 — Present',
      type: 'Full-Time',
      highlights: ['Architected scalable cross-platform Flutter application with Clean Architecture.'],
      tech: ['Flutter', 'Clean Architecture']
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp, index) => {
    setEditingIndex(index);
    setFormData({
      role: exp.role || '',
      company: exp.company || '',
      location: exp.location || '',
      period: exp.period || '',
      type: exp.type || 'Full-Time',
      highlights: exp.highlights && exp.highlights.length > 0 ? [...exp.highlights] : [''],
      tech: exp.tech && exp.tech.length > 0 ? [...exp.tech] : ['Flutter']
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.company.trim()) return;

    const cleaned = {
      ...formData,
      highlights: formData.highlights.filter((h) => h.trim().length > 0),
      tech: formData.tech.filter((t) => t.trim().length > 0)
    };

    if (editingIndex !== null) {
      updateExperience(editingIndex, cleaned);
    } else {
      addExperience(cleaned);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-experience-section">
      <div className="admin-content-header">
        <div>
          <h2 className="admin-page-title">Experience Timeline</h2>
          <p className="admin-page-subtext">
            Manage your engineering positions, team leadership roles, achievements, and technology tags.
          </p>
        </div>

        <button type="button" className="admin-btn-primary" onClick={openAddModal}>
          <i className="fas fa-plus"></i>
          <span>Add Position</span>
        </button>
      </div>

      <div className="admin-entity-list">
        {experiences.map((exp, index) => (
          <div key={index} className="admin-entity-card">
            <div className="admin-entity-main">
              <div className="admin-metric-icon indigo" style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}>
                <i className="fas fa-briefcase"></i>
              </div>

              <div className="admin-entity-info">
                <div className="admin-entity-title-row">
                  <span className="admin-entity-title">{exp.role}</span>
                  <span className="admin-badge-tag">{exp.type}</span>
                  <span className="admin-tag-pill">{exp.period}</span>
                </div>

                <p className="admin-entity-sub">
                  <i className="fas fa-building" style={{ marginRight: '4px' }}></i> {exp.company} • {exp.location}
                </p>

                <div className="admin-entity-tags">
                  {(exp.tech || []).map((t, i) => (
                    <span key={i} className="admin-tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-entity-actions">
              <button
                type="button"
                className="admin-btn-icon"
                title="Move Up"
                disabled={index === 0}
                onClick={() => reorderExperiences(index, index - 1)}
              >
                <i className="fas fa-arrow-up"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon"
                title="Move Down"
                disabled={index === experiences.length - 1}
                onClick={() => reorderExperiences(index, index + 1)}
              >
                <i className="fas fa-arrow-down"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon"
                title="Edit Experience"
                onClick={() => openEditModal(exp, index)}
              >
                <i className="fas fa-pen-to-square"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon delete"
                title="Delete Experience"
                onClick={() => {
                  if (window.confirm(`Delete "${exp.role} at ${exp.company}"?`)) {
                    deleteExperience(index);
                  }
                }}
              >
                <i className="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingIndex !== null ? 'Edit Professional Position' : 'Add New Position'}
              </h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-body">
              <div className="admin-form-grid-2">
                <div className="admin-input-group">
                  <label className="admin-label">Job Title / Role *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    placeholder="e.g. Lead Flutter Developer"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Company / Organization *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    placeholder="e.g. Join Venture AI"
                  />
                </div>
              </div>

              <div className="admin-form-grid-3">
                <div className="admin-input-group">
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh or Remote"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Period / Duration</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. Sep 2025 — Present"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Employment Type</label>
                  <select
                    className="admin-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Achievements / Highlights */}
              <div className="admin-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-label">Achievements &amp; Responsibilities</label>
                  <button
                    type="button"
                    className="admin-btn-action"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    onClick={() => setFormData({ ...formData, highlights: [...formData.highlights, ''] })}
                  >
                    <i className="fas fa-plus"></i> Add Highlight
                  </button>
                </div>

                <div className="admin-dynamic-list">
                  {formData.highlights.map((h, idx) => (
                    <div key={idx} className="admin-dynamic-item">
                      <input
                        type="text"
                        className="admin-input"
                        value={h}
                        placeholder={`Bullet #${idx + 1}`}
                        onChange={(e) => {
                          const updated = [...formData.highlights];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, highlights: updated });
                        }}
                      />
                      <button
                        type="button"
                        className="admin-btn-icon delete"
                        onClick={() => {
                          const updated = formData.highlights.filter((_, i) => i !== idx);
                          setFormData({ ...formData, highlights: updated });
                        }}
                      >
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="admin-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-label">Technologies Used</label>
                  <button
                    type="button"
                    className="admin-btn-action"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    onClick={() => setFormData({ ...formData, tech: [...formData.tech, ''] })}
                  >
                    <i className="fas fa-plus"></i> Add Tech Tag
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.tech.map((t, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ width: '130px', padding: '0.4rem 0.6rem' }}
                        value={t}
                        placeholder="Tag"
                        onChange={(e) => {
                          const updated = [...formData.tech];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, tech: updated });
                        }}
                      />
                      <button
                        type="button"
                        className="admin-btn-icon delete"
                        style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}
                        onClick={() => {
                          const updated = formData.tech.filter((_, i) => i !== idx);
                          setFormData({ ...formData, tech: updated });
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-action" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <i className="fas fa-check"></i>
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
