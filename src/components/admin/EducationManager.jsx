// src/components/admin/EducationManager.jsx
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const EducationManager = () => {
  const {
    portfolioState,
    addEducation,
    updateEducation,
    deleteEducation,
    reorderEducation,
    updatePersonalInfo
  } = usePortfolio();

  const { education, personalInfo } = portfolioState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    period: '',
    note: '',
    status: 'In Progress'
  });

  const [resumePdfUrl, setResumePdfUrl] = useState(personalInfo.resumePdf || '/resume/ismail-resume.pdf');
  const [resumeSaved, setResumeSaved] = useState(false);

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({
      degree: '',
      institution: '',
      location: 'Dhaka, Bangladesh',
      period: '2026 — Present',
      note: 'Expected 2029',
      status: 'In Progress'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu, index) => {
    setEditingIndex(index);
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      location: edu.location || '',
      period: edu.period || '',
      note: edu.note || '',
      status: edu.status || 'In Progress'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.degree.trim() || !formData.institution.trim()) return;

    if (editingIndex !== null) {
      updateEducation(editingIndex, formData);
    } else {
      addEducation(formData);
    }
    setIsModalOpen(false);
  };

  const handleSaveResumeUrl = (e) => {
    e.preventDefault();
    updatePersonalInfo({ resumePdf: resumePdfUrl });
    setResumeSaved(true);
    setTimeout(() => setResumeSaved(false), 2500);
  };

  return (
    <div className="admin-education-section">
      <div className="admin-content-header">
        <div>
          <h2 className="admin-page-title">Education &amp; Resume Credentials</h2>
          <p className="admin-page-subtext">
            Manage academic degrees, certifications, CGPA milestones, and resume document paths.
          </p>
        </div>

        <button type="button" className="admin-btn-primary" onClick={openAddModal}>
          <i className="fas fa-plus"></i>
          <span>Add Academic Degree</span>
        </button>
      </div>

      {/* Resume File Settings Card */}
      <div className="admin-panel-card" style={{ marginBottom: '2rem' }}>
        <h3 className="admin-panel-title">
          <i className="fas fa-file-pdf" style={{ color: '#ef4444' }}></i>
          <span>Resume Document Configuration</span>
        </h3>
        <p className="admin-panel-desc">
          Set the PDF file path or external cloud link used for the resume download buttons and preview window across the site.
        </p>

        <form onSubmit={handleSaveResumeUrl} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="admin-input-wrapper" style={{ flex: 1, minWidth: '280px' }}>
            <i className="fas fa-link admin-input-icon"></i>
            <input
              type="text"
              className="admin-input"
              value={resumePdfUrl}
              onChange={(e) => setResumePdfUrl(e.target.value)}
              placeholder="/resume/ismail-resume.pdf or https://drive.google.com/..."
              required
            />
          </div>

          <button type="submit" className="admin-btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
            <i className="fas fa-floppy-disk"></i>
            <span>{resumeSaved ? 'Saved!' : 'Save Resume Path'}</span>
          </button>

          <a
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-action"
            style={{ padding: '0.75rem 1rem' }}
          >
            <i className="fas fa-up-right-from-square"></i>
            <span>Test PDF Link</span>
          </a>
        </form>
      </div>

      {/* Academic Qualifications List */}
      <div className="admin-entity-list">
        {education.map((edu, index) => (
          <div key={index} className="admin-entity-card">
            <div className="admin-entity-main">
              <div className="admin-metric-icon amber" style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}>
                <i className="fas fa-graduation-cap"></i>
              </div>

              <div className="admin-entity-info">
                <div className="admin-entity-title-row">
                  <span className="admin-entity-title">{edu.degree}</span>
                  <span className="admin-badge-tag">{edu.status}</span>
                  <span className="admin-tag-pill">{edu.period}</span>
                </div>

                <p className="admin-entity-sub">
                  <i className="fas fa-building-columns" style={{ marginRight: '4px' }}></i> {edu.institution} • {edu.location}
                </p>

                {edu.note && (
                  <div className="admin-entity-tags">
                    <span className="admin-tag-pill" style={{ color: 'var(--flutter-cyan)' }}>
                      <i className="fas fa-award" style={{ marginRight: '3px' }}></i> {edu.note}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="admin-entity-actions">
              <button
                type="button"
                className="admin-btn-icon"
                title="Move Up"
                disabled={index === 0}
                onClick={() => reorderEducation(index, index - 1)}
              >
                <i className="fas fa-arrow-up"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon"
                title="Move Down"
                disabled={index === education.length - 1}
                onClick={() => reorderEducation(index, index + 1)}
              >
                <i className="fas fa-arrow-down"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon"
                title="Edit Degree"
                onClick={() => openEditModal(edu, index)}
              >
                <i className="fas fa-pen-to-square"></i>
              </button>

              <button
                type="button"
                className="admin-btn-icon delete"
                title="Delete Degree"
                onClick={() => {
                  if (window.confirm(`Delete "${edu.degree}"?`)) {
                    deleteEducation(index);
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
                {editingIndex !== null ? 'Edit Academic Degree' : 'Add Academic Qualification'}
              </h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-body">
              <div className="admin-input-group">
                <label className="admin-label">Degree / Certificate Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                  placeholder="e.g. BSc in Computer Science and Engineering"
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Institution / University *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  placeholder="e.g. Canadian University of Bangladesh"
                />
              </div>

              <div className="admin-form-grid-3">
                <div className="admin-input-group">
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Dhaka, Bangladesh"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Period</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="2025 — Present"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Status</label>
                  <select
                    className="admin-input"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Distinction">Distinction</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Note / Honors / CGPA</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="e.g. CGPA: 3.56 / 4.00 or Expected 2028"
                />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-action" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <i className="fas fa-check"></i>
                  <span>Save Degree</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
