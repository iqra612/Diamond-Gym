import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a ref element.
 * Adds "animated" class when the element enters the viewport.
 */
export function useScrollAnimation(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => el.classList.add('animated'), delay);
        observer.unobserve(el);
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
