/* BINA AYAT PRO DIGITAL — Bank Soalan (pembantu & Modul 1–2)
   Format:
   P = soalan aneka pilihan, S = sempadan subjek/predikat, U = susun ayat,
   D = detektif (ketik perkataan salah, kemudian pilih pembetulan), B = bina ayat (jawapan terbuka)
   [[kata]] = perkataan yang ditandakan dalam soalan. "_" menyambung token berbilang perkataan. */
window.BANK = { modul: {}, ujian: {} };
(function () {
  const P = (t, s, p, j, e) => ({ k: 'p', t, s, p, j, e });
  const S = (t, str, e) => {
    const [a, b] = str.split('|').map(x => x.trim());
    return { k: 's', t, s: 'Ketik ruang antara SUBJEK dan PREDIKAT.', w: (a + ' ' + b).split(/\s+/), b: a.split(/\s+/).length, e };
  };
  const U = (t, str, alts, e) => ({ k: 'u', t, w: str.split(' '), alt: (alts || []).map(a => a.split(' ')), e });
  const D = (t, str, p, j, e) => {
    const w = str.split(' ');
    const x = w.findIndex(z => z.includes('{'));
    return { k: 'd', t, w: w.map(z => z.replace(/[{}]/g, '')), x, p, j, e };
  };
  const B = (tema, situasi, kata, arahan, contoh, o) => Object.assign({ k: 'b', t: 'pembinaan-ayat', tema, situasi, kata, arahan, contoh }, o || {});
  window.BANK.h = { P, S, U, D, B };

  const G = ['Kata nama', 'Kata kerja', 'Kata adjektif', 'Kata tugas'];

  /* ================= MODUL 1: KENALI KATA ================= */
  window.BANK.modul[1] = {
    id: 1, nama: 'Kenali Kata', ringkas: 'Kenal pasti golongan kata melalui kuiz, padanan dan permainan.',
    tahap: {
      1: {
        nota: [
          ['Empat golongan kata', 'Perkataan dalam bahasa Melayu dibahagikan kepada empat golongan, iaitu kata nama, kata kerja, kata adjektif dan kata tugas.'],
          ['Kata nama (KN)', 'Menamakan orang, benda, tempat, haiwan atau perkara. Contoh: juruteknik, enjin, tepung, bengkel, invois.'],
          ['Kata kerja (KK)', 'Menunjukkan perbuatan atau keadaan. Contoh: membaiki, menguli, mengira, bekerja, berlatih.'],
          ['Kata adjektif (KA)', 'Menerangkan sifat atau keadaan kata nama. Contoh: bersih, panas, tajam, rajin, sedap.'],
          ['Kata tugas (KT)', 'Perkataan yang bukan KN, KK atau KA, dan berfungsi menghubungkan, menegaskan atau menerangkan. Contoh: di, ke, dan, kerana, sangat, telah, tidak.']
        ],
        contoh: [
          ['Aina menguli doh dengan cekap.', 'Aina (KN), menguli (KK), doh (KN), dengan (KT), cekap (KA).'],
          ['Juruteknik itu sedang membaiki enjin.', 'juruteknik (KN), sedang (KT – kata bantu), membaiki (KK), enjin (KN).'],
          ['Bengkel elektrik itu sangat bersih.', 'bengkel (KN), sangat (KT – kata penguat), bersih (KA).']
        ],
        soalan: [
          P('kata-kerja', 'Encik Hakim [[membaiki]] enjin kereta pelanggan.', G, 1, '"Membaiki" menunjukkan perbuatan, maka perkataan ini ialah kata kerja.'),
          P('kata-nama', '[[Tepung]] itu disimpan dalam bekas kedap udara.', G, 0, '"Tepung" ialah nama benda, maka perkataan ini ialah kata nama.'),
          P('kata-adjektif', 'Bengkel automotif itu sangat [[bersih]].', G, 2, '"Bersih" menerangkan keadaan bengkel, maka perkataan ini ialah kata adjektif.'),
          P('kata-tugas', 'Pelajar itu meletakkan spana [[di]] atas meja.', G, 3, '"Di" ialah kata sendi nama yang menunjukkan tempat. Kata sendi nama tergolong dalam kata tugas.'),
          P('kata-tugas', 'Aina menguli doh [[dan]] membentuk roti.', G, 3, '"Dan" ialah kata hubung yang menyambungkan dua perbuatan. Kata hubung tergolong dalam kata tugas.'),
          P('kata-adjektif', 'Kek coklat itu sangat [[sedap]].', G, 2, '"Sedap" menerangkan sifat kek, maka perkataan ini ialah kata adjektif.'),
          P('kata-kerja', 'Pensyarah itu [[menerangkan]] cara menyambung wayar.', G, 1, '"Menerangkan" ialah perbuatan yang dilakukan oleh pensyarah, maka perkataan ini ialah kata kerja.'),
          P('kata-nama', '[[Ketuhar]] di bakeri itu baru dibeli.', G, 0, '"Ketuhar" ialah nama alat, maka perkataan ini ialah kata nama.'),
          P('kata-kerja', 'Pelajar perakaunan [[mengira]] jumlah jualan harian.', G, 1, '"Mengira" menunjukkan perbuatan, maka perkataan ini ialah kata kerja.'),
          P('kata-adjektif', 'Wayar elektrik itu sangat [[panjang]].', G, 2, '"Panjang" menerangkan ukuran wayar, maka perkataan ini ialah kata adjektif.'),
          P('kata-tugas', 'Kami [[sedang]] mencuci peralatan bengkel.', G, 3, '"Sedang" ialah kata bantu aspek yang menunjukkan perbuatan yang masih berlaku. Kata bantu tergolong dalam kata tugas.'),
          P('kata-tugas', 'Komputer itu [[tidak]] berfungsi.', G, 3, '"Tidak" ialah kata nafi. Kata nafi tergolong dalam kata tugas.'),
          P('kata-nama', 'Encik Rahman ialah [[juruteknik]] yang berpengalaman.', G, 0, '"Juruteknik" ialah nama pekerjaan seseorang, maka perkataan ini ialah kata nama.'),
          P('kata-adjektif', 'Siti bekerja dengan [[tekun]].', G, 2, '"Tekun" menerangkan cara Siti bekerja, maka perkataan ini ialah kata adjektif (cara).'),
          P('kata-kerja', 'Mereka [[berlatih]] di bengkel setiap petang.', G, 1, '"Berlatih" menunjukkan perbuatan, maka perkataan ini ialah kata kerja.'),
          P('kata-adjektif', 'Pisau pemotong itu sangat [[tajam]].', G, 2, '"Tajam" menerangkan keadaan pisau, maka perkataan ini ialah kata adjektif.'),
          P('kata-tugas', 'Pelajar itu memakai sarung tangan [[kerana]] wayar itu panas.', G, 3, '"Kerana" ialah kata hubung yang menyatakan sebab. Kata hubung tergolong dalam kata tugas.'),
          P('kata-nama', 'Ahmad menyimpan [[invois]] itu dalam fail.', G, 0, '"Invois" ialah nama dokumen, maka perkataan ini ialah kata nama.'),
          P('kata-tugas', 'Haziq [[sangat]] cekap membaiki tayar.', G, 3, '"Sangat" ialah kata penguat yang menguatkan maksud "cekap". Kata penguat tergolong dalam kata tugas.'),
          P('kata-kerja', 'Roti itu [[dibakar]] selama dua puluh minit.', G, 1, '"Dibakar" ialah kata kerja dalam bentuk pasif (awalan di-).')
        ]
      },
      2: {
        nota: [
          ['Subgolongan kata nama', 'Kata nama am (spana, ketuhar), kata nama khas (Encik Hakim, Kuala Terengganu) dan kata ganti nama (saya, anda, beliau, mereka). Kata nama khas dimulakan dengan huruf besar.'],
          ['Kata ganti nama diri', 'Diri pertama: saya, aku, kami, kita. Diri kedua: anda, awak, kamu, engkau. Diri ketiga: dia, beliau, mereka. "Beliau" digunakan untuk orang yang dihormati.'],
          ['Kata kerja transitif dan tak transitif', 'Kata kerja transitif memerlukan objek (membaiki enjin). Kata kerja tak transitif tidak memerlukan objek (berehat, bekerja, tidur).'],
          ['Subgolongan kata adjektif', 'Sifat (rajin), warna (biru), ukuran (tinggi), bentuk (bulat), waktu (awal), jarak (jauh), cara (cepat), perasaan (gembira) dan pancaindera (harum, manis).'],
          ['Subgolongan kata tugas', 'Kata sendi nama (di, ke, daripada, kepada), kata hubung (dan, atau, tetapi), kata bantu (telah, sedang, boleh), kata penguat (sangat, paling), kata nafi (tidak, bukan), kata pemeri (ialah, adalah), kata perintah (sila, jangan) dan kata tanya (apakah, bagaimanakah).']
        ],
        contoh: [
          ['Beliau pensyarah bidang elektrik.', '"Beliau" ialah kata ganti nama diri ketiga untuk orang yang dihormati.'],
          ['Pelajar itu membaiki kipas.', '"Membaiki" ialah kata kerja transitif kerana diikuti objek "kipas".'],
          ['Sila pakai kasut keselamatan.', '"Sila" ialah kata perintah jenis silaan.']
        ],
        soalan: [
          P('kata-nama', 'Perkataan [[Kolej Vokasional Wakaf Tembesu]] tergolong dalam', ['Kata nama am', 'Kata nama khas', 'Kata ganti nama', 'Kata kerja'], 1, 'Nama khusus bagi sesebuah institusi ialah kata nama khas dan ditulis dengan huruf besar pada awal setiap perkataan.'),
          P('kata-nama', 'Pelajar itu mengetatkan skru dengan [[spana]].', ['Kata nama am', 'Kata nama khas', 'Kata ganti nama', 'Kata adjektif'], 0, '"Spana" ialah nama umum bagi sejenis alat, maka perkataan ini ialah kata nama am.'),
          P('kata-nama', '[[Beliau]] pensyarah bidang elektrik di kolej kami.', ['Kata ganti nama diri pertama', 'Kata ganti nama diri kedua', 'Kata ganti nama diri ketiga', 'Kata nama khas'], 2, '"Beliau" ialah kata ganti nama diri ketiga yang digunakan untuk orang yang dihormati.'),
          P('kata-nama', '[[Kami]] akan membersihkan bengkel selepas kelas amali.', ['Kata ganti nama diri pertama', 'Kata ganti nama diri kedua', 'Kata ganti nama diri ketiga', 'Kata nama am'], 0, '"Kami" merujuk kepada orang yang bercakap bersama-sama orang lain, iaitu kata ganti nama diri pertama.'),
          P('kata-nama', 'Adakah [[anda]] sudah menyiapkan laporan amali?', ['Kata ganti nama diri pertama', 'Kata ganti nama diri kedua', 'Kata ganti nama diri ketiga', 'Kata tanya'], 1, '"Anda" merujuk kepada orang yang dilawan bercakap, iaitu kata ganti nama diri kedua.'),
          P('kata-kerja', 'Ayat manakah mengandungi kata kerja transitif?', ['Pelajar itu tidur di asrama.', 'Pelajar itu membaiki kipas.', 'Mereka berehat di kantin.', 'Haziq bekerja di bengkel.'], 1, '"Membaiki" memerlukan objek, iaitu "kipas". Kata kerja yang lain tidak memerlukan objek.'),
          P('kata-kerja', 'Ayat manakah mengandungi kata kerja tak transitif?', ['Aina menghias kek itu.', 'Encik Lim memeriksa brek.', 'Mereka berehat selepas kelas amali.', 'Siti mencatat jualan harian.'], 2, '"Berehat" tidak memerlukan objek, maka perkataan ini ialah kata kerja tak transitif.'),
          P('kata-adjektif', 'Pelajar memakai baju bengkel berwarna [[biru]].', ['Kata adjektif warna', 'Kata adjektif bentuk', 'Kata adjektif sifat', 'Kata nama am'], 0, '"Biru" menerangkan warna baju, maka perkataan ini ialah kata adjektif warna.'),
          P('kata-adjektif', 'Aina membuat kek yang berbentuk [[bulat]].', ['Kata adjektif ukuran', 'Kata adjektif bentuk', 'Kata adjektif jarak', 'Kata adjektif cara'], 1, '"Bulat" menerangkan bentuk kek, maka perkataan ini ialah kata adjektif bentuk.'),
          P('kata-adjektif', 'Pelajar itu datang [[awal]] ke bengkel.', ['Kata adjektif waktu', 'Kata adjektif jarak', 'Kata adjektif perasaan', 'Kata tugas'], 0, '"Awal" menerangkan masa ketibaan, maka perkataan ini ialah kata adjektif waktu.'),
          P('kata-adjektif', 'Rumah Faiz [[jauh]] dari kolej.', ['Kata adjektif ukuran', 'Kata adjektif waktu', 'Kata adjektif jarak', 'Kata arah'], 2, '"Jauh" menerangkan jarak, maka perkataan ini ialah kata adjektif jarak.'),
          P('kata-adjektif', 'Ibu sangat [[gembira]] melihat keputusan peperiksaan anaknya.', ['Kata adjektif sifat', 'Kata adjektif perasaan', 'Kata adjektif cara', 'Kata kerja'], 1, '"Gembira" menerangkan perasaan ibu, maka perkataan ini ialah kata adjektif perasaan.'),
          P('kata-adjektif', 'Bau roti yang baru dibakar itu sangat [[harum]].', ['Kata adjektif pancaindera', 'Kata adjektif warna', 'Kata adjektif bentuk', 'Kata adjektif waktu'], 0, '"Harum" dikesan melalui deria bau, maka perkataan ini ialah kata adjektif pancaindera.'),
          P('kata-adjektif', 'Rak peralatan di stor itu sangat [[tinggi]].', ['Kata adjektif jarak', 'Kata adjektif ukuran', 'Kata adjektif sifat', 'Kata arah'], 1, '"Tinggi" menerangkan ukuran rak, maka perkataan ini ialah kata adjektif ukuran.'),
          P('kata-tugas', 'Encik Azman [[ialah]] ketua bengkel automotif.', ['Kata pemeri', 'Kata hubung', 'Kata bantu', 'Kata penegas'], 0, '"Ialah" ialah kata pemeri yang hadir di hadapan frasa nama "ketua bengkel automotif".'),
          P('kata-tugas', 'Kami [[telah]] menyiapkan projek akhir itu.', ['Kata bantu aspek', 'Kata bantu ragam', 'Kata penguat', 'Kata nafi'], 0, '"Telah" menunjukkan perbuatan yang sudah berlaku, iaitu kata bantu aspek.'),
          P('kata-tugas', 'Anda [[boleh]] menggunakan mesin itu selepas taklimat keselamatan.', ['Kata bantu aspek', 'Kata bantu ragam', 'Kata perintah', 'Kata hubung'], 1, '"Boleh" menunjukkan kebolehan atau keizinan, iaitu kata bantu ragam.'),
          P('kata-tugas', '[[Sila]] pakai kasut keselamatan semasa berada di bengkel.', ['Kata perintah', 'Kata seru', 'Kata tanya', 'Kata penegas'], 0, '"Sila" ialah kata perintah jenis silaan, iaitu permintaan yang sopan.'),
          P('kata-tugas', 'Kek itu diperbuat [[daripada]] tepung gandum.', ['Kata sendi nama', 'Kata hubung', 'Kata arah', 'Kata bantu'], 0, '"Daripada" ialah kata sendi nama yang menunjukkan asal kejadian sesuatu benda.'),
          P('kata-tugas', 'Anda boleh memilih kek coklat [[atau]] kek pandan.', ['Kata hubung', 'Kata sendi nama', 'Kata penguat', 'Kata pemeri'], 0, '"Atau" ialah kata hubung yang menyatakan pilihan.'),
          P('kata-tugas', 'Bengkel itu ialah bengkel yang [[paling]] lengkap di kolej kami.', ['Kata penguat', 'Kata bantu', 'Kata nafi', 'Kata arah'], 0, '"Paling" menguatkan maksud kata adjektif "lengkap", maka perkataan ini ialah kata penguat.')
        ]
      },
      3: {
        nota: [
          ['Kata terbitan mengubah golongan', 'Imbuhan boleh mengubah golongan kata. Contoh: bersih (KA) → membersihkan (KK) → kebersihan (KN) → pembersih (KN).'],
          ['Kata majmuk', 'Kebanyakan kata majmuk dieja terpisah, contohnya kemas kini, jalan raya, kertas kerja. Kata majmuk mantap pula dieja bercantum, contohnya tanggungjawab, antarabangsa, kakitangan dan setiausaha.'],
          ['Kata ganda', 'Kata ganda tidak digunakan selepas kata bilangan yang sudah menunjukkan jamak. Salah: semua pelajar-pelajar. Betul: semua pelajar.'],
          ['Penjodoh bilangan', 'Penjodoh bilangan digunakan bersama kata bilangan. Contoh: sebuah kereta, sebatang pemutar skru, sehelai kain lap, sebiji telur.'],
          ['Kata tugas khusus', 'Kata penegas (-lah, -kah, pun, juga), kata seru (wah, aduh), kata arah (atas, bawah, dalam) dan kata ganti nama tunjuk (ini, itu).']
        ],
        contoh: [
          ['Kebersihan bengkel mesti dijaga.', '"Kebersihan" ialah kata nama terbitan daripada kata adjektif "bersih".'],
          ['Pelajar-pelajar bidang bakeri sedang menghias kek.', 'Kata ganda "pelajar-pelajar" betul kerana tidak didahului kata bilangan jamak.'],
          ['Dialah juruteknik yang membaiki kereta itu.', '"-lah" ialah kata penegas yang memberikan penekanan kepada "dia".']
        ],
        soalan: [
          P('golongan-kata', '[[Kebersihan]] bengkel mesti dijaga setiap hari.', G, 0, '"Kebersihan" ialah kata nama terbitan (apitan ke-...-an) daripada kata adjektif "bersih".'),
          P('golongan-kata', 'Pelajar itu [[membersihkan]] lantai bengkel.', G, 1, '"Membersihkan" ialah kata kerja terbitan (apitan meN-...-kan) daripada kata adjektif "bersih".'),
          P('golongan-kata', 'Dalam ayat manakah perkataan bergaris ialah kata nama?', ['[[Kecekapan]] juruteknik itu dipuji pelanggan.', 'Juruteknik itu sangat [[cekap]].', 'Dia [[menyelesaikan]] kerja itu.', 'Dia bekerja [[dengan]] teliti.'], 0, '"Kecekapan" ialah kata nama terbitan. "Cekap" ialah KA, "menyelesaikan" ialah KK dan "dengan" ialah KT.'),
          P('golongan-kata', 'Manakah ejaan kata majmuk yang betul?', ['kemas kini', 'kemaskini', 'jalanraya', 'kapalterbang'], 0, '"Kemas kini" ialah kata majmuk yang dieja terpisah. "Jalan raya" dan "kapal terbang" juga dieja terpisah.'),
          P('golongan-kata', 'Antara berikut, manakah kata majmuk mantap yang dieja bercantum?', ['tanggungjawab', 'kemas kini', 'jalan raya', 'kertas kerja'], 0, '"Tanggungjawab" ialah kata majmuk mantap, maka perkataan ini dieja bercantum.'),
          P('golongan-kata', 'Manakah ayat yang menggunakan kata ganda dengan betul?', ['Semua pelajar-pelajar hadir ke bengkel.', 'Para pelajar-pelajar sedang berehat.', 'Pelajar-pelajar bidang bakeri sedang menghias kek.', 'Banyak alat-alat bengkel perlu dibaiki.'], 2, 'Kata ganda tidak boleh digunakan selepas "semua", "para" atau "banyak" kerana perkataan tersebut sudah menunjukkan jamak.'),
          P('golongan-kata', 'Encik Lim membeli se____ kereta untuk bengkel kolej.', ['ekor', 'buah', 'batang', 'helai'], 1, 'Penjodoh bilangan "buah" digunakan untuk benda yang besar seperti kereta, rumah dan komputer.'),
          P('golongan-kata', 'Haziq meminjam se____ pemutar skru daripada rakannya.', ['batang', 'biji', 'helai', 'ekor'], 0, 'Penjodoh bilangan "batang" digunakan untuk benda yang panjang seperti pemutar skru, pen dan paip.'),
          P('golongan-kata', 'Siti mengelap meja dengan se____ kain lap.', ['helai', 'batang', 'biji', 'ekor'], 0, 'Penjodoh bilangan "helai" digunakan untuk benda yang nipis dan lembut seperti kain.'),
          P('golongan-kata', 'Resipi kek span itu memerlukan tiga ____ telur.', ['biji', 'ekor', 'buah', 'helai'], 0, 'Penjodoh bilangan "biji" digunakan untuk benda yang kecil dan bulat seperti telur.'),
          P('kata-tugas', 'Apakah fungsi "-lah" dalam ayat "Dialah juruteknik terbaik di bengkel itu."?', ['Kata penegas', 'Kata perintah', 'Kata seru', 'Kata hubung'], 0, '"-lah" ialah kata penegas yang memberikan penekanan kepada "dia".'),
          P('kata-tugas', 'Encik Azman [[pun]] turut membantu pelajar membaiki enjin.', ['Kata penegas', 'Kata hubung', 'Kata bantu', 'Kata nafi'], 0, '"Pun" ialah kata penegas yang menegaskan subjek "Encik Azman".'),
          P('kata-tugas', '[[Wah]], kemasnya hiasan kek itu!', ['Kata seru', 'Kata perintah', 'Kata tanya', 'Kata pembenar'], 0, '"Wah" ialah kata seru yang melahirkan perasaan kagum.'),
          P('kata-tugas', 'Letakkan kotak itu di [[atas]] rak.', ['Kata arah', 'Kata sendi nama', 'Kata adjektif', 'Kata hubung'], 0, '"Atas" ialah kata arah yang hadir selepas kata sendi nama "di".'),
          P('kata-nama', '[[Itu]] ketuhar baharu bakeri kolej.', ['Kata ganti nama tunjuk', 'Kata sendi nama', 'Kata adjektif', 'Kata penguat'], 0, '"Itu" di kedudukan subjek berfungsi sebagai kata ganti nama tunjuk.'),
          P('golongan-kata', 'Dalam ayat manakah perkataan bergaris ialah kata kerja?', ['Pisau [[pemotong]] itu tajam.', '[[Potongan]] kek itu kecil.', 'Doh itu sangat [[lembut]].', 'Aina [[memotong]] doh itu.'], 3, '"Memotong" ialah kata kerja. "Pemotong" dan "potongan" ialah kata nama, manakala "lembut" ialah kata adjektif.'),
          P('golongan-kata', 'Antara kata terbitan berikut, manakah yang terbentuk daripada kata adjektif dan menjadi kata kerja?', ['membersihkan', 'pembersih', 'kebersihan', 'terbersih'], 0, '"Membersihkan" ialah kata kerja. "Pembersih" dan "kebersihan" ialah kata nama, manakala "terbersih" ialah kata adjektif.'),
          P('kata-tugas', '[[Semua]] pelajar wajib memakai topi keselamatan.', ['Kata bilangan', 'Kata penguat', 'Kata adjektif', 'Kata hubung'], 0, '"Semua" ialah kata bilangan yang menunjukkan jumlah keseluruhan.'),
          P('kata-tugas', 'Antara berikut, manakah kata bantu ragam?', ['mesti', 'sedang', 'telah', 'belum'], 0, '"Mesti" menyatakan kewajipan, iaitu kata bantu ragam. "Sedang", "telah" dan "belum" ialah kata bantu aspek.'),
          P('kata-tugas', 'Mereka pergi [[ke]] bengkel elektrik selepas rehat.', ['Kata sendi nama', 'Kata arah', 'Kata hubung', 'Kata bantu'], 0, '"Ke" ialah kata sendi nama yang menunjukkan arah tujuan ke sesuatu tempat dan ditulis terpisah.')
        ]
      }
    },
    padanan: {
      1: { kategori: ['Kata nama', 'Kata kerja', 'Kata adjektif', 'Kata tugas'], kata: [['enjin', 0], ['tepung', 0], ['juruteknik', 0], ['bengkel', 0], ['membaiki', 1], ['menguli', 1], ['mengira', 1], ['bekerja', 1], ['bersih', 2], ['tajam', 2], ['rajin', 2], ['panas', 2], ['dan', 3], ['di', 3], ['sangat', 3], ['tidak', 3]] },
      2: { kategori: ['Kata nama am', 'Kata nama khas', 'Kata ganti nama', 'KK transitif', 'KK tak transitif'], kata: [['spana', 0], ['ketuhar', 0], ['wayar', 0], ['Encik Hakim', 1], ['Kuala Terengganu', 1], ['Terengganu', 1], ['beliau', 2], ['mereka', 2], ['saya', 2], ['membaiki', 3], ['menguli', 3], ['memeriksa', 3], ['tidur', 4], ['berehat', 4], ['bekerja', 4]] },
      3: { kategori: ['Kata sendi nama', 'Kata hubung', 'Kata bantu', 'Kata penguat', 'Kata nafi'], kata: [['di', 0], ['ke', 0], ['daripada', 0], ['dan', 1], ['tetapi', 1], ['kerana', 1], ['telah', 2], ['sedang', 2], ['akan', 2], ['sangat', 3], ['paling', 3], ['amat', 3], ['tidak', 4], ['bukan', 4]] }
    }
  };

  /* ================= MODUL 2: STRUKTUR AYAT ================= */
  window.BANK.modul[2] = {
    id: 2, nama: 'Struktur Ayat', ringkas: 'Kenal pasti subjek, predikat dan pola ayat.',
    tahap: {
      1: {
        nota: [
          ['Ayat', 'Ayat ialah susunan perkataan yang lengkap maksudnya. Ayat yang lengkap mempunyai subjek dan predikat.'],
          ['Subjek', 'Subjek ialah bahagian yang diterangkan. Biasanya subjek hadir di awal ayat. Contoh: "Encik Hakim" dalam "Encik Hakim membaiki enjin kereta."'],
          ['Predikat', 'Predikat ialah bahagian yang menerangkan subjek. Contoh: "membaiki enjin kereta".'],
          ['Ayat tidak lengkap', 'Rangkai kata seperti "Di dalam makmal komputer." atau "Kerana enjin itu rosak." belum menjadi ayat yang lengkap.']
        ],
        contoh: [
          ['Aina | menguli doh roti.', 'Subjek: Aina. Predikat: menguli doh roti.'],
          ['Bengkel automotif itu | sangat bersih.', 'Subjek: Bengkel automotif itu. Predikat: sangat bersih.']
        ],
        soalan: [
          S('subjek-predikat', 'Encik Hakim | membaiki enjin kereta.', 'Subjek ialah "Encik Hakim", iaitu orang yang melakukan perbuatan membaiki.'),
          S('subjek-predikat', 'Aina | menguli doh roti.', 'Subjek ialah "Aina". Predikat ialah "menguli doh roti".'),
          S('subjek-predikat', 'Bengkel automotif itu | sangat bersih.', 'Subjek ialah frasa nama "Bengkel automotif itu" yang diterangkan oleh predikat "sangat bersih".'),
          S('subjek-predikat', 'Pelajar perakaunan | mengira jumlah jualan.', 'Subjek ialah "Pelajar perakaunan".'),
          S('subjek-predikat', 'Ketuhar baharu itu | di bakeri kolej.', 'Subjek ialah "Ketuhar baharu itu". Predikatnya ialah frasa sendi nama "di bakeri kolej".'),
          S('subjek-predikat', 'Ayah Haziq | seorang juruelektrik.', 'Subjek ialah "Ayah Haziq". Predikatnya ialah frasa nama "seorang juruelektrik".'),
          S('subjek-predikat', 'Kek coklat itu | sangat sedap.', 'Subjek ialah "Kek coklat itu".'),
          S('subjek-predikat', 'Mereka | berlatih di bengkel setiap petang.', 'Subjek ialah kata ganti nama "Mereka".'),
          S('subjek-predikat', 'Wayar elektrik yang rosak itu | telah diganti.', 'Subjek ialah "Wayar elektrik yang rosak itu". Unsur "yang rosak itu" masih menerangkan wayar, maka unsur ini termasuk dalam subjek.'),
          S('subjek-predikat', 'Pensyarah Bahasa Melayu kami | menyemak karangan pelajar.', 'Subjek ialah "Pensyarah Bahasa Melayu kami".'),
          S('subjek-predikat', 'Komputer di makmal itu | tidak berfungsi.', 'Subjek ialah "Komputer di makmal itu". Predikatnya ialah "tidak berfungsi".'),
          S('subjek-predikat', 'Pelanggan bakeri | berpuas hati dengan perkhidmatan pelajar.', 'Subjek ialah "Pelanggan bakeri".'),
          P('subjek-predikat', 'Apakah subjek bagi ayat "Juruteknik muda itu memeriksa brek kereta."?', ['Juruteknik muda itu', 'memeriksa brek kereta', 'brek kereta', 'Juruteknik'], 0, 'Subjek ialah keseluruhan frasa nama "Juruteknik muda itu", bukan perkataan "Juruteknik" sahaja.'),
          P('subjek-predikat', 'Apakah predikat bagi ayat "Roti itu lembut dan gebu."?', ['Roti itu', 'lembut dan gebu', 'Roti', 'gebu'], 1, 'Predikat "lembut dan gebu" menerangkan subjek "Roti itu".'),
          P('ayat-dasar', 'Manakah ayat yang lengkap?', ['Pelajar bengkel elektrik itu.', 'Menyambung wayar dengan cermat.', 'Siti menghias kek hari jadi.', 'Di dalam makmal komputer.'], 2, '"Siti menghias kek hari jadi." mempunyai subjek (Siti) dan predikat (menghias kek hari jadi).'),
          P('subjek-predikat', 'Bahagian ayat yang menerangkan subjek dinamakan', ['predikat', 'objek', 'keterangan', 'pelengkap'], 0, 'Predikat ialah bahagian ayat yang menerangkan subjek.'),
          P('subjek-predikat', 'Apakah subjek bagi ayat "Saya menyiapkan laporan amali."?', ['Saya', 'menyiapkan', 'laporan amali', 'menyiapkan laporan amali'], 0, 'Subjek ialah "Saya", iaitu orang yang melakukan perbuatan menyiapkan.'),
          P('subjek-predikat', 'Apakah predikat bagi ayat "Encik Lim guru perakaunan."?', ['Encik Lim', 'guru perakaunan', 'guru', 'Encik Lim guru'], 1, 'Predikat "guru perakaunan" ialah frasa nama yang menerangkan Encik Lim.'),
          P('subjek-predikat', 'Manakah ayat yang subjeknya kata ganti nama?', ['Mereka membersihkan bengkel.', 'Kakitangan bakeri membersihkan dapur.', 'Haziq membersihkan spana.', 'Pelajar itu membersihkan meja.'], 0, '"Mereka" ialah kata ganti nama diri ketiga yang menjadi subjek.'),
          P('ayat-dasar', 'Pilih rangkai kata yang TIDAK lengkap sebagai ayat.', ['Kerana enjin kereta itu rosak.', 'Enjin kereta itu rosak.', 'Juruteknik membaiki enjin.', 'Kereta itu milik pensyarah.'], 0, '"Kerana enjin kereta itu rosak." hanya klausa keterangan sebab. Klausa ini belum mempunyai ayat utama.')
        ]
      },
      2: {
        nota: [
          ['Empat pola ayat dasar', 'FN + FN (Encik Hakim juruteknik automotif.), FN + FK (Pelajar itu menguli doh.), FN + FA (Bengkel itu bersih.) dan FN + FS (Ketuhar itu di bakeri.).'],
          ['Ayat tunggal', 'Ayat tunggal mempunyai satu subjek dan satu predikat.'],
          ['Ayat majmuk', 'Ayat majmuk terbentuk daripada dua ayat atau lebih yang dicantumkan dengan kata hubung seperti dan, tetapi, kerana, supaya, jika dan sambil.'],
          ['Pengembangan ayat', 'Ayat dasar boleh dikembangkan dengan menambah keterangan pada subjek atau predikat. Contoh: Juruteknik itu membaiki kereta. → Juruteknik yang berpengalaman itu membaiki kereta pelanggan dengan teliti.'],
          ['Kata sendi nama', 'di (tempat), ke (arah tempat), dari (tempat, masa atau arah), daripada (sumber, manusia atau perbandingan), kepada (manusia atau haiwan), pada (masa atau manusia).']
        ],
        contoh: [
          ['Kakak saya pegawai akaun.', 'Pola FN + FN.'],
          ['Mesin kimpalan itu sangat bising.', 'Pola FN + FA.'],
          ['Saya mahu menyertai pertandingan itu tetapi saya demam.', 'Ayat majmuk dengan kata hubung "tetapi".']
        ],
        soalan: [
          P('pola-ayat', 'Apakah pola ayat "Encik Hakim juruteknik automotif."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 0, 'Predikatnya "juruteknik automotif" ialah frasa nama.'),
          P('pola-ayat', 'Apakah pola ayat "Pelajar itu menguli doh."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 1, 'Predikatnya "menguli doh" ialah frasa kerja.'),
          P('pola-ayat', 'Apakah pola ayat "Bengkel itu bersih."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 2, 'Predikatnya "bersih" ialah frasa adjektif.'),
          P('pola-ayat', 'Apakah pola ayat "Ketuhar itu di bakeri."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 3, 'Predikatnya "di bakeri" ialah frasa sendi nama.'),
          P('pola-ayat', 'Apakah pola ayat "Hadiah itu untuk pemenang pertandingan."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 3, 'Predikatnya dimulakan dengan kata sendi nama "untuk", maka predikat ini ialah frasa sendi nama.'),
          P('pola-ayat', 'Apakah pola ayat "Kakak saya pegawai akaun."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 0, 'Predikatnya "pegawai akaun" ialah frasa nama.'),
          P('pola-ayat', 'Apakah pola ayat "Mesin kimpalan itu sangat bising."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 2, 'Predikatnya "sangat bising" ialah frasa adjektif.'),
          P('pola-ayat', 'Apakah pola ayat "Mereka berehat di kantin."?', ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'], 1, 'Inti predikat ialah kata kerja "berehat". Unsur "di kantin" hanya keterangan tempat.'),
          P('pola-ayat', 'Ayat manakah berpola FN + FA?', ['Wayar itu panjang.', 'Wayar itu dari kedai Encik Lim.', 'Wayar itu dipotong oleh Haziq.', 'Wayar itu milik kolej.'], 0, '"Panjang" ialah kata adjektif, maka ayat ini berpola FN + FA.'),
          P('pola-ayat', 'Ayat manakah berpola FN + FS?', ['Kunci bengkel itu pada Encik Azman.', 'Kunci bengkel itu kecil.', 'Kunci itu kunci stor.', 'Encik Azman memegang kunci itu.'], 0, 'Predikat "pada Encik Azman" ialah frasa sendi nama.'),
          P('ayat-tunggal', 'Manakah ayat tunggal?', ['Aina membakar roti.', 'Aina membakar roti dan Siti menghias kek.', 'Aina membakar roti kerana ada tempahan.', 'Aina membakar roti sambil menyanyi.'], 0, 'Ayat tunggal hanya mempunyai satu subjek dan satu predikat tanpa kata hubung yang mencantumkan ayat.'),
          P('ayat-majmuk', 'Manakah ayat majmuk?', ['Haziq memeriksa enjin dan menukar minyak pelincir.', 'Haziq memeriksa enjin kereta itu.', 'Enjin kereta itu baharu.', 'Kereta itu di bengkel.'], 0, 'Ayat ini mencantumkan dua ayat dengan kata hubung "dan".'),
          P('kata-hubung', 'Saya mahu menyertai pertandingan itu, ____ saya demam.', ['tetapi', 'dan', 'supaya', 'atau'], 0, '"Tetapi" menghubungkan dua idea yang bertentangan.'),
          P('kata-hubung', 'Pelajar itu lulus ujian amali ____ dia berlatih bersungguh-sungguh.', ['kerana', 'tetapi', 'atau', 'supaya'], 0, '"Kerana" menyatakan sebab pelajar itu lulus.'),
          P('kata-hubung', 'Anda mesti memakai kaca mata keselamatan ____ mata anda terlindung daripada percikan api.', ['supaya', 'kerana', 'tetapi', 'atau'], 0, '"Supaya" menyatakan tujuan memakai kaca mata keselamatan.'),
          P('kata-hubung', 'Kek itu tidak akan naik ____ ketuhar tidak dipanaskan terlebih dahulu.', ['jika', 'tetapi', 'dan', 'atau'], 0, '"Jika" menyatakan syarat.'),
          P('ayat-majmuk', 'Ayat "Siti menimbang tepung dan Aina mengukur gula." terbentuk daripada', ['dua ayat tunggal yang dicantumkan dengan "dan"', 'satu ayat tunggal sahaja', 'ayat pasif dan ayat aktif', 'ayat tanya dan ayat penyata'], 0, 'Ayat ini menggabungkan "Siti menimbang tepung." dengan "Aina mengukur gula.".'),
          P('pengembangan-ayat', 'Ayat dasar: "Juruteknik itu membaiki kereta." Manakah ayat yang mengembangkan SUBJEK?', ['Juruteknik yang berpengalaman itu membaiki kereta.', 'Juruteknik itu membaiki kereta pelanggan.', 'Juruteknik itu membaiki kereta dengan teliti.', 'Juruteknik itu sedang membaiki kereta.'], 0, 'Frasa "yang berpengalaman" menambah keterangan pada subjek "Juruteknik itu".'),
          P('pengembangan-ayat', 'Ayat dasar: "Pelajar itu membersihkan bengkel." Manakah ayat yang mengembangkan PREDIKAT?', ['Pelajar itu membersihkan bengkel automotif dengan teliti.', 'Pelajar yang rajin itu membersihkan bengkel.', 'Pelajar semester satu itu membersihkan bengkel.', 'Pelajar itu, Haziq, membersihkan bengkel.'], 0, 'Unsur "automotif dengan teliti" mengembangkan predikat "membersihkan bengkel".'),
          P('kata-sendi', 'Pelajar itu menyerahkan laporan amali ____ pensyarahnya.', ['kepada', 'pada', 'di', 'ke'], 0, '"Kepada" digunakan di hadapan kata nama manusia sebagai penerima.')
        ]
      },
      3: {
        nota: [
          ['Ayat songsang', 'Dalam ayat songsang, predikat atau sebahagian predikat hadir di hadapan subjek. Contoh: Sangat bersih bengkel itu.'],
          ['Ayat aktif dan pasif', 'Ayat aktif transitif boleh ditukar kepada ayat pasif. Contoh: Pelajar itu membaiki kipas. → Kipas itu dibaiki oleh pelajar itu.'],
          ['Pasif kata ganti nama diri pertama dan kedua', 'Gunakan susunan objek + kata ganti nama + kata kerja dasar tanpa "di-" dan tanpa "oleh". Contoh: Kipas itu saya baiki. Tugasan itu kamu siapkan.'],
          ['Ragam ayat', 'Ayat penyata, ayat tanya, ayat perintah (suruhan, silaan, permintaan dan larangan) dan ayat seruan.'],
          ['Ayat kompleks', 'Gunakan kata hubung relatif "yang" untuk mencantumkan keterangan. Elakkan "yang mana" dan "di mana" sebagai penghubung.']
        ],
        contoh: [
          ['Sedap sungguh kek coklat itu.', 'Ayat songsang: predikat "Sedap sungguh" mendahului subjek.'],
          ['Kipas itu saya baiki.', 'Ayat pasif dengan kata ganti nama diri pertama.'],
          ['Juruteknik itu membaiki kereta yang dimiliki oleh pensyarah.', 'Ayat kompleks dengan kata hubung relatif "yang".']
        ],
        soalan: [
          P('kepelbagaian-ayat', 'Apakah ayat songsang bagi "Bengkel itu sangat bersih."?', ['Sangat bersih bengkel itu.', 'Bengkel itu bersih sangat.', 'Itu bengkel sangat bersih.', 'Bersih itu bengkel sangat.'], 0, 'Predikat "Sangat bersih" dipindahkan ke hadapan subjek "bengkel itu".'),
          P('kepelbagaian-ayat', 'Manakah ayat songsang?', ['Sedap sungguh kek coklat itu.', 'Kek coklat itu sedap sungguh.', 'Kek coklat itu dibakar oleh Aina.', 'Aina membakar kek coklat itu.'], 0, 'Predikat "Sedap sungguh" mendahului subjek "kek coklat itu".'),
          P('ayat-aktif-pasif', 'Apakah ayat pasif bagi "Pelajar itu membaiki kipas."?', ['Kipas itu dibaiki oleh pelajar itu.', 'Kipas itu membaiki pelajar itu.', 'Pelajar itu dibaiki kipas.', 'Kipas itu pelajar itu baiki.'], 0, 'Objek "kipas" menjadi subjek, kata kerja menerima awalan "di-" dan pelaku didahului "oleh".'),
          P('ayat-aktif-pasif', 'Apakah ayat pasif yang betul bagi "Saya membaiki kipas itu."?', ['Kipas itu saya baiki.', 'Kipas itu dibaiki oleh saya.', 'Kipas itu disaya baiki.', 'Kipas itu dibaiki saya.'], 0, 'Bagi kata ganti nama diri pertama, gunakan "Kipas itu saya baiki" tanpa "di-" dan tanpa "oleh".'),
          P('ayat-aktif-pasif', 'Manakah ayat aktif tak transitif?', ['Pelajar itu berlari ke bengkel.', 'Pelajar itu membaiki pintu bengkel.', 'Pelajar itu mencuci lantai bengkel.', 'Pelajar itu mengunci bengkel.'], 0, '"Berlari" tidak memerlukan objek. Ayat-ayat yang lain mempunyai objek.'),
          P('ayat-aktif-pasif', 'Manakah ayat pasif?', ['Laporan amali itu telah disemak oleh pensyarah.', 'Pensyarah telah menyemak laporan amali itu.', 'Pensyarah sedang berehat.', 'Laporan amali itu sangat kemas.'], 0, 'Kata kerja "disemak" berawalan "di-" dan diikuti pelaku "oleh pensyarah".'),
          P('ayat-aktif-pasif', 'Ayat pasif TIDAK boleh dibentuk daripada ayat', ['aktif tak transitif', 'aktif transitif', 'yang mempunyai objek', 'yang menggunakan kata kerja berimbuhan meN-'], 0, 'Ayat aktif tak transitif tiada objek, maka ayat ini tidak boleh dipasifkan.'),
          P('ayat-aktif-pasif', 'Apakah ayat pasif bagi "Kamu menyiapkan tugasan itu."?', ['Tugasan itu kamu siapkan.', 'Tugasan itu disiapkan oleh kamu.', 'Tugasan itu dikamu siapkan.', 'Kamu tugasan itu siapkan.'], 0, 'Bagi kata ganti nama diri kedua, gunakan "Tugasan itu kamu siapkan".'),
          P('ayat-aktif-pasif', 'Apakah ayat pasif bagi "Dia menghias kek itu."?', ['Kek itu dihiasnya.', 'Kek itu dia hias.', 'Kek itu dihias dia.', 'Kek itu terhias dia.'], 0, 'Bagi kata ganti nama diri ketiga, awalan "di-" dikekalkan: dihiasnya atau dihias olehnya.'),
          P('ayat-kompleks', 'Manakah ayat yang menggunakan kata hubung relatif?', ['Pelajar yang menang pertandingan itu dari bidang bakeri.', 'Pelajar itu menang pertandingan.', 'Pelajar itu dari bidang bakeri.', 'Pelajar bidang bakeri menang.'], 0, '"Yang" ialah kata hubung relatif yang memancangkan keterangan pada subjek.'),
          P('ayat-kompleks', 'Gabungkan: "Juruteknik itu membaiki kereta. Kereta itu dimiliki oleh pensyarah."', ['Juruteknik itu membaiki kereta yang dimiliki oleh pensyarah.', 'Juruteknik itu membaiki kereta di mana dimiliki oleh pensyarah.', 'Juruteknik itu membaiki kereta yang mana dimiliki oleh pensyarah.', 'Juruteknik itu membaiki kereta dan dimiliki oleh pensyarah.'], 0, 'Gunakan kata hubung relatif "yang". Penggunaan "di mana" dan "yang mana" sebagai penghubung adalah salah.'),
          P('ayat-kompleks', 'Gabungkan: "Aina menguli doh. Aina mendengar taklimat."', ['Aina menguli doh sambil mendengar taklimat.', 'Aina menguli doh sambil Aina mendengar taklimat.', 'Aina menguli doh tetapi mendengar taklimat.', 'Aina menguli doh supaya mendengar taklimat.'], 0, 'Kedua-dua perbuatan berlaku serentak, maka "sambil" digunakan dan subjek yang sama tidak diulang.'),
          P('ayat-kompleks', 'Gabungkan: "Hujan turun dengan lebat. Latihan di padang dibatalkan."', ['Latihan di padang dibatalkan kerana hujan turun dengan lebat.', 'Latihan di padang dibatalkan tetapi hujan turun dengan lebat.', 'Latihan di padang dibatalkan supaya hujan turun dengan lebat.', 'Latihan di padang dibatalkan atau hujan turun dengan lebat.'], 0, 'Hujan lebat ialah sebab latihan dibatalkan, maka "kerana" digunakan.'),
          P('ayat-aktif-pasif', 'Manakah ayat aktif transitif?', ['Encik Lim menyelia pelajar di bengkel.', 'Encik Lim berehat di bilik guru.', 'Encik Lim pensyarah automotif.', 'Encik Lim sangat tegas.'], 0, '"Menyelia" diikuti objek "pelajar", maka ayat ini ialah ayat aktif transitif.'),
          P('kepelbagaian-ayat', 'Manakah ayat perintah jenis larangan?', ['Jangan bermain di dalam bengkel.', 'Sila isi borang ini.', 'Tolong tutup suis utama.', 'Bersihkan meja anda.'], 0, '"Jangan" menunjukkan larangan.'),
          P('kepelbagaian-ayat', 'Manakah ayat tanya yang betul?', ['Sudahkah anda menyiapkan laporan amali?', 'Anda sudahkah menyiapkan laporan amali?', 'Sudah anda menyiapkan laporan amali.', 'Sudahkah anda menyiapkan laporan amali.'], 0, 'Partikel "-kah" dilekatkan pada kata yang ditanya di awal ayat dan ayat ditamatkan dengan tanda soal.'),
          P('kepelbagaian-ayat', 'Manakah ayat seruan?', ['Wah, kemasnya hiasan kek itu!', 'Hiasan kek itu kemas.', 'Siapakah yang menghias kek itu?', 'Sila hias kek itu.'], 0, 'Ayat seruan mengandungi kata seru "Wah" dan ditamatkan dengan tanda seru.'),
          P('ayat-aktif-pasif', 'Ayat "Kereta itu sedang dibaiki oleh Encik Hakim di bengkel." ialah', ['ayat pasif', 'ayat aktif transitif', 'ayat aktif tak transitif', 'ayat songsang'], 0, 'Kata kerja "dibaiki" dan pelaku "oleh Encik Hakim" menunjukkan ayat pasif.'),
          P('kepelbagaian-ayat', 'Apakah subjek bagi ayat songsang "Rajin sungguh pelajar bengkel elektrik itu."?', ['pelajar bengkel elektrik itu', 'Rajin sungguh', 'Rajin', 'bengkel elektrik itu'], 0, 'Dalam ayat songsang, subjek hadir selepas predikat. Subjeknya ialah "pelajar bengkel elektrik itu".'),
          P('kepelbagaian-ayat', 'Manakah ayat perintah jenis silaan?', ['Sila isi borang ini dengan lengkap.', 'Jangan sentuh suis itu.', 'Siapakah ketua bengkel?', 'Bengkel itu ditutup.'], 0, '"Sila" digunakan dalam ayat perintah silaan.')
        ]
      }
    }
  };
})();
