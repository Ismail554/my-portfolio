// src/components/GithubStreak.jsx
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GithubStreak = () => {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState({
    total: 1702,
    currentStreak: 2,
    longestStreak: 55
  });
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    // Fetch live GitHub contributions for Ismail554
    fetch('https://github-contributions-api.jogruber.de/v4/Ismail554?y=last')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.contributions && json.contributions.length > 0) {
          setData(json.contributions);

          // Calculate streaks
          const days = json.contributions;
          let longest = 0;
          let temp = 0;
          days.forEach((d) => {
            if (d.count > 0) {
              temp++;
              if (temp > longest) longest = temp;
            } else {
              temp = 0;
            }
          });

          let current = 0;
          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].count > 0) {
              current++;
            } else {
              if (i === days.length - 1) continue;
              break;
            }
          }

          setStats({
            total: json.total?.lastYear || 1702,
            currentStreak: current,
            longestStreak: longest
          });
        }
      })
      .catch(() => {
        // Fallback default state
      });
  }, []);

  // Generate 52 weeks x 7 days grid
  const renderGrid = () => {
    const days = data || generateFallbackDays();
    // Group into weeks of 7 days
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="streak-calendar-grid">
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="streak-calendar-col">
            {week.map((day, dIdx) => (
              <div
                key={dIdx}
                className={`streak-tile level-${day.level || (day.count > 4 ? 4 : day.count > 2 ? 3 : day.count > 0 ? 1 : 0)}`}
                onMouseEnter={() =>
                  setActiveTooltip(`${day.count || 0} contributions on ${day.date}`)
                }
                onMouseLeave={() => setActiveTooltip(null)}
                title={`${day.count || 0} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Fallback 365 days generator if network is delayed
  const generateFallbackDays = () => {
    const arr = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const rand = Math.random();
      const level = rand > 0.4 ? (rand > 0.85 ? 4 : rand > 0.7 ? 3 : rand > 0.5 ? 2 : 1) : 0;
      arr.push({
        date: d.toISOString().split('T')[0],
        count: level * 2,
        level: level
      });
    }
    return arr;
  };

  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

  return (
    <section className="streak-section section-padding-sm">
      <div className="container">
        <div className="streak-widget-card">
          {/* Top 4 Social Cards (Matching Reference Screenshot) */}
          <div className="social-links-quad-grid">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-quad-item"
            >
              <div className="social-quad-icon icon-github">
                <i className="fab fa-github"></i>
              </div>
              <div className="social-quad-info">
                <span className="social-quad-title">GitHub</span>
                <span className="social-quad-handle">@Ismail554</span>
              </div>
              <i className="fas fa-arrow-up-right social-quad-arrow"></i>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-quad-item"
            >
              <div className="social-quad-icon icon-linkedin">
                <i className="fab fa-linkedin-in"></i>
              </div>
              <div className="social-quad-info">
                <span className="social-quad-title">LinkedIn</span>
                <span className="social-quad-handle">@ismail554</span>
              </div>
              <i className="fas fa-arrow-up-right social-quad-arrow"></i>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="social-quad-item"
            >
              <div className="social-quad-icon icon-email">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="social-quad-info">
                <span className="social-quad-title">Email</span>
                <span className="social-quad-handle">mdismail.cse59@gmail.com</span>
              </div>
              <i className="fas fa-arrow-up-right social-quad-arrow"></i>
            </a>

            <a
              href={PERSONAL_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="social-quad-item"
            >
              <div className="social-quad-icon icon-whatsapp">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="social-quad-info">
                <span className="social-quad-title">WhatsApp / Phone</span>
                <span className="social-quad-handle">+880 1619-524736</span>
              </div>
              <i className="fas fa-arrow-up-right social-quad-arrow"></i>
            </a>
          </div>

          {/* GitHub Daily Streak & Contribution Heatmap */}
          <div className="streak-heatmap-container">
            {/* Streak Metrics Bar */}
            <div className="streak-meta-bar">
              <div className="streak-stat-badge">
                <span className="streak-stat-num">{stats.total.toLocaleString()}</span>
                <span className="streak-stat-lbl">Contributions (Past Year)</span>
              </div>
              <div className="streak-stat-badge">
                <span className="streak-stat-num">{stats.longestStreak} Days</span>
                <span className="streak-stat-lbl">Longest Streak</span>
              </div>
              <div className="streak-stat-badge">
                <span className="streak-stat-num">{stats.currentStreak} Days</span>
                <span className="streak-stat-lbl">Active Daily Streak</span>
              </div>
            </div>

            {/* Synchronized Contribution Grid & Months for Mobile Touch Scroll */}
            <div className="streak-scroll-wrapper">
              <div className="streak-scroll-inner">
                <div className="streak-months-header">
                  {months.map((m, idx) => (
                    <span key={idx} className="month-label">{m}</span>
                  ))}
                </div>
                {renderGrid()}
              </div>
            </div>

            {/* Tooltip on hover */}
            {activeTooltip && (
              <div className="streak-active-tooltip">{activeTooltip}</div>
            )}

            {/* Footer Bar */}
            <div className="streak-footer-bar">
              <span className="streak-count-text">
                {stats.total.toLocaleString()} contributions in the last year on{' '}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-text-link"
                >
                  GitHub
                </a>
                .
              </span>

              <div className="streak-legend">
                <span className="legend-label">Less</span>
                <span className="legend-tile level-0"></span>
                <span className="legend-tile level-1"></span>
                <span className="legend-tile level-2"></span>
                <span className="legend-tile level-3"></span>
                <span className="legend-tile level-4"></span>
                <span className="legend-label">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
