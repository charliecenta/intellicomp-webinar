// Mobile menu toggle for .site-header. Load with <script src="js/nav.js" defer></script>.
// Adds .js to <html> so the menu collapses only when this script is running.
document.documentElement.classList.add('js');

document.querySelectorAll('.nav-toggle').forEach((button) => {
  const nav = document.getElementById(button.getAttribute('aria-controls'));
  if (!nav) return;
  const set = (open) => {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { set(false); button.focus(); }
  });
});
