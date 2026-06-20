"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";





function useCountUp(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

function StatCounter({
  value,
  suffix,
  label,
  delay,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  started: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(value, 1400, active);
  return (
    <div className="stat-item" style={{ animationDelay: `${delay}ms` }}>
      <span className="stat-number">
        {count}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wordReveal {
          from { opacity: 0; transform: translateY(24px) skewY(2deg); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); filter: blur(0); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotate(0.3deg); }
          50%       { transform: translateY(-10px) rotate(-0.3deg); }
        }
        @keyframes dotDrift {
          0%, 100% { transform: translate(0, 0); }
          33%       { transform: translate(6px, -8px); }
          66%       { transform: translate(-5px, 5px); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(46,107,230,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(46,107,230,0); }
          100% { box-shadow: 0 0 0 0 rgba(46,107,230,0); }
        }
        @keyframes statSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePing {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes ringGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(46,107,230,0.4); }
          50%      { box-shadow: 0 0 0 7px rgba(46,107,230,0); }
        }

        /* ── Reset box-sizing ── */
        .hero-section *, .hero-section *::before, .hero-section *::after {
          box-sizing: border-box;
        }

        /* ── Base section ── */
        .hero-section {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: linear-gradient(180deg, #0B1F3A 0%, #0B1F3A 60%, #0A1A31 100%);
          width: 100%;
        }

        /* ── Dot grid ── */
        .dot-canvas {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0.045;
          background-image: radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: dotDrift 18s ease-in-out infinite;
        }

        /* ── Glow blobs ── */
        .blob-left {
          position: absolute; pointer-events: none;
          left: -60px; top: -60px; width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,107,230,0.18), transparent 68%);
          animation: dotDrift 14s ease-in-out infinite reverse;
        }
        .blob-right {
          position: absolute; pointer-events: none;
          right: -80px; top: 60px; width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,107,230,0.13), transparent 68%);
          animation: dotDrift 20s ease-in-out infinite;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          padding: 6px 16px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.1s;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .hero-badge:hover {
          border-color: rgba(46,107,230,0.4);
          background: rgba(46,107,230,0.1);
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          animation: badgePing 2.4s ease-in-out infinite;
        }
        .badge-text {
          font-family: monospace; font-size: 10.5px;
          letter-spacing: 0.18em; text-transform: uppercase; color: #B8CAE4;
          white-space: nowrap;
        }

        /* ── Headline ── */
        .hero-headline {
          margin: 24px 0 0 0;
          font-size: clamp(2.1rem, 4vw, 3.5rem);
          font-weight: 700; line-height: 1.08; letter-spacing: -0.025em; color: #fff;
        }
        .headline-word {
          display: inline-block; opacity: 0; margin-right: 0.22em;
          animation: wordReveal 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .headline-accent { color: #2e6be6; }

        /* ── Body copy ── */
        .hero-body {
          margin: 20px 0 0 0;
          font-size: 16px;
          line-height: 1.72; color: rgba(220,232,252,0.68);
          opacity: 0; animation: fadeUp 0.65s ease forwards 0.85s;
        }

        /* ── Proof pills ── */
        .proof-list {
          display: flex; flex-wrap: wrap; gap: 10px; margin: 24px 0 0 0;
          list-style: none; padding: 0;
        }
        .proof-pill {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05);
          padding: 8px 14px; font-size: 13px; color: rgba(220,232,252,0.75);
          opacity: 0; animation: fadeUp 0.5s ease forwards;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .proof-pill:hover {
          border-color: rgba(46,107,230,0.35);
          background: rgba(46,107,230,0.08);
          transform: translateY(-1px);
        }
        .proof-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #2e6be6; flex-shrink: 0;
        }

        /* ── CTA buttons ── */
        .cta-group {
          display: flex; flex-wrap: wrap; gap: 12px; margin: 32px 0 0 0;
          opacity: 0; animation: fadeUp 0.6s ease forwards 1.35s;
        }
        .btn-primary-hero {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 999px; padding: 13px 24px;
          font-size: 14px; font-weight: 700; color: #fff;
          background: linear-gradient(135deg, #2e6be6 0%, #1e4fba 100%);
          border: none; cursor: pointer; text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: pulseRing 3s ease-in-out 2.5s 3;
          white-space: nowrap;
        }
        .btn-primary-hero:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 28px rgba(37,99,235,0.48);
        }
        .btn-primary-hero:active { transform: scale(0.97); }
        .btn-primary-hero .btn-arrow { transition: transform 0.2s; }
        .btn-primary-hero:hover .btn-arrow { transform: translateX(3px); }

        .btn-secondary-hero {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 999px; padding: 13px 24px;
          font-size: 14px; font-weight: 600; color: #fff;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer; text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .btn-secondary-hero:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }
        .btn-secondary-hero .btn-arrow { transition: transform 0.2s; }
        .btn-secondary-hero:hover .btn-arrow { transform: translateX(2px); }

        /* ── Stats bar ── */
        .stats-bar {
          margin-top: 44px;
          display: flex; flex-wrap: wrap; gap: 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 28px;
        }
        .stat-item {
          flex: 1; min-width: 100px;
          padding: 0 16px 0 0;
          opacity: 0; animation: statSlideUp 0.55s ease forwards;
        }
        .stat-item:not(:last-child) {
          border-right: 1px solid rgba(255,255,255,0.07);
          margin-right: 16px;
        }
        .stat-item:hover .stat-number { color: #2e6be6; }
        .stat-number {
          display: block; font-size: 1.9rem; font-weight: 700;
          color: #fff; letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          transition: color 0.2s;
        }
        .stat-label {
          display: block; font-size: 12px;
          color: rgba(184,202,228,0.58); margin-top: 3px;
        }

        /* ── Layout wrapper ── */
        .hero-inner {
          position: relative; z-index: 10;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 40px 80px;
        }

        /* ── Two-column grid ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-start;
          gap: 60px;
          width: 100%;
        }

        /* Left column */
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }

        /* Right column */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          padding-top: 56px;
        }

        /* ── Image card ── */
        .card-wrap {
          position: relative;
          width: 100%;
          max-width: 540px;
          opacity: 0;
          animation: fadeIn 0.9s ease forwards 0.5s;
        }
        .card-glow {
          position: absolute; inset: -20px; border-radius: 36px;
          background: radial-gradient(circle at center, rgba(46,107,230,0.14), transparent 70%);
          filter: blur(20px); pointer-events: none;
        }
        .card-outer {
          position: relative; border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05); padding: 12px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.32);
          animation: floatCard 7s ease-in-out infinite 1.2s;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .card-outer:hover {
          border-color: rgba(46,107,230,0.3);
          box-shadow: 0 40px 96px rgba(0,0,0,0.4);
        }
        .card-image {
          position: relative; border-radius: 20px; overflow: hidden;
          background: #0E233F; aspect-ratio: 4 / 3;
          width: 100%;
        }
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(11,31,58,0.06) 0%, rgba(11,31,58,0.36) 100%);
          z-index: 1;
        }

        /* ── Floating badge on card ── */
        .card-badge {
          position: absolute; bottom: 24px; left: 24px; z-index: 10;
          display: flex; align-items: center; gap: 10px;
          background: rgba(11,31,58,0.82); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 14px;
          padding: 10px 16px;
          opacity: 0; animation: fadeUp 0.6s ease forwards 1.4s;
          transition: border-color 0.2s, background 0.2s;
        }
        .card-badge:hover {
          border-color: rgba(46,107,230,0.35);
          background: rgba(11,31,58,0.95);
        }
        .card-badge-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          background: linear-gradient(135deg, #2e6be6, #2e6be6);
          display: flex; align-items: center; justify-content: center;
          animation: ringGlow 3s ease-in-out infinite;
        }
        .card-badge-text strong {
          display: block; font-size: 12.5px; font-weight: 700; color: #fff;
        }
        .card-badge-text span {
          font-size: 11px; color: rgba(184,202,228,0.75);
        }

        /* ── Responsive: tablet ── */
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-inner {
            padding: 48px 24px 64px;
          }
          .hero-right {
            justify-content: center;
            padding-top: 0;
          }
          .card-wrap {
            max-width: 480px;
            margin: 0 auto;
          }
          .hero-headline {
            font-size: clamp(2rem, 6vw, 3rem);
          }
        }

        /* ── Responsive: mobile ── */
        @media (max-width: 640px) {
          .hero-inner {
            padding: 36px 16px 52px;
          }
          .hero-grid {
            gap: 32px;
          }
          .hero-headline {
            font-size: clamp(1.75rem, 7vw, 2.4rem);
          }
          .badge-text {
            font-size: 9px;
            letter-spacing: 0.12em;
          }
          .stats-bar {
            gap: 16px;
          }
          .stat-item:not(:last-child) {
            border-right: none;
            margin-right: 0;
            padding-right: 0;
          }
          .cta-group {
            width: 100%;
          }
          .btn-primary-hero,
          .btn-secondary-hero {
            flex: 1;
            justify-content: center;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-badge, .headline-word, .hero-body,
          .proof-pill, .cta-group, .card-wrap, .card-badge, .stat-item {
            animation: fadeIn 0.01s forwards !important;
          }
          .card-outer, .dot-canvas, .blob-left, .blob-right,
          .badge-dot, .card-badge-icon { animation: none !important; }
        }
      `}</style>

      <section id="top" className="hero-section">
        <div className="dot-canvas" aria-hidden="true" />
        <div className="blob-left" aria-hidden="true" />
        <div className="blob-right" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-grid">

            {/* ── Left column ── */}
            <div className="hero-left">
              <div className="hero-badge" aria-label="Company focus">
                <span className="badge-dot" aria-hidden="true" />
                <span className="badge-text">Singapore IT consulting and corporate services</span>
              </div>

              <h1
                className="hero-headline"
                aria-label="Your complete business and technology partner in Singapore."
              >
                {["Your", "complete", "business", "and", "technology", "partner", "in"].map((word, i) => (
                  <span
                    key={word + i}
                    className="headline-word"
                    style={{ animationDelay: `${0.22 + i * 0.07}s` }}
                    aria-hidden="true"
                  >
                    {word}
                  </span>
                ))}
                <span
                  className="headline-word headline-accent"
                  style={{ animationDelay: `${0.22 + 7 * 0.07}s` }}
                  aria-hidden="true"
                >
                  Singapore.
                </span>
              </h1>

              <p className="hero-body">
                SKII Solutions helps growing businesses align their technology, operations, and compliance with
                practical support across IT consulting, cloud delivery, corporate setup, HR administration, work pass
                services, payroll, and regulatory guidance.
              </p>



              <div className="cta-group">
                <Link href="#contact" className="btn-primary-hero">
                  Book a Consultation
                  <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
                </Link>
                <Link href="#about" className="btn-secondary-hero">
                  About Us
                  <ChevronRight size={16} className="btn-arrow" aria-hidden="true" />
                </Link>
              </div>

            </div>

            {/* ── Right column ── */}
            <div className="hero-right">
              <div className="card-wrap">
                <div className="card-glow" aria-hidden="true" />
                <div className="card-outer">
                  <div className="card-image">
                    <Image
                      src="/images/hero-banner.png"
                      alt="Cloud and digital infrastructure support"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 46vw"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="card-overlay" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}