"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "They migrated us to the cloud over a weekend and we genuinely didn't notice. The team explained every step in plain language, which made a stressful project feel routine.",
    name: "Mei Lin Tan",
    role: "Operations Director",
    company: "Harborview Logistics",
    initials: "ML",
    rating: 5,
  },
  {
    quote:
      "Our previous IT vendor took days to respond to anything. SKII's team picks up the phone, and more importantly, they fix things before we even file a ticket.",
    name: "Rajiv Menon",
    role: "Practice Manager",
    company: "Cardia Health Group",
    initials: "RM",
    rating: 5,
  },
  {
    quote:
      "The custom onboarding tool they built replaced three spreadsheets and a lot of manual checking. It paid for itself within a quarter.",
    name: "Sarah Goh",
    role: "Head of Client Services",
    company: "Northbridge Wealth Partners",
    initials: "SG",
    rating: 5,
  },
];

const STATS = [
  { value: "200+", label: "Clients Served" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "10+", label: "Years Experience" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [active, autoplay]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsAnimating(false);
    }, 400);
  };

  const handleSelect = (index: number) => {
    if (isAnimating || index === active) return;
    setIsAnimating(true);
    setAutoplay(false);
    setTimeout(() => {
      setActive(index);
      setIsAnimating(false);
    }, 400);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">
      {/* Animated background */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-14 text-center"
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
          >
            What clients say
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Trusted by businesses across Singapore
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative z-10">
                <motion.p
                  className="font-display text-3xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent group-hover:to-blue-200 transition-all"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 sm:p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_60%)] opacity-40"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
            {/* Quote Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Star Rating */}
                <motion.div
                  className="mb-6 flex gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.svg
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote
                  className="text-xl leading-relaxed text-white font-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>

                {/* Author Info */}
                <motion.figcaption
                  className="mt-8 flex items-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-display text-sm font-bold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {t.initials}
                  </motion.div>
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      {t.name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </motion.figcaption>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel - Other Testimonials */}
          <motion.div
            className="mt-8 space-y-3 lg:absolute lg:right-8 lg:top-12 lg:mt-0 lg:w-80"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-4">
              More testimonials
            </p>
            <div className="space-y-3">
              {TESTIMONIALS.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleSelect(i)}
                  className={`group relative w-full overflow-hidden rounded-xl p-4 text-left transition-all border ${
                    i === active
                      ? "border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/20"
                      : "border-slate-700 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 opacity-0 group-hover:opacity-5"
                    initial={false}
                  />
                  <div className="relative z-10">
                    <p
                      className={`text-xs font-semibold font-display transition-colors ${
                        i === active ? "text-blue-300" : "text-white group-hover:text-slate-200"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className={`text-[11px] mt-1 font-mono transition-colors ${
                      i === active ? "text-blue-200/60" : "text-slate-500"
                    }`}>
                      {item.company}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Dot Pagination */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-3 lg:mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                className={`rounded-full transition-all border ${
                  i === active
                    ? "border-blue-400 bg-gradient-to-r from-blue-600 to-cyan-500 w-8 h-2.5"
                    : "border-slate-600 bg-slate-700 w-2.5 h-2.5 hover:border-slate-500 hover:bg-slate-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}