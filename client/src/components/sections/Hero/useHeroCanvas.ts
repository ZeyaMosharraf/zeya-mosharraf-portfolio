import React, { useEffect } from "react";

interface GridTracer {
  x: number;
  y: number;
  speed: number;
  length: number;
  direction: 'right' | 'down';
  baseAlpha: number;
  lineCoord: number; // grid line coordinate (x for down, y for right)
}

/**
 * useHeroCanvas — hook to manage the cinematic orthogonal ETL data stream tracers in the Hero section background grid.
 * Optimized for HIGH-CONTRAST premium observability glows and peak 60fps GPU performance.
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

    let w = 0, h = 0;

    /* ── Telemetry Grid & Tracers ── */
    const GRID_SPACING = 85;
    const tracers: GridTracer[] = [];
    const TRACER_COUNT = 10; // Faint, highly restrained cinematic tracers

    const initTracers = () => {
      tracers.length = 0;
      for (let i = 0; i < TRACER_COUNT; i++) {
        const direction = Math.random() < 0.5 ? 'right' : 'down';
        const length = 50 + Math.random() * 80;
        const speed = 0.8 + Math.random() * 1.6;
        const baseAlpha = 0.35 + Math.random() * 0.25; // High-contrast opacity range
        
        if (direction === 'right') {
          // Select a random horizontal grid path row
          const gridRows = Math.floor(h / GRID_SPACING);
          const row = Math.floor(Math.random() * Math.max(1, gridRows));
          const lineCoord = row * GRID_SPACING + GRID_SPACING / 2;
          tracers.push({
            x: Math.random() * w,
            y: lineCoord,
            speed,
            length,
            direction,
            baseAlpha,
            lineCoord,
          });
        } else {
          // Select a random vertical grid path column
          const gridCols = Math.floor(w / GRID_SPACING);
          const col = Math.floor(Math.random() * Math.max(1, gridCols));
          const lineCoord = col * GRID_SPACING + GRID_SPACING / 2;
          tracers.push({
            x: lineCoord,
            y: Math.random() * h,
            speed,
            length,
            direction,
            baseAlpha,
            lineCoord,
          });
        }
      }
    };

    /* ── Draw & update telemetry tracers ── */
    const drawTracers = () => {
      // 1. Draw horizontal and vertical blueprint paths (barely visible for restrained depth)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.003)";
      ctx.lineWidth = 0.55;

      // Horizontal paths
      for (let y = GRID_SPACING / 2; y < h; y += GRID_SPACING) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      // Vertical paths
      for (let x = GRID_SPACING / 2; x < w; x += GRID_SPACING) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.stroke();

      // 2. Draw moving tracers
      for (const t of tracers) {
        if (t.direction === 'right') {
          t.x += t.speed;
          if (t.x - t.length > w) {
            t.x = -t.length;
            const gridRows = Math.floor(h / GRID_SPACING);
            t.y = t.lineCoord = Math.floor(Math.random() * Math.max(1, gridRows)) * GRID_SPACING + GRID_SPACING / 2;
          }
        } else {
          t.y += t.speed;
          if (t.y - t.length > h) {
            t.y = -t.length;
            const gridCols = Math.floor(w / GRID_SPACING);
            t.x = t.lineCoord = Math.floor(Math.random() * Math.max(1, gridCols)) * GRID_SPACING + GRID_SPACING / 2;
          }
        }

        // Draw dynamic comet trail gradient
        ctx.beginPath();
        let grad;
        if (t.direction === 'right') {
          grad = ctx.createLinearGradient(t.x - t.length, t.y, t.x, t.y);
          ctx.moveTo(t.x - t.length, t.y);
          ctx.lineTo(t.x, t.y);
        } else {
          grad = ctx.createLinearGradient(t.x, t.y - t.length, t.x, t.y);
          ctx.moveTo(t.x, t.y - t.length);
          ctx.lineTo(t.x, t.y);
        }

        // Vibrant high-contrast gradient comets (restrained deep reactor red)
        grad.addColorStop(0, "rgba(200, 35, 21, 0)");
        grad.addColorStop(0.8, `rgba(200, 35, 21, ${t.baseAlpha * 0.12})`);
        grad.addColorStop(1, `rgba(200, 35, 21, ${t.baseAlpha * 0.28})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Sub-pixel glowing telemetry head spark
        ctx.beginPath();
        const px = t.direction === 'right' ? t.x : t.lineCoord;
        const py = t.direction === 'down' ? t.y : t.lineCoord;
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 35, 21, ${t.baseAlpha * 0.4})`;
        ctx.shadowColor = "rgba(200, 35, 21, 0.3)";
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur immediately to guarantee uncompromised 60fps performance
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
      initTracers();
    };
    resize();

    /* ── Animation loop ── */
    let rafId: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      drawTracers();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, sectionRef]);
}
