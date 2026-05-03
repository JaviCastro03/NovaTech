

'use strict';

/* 
   DARK / LIGHT MODE
    */
(function initTheme() {
  // Recuperar preferencia guardada o usar preferencia del sistema
  const savedTheme = localStorage.getItem('nt-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-bs-theme', theme);
})();

function setTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('nt-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-bs-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

// Vincular todos los toggles de la página
document.addEventListener('DOMContentLoaded', function () {

  const toggles = document.querySelectorAll('#themeToggle, #dashThemeToggle');
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', toggleTheme);
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
      }
    });
  });

  /* 
     VALIDACIÓN FORMULARIO DE CONTACTO
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {

    // Actualizar display del rango de presupuesto
    const rangeInput  = document.getElementById('presupuesto');
    const budgetValue = document.getElementById('budgetValue');

    if (rangeInput && budgetValue) {
      rangeInput.addEventListener('input', function () {
        const val = parseInt(this.value, 10);
        budgetValue.textContent = val.toLocaleString('es-ES') + ' €';
        this.setAttribute('aria-valuenow', val);
      });
    }

    // Submit con validación Bootstrap
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        // Foco en el primer campo inválido para accesibilidad
        const firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Formulario válido — simular envío
      const submitBtn    = document.getElementById('submitBtn');
      const btnText      = submitBtn.querySelector('.btn-text');
      const btnSpinner   = submitBtn.querySelector('.btn-spinner');

      submitBtn.disabled = true;
      btnText.textContent = 'Enviando...';
      btnSpinner.classList.remove('d-none');

      setTimeout(function () {
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar mensaje';
        btnSpinner.classList.add('d-none');
        contactForm.reset();
        contactForm.classList.remove('was-validated');

        // Mostrar toast de éxito
        const toastEl = document.getElementById('successToast');
        if (toastEl) {
          const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
          toast.show();
        }
      }, 1800);
    });
  }

  /* 
     TOOLTIPS Bootstrap (Dashboard)
      */
  const tooltipEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipEls.forEach(function (el) {
    new bootstrap.Tooltip(el);
  });

  /* 
     NAVBAR — scroll activo
    */
  const navLinks = document.querySelectorAll('.nav-pill[href^="#"]');
  const sections = [];

  navLinks.forEach(function (link) {
    const id = link.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) sections.push({ link, sec });
  });

  if (sections.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          const active = sections.find(function (s) { return s.sec === entry.target; });
          if (active) active.link.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { observer.observe(s.sec); });
  }

  /* 
     ANIMACIONES de entrada con IntersectionObserver
   */
  const animatedEls = document.querySelectorAll('.nova-card, .kpi-card, .portfolio-item, .contact-card');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el, i) {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      fadeObserver.observe(el);
    });
  }

});
