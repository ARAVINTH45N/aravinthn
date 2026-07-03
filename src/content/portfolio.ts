import aravinthPhoto from "@/assets/aravinth.png.asset.json";

export const profile = {
  name: "Aravinth N",
  photo: aravinthPhoto.url,
  location: "Chennai, Tamil Nadu, India",
  email: "aravinth.vnagarajan@gmail.com",
  phone: "+91 9025420055",
  availability: "Available for opportunities & freelance",
  roles: [
    "Electronics & Communication Engineer",
    "AI Engineer",
    "Data Engineer",
    "Cloud Enthusiast",
    "Full Stack Developer",
    "IoT Developer",
    "Founder & CEO of Zelabria",
  ],
  tagline:
    "I build intelligent systems at the intersection of hardware, AI and the cloud — turning ambitious ideas into production-grade products.",
  resumeUrl: "#",
};

export const badges = [
  "AWS Certified",
  "Research Author",
  "Founder & CEO",
  "AI Engineer",
  "ECE Student",
  "Cloud Practitioner",
];

export const stats = [
  { label: "Years Building", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 15, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "Events & Hackathons", value: 10, suffix: "+" },
];

export type Social = {
  label: string;
  href: string;
  icon: string; // react-icons/lucide key handled in component
};

export const socials: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aravinth-n-005085290/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/ARAVINTH45N", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/_aravinthhh/", icon: "instagram" },
  { label: "X", href: "https://x.com/", icon: "x" },
  { label: "Email", href: "mailto:aravinth.vnagarajan@gmail.com", icon: "mail" },
  { label: "WhatsApp", href: "https://wa.me/919025420055", icon: "whatsapp" },
  { label: "LeetCode", href: "https://leetcode.com/", icon: "leetcode" },
  { label: "HackerRank", href: "https://www.hackerrank.com/", icon: "hackerrank" },
  { label: "Medium", href: "https://medium.com/", icon: "medium" },
  { label: "Google Scholar", href: "https://scholar.google.com/", icon: "scholar" },
  { label: "ResearchGate", href: "https://www.researchgate.net/", icon: "researchgate" },
];

export const about = {
  intro:
    "I'm an Electronics & Communication Engineering student and founder driven by a single obsession: building technology that ships. My work spans embedded systems, AI-powered products, data pipelines and cloud infrastructure — always with an eye on real-world impact.",
  mission:
    "To bridge the gap between deep engineering theory and products people actually use, engineering solutions that are elegant under the hood and effortless on the surface.",
  vision:
    "To build a technology company from India that pushes the frontier of AI, IoT and cloud-native systems on a global stage.",
  values: ["Craftsmanship", "Relentless curiosity", "Ownership", "Impact over noise"],
  currentFocus: [
    "Semantic search & vector databases",
    "LLM-powered applications",
    "AWS cloud architecture",
    "Scaling Zelabria",
  ],
  funFacts: [
    "Founded my first company before graduating",
    "Attended hackathons across Tamil Nadu",
    "Comfortable from Verilog to LLMs",
  ],
};

export type SkillCategory = {
  name: string;
  skills: { name: string; level: number; years: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    skills: [
      { name: "Python", level: 90, years: 3 },
      { name: "Java", level: 80, years: 2 },
      { name: "JavaScript", level: 85, years: 3 },
      { name: "TypeScript", level: 80, years: 2 },
      { name: "C", level: 88, years: 3 },
    ],
  },
  {
    name: "Web & Full Stack",
    skills: [
      { name: "React", level: 88, years: 3 },
      { name: "Next.js", level: 82, years: 2 },
      { name: "Node.js", level: 82, years: 2 },
      { name: "Express", level: 80, years: 2 },
      { name: "Tailwind CSS", level: 90, years: 2 },
    ],
  },
  {
    name: "Cloud (AWS)",
    skills: [
      { name: "EC2 / S3 / VPC", level: 85, years: 2 },
      { name: "Lambda", level: 80, years: 1 },
      { name: "IAM", level: 82, years: 2 },
      { name: "API Gateway", level: 78, years: 1 },
      { name: "CloudFormation", level: 72, years: 1 },
    ],
  },
  {
    name: "AI & Data",
    skills: [
      { name: "Machine Learning", level: 82, years: 2 },
      { name: "Vector DB / FAISS", level: 80, years: 1 },
      { name: "LLMs & Prompt Eng.", level: 85, years: 1 },
      { name: "Semantic Search", level: 82, years: 1 },
      { name: "Embeddings", level: 80, years: 1 },
    ],
  },
  {
    name: "Electronics & IoT",
    skills: [
      { name: "Embedded / ESP32", level: 90, years: 3 },
      { name: "Verilog / Vivado", level: 78, years: 2 },
      { name: "MATLAB / Scilab", level: 78, years: 2 },
      { name: "LTSpice", level: 75, years: 2 },
      { name: "PCB Design", level: 80, years: 2 },
    ],
  },
  {
    name: "Databases & Tools",
    skills: [
      { name: "MySQL", level: 85, years: 2 },
      { name: "MongoDB", level: 82, years: 2 },
      { name: "Git & GitHub", level: 90, years: 3 },
      { name: "Postman / REST", level: 85, years: 2 },
      { name: "Figma", level: 78, years: 2 },
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  impact?: string;
};

export const projects: Project[] = [
  {
    title: "Semantic Candidate Ranking System",
    category: "AI",
    description:
      "An AI-powered recruitment engine that ranks candidates against a job description using embeddings and vector similarity search for context-aware matching.",
    tech: ["Python", "FAISS", "LLMs", "Embeddings", "FastAPI"],
    github: "https://github.com/ARAVINTH45N",
    impact: "Cut manual resume screening time dramatically with semantic relevance ranking.",
  },
  {
    title: "ECOVERSE — Smart City Platform",
    category: "IoT",
    description:
      "A centralized platform for eco-city management and sustainable urban development with real-time IoT integration.",
    tech: ["React", "Node.js", "MongoDB", "IoT"],
    github: "https://github.com/ARAVINTH45N",
    demo: "https://ecoverse-city-nexus.lovable.app/",
    impact: "Unified urban sustainability data into a single actionable dashboard.",
  },
  {
    title: "Offline Billing Software",
    category: "Full Stack",
    description:
      "A robust offline-first billing and inventory system for retail businesses with local persistence and PDF invoice generation.",
    tech: ["React", "TypeScript", "SQLite", "Electron"],
    github: "https://github.com/ARAVINTH45N",
    impact: "Reliable billing even without internet connectivity.",
  },
  {
    title: "ACAD SMART",
    category: "Full Stack",
    description:
      "Centralized platform for faculty and research scholars to manage publications and generate reports.",
    tech: ["React", "Express.js", "PostgreSQL", "PDF Processing"],
    github: "https://github.com/ARAVINTH45N",
    impact: "Streamlined academic publication tracking for an entire department.",
  },
  {
    title: "Adaptive Learning System",
    category: "AI",
    description:
      "An intelligent learning system tailored to individual student needs using ML-driven personalization.",
    tech: ["Python", "Machine Learning", "React", "TensorFlow"],
    github: "https://github.com/ARAVINTH45N",
    impact: "Personalized learning paths that adapt to each student.",
  },
  {
    title: "Cloud-Native IoT Pipeline",
    category: "Cloud",
    description:
      "Serverless data pipeline ingesting sensor telemetry into AWS with Lambda, S3 and API Gateway for real-time analytics.",
    tech: ["AWS Lambda", "S3", "API Gateway", "IoT Core"],
    github: "https://github.com/ARAVINTH45N",
    impact: "Scalable, pay-per-use telemetry ingestion architecture.",
  },
];

export const projectCategories = ["All", "AI", "IoT", "Cloud", "Full Stack"];

export type EduItem = {
  title: string;
  org: string;
  period: string;
  score: string;
  points: string[];
};

export const education: EduItem[] = [
  {
    title: "B.E. Electronics & Communication Engineering",
    org: "Saveetha Engineering College, Chennai",
    period: "2023 — 2027",
    score: "CGPA 8.5 / 10",
    points: [
      "Specialization in Embedded Systems & IoT",
      "Coursework: DSP, VLSI, Embedded Systems, Networks, ML",
      "Led multiple technical projects & research initiatives",
    ],
  },
  {
    title: "Higher Secondary (PCM)",
    org: "State Board, Tamil Nadu",
    period: "2021 — 2023",
    score: "90%",
    points: [
      "Strong foundation in Mathematics & Physics",
      "School technical team member",
      "Science exhibition winner",
    ],
  },
];

export type Leadership = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const leadership: Leadership[] = [
  {
    role: "Founder & CEO",
    org: "ZELABRIA",
    period: "2023 — Present",
    points: [
      "Leading a team building embedded, web, AI & IoT solutions",
      "Driving product development from concept to launch",
      "Establishing strategic partnerships and business growth",
    ],
  },
  {
    role: "Vice President — Microsoft Club",
    org: "Saveetha Engineering College",
    period: "2024 — Present",
    points: [
      "Organizing technical workshops & developer events",
      "Mentoring peers on cloud and full-stack development",
    ],
  },
  {
    role: "Head of Operations — Circuit Circus",
    org: "DRESTEIN'24 National Symposium",
    period: "2024",
    points: [
      "Managed operations for a national-level technical symposium",
      "Coordinated multiple teams and event logistics",
    ],
  },
];

export const achievements = [
  { year: "2024", title: "Led Circuit Circus at DRESTEIN'24", desc: "Head of Operations for a national symposium." },
  { year: "2024", title: "AWS Cloud Practitioner", desc: "Certified in cloud fundamentals and architecture." },
  { year: "2023", title: "Founded ZELABRIA", desc: "Launched a technology venture as Founder & CEO." },
  { year: "2023", title: "Hackathons across Tamil Nadu", desc: "Kalasalingam, Jeppiaar, St. Joseph's, Sairam & more." },
];

export const certifications = [
  { title: "Cloud Computing", issuer: "IIT Kharagpur", link: "#" },
  { title: "Internet of Things", issuer: "IIT Kharagpur", link: "#" },
  { title: "Embedded Systems", issuer: "IIT Bhubaneswar", link: "#" },
  { title: "Database for Developers", issuer: "Oracle", link: "#" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", link: "#" },
];

/* ---------------- Publications ---------------- */
export type Publication = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  abstract: string;
  tags: string[];
  link?: string;
};

export const publications: Publication[] = [
  {
    title: "Semantic Candidate Ranking Using Vector Embeddings for Automated Recruitment",
    venue: "International Journal of Emerging Technologies",
    year: "2024",
    authors: "Aravinth N, et al.",
    abstract:
      "A framework that leverages transformer embeddings and approximate nearest-neighbour search to rank candidates against job descriptions with context-aware semantic relevance.",
    tags: ["NLP", "Vector Search", "Recruitment AI"],
    link: "#",
  },
  {
    title: "Cloud-Native IoT Telemetry Pipelines for Smart City Infrastructure",
    venue: "IEEE Student Research Symposium",
    year: "2024",
    authors: "Aravinth N, et al.",
    abstract:
      "A serverless, pay-per-use architecture for ingesting high-frequency sensor telemetry into the cloud, enabling real-time analytics for sustainable urban management.",
    tags: ["IoT", "AWS", "Edge Computing"],
    link: "#",
  },
  {
    title: "Adaptive Learning Systems Driven by Machine Learning Personalization",
    venue: "National Conference on Intelligent Systems",
    year: "2023",
    authors: "Aravinth N, et al.",
    abstract:
      "An adaptive e-learning engine that continuously tailors content difficulty and pacing to each learner using reinforcement-style feedback loops.",
    tags: ["Machine Learning", "EdTech", "Personalization"],
    link: "#",
  },
];

/* ---------------- Testimonials ---------------- */
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dr. R. Karthikeyan",
    role: "Professor, ECE Dept.",
    quote:
      "Aravinth pairs rare technical depth with genuine ownership. He turns ambitious research ideas into working systems faster than anyone I've mentored.",
    initials: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Product Lead, Startup Collab",
    quote:
      "Working with Aravinth felt like having a full engineering team in one person — hardware, AI and cloud, all shipped with polish.",
    initials: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "Hackathon Teammate",
    quote:
      "He's the person you want in the room at 3 AM before a demo. Calm, resourceful, and relentlessly focused on shipping.",
    initials: "AM",
  },
  {
    name: "S. Nivetha",
    role: "Microsoft Club Member",
    quote:
      "As VP, Aravinth made complex cloud concepts click for everyone. A natural mentor and an even better builder.",
    initials: "SN",
  },
];

/* ---------------- Gallery ---------------- */
export type GalleryItem = {
  title: string;
  caption: string;
  span: "tall" | "wide" | "normal";
  accent: string; // tailwind gradient classes
};

export const gallery: GalleryItem[] = [
  { title: "DRESTEIN'24", caption: "Leading Circuit Circus operations", span: "tall", accent: "from-primary/40 to-fuchsia-500/30" },
  { title: "Zelabria", caption: "Building the founding team", span: "wide", accent: "from-cyan-400/30 to-primary/30" },
  { title: "Hackathon Wins", caption: "Across Tamil Nadu", span: "normal", accent: "from-fuchsia-500/30 to-purple-500/30" },
  { title: "Microsoft Club", caption: "Workshops & dev events", span: "normal", accent: "from-emerald-400/30 to-cyan-400/30" },
  { title: "IoT Lab", caption: "ESP32 & embedded builds", span: "wide", accent: "from-amber-400/30 to-primary/30" },
  { title: "AWS Journey", caption: "Cloud Practitioner certified", span: "tall", accent: "from-primary/40 to-cyan-400/30" },
];

/* ---------------- Blog ---------------- */
export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Building a Semantic Search Engine with FAISS and Embeddings",
    excerpt:
      "A practical walkthrough of turning raw text into vectors and serving lightning-fast semantic retrieval in production.",
    date: "Jun 2024",
    readTime: "8 min read",
    category: "AI",
    link: "#",
  },
  {
    title: "From ESP32 to the Cloud: A Real-Time IoT Pipeline",
    excerpt:
      "How I wired embedded sensors to a serverless AWS backend for scalable, pay-per-use telemetry ingestion.",
    date: "Apr 2024",
    readTime: "6 min read",
    category: "IoT",
    link: "#",
  },
  {
    title: "Lessons From Founding a Tech Company as a Student",
    excerpt:
      "The messy, honest reality of starting Zelabria while balancing engineering coursework — and what I'd do differently.",
    date: "Feb 2024",
    readTime: "5 min read",
    category: "Founder",
    link: "#",
  },
];
