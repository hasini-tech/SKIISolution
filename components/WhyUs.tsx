"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiFlashlightLine,
  RiShieldCheckLine,
  RiLineChartLine,
  RiTimeLine,
} from "react-icons/ri";

const BENEFITS = [
  {
    icon: RiFlashlightLine,
    title: "Fast Response",
    description: "We move quickly from discovery to execution to reduce delays and accelerate your business outcomes.",
    color: "from-amber-500 to-orange-500",
    delay: 0,
  },
  {
    icon: RiShieldCheckLine,
    title: "Easy Compliance",
    description: "We help you easily follow all of Singapore's complex rules (MOM, ACRA, IRAS) with confidence.",
    color: "from-emerald-500 to-teal-500",
    delay: 0.1,
  },
  {
    icon: RiLineChartLine,
    title: "Boost Your Growth",
    description: "Smart, compliant solutions that fit your goals and help you make a real impact in the market.",
    color: "from-blue-500 to-cyan-500",
    delay: 0.2,
  },
  {
    icon: RiTimeLine,
    title: "Save Time & Money",
    description: "We make IT and HR tasks smoother and more efficient, saving you significant time and resources.",
    color: "from-violet-500 to-purple-500",
    delay: 0.3,
  },
];

function BenefitCard({
  benefit,
  index,
  compact = false,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
  compact?: boolean;
}) {
  const Icon = benefit.icon;
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    return (
      <motion.article
        className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: benefit.delay }}
        viewport={{ once: true }}
      >
        <motion.div
          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.color} text-white shadow-md`}
          animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <h3 className="text-sm font-semibold leading-tight text-slate-900">
          {benefit.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {benefit.description}
        </p>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-800/60 p-8 text-left backdrop-blur-sm transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: benefit.delay }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      />
      <motion.div
        className="pointer-events-none absolute -right-6 -top-6 select-none text-8xl font-extrabold text-white/[0.06]"
        animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      <div className="relative z-10">
        <motion.div
          className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm"
          animate={isHovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
        <p className="mt-3.5 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/85">
          {benefit.description}
        </p>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.color}`}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: benefit.delay + 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      />
    </motion.article>
  );
}

export default function WhyUs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const card = cardRef.current;
    if (!el || !card) return;
    const cardWidth = card.offsetWidth;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, BENEFITS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToCard = (i: number) => {
    const el = scrollRef.current;
    const card = cardRef.current;
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <section
      id="why-us"
      style={{ backgroundColor: "#0f172a" }}
      className="relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900" />
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.15), transparent 50%)",
        }}
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Why Choose SKII Solutions
          </motion.p>
          <motion.h2
            className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Inspire. Innovate. Impact.
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Clear communication, practical delivery, reliable support across technology and corporate services.
          </motion.p>
        </motion.div>

        {/* ── MOBILE CAROUSEL ── */}
        <div className="md:hidden">
          {/* Scroll track — bleeds edge to edge */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
            style={{
              /* remove default padding so first card aligns to screen edge */
              marginLeft: "-1rem",
              marginRight: "-1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              /* hide scrollbar cross-browser */
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {BENEFITS.map((benefit, index) => (
              <div
                key={benefit.title}
                ref={index === 0 ? cardRef : undefined}
                className="shrink-0 snap-center"
                /* each card = viewport width minus side padding (32px total) */
                style={{ width: "calc(100vw - 2rem)" }}
              >
                <BenefitCard benefit={benefit} index={index} compact />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {BENEFITS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "h-2.5 w-6 bg-gradient-to-r from-blue-500 to-cyan-500"
                    : "h-2.5 w-2.5 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP GRID ── */}
        <motion.div
          className="hidden gap-6 md:grid md:grid-cols-2 md:auto-rows-fr"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 shadow-2xl sm:p-12 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at right, rgba(255,255,255,0.2), transparent 60%)",
            }}
          />
          <div className="relative z-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-white/90">
              Ready to Optimize Your Business?
            </p>
            <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Book a free 30-minute discovery call today
            </p>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Let's explore how SKII Solutions can drive meaningful results for your business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}