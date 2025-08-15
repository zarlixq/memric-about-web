"use client";
import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const animRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const device = typeof window !== "undefined" ? (window.innerWidth < 640 ? "mobile" : "desktop") : "desktop";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w, h, stars;
    let starCount = device === "mobile" ? 60 : 140;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      // rebuild stars
      stars = new Array(starCount).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1 + 0.2, // depth
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // starfield
      for (const s of stars) {
        s.x += s.vx * s.z;
        s.y += s.vy * s.z;

        // parallax toward mouse
        s.x += (mouse.current.x - w / 2) * 0.00003 * (2 - s.z);
        s.y += (mouse.current.y - h / 2) * 0.00003 * (2 - s.z);

        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 255, 0.9)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.current.x = x;
      mouse.current.y = y;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 150}px, ${y - 150}px)`; // 300x300
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [device]);

  return (
    <>
      {/* Canvas yıldızlar */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 block"
        style={{ background: "linear-gradient(180deg, #0b0b0f 0%, #141018 100%)" }}
        aria-hidden
      />
      {/* Parmağı/imdeci takip eden aurora glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 -z-10 h-[300px] w-[300px] rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(60% 60% at 50% 50%, rgba(236,72,153,0.9) 0%, rgba(236,72,153,0.0) 70%)",
          transform: "translate(-9999px, -9999px)",
        }}
        aria-hidden
      />
    </>
  );
}
