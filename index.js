/* =========================================================
   LNCTU Notes — index.js
   Theme toggle with localStorage persistence.
   ========================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  var iconEl = toggleBtn.querySelector('.theme-icon');

  /** Sync the icon + aria-label with the current theme. */
  function paintToggle() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (iconEl) iconEl.textContent = isDark ? '☀️' : '🌙';
    toggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  paintToggle();

  toggleBtn.addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);

    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* localStorage blocked — fail silently */
    }

    paintToggle();
  });
})();

