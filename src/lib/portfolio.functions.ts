import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const BUCKET = "portfolio";
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 20; // ~20 years

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden: admin only");
}

/** One-time bootstrap: the first signed-in user becomes admin. Returns whether the caller is admin. */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await (context.supabase as any).rpc("claim_admin");
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data) };
  });

/** Check whether the current user is an admin. */
export const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: Boolean(data) };
  });

/** Upload media to storage and return a long-lived signed URL. Admin only. */
export const uploadMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { fileBase64: string; fileName: string; contentType: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const base64 = data.fileBase64.includes(",")
      ? data.fileBase64.split(",")[1]
      : data.fileBase64;
    const bytes = Buffer.from(base64, "base64");

    const safeName = data.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safeName}`;

    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: data.contentType, upsert: true });
    if (upErr) throw new Error(upErr.message);

    const { data: signed, error: signErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL);
    if (signErr) throw new Error(signErr.message);

    return { url: signed.signedUrl, path };
  });
