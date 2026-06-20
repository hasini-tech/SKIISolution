import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  { label: "IT Consulting", href: "#services" },
  { label: "Cloud Solutions", href: "#services" },
  { label: "Corporate Setup", href: "#services" },
  { label: "HR & Compliance", href: "#services" },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2545] text-white">
      <div className="mx-auto max-w-content px-6 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-md">
            <Link href="#top" className="inline-flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                <img
                  src="/images/logo.jpeg"
                  alt="SKII Solutions"
                  className="h-8 w-8 rounded-lg object-contain"
                />
                <span className="text-sm font-semibold text-white">
                  SKII<span className="text-blue-400">Solutions</span>
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-paper/65">
              IT consulting, corporate services, HR support, and compliance guidance for Singapore businesses that
              need a reliable partner.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper/55">
              Quick links
            </h3>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-paper/75 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper/55">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-paper/75 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-paper/55">
              Contact
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-paper/75">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <a href="mailto:Info@skiisolutions.sg" className="transition-colors hover:text-white">
                  Info@skiisolutions.sg
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <a href="tel:+6582277130" className="transition-colors hover:text-white">
                  +65 82277130
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                <span>Jalan Bukit Merah, Singapore</span>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-paper/70 transition-all hover:bg-white/15 hover:text-white hover:border-white/20"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SKII Solutions Pte. Ltd. All rights reserved.</p>
          <p>Singapore business support with a clear, professional process.</p>
        </div>

        <div className="mt-4 text-center text-xs font-bold text-paper/50">
          Powered by <span className="text-white">TechVaseegrah</span>
        </div>
      </div>
    </footer>
  );
}