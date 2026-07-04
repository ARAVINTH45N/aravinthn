import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as defaults from "@/content/portfolio";

/* ---------------- Types ---------------- */
export type PortfolioData = {
  profile: typeof defaults.profile;
  badges: string[];
  stats: typeof defaults.stats;
  socials: typeof defaults.socials;
  about: typeof defaults.about;
  skillCategories: typeof defaults.skillCategories;
  projects: typeof defaults.projects;
  projectCategories: string[];
  education: typeof defaults.education;
  leadership: typeof defaults.leadership;
  achievements: typeof defaults.achievements;
  certifications: typeof defaults.certifications;
  publications: typeof defaults.publications;
  testimonials: typeof defaults.testimonials;
  gallery: typeof defaults.gallery;
  blogPosts: typeof defaults.blogPosts;
  competitions: { title: string; event: string; year: string; result: string }[];
  documents: { title: string; url: string }[];
};

// Content types stored in content_items.type
export const CONTENT_TYPES = [
  "project",
  "certification",
  "gallery",
  "publication",
  "leadership",
  "achievement",
  "skillCategory",
  "education",
  "competition",
  "document",
  "social",
  "blog",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

// Singleton settings keys stored in site_settings.key
export const SETTING_KEYS = ["profile", "about", "stats", "badges"] as const;
export type SettingKey = (typeof SETTING_KEYS)[number];

type RawItem = { id: string; type: string; data: Record<string, unknown>; sort_order: number; published: boolean };
type RawSetting = { key: string; value: Record<string, unknown> };

export type RemoteContent = {
  items: RawItem[];
  settings: Record<string, Record<string, unknown>>;
};

/* ---------------- Fetch ---------------- */
export async function fetchRemoteContent(includeUnpublished = false): Promise<RemoteContent> {
  const itemsQuery = supabase
    .from("content_items")
    .select("id,type,data,sort_order,published")
    .order("sort_order", { ascending: true });
  if (!includeUnpublished) itemsQuery.eq("published", true);

  const [{ data: items }, { data: settings }] = await Promise.all([
    itemsQuery,
    supabase.from("site_settings").select("key,value"),
  ]);

  const settingsMap: Record<string, Record<string, unknown>> = {};
  (settings as RawSetting[] | null)?.forEach((s) => {
    settingsMap[s.key] = s.value ?? {};
  });

  return { items: (items as RawItem[] | null) ?? [], settings: settingsMap };
}

/* ---------------- Merge ---------------- */
function group(items: RawItem[], type: ContentType) {
  return items.filter((i) => i.type === type).map((i) => i.data);
}

export function mergeContent(remote: RemoteContent | undefined): PortfolioData {
  const items = remote?.items ?? [];
  const settings = remote?.settings ?? {};

  const pick = <T,>(type: ContentType, fallback: T[]): T[] => {
    const g = group(items, type) as T[];
    return g.length ? g : fallback;
  };

  const profile = { ...defaults.profile, ...(settings.profile ?? {}) } as typeof defaults.profile;
  const about = { ...defaults.about, ...(settings.about ?? {}) } as typeof defaults.about;
  const stats = ((settings.stats?.items as typeof defaults.stats) ?? defaults.stats) || defaults.stats;
  const badges = ((settings.badges?.items as string[]) ?? defaults.badges) || defaults.badges;

  const projects = pick("project", defaults.projects);
  const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return {
    profile,
    about,
    stats,
    badges,
    socials: pick("social", defaults.socials),
    skillCategories: pick("skillCategory", defaults.skillCategories),
    projects,
    projectCategories,
    education: pick("education", defaults.education),
    leadership: pick("leadership", defaults.leadership),
    achievements: pick("achievement", defaults.achievements),
    certifications: pick("certification", defaults.certifications),
    publications: pick("publication", defaults.publications),
    testimonials: defaults.testimonials,
    gallery: pick("gallery", defaults.gallery),
    blogPosts: pick("blog", defaults.blogPosts),
    competitions: pick("competition", []),
    documents: pick("document", []),
  };
}

/* ---------------- Context ---------------- */
const PortfolioContext = createContext<PortfolioData>(mergeContent(undefined));

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery({
    queryKey: ["portfolio-content"],
    queryFn: () => fetchRemoteContent(false),
    staleTime: 30_000,
  });

  return (
    <PortfolioContext.Provider value={mergeContent(data)}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
