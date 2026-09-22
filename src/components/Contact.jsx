// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { EMAIL_CONFIG } from '../config/emailConfig';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setStatusMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setFormStatus('submitting');
    setStatusMessage('Sending your message...');

    // If the user hasn't replaced the placeholder key yet, fallback to mailto or inform them cleanly
    const isConfigured = EMAIL_CONFIG.WEB3FORMS_ACCESS_KEY && EMAIL_CONFIG.WEB3FORMS_ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE';

    if (!isConfigured) {
      // Simulate submission or provide instant mailto link
      setTimeout(() => {
        const mailtoUrl = `mailto:${EMAIL_CONFIG.RECIPIENT_EMAIL}?subject=${encodeURIComponent(
          formData.subject || 'Portfolio Inquiry from ' + formData.name
        )}&body=${encodeURIComponent(
          `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;

        setFormStatus('success');
        setStatusMessage(
          'Email client opened! (To enable direct in-browser sending without opening an email client, add your free Web3Forms key in src/config/emailConfig.js).'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 600);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: EMAIL_CONFIG.WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: 'Ismail Portfolio Contact Form'
        })
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setStatusMessage('Thank you! Your message has been sent directly to my inbox. I will reply shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setFormStatus('error');
      setStatusMessage('Failed to deliver message directly. Please click below to send via your email client.');
    }
  };

  const openDirectMailto = () => {
    const subject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="contact-section section-padding-compact">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block compact-header">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-heading">Let's Connect</h2>
          <p className="section-subtext">
            Available for full-time Flutter engineer roles, contracts, and architecture consulting.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Communication Channels */}
          <motion.div
            className="contact-info-column"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-card primary-contact-card">
              <h3 className="contact-card-title">Direct Channels</h3>
              <p className="contact-card-sub">
                Available for full-time Flutter / Mobile Engineer positions, freelance contracts, and team leadership.
              </p>

              <div className="contact-channels-list">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="channel-item">
                  <div className="channel-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Email</span>
                    <span className="channel-value">{PERSONAL_INFO.email}</span>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square channel-ext"></i>
                </a>

                <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="channel-item">
                  <div className="channel-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">WhatsApp / Phone</span>
                    <span className="channel-value">{PERSONAL_INFO.phone}</span>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square channel-ext"></i>
                </a>

                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="channel-item">
                  <div className="channel-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">LinkedIn</span>
                    <span className="channel-value">linkedin.com/in/ismail554</span>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square channel-ext"></i>
                </a>

                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="channel-item">
                  <div className="channel-icon">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">GitHub</span>
                    <span className="channel-value">github.com/Ismail554</span>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square channel-ext"></i>
                </a>

                <div className="channel-item static-item">
                  <div className="channel-icon">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Location</span>
                    <span className="channel-value">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              <div className="response-time-notice">
                <i className="fas fa-clock"></i>
                <span>Typical response time: Within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-form-card">
              <h3 className="form-card-title">Send a Direct Message</h3>
              <p className="form-card-desc">
                Fill out the form below to initiate contact directly.
              </p>

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Flutter Mobile App / Engineering Role"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project goals, timelines, or role details..."
                    required
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Status Message Display */}
                {formStatus !== 'idle' && (
                  <div className={`form-status-alert status-${formStatus}`}>
                    <i
                      className={`fas ${
                        formStatus === 'submitting'
                          ? 'fa-spinner fa-spin'
                          : formStatus === 'success'
                          ? 'fa-circle-check'
                          : 'fa-circle-exclamation'
                      }`}
                    ></i>
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div className="form-button-row">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="btn btn-primary btn-submit"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={openDirectMailto}
                    className="btn btn-outline btn-mailto-alt"
                    title="Open your device's default email client"
                  >
                    <i className="fas fa-envelope-open-text"></i>
                    <span>Open Email Client</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
