// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminLogin = ({ onBackToPortfolio }) => {
  const { login } = usePortfolio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(email, password, rememberMe);
      if (!result.success) {
        setErrorMsg(result.message || 'Invalid credentials');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-glow" aria-hidden="true"></div>
      <div className="admin-login-glow-2" aria-hidden="true"></div>

      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-badge">
            <i className="fas fa-shield-halved"></i>
            <span>Restricted Access</span>
          </div>
          <h1 className="admin-login-title">Portfolio CMS</h1>
          <p className="admin-login-desc">Sign in with admin credentials to manage portfolio content.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {errorMsg && (
            <div className="admin-login-error">
              <i className="fas fa-circle-exclamation"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="admin-input-group">
            <label className="admin-label" htmlFor="admin-email">Admin Email</label>
            <div className="admin-input-wrapper">
              <i className="fas fa-envelope admin-input-icon"></i>
              <input
                id="admin-email"
                type="email"
                className="admin-input"
                placeholder="mdismail.cse59@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label className="admin-label" htmlFor="admin-password">Password</label>
            <div className="admin-input-wrapper">
              <i className="fas fa-lock admin-input-icon"></i>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-toggle-pwd-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="admin-remember-row">
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember session</span>
            </label>
          </div>

          <button
            type="submit"
            className="admin-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <i className="fas fa-arrow-right-to-bracket"></i>
                <span>Enter Admin Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="admin-back-link">
          <button
            type="button"
            className="admin-back-btn"
            onClick={onBackToPortfolio}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Return to Public Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
