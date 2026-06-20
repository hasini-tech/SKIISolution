"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "Info@skiisolutions.sg",
    href: "mailto:Info@skiisolutions.sg",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+65 82277130",
    href: "tel:+6582277130",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jalan Bukit Merah, Singapore",
    href: "#",
  },
  {
    icon: Clock3,
    label: "Hours",
    value: "Mon - Fri, 9:00 AM - 6:00 PM SGT",
    href: "#",
  },
];

export default function ContactFooter() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!message.trim()) {
      nextErrors.message = "Message details are required";
    } else if (message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName("");
    setCompany("");
    setEmail("");
    setServiceInterest("");
    setMessage("");
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      {/* Animated background elements */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
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
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr]">
          {/* Left Section - Contact Info */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Contact Us
            </motion.p>

            <motion.h2
              className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Start a conversation with a team that understands delivery.
            </motion.h2>

            <motion.p
              className="mt-6 text-base leading-relaxed text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Whether you need IT consulting, cloud guidance, corporate setup, or ongoing support, SKII Solutions is ready to help with a clear process and practical recommendations.
            </motion.p>

            {/* Contact Items Grid */}
            <motion.div
              className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {CONTACT_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-blue-200 hover:shadow-md"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.08 }}
                  >
                    <motion.div
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );

                if (item.href === "#") {
                  return <div key={item.label}>{content}</div>;
                }

                return (
                  <a key={item.label} href={item.href}>
                    {content}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Section - Form */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-emerald-100 text-emerald-600 shadow-lg"
                      animate={{ scale: [0.8, 1.1, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div animate={{ scale: [0, 1] }} transition={{ delay: 0.2 }}>
                        <ShieldCheck className="h-8 w-8" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      className="mt-6 font-display text-2xl font-bold text-slate-900"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Thanks, we received your enquiry.
                    </motion.h3>

                    <motion.p
                      className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Our team will review your message and respond at{" "}
                      <span className="font-semibold text-slate-900">{email}</span> within one business day.
                    </motion.p>

                    <motion.button
                      type="button"
                      onClick={resetForm}
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition-all hover:bg-blue-700 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send another inquiry
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
                          Name
                        </label>
                        <motion.input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            errors.name ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"
                          }`}
                          placeholder="Your name"
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              className="mt-2 text-xs font-medium text-red-600"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Company */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label htmlFor="company" className="block text-sm font-semibold text-slate-900">
                          Company
                        </label>
                        <motion.input
                          id="company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          placeholder="Company name"
                          whileFocus={{ scale: 1.01 }}
                        />
                      </motion.div>

                      {/* Service Interest */}
                      <motion.div
                        className="sm:col-span-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="service-interest" className="block text-sm font-semibold text-slate-900">
                          Service interest
                        </label>
                        <motion.select
                          id="service-interest"
                          value={serviceInterest}
                          onChange={(e) => setServiceInterest(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          whileFocus={{ scale: 1.01 }}
                        >
                          <option value="">Select a service area</option>
                          <option value="it-consulting">IT Consulting & Strategy</option>
                          <option value="cloud">Cloud Solutions</option>
                          <option value="software">Software Development</option>
                          <option value="cybersecurity">Cybersecurity</option>
                          <option value="it-support">Managed IT Support</option>
                          <option value="work-pass">Work Pass & Permits</option>
                          <option value="hr">HR Administration</option>
                          <option value="acra">Business Setup & ACRA</option>
                          <option value="grants">Grants & Incentives</option>
                          <option value="compliance">Compliance Advisory</option>
                          <option value="other">Other</option>
                        </motion.select>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        className="sm:col-span-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-900">
                          Email
                        </label>
                        <motion.input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            errors.email ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"
                          }`}
                          placeholder="you@company.com"
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              className="mt-2 text-xs font-medium text-red-600"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        className="sm:col-span-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-900">
                          What can we help with?
                        </label>
                        <motion.textarea
                          id="message"
                          rows={5}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                          }}
                          className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 resize-none ${
                            errors.message ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"
                          }`}
                          placeholder="Briefly describe your goals, current setup, and timing."
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              className="mt-2 text-xs font-medium text-red-600"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* Submit Section */}
                    <motion.div
                      className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <p className="text-xs leading-relaxed text-slate-600">
                        By sending this form, you agree to be contacted by SKII Solutions regarding your enquiry.
                      </p>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-75 disabled:cursor-not-allowed sm:w-auto"
                        whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                              <Loader2 className="h-4 w-4" />
                            </motion.div>
                            Sending
                          </>
                        ) : (
                          <>
                            Send inquiry
                            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                              <Send className="h-4 w-4" />
                            </motion.div>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}