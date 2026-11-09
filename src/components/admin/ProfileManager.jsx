// src/components/admin/ProfileManager.jsx
import React, { useState } from 'react';
import { usePortfolio, IMAGE_PRESETS } from '../../context/PortfolioContext';

export const ProfileManager = () => {
  const { portfolioState, updatePersonalInfo } = usePortfolio();
  const { personalInfo } = portfolioState;

  const [formData, setFormData] = useState({
    name: personalInfo.name || '',
    shortName: personalInfo.shortName || '',
    role: personalInfo.role || '',
    tagline: personalInfo.tagline || '',
    location: personalInfo.location || '',
    phone: personalInfo.phone || '',
    email: personalInfo.email || '',
    whatsapp: personalInfo.whatsapp || '',
    linkedin: personalInfo.linkedin || '',
    github: personalInfo.github || '',
    portfolioUrl: personalInfo.portfolioUrl || '',
    profilePhoto: personalInfo.profilePhoto || IMAGE_PRESETS[4].src,
    bioParagraphs: personalInfo.bioParagraphs && personalInfo.bioParagraphs.length > 0
      ? [...personalInfo.bioParagraphs]
      : ['', ''],
    stats: personalInfo.stats && personalInfo.stats.length > 0
      ? JSON.parse(JSON.stringify(personalInfo.stats))
      : [
          { value: '6+', label: 'Shipped Apps', helper: 'App Store & Google Play' },
          { value: '99.5%', label: 'Crash-Free', helper: 'Production Reliability' },
          { value: '90 FPS', label: 'UI Fluidity', helper: 'Zero Jank Target' },
          { value: '2,000+', label: 'Store Users', helper: 'Active Audience' }
        ]
  });

  const [isSaved, setIsSaved] = useState(false);

  const handlePortraitUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="admin-profile-section">
      <div className="admin-content-header">
        <div>
          <h2 className="admin-page-title">Profile &amp; Personal Identity</h2>
          <p className="admin-page-subtext">
            Configure identity names, role descriptions, contact channels, bio narratives, and showcase metrics.
          </p>
        </div>

        <button type="button" className="admin-btn-primary" onClick={handleSave}>
          <i className="fas fa-floppy-disk"></i>
          <span>{isSaved ? 'Changes Saved!' : 'Save Profile'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Core Identity */}
        <div className="admin-panel-card">
          <h3 className="admin-panel-title">
            <i className="fas fa-id-card"></i>
            <span>Basic Identity &amp; Titles</span>
          </h3>

          <div className="admin-form-grid-3">
            <div className="admin-input-group">
              <label className="admin-label">Full Name *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Short Name / Monogram</label>
              <input
                type="text"
                className="admin-input"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Location / Base</label>
              <input
                type="text"
                className="admin-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-grid-2" style={{ marginTop: '1rem' }}>
            <div className="admin-input-group">
              <label className="admin-label">Professional Role Headline *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Hero / Header Tagline *</label>
              <input
                type="text"
                className="admin-input"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Portrait & Media */}
        <div className="admin-panel-card">
          <h3 className="admin-panel-title">
            <i className="fas fa-camera"></i>
            <span>Profile Portrait Photo</span>
          </h3>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--flutter-cyan)',
                flexShrink: 0
              }}
            >
              <img
                src={formData.profilePhoto}
                alt="Portrait"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div className="admin-input-group">
                <label className="admin-label">Upload New Portrait Image File:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="admin-input"
                  onChange={handlePortraitUpload}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Or Custom Image URL / Path:</label>
                <input
                  type="text"
                  className="admin-input"
                  value={typeof formData.profilePhoto === 'string' && !formData.profilePhoto.startsWith('data:') ? formData.profilePhoto : ''}
                  onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                  placeholder="https://... or /assets/images/..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="admin-panel-card">
          <h3 className="admin-panel-title">
            <i className="fas fa-share-nodes"></i>
            <span>Communication &amp; Social Channels</span>
          </h3>

          <div className="admin-form-grid-3">
            <div className="admin-input-group">
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                className="admin-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Phone / WhatsApp</label>
              <input
                type="text"
                className="admin-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">WhatsApp Direct Link</label>
              <input
                type="text"
                className="admin-input"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-grid-3" style={{ marginTop: '1rem' }}>
            <div className="admin-input-group">
              <label className="admin-label">GitHub URL</label>
              <input
                type="text"
                className="admin-input"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">LinkedIn URL</label>
              <input
                type="text"
                className="admin-input"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>

            <div className="admin-input-group">
              <label className="admin-label">Live Portfolio URL</label>
              <input
                type="text"
                className="admin-input"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Bio Paragraphs */}
        <div className="admin-panel-card">
          <h3 className="admin-panel-title">
            <i className="fas fa-book-open"></i>
            <span>About Bio Paragraphs</span>
          </h3>

          <div className="admin-input-group" style={{ marginBottom: '1rem' }}>
            <label className="admin-label">Lead Narrative Paragraph 1</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={formData.bioParagraphs[0] || ''}
              onChange={(e) => {
                const updated = [...formData.bioParagraphs];
                updated[0] = e.target.value;
                setFormData({ ...formData, bioParagraphs: updated });
              }}
            />
          </div>

          <div className="admin-input-group">
            <label className="admin-label">Lead Narrative Paragraph 2</label>
            <textarea
              rows={3}
              className="admin-textarea"
              value={formData.bioParagraphs[1] || ''}
              onChange={(e) => {
                const updated = [...formData.bioParagraphs];
                updated[1] = e.target.value;
                setFormData({ ...formData, bioParagraphs: updated });
              }}
            />
          </div>
        </div>

        {/* Production Metrics (Stats) */}
        <div className="admin-panel-card">
          <h3 className="admin-panel-title">
            <i className="fas fa-gauge-high"></i>
            <span>Production Track Record Stats</span>
          </h3>

          <div className="admin-switches-grid">
            {formData.stats.map((stat, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div className="admin-input-group" style={{ marginBottom: '0.5rem' }}>
                  <label className="admin-label">Value (e.g. 6+, 90 FPS)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...formData.stats];
                      updated[idx].value = e.target.value;
                      setFormData({ ...formData, stats: updated });
                    }}
                  />
                </div>

                <div className="admin-input-group" style={{ marginBottom: '0.5rem' }}>
                  <label className="admin-label">Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...formData.stats];
                      updated[idx].label = e.target.value;
                      setFormData({ ...formData, stats: updated });
                    }}
                  />
                </div>

                <div className="admin-input-group">
                  <label className="admin-label">Helper Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.helper}
                    onChange={(e) => {
                      const updated = [...formData.stats];
                      updated[idx].helper = e.target.value;
                      setFormData({ ...formData, stats: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button type="submit" className="admin-btn-primary" style={{ padding: '0.85rem 2rem' }}>
            <i className="fas fa-check"></i>
            <span>{isSaved ? 'Changes Saved!' : 'Save All Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
