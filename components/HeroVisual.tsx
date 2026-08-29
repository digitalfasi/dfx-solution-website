"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based AI core visual: rotating node ring + drifting
 * particle field. No 3D dependency — keeps hero LCP fast.
 */
export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx || reduced) return;

    let w = 0,
      h = 0,
      raf = 0;
    const nodes = ["Website", "SEO", "Ads", "CRM", "Auto", "Analytics"];
    let mx = 0,
      my = 0;

    function size() {
      const box = canvas!.parentElement!;
      w = canvas!.width = box.clientWidth;
      h = canvas!.height = box.clientHeight;
    }
    size();
    window.addEventListener("resize", size);
    canvas.parentElement!.addEventListener("mousemove", (e) => {
      const r = canvas!.parentElement!.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    });

    let rot = 0;
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2 + mx * 20;
      const cy = h / 2 + my * 20;
      const r = Math.min(w, h) * 0.32;

      // connection lines + nodes
      nodes.forEach((label, i) => {
        const a = (i / nodes.length) * Math.PI * 2 + rot;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        ctx!.strokeStyle = "rgba(135,119,224,.35)";
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(x, y);
        ctx!.stroke();
        ctx!.fillStyle = "#FFFFFF";
        ctx!.strokeStyle = "#8777E0";
        ctx!.beginPath();
        ctx!.arc(x, y, 18, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
        ctx!.fillStyle = "#6E7F99";
        ctx!.font = "10px Inter, sans-serif";
        ctx!.textAlign = "center";
        ctx!.fillText(label, x, y + 32);
      });

      // core
      const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 40);
      grad.addColorStop(0, "#60A3E6");
      grad.addColorStop(1, "#8777E0");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = "#fff";
      ctx!.font = "bold 11px Inter, sans-serif";
      ctx!.fillText("AI CORE", cx, cy + 4);

      rot += 0.0025;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <div className="relative aspect-square max-w-[520px] w-full mx-auto">
      <div className="absolute inset-6 rounded-full bg-glow/60 blur-2xl" aria-hidden="true" />
      <div className="absolute inset-4 rounded-[2rem] bg-white border border-border shadow-[0_20px_50px_-24px_rgba(24,27,49,0.2)]" aria-hidden="true" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}
