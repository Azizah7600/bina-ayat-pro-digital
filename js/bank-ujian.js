/* BINA AYAT PRO DIGITAL — Ujian Pra & Ujian Pasca (set setara, 25 soalan × 4 markah = 100) */
(function () {
  const { P } = window.BANK.h;
  const G = ['Kata nama', 'Kata kerja', 'Kata adjektif', 'Kata tugas'];
  const POLA = ['FN + FN', 'FN + FK', 'FN + FA', 'FN + FS'];

  window.BANK.ujian.pra = {
    nama: 'Ujian Pra', masa: 40,
    soalan: [
      // Golongan kata (4)
      P('golongan-kata', 'Aina [[menguli]] doh di bakeri kolej.', G, 1, '"Menguli" ialah perbuatan, maka perkataan ini ialah kata kerja.'),
      P('golongan-kata', 'Bengkel automotif itu sangat [[bersih]].', G, 2, '"Bersih" menerangkan keadaan, maka perkataan ini ialah kata adjektif.'),
      P('golongan-kata', '[[Ketuhar]] itu dibeli oleh pihak kolej.', G, 0, '"Ketuhar" ialah nama alat, maka perkataan ini ialah kata nama.'),
      P('golongan-kata', 'Pelajar itu memakai sarung tangan [[kerana]] wayar itu panas.', G, 3, '"Kerana" ialah kata hubung.'),
      // Struktur ayat (4)
      P('pola-ayat', 'Apakah pola ayat "Encik Hakim juruteknik automotif."?', POLA, 0, 'Predikatnya ialah frasa nama.'),
      P('pola-ayat', 'Apakah pola ayat "Kek itu sangat sedap."?', POLA, 2, 'Predikatnya ialah frasa adjektif.'),
      P('ayat-majmuk', 'Manakah ayat majmuk?', ['Siti menimbang tepung dan Aina mengukur gula.', 'Siti menimbang tepung.', 'Tepung itu di atas meja.', 'Aina pelajar bakeri.'], 0, 'Dua ayat dicantumkan dengan kata hubung "dan".'),
      P('ayat-aktif-pasif', 'Manakah ayat pasif?', ['Enjin itu dibaiki oleh Encik Lim.', 'Encik Lim membaiki enjin itu.', 'Encik Lim berehat di bengkel.', 'Enjin itu sangat bising.'], 0, '"Dibaiki oleh" menunjukkan ayat pasif.'),
      // Subjek & predikat (4)
      P('subjek-predikat', 'Apakah subjek bagi ayat "Pelajar bakeri itu membakar roti."?', ['Pelajar bakeri itu', 'membakar roti', 'roti', 'Pelajar'], 0, 'Subjek ialah frasa nama "Pelajar bakeri itu".'),
      P('subjek-predikat', 'Apakah predikat bagi ayat "Bengkel automotif itu sangat luas."?', ['sangat luas', 'Bengkel automotif itu', 'Bengkel', 'automotif itu sangat luas'], 0, 'Predikat ialah "sangat luas".'),
      P('ayat-dasar', 'Manakah rangkai kata yang TIDAK mempunyai subjek?', ['Menyambung wayar dengan cermat.', 'Haziq menyambung wayar.', 'Wayar itu panjang.', 'Mereka menyambung wayar.'], 0, 'Rangkai kata ini tiada pelaku atau subjek.'),
      P('subjek-predikat', 'Apakah subjek bagi ayat songsang "Sedap sungguh roti itu."?', ['roti itu', 'Sedap sungguh', 'Sedap', 'sungguh roti itu'], 0, 'Dalam ayat songsang, subjek hadir selepas predikat.'),
      // Imbuhan (5)
      P('imbuhan', 'meN- + sapu menjadi', ['menyapu', 'mensapu', 'mesapu', 'menapu'], 0, 'Huruf "s" luluh menjadi "ny".'),
      P('imbuhan', 'Haziq ____ dinding bengkel itu. (cat)', ['mengecat', 'mencat', 'mecat', 'mengcat'], 0, 'Kata satu suku kata menerima awalan "menge-".'),
      P('imbuhan', 'Pelajar itu ____ bas ke kolej. (naik)', ['menaiki', 'menaikkan', 'naikkan', 'dinaikkan'], 0, '"Menaiki" bermaksud naik ke atas kenderaan.'),
      P('imbuhan', 'Mesin ____ kayu itu sangat bising. (potong)', ['pemotong', 'pemotongan', 'potongan', 'memotong'], 0, 'Alat dinamakan dengan awalan peN-.'),
      P('imbuhan', '____ dapur perlu dijaga setiap hari. (bersih)', ['Kebersihan', 'Pembersih', 'Membersihkan', 'Bersihkan'], 0, 'Apitan ke-...-an membentuk kata nama.'),
      // Pembinaan ayat (4)
      P('pembinaan-ayat', 'Pilih ayat yang gramatis.', ['Kami sedang membersihkan bengkel.', 'Kami sedang bersihkan bengkel.', 'Kami bengkel sedang membersihkan.', 'Sedang kami membersihkan bengkel itu sangat.'], 0, 'Susunan subjek + kata bantu + kata kerja + objek adalah betul.'),
      P('pembinaan-ayat', 'Susun: (sedap / kek / sangat / itu)', ['Kek itu sangat sedap.', 'Kek sangat itu sedap.', 'Itu kek sedap sangat.', 'Sangat kek itu sedap.'], 0, 'Subjek "Kek itu" + predikat "sangat sedap".'),
      P('pembinaan-ayat', 'Gabungkan: "Kereta itu tidak dapat dihidupkan. Bateri kereta itu lemah."', ['Kereta itu tidak dapat dihidupkan kerana baterinya lemah.', 'Kereta itu tidak dapat dihidupkan tetapi baterinya lemah.', 'Kereta itu tidak dapat dihidupkan supaya baterinya lemah.', 'Kereta itu tidak dapat dihidupkan atau baterinya lemah.'], 0, '"Kerana" menyatakan sebab.'),
      P('pembinaan-ayat', 'Apakah ayat pasif bagi "Saya menyiapkan laporan itu."?', ['Laporan itu saya siapkan.', 'Laporan itu disiapkan oleh saya.', 'Laporan itu disaya siapkan.', 'Saya laporan itu siapkan.'], 0, 'Pasif diri pertama tidak menggunakan "di-" dan "oleh".'),
      // Kesalahan tatabahasa (4)
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul penggunaan kata sendinya.', ['Pelajar itu pergi ke bengkel.', 'Pelajar itu pergi di bengkel.', 'Pelajar itu berlatih ke bengkel.', 'Pelajar itu pergi kepada bengkel.'], 0, '"Ke" untuk arah tujuan ke tempat.'),
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul.', ['Semua pelajar hadir ke bengkel.', 'Semua pelajar-pelajar hadir ke bengkel.', 'Semua para pelajar hadir ke bengkel.', 'Semua pelajar-pelajar semua hadir ke bengkel.'], 0, '"Semua" tidak diikuti kata ganda.'),
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul.', ['Pelajar itu membaiki komputer yang rosak.', 'Pelajar itu membaiki komputer yang mana rosak.', 'Pelajar itu membaiki komputer di mana rosak.', 'Pelajar itu membaiki komputer mana rosak.'], 0, 'Kata hubung relatif yang betul ialah "yang".'),
      P('ejaan', 'Pilih ejaan yang betul.', ['Siti menyimpan resit di dalam fail.', 'Siti menyimpan resit didalam fail.', 'Siti menyimpan resit di-dalam fail.', 'Siti menyimpan resit dalam-dalam fail.'], 0, '"Di" ditulis terpisah daripada "dalam".')
    ]
  };

  window.BANK.ujian.pasca = {
    nama: 'Ujian Pasca', masa: 40,
    soalan: [
      P('golongan-kata', 'Haziq [[menyambung]] wayar di bengkel elektrik.', G, 1, '"Menyambung" ialah perbuatan, maka perkataan ini ialah kata kerja.'),
      P('golongan-kata', 'Pisau pemotong itu sangat [[tajam]].', G, 2, '"Tajam" menerangkan keadaan, maka perkataan ini ialah kata adjektif.'),
      P('golongan-kata', '[[Spana]] itu disimpan di dalam kotak peralatan.', G, 0, '"Spana" ialah nama alat, maka perkataan ini ialah kata nama.'),
      P('golongan-kata', 'Saya mahu ke bengkel [[tetapi]] hujan turun dengan lebat.', G, 3, '"Tetapi" ialah kata hubung.'),
      P('pola-ayat', 'Apakah pola ayat "Puan Aminah pensyarah perakaunan."?', POLA, 0, 'Predikatnya ialah frasa nama.'),
      P('pola-ayat', 'Apakah pola ayat "Wayar itu sangat panjang."?', POLA, 2, 'Predikatnya ialah frasa adjektif.'),
      P('ayat-majmuk', 'Manakah ayat majmuk?', ['Faiz menyapu lantai dan Haziq mengemas rak.', 'Faiz menyapu lantai.', 'Lantai itu di bengkel.', 'Haziq pelajar automotif.'], 0, 'Dua ayat dicantumkan dengan kata hubung "dan".'),
      P('ayat-aktif-pasif', 'Manakah ayat pasif?', ['Kek itu dihias oleh Aina.', 'Aina menghias kek itu.', 'Aina berehat di bakeri.', 'Kek itu sangat cantik.'], 0, '"Dihias oleh" menunjukkan ayat pasif.'),
      P('subjek-predikat', 'Apakah subjek bagi ayat "Juruteknik muda itu menukar tayar."?', ['Juruteknik muda itu', 'menukar tayar', 'tayar', 'Juruteknik'], 0, 'Subjek ialah frasa nama "Juruteknik muda itu".'),
      P('subjek-predikat', 'Apakah predikat bagi ayat "Makmal komputer itu sangat sejuk."?', ['sangat sejuk', 'Makmal komputer itu', 'Makmal', 'komputer itu sangat sejuk'], 0, 'Predikat ialah "sangat sejuk".'),
      P('ayat-dasar', 'Manakah rangkai kata yang TIDAK mempunyai subjek?', ['Menghias kek dengan krim putar.', 'Aina menghias kek.', 'Kek itu cantik.', 'Mereka menghias kek.'], 0, 'Rangkai kata ini tiada pelaku atau subjek.'),
      P('subjek-predikat', 'Apakah subjek bagi ayat songsang "Cekap sungguh juruteknik itu."?', ['juruteknik itu', 'Cekap sungguh', 'Cekap', 'sungguh juruteknik itu'], 0, 'Dalam ayat songsang, subjek hadir selepas predikat.'),
      P('imbuhan', 'meN- + tampal menjadi', ['menampal', 'mentampal', 'metampal', 'mempal'], 0, 'Huruf "t" luluh menjadi "n".'),
      P('imbuhan', 'Siti ____ meja dapur itu. (lap)', ['mengelap', 'melap', 'mengalap', 'menglap'], 0, 'Kata satu suku kata menerima awalan "menge-".'),
      P('imbuhan', 'Pelajar itu ____ bengkel selepas loceng berbunyi. (masuk)', ['memasuki', 'memasukkan', 'masukkan', 'dimasukkan'], 0, '"Memasuki" bermaksud masuk ke dalam sesuatu tempat.'),
      P('imbuhan', 'Alat ____ tin itu tertinggal di dapur. (buka)', ['pembuka', 'pembukaan', 'bukaan', 'membuka'], 0, 'Alat dinamakan dengan awalan peN-.'),
      P('imbuhan', '____ pelajar di bengkel adalah keutamaan. (selamat)', ['Keselamatan', 'Penyelamat', 'Menyelamatkan', 'Selamatkan'], 0, 'Apitan ke-...-an membentuk kata nama.'),
      P('pembinaan-ayat', 'Pilih ayat yang gramatis.', ['Mereka sedang memasang lampu di dewan.', 'Mereka sedang pasang lampu di dewan.', 'Mereka lampu sedang memasang di dewan.', 'Sedang mereka memasang lampu itu sangat.'], 0, 'Susunan subjek + kata bantu + kata kerja + objek adalah betul.'),
      P('pembinaan-ayat', 'Susun: (panas / ketuhar / sangat / itu)', ['Ketuhar itu sangat panas.', 'Ketuhar sangat itu panas.', 'Itu ketuhar panas sangat.', 'Sangat ketuhar itu panas.'], 0, 'Subjek "Ketuhar itu" + predikat "sangat panas".'),
      P('pembinaan-ayat', 'Gabungkan: "Pelajar memakai kaca mata keselamatan. Mata mereka terlindung daripada percikan api."', ['Pelajar memakai kaca mata keselamatan supaya mata mereka terlindung daripada percikan api.', 'Pelajar memakai kaca mata keselamatan tetapi mata mereka terlindung daripada percikan api.', 'Pelajar memakai kaca mata keselamatan atau mata mereka terlindung daripada percikan api.', 'Pelajar memakai kaca mata keselamatan walaupun mata mereka terlindung daripada percikan api.'], 0, '"Supaya" menyatakan tujuan.'),
      P('pembinaan-ayat', 'Apakah ayat pasif bagi "Kami membersihkan bengkel itu."?', ['Bengkel itu kami bersihkan.', 'Bengkel itu dibersihkan oleh kami.', 'Bengkel itu dikami bersihkan.', 'Kami bengkel itu bersihkan.'], 0, 'Pasif diri pertama tidak menggunakan "di-" dan "oleh".'),
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul penggunaan kata sendinya.', ['Pelajar itu lebih rajin daripada rakannya.', 'Pelajar itu lebih rajin dari rakannya.', 'Pelajar itu lebih rajin pada rakannya.', 'Pelajar itu lebih rajin kepada rakannya.'], 0, '"Daripada" digunakan untuk perbandingan.'),
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul.', ['Para pelajar sedang berkumpul di dewan.', 'Para pelajar-pelajar sedang berkumpul di dewan.', 'Para semua pelajar sedang berkumpul di dewan.', 'Para pelajar-pelajar semua sedang berkumpul di dewan.'], 0, '"Para" tidak diikuti kata ganda.'),
      P('kesalahan-tatabahasa', 'Pilih ayat yang betul.', ['Bengkel tempat kami berlatih itu sangat luas.', 'Bengkel di mana kami berlatih itu sangat luas.', 'Bengkel yang mana kami berlatih itu sangat luas.', 'Bengkel mana kami berlatih itu sangat luas.'], 0, '"Di mana" dan "yang mana" tidak digunakan sebagai penghubung.'),
      P('ejaan', 'Pilih ejaan yang betul.', ['Pelajar itu memasukkan data ke dalam komputer.', 'Pelajar itu memasukkan data kedalam komputer.', 'Pelajar itu memasukkan data ke-dalam komputer.', 'Pelajar itu memasukkan data dalam-dalam komputer.'], 0, '"Ke" ditulis terpisah daripada "dalam".')
    ]
  };

  /* Label topik untuk paparan analisis */
  window.BANK.topik = {
    'golongan-kata': 'Golongan kata', 'kata-nama': 'Kata nama', 'kata-kerja': 'Kata kerja', 'kata-adjektif': 'Kata adjektif',
    'kata-tugas': 'Kata tugas', 'subjek-predikat': 'Subjek dan predikat', 'ayat-dasar': 'Ayat dasar', 'pola-ayat': 'Pola ayat dasar',
    'ayat-tunggal': 'Ayat tunggal', 'ayat-majmuk': 'Ayat majmuk', 'imbuhan': 'Imbuhan', 'kata-sendi': 'Kata sendi nama',
    'kata-hubung': 'Kata hubung', 'pengembangan-ayat': 'Pengembangan ayat', 'ayat-kompleks': 'Ayat kompleks',
    'kepelbagaian-ayat': 'Kepelbagaian struktur ayat', 'ayat-aktif-pasif': 'Ayat aktif dan pasif', 'penyuntingan': 'Penyuntingan ayat',
    'kesalahan-tatabahasa': 'Kesalahan tatabahasa', 'penanda-wacana': 'Penanda wacana', 'ayat-formal': 'Ayat formal',
    'ejaan': 'Ejaan', 'kata-ganda': 'Kata ganda', 'struktur-ayat': 'Struktur ayat', 'pembinaan-ayat': 'Pembinaan ayat'
  };

  /* Tetapkan ID stabil bagi setiap soalan */
  for (const m of Object.values(window.BANK.modul)) {
    for (const [t, th] of Object.entries(m.tahap)) th.soalan.forEach((q, i) => { q.id = `m${m.id}t${t}q${String(i + 1).padStart(2, '0')}`; q.m = m.id; q.tahap = +t; });
  }
  for (const [k, u] of Object.entries(window.BANK.ujian)) u.soalan.forEach((q, i) => { q.id = `${k}q${String(i + 1).padStart(2, '0')}`; });
})();
