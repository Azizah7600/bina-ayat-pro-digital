-- BINA AYAT PRO DIGITAL — Tambahan: Rekod Penggunaan
-- Jalankan fail ini SEKALI di Supabase > SQL Editor JIKA anda telah menjalankan
-- schema.sql versi lama sebelum ciri Rekod Penggunaan ditambah.
-- (Projek baharu tidak perlu fail ini kerana schema.sql sudah mengandunginya.)

-- ---------------------------------------------------------------------
-- 5. REKOD PENGGUNAAN (bukti penggunaan inovasi)
-- ---------------------------------------------------------------------
create table if not exists public.usage_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  jenis       text not null check (jenis in ('daftar', 'log_masuk', 'sesi')),
  created_at  timestamptz not null default now()
);
create index if not exists usage_logs_masa_idx on public.usage_logs (created_at);
alter table public.usage_logs enable row level security;
revoke all on public.usage_logs from anon;
drop policy if exists "log: tambah sendiri" on public.usage_logs;
create policy "log: tambah sendiri" on public.usage_logs
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "log: baca sendiri atau guru" on public.usage_logs;
create policy "log: baca sendiri atau guru" on public.usage_logs
  for select to authenticated using (user_id = auth.uid() or public.is_guru());
