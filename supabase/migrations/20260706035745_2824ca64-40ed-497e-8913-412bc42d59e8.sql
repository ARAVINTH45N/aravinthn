-- Admin-only access policies for the private "portfolio" storage bucket.
-- Uploads happen via the service role (which bypasses RLS) and public
-- viewing uses long-lived signed URLs, so these policies simply define
-- legitimate authenticated access as admin-only.

CREATE POLICY "Admins can view portfolio objects"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload portfolio objects"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio objects"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio objects"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));