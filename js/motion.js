/* Motion helpers for web pages (css/motion.css). Works in every browser; without it the page simply
   shows everything.
   - .reveal and .reveal-group: fade up once they're well into view (a fifth of the block above the
    bottom fifth of the screen), once.
   - .site-header-sticky: gains a shadow once the page has scrolled. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduce && 'IntersectionObserver' in window) {
    // Only hide things once we know we can show them again.
    root.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
    // Each child of a group on its own, so stacked cards on phones still fade in one by one.
    document.querySelectorAll('.reveal, .reveal-group > *').forEach(function (el) { io.observe(el); });
  }

  var header = document.querySelector('.site-header-sticky');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
