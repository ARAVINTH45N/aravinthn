import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ScrollProgress, useSmoothScroll } from "@/components/portfolio/motion";
import {
  About, Skills, Projects, Education, Leadership, Achievements, Contact, Footer,
} from "@/components/portfolio/Sections";
import {
  Gallery, Publications, Testimonials, Blog,
} from "@/components/portfolio/SectionsExtra";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aravinth N — AI, Cloud & Full Stack Engineer | Founder of Zelabria" },
      {
        name: "description",
        content:
          "Aravinth N — Electronics & Communication Engineer, AI & Data Engineer, Cloud enthusiast, Full Stack & IoT developer, and Founder & CEO of Zelabria. Explore projects, skills and research.",
      },
      { property: "og:title", content: "Aravinth N — Engineer, AI Builder & Founder" },
      { property: "og:description", content: "AI, Cloud, Full Stack & IoT engineer. Founder & CEO of Zelabria." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aravinth N",
          jobTitle: "AI Engineer, Full Stack Developer, Founder & CEO of Zelabria",
          url: "/",
          sameAs: [
            "https://www.linkedin.com/in/aravinth-n-005085290/",
            "https://github.com/ARAVINTH45N",
            "https://www.instagram.com/_aravinthhh/",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="aurora" />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <Publications />
        <Education />
        <Leadership />
        <Achievements />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
