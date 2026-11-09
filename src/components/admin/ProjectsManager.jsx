// src/components/admin/ProjectsManager.jsx
import React, { useState } from 'react';
import { usePortfolio, IMAGE_PRESETS } from '../../context/PortfolioContext';

export const ProjectsManager = () => {
  const {
    portfolioState,
    addFeaturedProject,
    updateFeaturedProject,
    deleteFeaturedProject,
    reorderFeaturedProjects,
    moveToOtherProjects,
    addOtherProject,
    updateOtherProject,
    deleteOtherProject,
    reorderOtherProjects,
    promoteToFeatured
  } = usePortfolio();

  const { featuredProjects, otherProjects } = portfolioState;

  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'other'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null if creating new
  const [modalType, setModalType] = useState('featured'); // 'featured' | 'other'

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    badge: 'Live on Stores',
    category: 'live',
    tagline: '',
    image: IMAGE_PRESETS[0].src,
    rating: '4.8 ★',
    platform: 'iOS · Android',
    role: 'Lead Flutter Developer',
    problem: '',
    solution: '',
    description: '', // for other
    keyFeatures: [''],
    tech: ['Flutter', 'Clean Architecture'],
    links: [
      { label: 'Google Play', url: '', icon: 'fab fa-google-play', isBadgeOnly: false }
    ]
  });

  // Filtered lists
  const currentList = activeTab === 'featured' ? featuredProjects : otherProjects;
  const filteredList = currentList.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tagline || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tech || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = (type) => {
    setModalType(type);
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      name: '',
      badge: type === 'featured' ? 'Live on Stores' : 'Open Source',
      category: 'live',
      tagline: '',
      image: IMAGE_PRESETS[0].src,
      rating: '4.8 ★',
      platform: 'iOS · Android',
      role: 'Lead Flutter Developer',
      problem: '',
      solution: '',
      description: '',
      keyFeatures: ['Sub-second latency pipeline with zero jank', 'Clean Architecture with Provider'],
      tech: ['Flutter', 'Clean Architecture'],
      links: [
        { label: 'Google Play', url: 'https://play.google.com/store/apps', icon: 'fab fa-google-play', isBadgeOnly: false }
      ]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project, type) => {
    setModalType(type);
    setEditingProject(project);
    setFormData({
      id: project.id || `proj-${Date.now()}`,
      name: project.name || '',
      badge: project.badge || '',
      category: project.category || 'live',
      tagline: project.tagline || '',
      image: project.image || IMAGE_PRESETS[0].src,
      rating: project.rating || '',
      platform: project.platform || '',
      role: project.role || '',
      problem: project.problem || '',
      solution: project.solution || '',
      description: project.description || '',
      keyFeatures: project.keyFeatures && project.keyFeatures.length > 0 ? [...project.keyFeatures] : [''],
      tech: project.tech && project.tech.length > 0 ? [...project.tech] : ['Flutter'],
      links: project.links && project.links.length > 0 ? JSON.parse(JSON.stringify(project.links)) : []
    });
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (modalType === 'featured') {
      const cleanProject = {
        ...formData,
        keyFeatures: formData.keyFeatures.filter((f) => f.trim().length > 0),
        tech: formData.tech.filter((t) => t.trim().length > 0),
        links: formData.links.filter((l) => l.label.trim().length > 0)
      };
      if (editingProject) {
        updateFeaturedProject(editingProject.id, cleanProject);
      } else {
        addFeaturedProject(cleanProject);
      }
    } else {
      const cleanOther = {
        id: formData.id,
        name: formData.name,
        badge: formData.badge,
        category: formData.category,
        tagline: formData.tagline,
        description: formData.description || formData.problem || formData.tagline,
        tech: formData.tech.filter((t) => t.trim().length > 0),
        links: formData.links.filter((l) => l.label.trim().length > 0)
      };
      if (editingProject) {
        updateOtherProject(editingProject.id, cleanOther);
      } else {
        addOtherProject(cleanOther);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="admin-projects-section">
      {/* Top Controls */}
      <div className="admin-content-header">
        <div>
          <h2 className="admin-page-title">Projects Management</h2>
          <p className="admin-page-subtext">
            Control showcase cards, case studies, technologies, screenshots, and live store links.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => openAddModal(activeTab)}
          >
            <i className="fas fa-plus"></i>
            <span>Add New {activeTab === 'featured' ? 'Featured Project' : 'OSS Project'}</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className={`admin-btn-action ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
            style={activeTab === 'featured' ? { background: 'var(--flutter-blue)', color: '#fff', borderColor: 'var(--flutter-blue)' } : {}}
          >
            <i className="fas fa-star"></i>
            <span>Featured Applications ({featuredProjects.length})</span>
          </button>

          <button
            type="button"
            className={`admin-btn-action ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
            style={activeTab === 'other' ? { background: 'var(--flutter-blue)', color: '#fff', borderColor: 'var(--flutter-blue)' } : {}}
          >
            <i className="fas fa-code-branch"></i>
            <span>Additional &amp; OSS Projects ({otherProjects.length})</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flex: '1', maxWidth: '450px' }}>
          <div className="admin-input-wrapper" style={{ flex: 1 }}>
            <i className="fas fa-search admin-input-icon"></i>
            <input
              type="text"
              className="admin-input"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="admin-input"
            style={{ width: '130px', paddingLeft: '0.75rem' }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="live">Live / Store</option>
            <option value="client">Client</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="admin-entity-list">
        {filteredList.length === 0 ? (
          <div className="admin-panel-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <i className="fas fa-folder-open" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No projects match your filter</h3>
            <p className="admin-page-subtext">Click "Add New" above to create your first project card.</p>
          </div>
        ) : (
          filteredList.map((project, index) => {
            const isFeatured = activeTab === 'featured';
            return (
              <div key={project.id || index} className="admin-entity-card">
                <div className="admin-entity-main">
                  {isFeatured && project.image && (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="admin-entity-thumb"
                    />
                  )}

                  <div className="admin-entity-info">
                    <div className="admin-entity-title-row">
                      <span className="admin-entity-title">{project.name}</span>
                      <span className="admin-badge-tag">{project.badge || project.category}</span>
                      {project.rating && <span className="admin-tag-pill">{project.rating}</span>}
                      {project.platform && <span className="admin-tag-pill">{project.platform}</span>}
                    </div>

                    <p className="admin-entity-sub">
                      {project.tagline || project.description || 'No tagline provided'}
                    </p>

                    <div className="admin-entity-tags">
                      {(project.tech || []).slice(0, 5).map((t, i) => (
                        <span key={i} className="admin-tag-pill">{t}</span>
                      ))}
                      {(project.tech || []).length > 5 && (
                        <span className="admin-tag-pill">+{project.tech.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="admin-entity-actions">
                  {/* Reorder Buttons */}
                  <button
                    type="button"
                    className="admin-btn-icon"
                    title="Move Up"
                    disabled={index === 0}
                    onClick={() => {
                      if (isFeatured) reorderFeaturedProjects(index, index - 1);
                      else reorderOtherProjects(index, index - 1);
                    }}
                  >
                    <i className="fas fa-arrow-up"></i>
                  </button>

                  <button
                    type="button"
                    className="admin-btn-icon"
                    title="Move Down"
                    disabled={index === filteredList.length - 1}
                    onClick={() => {
                      if (isFeatured) reorderFeaturedProjects(index, index + 1);
                      else reorderOtherProjects(index, index + 1);
                    }}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </button>

                  {/* Transfer Button */}
                  {isFeatured ? (
                    <button
                      type="button"
                      className="admin-btn-icon"
                      title="Move to Additional/OSS Projects"
                      onClick={() => {
                        if (window.confirm(`Move "${project.name}" to Additional/OSS Projects?`)) {
                          moveToOtherProjects(project.id);
                        }
                      }}
                    >
                      <i className="fas fa-arrow-right-from-bracket"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="admin-btn-icon"
                      title="Promote to Featured Applications"
                      onClick={() => {
                        if (window.confirm(`Promote "${project.name}" to Featured Applications?`)) {
                          promoteToFeatured(project.id);
                        }
                      }}
                    >
                      <i className="fas fa-star"></i>
                    </button>
                  )}

                  {/* Edit Button */}
                  <button
                    type="button"
                    className="admin-btn-icon"
                    title="Edit Project"
                    onClick={() => openEditModal(project, activeTab)}
                  >
                    <i className="fas fa-pen-to-square"></i>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="admin-btn-icon delete"
                    title="Delete Project"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
                        if (isFeatured) deleteFeaturedProject(project.id);
                        else deleteOtherProject(project.id);
                      }
                    }}
                  >
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingProject ? `Edit ${formData.name}` : `Create New ${modalType === 'featured' ? 'Featured Application' : 'OSS Project'}`}
              </h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-body">
              {/* Basic Fields */}
              <div className="admin-form-grid-2">
                <div className="admin-input-group">
                  <label className="admin-label">Project Name *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. ScoreLivePro"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Identifier (Slug / ID)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g. scorelivepro"
                  />
                </div>
              </div>

              <div className="admin-form-grid-3">
                <div className="admin-input-group">
                  <label className="admin-label">Badge Tag</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Live on Stores"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Category Filter</label>
                  <select
                    className="admin-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="live">Live / Production</option>
                    <option value="client">Client Solution</option>
                    <option value="opensource">Open Source / Architecture</option>
                  </select>
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Rating / Pill Highlight</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    placeholder="e.g. 4.8 ★ or 90 FPS UI"
                  />
                </div>
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-input-group">
                  <label className="admin-label">Platform(s)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="e.g. iOS · Android"
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Your Role / Scope</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Lead Flutter Developer"
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Tagline (Punchy Subtitle) *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Sports Companion with 100+ WebSocket Events/Sec"
                />
              </div>

              {/* Image Manager for Featured Projects */}
              {modalType === 'featured' && (
                <div className="admin-image-selector">
                  <label className="admin-label" style={{ fontWeight: 700 }}>
                    <i className="fas fa-image"></i> 16:9 Showcase Screenshot
                  </label>

                  <div className="admin-image-preview-box">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="admin-image-preview-img"
                      />
                    ) : (
                      <span className="admin-page-subtext">No image chosen</span>
                    )}
                  </div>

                  <div>
                    <span className="admin-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                      Choose Preset Image:
                    </span>
                    <div className="admin-preset-chips">
                      {IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          className={`admin-preset-chip ${formData.image === preset.src ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, image: preset.src })}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="admin-form-grid-2" style={{ marginTop: '0.5rem' }}>
                    <div className="admin-input-group">
                      <label className="admin-label">Or Upload Local Image File:</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="admin-input"
                        onChange={handleImageFileUpload}
                      />
                    </div>

                    <div className="admin-input-group">
                      <label className="admin-label">Or Custom Image URL / Path:</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={typeof formData.image === 'string' && !formData.image.startsWith('data:') ? formData.image : ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Case Study Details */}
              {modalType === 'featured' ? (
                <>
                  <div className="admin-input-group">
                    <label className="admin-label">The Challenge / Problem</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      placeholder="e.g. Live match statistics require sub-second latency without draining battery..."
                    />
                  </div>

                  <div className="admin-input-group">
                    <label className="admin-label">Engineering Solution</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      placeholder="e.g. Engineered a Flutter app processing 100+ WebSocket events/sec..."
                    />
                  </div>

                  {/* Key Capabilities */}
                  <div className="admin-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="admin-label">Key Capabilities &amp; Engineering Feats</label>
                      <button
                        type="button"
                        className="admin-btn-action"
                        style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => setFormData({ ...formData, keyFeatures: [...formData.keyFeatures, ''] })}
                      >
                        <i className="fas fa-plus"></i> Add Bullet
                      </button>
                    </div>

                    <div className="admin-dynamic-list">
                      {formData.keyFeatures.map((feat, idx) => (
                        <div key={idx} className="admin-dynamic-item">
                          <input
                            type="text"
                            className="admin-input"
                            value={feat}
                            placeholder={`Key capability #${idx + 1}`}
                            onChange={(e) => {
                              const updated = [...formData.keyFeatures];
                              updated[idx] = e.target.value;
                              setFormData({ ...formData, keyFeatures: updated });
                            }}
                          />
                          <button
                            type="button"
                            className="admin-btn-icon delete"
                            onClick={() => {
                              const updated = formData.keyFeatures.filter((_, i) => i !== idx);
                              setFormData({ ...formData, keyFeatures: updated });
                            }}
                          >
                            <i className="fas fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="admin-input-group">
                  <label className="admin-label">Description *</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the architectural focus and delivery details..."
                  />
                </div>
              )}

              {/* Technologies */}
              <div className="admin-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-label">Technologies / Libraries (Tech Stack)</label>
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

              {/* Action Links */}
              <div className="admin-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-label">Action Links (Store, Repo, Web)</label>
                  <button
                    type="button"
                    className="admin-btn-action"
                    style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        links: [
                          ...formData.links,
                          { label: 'Website / Demo', url: '', icon: 'fas fa-arrow-up-right-from-square', isBadgeOnly: false }
                        ]
                      })
                    }
                  >
                    <i className="fas fa-plus"></i> Add Link
                  </button>
                </div>

                <div className="admin-dynamic-list">
                  {formData.links.map((link, idx) => (
                    <div key={idx} className="admin-dynamic-item" style={{ background: 'var(--bg-card)', padding: '0.5rem', borderRadius: '6px' }}>
                      <input
                        type="text"
                        className="admin-input"
                        style={{ width: '140px' }}
                        value={link.label}
                        placeholder="Label (e.g. Google Play)"
                        onChange={(e) => {
                          const updated = [...formData.links];
                          updated[idx].label = e.target.value;
                          setFormData({ ...formData, links: updated });
                        }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        style={{ flex: 1 }}
                        value={link.url}
                        placeholder="URL (https://... or #)"
                        onChange={(e) => {
                          const updated = [...formData.links];
                          updated[idx].url = e.target.value;
                          setFormData({ ...formData, links: updated });
                        }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        style={{ width: '130px' }}
                        value={link.icon}
                        placeholder="Icon (fas/fab...)"
                        onChange={(e) => {
                          const updated = [...formData.links];
                          updated[idx].icon = e.target.value;
                          setFormData({ ...formData, links: updated });
                        }}
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!link.isBadgeOnly}
                          onChange={(e) => {
                            const updated = [...formData.links];
                            updated[idx].isBadgeOnly = e.target.checked;
                            setFormData({ ...formData, links: updated });
                          }}
                        />
                        Badge Only
                      </label>
                      <button
                        type="button"
                        className="admin-btn-icon delete"
                        onClick={() => {
                          const updated = formData.links.filter((_, i) => i !== idx);
                          setFormData({ ...formData, links: updated });
                        }}
                      >
                        <i className="fas fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit / Cancel Footer */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-action"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  <i className="fas fa-check"></i>
                  <span>Save Project Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
