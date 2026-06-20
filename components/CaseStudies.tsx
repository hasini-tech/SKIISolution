"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiTimeLine } from "react-icons/ri";

type CaseStudy = {
  sector: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  timeline: string;
  tags: string[];
  impact?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    sector: "Cloud",
    title: "Stabilising infrastructure for a growing operations team",
    summary: "A staged cloud migration replaced fragile on-premise systems with a more reliable setup for daily dispatch, reporting, and support.",
    challenge: "Frequent downtime during peak activity created pressure on the team and delayed handoffs.",
    approach: "We planned a phased migration with backup workflows, monitoring, and a controlled cutover.",
    outcome: "The environment became easier to manage, with faster recovery and fewer interruptions to the business.",
    timeline: "3 weeks",
    impact: "99.98% uptime achieved",
    tags: ["AWS", "Backup", "Monitoring"],
  },
  {
    sector: "Corporate",
    title: "Setting up a Singapore entity with clearer compliance",
    summary: "We supported incorporation, HR setup, and initial compliance steps so the business could launch with a clean operational foundation.",
    challenge: "The team needed a practical path through incorporation, employment setup, and required filings.",
    approach: "We organised the setup into a simple sequence with documents, approvals, and clear next steps.",
    outcome: "The client moved forward with a more predictable launch process and fewer administrative gaps.",
    timeline: "2 weeks",
    impact: "Zero compliance gaps",
    tags: ["ACRA", "MOM", "HR Ops"],
  },
  {
    sector: "Support",
    title: "Improving response time for a multi-team service business",
    summary: "A managed support model brought more structure to ticket handling, device maintenance, and ongoing user requests.",
    challenge: "Requests were being handled inconsistently, which made it harder for the team to know who owned what.",
    approach: "We introduced a clearer support workflow, recurring maintenance, and consistent ownership across requests.",
    outcome: "The business gained a more dependable support rhythm and a better experience for internal users.",
    timeline: "Ongoing",
    impact: "40% faster response",
    tags: ["Helpdesk", "Maintenance", "Endpoint"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function StudyCard({ study, compact = false, delay = 0 }: { study: CaseStudy; compact?: boolean; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
        compact ? "p-5 sm:p-6" : "p-7 lg:p-8"
      }`}
    >
      {/* Animated accent line on top */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
      />

      <div className="relative z-10">
        {/* Sector Badge */}
        <motion.span
          className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-blue-700"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.1 }}
        >
          {study.sector}
        </motion.span>

        {/* Title */}
        <motion.h3
          className={`mt-4 font-display font-semibold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 ${
            compact ? "text-base leading-snug" : "text-xl leading-tight"
          }`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.15 }}
        >
          {study.title}
        </motion.h3>

        {/* Summary */}
        <motion.p
          className={`mt-3 text-slate-600 ${compact ? "text-xs leading-relaxed" : "text-sm leading-relaxed"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {study.summary}
        </motion.p>

        {compact ? (
          <motion.div
            className="mt-4 border-t border-slate-200 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.25 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Approach</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">{study.approach}</p>
            {study.impact && (
              <motion.div
                className="mt-3 inline-block rounded-lg bg-green-50 px-3 py-1.5 border border-green-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <p className="text-xs font-semibold text-green-700">{study.impact}</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="mt-6 space-y-5 border-t border-slate-200 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.3, staggerChildren: 0.08 }}
          >
            {[
              { label: "Challenge", value: study.challenge },
              { label: "Approach", value: study.approach },
              { label: "Outcome", value: study.outcome },
            ].map((section, idx) => (
              <motion.div key={section.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: delay + 0.35 + idx * 0.08 }}>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{section.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{section.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tags */}
        {!compact && (
          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: delay + 0.55 }}
          >
            {study.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.6 + idx * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200 pt-4 flex items-center justify-between gap-3">
        <motion.div
          className={`flex items-center gap-2 text-slate-600 ${compact ? "text-xs" : "text-sm"}`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.35 }}
        >
          <RiTimeLine className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="font-medium">{study.timeline}</span>
        </motion.div>

        <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
          <Link
            href="#contact"
            className={`inline-flex items-center gap-1.5 font-semibold text-blue-600 transition-colors hover:text-blue-700 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            Start similar work
            <RiArrowRightLine className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function CaseStudies() {
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
    setActiveIndex(Math.min(index, CASE_STUDIES.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section id="work" className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Animated background */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-100/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Selected Work
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Real project outcomes, presented with clarity.
          </motion.h2>
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A concise portfolio view of how we help businesses improve delivery, reduce risk, and stay operationally ready.
          </motion.p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden gap-6 lg:grid lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CASE_STUDIES.map((study, idx) => (
            <StudyCard key={study.title} study={study} delay={idx * 0.1} />
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <motion.div
          className="relative mt-8 lg:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div className="mb-4 flex items-center justify-between px-1">
            <motion.span
              className="font-mono text-xs uppercase tracking-wider text-blue-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              Swipe for more
            </motion.span>
            <motion.span
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-slate-600"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              Portfolio
            </motion.span>
          </motion.div>

          <div className="relative px-1">
            <div
              ref={scrollRef}
              className="scrollbar-hide overflow-x-auto overflow-y-hidden pb-2 pt-1 snap-x snap-mandatory scroll-smooth"
            >
              <div className="flex w-max gap-4 pr-1">
                {CASE_STUDIES.map((study, i) => (
                  <div
                    key={study.title}
                    ref={i === 0 ? cardRef : undefined}
                    className="h-full w-[75vw] max-w-[300px] shrink-0 snap-start sm:w-[70vw] sm:max-w-[340px]"
                  >
                    <StudyCard study={study} compact delay={i * 0.1} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {CASE_STUDIES.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (el && cardRef.current) {
                    el.scrollTo({
                      left: i * (cardRef.current.offsetWidth + 16),
                      behavior: "smooth",
                    });
                  }
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2.5 bg-blue-600"
                    : "w-2 h-2.5 bg-blue-200 hover:bg-blue-300"
                }`}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}