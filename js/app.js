/**
 * Main Application Script for Amrinder Pal Singh Portfolio
 * Renders data from data.js, handles project filtering, modals, themes, copy utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHeroData();
  renderStatsData();
  renderAboutData();
  renderExperienceData();
  renderProjectsData();
  renderSkillsData();
  renderEducationData();
  renderCertificationsData();
  renderAwardsData();
  renderBeyondData();
  renderContactData();
  initModalListeners();
  initFormHandling();
  
  if (window.refreshScrollReveal) {
    window.refreshScrollReveal();
  }
});

/* ==========================================================================
   1. THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  
  setTheme(savedTheme);
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* ==========================================================================
   2. HERO RENDER
   ========================================================================== */
function renderHeroData() {
  const profile = PORTFOLIO_DATA.profile;
  if (!profile) return;
  
  const statusEl = document.getElementById('hero-status-badge');
  if (statusEl) statusEl.textContent = profile.statusBadge;
  
  const nameEl = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = profile.brandName || "Amrinder";
  
  const descEl = document.getElementById('hero-desc');
  if (descEl) descEl.textContent = profile.bioShort;
  
  const avatarEl = document.getElementById('hero-avatar');
  if (avatarEl) {
    avatarEl.src = profile.avatarUrl;
    avatarEl.alt = profile.name;
  }
  
  // Hero Badges
  const chip1 = document.getElementById('hero-chip-1');
  if (chip1 && PORTFOLIO_DATA.heroBadges[0]) {
    chip1.innerHTML = `<i class="fas fa-${PORTFOLIO_DATA.heroBadges[0].icon} text-accent"></i> ${PORTFOLIO_DATA.heroBadges[0].text}`;
  }
  const chip2 = document.getElementById('hero-chip-2');
  if (chip2 && PORTFOLIO_DATA.heroBadges[1]) {
    chip2.innerHTML = `<i class="fas fa-${PORTFOLIO_DATA.heroBadges[1].icon} text-accent"></i> ${PORTFOLIO_DATA.heroBadges[1].text}`;
  }

  // Social Links
  const socialsContainer = document.getElementById('hero-socials');
  if (socialsContainer && profile.socials) {
    socialsContainer.innerHTML = profile.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="${s.name}">
        <i class="fab fa-${s.icon === 'mail' ? 'envelope' : s.icon}"></i>
      </a>
    `).join('');
  }
}

/* ==========================================================================
   3. STATS RENDER WITH HUMOROUS HOVER TOOLTIPS
   ========================================================================== */
function renderStatsData() {
  const container = document.getElementById('stats-grid');
  if (!container || !PORTFOLIO_DATA.stats) return;
  
  const tooltips = [
    "That's longer than some of my fictional cricket careers.",
    "Four projects. Zero client names. Confidentiality > flexing.",
    "Unfortunately, none of them came with an IPL trophy.",
    "Microsoft Intune, SCCM/MECM, VMware Workspace ONE"
  ];

  container.innerHTML = PORTFOLIO_DATA.stats.map((st, idx) => `
    <div class="stat-card reveal-on-scroll reveal-fade-up delay-${(idx % 4) + 1}" title="${tooltips[idx] || ''}">
      <div class="stat-number-wrapper" data-count="${st.number}" data-suffix="${st.suffix}">0</div>
      <div class="stat-label">${st.label}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   4. ABOUT RENDER
   ========================================================================== */
function renderAboutData() {
  const paragraphsContainer = document.getElementById('about-paragraphs');
  if (paragraphsContainer && PORTFOLIO_DATA.profile.bioLong) {
    paragraphsContainer.innerHTML = PORTFOLIO_DATA.profile.bioLong.map(p => `
      <p>${p}</p>
    `).join('');
  }
  
  const highlightsContainer = document.getElementById('highlights-grid');
  if (highlightsContainer && PORTFOLIO_DATA.highlights) {
    highlightsContainer.innerHTML = PORTFOLIO_DATA.highlights.map((h, idx) => `
      <div class="highlight-card reveal-on-scroll reveal-fade-up delay-${(idx % 3) + 1}">
        <div class="highlight-header">
          <div class="highlight-icon">
            <i class="fas fa-${h.icon}"></i>
          </div>
          <h4>${h.title}</h4>
        </div>
        <p>${h.description}</p>
        <div class="tag-cloud">
          ${h.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   5. WORK EXPERIENCE RENDER
   ========================================================================== */
function renderExperienceData() {
  const container = document.getElementById('timeline-container');
  if (!container || !PORTFOLIO_DATA.experience) return;
  
  container.innerHTML = PORTFOLIO_DATA.experience.map((exp, idx) => `
    <div class="timeline-item reveal-on-scroll reveal-slide-left delay-${(idx % 3) + 1}">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-company">${exp.company}</span>
          </div>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <p class="timeline-desc">${exp.description}</p>
        ${exp.responsibilities && exp.responsibilities.length ? `
          <ul class="timeline-achievements">
            ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>
        ` : ''}
        <div class="tag-cloud">
          ${exp.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. PROJECTS RENDER & MODAL HANDLER
   ========================================================================== */
function renderProjectsData() {
  const grid = document.getElementById('projects-grid');
  const filterContainer = document.getElementById('filter-bar');
  if (!grid || !PORTFOLIO_DATA.projects) return;
  
  const categories = ['all', ...new Set(PORTFOLIO_DATA.projects.map(p => p.category))];
  if (filterContainer) {
    filterContainer.innerHTML = categories.map(cat => {
      const label = cat === 'all' ? 'All Projects' : 
        (PORTFOLIO_DATA.projects.find(p => p.category === cat)?.categoryLabel || cat);
      return `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
          ${label}
        </button>
      `;
    }).join('');
    
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterProjects(e.target.getAttribute('data-filter'));
      });
    });
  }
  
  grid.innerHTML = PORTFOLIO_DATA.projects.map((p, idx) => `
    <div class="project-card reveal-on-scroll reveal-zoom-in delay-${(idx % 3) + 1}" data-category="${p.category}">
      <div class="card-shine"></div>
      <div class="project-image-wrapper">
        <img src="${p.image}" alt="${p.title}" class="project-image" loading="lazy" />
        <div class="project-overlay">
          <button class="btn btn-primary btn-sm view-details-btn" onclick="openProjectModal('${p.id}')">
            <i class="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>
      <div class="project-body">
        <span class="project-category">${p.categoryLabel}</span>
        <h3 class="project-title">${p.title}</h3>
        <div class="project-subtitle">${p.subtitle}</div>
        <p class="project-desc">${p.shortDesc}</p>
        <div class="project-footer">
          <div class="tag-cloud">
            ${p.tags.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
      setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.8)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}

/* ==========================================================================
   7. SKILLS RENDER (CHIPS WITHOUT PERCENTAGES)
   ========================================================================== */
function renderSkillsData() {
  const container = document.getElementById('skills-grid');
  if (!container || !PORTFOLIO_DATA.skillsCategorized) return;
  
  container.innerHTML = PORTFOLIO_DATA.skillsCategorized.map((cat, idx) => `
    <div class="skill-category-card reveal-on-scroll reveal-fade-up delay-${(idx % 4) + 1}">
      <div class="category-header">
        <div class="category-icon">
          <i class="fas fa-${cat.icon}"></i>
        </div>
        <h3>${cat.category}</h3>
      </div>
      <div class="skill-chips-container">
        ${cat.items.map(item => `
          <span class="skill-chip">${item}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   8. EDUCATION & CERTIFICATIONS RENDER
   ========================================================================== */
function renderEducationData() {
  const eduContainer = document.getElementById('education-list');
  if (eduContainer && PORTFOLIO_DATA.education) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map((edu, idx) => `
      <div class="timeline-item reveal-on-scroll reveal-fade-up delay-${idx + 1}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${edu.degree}</h3>
              <span class="timeline-company">${edu.institution}</span>
            </div>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <p class="timeline-desc">${edu.description}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderCertificationsData() {
  const certContainer = document.getElementById('certs-grid');
  if (certContainer && PORTFOLIO_DATA.certifications) {
    certContainer.innerHTML = PORTFOLIO_DATA.certifications.map((c, idx) => `
      <div class="cert-card reveal-on-scroll reveal-fade-up delay-${(idx % 3) + 1}">
        <div class="cert-icon">
          <i class="fas fa-certificate"></i>
        </div>
        <div class="cert-details">
          <h4>${c.title}</h4>
          <span>${c.issuer} ${c.date ? '• ' + c.date : ''}</span>
          ${c.status ? `<div class="badge" style="margin-top:6px;">${c.status}</div>` : ''}
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   9. AWARDS RENDER
   ========================================================================== */
function renderAwardsData() {
  const container = document.getElementById('awards-grid');
  if (!container || !PORTFOLIO_DATA.awards) return;
  
  container.innerHTML = PORTFOLIO_DATA.awards.map((aw, idx) => `
    <div class="award-card reveal-on-scroll reveal-fade-up delay-${idx + 1}">
      <div class="award-icon-box">
        <i class="fas fa-${aw.icon}"></i>
      </div>
      <h3>${aw.title}</h3>
      <p>${aw.subtitle}</p>
      <span class="award-period">${aw.period}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   10. BEYOND THE ENTERPRISE RENDER
   ========================================================================== */
function renderBeyondData() {
  const container = document.getElementById('beyond-grid');
  if (!container || !PORTFOLIO_DATA.beyondTheEnterprise) return;
  
  container.innerHTML = PORTFOLIO_DATA.beyondTheEnterprise.map((item, idx) => `
    <div class="beyond-card reveal-on-scroll reveal-fade-up delay-${(idx % 3) + 1}">
      <div class="beyond-icon-box">
        <i class="fas fa-${item.icon}"></i>
      </div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="tag-cloud">
        ${item.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   11. CONTACT DATA & COPY UTILITIES
   ========================================================================== */
function renderContactData() {
  const emailEl = document.getElementById('contact-email-link');
  if (emailEl) {
    emailEl.href = `mailto:${PORTFOLIO_DATA.profile.email}`;
    emailEl.textContent = PORTFOLIO_DATA.profile.email;
  }
  
  const locEl = document.getElementById('contact-location-text');
  if (locEl) locEl.textContent = PORTFOLIO_DATA.profile.location;
  
  const phoneRow = document.getElementById('contact-phone-row');
  const phoneEl = document.getElementById('contact-phone-text');
  if (phoneRow && phoneEl) {
    if (PORTFOLIO_DATA.profile.showPhone && PORTFOLIO_DATA.profile.phone) {
      phoneEl.textContent = PORTFOLIO_DATA.profile.phone;
    } else {
      phoneRow.style.display = 'none';
    }
  }
}

/* ==========================================================================
   12. PROJECT DETAIL MODAL DIALOG
   ========================================================================== */
function initModalListeners() {
  const overlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openProjectModal = function(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;
  
  const modal = document.getElementById('project-modal');
  const imgEl = document.getElementById('modal-img');
  const titleEl = document.getElementById('modal-title');
  const subtitleEl = document.getElementById('modal-subtitle');
  const descEl = document.getElementById('modal-desc');
  const featuresEl = document.getElementById('modal-features');
  const tagsEl = document.getElementById('modal-tags');

  if (imgEl) imgEl.src = project.image;
  if (titleEl) titleEl.textContent = project.title;
  if (subtitleEl) subtitleEl.textContent = project.subtitle;
  if (descEl) descEl.textContent = project.fullDesc;
  
  // Inject "Why I Built It" if available
  let whyBox = document.getElementById('modal-why-box');
  if (!whyBox) {
    whyBox = document.createElement('div');
    whyBox.id = 'modal-why-box';
    whyBox.className = 'why-card';
    descEl.parentNode.insertBefore(whyBox, featuresEl.parentNode);
  }
  if (project.whyIBuiltIt) {
    whyBox.innerHTML = `<strong>Why I Built It:</strong> ${project.whyIBuiltIt}`;
    whyBox.style.display = 'block';
  } else {
    whyBox.style.display = 'none';
  }
  
  if (featuresEl && project.keyFeatures) {
    featuresEl.innerHTML = project.keyFeatures.map(f => `<li>${f}</li>`).join('');
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

/* ==========================================================================
   13. FORM HANDLING, MAILTO & TOASTS
   ========================================================================== */
function initFormHandling() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      showToast('Sending message to Amrinder...');
    });
  }
}

window.sendViaMailto = function() {
  const name = document.getElementById('form-name')?.value || '';
  const email = document.getElementById('form-email')?.value || '';
  const message = document.getElementById('form-message')?.value || '';
  
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Website Visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  
  window.location.href = `mailto:sidhuamrinderpal@gmail.com?subject=${subject}&body=${body}`;
};

window.copyToClipboard = function(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`Failed to copy.`);
  });
};

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
