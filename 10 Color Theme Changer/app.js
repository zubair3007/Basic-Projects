  document.addEventListener('DOMContentLoaded', () => {
      // Available themes
      const themes = ['theme-light', 'theme-dark', 'theme-blue'];

      // Load saved theme from localStorage or default to light
      const savedTheme = localStorage.getItem('theme') || 'theme-light';
      document.body.classList.add(savedTheme);

      // Theme switcher function
      function switchTheme(theme) {
        // Remove all theme classes
        themes.forEach(t => document.body.classList.remove(t));
        // Add selected theme
        document.body.classList.add(theme);
        // Save to localStorage
        localStorage.setItem('theme', theme);
      }

      // Add event listeners to buttons
      document.getElementById('lightBtn').addEventListener('click', () => switchTheme('theme-light'));
      document.getElementById('darkBtn').addEventListener('click', () => switchTheme('theme-dark'));
      document.getElementById('blueBtn').addEventListener('click', () => switchTheme('theme-blue'));

  });