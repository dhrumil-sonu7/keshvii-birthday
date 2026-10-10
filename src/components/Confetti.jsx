/**
 * Confetti.jsx
 * Canvas-based confetti, falling hearts, tiny cakes & balloons for the finale.
 * Uses requestAnimationFrame for 60 fps.
 */
import React, { useEffect, useRef } from 'react';

const COLORS = ['#ff6b8a', '#c96dd8', '#ffd700', '#ff9ecf', '#7dd3fc', '#fbbf24', '#a78bfa'];
const EMOJIS = ['💗', '🎂', '🎈', '💕', '🎉', '✨'];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(canvas, type) {
    this.canvas = canvas;
    this.type = type; // 'confetti' | 'emoji'
    this.reset(true);
  }

  reset(initial = false) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.x = randomBetween(0, w);
    this.y = initial ? randomBetween(-h, 0) : randomBetween(-60, -20);
    this.vx = randomBetween(-1.5, 1.5);
    this.vy = randomBetween(1.5, 4);
    this.rotation = randomBetween(0, 360);
    this.rotationSpeed = randomBetween(-4, 4);
    this.opacity = randomBetween(0.7, 1);

    if (this.type === 'confetti') {
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.w = randomBetween(5, 10);
      this.h = randomBetween(3, 6);
    } else {
      this.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      this.size = randomBetween(14, 22);
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.vx += randomBetween(-0.05, 0.05); // sway

    if (this.y > this.canvas.height + 30) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;

    if (this.type === 'confetti') {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    } else {
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
    }

    ctx.restore();
  }
}

function Confetti({ active = true }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(canvas, 'confetti'));
    }
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(canvas, 'emoji'));
    }
    particlesRef.current = particles;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="confetti-canvas" />;
}

export default Confetti;
