import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Quote, ArrowUpRight, Calendar, Clock, ExternalLink } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./primitives";
import { Tilt3D } from "./motion";

function Shell({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-4 py-24 ${className}`}>
      {children}
    </section>
  );
}

/* ---------------- Gallery (masonry) ---------------- */
export function Gallery() {
  const spanClass: Record<string, string> = {
    tall: "row-span-2",
    wide: "sm:col-span-2",
    normal: "",
  };
  return (
    <Shell id="gallery">
      <SectionHeading eyebrow="Moments" title="Gallery" subtitle="Snapshots from events, builds and the journey so far." />
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3">
        {gallery.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.08} className={spanClass[g.span]}>
            <Tilt3D strength={8} className={`group glass relative h-full overflow-hidden rounded-2xl`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${g.accent} transition-transform duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5" style={{ transform: "translateZ(30px)" }}>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <p className="text-xs text-muted-foreground">{g.caption}</p>
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Publications ---------------- */
export function Publications() {
  return (
    <Shell id="publications">
      <SectionHeading eyebrow="Research" title="Publications" subtitle="Peer-reviewed work at the intersection of AI, IoT and the cloud." />
      <div className="space-y-5">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <a
              href={p.link}
              className="glass group relative block overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{p.venue}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                    <span>·</span>
                    <span>{p.authors}</span>
                  </div>
                  <h3 className="font-display mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.abstract}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-muted px-2 py-1 text-[11px] text-foreground/80">{t}</span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  return (
    <Shell id="testimonials">
      <SectionHeading eyebrow="Kind Words" title="Testimonials" subtitle="What mentors, teammates and collaborators say." />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06}>
              <button
                onClick={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-all ${
                  active === i ? "glass-strong ring-1 ring-primary/40" : "glass hover:-translate-y-0.5"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-fuchsia-500/30 text-sm font-bold text-foreground">
                  {item.initials}
                </span>
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="glass relative flex h-full min-h-[260px] flex-col justify-center overflow-hidden rounded-2xl p-8">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/10" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <p className="font-display text-xl leading-relaxed text-foreground/90">“{t.quote}”</p>
                <footer className="mt-6">
                  <div className="text-sm font-semibold text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

/* ---------------- Blog ---------------- */
export function Blog() {
  return (
    <Shell id="blog">
      <SectionHeading eyebrow="Writing" title="From the Blog" subtitle="Notes on building at the frontier of AI, IoT and the cloud." />
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post, i) => (
          <Reveal key={post.title} delay={(i % 3) * 0.08}>
            <a href={post.link}>
              <Tilt3D strength={7} className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
                <div className="relative flex flex-1 flex-col" style={{ transform: "translateZ(25px)" }}>
                  <span className="w-fit rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
                  <h3 className="font-display mt-4 text-lg font-semibold leading-snug">{post.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read article <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Tilt3D>
            </a>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}
