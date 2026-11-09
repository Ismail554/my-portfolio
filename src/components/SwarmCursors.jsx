// src/components/SwarmCursors.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import './SwarmCursors.css';

// Multiplayer Swarm Roster (Inspired by DhvanilPatel/swarm-cursors)
const SWARM_ROSTER = [
  { id: 'c1', name: '@Ismail_Lead', color: '#38bdf8', fill: 'rgba(56, 189, 248, 0.10)' },
  { id: 'c2', name: '@Flutter_Engine', color: '#6366f1', fill: 'rgba(99, 102, 241, 0.10)' },
  { id: 'c3', name: '@Clean_Arch', color: '#10b981', fill: 'rgba(16, 185, 129, 0.10)' },
  { id: 'c4', name: '@Skia_90FPS', color: '#f59e0b', fill: 'rgba(245, 158, 11, 0.10)' },
  { id: 'c5', name: '@Dart_Compiler', color: '#ec4899', fill: 'rgba(236, 72, 153, 0.10)' },
  { id: 'c6', name: '@Figma_Systems', color: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.10)' },
  { id: 'c7', name: '@WebSocket_Sync', color: '#14b8a6', fill: 'rgba(20, 184, 166, 0.10)' },
  { id: 'c8', name: '@Store_Release', color: '#f43f5e', fill: 'rgba(244, 63, 94, 0.10)' }
];

// Pentatonic frequencies for glass-marimba snap notes
const PENTATONIC_NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];

// Self-contained Web Audio synthesizer (zero external audio files)
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
      // Ignore if AudioContext is blocked
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
      osc.frequency.setValueAtTime(750 + Math.random() * 280, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.028);
    } catch {
      // Ignore audio errors
    }
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

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // Ignore
    }
  }

  playCompletionChord(enabled) {
    if (!enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const chord = [261.63, 329.63, 392.0, 523.25, 659.25];
      chord.forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.055;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      });
    } catch {
      // Ignore
    }
  }
}

const audioEngine = new SwarmAudioEngine();

export const SwarmCursors = () => {
  const { siteSettings } = usePortfolio();
  const swarmConfig = siteSettings?.swarm || {
    enabled: true,
    ambientCursors: false,
    soundEnabled: true,
    defaultSpeed: 1
  };

  const [isRebuilding, setIsRebuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(swarmConfig.defaultSpeed || 1);
  const [soundOn, setSoundOn] = useState(swarmConfig.soundEnabled !== false);
  const [tourMode, setTourMode] = useState(true);

  // Render state for cursors, active wireframe boxes, typing ghosts, and snap guides
  const [renderCursors, setRenderCursors] = useState([]);
  const [activeBoxes, setActiveBoxes] = useState([]);
  const [activeTypings, setActiveTypings] = useState([]);
  const [snapGuides, setSnapGuides] = useState({ h: null, v: null });

  // Refs for mutable animation loop values
  const rafRef = useRef(null);
  const trackedElementsRef = useRef([]);
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

  // Track user mouse for flocking avoidance physics
  useEffect(() => {
    const onMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Cleanly restore all hidden DOM elements
  const restoreAllDomTargets = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    trackedElementsRef.current.forEach((el) => {
      if (el) {
        el.classList.remove('swarm-hidden-target', 'swarm-revealing-target');
      }
    });
    trackedElementsRef.current = [];
    setIsRebuilding(false);
    setActiveBoxes([]);
    setActiveTypings([]);
    setSnapGuides({ h: null, v: null });
    setProgress(100);
  }, []);

  // Scan the live portfolio DOM and build the ordered Swarm Blueprint
  const startSwarmRebuild = useCallback(() => {
    // Clean up any existing run first
    restoreAllDomTargets();

    // Scroll to top before snapshotting so we build from Hero downward
    window.scrollTo({ top: 0, behavior: 'auto' });

    const selectors = [
      '.navbar-brand',
      '.desktop-nav .nav-link',
      '.hero-status-pill',
      '.hero-title',
      '.hero-subtitle',
      '.hero-description',
      '.hero-quick-tags .tech-badge',
      '.hero-cta-group .btn',
      '.hero-socials',
      '.hero-portrait-stage',
      '.spotlight-code-card',
      '.social-quad-item',
      '.streak-heatmap-container',
      '.section-header-block',
      '.filter-pill-btn',
      '.project-row-card',
      '.other-project-card',
      '.exp-highlight-item',
      '.timeline-card',
      '.skill-category-card',
      '.resume-hub-card',
      '.education-compact-card',
      '.about-compact-card',
      '.compact-pillar-item',
      '.compact-metric-tile',
      '.contact-card',
      '.contact-form-card'
    ];

    const rawNodes = Array.from(document.querySelectorAll(selectors.join(', ')));
    // Deduplicate and filter only visible nodes
    const uniqueElements = [];
    const seen = new Set();

    rawNodes.forEach((el) => {
      if (seen.has(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      seen.add(el);
      uniqueElements.push(el);
    });

    if (uniqueElements.length === 0) return;

    // Sort top-to-bottom, left-to-right by document coordinates
    const scrollY = window.scrollY;
    const blueprintQueue = uniqueElements
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const tag = el.tagName.toLowerCase();
        const isText =
          tag === 'h1' ||
          tag === 'h2' ||
          tag === 'h3' ||
          tag === 'p' ||
          el.classList.contains('hero-status-pill') ||
          el.classList.contains('section-header-block') ||
          el.classList.contains('nav-link');

        const isDuplicatePill =
          el.classList.contains('tech-badge') ||
          el.classList.contains('filter-pill-btn') ||
          el.classList.contains('compact-metric-tile');

        return {
          el,
          docTop: rect.top + scrollY,
          docLeft: rect.left,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          type: isText ? 'text' : isDuplicatePill ? 'duplicate' : 'box',
          textSnippet: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 38) || 'Component'
        };
      })
      .sort((a, b) => {
        if (Math.abs(a.docTop - b.docTop) > 36) return a.docTop - b.docTop;
        return a.docLeft - b.docLeft;
      });

    // Hide all blueprint elements non-destructively
    trackedElementsRef.current = blueprintQueue.map((item) => item.el);
    trackedElementsRef.current.forEach((el) => {
      el.classList.remove('swarm-revealing-target');
      el.classList.add('swarm-hidden-target');
    });

    const totalTasks = blueprintQueue.length;
    let completedCount = 0;

    // Initialize 8 multiplayer cursors scattered around viewport edges
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const agents = SWARM_ROSTER.map((roster, idx) => {
      const angle = (idx / SWARM_ROSTER.length) * Math.PI * 2;
      return {
        ...roster,
        x: vw / 2 + Math.cos(angle) * (vw * 0.35),
        y: vh / 2 + Math.sin(angle) * (vh * 0.35),
        tx: vw / 2,
        ty: vh / 2,
        state: 'idle', // 'idle' | 'moving' | 'working'
        task: null,
        taskProgress: 0,
        tool: 'select',
        badgeText: 'Ready'
      };
    });

    setIsRebuilding(true);
    setProgress(0);

    let lastTime = performance.now();
    let lastKeySoundTime = 0;

    const step = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.064);
      lastTime = now;
      const mult = speedRef.current || 1;

      const currentBoxes = [];
      const currentTypings = [];
      let latestGuideH = null;
      let latestGuideV = null;

      // Assign tasks to idle agents
      agents.forEach((agent) => {
        if (agent.state === 'idle' && blueprintQueue.length > 0) {
          const nextTask = blueprintQueue.shift();
          agent.task = nextTask;
          agent.state = 'moving';
          agent.taskProgress = 0;
          agent.tool = nextTask.type === 'box' ? 'crosshair' : 'select';
          agent.badgeText =
            nextTask.type === 'text'
              ? 'Type Tool (T)'
              : nextTask.type === 'duplicate'
              ? 'Alt + Drag'
              : 'Frame (F)';
        }
      });

      // Auto-tour smooth scroll to keep active tasks in viewport
      if (tourRef.current) {
        const activeTasks = agents.filter((a) => a.task).map((a) => a.task);
        if (activeTasks.length > 0) {
          const avgDocTop =
            activeTasks.reduce((sum, t) => sum + t.docTop, 0) / activeTasks.length;
          const targetScrollY = Math.max(0, avgDocTop - window.innerHeight * 0.38);
          const currentScroll = window.scrollY;
          const diff = targetScrollY - currentScroll;
          if (Math.abs(diff) > 4) {
            window.scrollTo(0, currentScroll + diff * Math.min(1, dt * 4.5 * mult));
          }
        }
      }

      // Update each agent
      agents.forEach((agent, idx) => {
        if (agent.task) {
          const rect = agent.task.el.getBoundingClientRect();

          if (agent.state === 'moving') {
            // Fly toward top-left of the target element
            agent.tx = Math.max(28, Math.min(window.innerWidth - 40, rect.left));
            agent.ty = Math.max(28, Math.min(window.innerHeight - 40, rect.top));

            const dx = agent.tx - agent.x;
            const dy = agent.ty - agent.y;
            const dist = Math.hypot(dx, dy);

            const moveSpeed = 14 * dt * mult;
            agent.x += dx * Math.min(1, moveSpeed);
            agent.y += dy * Math.min(1, moveSpeed);

            if (dist < 18) {
              agent.state = 'working';
              agent.taskProgress = 0;
            }
          } else if (agent.state === 'working') {
            // Advance build progress on this element
            const workRate = agent.task.type === 'duplicate' ? 3.2 : agent.task.type === 'text' ? 2.4 : 2.1;
            agent.taskProgress = Math.min(1, agent.taskProgress + dt * workRate * mult);

            const p = agent.taskProgress;
            const curW = Math.max(12, rect.width * p);
            const curH = Math.max(12, rect.height * p);

            if (agent.task.type === 'box' || agent.task.type === 'duplicate') {
              // Move cursor to bottom-right corner of growing wireframe box
              agent.x = rect.left + curW;
              agent.y = rect.top + curH;
              agent.badgeText = `${Math.round(curW)} × ${Math.round(curH)}`;

              currentBoxes.push({
                id: agent.id,
                left: rect.left,
                top: rect.top,
                width: curW,
                height: curH,
                color: agent.color,
                fill: agent.fill,
                dimText: `${Math.round(curW)} × ${Math.round(curH)}`
              });

              latestGuideH = rect.top;
              latestGuideV = rect.left;
            } else if (agent.task.type === 'text') {
              // Move cursor along text width while typing
              agent.x = rect.left + Math.min(rect.width, rect.width * p);
              agent.y = rect.top + rect.height * 0.5;
              const chars = Math.max(1, Math.ceil(agent.task.textSnippet.length * p));
              const typed = agent.task.textSnippet.slice(0, chars);
              agent.badgeText = 'Typing...';

              currentTypings.push({
                id: agent.id,
                left: Math.max(24, rect.left),
                top: Math.max(24, rect.top),
                text: typed,
                color: agent.color
              });

              if (now - lastKeySoundTime > 65 / mult) {
                audioEngine.playKeyClick(soundRef.current);
                lastKeySoundTime = now;
              }
            }

            // Task finished -> Reveal element & play snap sound
            if (agent.taskProgress >= 1) {
              agent.task.el.classList.remove('swarm-hidden-target');
              agent.task.el.classList.add('swarm-revealing-target');
              audioEngine.playSnapNote(soundRef.current);

              completedCount++;
              setProgress(Math.min(100, Math.round((completedCount / totalTasks) * 100)));

              agent.task = null;
              agent.state = 'idle';
              agent.tool = 'select';
              agent.badgeText = 'Synced';
            }
          }
        } else {
          // Idle orbiting & mouse avoidance physics
          const orbitAngle = now * 0.0015 + idx * ((Math.PI * 2) / agents.length);
          const centerX = window.innerWidth * 0.5 + Math.cos(orbitAngle) * 180;
          const centerY = window.innerHeight * 0.5 + Math.sin(orbitAngle) * 110;

          // Mouse avoidance repulsion
          const mx = agent.x - mousePosRef.current.x;
          const my = agent.y - mousePosRef.current.y;
          const mDist = Math.hypot(mx, my);
          let repelX = 0;
          let repelY = 0;
          if (mDist < 120 && mDist > 1) {
            repelX = (mx / mDist) * 90;
            repelY = (my / mDist) * 90;
          }

          agent.x += (centerX + repelX - agent.x) * Math.min(1, dt * 4);
          agent.y += (centerY + repelY - agent.y) * Math.min(1, dt * 4);
        }
      });

      setRenderCursors(
        agents.map((a) => ({
          id: a.id,
          name: a.name,
          color: a.color,
          x: Math.round(a.x),
          y: Math.round(a.y),
          tool: a.tool,
          badgeText: a.badgeText
        }))
      );
      setActiveBoxes(currentBoxes);
      setActiveTypings(currentTypings);
      setSnapGuides({ h: latestGuideH, v: latestGuideV });

      // Check if all tasks are complete
      const anyWorking = agents.some((a) => a.task !== null);
      if (blueprintQueue.length === 0 && !anyWorking) {
        audioEngine.playCompletionChord(soundRef.current);
        setTimeout(() => {
          restoreAllDomTargets();
        }, 450);
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [restoreAllDomTargets]);

  // Ambient Multiplayer Cursors Mode (when enabled in Admin Settings and not actively rebuilding)
  useEffect(() => {
    if (isRebuilding || !swarmConfig.ambientCursors) {
      if (!isRebuilding) setRenderCursors([]);
      return;
    }

    const ambientAgents = SWARM_ROSTER.slice(0, 3).map((r, i) => ({
      ...r,
      x: window.innerWidth * (0.25 + i * 0.25),
      y: window.innerHeight * 0.35,
      tool: 'select',
      badgeText: i === 0 ? '90 FPS Ready' : i === 1 ? 'Clean Arch' : 'Live Sync'
    }));

    let animId;
    const animateAmbient = (now) => {
      ambientAgents.forEach((a, i) => {
        const t = now * 0.0007 + i * 2.1;
        const targetX = window.innerWidth * 0.5 + Math.cos(t) * (window.innerWidth * 0.32);
        const targetY = window.innerHeight * 0.45 + Math.sin(t * 1.3) * (window.innerHeight * 0.28);

        a.x += (targetX - a.x) * 0.03;
        a.y += (targetY - a.y) * 0.03;
      });

      setRenderCursors(
        ambientAgents.map((a) => ({
          ...a,
          x: Math.round(a.x),
          y: Math.round(a.y)
        }))
      );
      animId = requestAnimationFrame(animateAmbient);
    };

    animId = requestAnimationFrame(animateAmbient);
    return () => cancelAnimationFrame(animId);
  }, [isRebuilding, swarmConfig.ambientCursors]);

  // Listen for custom trigger event ('ismail-swarm-trigger') and keyboard shortcuts (Alt+Shift+S, Escape)
  useEffect(() => {
    const handleTriggerEvent = () => {
      startSwarmRebuild();
    };

    const handleKeyDown = (e) => {
      // Alt + Shift + S triggers or toggles Swarm Rebuild
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (isRebuilding) {
          restoreAllDomTargets();
        } else {
          startSwarmRebuild();
        }
      } else if (e.key === 'Escape' && isRebuilding) {
        restoreAllDomTargets();
      }
    };

    window.addEventListener('ismail-swarm-trigger', handleTriggerEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('ismail-swarm-trigger', handleTriggerEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRebuilding, startSwarmRebuild, restoreAllDomTargets]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      restoreAllDomTargets();
    };
  }, [restoreAllDomTargets]);

  if (!isRebuilding && renderCursors.length === 0) {
    return null;
  }

  const rulerTicksH = Array.from({ length: 20 }, (_, i) => i * 100);
  const rulerTicksV = Array.from({ length: 14 }, (_, i) => i * 100);

  return (
    <>
      <div className={`swarm-stage-overlay ${isRebuilding ? 'is-rebuilding' : ''}`} aria-hidden="true">
        {/* Figma-Style Pixel Rulers & Snap Guides during active rebuild */}
        {isRebuilding && (
          <>
            <div className="swarm-ruler-corner">
              <i className="fas fa-vector-square"></i>
            </div>
            <div className="swarm-ruler-top">
              {rulerTicksH.map((val) => (
                <div key={val} className="swarm-ruler-tick-h">{val}</div>
              ))}
            </div>
            <div className="swarm-ruler-left">
              {rulerTicksV.map((val) => (
                <div key={val} className="swarm-ruler-tick-v">{val}</div>
              ))}
            </div>

            {snapGuides.h !== null && (
              <div className="swarm-snap-guide-h" style={{ top: `${snapGuides.h}px` }} />
            )}
            {snapGuides.v !== null && (
              <div className="swarm-snap-guide-v" style={{ left: `${snapGuides.v}px` }} />
            )}
          </>
        )}

        {/* Active Wireframe Boxes Being Dragged */}
        {activeBoxes.map((box) => (
          <div
            key={box.id}
            className="swarm-wireframe-box"
            style={{
              left: `${box.left}px`,
              top: `${box.top}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
              '--box-color': box.color,
              '--box-fill': box.fill
            }}
          >
            <span className="swarm-dimension-pill">{box.dimText}</span>
          </div>
        ))}

        {/* Active Text Caret Ghosts */}
        {activeTypings.map((t) => (
          <div
            key={t.id}
            className="swarm-typing-ghost"
            style={{
              left: `${t.left}px`,
              top: `${t.top}px`,
              '--box-color': t.color
            }}
          >
            <span>{t.text}</span>
            <span className="swarm-typing-caret" />
          </div>
        ))}

        {/* Multiplayer Swarm Cursors */}
        {renderCursors.map((cursor) => (
          <div
            key={cursor.id}
            className="swarm-cursor-agent"
            style={{
              transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
              '--cursor-color': cursor.color
            }}
          >
            {cursor.tool === 'crosshair' ? (
              <div className="swarm-cursor-crosshair" />
            ) : (
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
                  fill={cursor.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            <div className="swarm-cursor-nametag">
              <span>{cursor.name}</span>
              {cursor.badgeText && (
                <span className="swarm-cursor-task-badge">{cursor.badgeText}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Floating Control HUD Bar during Rebuild */}
      {isRebuilding && (
        <div className="swarm-hud-bar" role="region" aria-label="Swarm Rebuild Controls">
          <div className="swarm-hud-status">
            <i className="fas fa-wand-magic-sparkles fa-spin"></i>
            <span>Swarm Rebuilding {progress}%</span>
          </div>

          <div className="swarm-hud-progress-track">
            <div className="swarm-hud-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="swarm-hud-divider" />

          {/* Speed Multipliers (1x, 2x, 3x) */}
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

          {/* Auto-Tour Scroll Toggle */}
          <button
            type="button"
            className={`swarm-hud-btn ${tourMode ? 'active' : ''}`}
            onClick={() => setTourMode(!tourMode)}
            title="Auto-scroll with the swarm as it builds down the page"
          >
            <i className="fas fa-route"></i>
            <span>Tour</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            className={`swarm-hud-btn ${soundOn ? 'active' : ''}`}
            onClick={() => setSoundOn(!soundOn)}
            title={soundOn ? 'Mute Web Audio effects' : 'Unmute Web Audio effects'}
          >
            <i className={`fas ${soundOn ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>

          {/* Finish / Skip Immediately */}
          <button
            type="button"
            className="swarm-hud-btn stop"
            onClick={restoreAllDomTargets}
            title="Skip animation and restore page (Esc)"
          >
            <i className="fas fa-check"></i>
            <span>Finish (Esc)</span>
          </button>
        </div>
      )}
    </>
  );
};
