-- =====================================================================
-- BINA AYAT PRO DIGITAL — Skema pangkalan data Supabase
-- Inovasi: Cikgu Azizah Ismail, Kolej Vokasional Wakaf Tembesu
--
-- CARA GUNA: Supabase > SQL Editor > New query > tampal SEMUA kandungan
-- fail ini > Run. Jalankan sekali sahaja pada projek baharu.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. JADUAL
-- ---------------------------------------------------------------------

-- Kod akses: menentukan siapa boleh mendaftar, sebagai pelajar atau guru,
-- serta semester dan kelas pelajar.
create table if not exists public.access_codes (
  kod         text primary key check (kod ~ '^[A-Z0-9-]{4,30}$'),
  keterangan  text,
  kelas       text,
  semester    int  check (semester between 1 and 4),
  peranan     text not null default 'pelajar' check (peranan in ('pelajar', 'guru')),
  aktif       boolean not null default true,
  had_guna    int  check (had_guna > 0),
  bil_guna    int  not null default 0,
  created_by  uuid default auth.uid() references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Profil pengguna (satu baris bagi setiap akaun Supabase Auth)
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nama        text not null check (char_length(nama) between 2 and 80),
  no_matrik   text unique,
  email       text,
  semester    int  check (semester between 1 and 4),
  kelas       text,
  peranan     text not null default 'pelajar' check (peranan in ('pelajar', 'guru')),
  aktif       boolean not null default true,
  kod_akses   text references public.access_codes (kod) on update cascade on delete set null,
  created_at  timestamptz not null default now()
);

-- Rekod setiap latihan, cabaran dan ujian
create table if not exists public.attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  modul       int  not null default 0 check (modul between 0 and 6),
  tahap       int  not null default 0 check (tahap between 0 and 3),
  jenis       text not null check (jenis in ('latihan', 'padanan', 'cabaran', 'mingguan', 'pemulihan', 'pra', 'pasca')),
  markah      int  not null check (markah >= 0),
  jumlah      int  not null check (jumlah > 0),
  peratus     int  not null check (peratus between 0 and 100),
  mata        int  not null default 0 check (mata between 0 and 500),
  minggu      text,
  butiran     jsonb not null default '[]'::jsonb,   -- [{q: id soalan, t: topik, b: betul?}]
  created_at  timestamptz not null default now()
);
-- Ujian pra dan pasca hanya boleh diduduki sekali bagi setiap pelajar
create unique index if not exists attempts_ujian_sekali on public.attempts (user_id, jenis) where jenis in ('pra', 'pasca');
create index if not exists attempts_user_idx on public.attempts (user_id);
create index if not exists attempts_masa_idx on public.attempts (created_at);

-- Ayat terbuka Modul 4 (Bina Ayat) untuk semakan guru
create table if not exists public.submissions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  soalan_id     text not null,
  tahap         int  not null check (tahap between 1 and 3),
  tugasan       text,
  ayat          text not null check (char_length(ayat) between 3 and 400),
  semakan_auto  jsonb,
  status        text not null default 'menunggu' check (status in ('menunggu', 'disemak')),
  rubrik        jsonb,      -- {struktur, tatabahasa, imbuhan, makna, tanda}
  markah        int  check (markah between 0 and 100),
  ulasan        text,
  disemak_oleh  uuid references public.profiles (id) on delete set null,
  disemak_pada  timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists submissions_user_idx on public.submissions (user_id);
create index if not exists submissions_status_idx on public.submissions (status);

-- ---------------------------------------------------------------------
-- 2. FUNGSI PEMBANTU
-- ---------------------------------------------------------------------

-- Adakah pengguna semasa seorang guru yang aktif?
create or replace function public.is_guru()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and peranan = 'guru' and aktif);
$$;

-- Dipanggil secara automatik apabila akaun baharu didaftarkan.
-- Mengesahkan kod akses, mencipta profil dan menambah bilangan penggunaan kod.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  m      jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_kod  text  := upper(trim(coalesce(m ->> 'kod_akses', '')));
  v_mat  text  := upper(trim(coalesce(m ->> 'no_matrik', '')));
  v_sem  int;
  k      public.access_codes%rowtype;
begin
  select * into k from public.access_codes where kod = v_kod for update;
  if not found or not k.aktif then
    raise exception 'KOD_TIDAK_SAH';
  end if;
  if k.had_guna is not null and k.bil_guna >= k.had_guna then
    raise exception 'KOD_PENUH';
  end if;

  if k.peranan = 'pelajar' then
    if v_mat = '' then raise exception 'MATRIK_DIPERLUKAN'; end if;
    if exists (select 1 from public.profiles where no_matrik = v_mat) then raise exception 'MATRIK_WUJUD'; end if;
    v_sem := coalesce(k.semester, case when (m ->> 'semester') ~ '^[1-4]$' then (m ->> 'semester')::int end);
  end if;

  insert into public.profiles (id, nama, no_matrik, email, semester, kelas, peranan, kod_akses)
  values (
    new.id,
    left(coalesce(nullif(trim(m ->> 'nama'), ''), 'Pengguna'), 80),
    case when k.peranan = 'pelajar' then v_mat end,
    new.email,
    v_sem,
    k.kelas,
    k.peranan,
    k.kod
  );
  update public.access_codes set bil_guna = bil_guna + 1 where kod = k.kod;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- 3. ROW LEVEL SECURITY (RLS)
--    Pelajar: hanya melihat dan menambah rekod sendiri.
--    Guru: melihat semua rekod, menyemak ayat, mengurus kod dan akaun.
-- ---------------------------------------------------------------------
alter table public.access_codes enable row level security;
alter table public.profiles     enable row level security;
alter table public.attempts     enable row level security;
alter table public.submissions  enable row level security;

-- Pengguna tanpa log masuk (anon) tidak boleh membaca atau menulis apa-apa
revoke all on public.access_codes, public.profiles, public.attempts, public.submissions from anon;

drop policy if exists "kod: guru urus" on public.access_codes;
create policy "kod: guru urus" on public.access_codes
  for all to authenticated using (public.is_guru()) with check (public.is_guru());

drop policy if exists "profil: baca sendiri atau guru" on public.profiles;
create policy "profil: baca sendiri atau guru" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_guru());

drop policy if exists "profil: guru kemas kini" on public.profiles;
create policy "profil: guru kemas kini" on public.profiles
  for update to authenticated using (public.is_guru()) with check (public.is_guru());

drop policy if exists "cubaan: baca" on public.attempts;
create policy "cubaan: baca" on public.attempts
  for select to authenticated using (user_id = auth.uid() or public.is_guru());

drop policy if exists "cubaan: tambah sendiri" on public.attempts;
create policy "cubaan: tambah sendiri" on public.attempts
  for insert to authenticated
  with check (user_id = auth.uid() and exists (select 1 from public.profiles p where p.id = auth.uid() and p.aktif));

drop policy if exists "cubaan: guru padam" on public.attempts;
create policy "cubaan: guru padam" on public.attempts
  for delete to authenticated using (public.is_guru());

drop policy if exists "ayat: baca" on public.submissions;
create policy "ayat: baca" on public.submissions
  for select to authenticated using (user_id = auth.uid() or public.is_guru());

drop policy if exists "ayat: hantar sendiri" on public.submissions;
create policy "ayat: hantar sendiri" on public.submissions
  for insert to authenticated
  with check (user_id = auth.uid() and status = 'menunggu' and rubrik is null and markah is null and disemak_oleh is null
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.aktif));

drop policy if exists "ayat: guru semak" on public.submissions;
create policy "ayat: guru semak" on public.submissions
  for update to authenticated using (public.is_guru()) with check (public.is_guru());

-- Kebenaran akses API untuk pengguna yang log masuk (GRANT_EKSPLISIT).
-- RLS di atas tetap mengawal baris mana yang boleh dibaca atau diubah.
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.access_codes, public.profiles, public.attempts, public.submissions to authenticated;
grant execute on function public.is_guru() to authenticated;

-- ---------------------------------------------------------------------
-- 4. DATA AWAL: kod pendaftaran guru pertama
--    TUKAR kod ini kepada kod rahsia anda sendiri sebelum menjalankan
--    fail ini, atau nyahaktifkan kod selepas akaun guru dicipta.
-- ---------------------------------------------------------------------
insert into public.access_codes (kod, keterangan, peranan, had_guna)
values ('GURU-KVWT-2026', 'Kod pendaftaran guru pertama. Nyahaktifkan selepas digunakan.', 'guru', 3)
on conflict (kod) do nothing;

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
grant select, insert on public.usage_logs to authenticated; -- GRANT_EKSPLISIT
