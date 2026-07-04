import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { checkAdmin } from "@/lib/portfolio.functions";
import { useServerFn } from "@tanstack/react-start";
import { fetchRemoteContent, type ContentType } from "@/lib/portfolio-data";
import { RecordForm, type FieldDef } from "@/components/admin/editors";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Loader2, Plus, Trash2, Save, Eye, EyeOff, LogOut, ExternalLink, ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Aravinth N" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

/* ---------------- Config ---------------- */
type ListSection = {
  key: ContentType;
  label: string;
  fields: FieldDef[];
  title: (d: Record<string, unknown>) => string;
};
type SettingSection = { key: string; label: string; fields: FieldDef[]; isSetting: true };

const LIST_SECTIONS: ListSection[] = [
  {
    key: "project",
    label: "Projects",
    title: (d) => (d.title as string) || "Untitled project",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "category", label: "Category", type: "text", placeholder: "AI / IoT / Cloud / Full Stack" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "tech", label: "Tech stack", type: "tags" },
      { name: "github", label: "GitHub URL", type: "url" },
      { name: "demo", label: "Demo URL", type: "url" },
      { name: "impact", label: "Impact", type: "text" },
    ],
  },
  {
    key: "skillCategory",
    label: "Skills",
    title: (d) => (d.name as string) || "Category",
    fields: [
      { name: "name", label: "Category name", type: "text" },
      { name: "skills", label: "Skills", type: "skills" },
    ],
  },
  {
    key: "education",
    label: "Education",
    title: (d) => (d.title as string) || "Education",
    fields: [
      { name: "title", label: "Degree / Title", type: "text" },
      { name: "org", label: "Institution", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "score", label: "Score", type: "text" },
      { name: "points", label: "Highlights", type: "list" },
    ],
  },
  {
    key: "leadership",
    label: "Leadership",
    title: (d) => (d.role as string) || "Role",
    fields: [
      { name: "role", label: "Role", type: "text" },
      { name: "org", label: "Organization", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "points", label: "Highlights", type: "list" },
    ],
  },
  {
    key: "achievement",
    label: "Achievements",
    title: (d) => (d.title as string) || "Achievement",
    fields: [
      { name: "year", label: "Year", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "certification",
    label: "Certifications",
    title: (d) => (d.title as string) || "Certification",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "issuer", label: "Issuer", type: "text" },
      { name: "link", label: "Link", type: "url" },
    ],
  },
  {
    key: "competition",
    label: "Competitions",
    title: (d) => (d.title as string) || "Competition",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "event", label: "Event", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "result", label: "Result", type: "text" },
    ],
  },
  {
    key: "publication",
    label: "Publications",
    title: (d) => (d.title as string) || "Publication",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "year", label: "Year", type: "text" },
      { name: "authors", label: "Authors", type: "text" },
      { name: "abstract", label: "Abstract", type: "textarea" },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "link", label: "Link", type: "url" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery",
    title: (d) => (d.title as string) || "Image",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "caption", label: "Caption", type: "text" },
      { name: "span", label: "Span", type: "text", placeholder: "tall / wide / normal" },
      { name: "accent", label: "Accent gradient classes", type: "text" },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    key: "blog",
    label: "Blog Posts",
    title: (d) => (d.title as string) || "Post",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "date", label: "Date", type: "text" },
      { name: "readTime", label: "Read time", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "link", label: "Link", type: "url" },
    ],
  },
  {
    key: "document",
    label: "Documents",
    title: (d) => (d.title as string) || "Document",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "url", label: "File", type: "file" },
    ],
  },
  {
    key: "social",
    label: "Social Links",
    title: (d) => (d.label as string) || "Link",
    fields: [
      { name: "label", label: "Label", type: "text" },
      { name: "href", label: "URL", type: "url" },
      {
        name: "icon",
        label: "Icon",
        type: "text",
        placeholder: "linkedin, github, instagram, x, mail, whatsapp, leetcode, hackerrank, medium, scholar, researchgate",
      },
    ],
  },
];

const SETTING_SECTIONS: SettingSection[] = [
  {
    key: "profile",
    label: "Profile & Resume",
    isSetting: true,
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "availability", label: "Availability", type: "text" },
      { name: "tagline", label: "Tagline", type: "textarea" },
      { name: "location", label: "Location", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "roles", label: "Roles (typing animation)", type: "list" },
      { name: "photo", label: "Profile picture", type: "image" },
      { name: "resumeUrl", label: "Resume file", type: "file" },
    ],
  },
  {
    key: "about",
    label: "About Me",
    isSetting: true,
    fields: [
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "mission", label: "Mission", type: "textarea" },
      { name: "vision", label: "Vision", type: "textarea" },
      { name: "values", label: "Core values", type: "tags" },
      { name: "currentFocus", label: "Current focus", type: "list" },
      { name: "funFacts", label: "Fun facts", type: "list" },
    ],
  },
  {
    key: "stats",
    label: "Stats & Badges",
    isSetting: true,
    fields: [
      { name: "stats", label: "Stats", type: "stats" },
      { name: "badges", label: "Badges", type: "tags" },
    ],
  },
];

const ALL_SECTIONS = [...SETTING_SECTIONS, ...LIST_SECTIONS];

/* ---------------- Page ---------------- */
function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const check = useServerFn(checkAdmin);
  const [activeKey, setActiveKey] = useState<string>(SETTING_SECTIONS[0].key);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => check() });
  const contentQ = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => fetchRemoteContent(true),
    enabled: adminQ.data?.isAdmin === true,
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (adminQ.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!adminQ.data?.isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="h-10 w-10 text-primary" />
        <h1 className="font-display text-2xl font-bold">Not an admin</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          This account doesn't have admin access. The first account created becomes the admin.
        </p>
        <button onClick={signOut} className="glass rounded-xl px-4 py-2 text-sm hover:text-primary">
          Sign out
        </button>
      </div>
    );
  }

  const activeSection = ALL_SECTIONS.find((s) => s.key === activeKey)!;
  const isSetting = "isSetting" in activeSection;

  return (
    <div className="relative min-h-screen">
      <div className="aurora" />
      <Toaster />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="glass h-fit shrink-0 rounded-2xl p-4 lg:w-64 lg:sticky lg:top-8">
          <div className="mb-4 px-2">
            <h1 className="font-display text-lg font-bold">
              Portfolio <span className="text-gradient">Admin</span>
            </h1>
          </div>
          <nav className="flex flex-wrap gap-1 lg:flex-col">
            {SETTING_SECTIONS.map((s) => (
              <SideBtn key={s.key} active={activeKey === s.key} onClick={() => setActiveKey(s.key)}>
                {s.label}
              </SideBtn>
            ))}
            <div className="my-2 hidden h-px bg-border lg:block" />
            {LIST_SECTIONS.map((s) => (
              <SideBtn key={s.key} active={activeKey === s.key} onClick={() => setActiveKey(s.key)}>
                {s.label}
              </SideBtn>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4">
            <Link to="/" className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:text-primary">
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <button onClick={signOut} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          {contentQ.isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isSetting ? (
            <SettingEditor
              section={activeSection as SettingSection}
              current={contentQ.data?.settings[activeKey] ?? {}}
              onSaved={() => contentQ.refetch()}
            />
          ) : (
            <ListEditor
              section={activeSection as ListSection}
              items={(contentQ.data?.items ?? []).filter((i) => i.type === activeKey)}
              onChanged={() => contentQ.refetch()}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function SideBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- Setting editor ---------------- */
function SettingEditor({
  section,
  current,
  onSaved,
}: {
  section: SettingSection;
  current: Record<string, unknown>;
  onSaved: () => void;
}) {
  // stats section stores { stats:[], badges:[] } but persisted as two keys
  const initial =
    section.key === "stats"
      ? { stats: (current as any).items ?? undefined, badges: undefined }
      : current;
  const [value, setValue] = useState<Record<string, unknown>>(initial);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      if (section.key === "stats") {
        await supabase.from("site_settings").upsert({ key: "stats", value: { items: value.stats ?? [] } });
        await supabase.from("site_settings").upsert({ key: "badges", value: { items: value.badges ?? [] } });
      } else {
        const { error } = await supabase.from("site_settings").upsert({ key: section.key, value });
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display mb-5 text-xl font-semibold">{section.label}</h2>
      <RecordForm fields={section.fields} value={value} onChange={setValue} />
      <div className="mt-6">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
        </button>
      </div>
    </div>
  );
}

/* ---------------- List editor ---------------- */
type Item = { id: string; type: string; data: Record<string, unknown>; sort_order: number; published: boolean };

function ListEditor({
  section,
  items,
  onChanged,
}: {
  section: ListSection;
  items: Item[];
  onChanged: () => void;
}) {
  const [editing, setEditing] = useState<Item | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const nextOrder = useMemo(() => (items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 0), [items]);

  function startNew() {
    setEditing({ id: "", type: section.key, data: {}, sort_order: nextOrder, published: true });
    setDraft({});
  }
  function startEdit(it: Item) {
    setEditing(it);
    setDraft(it.data);
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        const { error } = await supabase
          .from("content_items")
          .update({ data: draft })
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("content_items").insert({
          type: section.key,
          data: draft,
          sort_order: editing.sort_order,
          published: true,
        });
        if (error) throw error;
      }
      toast.success("Saved");
      setEditing(null);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("content_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    onChanged();
  }

  async function togglePublish(it: Item) {
    const { error } = await supabase
      .from("content_items")
      .update({ published: !it.published })
      .eq("id", it.id);
    if (error) return toast.error(error.message);
    onChanged();
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">{section.label}</h2>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {editing && (
        <div className="glass mb-6 rounded-2xl p-6">
          <h3 className="mb-4 text-sm font-semibold text-primary">
            {editing.id ? "Edit item" : "New item"}
          </h3>
          <RecordForm fields={section.fields} value={draft} onChange={setDraft} />
          <div className="mt-5 flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="glass rounded-xl px-5 py-2.5 text-sm hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No items yet — the site shows default content until you add your own.
          </p>
        )}
        {items.map((it) => (
          <div key={it.id} className="glass flex items-center justify-between gap-3 rounded-xl p-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{section.title(it.data)}</div>
              {!it.published && <span className="text-xs text-muted-foreground">Hidden</span>}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button onClick={() => togglePublish(it)} className="rounded-lg p-2 text-muted-foreground hover:text-foreground" title={it.published ? "Hide" : "Show"}>
                {it.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button onClick={() => startEdit(it)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
                Edit
              </button>
              <button onClick={() => remove(it.id)} className="rounded-lg p-2 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
