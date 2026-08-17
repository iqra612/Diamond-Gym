import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` when the element
 * enters the viewport. Returns { ref, displayValue }.
 */
export function useCounter(target, duration = 2000) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();
        const tick = (now) => {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out-quart
          const ease = 1 - Math.pow(1 - progress, 4);
          setValue(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
