/* =========================================================
   LNCTU Notes — software_engineering.js
   - Theme toggle (persisted)
   - Mobile navbar toggle
   - Active section highlighting on scroll
   ========================================================= */

(function () {
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');

  function paintTheme() {
    if (!themeBtn) return;
    var isDark = root.getAttribute('data-theme') === 'dark';
    var icon = themeBtn.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    themeBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  paintTheme();

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paintTheme();
    });
  }

  /* ---------- MOBILE NAVBAR ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 767) closeNav();
      });
    });
  }

  /* ---------- ACTIVE SECTION HIGHLIGHTING ---------- */
  var sections = document.querySelectorAll('.content-section[id]');
  var navAnchors = document.querySelectorAll('.nav-link');

  function setActive(id) {
    navAnchors.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', match);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- ESC closes mobile nav ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
})();