/* ============================================================
   BINA AYAT PRO DIGITAL — Konfigurasi
   ------------------------------------------------------------
   1. Biarkan SUPABASE_URL kosong  → aplikasi berjalan dalam MOD DEMO
      (data disimpan dalam pelayar ini sahaja, untuk percubaan).
   2. Isi SUPABASE_URL dan SUPABASE_ANON_KEY → aplikasi menggunakan
      pangkalan data Supabase sebenar (sistem rasmi).
   Rujuk docs/PANDUAN-DEPLOYMENT.md untuk langkah penuh.
   ============================================================ */
window.BAP_CONFIG = {
  SUPABASE_URL: '',          // contoh: 'https://abcdefgh.supabase.co'
  SUPABASE_ANON_KEY: '',     // kunci "anon public" daripada Supabase > Project Settings > API
  // Domain e-mel dalaman untuk akaun pelajar (pelajar log masuk dengan No. Matrik).
  // E-mel ini tidak digunakan untuk menghantar surat. Jangan ubah selepas pelajar mula mendaftar.
  STUDENT_EMAIL_DOMAIN: 'pelajar.binaayatpro.app',
  // Teks pada jalur kuning di bahagian paling atas aplikasi (boleh diubah)
  JALUR_TEKS: 'PLATFORM PEMBELAJARAN TATABAHASA BAHASA MELAYU SVM • KOLEJ VOKASIONAL WAKAF TEMBESU',
  NAMA_INSTITUSI: 'Kolej Vokasional Wakaf Tembesu',
  PEMILIK_INOVASI: 'Cikgu Azizah Ismail'
};
