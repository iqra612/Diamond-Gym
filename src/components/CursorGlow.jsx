import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let animId;

    const onMouseMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      cx = lerp(cx, tx, 0.12);
      cy = lerp(cy, ty, 0.12);
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 9998,
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,30,30,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        transition: 'opacity 0.3s ease',
        top: 0, left: 0, opacity: 0
      }}
      aria-hidden="true"
    />
  );
}
