import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { uploadMedia } from "@/lib/portfolio.functions";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "tags"
  | "list"
  | "image"
  | "file"
  | "skills"
  | "stats";

export type FieldDef = { name: string; label: string; type: FieldType; placeholder?: string };

/* ---------------- Upload helper ---------------- */
function useUpload() {
  const upload = useServerFn(uploadMedia);
  const [busy, setBusy] = useState(false);

  async function handle(file: File): Promise<string | null> {
    setBusy(true);
    try {
      const base64: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await upload({
        data: { fileBase64: base64, fileName: file.name, contentType: file.type },
      });
      return res.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      return null;
    } finally {
      setBusy(false);
    }
  }
  return { handle, busy };
}

const inputCls =
  "glass w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/40";

/* ---------------- Single field ---------------- */
export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const { handle, busy } = useUpload();
  const fileRef = useRef<HTMLInputElement>(null);

  if (field.type === "textarea") {
    return (
      <textarea
        rows={4}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`${inputCls} resize-none`}
      />
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={(value as number) ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputCls}
      />
    );
  }

  if (field.type === "tags") {
    const arr = (value as string[]) ?? [];
    return (
      <input
        value={arr.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder={field.placeholder ?? "Comma separated"}
        className={inputCls}
      />
    );
  }

  if (field.type === "list") {
    const arr = (value as string[]) ?? [];
    return (
      <textarea
        rows={4}
        value={arr.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s).filter((s) => s.trim()))}
        placeholder={field.placeholder ?? "One item per line"}
        className={`${inputCls} resize-none`}
      />
    );
  }

  if (field.type === "stats") {
    const arr = (value as { label: string; value: number; suffix: string }[]) ?? [];
    return (
      <textarea
        rows={4}
        value={arr.map((s) => `${s.label} | ${s.value} | ${s.suffix ?? ""}`).join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .filter((l) => l.trim())
              .map((l) => {
                const [label, val, suffix] = l.split("|").map((p) => p.trim());
                return { label: label ?? "", value: Number(val) || 0, suffix: suffix ?? "" };
              })
          )
        }
        placeholder="Label | Value | Suffix   (one per line)"
        className={`${inputCls} resize-none`}
      />
    );
  }

  if (field.type === "skills") {
    const arr = (value as { name: string; level: number; years: number }[]) ?? [];
    return (
      <textarea
        rows={5}
        value={arr.map((s) => `${s.name} | ${s.level} | ${s.years}`).join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .filter((l) => l.trim())
              .map((l) => {
                const [name, level, years] = l.split("|").map((p) => p.trim());
                return { name: name ?? "", level: Number(level) || 0, years: Number(years) || 0 };
              })
          )
        }
        placeholder="Skill | level(0-100) | years   (one per line)"
        className={`${inputCls} resize-none`}
      />
    );
  }

  if (field.type === "image" || field.type === "file") {
    const url = (value as string) ?? "";
    return (
      <div className="flex items-center gap-3">
        {field.type === "image" && url && (
          <img src={url} alt="" className="h-14 w-14 rounded-lg object-cover" />
        )}
        <input
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL or upload"
          className={inputCls}
        />
        <input
          ref={fileRef}
          type="file"
          accept={field.type === "image" ? "image/*" : undefined}
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const uploaded = await handle(f);
            if (uploaded) onChange(uploaded);
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="glass inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm hover:text-primary disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </button>
      </div>
    );
  }

  // text / url
  return (
    <input
      type={field.type === "url" ? "url" : "text"}
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={inputCls}
    />
  );
}

/* ---------------- Form (record of fields) ---------------- */
export function RecordForm({
  fields,
  value,
  onChange,
}: {
  fields: FieldDef[];
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div
          key={f.name}
          className={
            f.type === "textarea" || f.type === "list" || f.type === "skills" || f.type === "stats"
              ? "sm:col-span-2"
              : ""
          }
        >
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{f.label}</label>
          <FieldInput field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
        </div>
      ))}
    </div>
  );
}

export { X };
