import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target, Eye, Compass, Rocket, GraduationCap, Briefcase, ExternalLink,
  MapPin, Mail, Phone, Trophy, BadgeCheck,
} from "lucide-react";
import {
  about, skillCategories, projects, projectCategories, education, leadership,
  achievements, certifications, stats, profile, socials,
} from "@/content/portfolio";
import { Reveal, SectionHeading, Counter } from "./primitives";
import { Tilt3D, Marquee } from "./motion";
import { SocialIcon } from "./SocialIcon";
import { FaGithub as Github } from "react-icons/fa6";


function Shell({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-4 py-24 ${className}`}>
      {children}
    </section>
  );
}

/* ---------------- About ---------------- */
export function About() {
  const cards = [
    { icon: Target, title: "Mission", text: about.mission },
    { icon: Eye, title: "Vision", text: about.vision },
  ];
  return (
    <Shell id="about">
      <SectionHeading eyebrow="Who I Am" title="Engineer. Builder. Founder." subtitle={about.intro} />
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <div className="glass h-full rounded-2xl p-7">
              <c.icon className="h-6 w-6 text-primary" />
              <h3 className="font-display mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-2xl p-7">
            <Compass className="h-6 w-6 text-primary" />
            <h3 className="font-display mt-4 text-xl font-semibold">Core Values</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.values.map((v) => (
                <span key={v} className="rounded-full border border-border/60 px-3 py-1 text-xs text-foreground/80">{v}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass h-full rounded-2xl p-7">
            <Rocket className="h-6 w-6 text-primary" />
            <h3 className="font-display mt-4 text-xl font-semibold">Current Focus</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {about.currentFocus.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{f}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-gradient"><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Skills ---------------- */
export function Skills() {
  return (
    <Shell id="skills">
      <SectionHeading eyebrow="Capabilities" title="Skills & Proficiency" subtitle="A full-stack toolkit spanning silicon to the cloud." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.name} delay={(i % 3) * 0.08}>
            <div className="glass group h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
              <div className="mt-5 space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-foreground/90">{s.name}</span>
                      <span className="text-muted-foreground">{s.years}y · {s.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Projects ---------------- */
export function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = projects.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.join(" ").toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Shell id="projects">
      <SectionHeading eyebrow="Selected Work" title="Featured Projects" subtitle="Production-minded systems across AI, IoT, cloud and full stack." />
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                filter === c ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="glass w-full rounded-xl px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40 sm:w-56"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08}>
            <div className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative">
                <span className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary">{p.category}</span>
                <h3 className="font-display mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                {p.impact && <p className="mt-3 text-xs italic text-foreground/70">→ {p.impact}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md bg-muted px-2 py-1 text-[11px] text-foreground/80">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Timeline block ---------------- */
function TimelineItem({ icon: Icon, title, sub, period, points, chip }: {
  icon: React.ComponentType<{ className?: string }>; title: string; sub: string; period: string; points: string[]; chip?: string;
}) {
  return (
    <div className="relative pl-10">
      <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          {chip && <span className="rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">{chip}</span>}
        </div>
        <p className="text-sm text-primary/90">{sub}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{period}</p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {points.map((pt) => (
            <li key={pt} className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <Shell id="education">
      <SectionHeading eyebrow="Academics" title="Education" />
      <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-full before:w-px before:bg-border">
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1}>
            <TimelineItem icon={GraduationCap} title={e.title} sub={e.org} period={e.period} points={e.points} chip={e.score} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <h3 className="font-display mb-4 text-center text-lg font-semibold">Certifications</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <a href={c.link} className="glass flex items-center gap-3 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <BadgeCheck className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.issuer}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function Leadership() {
  return (
    <Shell id="leadership">
      <SectionHeading eyebrow="Impact" title="Leadership & Experience" />
      <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-full before:w-px before:bg-border">
        {leadership.map((l, i) => (
          <Reveal key={l.role} delay={i * 0.1}>
            <TimelineItem icon={Briefcase} title={l.role} sub={l.org} period={l.period} points={l.points} />
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

export function Achievements() {
  return (
    <Shell id="achievements">
      <SectionHeading eyebrow="Milestones" title="Achievements & Awards" />
      <div className="grid gap-5 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.08}>
            <div className="glass flex gap-4 rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-primary">{a.year}</div>
                <h3 className="font-display mt-0.5 font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  return (
    <Shell id="contact">
      <SectionHeading eyebrow="Get In Touch" title="Let's Build Something" subtitle="Open to roles, research collaborations and freelance projects." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="glass h-full rounded-2xl p-7">
            <h3 className="font-display text-xl font-semibold">Contact details</h3>
            <div className="mt-5 space-y-4 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5 text-primary" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                <Phone className="h-5 w-5 text-primary" /> {profile.phone}
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" /> {profile.location}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all hover:-translate-y-1 hover:text-primary">
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            className="glass flex h-full flex-col gap-4 rounded-2xl p-7"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const body = `From: ${f.get("name")} (${f.get("email")})%0D%0A%0D%0A${f.get("message")}`;
              window.location.href = `mailto:${profile.email}?subject=Portfolio enquiry&body=${body}`;
            }}
          >
            <input name="name" required placeholder="Your name" className="glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            <input name="email" type="email" required placeholder="Email" className="glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            <textarea name="message" required rows={5} placeholder="Tell me about your project…" className="glass resize-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            <button type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </Shell>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Aravinth N · Founder & CEO of Zelabria</span>
        <div className="flex gap-3">
          {socials.slice(0, 5).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-primary">
              <SocialIcon name={s.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
