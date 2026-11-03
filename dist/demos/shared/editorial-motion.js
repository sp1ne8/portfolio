// Native scrolling stays in control; only the visible content is animated.
export function revealSections(selector) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold: .12});
  document.querySelectorAll(selector).forEach(element => {
    // Keep content already on screen stable when the module arrives.
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add('will-reveal');
    observer.observe(element);
  });
}
