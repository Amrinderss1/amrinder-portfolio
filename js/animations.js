/**
 * Animation Engine & Visual FX Scripts
 * Handles Canvas particles, 3D card tilt, IntersectionObserver reveals, count-up stats, typewriter, and custom cursor.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initScrollReveal();
  initTypewriter();
  initCustomCursor();
  initCardTiltFX();
});

/* ==========================================================================
   1. AMBIENT INTERACTIVE PARTICLE CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });
  
  // Particle definition
  const numParticles = Math.min(Math.floor(width / 20), 65);
  const particles = [];
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.15
    });
  }
  
  function render() {
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    
    ctx.clearRect(0, 0, width, height);
    
    // Check dark/light mode for particle colors
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const pColor = isDark ? '99, 102, 241' : '79, 70, 229';
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pColor}, ${p.baseAlpha})`;
      ctx.fill();
      
      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${pColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      
      // Mouse interaction line
      const mDx = p.x - mouse.x;
      const mDy = p.y - mouse.y;
      const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
      if (mDist < 160) {
        const mAlpha = (1 - mDist / 160) * 0.35;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${mAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    requestAnimationFrame(render);
  }
  
  render();
}

/* ==========================================================================
   2. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Trigger skill bars animation if inside
        const skillFills = entry.target.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-level');
          if (targetWidth) fill.style.width = targetWidth + '%';
        });
        
        // Trigger counter animation if inside
        const statWrapper = entry.target.querySelector('[data-count]');
        if (statWrapper && !statWrapper.classList.contains('counted')) {
          animateCount(statWrapper);
        }
      }
    });
  }, observerOptions);
  
  // Attach to reveal elements
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Global hook to observe newly injected DOM elements
window.refreshScrollReveal = function() {
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        const skillFills = entry.target.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-level');
          if (targetWidth) fill.style.width = targetWidth + '%';
        });
        
        const statWrapper = entry.target.querySelector('[data-count]');
        if (statWrapper && !statWrapper.classList.contains('counted')) {
          animateCount(statWrapper);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach(el => observer.observe(el));
};

/* ==========================================================================
   3. ANIMATED COUNT-UP STATS
   ========================================================================== */
function animateCount(el) {
  el.classList.add('counted');
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easeProgress;
    
    el.textContent = (isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue)) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

/* ==========================================================================
   4. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const container = document.getElementById('typewriter-text');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.profile.roles) return;
  
  const roles = PORTFOLIO_DATA.profile.roles;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      container.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      container.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

/* ==========================================================================
   5. 3D CARD TILT & MOUSE SPOTLIGHT FX
   ========================================================================== */
function initCardTiltFX() {
  document.body.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .stat-card, .highlight-card, .skill-category-card');
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update specular shine variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // 3D tilt calculation for project cards
      if (card.classList.contains('project-card')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7; // Max 7 deg
        const rotateY = ((x - centerX) / centerX) * 7;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
      }
    });
  });
}

/* ==========================================================================
   6. CUSTOM MAGNETIC CURSOR ENGINE
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  
  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  function follow() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
    
    requestAnimationFrame(follow);
  }
  follow();
  
  // Scale up on interactive hover
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .project-card, .filter-btn, .theme-toggle-btn')) {
      document.body.classList.add('cursor-hover');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .project-card, .filter-btn, .theme-toggle-btn')) {
      document.body.classList.remove('cursor-hover');
    }
  });
}
