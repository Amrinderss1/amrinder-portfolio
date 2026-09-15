/**
 * Interactive Landing Gate, Code Execution Engine, Text-to-Speech & Easter Eggs
 * For Amrinder Pal Singh Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initConsoleEasterEgg();
  initKonamiCode();
  initTextToSpeech();
  initInteractiveGate();
});

/* ==========================================================================
   1. DEVTOOLS CONSOLE EASTER EGG
   ========================================================================== */
function initConsoleEasterEgg() {
  console.log(
    "%cHey, you opened DevTools. 👀", 
    "font-size: 18px; font-weight: bold; color: #6366f1; background: #0a0d14; padding: 6px 12px; border-radius: 4px;"
  );
  console.log(
    "%cLooking for secrets? Good luck. Also... Hello Amrinder :D", 
    "font-size: 14px; font-weight: 600; color: #06b6d4;"
  );
  console.log(
    "%cIf you're reading this, you're probably a developer. You could have just enjoyed the website. But no. You had to inspect it. I respect that. ✊", 
    "font-size: 12px; color: #94a3b8; font-style: italic;"
  );
}

/* ==========================================================================
   2. TEXT-TO-SPEECH (TTS) SOOTHING FEMALE VOICE ENGINE (EN-IN PREFERRED)
   ========================================================================== */
let isSpeechEnabled = false;
let currentUtterance = null;
let preferredIndianVoice = null;

function initTextToSpeech() {
  const ttsBtn = document.getElementById('tts-toggle-btn');
  const gateTtsBtn = document.getElementById('gate-tts-btn');

  // Load voices asynchronously if needed
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadPreferredVoice();
    };
    loadPreferredVoice();
  }

  function toggleTTS() {
    isSpeechEnabled = !isSpeechEnabled;
    updateTTSButtons();

    if (isSpeechEnabled) {
      speakText("Text to speech enabled. Welcome to Amrinder's space!");
    } else {
      stopSpeech();
    }
  }

  if (ttsBtn) ttsBtn.addEventListener('click', toggleTTS);
  if (gateTtsBtn) gateTtsBtn.addEventListener('click', toggleTTS);
}

function loadPreferredVoice() {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();

  // 1. Try Indian Female Voice (en-IN / Heera / Veena / Google English India)
  preferredIndianVoice = voices.find(v => 
    (v.lang === 'en-IN' || v.lang === 'en_IN' || v.name.includes('India') || v.name.includes('Heera') || v.name.includes('Veena')) &&
    !v.name.toLowerCase().includes('male')
  );

  // 2. Fallback to any soothing female English voice
  if (!preferredIndianVoice) {
    preferredIndianVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Victoria'))
    );
  }

  // 3. Fallback to any English voice
  if (!preferredIndianVoice) {
    preferredIndianVoice = voices.find(v => v.lang.startsWith('en'));
  }
}

function updateTTSButtons() {
  const btns = document.querySelectorAll('.tts-toggle-btn');
  btns.forEach(btn => {
    btn.classList.toggle('active', isSpeechEnabled);
    btn.innerHTML = isSpeechEnabled ? 
      '<i class="fas fa-volume-up text-accent"></i> Speech ON' : 
      '<i class="fas fa-volume-mute"></i> Speech OFF';
  });
}

window.speakText = function(text) {
  if (!('speechSynthesis' in window)) return;
  
  stopSpeech();

  if (!isSpeechEnabled) return;

  const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[#*_`]/g, '');

  currentUtterance = new SpeechSynthesisUtterance(cleanText);
  
  // Soothing, relaxed voice parameters
  currentUtterance.rate = 0.92;   // Slightly relaxed, natural pace
  currentUtterance.pitch = 1.05;  // Warm, friendly tone

  if (!preferredIndianVoice) loadPreferredVoice();
  if (preferredIndianVoice) {
    currentUtterance.voice = preferredIndianVoice;
  }

  window.speechSynthesis.speak(currentUtterance);
};

window.stopSpeech = function() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/* ==========================================================================
   3. KONAMI CODE EASTER EGG (↑ ↑ ↓ ↓ ← → ← → B A)
   ========================================================================== */
function initKonamiCode() {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const requiredKey = konamiSequence[konamiIndex].length === 1 ? 
      konamiSequence[konamiIndex].toLowerCase() : konamiSequence[konamiIndex];

    if (key === requiredKey) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        triggerKonamiEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function triggerKonamiEasterEgg() {
  const msg = "🚨 CHEAT CODE ACTIVATED! You discovered something that wasn't necessary. Which means... you belong here. 🚀";
  showToast(msg);
  speakText(msg);
  
  const glow = document.querySelector('.ambient-glow.glow-1');
  if (glow) {
    glow.style.transform = 'scale(2.5)';
    glow.style.background = 'radial-gradient(circle, #a855f7 0%, transparent 70%)';
    setTimeout(() => {
      glow.style.transform = '';
      glow.style.background = '';
    }, 3000);
  }
}

/* ==========================================================================
   4. AMRINDER.OS BOOT SEQUENCE & INTERACTIVE GATE ENGINE
   ========================================================================== */
let userIsTechie = false;

function initInteractiveGate() {
  const gateOverlay = document.getElementById('interactive-gate-overlay');
  if (!gateOverlay) return;

  if (sessionStorage.getItem('amrinder-gate-dismissed') === 'true') {
    gateOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    return;
  }

  document.body.style.overflow = 'hidden';
  runBootSequence();
}

window.skipIntroGate = function() {
  stopSpeech();
  const gateOverlay = document.getElementById('interactive-gate-overlay');
  if (gateOverlay) {
    gateOverlay.classList.add('gate-fade-out');
    setTimeout(() => {
      gateOverlay.style.display = 'none';
      document.body.style.overflow = 'auto';
      sessionStorage.setItem('amrinder-gate-dismissed', 'true');
    }, 500);
  }
};

function runBootSequence() {
  const logContainer = document.getElementById('boot-log-container');
  if (!logContainer) return;

  const logs = [
    { text: "Loading personality...", status: "✓" },
    { text: "Loading nerdiness...", status: "✓" },
    { text: "Loading cricket opinions...", status: "✓" },
    { text: "Loading unnecessary code...", status: "✓" },
    { text: "Loading curiosity...", status: "✓" },
    { text: "Loading sleep schedule...", status: "ERROR", error: true }
  ];

  logContainer.innerHTML = '';
  let index = 0;

  function typeLog() {
    if (index < logs.length) {
      const item = logs[index];
      const div = document.createElement('div');
      div.className = 'boot-log-line';
      div.innerHTML = `
        <span>${item.text}</span>
        <span class="${item.error ? 'status-error' : 'status-ok'}">${item.status}</span>
      `;
      logContainer.appendChild(div);
      index++;
      setTimeout(typeLog, 320);
    } else {
      setTimeout(showWelcomeScreen, 700);
    }
  }

  typeLog();
}

function showWelcomeScreen() {
  const bootStep = document.getElementById('gate-step-boot');
  const welcomeStep = document.getElementById('gate-step-welcome');
  
  if (bootStep) bootStep.style.display = 'none';
  if (welcomeStep) {
    welcomeStep.style.display = 'block';
    welcomeStep.classList.add('fade-in-content');

    const welcomeMsg = "Hi! You are currently talking to the web version of Amrinder. Before I let you into my little corner of the internet, tell me: are you a techie or not?";
    speakText(welcomeMsg);
  }
}

window.selectGatePath = function(path) {
  const welcomeStep = document.getElementById('gate-step-welcome');
  if (welcomeStep) welcomeStep.style.display = 'none';

  if (path === 'techie') {
    userIsTechie = true;
    const techieStep = document.getElementById('gate-step-techie');
    if (techieStep) {
      techieStep.style.display = 'block';
      techieStep.classList.add('fade-in-content');
      selectLanguage('python');
    }
  } else {
    userIsTechie = false;
    const nonTechieStep = document.getElementById('gate-step-nontechie');
    if (nonTechieStep) {
      nonTechieStep.style.display = 'block';
      nonTechieStep.classList.add('fade-in-content');

      speakText("Ah, the honest one! Don't worry, you don't need to prove anything. No compiler, no syntax errors, no terminal.");
    }
  }
};

/* ==========================================================================
   5. TECHIE PATH: STARTER TEMPLATES & EXECUTOR
   ========================================================================== */
const LANGUAGE_TEMPLATES = {
  python: {
    comment: "“Python. Good choice. You understand that life is already complicated enough.”",
    code: `# Write Python code to print: Hello Amrinder\n`,
    placeholder: `# Write your Python code here...`
  },
  c: {
    comment: "“Ah. C. You enjoy suffering.”",
    code: `// Write C code to print: Hello Amrinder\n#include <stdio.h>\n\nint main() {\n    // your code here\n    \n    return 0;\n}`,
    placeholder: `// Write your C code here...`
  },
  cpp: {
    comment: "“C++? Because apparently C wasn't complicated enough.”",
    code: `// Write C++ code to print: Hello Amrinder\n#include <iostream>\n\nint main() {\n    // your code here\n    \n    return 0;\n}`,
    placeholder: `// Write your C++ code here...`
  },
  java: {
    comment: "“Java. Somewhere, a developer is creating another public static void main.”",
    code: `// Write Java code to print: Hello Amrinder\npublic class Main {\n    public static void main(String[] args) {\n        // your code here\n    }\n}`,
    placeholder: `// Write your Java code here...`
  },
  assembly: {
    comment: "“ASSEMBLY?! Who hurt you? 😭 Are you actually going to write Assembly? Fine. I'll wait. No, seriously. I'll wait. (I have other things to do.)”",
    code: `; Assembly x86-64 (Expert Mode)\n; Intentionally disabled for browser safety.\n; Please switch to Python for instant verification!`,
    placeholder: `; Assembly not available in browser sandboxes.`,
    disabled: true
  }
};

let currentSelectedLang = 'python';

window.selectLanguage = function(langKey) {
  currentSelectedLang = langKey;
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langKey);
  });

  const langData = LANGUAGE_TEMPLATES[langKey];
  const commentEl = document.getElementById('lang-joke-comment');
  const editorEl = document.getElementById('code-editor-input');
  const runBtn = document.getElementById('run-code-btn');

  if (commentEl) {
    commentEl.textContent = langData.comment;
    speakText(langData.comment);
  }
  if (editorEl) {
    editorEl.value = langData.code;
    editorEl.placeholder = langData.placeholder;
    editorEl.disabled = !!langData.disabled;
  }
  if (runBtn) {
    runBtn.disabled = !!langData.disabled;
  }

  const outputEl = document.getElementById('compiler-output-terminal');
  if (outputEl) {
    outputEl.className = 'compiler-terminal';
    outputEl.innerHTML = '<span class="text-muted">> Waiting for code execution...</span>';
  }
};

window.executeVisitorCode = function() {
  const editorEl = document.getElementById('code-editor-input');
  const outputEl = document.getElementById('compiler-output-terminal');
  if (!editorEl || !outputEl) return;

  const userCode = editorEl.value.trim();
  outputEl.className = 'compiler-terminal running';
  outputEl.innerHTML = '<span class="text-accent">> Compiling & Executing...</span>';

  setTimeout(() => {
    validateCodeResult(currentSelectedLang, userCode, outputEl);
  }, 450);
};

function validateCodeResult(lang, code, outputEl) {
  let isSuccess = false;
  let realError = '';
  let humorousComment = '';
  let outputText = '';

  if (lang === 'python') {
    if (code.includes('print(') && code.includes('Hello Amrinder') && (code.endsWith(')') || code.includes(')\n') || code.includes(')\r'))) {
      isSuccess = true;
      outputText = 'Hello Amrinder';
    } else if (!code.includes(')')) {
      realError = 'SyntaxError: unexpected EOF while parsing (missing closing parenthesis)';
      humorousComment = '“Python has politely informed us that you made a mistake. Python is usually very nice. Please don\'t make Python angry.”';
    } else if (!code.includes('Hello Amrinder')) {
      const match = code.match(/print\(["'](.*?)["']\)/);
      outputText = match ? match[1] : 'Output string mismatch';
      realError = `Output mismatch. Expected: "Hello Amrinder", Received: "${outputText}"`;
      humorousComment = '“Come on bro, I thought you were a techie. Write print(\\"Hello Amrinder\\")!”';
    } else {
      realError = 'SyntaxError: invalid syntax';
      humorousComment = '“Python has politely informed us that you made a mistake. Python is usually very nice. Please don\'t make Python angry.”';
    }
  } 
  else if (lang === 'c') {
    if (code.includes('printf(') && code.includes('Hello Amrinder') && code.includes(';') && code.includes('main')) {
      isSuccess = true;
      outputText = 'Hello Amrinder';
    } else if (!code.includes(';')) {
      realError = 'error: expected \';\' before \'return\' or at end of statement';
      humorousComment = '“Compilation failed. Pointers or semicolons missing as usual in C!”';
    } else {
      realError = 'error: output string mismatch or missing main() entry point';
      humorousComment = '“Come on bro, I thought you were a techie.”';
    }
  } 
  else if (lang === 'cpp') {
    if ((code.includes('std::cout') || code.includes('cout')) && code.includes('Hello Amrinder') && code.includes('main')) {
      isSuccess = true;
      outputText = 'Hello Amrinder';
    } else {
      realError = 'error: fatal error: compilation failed in std::basic_ostream';
      humorousComment = '“Compilation failed. Congratulations. You have discovered why people don\'t casually choose C++.”';
    }
  } 
  else if (lang === 'java') {
    if ((code.includes('System.out.println') || code.includes('System.out.print')) && code.includes('Hello Amrinder') && code.includes('main')) {
      isSuccess = true;
      outputText = 'Hello Amrinder';
    } else {
      realError = 'Exception in thread "main" java.lang.Error: Unresolved compilation problem';
      humorousComment = '“Java has rejected your existence. Please check your syntax.”';
    }
  }

  if (isSuccess) {
    outputEl.className = 'compiler-terminal success';
    outputEl.innerHTML = `
      <div style="color: var(--success); font-weight: bold; margin-bottom: 6px;">✓ COMPILE SUCCESSFUL</div>
      <div style="color: var(--text-primary); font-family: var(--font-code); background: rgba(16,185,129,0.1); padding: 8px; border-radius: 4px; margin-bottom: 8px;">${outputText}</div>
      <div style="color: var(--accent-secondary); font-size: 0.9rem;">✓ OUTPUT VERIFIED — IDENTITY CONFIRMED. WELCOME, FELLOW NERD. 😎</div>
    `;

    speakText("Compile successful! Output verified. Identity confirmed. Welcome, fellow nerd!");
    setTimeout(showPlotTwistStep, 1300);
  } else {
    outputEl.className = 'compiler-terminal error';
    outputEl.innerHTML = `
      <div style="color: #ef4444; font-weight: bold; margin-bottom: 4px;">❌ COMPILATION / EXECUTION FAILED</div>
      <div style="color: #fca5a5; font-family: var(--font-code); font-size: 0.85rem; margin-bottom: 8px;">${realError}</div>
      <div style="color: var(--accent-secondary); font-style: italic; font-size: 0.9rem;">Amrinder says: ${humorousComment}</div>
    `;

    speakText(`Compilation failed. ${humorousComment}`);
  }
}

function showPlotTwistStep() {
  const techieStep = document.getElementById('gate-step-techie');
  const plotTwistStep = document.getElementById('gate-step-plottwist');

  if (techieStep) techieStep.style.display = 'none';
  if (plotTwistStep) {
    renderPlotTwistContent(true);
    plotTwistStep.style.display = 'block';
    plotTwistStep.classList.add('fade-in-content');
  }
}

window.showNonTechieTwist = function() {
  const nonTechieStep = document.getElementById('gate-step-nontechie');
  const plotTwistStep = document.getElementById('gate-step-plottwist');

  if (nonTechieStep) nonTechieStep.style.display = 'none';
  if (plotTwistStep) {
    renderPlotTwistContent(false);
    plotTwistStep.style.display = 'block';
    plotTwistStep.classList.add('fade-in-content');
  }
};

function renderPlotTwistContent(isTechie) {
  const plotTwistStep = document.getElementById('gate-step-plottwist');
  if (!plotTwistStep) return;

  if (isTechie) {
    plotTwistStep.innerHTML = `
      <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 12px;">Well caught. 😎</h2>
      <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 16px;">
        You actually passed! I suppose I have no choice but to let you in...
      </p>
      <div style="font-size: 1.5rem; font-weight: 800; color: #ef4444; margin: 16px 0; text-transform: uppercase;">
        WAIT. ✋
      </div>
      <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 12px;">
        You thought there was a secret Techie section, didn't you? There isn't. 😂
      </p>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.6;">
        There is only one website. I don't have enough time to build separate websites for techies and normal humans.<br><br>
        Besides, I'm not trying to become Howard Wolowitz. I'm Leonard Hofstadter. Nerd. But smarty nerd. 😎 Just wish Penny was reading this. XD<br><br>
        Anyway, congratulations! You've successfully wasted approximately 30 seconds of your life proving that you can print Hello Amrinder. 😂
      </p>
      <button class="btn btn-primary" onclick="showPersonalityScan()">
        ENTER AMRINDER'S SPACE <i class="fas fa-rocket"></i>
      </button>
    `;

    speakText("Well caught! You actually passed. I suppose I have no choice but to let you in. WAIT! You thought there was a secret Techie section? There isn't! Congratulations, you successfully wasted 30 seconds proving you can print Hello Amrinder!");
  } else {
    plotTwistStep.innerHTML = `
      <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 12px;">Welcome! ❤️</h2>
      <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 16px;">
        Before you celebrate, I have some news...
      </p>
      <div style="font-size: 1.5rem; font-weight: 800; color: #ef4444; margin: 16px 0; text-transform: uppercase;">
        WAIT. ✋
      </div>
      <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 12px;">
        There isn't a separate non-tech version either! 😂
      </p>
      <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.6;">
        I only built one website. Everyone gets the same Amrinder.<br><br>
        And do you know what the best part is? The techies actually wrote code and wasted 30 seconds of their life proving they can print Hello Amrinder! 😂 You were smart enough to just skip all of that. Respect! 🤝<br><br>
        Besides, I'm not trying to become Howard Wolowitz. I'm Leonard Hofstadter. Nerd, but smarty nerd. 😎 Just wish Penny was reading this. XD
      </p>
      <button class="btn btn-primary" onclick="showPersonalityScan()">
        ENTER AMRINDER'S SPACE <i class="fas fa-rocket"></i>
      </button>
    `;

    speakText("Welcome! Before you celebrate, there isn't a separate non-tech version either! And do you know what the best part is? The techies actually wrote code and wasted 30 seconds of their life proving they can print Hello Amrinder! You were smart enough to skip all that. Respect!");
  }
}

window.showPersonalityScan = function() {
  const plotTwistStep = document.getElementById('gate-step-plottwist');
  const personalityStep = document.getElementById('gate-step-personality');

  if (plotTwistStep) plotTwistStep.style.display = 'none';
  if (personalityStep) {
    personalityStep.style.display = 'block';
    personalityStep.classList.add('fade-in-content');

    speakText("One last thing. What brought you here?");
  }
};

const PERSONALITY_RESPONSES = {
  recruiter: "“A recruiter / professional! Welcome. The serious professional engineering credentials and career path are right inside.”",
  engineer: "“Ah, another engineer. We'll get along. We both pretend our code is clean. 🤝”",
  science: "“Excellent. We should probably discuss black holes, quantum mechanics, and cosmology for the next four hours. 🔭”",
  cricket: "“Now we're talking! 🏏 One important question: Dhoni or Kohli? ... Actually don't answer that. I don't want this website becoming a war zone. (Test cricket > all formats though!)”",
  random: "“Honestly? Respect. That's how most interesting discoveries begin. 🚀”"
};

window.selectPersonality = function(key) {
  const msgEl = document.getElementById('personality-response-msg');
  const enterBtn = document.getElementById('personality-enter-btn');

  const text = PERSONALITY_RESPONSES[key];
  if (msgEl) {
    msgEl.innerHTML = `<div class="why-card" style="margin-top: 16px; font-size: 1rem; border-color: var(--accent-primary);">${text}</div>`;
  }
  if (enterBtn) {
    enterBtn.style.display = 'inline-flex';
  }

  speakText(text);
};

window.enterAmrindersSpace = function() {
  skipIntroGate();
};
