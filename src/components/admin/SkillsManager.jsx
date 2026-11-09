// src/components/admin/SkillsManager.jsx
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const COMMON_DEVICONS = [
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', isDevicon: true },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', isDevicon: true },
  { name: 'Android SDK', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', isDevicon: true },
  { name: 'Apple iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', isDevicon: true },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', isDevicon: true },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', isDevicon: true },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', isDevicon: true },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', isDevicon: true },
  { name: 'Xcode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg', isDevicon: true },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', isDevicon: true },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', isDevicon: true },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', isDevicon: true }
];

export const SkillsManager = () => {
  const {
    portfolioState,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    reorderSkillCategories
  } = usePortfolio();

  const { skillCategories } = portfolioState;

  // Category Modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catFormData, setCatFormData] = useState({ id: '', title: '', icon: 'fas fa-code' });

  // Skill Item Modal
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [targetCatId, setTargetCatId] = useState(null);
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [skillFormData, setSkillFormData] = useState({
    name: '',
    icon: 'fas fa-check',
    isDevicon: false
  });

  const openAddCategory = () => {
    setEditingCatId(null);
    setCatFormData({
      id: `cat-${Date.now()}`,
      title: '',
      icon: 'fas fa-code'
    });
    setIsCatModalOpen(true);
  };

  const openEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setCatFormData({
      id: cat.id,
      title: cat.title,
      icon: cat.icon || 'fas fa-code'
    });
    setIsCatModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catFormData.title.trim()) return;

    if (editingCatId) {
      updateSkillCategory(editingCatId, {
        title: catFormData.title,
        icon: catFormData.icon
      });
    } else {
      addSkillCategory({
        id: catFormData.id || `cat-${Date.now()}`,
        title: catFormData.title,
        icon: catFormData.icon,
        skills: []
      });
    }
    setIsCatModalOpen(false);
  };

  const openAddSkill = (catId) => {
    setTargetCatId(catId);
    setEditingSkillIndex(null);
    setSkillFormData({
      name: '',
      icon: 'fas fa-layer-group',
      isDevicon: false
    });
    setIsSkillModalOpen(true);
  };

  const openEditSkill = (catId, skill, index) => {
    setTargetCatId(catId);
    setEditingSkillIndex(index);
    setSkillFormData({
      name: skill.name || '',
      icon: skill.icon || '',
      isDevicon: !!skill.isDevicon
    });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!skillFormData.name.trim() || !targetCatId) return;

    const cat = skillCategories.find((c) => c.id === targetCatId);
    if (!cat) return;

    const updatedSkills = [...(cat.skills || [])];
    if (editingSkillIndex !== null) {
      updatedSkills[editingSkillIndex] = skillFormData;
    } else {
      updatedSkills.push(skillFormData);
    }

    updateSkillCategory(targetCatId, { skills: updatedSkills });
    setIsSkillModalOpen(false);
  };

  const handleDeleteSkill = (catId, index) => {
    const cat = skillCategories.find((c) => c.id === catId);
    if (!cat) return;
    const updatedSkills = cat.skills.filter((_, idx) => idx !== index);
    updateSkillCategory(catId, { skills: updatedSkills });
  };

  return (
    <div className="admin-skills-section">
      <div className="admin-content-header">
        <div>
          <h2 className="admin-page-title">Skills &amp; Competencies</h2>
          <p className="admin-page-subtext">
            Organize core capabilities into clean categories with official Devicon SVGs and FontAwesome icons.
          </p>
        </div>

        <button type="button" className="admin-btn-primary" onClick={openAddCategory}>
          <i className="fas fa-plus"></i>
          <span>Add Category</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {skillCategories.map((category, catIndex) => (
          <div key={category.id || catIndex} className="admin-panel-card">
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="admin-metric-icon emerald" style={{ width: '40px', height: '40px', fontSize: '1.1rem' }}>
                  <i className={category.icon}></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{category.title}</h3>
                  <span className="admin-page-subtext">{category.skills?.length || 0} skills configured</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  type="button"
                  className="admin-btn-action"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  onClick={() => openAddSkill(category.id)}
                >
                  <i className="fas fa-plus"></i> Add Skill
                </button>

                <button
                  type="button"
                  className="admin-btn-icon"
                  title="Move Category Up"
                  disabled={catIndex === 0}
                  onClick={() => reorderSkillCategories(catIndex, catIndex - 1)}
                >
                  <i className="fas fa-arrow-up"></i>
                </button>

                <button
                  type="button"
                  className="admin-btn-icon"
                  title="Move Category Down"
                  disabled={catIndex === skillCategories.length - 1}
                  onClick={() => reorderSkillCategories(catIndex, catIndex + 1)}
                >
                  <i className="fas fa-arrow-down"></i>
                </button>

                <button
                  type="button"
                  className="admin-btn-icon"
                  title="Edit Category Name & Icon"
                  onClick={() => openEditCategory(category)}
                >
                  <i className="fas fa-pen-to-square"></i>
                </button>

                <button
                  type="button"
                  className="admin-btn-icon delete"
                  title="Delete Category"
                  onClick={() => {
                    if (window.confirm(`Delete category "${category.title}" and all its skills?`)) {
                      deleteSkillCategory(category.id);
                    }
                  }}
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            </div>

            {/* Skills Pills in this Category */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {(category.skills || []).map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem'
                  }}
                >
                  {skill.isDevicon ? (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                    />
                  ) : (
                    <i className={skill.icon} style={{ color: 'var(--flutter-cyan)' }}></i>
                  )}
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{skill.name}</span>

                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 2px' }}
                    title="Edit Skill"
                    onClick={() => openEditSkill(category.id, skill, skillIndex)}
                  >
                    <i className="fas fa-pen" style={{ fontSize: '0.75rem' }}></i>
                  </button>

                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: '0 2px' }}
                    title="Delete Skill"
                    onClick={() => handleDeleteSkill(category.id, skillIndex)}
                  >
                    <i className="fas fa-times" style={{ fontSize: '0.75rem' }}></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsCatModalOpen(false)}>
          <div className="admin-modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editingCatId ? 'Edit Category' : 'New Skill Category'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsCatModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="admin-modal-body">
              <div className="admin-input-group">
                <label className="admin-label">Category Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={catFormData.title}
                  onChange={(e) => setCatFormData({ ...catFormData, title: e.target.value })}
                  required
                  placeholder="e.g. Mobile Development"
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Category Icon (FontAwesome class)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={catFormData.icon}
                  onChange={(e) => setCatFormData({ ...catFormData, icon: e.target.value })}
                  placeholder="e.g. fas fa-mobile-screen-button"
                />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-action" onClick={() => setIsCatModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn-primary">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Item Modal */}
      {isSkillModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsSkillModalOpen(false)}>
          <div className="admin-modal-container" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editingSkillIndex !== null ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsSkillModalOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="admin-modal-body">
              <div className="admin-input-group">
                <label className="admin-label">Skill / Technology Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={skillFormData.name}
                  onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                  required
                  placeholder="e.g. Flutter or Clean Architecture"
                />
              </div>

              {/* Devicon Presets */}
              <div className="admin-input-group">
                <label className="admin-label">Quick Pick from Common Tech Icons:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {COMMON_DEVICONS.map((d, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="admin-preset-chip"
                      onClick={() => setSkillFormData({ name: skillFormData.name || d.name, icon: d.icon, isDevicon: true })}
                    >
                      <img src={d.icon} alt="" style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Icon Class or Devicon SVG URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={skillFormData.icon}
                  onChange={(e) => setSkillFormData({ ...skillFormData, icon: e.target.value })}
                  placeholder="fas fa-layer-group or https://cdn.jsdelivr..."
                />
              </div>

              <div className="admin-remember-row">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={skillFormData.isDevicon}
                    onChange={(e) => setSkillFormData({ ...skillFormData, isDevicon: e.target.checked })}
                  />
                  <span>Is Devicon SVG Image (Check if using external URL)</span>
                </label>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-action" onClick={() => setIsSkillModalOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn-primary">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
