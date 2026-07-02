import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Download, Mail, ArrowRight, Sparkles } from "lucide-react";
import { profile, badges, stats, socials } from "@/content/portfolio";
import { SocialIcon } from "./SocialIcon";
import { Counter } from "./primitives";

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 90;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

function Particles() {
  const [dots, setDots] = useState<
    { id: number; left: number; top: number; size: number; dur: number; delay: number }[]
  >([]);
  useEffect(() => {
    setDots(
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 6 + 6,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const typed = useTyping(profile.roles);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16">
      <Particles />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          >
            <span className="text-gradient">Aravinth N</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 flex h-9 items-center text-xl font-medium text-foreground/90 sm:text-2xl"
          >
            <span className="text-primary">{typed}</span>
            <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Hire Me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href={profile.resumeUrl}
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {badges.map((b) => (
              <span key={b} className="glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80">
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary"
              >
                <SocialIcon name={s.icon} className="h-4.5 w-4.5" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-6 animate-float-slow rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-fuchsia-500/20 to-cyan-400/20 blur-2xl" />
          <div className="glass-strong relative overflow-hidden rounded-[2rem] p-2">
            <img
              src={profile.photo}
              alt="Aravinth N — Engineer & Founder"
              className="w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
          </div>
          <div className="glass-strong absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-6 rounded-2xl px-6 py-3">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl font-bold text-primary">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
