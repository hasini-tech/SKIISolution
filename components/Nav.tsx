"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavItem = { id: string; label: string; href: string };

const NAV_LINKS: NavItem[] = [
  { id: "about",   label: "About",     href: "#about"   },
  { id: "services",label: "Services",  href: "#services"},
  { id: "why-us",  label: "Why Us",    href: "#why-us"  },
  { id: "work",    label: "Work",      href: "#work"    },
  { id: "contact", label: "Contact",   href: "#contact" },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < 80 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-500 ease-in-out
    ${visible ? "translate-y-0" : "-translate-y-full"}
  `;

  const barClass = `
    w-full transition-all duration-400
    ${scrolled
      ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_24px_rgba(15,23,42,0.10)] border-b border-line/60"
      : "bg-transparent border-b border-transparent"
    }
    px-4 py-3
  `;

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileMenuOpen {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Active pill: blue gradient (matches "IT Services" style) ── */
        .nav-pill-indicator {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #2e6be6 0%, #1e4fba 100%);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 0;
        }

        .nav-link-text { position: relative; z-index: 1; }

        .mobile-menu-enter {
          animation: mobileMenuOpen 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .nav-cta {
          background: linear-gradient(135deg, #2e6be6 0%, #1e4fba 100%);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 8px 22px rgba(37,99,235,0.38);
        }
        .nav-cta:active { transform: scale(0.97); }

        .logo-mark {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .logo-wrap:hover .logo-mark { transform: scale(1.06) rotate(-2deg); }
      `}</style>

      <header className={navClass} style={{ animation: "navSlideDown 0.5s ease forwards" }}>
        <div className={barClass}>

          {/* ── Desktop ── */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 max-w-[1280px] mx-auto">

            {/* Logo */}
            <Link
              href="#top"
              className="logo-wrap inline-flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2 ring-1 ring-line shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="logo-mark flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2e6be6] to-[#1e4fba] shadow overflow-hidden">
                <img src="/images/logo.jpeg" alt="" className="h-full w-full object-contain" />
              </div>
              <span className="font-display text-[17px] font-bold text-ink tracking-tight">
                SKII<span className="text-[#2e6be6]">Solutions</span>
              </span>
            </Link>

            {/* Nav pills */}
            <nav className="flex justify-center">
              <div className="relative flex items-center gap-0.5 rounded-full border border-line/80 bg-[#F3F6FA] p-1 shadow-inner">
                {NAV_LINKS.map((link) => {
                  const isActive = activeTab === link.id;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => { setActiveTab(link.id); setIsMenuOpen(false); }}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                        relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold
                        transition-colors duration-200
                        ${isActive ? "text-white" : "text-slate-500 hover:text-ink"}
                      `}
                    >
                      {isActive && <span className="nav-pill-indicator" aria-hidden="true" />}
                      <span className="nav-link-text">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* CTA */}
            <div className="flex justify-end">
              <Link
                href="#contact"
                className="nav-cta inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => { setActiveTab("contact"); setIsMenuOpen(false); }}
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* ── Mobile header row ── */}
          <div className="flex items-center justify-between md:hidden">
            <Link
              href="#top"
              className="logo-wrap inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-line shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="logo-mark flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2e6be6] to-[#1e4fba] shadow overflow-hidden">
                <img src="/images/logo.jpeg" alt="" className="h-full w-full object-contain" />
              </div>
              <span className="font-display text-base font-bold text-ink">
                SKII<span className="text-[#2e6be6]">Solutions</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-slate-700 shadow-sm transition-all hover:bg-[#F8FAFC] hover:text-ink active:scale-95"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {isMenuOpen && (
          <nav className="mobile-menu-enter mx-3 mb-2 rounded-2xl border border-line bg-white p-3 shadow-[0_16px_48px_rgba(15,23,42,0.12)] md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => { setActiveTab(link.id); setIsMenuOpen(false); }}
                    className={`
                      relative inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold
                      transition-all duration-200
                      ${isActive
                        ? "text-white"
                        : "text-slate-600 hover:bg-[#F8FAFC] hover:text-ink"
                      }
                    `}
                    style={isActive ? {
                      background: "linear-gradient(135deg, #2e6be6 0%, #1e4fba 100%)",
                      boxShadow: "0 4px 14px rgba(37,99,235,0.30)",
                    } : {}}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="#contact"
                onClick={() => { setActiveTab("contact"); setIsMenuOpen(false); }}
                className="nav-cta mt-1.5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white"
              >
                Book a Consultation
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Spacer so content isn't hidden under fixed nav */}
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}