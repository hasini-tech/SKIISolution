"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBarChartBoxLine,
  RiBuildingLine,
  RiCheckboxMultipleLine,
  RiCloudLine,
  RiCodeSSlashLine,
  RiFileTextLine,
  RiHeadphoneLine,
  RiHandHeartLine,
  RiShieldKeyholeLine,
  RiUserStarLine,
  RiAwardLine,
} from "react-icons/ri";

type ServiceCard = {
  icon: React.ElementType;
  title: string;
  description: string;
  bulletPoints: string[];
  gradient: string;
};

const IT_SERVICES: ServiceCard[] = [
  {
    icon: RiCodeSSlashLine,
    title: "IT Consulting & Strategy",
    description: "Align your technology roadmap with business goals, budgets, and growth plans.",
    bulletPoints: ["Technology assessments", "IT roadmaps", "Digital transformation planning"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: RiCloudLine,
    title: "Cloud Solutions",
    description: "Migrate, deploy, and optimize workloads across AWS, Azure, or Google Cloud.",
    bulletPoints: ["Cloud migration", "Infrastructure setup", "Backup & disaster recovery"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: RiCodeSSlashLine,
    title: "Software Development",
    description: "Build secure and scalable web platforms, portals, and internal business tools.",
    bulletPoints: ["Web applications", "API integration", "Business automation"],
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    icon: RiShieldKeyholeLine,
    title: "Cybersecurity",
    description: "Protect systems, data, and users with practical security controls and audits.",
    bulletPoints: ["Security assessment", "Vulnerability review", "Access control hardening"],
    gradient: "from-amber-500 to-red-500",
  },
  {
    icon: RiHeadphoneLine,
    title: "Managed IT Support",
    description: "Keep systems stable and teams productive with monitoring, maintenance, and helpdesk support.",
    bulletPoints: ["Remote support", "Monitoring & maintenance", "System updates"],
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: RiBarChartBoxLine,
    title: "Data & Analytics",
    description: "Turn raw data into dashboards, reports, and insights that support better decisions.",
    bulletPoints: ["Dashboard development", "Reporting automation", "Data integration"],
    gradient: "from-violet-600 to-blue-600",
  },
];

const CORPORATE_SERVICES: ServiceCard[] = [
  {
    icon: RiFileTextLine,
    title: "Work Pass & Permit Services",
    description: "Confidently manage Singapore's immigration process for your foreign employees with the right legal permits.",
    bulletPoints: ["EP, S Pass & Work Permit applications", "Renewals & cancellations", "Document preparation with MOM"],
    gradient: "from-violet-600 to-blue-600",
  },
  {
    icon: RiHandHeartLine,
    title: "Onboarding & Post-Approval",
    description: "After work pass approval, we ensure your international staff settle in smoothly and are compliant from day one.",
    bulletPoints: ["MOM onboarding & SIP bookings", "Biometric appointments", "Medical & insurance bonds"],
    gradient: "from-pink-500 to-violet-600",
  },
  {
    icon: RiUserStarLine,
    title: "HR Administration",
    description: "Elevate HR operations with comprehensive, expertly managed administrative support for maximum efficiency.",
    bulletPoints: ["Employment contracts & payroll", "CPF management & submissions", "Attendance tracking systems"],
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: RiBuildingLine,
    title: "Business Setup & ACRA",
    description: "Set up your company correctly and efficiently with expert ACRA incorporation and corporate secretarial services.",
    bulletPoints: ["Company incorporation (ACRA)", "Corporate secretarial services", "Fast ACRA profile access"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: RiAwardLine,
    title: "Grants & Incentives",
    description: "Grow your business faster by tapping into Singapore's government grants and support programs.",
    bulletPoints: ["EDG, PSG, Startup SG guidance", "Eligibility checks & budgets", "Claims & audit support"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: RiCheckboxMultipleLine,
    title: "Compliance Advisory",
    description: "Understand and follow Singapore's business rules with confidence. Stay compliant, reduce risks, run smoothly.",
    bulletPoints: ["MOM, ACRA, IRAS advisory", "Annual filings & tax guidance", "Internal policy frameworks"],
    gradient: "from-cyan-500 to-blue-600",
  },
];

function ServiceCardView({ service, delay = 0 }: { service: ServiceCard; delay?: number }) {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <motion.div
        className={`absolute inset-0 opacity-0 bg-gradient-to-br ${service.gradient}`}
        animate={{ opacity: isHovered ? 0.02 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        <motion.div
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-blue-600" />
        </motion.div>

        <h3 className="mt-4 font-display text-[16px] font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-600 sm:text-[17px]">
          {service.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>

        <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
          {service.bulletPoints.map((point, idx) => (
            <motion.li
              key={point}
              className="flex items-start gap-2.5 text-[12px] text-slate-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.35 + idx * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
              />
              {point}
            </motion.li>
          ))}
        </ul>

        <div className="mt-4">
          <Link
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Learn more
            <motion.div animate={isHovered ? { x: 4 } : { x: 0 }}>
              <RiArrowRightLine className="h-3.5 w-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ── Mobile Carousel ──────────────────────────────────────────────────────────
function MobileCarousel({ services }: { services: ServiceCard[] }) {
  const [current, setCurrent] = useState(0);
  const total = services.length;
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card */}
      <div
        className="w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ServiceCardView service={services[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators + arrow controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 active:scale-95"
          aria-label="Previous"
        >
          <RiArrowLeftSLine className="h-5 w-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-1.5">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 active:scale-95"
          aria-label="Next"
        >
          <RiArrowRightSLine className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* Counter */}
      <p className="text-xs text-slate-400">
        {current + 1} / {total}
      </p>
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function Services() {
  const [activeTab, setActiveTab] = useState<"it" | "corporate">("it");

  const activeServices = activeTab === "it" ? IT_SERVICES : CORPORATE_SERVICES;

  const handleTabChange = (tab: "it" | "corporate") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-28">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-[40%] w-[40%] bg-[radial-gradient(ellipse,rgba(59,130,246,0.05),transparent_70%)]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-10 flex flex-col items-center gap-6 text-center sm:mb-12 md:flex-row md:items-center md:justify-between md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left: text — centered on mobile, left-aligned on md+ */}
          <div className="max-w-2xl">
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              Our Expertise
            </motion.p>
            <motion.h2
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {activeTab === "it"
                ? "End-to-End IT Solutions"
                : "Corporate & Manpower Services"}
            </motion.h2>
            <motion.p
              className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {activeTab === "it"
                ? "Comprehensive digital infrastructure, custom software, and security solutions for growing businesses."
                : "Expert manpower permits, corporate setup, HR administration, and government grants guidance."}
            </motion.p>
          </div>

          {/* Tab pill — centered on mobile */}
          <div className="flex shrink-0 justify-center">
            <div className="inline-flex gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              {[
                { id: "it", label: "IT Services" },
                { id: "corporate", label: "Corporate" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as "it" | "corporate")}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 min-h-[44px] ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-transparent text-slate-600 hover:text-slate-900"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Cards: Carousel on mobile, Grid on sm+ ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile carousel */}
            <div className="sm:hidden">
              <MobileCarousel services={activeServices} />
            </div>

            {/* Desktop grid */}
            <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {activeServices.map((service, idx) => (
                <ServiceCardView key={service.title} service={service} delay={idx * 0.05} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── CTA Banner ── */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-7 sm:mt-16 sm:p-10 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,255,255,0.2),transparent_60%)]"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <motion.p
                className="mb-2 font-mono text-xs uppercase tracking-widest text-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to get started?
              </motion.p>
              <motion.p
                className="font-display text-xl font-bold text-white sm:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Book a free 30-minute discovery call
              </motion.p>
              <motion.p
                className="mt-2 text-sm text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                We'll assess your needs and recommend the right solution.
              </motion.p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto sm:shrink-0">
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl sm:w-auto"
              >
                Get Started
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <RiArrowRightLine className="h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}