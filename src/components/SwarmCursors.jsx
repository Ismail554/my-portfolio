// src/components/SwarmCursors.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './SwarmCursors.css';

// 8 Multiplayer Swarm Cursors (DhvanilPatel/swarm-cursors tribute squad)
const SWARM_ROSTER = [
  { id: 'c1', name: '@Ismail_Lead', color: '#38bdf8', fill: 'rgba(56, 189, 248, 0.12)' },
  { id: 'c2', name: '@Flutter_Engine', color: '#6366f1', fill: 'rgba(99, 102, 241, 0.12)' },
  { id: 'c3', name: '@Clean_Arch', color: '#10b981', fill: 'rgba(16, 185, 129, 0.12)' },
  { id: 'c4', name: '@Skia_90FPS', color: '#f59e0b', fill: 'rgba(245, 158, 11, 0.12)' },
  { id: 'c5', name: '@Dart_Compiler', color: '#ec4899', fill: 'rgba(236, 72, 153, 0.12)' },
  { id: 'c6', name: '@Figma_Systems', color: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.12)' },
  { id: 'c7', name: '@WebSocket_Sync', color: '#14b8a6', fill: 'rgba(20, 184, 166, 0.12)' },
  { id: 'c8', name: '@Store_Release', color: '#f43f5e', fill: 'rgba(244, 63, 94, 0.12)' }
];

// Pentatonic notes for crystal-clean glass marimba chime sounds
const PENTATONIC_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];

class SwarmAudioEngine {
  constructor() {
    this.ctx = null;
    this.noteIdx = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // Ignored if AudioContext is not allowed
    }
  }

  playKeyClick(enabled) {
    if (!enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700 + Math.random() * 250, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.022);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch {}
  }

  playSnapNote(enabled) {
    if (!enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freq = PENTATONIC_NOTES[this.noteIdx % PENTATONIC_NOTES.length];
      this.noteIdx++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  playCompletionChord(enabled) {
    if (!enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const chord = [261.63, 329.63, 392.0, 523.25, 659.25];
      chord.forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      });
    } catch {}
  }
}

const audioEngine = new SwarmAudioEngine();

export const SwarmCursors = () => {
  const { siteSettings } = usePortfolio();
  const swarmConfig = siteSettings?.swarm || {
    enabled: true,
    autoPlay: false,
    autoPlayFrequency: 'session',
    soundEnabled: true,
    defaultSpeed: 2
  };

  const isMasterEnabled = swarmConfig.enabled !== false;

  const [isRebuilding, setIsRebuilding] = useState(false);
  const [hudProgress, setHudProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(swarmConfig.defaultSpeed || 2);
  const [soundOn, setSoundOn] = useState(swarmConfig.soundEnabled !== false);
  const [tourMode, setTourMode] = useState(true);

  // Direct DOM Refs (Avoids React reconciliation re-renders on animation frames)
  const agentDomRefs = useRef([]);
  const activeBoxRef = useRef(null);
  const activeBoxPillRef = useRef(null);
  const activeTypingRef = useRef(null);
  const activeTypingTextRef = useRef(null);
  const hudProgressFillRef = useRef(null);
  const rafRef = useRef(null);
  const highlightedElementsRef = useRef([]);

  // Animation parameters
  const speedRef = useRef(speedMultiplier);
  const soundRef = useRef(soundOn);
  const tourRef = useRef(tourMode);
  const mousePosRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    tourRef.current = tourMode;
  }, [tourMode]);

  // Track mouse position for natural repulsion
  useEffect(() => {
    const onMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Clean finish / reset
  const finishSwarmRebuild = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Remove any highlight classes from elements
    highlightedElementsRef.current.forEach((el) => {
      if (el) el.classList.remove('swarm-section-inspected');
    });
    highlightedElementsRef.current = [];

    // Hide cursors & overlays cleanly
    agentDomRefs.current.forEach((el) => {
      if (el) el.style.display = 'none';
    });
    if (activeBoxRef.current) activeBoxRef.current.style.display = 'none';
    if (activeTypingRef.current) activeTypingRef.current.style.display = 'none';

    setIsRebuilding(false);
    setHudProgress(100);
  }, []);

  // Start smooth, flicker-free Swarm inspection and rebuild
  const startSwarmRebuild = useCallback(() => {
    if (!isMasterEnabled) return;
    finishSwarmRebuild();

    // Key portfolio sections to inspect and validate in sequence
    const targets = [
      { selector: '#hero', title: 'Hero & Availability', feat: 'MD Ismail Hosen • Flutter Developer' },
      { selector: '.hero-portrait-stage', title: 'Engineer Spotlight', feat: 'Clean Architecture • 90 FPS Fluidity' },
      { selector: '.spotlight-code-card', title: 'Dart Architecture Spec', feat: 'CleanArchitecture.dart • Zero Jank' },
      { selector: '.streak-widget-card', title: 'GitHub Daily Streak', feat: 'Live Contributions & Active Streak' },
      { selector: '#projects', title: 'Featured Applications', feat: 'ScoreLivePro, HireNearby, SPARTs' },
      { selector: '#experience', title: 'Work & Leadership', feat: 'Join Venture AI & Squad Leadership' },
      { selector: '#skills', title: 'Technical Competencies', feat: 'Mobile, Backend, Architecture & DevOps' },
      { selector: '#resume', title: 'Resume & Academic Hub', feat: 'BSc in CSE & Verified Credentials' },
      { selector: '#about', title: 'Engineering Profile', feat: '4 Pillars of Engineering Excellence' },
      { selector: '#contact', title: 'Direct Channels', feat: 'Interactive Contact & Booking' }
    ];

    const scrollY = window.scrollY;
    const blueprintQueue = [];

    targets.forEach((t) => {
      const el = document.querySelector(t.selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 20 && rect.height > 20) {
          blueprintQueue.push({
            el,
            title: t.title,
            feat: t.feat,
            docTop: rect.top + scrollY,
            rect
          });
        }
      }
    });

    if (blueprintQueue.length === 0) return;

    // Reset agents around the viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const agents = SWARM_ROSTER.map((roster, idx) => {
      const angle = (idx / SWARM_ROSTER.length) * Math.PI * 2;
      return {
        ...roster,
        x: vw / 2 + Math.cos(angle) * (vw * 0.4),
        y: vh / 2 + Math.sin(angle) * (vh * 0.35),
        tx: vw / 2,
        ty: vh / 2,
        state: 'idle',
        task: null,
        taskProgress: 0,
        badgeText: 'Inspecting'
      };
    });

    // Make cursors visible
    agents.forEach((_, idx) => {
      if (agentDomRefs.current[idx]) {
        agentDomRefs.current[idx].style.display = 'block';
      }
    });

    setIsRebuilding(true);
    setHudProgress(0);

    const totalTasks = blueprintQueue.length;
    let completedCount = 0;
    let lastTime = performance.now();
    let lastKeySoundTime = 0;

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const mult = speedRef.current || 2;

      // Assign tasks to idle agents
      agents.forEach((agent) => {
        if (agent.state === 'idle' && blueprintQueue.length > 0) {
          const nextTask = blueprintQueue.shift();
          agent.task = nextTask;
          agent.state = 'moving';
          agent.taskProgress = 0;
          agent.badgeText = nextTask.title;
        }
      });

      // Smooth Tour Auto-Scroll (Glides gracefully with zero jumping)
      if (tourRef.current) {
        const workingTask = agents.find((a) => a.task)?.task;
        if (workingTask) {
          const rect = workingTask.el.getBoundingClientRect();
          const targetScrollY = Math.max(0, window.scrollY + rect.top - window.innerHeight * 0.28);
          const currentScroll = window.scrollY;
          const diff = targetScrollY - currentScroll;
          if (Math.abs(diff) > 4) {
            window.scrollTo({
              top: currentScroll + diff * Math.min(1, dt * 3.5 * mult),
              behavior: 'auto'
            });
          }
        }
      }

      // Find primary working agent to highlight wireframe box
      let activeWorkingAgent = null;

      agents.forEach((agent, idx) => {
        if (agent.task) {
          const rect = agent.task.el.getBoundingClientRect();

          if (agent.state === 'moving') {
            agent.tx = Math.max(20, Math.min(window.innerWidth - 30, rect.left + 15));
            agent.ty = Math.max(20, Math.min(window.innerHeight - 30, rect.top + 15));

            const dx = agent.tx - agent.x;
            const dy = agent.ty - agent.y;
            const dist = Math.hypot(dx, dy);
            const moveSpeed = 12 * dt * mult;

            agent.x += dx * Math.min(1, moveSpeed);
            agent.y += dy * Math.min(1, moveSpeed);

            if (dist < 28) {
              agent.state = 'working';
              agent.taskProgress = 0;
              agent.task.el.classList.add('swarm-section-inspected');
              highlightedElementsRef.current.push(agent.task.el);
            }
          } else if (agent.state === 'working') {
            agent.taskProgress = Math.min(1, agent.taskProgress + dt * 1.5 * mult);
            activeWorkingAgent = agent;

            // Move cursor to measure the bounding frame
            const p = agent.taskProgress;
            agent.x = rect.left + rect.width * p;
            agent.y = rect.top + rect.height * p;

            if (now - lastKeySoundTime > 80 / mult) {
              audioEngine.playKeyClick(soundRef.current);
              lastKeySoundTime = now;
            }

            if (agent.taskProgress >= 1) {
              audioEngine.playSnapNote(soundRef.current);
              completedCount++;
              const pct = Math.min(100, Math.round((completedCount / totalTasks) * 100));
              setHudProgress(pct);

              if (hudProgressFillRef.current) {
                hudProgressFillRef.current.style.width = `${pct}%`;
              }

              agent.task.el.classList.remove('swarm-section-inspected');
              agent.task = null;
              agent.state = 'idle';
              agent.badgeText = 'Validated';
            }
          }
        } else {
          // Orbit gently in background
          const orbitAngle = now * 0.0012 + idx * ((Math.PI * 2) / agents.length);
          const centerX = window.innerWidth * 0.5 + Math.cos(orbitAngle) * (window.innerWidth * 0.3);
          const centerY = window.innerHeight * 0.45 + Math.sin(orbitAngle) * (window.innerHeight * 0.2);

          const mx = agent.x - mousePosRef.current.x;
          const my = agent.y - mousePosRef.current.y;
          const mDist = Math.hypot(mx, my);
          let rx = 0;
          let ry = 0;
          if (mDist < 100 && mDist > 1) {
            rx = (mx / mDist) * 70;
            ry = (my / mDist) * 70;
          }

          agent.x += (centerX + rx - agent.x) * Math.min(1, dt * 3.5);
          agent.y += (centerY + ry - agent.y) * Math.min(1, dt * 3.5);
        }

        // Direct hardware-accelerated transform update on DOM node
        const agentEl = agentDomRefs.current[idx];
        if (agentEl) {
          agentEl.style.transform = `translate3d(${Math.round(agent.x)}px, ${Math.round(agent.y)}px, 0)`;
        }
      });

      // Update wireframe bounding box directly via refs (no React state churn)
      if (activeWorkingAgent && activeWorkingAgent.task) {
        const tRect = activeWorkingAgent.task.el.getBoundingClientRect();
        const p = activeWorkingAgent.taskProgress;
        const curW = Math.max(20, tRect.width * p);
        const curH = Math.max(20, tRect.height * p);

        if (activeBoxRef.current) {
          activeBoxRef.current.style.display = 'block';
          activeBoxRef.current.style.left = `${tRect.left}px`;
          activeBoxRef.current.style.top = `${tRect.top}px`;
          activeBoxRef.current.style.width = `${curW}px`;
          activeBoxRef.current.style.height = `${curH}px`;
          activeBoxRef.current.style.setProperty('--box-color', activeWorkingAgent.color);
          activeBoxRef.current.style.setProperty('--box-fill', activeWorkingAgent.fill);
        }

        if (activeBoxPillRef.current) {
          activeBoxPillRef.current.textContent = `${activeWorkingAgent.task.title} • ${Math.round(curW)} × ${Math.round(curH)}`;
        }

        if (activeTypingRef.current && activeTypingTextRef.current) {
          activeTypingRef.current.style.display = 'inline-flex';
          activeTypingRef.current.style.left = `${Math.max(20, tRect.left + 16)}px`;
          activeTypingRef.current.style.top = `${Math.max(20, tRect.top - 34)}px`;
          activeTypingRef.current.style.setProperty('--box-color', activeWorkingAgent.color);

          const chars = Math.max(1, Math.ceil(activeWorkingAgent.task.feat.length * p));
          activeTypingTextRef.current.textContent = activeWorkingAgent.task.feat.slice(0, chars);
        }
      } else {
        if (activeBoxRef.current) activeBoxRef.current.style.display = 'none';
        if (activeTypingRef.current) activeTypingRef.current.style.display = 'none';
      }

      // Check if finished
      const anyWorking = agents.some((a) => a.task !== null);
      if (blueprintQueue.length === 0 && !anyWorking) {
        audioEngine.playCompletionChord(soundRef.current);
        setTimeout(() => {
          finishSwarmRebuild();
        }, 350);
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [isMasterEnabled, finishSwarmRebuild]);

  // Listen for trigger events and keyboard shortcut
  useEffect(() => {
    if (!isMasterEnabled) return;

    const handleTriggerEvent = () => {
      startSwarmRebuild();
    };

    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (isRebuilding) {
          finishSwarmRebuild();
        } else {
          startSwarmRebuild();
        }
      } else if (e.key === 'Escape' && isRebuilding) {
        finishSwarmRebuild();
      }
    };

    window.addEventListener('ismail-swarm-trigger', handleTriggerEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('ismail-swarm-trigger', handleTriggerEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMasterEnabled, isRebuilding, startSwarmRebuild, finishSwarmRebuild]);

  // Auto-play on page load (if enabled in Admin Dashboard)
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (!isMasterEnabled || swarmConfig.autoPlay !== true) return;
    if (typeof window === 'undefined') return;

    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/admin') || hash.startsWith('#/admin')) return;

    if (swarmConfig.autoPlayFrequency === 'session') {
      try {
        if (sessionStorage.getItem('ismail_swarm_played') === 'true') {
          return;
        }
      } catch {}
    }

    const timer = setTimeout(() => {
      startSwarmRebuild();
      if (swarmConfig.autoPlayFrequency === 'session') {
        try {
          sessionStorage.setItem('ismail_swarm_played', 'true');
        } catch {}
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isMasterEnabled, swarmConfig.autoPlay, swarmConfig.autoPlayFrequency, startSwarmRebuild]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      finishSwarmRebuild();
    };
  }, [finishSwarmRebuild]);

  if (!isMasterEnabled) {
    return null;
  }

  return (
    <>
      {/* Fullscreen Blueprint Backdrop (Zero layout shifts, smooth fade) */}
      <div className={`swarm-overlay-backdrop ${isRebuilding ? 'active' : ''}`} aria-hidden="true">
        {isRebuilding && <div className="swarm-grid-canvas" />}

        {/* Active Figma Wireframe Box (Updated via refs) */}
        <div ref={activeBoxRef} className="swarm-active-box">
          <span ref={activeBoxPillRef} className="swarm-active-box-pill" />
        </div>

        {/* Floating Typing Ghost Tooltip */}
        <div ref={activeTypingRef} className="swarm-active-typing">
          <span ref={activeTypingTextRef} />
          <span className="swarm-active-caret" />
        </div>

        {/* 8 Multiplayer Cursors (Hardware Accelerated) */}
        {SWARM_ROSTER.map((agent, idx) => (
          <div
            key={agent.id}
            ref={(el) => (agentDomRefs.current[idx] = el)}
            className="swarm-cursor-agent"
            style={{ '--cursor-color': agent.color }}
          >
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="swarm-cursor-svg"
            >
              <path
                d="M1.5 1.5L16 10.5L9.2 12.2L6.2 19.5L1.5 1.5Z"
                fill={agent.color}
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="swarm-cursor-nametag">
              <span>{agent.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating HUD Bar during Rebuild */}
      {isRebuilding && (
        <div className="swarm-hud-bar" role="region" aria-label="Swarm Rebuild Controls">
          <div className="swarm-hud-status">
            <i className="fas fa-wand-magic-sparkles fa-spin"></i>
            <span>Swarm Build {hudProgress}%</span>
          </div>

          <div className="swarm-hud-progress-track">
            <div ref={hudProgressFillRef} className="swarm-hud-progress-fill" />
          </div>

          <div className="swarm-hud-divider" />

          {/* Speed Presets */}
          {[1, 2, 3].map((spd) => (
            <button
              key={spd}
              type="button"
              className={`swarm-hud-btn ${speedMultiplier === spd ? 'active' : ''}`}
              onClick={() => setSpeedMultiplier(spd)}
              title={`Build Speed ${spd}x`}
            >
              {spd}×
            </button>
          ))}

          {/* Auto-Tour Toggle */}
          <button
            type="button"
            className={`swarm-hud-btn ${tourMode ? 'active' : ''}`}
            onClick={() => setTourMode(!tourMode)}
            title="Auto-scroll with the swarm"
          >
            <i className="fas fa-route"></i>
            <span>Tour</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            className={`swarm-hud-btn ${soundOn ? 'active' : ''}`}
            onClick={() => setSoundOn(!soundOn)}
            title={soundOn ? 'Mute sound effects' : 'Unmute sound effects'}
          >
            <i className={`fas ${soundOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>

          {/* Skip / Finish Button */}
          <button
            type="button"
            className="swarm-hud-btn stop"
            onClick={finishSwarmRebuild}
            title="Finish animation (Esc)"
          >
            <i className="fas fa-check"></i>
            <span>Finish (Esc)</span>
          </button>
        </div>
      )}
    </>
  );
};
