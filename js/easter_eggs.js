/**
 * Easter Eggs, Interactive Features & Personality Expansion Engine
 * For Amrinder Pal Singh Personal Portfolio
 */

// ==========================================================================
// 1. ACHIEVEMENT SYSTEM (LOCALSTORAGE PERSISTED)
// ==========================================================================
const ACHIEVEMENTS = [
  {
    id: 'hello_world',
    title: 'Hello World 💻',
    subtitle: 'Ran your first snippet of code in Amrinder.OS',
    icon: 'fa-code'
  },
  {
    id: 'honest_human',
    title: 'Honest Human ❤️',
    subtitle: 'Confessed you are not a techie or completed personality scan',
    icon: 'fa-heart'
  },
  {
    id: 'curious_engineer',
    title: 'Curious Engineer 🔍',
    subtitle: 'Explored deep-dive details of Amrinder\'s projects',
    icon: 'fa-microchip'
  },
  {
    id: 'bazinga',
    title: 'Bazinga! ⚡',
    subtitle: 'Discovered Sheldon Cooper\'s best number 73 secret',
    icon: 'fa-bolt'
  },
  {
    id: 'debugger',
    title: 'Debugger 🐛',
    subtitle: 'Inspected the matrix inside browser DevTools',
    icon: 'fa-bug'
  },
  {
    id: 'universe_explorer',
    title: 'Universe Explorer 🪐',
    subtitle: 'Asked the universe a space question in Curiosity Subsystems',
    icon: 'fa-user-astronaut'
  },
  {
    id: 'cricket_analyst',
    title: 'Cricket Analyst 🏏',
    subtitle: 'Discovered Amrinder\'s unyielding love for Test Cricket',
    icon: 'fa-baseball-ball'
  },
  {
    id: 'terminal_wizard',
    title: 'Terminal Wizard 💻',
    subtitle: 'Executed 3+ commands in the hidden >_ TERMINAL',
    icon: 'fa-terminal'
  },
  {
    id: 'diagnostic_patient',
    title: 'Diagnostic Patient 🩺',
    subtitle: 'Ran the full Amrinder System Diagnostic v1.0',
    icon: 'fa-stethoscope'
  }
];

let executedTerminalCmdCount = 0;

function getUnlockedAchievementIds() {
  try {
    const saved = localStorage.getItem('amrinder-achievements');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function unlockAchievement(id) {
  const unlocked = getUnlockedAchievementIds();
  if (unlocked.includes(id)) return; // Already unlocked

  unlocked.push(id);
  try {
    localStorage.setItem('amrinder-achievements', JSON.stringify(unlocked));
  } catch (e) {}

  const achievement = ACHIEVEMENTS.find(a => a.id === id);
  if (achievement) {
    showAchievementToast(achievement);
  }

  updateAchievementCounterBadge();

  if (unlocked.length === ACHIEVEMENTS.length) {
    setTimeout(() => {
      showGrandTrophyModal();
    }, 1200);
  }
}

function updateAchievementCounterBadge() {
  const badge = document.getElementById('achievement-counter-btn');
  if (!badge) return;
  const unlocked = getUnlockedAchievementIds();
  badge.innerHTML = `<i class="fas fa-trophy text-accent"></i> <span>${unlocked.length}/${ACHIEVEMENTS.length}</span>`;
}

function showAchievementToast(achievement) {
  let toastContainer = document.getElementById('achievement-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'achievement-toast-container';
    toastContainer.className = 'achievement-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'achievement-toast reveal-toast';
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${achievement.icon}"></i></div>
    <div class="toast-content">
      <div class="toast-header">ACHIEVEMENT UNLOCKED!</div>
      <div class="toast-title">${achievement.title}</div>
      <div class="toast-sub">${achievement.subtitle}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Play subtle web audio beep
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);

      setTimeout(() => {
        if (ctx && ctx.state !== 'closed') {
          ctx.close().catch(() => {});
        }
      }, 400);
    }
  } catch(e) {}

  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 4500);
}

function showModal(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (!el) return;
  el.style.display = 'flex';
  el.style.opacity = '1';
  el.style.visibility = 'visible';
  el.style.pointerEvents = 'auto';
  el.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideModal(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (!el) return;
  el.classList.remove('active');
  el.style.opacity = '0';
  el.style.pointerEvents = 'none';
  el.style.visibility = 'hidden';
  setTimeout(() => {
    if (!el.classList.contains('active')) {
      el.style.display = 'none';
    }
  }, 200);
  document.body.style.overflow = 'auto';
}

function getSandboxOutputBox() {
  let box = document.getElementById('sandbox-output-display');
  if (!box) {
    box = document.getElementById('random-fact-display');
  }
  if (box) {
    box.style.display = 'block';
  }
  return box;
}

function openAchievementsModal() {
  const unlocked = getUnlockedAchievementIds();
  const modal = document.getElementById('achievements-modal');
  const listContainer = document.getElementById('achievements-list-grid');

  if (!modal || !listContainer) return;

  listContainer.innerHTML = ACHIEVEMENTS.map(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    return `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="ach-icon-box">
          <i class="fas ${isUnlocked ? ach.icon : 'fa-lock'}"></i>
        </div>
        <div class="ach-info">
          <div class="ach-title">${ach.title}</div>
          <div class="ach-sub">${ach.subtitle}</div>
          <div class="ach-status-tag">${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}</div>
        </div>
      </div>
    `;
  }).join('');

  showModal(modal);
}

function closeAchievementsModal() {
  hideModal('achievements-modal');
}

function showGrandTrophyModal() {
  const modal = document.getElementById('grand-trophy-modal');
  if (!modal) return;
  showModal(modal);
  launchConfettiCanvas();
}

function closeGrandTrophyModal() {
  hideModal('grand-trophy-modal');
}

// Confetti Cannon Canvas
function launchConfettiCanvas() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6366f1', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 80,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      if (p.y > canvas.height) {
        particles[i] = {
          x: Math.random() * canvas.width,
          y: -10,
          r: p.r,
          d: p.d,
          color: p.color,
          tilt: p.tilt,
          tiltAngleIncremental: p.tiltAngleIncremental,
          tiltAngle: p.tiltAngle
        };
      }
    }
    animationFrame = requestAnimationFrame(render);
  }
  render();

  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}


// ==========================================================================
// 2. AMRINDER DIAGNOSTIC TOOL v1.0
// ==========================================================================
let diagTimeouts = [];

function openDiagnosticModal() {
  const box = getSandboxOutputBox();
  if (box) {
    box.innerHTML = `
      <div class="beyond-card reveal-zoom-in" style="padding: 24px; text-align: left; background: #080b11;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 6px; color: var(--text-primary);">
          <i class="fas fa-stethoscope text-accent"></i> Amrinder System Diagnostic v1.0
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 14px;">Running hardware, memory, sleep, caffeine &amp; curiosity core integrity checks...</p>

        <div id="inline-diag-log" class="diag-console-window" style="height: 180px; overflow-y: auto;"></div>

        <div id="inline-diag-report" style="display: none; margin-top: 16px;">
          <div class="diag-report-card">
            <h4>DIAGNOSIS COMPLETE:</h4>
            <p style="font-size: 1.05rem; font-weight: 700; color: var(--accent-primary); margin: 6px 0;">
              "You're looking at an engineer. There's nothing we can do. 😂"
            </p>
            <p style="font-size: 0.88rem; color: var(--text-secondary);">
              Recommendation: Supply strong coffee ☕, dark mode theme 🌙, and zero meetings on Friday afternoon.
            </p>
          </div>
        </div>
      </div>
    `;

    const inlineLog = document.getElementById('inline-diag-log');
    const inlineReport = document.getElementById('inline-diag-report');
    if (inlineLog && inlineReport) {
      const checks = [
        { text: 'Initializing Hardware Abstraction Layer...', status: 'OK', delay: 150 },
        { text: 'Probing CPU Core Architecture...', status: 'Human (Overclocked ⚡)', delay: 350 },
        { text: 'Evaluating System Memory / RAM...', status: 'Insufficient 🧠', delay: 600 },
        { text: 'Scanning Sleep Cycle Registers...', status: '404 NOT FOUND 😴', delay: 850 },
        { text: 'Checking Caffeine & Coffee Saturation...', status: 'CRITICAL ☕', delay: 1100 },
        { text: 'Assessing Test Cricket Fanaticism...', status: '100% 🏏', delay: 1350 },
        { text: 'Diagnostic Scan Complete.', status: 'SUCCESS', delay: 1600 }
      ];

      checks.forEach((item, idx) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'diag-log-line';
          line.innerHTML = `
            <span class="diag-prompt">[SYS_CHECK_${idx + 1}]</span>
            <span class="diag-text">${item.text}</span>
            <span class="diag-val ${item.status.includes('404') || item.status.includes('CRITICAL') ? 'diag-warn' : 'diag-success'}">${item.status}</span>
          `;
          inlineLog.appendChild(line);
          inlineLog.scrollTop = inlineLog.scrollHeight;

          if (idx === checks.length - 1) {
            setTimeout(() => {
              if (inlineReport) inlineReport.style.display = 'block';
              unlockAchievement('diagnostic_patient');
            }, 200);
          }
        }, item.delay);
      });
    }
  }

  const modal = document.getElementById('diagnostic-modal');
  if (modal) showModal(modal);
  runDiagnosticScan();
}

function closeDiagnosticModal() {
  hideModal('diagnostic-modal');
  diagTimeouts.forEach(t => clearTimeout(t));
  diagTimeouts = [];
}

function runDiagnosticScan() {
  const consoleBox = document.getElementById('diagnostic-console-log');
  const reportBox = document.getElementById('diagnostic-report-result');
  const scanBtn = document.getElementById('diagnostic-start-btn');

  if (!consoleBox || !reportBox) return;

  diagTimeouts.forEach(t => clearTimeout(t));
  diagTimeouts = [];

  consoleBox.innerHTML = '';
  reportBox.style.display = 'none';
  if (scanBtn) scanBtn.disabled = true;

  const checks = [
    { text: 'Initializing Amrinder Hardware Abstraction Layer (AHAL v1.0)...', status: 'OK', delay: 200 },
    { text: 'Probing CPU Core Architecture...', status: 'Human (Overclocked ⚡)', delay: 500 },
    { text: 'Evaluating System Memory / RAM...', status: 'Insufficient (Too many background thoughts 🧠)', delay: 800 },
    { text: 'Scanning Sleep Cycle Registers...', status: '404 NOT FOUND 😴', delay: 1100 },
    { text: 'Checking Caffeine & Coffee Saturation...', status: 'CRITICAL (Immediate refill required ☕)', delay: 1400 },
    { text: 'Assessing Test Cricket Fanaticism Level...', status: '100% (Test Cricket > All Formats 🏏)', delay: 1700 },
    { text: 'Verifying Code Quality & Syntax Rules...', status: 'Compiles on my machine ¯\\_(ツ)_/¯', delay: 2000 },
    { text: 'Testing Overthinking Capacity...', status: 'MAXIMUM THRESHOLD EXCEEDED 🚀', delay: 2300 },
    { text: 'Scanning Cosmology & Astrophysics Knowledge...', status: 'INFINITE CURIOSITY 🌌', delay: 2600 },
    { text: 'Diagnostic Scan Complete.', status: 'SUCCESS', delay: 2900 }
  ];

  checks.forEach((item, index) => {
    const tid = setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'diag-log-line';
      line.innerHTML = `
        <span class="diag-prompt">[SYS_CHECK_${index + 1}]</span>
        <span class="diag-text">${item.text}</span>
        <span class="diag-val ${item.status.includes('404') || item.status.includes('CRITICAL') ? 'diag-warn' : 'diag-success'}">${item.status}</span>
      `;
      consoleBox.appendChild(line);
      consoleBox.scrollTop = consoleBox.scrollHeight;

      if (index === checks.length - 1) {
        const finalTid = setTimeout(() => {
          reportBox.style.display = 'block';
          if (scanBtn) scanBtn.disabled = false;
          unlockAchievement('diagnostic_patient');
        }, 250);
        diagTimeouts.push(finalTid);
      }
    }, item.delay);
    diagTimeouts.push(tid);
  });
}


// ==========================================================================
// 3. CRICKET ANALYST MODE
// ==========================================================================
function openCricketModal() {
  const box = getSandboxOutputBox();
  if (box) {
    box.innerHTML = `
      <div class="beyond-card reveal-zoom-in" style="padding: 28px; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🏏</div>
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">Cricket Analyst Mode</h3>
        <div class="badge" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; margin: 0 auto 20px auto; display: inline-block;">
          Opinion strength: HIGH | Argument mode: DISABLED
        </div>

        <h4 style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px;">Format Hierarchy Matrix:</h4>
        
        <div class="cricket-format-bars" style="text-align: left; max-width: 500px; margin: 0 auto 24px auto;">
          <div class="cricket-bar-item" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px; font-weight: 600;">
              <span>Test Cricket (The Supreme Format)</span>
              <span class="text-accent">100%</span>
            </div>
            <div class="progress-bg"><div class="progress-fill" style="width: 100%; background: var(--accent-primary);"></div></div>
          </div>

          <div class="cricket-bar-item" style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px; font-weight: 600;">
              <span>One Day Internationals (ODI)</span>
              <span style="color: #06b6d4;">75%</span>
            </div>
            <div class="progress-bg"><div class="progress-fill" style="width: 75%; background: #06b6d4;"></div></div>
          </div>

          <div class="cricket-bar-item">
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 4px; font-weight: 600;">
              <span>T20 (Fast &amp; Entertaining)</span>
              <span style="color: #a855f7;">50%</span>
            </div>
            <div class="progress-bg"><div class="progress-fill" style="width: 50%; background: #a855f7;"></div></div>
          </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px;">
          <span class="skill-chip"><i class="fas fa-crown text-accent"></i> MS Dhoni Composure</span>
          <span class="skill-chip"><i class="fas fa-fire text-accent"></i> Virat Kohli Intensity</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-muted); font-style: italic; max-width: 520px; margin: 0 auto;">
          "I come in peace. I just believe 5 days of red ball cricket tests character like nothing else."
        </p>
      </div>
    `;
  }

  unlockAchievement('cricket_analyst');
  const modal = document.getElementById('cricket-modal');
  if (modal) showModal(modal);
}

function closeCricketModal() {
  hideModal('cricket-modal');
}


// ==========================================================================
// 4. ASK THE UNIVERSE (SPACE TRIVIA CARD)
// ==========================================================================
function selectSpaceChoice(choice) {
  const responseBox = document.getElementById('space-trivia-response');
  if (!responseBox) return;

  const responses = {
    saturn: {
      title: '🪐 Destination: Saturn\'s Rings',
      text: 'Enjoy the 282,000 km ice party! Did you know Saturn\'s rings are 99% pure water ice and only about 10 meters thick in most places? Watch out for space dust!'
    },
    blackhole: {
      title: '🕳️ Destination: Inside a Black Hole',
      text: 'Spaghettification guaranteed! As you approach the singularity, tidal forces will stretch you into a thin noodle. Don\'t forget your watch — gravitational time dilation means Earth will age millions of years while you fall in.'
    },
    eventhorizon: {
      title: '🌌 Destination: The Event Horizon',
      text: 'Time stands still here relative to distant observers. Literally the ultimate spot to finish your software engineering backlog without missing any deadline.'
    },
    safe: {
      title: '🚀 Destination: Somewhere Less Dangerous',
      text: 'Boring! But wise choice. Low Earth Orbit it is. You get to see 16 sunrises a day while floating 400 km above all server outages.'
    }
  };

  const res = responses[choice] || responses['safe'];
  responseBox.style.display = 'block';
  responseBox.innerHTML = `
    <div class="space-res-card">
      <h4>${res.title}</h4>
      <p>${res.text}</p>
      <div style="font-size: 0.85rem; color: var(--accent-secondary); margin-top: 10px; font-style: italic;">
        "The universe is under no obligation to make sense to you." — Neil deGrasse Tyson
      </div>
    </div>
  `;

  unlockAchievement('universe_explorer');
}


// ==========================================================================
// 5. NERD LEVEL DETECTOR
// ==========================================================================
function openNerdDetectorModal() {
  const box = getSandboxOutputBox();
  if (box) {
    box.innerHTML = `
      <div class="beyond-card reveal-zoom-in" style="padding: 28px; text-align: center;">
        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">🤓 Nerd Level Detector</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Analyzing visitor telemetry and behavioral pattern...</p>

        <div class="nerd-meter-wrapper" style="margin-bottom: 20px; max-width: 480px; margin: 0 auto 20px auto;">
          <div id="inline-nerd-meter-val" style="font-size: 3rem; font-weight: 800; color: var(--accent-primary);">0%</div>
          <div class="progress-bg" style="height: 12px; border-radius: 6px; margin-top: 8px;">
            <div id="inline-nerd-meter-fill" class="progress-fill" style="width: 0%; height: 100%; border-radius: 6px; background: linear-gradient(90deg, #6366f1, #a855f7);"></div>
          </div>
        </div>

        <div id="inline-nerd-result-box" style="display: none;">
          <div class="badge" style="background: rgba(168, 85, 247, 0.2); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.4); font-size: 0.95rem; padding: 6px 16px; margin: 0 auto 12px auto; display: inline-block;">
            CLASSIFICATION: SMARTY NERD™
          </div>
          <p style="font-size: 1.05rem; color: var(--text-primary); font-weight: 600;">
            "Leonard-level acceptable. 😎"
          </p>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 4px;">
            (Not quite Sheldon Cooper level, but definitely above Howard's MIT diploma!)
          </p>
        </div>
      </div>
    `;

    const mVal = document.getElementById('inline-nerd-meter-val');
    const mBar = document.getElementById('inline-nerd-meter-fill');
    const rBox = document.getElementById('inline-nerd-result-box');
    if (mVal && mBar) {
      let curr = 0;
      const t = 91;
      const interval = setInterval(() => {
        curr += 1;
        mVal.textContent = `${curr}%`;
        mBar.style.width = `${curr}%`;
        if (curr >= t) {
          clearInterval(interval);
          if (rBox) rBox.style.display = 'block';
        }
      }, 20);
    }
  }

  calculateNerdLevel();
  const modal = document.getElementById('nerd-detector-modal');
  if (modal) showModal(modal);
}

function closeNerdDetectorModal() {
  hideModal('nerd-detector-modal');
}

function calculateNerdLevel() {
  const meterVal = document.getElementById('nerd-meter-val');
  const meterBar = document.getElementById('nerd-meter-fill');
  const resultBox = document.getElementById('nerd-result-box');

  if (!meterVal || !meterBar) return;

  let current = 0;
  const target = 91; // Smarty nerd level 91%
  meterBar.style.width = '0%';
  if (resultBox) resultBox.style.display = 'none';

  const interval = setInterval(() => {
    current += 1;
    meterVal.textContent = `${current}%`;
    meterBar.style.width = `${current}%`;

    if (current >= target) {
      clearInterval(interval);
      if (resultBox) {
        resultBox.style.display = 'block';
      }
    }
  }, 25);
}


// ==========================================================================
// 6. HIDDEN RETRO TERMINAL (`>_ TERMINAL`)
// ==========================================================================
const TERMINAL_COMMANDS = {
  help: `Available commands:
  - <span class="text-accent">about</span>        : Brief bio of Amrinder Pal Singh
  - <span class="text-accent">skills</span>       : Enterprise IT & technical toolkit
  - <span class="text-accent">projects</span>     : Key software & mobility projects
  - <span class="text-accent">experience</span>   : Work history timeline
  - <span class="text-accent">cricket</span>      : Amrinder's stance on Test Cricket
  - <span class="text-accent">space</span>        : Space, black holes & cosmology notes
  - <span class="text-accent">fun</span>          : A quick joke
  - <span class="text-accent">sudo</span>         : Superuser privilege escalation
  - <span class="text-accent">bazinga</span>      : Sheldon Cooper's secret command
  - <span class="text-accent">diagnostic</span>   : Run system check
  - <span class="text-accent">matrix</span>       : Toggle terminal rain animation
  - <span class="text-accent">clear</span>        : Clear output console`,

  about: `Amrinder Pal Singh | Endpoint Management & Enterprise Mobility Specialist
5+ years experience across Microsoft Intune, SCCM/MECM, Workspace ONE, PowerShell, and AI Automation.
Education: MCA (Chandigarh University, 2024), BCA (Guru Gobind Singh Indraprastha University - GGSIPU, 2020).
Career: Joined TCS in 2021 as Graduate Trainee -> Programmer (2022) -> Assistant System Engineer (2023) -> System Engineer (2024). Joined Infosys in 2026.`,

  skills: `Primary Toolchain:
  - Endpoint Management: Microsoft Intune, SCCM / MECM, VMware Workspace ONE
  - Scripting & Code: PowerShell, Python, JavaScript, HTML5/CSS3, C/C++
  - Enterprise Security: Conditional Access, BitLocker, Zero-Trust Architecture
  - OS & Systems: Windows Server, Windows 10/11, macOS, Linux`,

  projects: `Key Projects:
  1. UEM Sentinel - Security & Compliance Automation Engine
  2. Mailer App - Automated Bulk Communication Suite
  3. Self Destruct Failsafe Console - Enterprise Failsafe Management System`,

  experience: `Career & Education Path:
  - 2026        : Associate Consultant @ Infosys Limited
  - 2024        : System Engineer @ TCS & MCA Graduation @ Chandigarh University
  - 2023        : Assistant System Engineer @ TCS (Recognized with 6x Awards)
  - 2022        : Programmer @ TCS
  - 2021        : Graduate Trainee @ Tata Consultancy Services (TCS)
  - 2020        : Graduated BCA @ Guru Gobind Singh Indraprastha University (GGSIPU)`,

  cricket: `Test Cricket > ODI > T20.
Dhoni\'s composure + Kohli\'s intensity.
Opinion Strength: MAXIMUM. Argument Mode: DISABLED. 🏏`,

  space: `According to Hubble's law, galaxies are moving away from us.
If you feel like space is expanding around you, don't worry... that's just the universe making room for more code. 🌌`,

  fun: `Why do programmers prefer dark mode?
Because light attracts bugs. 😂`,

  sudo: `<span style="color: #ef4444; font-weight: bold;">Permission denied: You are not Amrinder! 🔒</span>
Nice try, root intruder.`,

  bazinga: `<span style="color: #f59e0b; font-weight: bold;">BAZINGA! ⚡</span>
You found the Sheldon Cooper easter egg! 73 is indeed the best number in the universe.`,

  diagnostic: `Launching system check... Type <span class="text-accent">open_diag</span> or click the Diagnostic button.`
};

let cmdHistory = [];
let cmdHistoryIdx = -1;

function toggleTerminal() {
  const box = getSandboxOutputBox();
  if (box) {
    box.innerHTML = `
      <div class="beyond-card reveal-zoom-in" style="padding: 20px; text-align: left; background: #080b11; border-color: rgba(99, 102, 241, 0.4);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-color);">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; color: var(--accent-secondary); font-weight: 700;">
            &gt;_ TERMINAL — amrinder@portfolio
          </div>
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.75rem;">ONLINE</span>
        </div>
        <div id="inline-terminal-log" style="height: 180px; overflow-y: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; line-height: 1.5; color: #cbd5e1; margin-bottom: 12px;">
          <div style="color: var(--text-secondary); margin-bottom: 10px;">
            Welcome to Amrinder's Interactive Terminal (Inline Mode)<br>
            Type <span class="text-accent">'help'</span> for commands (about, skills, projects, experience, cricket, space, fun, diagnostic, clear).
          </div>
        </div>
        <div style="display: flex; align-items: center; background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);">
          <span style="color: #10b981; font-family: 'JetBrains Mono', monospace; font-weight: 700; margin-right: 8px;">amrinder@portfolio:~$</span>
          <input type="text" id="inline-term-input" style="flex: 1; background: transparent; border: none; color: #fff; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; outline: none;" placeholder="Type help..." spellcheck="false" autocomplete="off" />
        </div>
      </div>
    `;

    const inlineInput = document.getElementById('inline-term-input');
    const inlineLog = document.getElementById('inline-terminal-log');
    if (inlineInput && inlineLog) {
      setTimeout(() => inlineInput.focus(), 60);
      inlineInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const rawCmd = inlineInput.value.trim();
          if (!rawCmd) return;
          const cmdLine = document.createElement('div');
          cmdLine.innerHTML = `<span style="color: #6366f1; font-weight: bold;">amrinder@portfolio:~$</span> ${escapeHTML(rawCmd)}`;
          inlineLog.appendChild(cmdLine);
          inlineInput.value = '';

          const lower = rawCmd.toLowerCase();
          executedTerminalCmdCount++;
          if (executedTerminalCmdCount >= 3) unlockAchievement('terminal_wizard');

          if (lower === 'clear') {
            inlineLog.innerHTML = '';
            return;
          }

          const resText = TERMINAL_COMMANDS[lower] || `Command not found: ${escapeHTML(rawCmd)}. Type <span class="text-accent">'help'</span> for commands.`;
          const resLine = document.createElement('div');
          resLine.style.cssText = 'color: #cbd5e1; margin-bottom: 10px; white-space: pre-wrap;';
          resLine.innerHTML = resText;
          inlineLog.appendChild(resLine);
          inlineLog.scrollTop = inlineLog.scrollHeight;
        }
      });
    }
  }

  const termOverlay = document.getElementById('retro-terminal-overlay');
  if (termOverlay) {
    const isActive = termOverlay.classList.contains('active') || termOverlay.style.display === 'flex';
    if (isActive) hideModal(termOverlay);
    else showModal(termOverlay);
  }
}

function handleTerminalInput(e) {
  const input = document.getElementById('terminal-cmd-input');
  const outputBox = document.getElementById('terminal-output-log');

  if (!input || !outputBox) return;

  if (e.key === 'Enter') {
    const rawCmd = input.value.trim();
    if (!rawCmd) return;

    cmdHistory.push(rawCmd);
    cmdHistoryIdx = cmdHistory.length;

    // Render command prompt entry
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line term-cmd';
    cmdLine.innerHTML = `<span class="term-prompt">amrinder@portfolio:~$</span> ${escapeHTML(rawCmd)}`;
    outputBox.appendChild(cmdLine);

    input.value = '';

    const lower = rawCmd.toLowerCase();
    executedTerminalCmdCount++;

    if (executedTerminalCmdCount >= 3) {
      unlockAchievement('terminal_wizard');
    }

    if (lower === 'clear') {
      outputBox.innerHTML = '';
      return;
    }

    if (lower === 'matrix') {
      toggleMatrixRain();
      const resLine = document.createElement('div');
      resLine.className = 'term-line term-res';
      resLine.innerHTML = 'Toggled Matrix Rain Mode 🟢';
      outputBox.appendChild(resLine);
      outputBox.scrollTop = outputBox.scrollHeight;
      return;
    }

    if (lower === '73' || lower === 'sheldon') {
      unlockAchievement('bazinga');
    }

    if (lower === 'open_diag') {
      openDiagnosticModal();
      return;
    }

    const resText = TERMINAL_COMMANDS[lower] || `Command not found: ${escapeHTML(rawCmd)}. Type <span class="text-accent">'help'</span> for a list of valid commands.`;

    const resLine = document.createElement('div');
    resLine.className = 'term-line term-res';
    resLine.innerHTML = resText;
    outputBox.appendChild(resLine);

    outputBox.scrollTop = outputBox.scrollHeight;
  } else if (e.key === 'ArrowUp') {
    if (cmdHistory.length > 0 && cmdHistoryIdx > 0) {
      cmdHistoryIdx--;
      input.value = cmdHistory[cmdHistoryIdx];
    }
  } else if (e.key === 'ArrowDown') {
    if (cmdHistoryIdx < cmdHistory.length - 1) {
      cmdHistoryIdx++;
      input.value = cmdHistory[cmdHistoryIdx];
    } else {
      cmdHistoryIdx = cmdHistory.length;
      input.value = '';
    }
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}


// Secret Matrix Rain Engine for Terminal
let matrixInterval = null;
function toggleMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
    canvas.style.display = 'none';
    return;
  }

  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZAMRINDER';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(10, 13, 20, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#10b981';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 33);
}


// ==========================================================================
// 7. RANDOM AMRINDER FACT GENERATOR
// ==========================================================================
const AMRINDER_FACTS = [
  "Amrinder believes Test Cricket is the only true form of cricket. T20 is fine, but Test cricket has soul. 🏏",
  "His code compiles on the first try approximately 42% of the time. The other 58% is spent looking for a missing semicolon. 😂",
  "He once spent 3 consecutive hours reading Wikipedia articles on quantum entanglement at 2:15 AM.",
  "He prefers dark mode everywhere. Light mode is basically a solar flare to the eyes.",
  "His favorite number is 73 because of Sheldon Cooper's explanation on Big Bang Theory.",
  "He has built endpoint automation scripts that saved hundreds of hours of manual IT work.",
  "He believes every developer has at least one project that was built solely to automate a 10-second task.",
  "He respects anyone who can explain complex tech concepts in plain English without jargon.",
  "If you ask him about black holes, be prepared for a 20-minute lecture on event horizons.",
  "He believes caffeine converts directly into PowerShell scripts.",
  "He thinks Leonard Hofstadter is the most relatable character in sitcom history.",
  "His terminal prompt theme is meticulously customized to look cool even when doing nothing.",
  "He has won 6 On-the-Spot Recognition awards for enterprise IT problem solving.",
  "He built this portfolio intro gate just to see if visitors would actually code 'Hello Amrinder'.",
  "He believes that the best code is the code you didn't have to write."
];

function showRandomFact() {
  const box = getSandboxOutputBox();
  if (!box) return;

  const idx = Math.floor(Math.random() * AMRINDER_FACTS.length);
  const fact = AMRINDER_FACTS[idx];

  box.innerHTML = `
    <div class="fact-card reveal-zoom-in">
      <div class="fact-header"><i class="fas fa-lightbulb text-accent"></i> AMRINDER FACT #${idx + 1}</div>
      <p class="fact-text">"${fact}"</p>
    </div>
  `;
}


// ==========================================================================
// 8. KONAMI CODE LISTENER (↑ ↑ ↓ ↓ ← → ← → B A)
// ==========================================================================
function initKonamiCodeEngine() {
  const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const expectedKey = konamiPattern[konamiIndex].toLowerCase();

    if (key === expectedKey) {
      konamiIndex++;
      if (konamiIndex === konamiPattern.length) {
        konamiIndex = 0;
        activateKonamiCheat();
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Global key listener for ~ key to open terminal
  document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      toggleTerminal();
    }
  });
}

function activateKonamiCheat() {
  unlockAchievement('bazinga');
  showAchievementToast({
    id: 'konami_cheat',
    title: 'CHEAT CODE ACTIVATED 🌟',
    subtitle: 'Unlimited Curiosity Enabled! (Konami Code Discovered)',
    icon: 'fa-star'
  });

  launchStarfieldBurst();
}

function launchStarfieldBurst() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
  }

  let frames = 0;
  function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of stars) {
      s.x += s.vx;
      s.y += s.vy;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
    }
    frames++;
    if (frames < 90) {
      requestAnimationFrame(anim);
    } else {
      canvas.remove();
    }
  }
  anim();
}


function closeAllModals() {
  document.querySelectorAll('.modal-overlay, .retro-terminal-overlay').forEach(m => {
    hideModal(m);
  });
  diagTimeouts.forEach(t => clearTimeout(t));
  diagTimeouts = [];
}

// Explicitly bind all triggers to window scope immediately
window.openDiagnosticModal = openDiagnosticModal;
window.closeDiagnosticModal = closeDiagnosticModal;
window.runDiagnosticScan = runDiagnosticScan;
window.openCricketModal = openCricketModal;
window.closeCricketModal = closeCricketModal;
window.selectSpaceChoice = selectSpaceChoice;
window.openNerdDetectorModal = openNerdDetectorModal;
window.closeNerdDetectorModal = closeNerdDetectorModal;
window.calculateNerdLevel = calculateNerdLevel;
window.toggleTerminal = toggleTerminal;
window.showRandomFact = showRandomFact;
window.openAchievementsModal = openAchievementsModal;
window.closeAchievementsModal = closeAchievementsModal;
window.closeGrandTrophyModal = closeGrandTrophyModal;
window.closeAllModals = closeAllModals;
window.toggleMatrixRain = toggleMatrixRain;
window.unlockAchievement = unlockAchievement;

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateAchievementCounterBadge();
  initKonamiCodeEngine();

  // Attach listener to terminal input
  const termInput = document.getElementById('terminal-cmd-input');
  if (termInput) {
    termInput.addEventListener('keydown', handleTerminalInput);
  }

  // Backdrop click listener to close modals when clicking outside modal container
  document.querySelectorAll('.modal-overlay, .retro-terminal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Global key listener for Escape key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
});
