"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 42;
const DRIFT_SPEED = 0.05;

type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
};

export function AmbientDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let particles: Particle[] = [];
    let animationFrameId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(ratio, ratio);
      particles = createParticles(window.innerWidth, window.innerHeight);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(13,13,13,${particle.opacity})`;
        context.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.4 + Math.random() * 0.9,
      opacity: 0.04 + Math.random() * 0.09,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: -DRIFT_SPEED - Math.random() * DRIFT_SPEED,
    });
  }
  return particles;
}
