# Panduan Setup dan Deployment
## BINA AYAT PRO DIGITAL

Panduan ini menerangkan cara menyambungkan aplikasi kepada pangkalan data sebenar (Supabase) dan menerbitkannya melalui pautan awam. Anggaran masa: 30–45 minit. Tiada pengaturcaraan diperlukan. Anda hanya perlu menyalin dan menampal.

---

## Bahagian A: Fahami dua mod aplikasi

| Mod | Bila digunakan | Di mana data disimpan |
|---|---|---|
| **Mod Demo** | Mencuba dan membuat pembentangan | Dalam pelayar komputer itu sahaja (hilang jika cache dipadam) |
| **Mod Rasmi (Supabase)** | Penggunaan sebenar oleh pelajar dan guru | Pangkalan data berpusat Supabase (selamat, boleh diakses dari mana-mana peranti) |

Aplikasi akan beralih ke Mod Rasmi secara automatik sebaik sahaja `SUPABASE_URL` dan `SUPABASE_ANON_KEY` diisi dalam fail `js/config.js`.

---

## Bahagian B: Cipta pangkalan data Supabase

### Langkah 1: Daftar akaun Supabase
1. Pergi ke **https://supabase.com** dan klik **Start your project**.
2. Daftar menggunakan akaun GitHub atau e-mel.

### Langkah 2: Cipta projek baharu
1. Klik **New project**.
2. Isi maklumat berikut:
   - **Name:** `bina-ayat-pro`
   - **Database Password:** cipta kata laluan yang kukuh dan **simpan di tempat selamat**.
   - **Region:** pilih **Southeast Asia (Singapore)** untuk kelajuan terbaik di Malaysia.
3. Klik **Create new project** dan tunggu 1–2 minit.

### Langkah 3: Bina jadual pangkalan data
1. Buka fail `supabase/schema.sql` menggunakan Notepad.
2. **Penting:** cari baris `GURU-KVWT-2026` di hujung fail dan tukar kod itu kepada kod rahsia anda sendiri, contohnya `GURU-AZIZAH-8842`. Kod ini digunakan untuk mendaftar akaun guru pertama.
3. Dalam Supabase, klik **SQL Editor** (menu kiri) dan pilih **New query**.
4. Salin **semua** kandungan `schema.sql`, tampal dalam editor, kemudian klik **Run**.
5. Mesej "Success. No rows returned" menunjukkan setup berjaya.

Fail ini mencipta lima jadual (`access_codes`, `profiles`, `attempts`, `submissions`, `usage_logs`), fungsi pengesahan kod akses, Row Level Security dan satu kod pendaftaran guru.

> **Sudah menjalankan `schema.sql` versi lama?** Jalankan pula fail `supabase/tambahan-rekod-penggunaan.sql` sekali sahaja dengan cara yang sama. Fail ini menambah jadual rekod penggunaan.

### Langkah 4: Tetapan log masuk (WAJIB)
1. Klik **Authentication** > **Sign In / Providers** > **Email**.
2. **Matikan** pilihan **Confirm email**, kemudian klik **Save**.
   > Pelajar log masuk menggunakan nombor matrik, bukan e-mel sebenar. Oleh itu, pengesahan e-mel mesti dimatikan.
3. Klik **Authentication** > **Rate Limits**. Naikkan had **sign-ups and sign-ins** (contohnya kepada 150 setiap 5 minit). Langkah ini penting kerana satu kelas yang mendaftar serentak dari rangkaian kolej yang sama boleh mencapai had lalai.

### Langkah 5: Salin kunci API
1. Klik **Project Settings** (ikon gear) > **API** (atau **Data API**).
2. Salin dua maklumat berikut:
   - **Project URL**, contohnya `https://abcdefgh.supabase.co`
   - **anon public key**, iaitu rentetan panjang yang bermula dengan `eyJ...`
   > Kunci *anon public* selamat diletakkan dalam aplikasi kerana data dilindungi oleh Row Level Security. **Jangan sekali-kali** gunakan kunci `service_role`.

### Langkah 6: Masukkan kunci dalam aplikasi
Buka `js/config.js` dengan Notepad dan isi seperti contoh di bawah:

```js
SUPABASE_URL: 'https://abcdefgh.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGciOi...kunci-penuh-anda...',
```

Simpan fail. Jalur kuning "MOD DEMO" akan hilang apabila aplikasi dibuka.

---

## Bahagian C: Terbitkan aplikasi (pautan awam)

### Pilihan 1: Netlify Drop (paling mudah, percuma)
1. Pergi ke **https://app.netlify.com/drop**.
2. Daftar atau log masuk.
3. Seret **keseluruhan folder** `bina-ayat-pro` ke dalam kotak di halaman tersebut.
4. Dalam beberapa saat, anda akan menerima pautan seperti `https://nama-rawak.netlify.app`.
5. Klik **Site configuration** > **Change site name** dan tukar kepada nama yang mudah, contohnya `binaayatpro-kvwt`.

Untuk mengemas kini aplikasi pada masa hadapan, buka **Deploys** dan seret semula folder yang telah dikemas kini.

### Pilihan 2: Railway (jika anda sudah menggunakan Railway)
1. Muat naik folder projek ke repositori GitHub.
2. Dalam Railway, klik **New Project** > **Deploy from GitHub repo** dan pilih repositori tersebut.
3. Railway akan mengesan fail `package.json` dan menjalankan `npm start` secara automatik.
4. Di bawah **Settings** > **Networking**, klik **Generate Domain** untuk mendapatkan pautan awam.

### Pilihan 3: GitHub Pages
Muat naik folder ke repositori GitHub, kemudian buka **Settings** > **Pages** > **Deploy from branch** (`main`, folder `/root`).

---

## Bahagian D: Langkah pertama selepas deployment

1. Buka pautan aplikasi dan klik tab **Daftar Guru**.
2. Isi nama, e-mel dan kod guru yang anda tetapkan dalam Langkah 3, kemudian cipta kata laluan.
3. Selepas log masuk, buka menu **Kod Akses**:
   - Cipta satu kod bagi setiap kelas, contohnya `SVM1-BAKERI-2026` (Semester 1, Kelas "SVM 1 Bakeri", had 40).
   - **Nyahaktifkan** kod guru pertama jika tiada guru lain yang perlu mendaftar.
4. Berikan kod kelas dan pautan aplikasi kepada pelajar.
5. Pelajar mendaftar melalui tab **Daftar Pelajar** dengan nama, nombor matrik, semester dan kod akses.
   > Semester dan kelas pelajar ditetapkan secara automatik oleh kod akses (jika kod itu mempunyai semester).

---

## Bahagian E: Keselamatan dan sandaran data

- **Row Level Security:** pelajar hanya boleh melihat rekod sendiri. Guru boleh melihat semua rekod. Pengguna yang belum log masuk tidak boleh membaca sebarang data.
- **Akaun dinyahaktifkan** tidak boleh log masuk atau menghantar jawapan.
- **Ujian pra dan pasca** hanya boleh diduduki sekali. Guru boleh membenarkan ujian diulang melalui halaman butiran pelajar.
- **Sandaran:** pelan percuma Supabase tidak menyediakan sandaran automatik yang boleh dimuat turun. Gunakan menu **Laporan > Sandaran data (JSON)** sekurang-kurangnya **sebulan sekali** dan simpan fail tersebut dalam Google Drive. Pelan berbayar Supabase (Pro) menyediakan sandaran harian automatik.
- **Lupa kata laluan pelajar:** dalam Supabase, buka **Authentication** > **Users**, cari pengguna dan klik **Send password recovery**, atau padam pengguna itu supaya pelajar boleh mendaftar semula (rekod lama akan dipadam bersama).

---

## Bahagian F: Penyelesaian masalah

| Masalah | Penyelesaian |
|---|---|
| "Akaun dicipta tetapi pengesahan e-mel diaktifkan" | Matikan **Confirm email** (Langkah 4). |
| "Pendaftaran ditolak. Semak kod akses…" | Kod salah, kod tidak aktif, kod telah penuh atau nombor matrik sudah didaftarkan. Semak di menu Kod Akses. |
| "Gagal memuatkan pustaka Supabase" | Semak sambungan Internet. Aplikasi memuatkan pustaka Supabase dari cdn.jsdelivr.net. |
| Jalur "MOD DEMO" masih kelihatan | `SUPABASE_URL` atau `SUPABASE_ANON_KEY` dalam `js/config.js` masih kosong, atau fail belum dimuat naik semula. |
| Pelajar ramai gagal mendaftar serentak | Naikkan had dalam **Authentication > Rate Limits** (Langkah 4). |

---

## Struktur fail projek

```
bina-ayat-pro/
├── index.html                  Halaman utama aplikasi
├── assets/                    Imej latar rasmi dan logo BINA AYAT PRO DIGITAL
├── css/style.css               Reka bentuk (tema Futuristic 3D: biru elektrik, navy, ungu, cyan, emas lembut)
├── js/config.js                ← Tetapan Supabase diisi di sini
├── js/store.js                 Lapisan data (Supabase atau Demo)
├── js/app.js                   Logik aplikasi dan semua halaman
├── js/visual.js                Grafik 3D: latar terapung, ilustrasi hero, ikon modul dan tahap, bar pengumuman
├── js/bank-asas.js             Modul 1 (Kenali Kata) dan Modul 2 (Struktur Ayat)
├── js/bank-susun-bina.js       Modul 3 (Susun Ayat) dan Modul 4 (Bina Ayat)
├── js/bank-detektif-master.js  Modul 5 (Detektif) dan Modul 6 (Cabaran Master)
├── js/bank-ujian.js            Ujian Pra, Ujian Pasca dan label topik
├── supabase/schema.sql         Skema pangkalan data, RLS dan trigger
├── supabase/tambahan-rekod-penggunaan.sql  Tambahan untuk projek Supabase sedia ada
├── docs/                       Panduan
└── package.json                Untuk deployment Railway sahaja
```

Untuk menambah atau mengubah soalan, edit fail `js/bank-*.js`. Setiap soalan mempunyai jawapan dan penerangan. Kekalkan susunan soalan sedia ada kerana ID soalan dijana berdasarkan kedudukan; tambah soalan baharu di hujung senarai.
