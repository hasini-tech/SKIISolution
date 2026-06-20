"use client";

import { useEffect, useRef } from "react";
import {
  RiTimeLine, RiTeamLine, RiShieldCheckLine,
  RiBuilding4Line, RiMapPinLine, RiCheckboxCircleLine, RiArrowRightLine,
} from "react-icons/ri";

const VALUES = [
  { icon: RiShieldCheckLine, text: "Structured delivery with compliance built into every step."          },
  { icon: RiTeamLine,        text: "Dedicated support from a team that understands operational pressure." },
  { icon: RiMapPinLine,      text: "Singapore-focused guidance for local businesses and regional teams."  },
];

const FEATURE_CARDS = [
  { icon: RiTimeLine,       title: "Fast onboarding",  description: "Clear timelines and direct communication so your project moves quickly."               },
  { icon: RiTeamLine,       title: "Dedicated team",   description: "A consistent point of contact for strategy, execution, and support."                   },
  { icon: RiShieldCheckLine,title: "Full compliance",  description: "Support across MOM, ACRA, and IRAS requirements with care and precision."              },
  { icon: RiBuilding4Line,  title: "Singapore based",  description: "Local insight and practical experience across technology and operations."               },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function About() {
  const leftRef  = useReveal(0.12);
  const rightRef = useReveal(0.12);

  return (
    <>
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes revealRight {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        .about-left  { opacity: 0; }
        .about-right { opacity: 0; }
        .about-left.revealed  { animation: revealRight 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .about-right.revealed { animation: revealLeft  0.7s cubic-bezier(0.22,1,0.36,1) forwards 0.18s; }

        .feature-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s;
        }
        .feature-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 40px rgba(15,23,42,0.09) !important;
          border-color: #c5d4ee !important;
        }
        .feature-card:hover .card-icon { background: #2e6be6 !important; color: white !important; }
        .card-icon { transition: background 0.25s, color 0.25s; }

        .value-row {
          transition: background 0.2s, transform 0.2s;
        }
        .value-row:hover { background: white !important; transform: translateX(4px); }

        .hq-card {
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .hq-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,23,42,0.07); }
      `}</style>

      <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(46,107,230,0.06),transparent_68%)]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(46,107,230,0.04),transparent_68%)]" />

        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">

            {/* ── Left ── */}
            <div ref={leftRef} className="about-left max-w-xl">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#2e6be6]">About SKII Solutions</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F1B2E] sm:text-[2.4rem] sm:leading-[1.12]">
                A dependable partner for technology, corporate services, and compliance.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.78] text-[#4C5E78]">
                SKII Solutions helps Singapore businesses simplify complex work across IT consulting, cloud
                infrastructure, corporate setup, HR administration, work pass management, payroll, and ongoing
                compliance. We focus on practical delivery, clear communication, and support that fits the pace of a
                real business.
              </p>

              <div className="mt-8 space-y-3">
                {VALUES.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div
                      key={value.text}
                      className="value-row flex items-center gap-3.5 rounded-2xl border border-[#E8EEF8] bg-[#F8FAFC] px-4 py-3.5 cursor-default"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2e6be6] shadow-sm ring-1 ring-[#E8EEF8]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-[14px] leading-[1.65] text-[#4C5E78]">{value.text}</p>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* ── Right ── */}
            <div ref={rightRef} className="about-right grid gap-4 sm:grid-cols-2">
              {FEATURE_CARDS.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="feature-card rounded-[24px] border border-[#E8EEF8] bg-white p-5 shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
                  >
                    <div className="card-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2e6be6]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-[15px] font-bold text-[#0F1B2E]">{feature.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.68] text-[#4C5E78]">{feature.description}</p>
                  </article>
                );
              })}

              <article className="hq-card sm:col-span-2 overflow-hidden rounded-[28px] border border-[#E8EEF8] bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] p-6 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2e6be6] text-white shadow-[0_6px_16px_rgba(46,107,230,0.35)]">
                    <RiMapPinLine className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[17px] font-bold text-[#0F1B2E]">Singapore headquarters</p>
                    <p className="mt-1 text-[13.5px] leading-[1.65] text-[#4C5E78]">
                      Local operations with clear service promise, responsive delivery, and practical business support.
                    </p>
                    <a
                      href="mailto:Info@skiisolutions.sg"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2e6be6] hover:text-[#1a4fc7] transition-colors"
                    >
                      Info@skiisolutions.sg <RiArrowRightLine className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}