// Simple helpers for year + nav active state
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // If you add serverless routing later, this can be extended
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('is-active', href === path);
  });

  const root = document.documentElement;
  const toggles = document.querySelectorAll('.theme-toggle');

  const storageKey = 'preferred-color-theme';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let storageAvailable = true;

  try {
    const testKey = '__theme-test__';
    localStorage.setItem(testKey, 'ok');
    localStorage.removeItem(testKey);
  } catch (err) {
    storageAvailable = false;
  }

  const getStoredTheme = () => {
    if (!storageAvailable) return null;
    const value = localStorage.getItem(storageKey);
    return value === 'light' || value === 'dark' ? value : null;
  };

  const storeTheme = theme => {
    if (!storageAvailable) return;
    localStorage.setItem(storageKey, theme);
  };

  const clearStoredTheme = () => {
    if (!storageAvailable) return;
    localStorage.removeItem(storageKey);
  };

  const updateToggleUI = theme => {
    const toDark = theme === 'light';
    const label = toDark ? 'Switch to dark theme' : 'Switch to light theme';
    toggles.forEach(btn => {
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      const icon = btn.querySelector('[data-theme-icon]');
      if (icon) icon.textContent = toDark ? 'dark_mode' : 'light_mode';
    });
  };

  const applyTheme = theme => {
    root.setAttribute('data-theme', theme);
    updateToggleUI(theme);
  };

  const storedTheme = getStoredTheme();
  const systemTheme = mediaQuery.matches ? 'dark' : 'light';
  applyTheme(storedTheme || systemTheme);

  const handleMediaChange = event => {
    if (getStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleMediaChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleMediaChange);
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      const latestSystem = mediaQuery.matches ? 'dark' : 'light';
      if (next === latestSystem) {
        clearStoredTheme();
      } else {
        storeTheme(next);
      }
    });
  });

  // Enable md buttons acting as links (Material Web components support href)
});
