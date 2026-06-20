const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We audit your current systems, security posture, and pain points — usually within the first 1–2 weeks.",
    icon: "🔍",
    duration: "1–2 Weeks",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "You get a written plan: what to fix first, what it costs, and what changes for your team day to day.",
    icon: "📋",
    duration: "1 Week",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Work happens in scheduled phases, with rollback plans in place and minimal disruption to daily operations.",
    icon: "⚙️",
    duration: "2–8 Weeks",
  },
  {
    number: "04",
    title: "Support",
    description:
      "Ongoing monitoring and a direct line to our team — most issues are resolved before you'd notice them.",
    icon: "🛡️",
    duration: "Ongoing",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-navy py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 h-full w-[40%] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(46,107,230,0.06),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-[30%] h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(46,107,230,0.08),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-content px-6 relative z-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            How we work
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-paper sm:text-4xl">
            Every engagement follows the same four steps
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/60">
            No surprises in scope, timeline, or who's responsible for what.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="group relative rounded-xl border border-navy-line bg-navy-light p-6 transition-all duration-300 hover:border-[#2e6be6]/40 hover:bg-[#0D1E3A] hover:-translate-y-1"
            >
              {/* Connector on desktop */}
              {index < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 hidden lg:block w-4 h-px bg-navy-line -mr-4 z-20"
                />
              )}

              {/* Step number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-4xl font-extrabold text-navy-line/70 leading-none group-hover:text-[#2e6be6]/40 transition-colors">
                  {step.number}
                </span>
                <span className="text-2xl">{step.icon}</span>
              </div>

              {/* Duration badge */}
              <span className="inline-block rounded-full border border-[#2e6be6]/20 bg-[#2e6be6]/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#2e6be6] mb-3">
                {step.duration}
              </span>

              <h3 className="font-display text-lg font-bold text-paper">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/55">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-xl border border-navy-line bg-navy-light p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <p className="font-display text-base font-bold text-paper">
              Ready to get started?
            </p>
            <p className="mt-1 text-sm text-paper/55">
              Book a free 30-minute discovery call — no commitment required.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0F1B2E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16243b] shrink-0"
          >
            Book a Free Call
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
