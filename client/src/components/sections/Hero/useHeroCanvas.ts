import React, { useEffect } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isWhite: boolean;     // false = red accent
  baseAlpha: number;
}

/**
 * useHeroCanvas — hook to manage the interactive particle field in the Hero section.
 * Optimized with device-pixel-ratio awareness and mobile-bypass.
 */
export function useHeroCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Disable canvas particles on mobile to improve TBT & LCP

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cs = getComputedStyle(document.documentElement);
    const accentPrimary = cs.getPropertyValue("--accent-primary").trim() || "#EF4444";

    let w = 0, h = 0;

    /* ── Mouse tracking ── */
    let mx = -9999, my = -9999;
    const MOUSE_RADIUS = 140;         // interaction zone
    const MOUSE_FORCE = 2.8;         // push strength

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mx = -9999; my = -9999; };

    /* Listen on the section (not canvas) so hover works even over content */
    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave, { passive: true });

    /* ── Particles ── */
    const COUNT = isMobile ? 35 : 85;
    const CONNECT_DIST = isMobile ? 60 : 90;
    const dots: Dot[] = [];

    const initDots = () => {
      dots.length = 0;
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 0.8 + Math.random() * 1.2,
          isWhite: Math.random() < 0.35,
          baseAlpha: 0.12 + Math.random() * 0.18,
        });
      }
    };

    /* ── Draw & update particles ── */
    const drawDots = () => {
      for (const d of dots) {
        /* Mouse repulsion */
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          d.vx += (dx / dist) * force * 0.15;
          d.vy += (dy / dist) * force * 0.15;
        }

        /* Velocity damping */
        d.vx *= 0.985;
        d.vy *= 0.985;

        /* Move */
        d.x += d.vx;
        d.y += d.vy;

        /* Wrap edges */
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;

        /* Draw dot with glow effect */
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        // Create radial gradient for glow
        const gradient = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2.5);
        if (d.isWhite) {
          gradient.addColorStop(0, `rgba(255,255,255,${d.baseAlpha * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255,255,255,${d.baseAlpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(255,255,255,0)');
        } else {
          gradient.addColorStop(0, `rgba(239,68,68,${d.baseAlpha * 0.6})`);
          gradient.addColorStop(0.5, `rgba(239,68,68,${d.baseAlpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(239,68,68,0)');
        }
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      /* Connection lines between nearby particles */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d = dx * dx + dy * dy;
          if (d < CONNECT_DIST * CONNECT_DIST) {
            const dist = Math.sqrt(d);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            // mix: if either is white → white line, else red
            const isW = dots[i].isWhite || dots[j].isWhite;
            ctx.strokeStyle = isW ? "rgba(255,255,255,0.06)" : accentPrimary;
            // Add subtle pulse animation to connections
            const pulseAmount = Math.sin(performance.now() * 0.002) * 0.05;
            ctx.globalAlpha = (1 - dist / CONNECT_DIST) * (0.14 + pulseAmount);
            ctx.lineWidth = 0.4;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    /* ── Canvas sizing ── */
    const resize = () => {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    };
    resize();

    /* ── Animation loop ── */
    let rafId: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      drawDots();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canvasRef, sectionRef]);
}
