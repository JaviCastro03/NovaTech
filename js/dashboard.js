

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /*
     TOAST DE NOTIFICACIÓN
      */
  const notifBtn  = document.getElementById('notifBtn');
  const notifToastEl = document.getElementById('notifToast');

  if (notifBtn && notifToastEl) {
    notifBtn.addEventListener('click', function () {
      const toast = new bootstrap.Toast(notifToastEl, { delay: 5000 });
      toast.show();
    });
  }

  /* 
     PROGRESS BARS — animación al entrar en viewport
      */
  const progressBars = document.querySelectorAll('.nova-progress .progress-bar');

  // Guardar el ancho target y poner a 0 inicialmente
  progressBars.forEach(function (bar) {
    const targetWidth = bar.style.width;
    bar.dataset.target = targetWidth;
    bar.style.width = '0%';
  });

  if ('IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.nova-progress .progress-bar');
          bars.forEach(function (bar) {
            setTimeout(function () {
              bar.style.width = bar.dataset.target;
            }, 200);
          });
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const progressSection = document.querySelector('.progress-list');
    if (progressSection) progressObserver.observe(progressSection);
  } else {
    // Fallback sin observer
    progressBars.forEach(function (bar) {
      bar.style.width = bar.dataset.target;
    });
  }

  /* 
     KPI COUNTER — animación de números
      */
  function animateCounter(el, target, duration, suffix) {
    const start    = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current.toLocaleString('es-ES') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const kpiObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Solo animar si no se ha animado ya
          if (entry.target.dataset.animated) return;
          entry.target.dataset.animated = 'true';

          const kpiValues = entry.target.querySelectorAll('.kpi-value');
          kpiValues.forEach(function (el) {
            const text = el.textContent;
            // Extraer número y sufijo
            const match = text.match(/^([\d,.]+)\s*(.*)$/);
            if (!match) return;

            const numStr = match[1].replace(/[.,]/g, '');
            const num    = parseInt(numStr, 10);
            const suffix = match[2] || '';

            if (!isNaN(num)) {
              animateCounter(el, num, 1200, ' ' + suffix);
            }
          });
        }
      });
    }, { threshold: 0.2 });

    const kpiGrid = document.querySelector('.kpi-grid');
    if (kpiGrid) kpiObserver.observe(kpiGrid);
  }

});
