/* BINA AYAT PRO DIGITAL — Modul 3 (Susun Ayat) & Modul 4 (Bina Ayat) */
(function () {
  const { U, B } = window.BANK.h;

  /* ================= MODUL 3: SUSUN AYAT ================= */
  window.BANK.modul[3] = {
    id: 3, nama: 'Susun Ayat', ringkas: 'Seret dan susun perkataan menjadi ayat yang gramatis.',
    tahap: {
      1: {
        nota: [
          ['Susunan biasa', 'Ayat biasa disusun mengikut urutan subjek + predikat. Contoh: Aina (subjek) menguli doh roti (predikat).'],
          ['Hukum D-M', 'Dalam frasa nama, unsur yang diterangkan (D) hadir dahulu, diikuti unsur yang menerangkan (M). Contoh: enjin kereta, kek coklat, bengkel elektrik.'],
          ['Kata penguat', 'Kata penguat "sangat" hadir sebelum kata adjektif: sangat bersih, sangat sedap.'],
          ['Cara bermain', 'Ketik atau seret perkataan ke ruang jawapan mengikut urutan. Ketik perkataan di ruang jawapan untuk mengeluarkannya semula.']
        ],
        contoh: [
          ['bersih / itu / sangat / Bengkel → Bengkel itu sangat bersih.', 'Subjek "Bengkel itu" diikuti predikat "sangat bersih".'],
          ['kereta / membaiki / Encik Hakim / enjin → Encik Hakim membaiki enjin kereta.', '"Enjin kereta" mengikut hukum D-M.']
        ],
        soalan: [
          U('struktur-ayat', 'Encik_Hakim membaiki enjin kereta', [], 'Subjek "Encik Hakim" + predikat "membaiki enjin kereta".'),
          U('struktur-ayat', 'Aina menguli doh roti', [], 'Frasa nama "doh roti" mengikut hukum D-M.'),
          U('struktur-ayat', 'Bengkel itu sangat bersih', [], 'Kata penguat "sangat" hadir sebelum kata adjektif "bersih".'),
          U('struktur-ayat', 'Pelajar itu mengira jumlah jualan', [], 'Subjek "Pelajar itu" + predikat "mengira jumlah jualan".'),
          U('struktur-ayat', 'Kami memakai kasut keselamatan', [], 'Frasa nama "kasut keselamatan" mengikut hukum D-M.'),
          U('struktur-ayat', 'Kek coklat itu sangat sedap', [], 'Subjek "Kek coklat itu" + predikat "sangat sedap".'),
          U('struktur-ayat', 'Haziq menyambung wayar elektrik', [], 'Frasa nama "wayar elektrik" mengikut hukum D-M.'),
          U('struktur-ayat', 'Ketuhar itu sangat panas', [], 'Penentu "itu" hadir selepas kata nama "Ketuhar".'),
          U('struktur-ayat', 'Siti menyusun invois jualan', [], 'Subjek "Siti" + predikat "menyusun invois jualan".'),
          U('struktur-ayat', 'Mereka berlatih memasang suis', [], 'Kata kerja "berlatih" diikuti frasa "memasang suis".'),
          U('struktur-ayat', 'Ayah saya seorang juruteknik', [], 'Pola FN + FN: "Ayah saya" + "seorang juruteknik".'),
          U('struktur-ayat', 'Pensyarah menyemak laporan amali', [], 'Subjek "Pensyarah" + predikat "menyemak laporan amali".'),
          U('struktur-ayat', 'Komputer itu tidak berfungsi', [], 'Kata nafi "tidak" hadir sebelum kata kerja "berfungsi".'),
          U('struktur-ayat', 'Aiman mencuci peralatan bengkel', [], 'Frasa nama "peralatan bengkel" mengikut hukum D-M.'),
          U('struktur-ayat', 'Roti itu masih panas', [], 'Kata bantu "masih" hadir sebelum kata adjektif "panas".'),
          U('struktur-ayat', 'Pelajar bakeri menghias kek', [], 'Subjek "Pelajar bakeri" + predikat "menghias kek".'),
          U('struktur-ayat', 'Saya menyiapkan tugasan perakaunan', [], 'Frasa nama "tugasan perakaunan" mengikut hukum D-M.'),
          U('struktur-ayat', 'Encik_Lim memeriksa brek kereta', [], 'Subjek "Encik Lim" + predikat "memeriksa brek kereta".'),
          U('struktur-ayat', 'Spana itu di atas meja', [], 'Pola FN + FS: "Spana itu" + "di atas meja".'),
          U('struktur-ayat', 'Kami membersihkan makmal komputer', [], 'Frasa nama "makmal komputer" mengikut hukum D-M.')
        ]
      },
      2: {
        nota: [
          ['Ayat majmuk', 'Susun klausa pertama, kata hubung, kemudian klausa kedua. Contoh: Pelajar itu memakai sarung tangan kerana wayar itu panas.'],
          ['Kedudukan kata sendi nama', 'Kata sendi nama hadir sebelum frasa nama: kepada ketua kelas, dengan perkhidmatan pelajar, pada pukul lima.'],
          ['Keterangan masa', 'Keterangan masa seperti "semalam" boleh hadir di akhir atau di awal ayat.']
        ],
        contoh: [
          ['Kek itu tidak naik kerana ketuhar tidak cukup panas.', 'Kata hubung "kerana" mencantumkan akibat dengan sebab.'],
          ['Encik Hakim menyerahkan kunci bengkel kepada ketua kelas.', 'Kata sendi "kepada" hadir sebelum "ketua kelas".']
        ],
        soalan: [
          U('ayat-majmuk', 'Aina menimbang tepung dan Siti mengukur gula', ['Siti mengukur gula dan Aina menimbang tepung'], 'Dua ayat tunggal dicantumkan dengan kata hubung "dan".'),
          U('ayat-majmuk', 'Pelajar itu memakai sarung tangan kerana wayar itu panas', [], '"Kerana" menghubungkan perbuatan dengan sebabnya.'),
          U('kata-sendi', 'Encik_Hakim menyerahkan kunci bengkel kepada ketua kelas', [], 'Kata sendi "kepada" digunakan sebelum manusia (ketua kelas).'),
          U('ayat-majmuk', 'Kek itu tidak naik kerana ketuhar tidak cukup panas', [], 'Akibat (kek tidak naik) + kerana + sebab.'),
          U('kata-sendi', 'Pelanggan itu berpuas hati dengan perkhidmatan pelajar bakeri', [], 'Frasa "berpuas hati dengan" diikuti frasa nama.'),
          U('ayat-majmuk', 'Kami perlu mematikan suis utama sebelum membaiki lampu', [], 'Kata hubung "sebelum" menunjukkan urutan masa.'),
          U('imbuhan', 'Laporan kewangan itu disediakan oleh pelajar perakaunan', [], 'Ayat pasif: subjek + disediakan + oleh + pelaku.'),
          U('pengembangan-ayat', 'Haziq menukar minyak enjin kereta pensyarahnya semalam', ['Semalam Haziq menukar minyak enjin kereta pensyarahnya'], 'Keterangan masa "semalam" boleh hadir di akhir atau di awal ayat.'),
          U('pengembangan-ayat', 'Juruteknik yang berpengalaman itu membaiki kereta pelanggan', [], 'Keterangan "yang berpengalaman" hadir selepas kata nama yang diterangkannya.'),
          U('pengembangan-ayat', 'Pelajar-pelajar bengkel elektrik sedang memasang lampu di dewan', [], 'Kata bantu "sedang" hadir sebelum kata kerja "memasang".'),
          U('kata-sendi', 'Siti mencatat semua perbelanjaan bakeri dalam buku akaun', [], 'Kata bilangan "semua" hadir sebelum kata nama "perbelanjaan".'),
          U('ayat-majmuk', 'Mereka membersihkan bengkel selepas kelas amali tamat', ['Selepas kelas amali tamat mereka membersihkan bengkel'], 'Klausa keterangan masa "selepas kelas amali tamat" boleh hadir di akhir atau di awal ayat.'),
          U('pengembangan-ayat', 'Encik_Azman mengajar pelajar cara menggunakan mesin kimpalan', [], 'Objek "pelajar" diikuti pelengkap "cara menggunakan mesin kimpalan".'),
          U('imbuhan', 'Roti yang dibakar oleh Aina sangat lembut', [], 'Subjek "Roti yang dibakar oleh Aina" + predikat "sangat lembut".'),
          U('kata-hubung', 'Anda boleh memilih kek coklat atau kek pandan', ['Anda boleh memilih kek pandan atau kek coklat'], 'Kata hubung "atau" menyatakan pilihan.'),
          U('kata-sendi', 'Pelajar itu lebih cekap daripada rakan-rakannya', [], '"Daripada" digunakan untuk perbandingan.'),
          U('kata-sendi', 'Kami menghantar tempahan kek kepada pelanggan pada pukul lima', [], '"Kepada" untuk manusia dan "pada" untuk masa.'),
          U('ayat-majmuk', 'Komputer itu rosak kerana dijangkiti virus', [], '"Kerana" menyatakan sebab komputer itu rosak.'),
          U('ayat-majmuk', 'Ketua bengkel memeriksa semua peralatan sebelum kelas bermula', [], '"Sebelum" menunjukkan urutan masa.'),
          U('pengembangan-ayat', 'Pelajar perakaunan itu mengira untung bersih bakeri kolej', [], 'Frasa nama "untung bersih bakeri kolej" mengikut hukum D-M.')
        ]
      },
      3: {
        nota: [
          ['Penanda wacana', 'Penanda wacana seperti "Oleh itu," "Selain itu," dan "Kesimpulannya," hadir di awal ayat dan diikuti tanda koma.'],
          ['Ayat pasif', 'Ayat pasif diri ketiga: Kereta itu sedang dibaiki oleh juruteknik. Ayat pasif diri pertama dan kedua: Laporan itu telah saya serahkan.'],
          ['Klausa "walaupun"', 'Klausa yang dimulakan dengan "walaupun" boleh hadir di awal ayat dan diikuti tanda koma.']
        ],
        contoh: [
          ['Oleh itu, semua pelajar wajib memakai kasut keselamatan di bengkel.', 'Penanda wacana di awal ayat diikuti koma.'],
          ['Laporan amali itu telah saya serahkan kepada pensyarah.', 'Ayat pasif diri pertama: kata bantu + saya + kata kerja dasar.']
        ],
        soalan: [
          U('ayat-aktif-pasif', 'Kereta itu sedang dibaiki oleh juruteknik yang berpengalaman', [], 'Ayat pasif: subjek + kata bantu + dibaiki + oleh + pelaku.'),
          U('ayat-aktif-pasif', 'Laporan amali itu telah saya serahkan kepada pensyarah', [], 'Pasif diri pertama: telah + saya + serahkan, tanpa "di-" dan tanpa "oleh".'),
          U('penanda-wacana', 'Oleh_itu, semua pelajar wajib memakai kasut keselamatan di bengkel', [], 'Penanda wacana "Oleh itu," hadir di awal ayat.'),
          U('penanda-wacana', 'Selain_itu, kebersihan dapur mesti dijaga untuk mengelakkan pencemaran makanan', [], 'Penanda wacana "Selain itu," menambah isi.'),
          U('ayat-kompleks', 'Pelajar yang menang pertandingan inovasi itu berasal dari Kuala_Terengganu', [], 'Subjek kompleks "Pelajar yang menang pertandingan inovasi itu" + predikat.'),
          U('ayat-kompleks', 'Walaupun hujan turun dengan lebat, para pelajar tetap hadir ke bengkel', ['para pelajar tetap hadir ke bengkel walaupun hujan turun dengan lebat'], 'Klausa "walaupun" diikuti koma, kemudian ayat utama.'),
          U('ayat-aktif-pasif', 'Kek hari jadi itu dihias dengan krim putar oleh Aina', ['Kek hari jadi itu dihias oleh Aina dengan krim putar'], 'Ayat pasif dengan pelaku "oleh Aina".'),
          U('ayat-kompleks', 'Sistem perakaunan baharu itu memudahkan pelajar menyediakan penyata kewangan', [], 'Subjek "Sistem perakaunan baharu itu" + predikat.'),
          U('penanda-wacana', 'Kesimpulannya, latihan yang konsisten dapat meningkatkan kemahiran pelajar', [], 'Penanda wacana "Kesimpulannya," digunakan untuk merumuskan.'),
          U('ayat-aktif-pasif', 'Pendawaian di bilik itu perlu diperiksa sebelum bekalan elektrik disambungkan', [], 'Dua binaan pasif dicantumkan dengan "sebelum".'),
          U('ayat-kompleks', 'Pelanggan yang berpuas hati akan membuat tempahan semula pada masa hadapan', [], 'Subjek kompleks dengan kata hubung relatif "yang".'),
          U('ayat-aktif-pasif', 'Tugasan itu mesti kamu siapkan sebelum hari Jumaat', [], 'Pasif diri kedua: mesti + kamu + siapkan.'),
          U('penanda-wacana', 'Di_samping_itu, pelajar perlu mengemas_kini rekod inventori setiap minggu', [], '"Mengemas kini" dieja terpisah. Penanda wacana "Di samping itu," menambah isi.'),
          U('ayat-kompleks', 'Enjin kereta itu tidak dapat dihidupkan kerana bateri sudah lemah', [], 'Akibat + kerana + sebab.'),
          U('penanda-wacana', 'Seterusnya, adunan itu dimasukkan ke dalam ketuhar yang telah dipanaskan', [], 'Penanda wacana "Seterusnya," menunjukkan urutan langkah.'),
          U('ayat-kompleks', 'Pihak kolej telah menganjurkan pertandingan membina ayat untuk pelajar semester satu', [], 'Subjek "Pihak kolej" + predikat yang dikembangkan.'),
          U('ayat-aktif-pasif', 'Perisian itu dipasang oleh pelajar bidang teknologi maklumat', [], 'Ayat pasif dengan pelaku "oleh pelajar bidang teknologi maklumat".'),
          U('penanda-wacana', 'Justeru, setiap pelajar haruslah mematuhi peraturan keselamatan bengkel', [], 'Penanda wacana "Justeru," menyatakan kesimpulan atau akibat.'),
          U('ayat-kompleks', 'Pelajar yang cemerlang dalam peperiksaan akan menerima sijil penghargaan', [], 'Subjek kompleks dengan kata hubung relatif "yang".'),
          U('penanda-wacana', 'Walau_bagaimanapun, kos bahan mentah perlu dikawal supaya keuntungan meningkat', [], 'Penanda wacana "Walau bagaimanapun," menyatakan pertentangan.')
        ]
      }
    }
  };

  /* ================= MODUL 4: BINA AYAT ================= */
  window.BANK.modul[4] = {
    id: 4, nama: 'Bina Ayat', ringkas: 'Bina ayat sendiri berdasarkan gambar, kata kunci dan situasi.',
    tahap: {
      1: {
        nota: [
          ['Langkah membina ayat', '1. Kenal pasti subjek (siapa atau apa). 2. Pilih predikat (buat apa atau bagaimana). 3. Gunakan kata kunci yang diberikan. 4. Mulakan dengan huruf besar dan akhiri dengan noktah.'],
          ['Rubrik pemarkahan', 'Struktur ayat (25%), ketepatan tatabahasa (25%), penggunaan imbuhan (20%), ketepatan makna (20%), tanda baca dan ejaan (10%).'],
          ['Semakan', 'Sistem hanya membuat semakan awal, contohnya kata kunci, huruf besar dan noktah. Markah sebenar diberikan oleh guru.']
        ],
        contoh: [
          ['Kata kunci: juruteknik, membaiki → Juruteknik itu membaiki enjin kereta.', 'Subjek "Juruteknik itu" + predikat "membaiki enjin kereta".'],
          ['Kata kunci: kek, sedap → Kek coklat buatan Aina sangat sedap.', 'Ayat berpola FN + FA.']
        ],
        soalan: [
          B('automotif', 'Seorang juruteknik sedang bekerja di bawah bonet kereta.', ['juruteknik', 'membaiki'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Juruteknik itu membaiki enjin kereta pelanggan.', { min: 4 }),
          B('bakeri', 'Aina sedang menyediakan doh di atas meja bakeri.', ['menguli', 'doh'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Aina menguli doh roti dengan cekap.', { min: 4 }),
          B('perakaunan', 'Siti menggunakan kalkulator di kaunter bakeri.', ['mengira', 'jualan'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Siti mengira jumlah jualan harian bakeri.', { min: 4 }),
          B('elektrik', 'Haziq memegang pemutar skru dan dua utas wayar.', ['menyambung', 'wayar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Haziq menyambung wayar elektrik dengan cermat.', { min: 4 }),
          B('teknologi', 'Skrin komputer di makmal menjadi gelap.', ['komputer', 'rosak'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Komputer di makmal itu rosak.', { min: 4 }),
          B('bakeri', 'Pelanggan tersenyum selepas merasa kek coklat.', ['kek', 'sedap'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Kek coklat itu sangat sedap.', { min: 4 }),
          B('automotif', 'Tayar kereta pelanggan pancit di hadapan bengkel.', ['tayar', 'menukar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pelajar automotif menukar tayar kereta yang pancit.', { min: 4 }),
          B('umum', 'Lantai bengkel baru sahaja dimop.', ['bersih', 'bengkel'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Bengkel automotif itu sangat bersih.', { min: 4 }),
          B('elektrik', 'Pensyarah meminta pelajar memutuskan bekalan elektrik.', ['suis', 'mematikan'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pelajar itu mematikan suis utama.', { min: 4 }),
          B('perakaunan', 'Ahmad memegang beberapa helai invois.', ['invois', 'menyimpan'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Ahmad menyimpan invois itu di dalam fail.', { min: 4 }),
          B('teknologi', 'Nurul duduk di hadapan komputer riba.', ['menaip', 'laporan'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Nurul menaip laporan amali di makmal.', { min: 4 }),
          B('bakeri', 'Lampu ketuhar menyala dan wap keluar perlahan-lahan.', ['ketuhar', 'panas'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Ketuhar di bakeri itu sangat panas.', { min: 4 }),
          B('automotif', 'Encik Lim menekan pedal kereta sambil mendengar bunyinya.', ['brek', 'memeriksa'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Encik Lim memeriksa brek kereta itu.', { min: 4 }),
          B('umum', 'Pensyarah berdiri di hadapan papan putih bengkel.', ['pensyarah', 'mengajar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pensyarah itu mengajar pelajar di bengkel.', { min: 4 }),
          B('elektrik', 'Pelajar menaiki tangga sambil memegang mentol.', ['lampu', 'memasang'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pelajar itu memasang lampu di dewan.', { min: 4 }),
          B('perakaunan', 'Hasil jualan bulan ini lebih tinggi daripada kos.', ['untung', 'bakeri'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Bakeri kolej mendapat untung bulan ini.', { min: 4 }),
          B('teknologi', 'Paparan amaran keselamatan muncul pada skrin.', ['kata laluan', 'menukar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pelajar itu menukar kata laluan akaunnya.', { min: 4 }),
          B('bakeri', 'Dulang berisi doh dimasukkan ke dalam ketuhar.', ['roti', 'membakar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Aina membakar roti di bakeri kolej.', { min: 4 }),
          B('umum', 'Pelajar bersiap sebelum masuk ke bengkel.', ['kasut keselamatan', 'memakai'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Semua pelajar memakai kasut keselamatan.', { min: 4 }),
          B('automotif', 'Seorang pelajar memegang botol minyak berhampiran enjin.', ['minyak enjin', 'pelajar'], 'Bina satu ayat tunggal menggunakan kata kunci.', 'Pelajar itu menukar minyak enjin kereta.', { min: 4 })
        ]
      },
      2: {
        nota: [
          ['Ayat majmuk', 'Gunakan kata hubung yang diberikan untuk mencantumkan dua idea dalam satu ayat.'],
          ['Pilih kata hubung yang tepat', 'kerana (sebab), supaya (tujuan), tetapi (bertentangan), jika (syarat), sambil (serentak), sebelum dan selepas (masa), walaupun (pertentangan) dan yang (relatif).'],
          ['Panjang ayat', 'Ayat majmuk yang baik biasanya mengandungi sekurang-kurangnya lapan perkataan.']
        ],
        contoh: [
          ['Situasi: bateri lemah, kereta tidak dapat dihidupkan. Kata hubung: kerana', 'Kereta pelanggan tidak dapat dihidupkan kerana baterinya lemah.'],
          ['Situasi: menguli doh dan mendengar arahan. Kata hubung: sambil', 'Aina menguli doh sambil mendengar arahan pensyarah.']
        ],
        soalan: [
          B('automotif', 'Kereta pelanggan tidak dapat dihidupkan. Juruteknik mendapati bateri kereta itu lemah.', ['kerana'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Kereta pelanggan tidak dapat dihidupkan kerana baterinya lemah.', { min: 8 }),
          B('bakeri', 'Kek yang dibakar oleh Siti tidak naik. Ketuhar belum dipanaskan terlebih dahulu.', ['kerana'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Kek itu tidak naik kerana ketuhar belum dipanaskan terlebih dahulu.', { min: 8 }),
          B('elektrik', 'Haziq memakai sarung tangan getah semasa membaiki soket.', ['supaya'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Haziq memakai sarung tangan getah supaya dia tidak terkena renjatan elektrik.', { min: 8 }),
          B('perakaunan', 'Siti mencatat jualan. Pada masa yang sama, Aina mengira baki tunai.', ['dan'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Siti mencatat jualan harian dan Aina mengira baki tunai.', { min: 8 }),
          B('teknologi', 'Haziq ingin menghantar tugasan dalam talian. Tiba-tiba, sambungan Internet terputus.', ['tetapi'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Haziq ingin menghantar tugasan itu tetapi sambungan Internet terputus.', { min: 8 }),
          B('bakeri', 'Tempahan biskut raya sangat banyak. Pelajar bakeri bekerja sehingga lewat petang.', ['sehingga'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Tempahan biskut raya sangat banyak sehingga pelajar bakeri bekerja hingga lewat petang.', { min: 8 }),
          B('automotif', 'Encik Lim memeriksa brek kereta dahulu, kemudian menukar minyak enjin.', ['selepas'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Encik Lim menukar minyak enjin selepas memeriksa brek kereta itu.', { min: 8 }),
          B('umum', 'Hujan turun dengan lebat. Latihan kawad tetap diteruskan di dalam dewan.', ['walaupun'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Latihan kawad tetap diteruskan di dalam dewan walaupun hujan turun dengan lebat.', { min: 8 }),
          B('elektrik', 'Pelajar perlu mematikan suis utama. Selepas itu barulah soket boleh dibaiki.', ['sebelum'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Pelajar perlu mematikan suis utama sebelum membaiki soket itu.', { min: 8 }),
          B('teknologi', 'Fail laporan belum disimpan dan komputer akan dimatikan.', ['jika'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Fail laporan itu akan hilang jika tidak disimpan sebelum komputer dimatikan.', { min: 8 }),
          B('perakaunan', 'Pengurus bakeri perlu memilih antara pembekal yang murah dengan pembekal yang berkualiti.', ['atau'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Pengurus bakeri perlu memilih pembekal yang murah atau pembekal yang berkualiti.', { min: 8 }),
          B('bakeri', 'Aina menguli doh. Pada masa yang sama, dia mendengar arahan pensyarah.', ['sambil'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Aina menguli doh sambil mendengar arahan pensyarah dengan teliti.', { min: 8 }),
          B('automotif', 'Seorang juruteknik mempunyai pengalaman selama sepuluh tahun. Dia membaiki enjin kereta itu.', ['yang'], 'Bina satu ayat kompleks menggunakan kata hubung relatif "yang".', 'Juruteknik yang berpengalaman sepuluh tahun itu membaiki enjin kereta pelanggan.', { min: 8 }),
          B('umum', 'Faiz lulus ujian amali dengan cemerlang. Dia berlatih bersungguh-sungguh setiap hari.', ['kerana'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Faiz lulus ujian amali dengan cemerlang kerana dia berlatih bersungguh-sungguh.', { min: 8 }),
          B('elektrik', 'Lampu di bengkel berkelip-kelip setiap kali suis dihidupkan.', ['apabila'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Lampu di bengkel itu berkelip-kelip apabila suis dihidupkan.', { min: 8 }),
          B('teknologi', 'Perisian komputer telah dikemas kini. Kini komputer berfungsi lebih laju.', ['setelah'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Komputer itu berfungsi lebih laju setelah perisiannya dikemas kini.', { min: 8 }),
          B('bakeri', 'Pelanggan berpuas hati dengan kek yang ditempah. Dia terus membuat tempahan baharu.', ['lalu'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Pelanggan itu berpuas hati dengan kek tersebut lalu membuat tempahan baharu.', { min: 8 }),
          B('perakaunan', 'Jualan bakeri meningkat bulan ini. Kos bahan mentah juga turut naik.', ['tetapi'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Jualan bakeri meningkat bulan ini tetapi kos bahan mentah juga naik.', { min: 8 }),
          B('automotif', 'Tayar kereta itu sudah haus. Tayar itu mesti diganti segera.', ['yang'], 'Bina satu ayat kompleks menggunakan kata hubung relatif "yang".', 'Tayar kereta yang sudah haus itu mesti diganti dengan segera.', { min: 8 }),
          B('umum', 'Semua pelajar tetap hadir ke bengkel. Pada hari itu, cuaca sangat panas.', ['sungguhpun'], 'Bina satu ayat majmuk menggunakan kata hubung yang diberikan.', 'Sungguhpun cuaca sangat panas, semua pelajar tetap hadir ke bengkel.', { min: 8 })
        ]
      },
      3: {
        nota: [
          ['Ayat matang', 'Ayat matang menggunakan struktur yang pelbagai seperti ayat pasif, ayat kompleks dan penanda wacana, serta laras bahasa formal.'],
          ['Laras formal', 'Elakkan bahasa basahan seperti "tak", "nak", "dah" dan "korang". Gunakan "tidak", "hendak", "sudah" dan "kamu semua".'],
          ['Pasif diri pertama', 'Tulis "Laporan itu saya sediakan", bukan "Laporan itu disediakan oleh saya".']
        ],
        contoh: [
          ['Penanda wacana: Oleh itu', 'Oleh itu, semua pelajar wajib mematuhi prosedur keselamatan semasa bekerja di bengkel elektrik.'],
          ['Ayat pasif diri pertama', 'Laporan kewangan bakeri itu telah saya serahkan kepada pensyarah pada pagi tadi.']
        ],
        soalan: [
          B('automotif', 'Kereta pensyarah telah siap dibaiki oleh juruteknik di bengkel kolej.', ['dibaiki'], 'Bina satu ayat pasif yang lengkap (sekurang-kurangnya 10 perkataan).', 'Kereta pensyarah itu telah dibaiki oleh juruteknik yang berpengalaman di bengkel kolej.', { min: 10, jenis: 'pasif' }),
          B('elektrik', 'Seorang pelajar hampir terkena renjatan kerana tidak mematikan suis.', ['Oleh itu,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Oleh itu, semua pelajar wajib mematikan suis utama sebelum membaiki sebarang peralatan elektrik.', { min: 10 }),
          B('perakaunan', 'Anda telah menyediakan laporan kewangan bakeri untuk bulan ini.', ['saya'], 'Bina satu ayat pasif diri pertama (tanpa "oleh saya").', 'Laporan kewangan bakeri bulan ini telah saya sediakan dengan lengkap.', { min: 8, jenis: 'pasif1' }),
          B('bakeri', 'Pelajar bakeri perlu menjaga kebersihan diri dan dapur.', ['Selain itu,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Selain itu, pelajar bakeri perlu memastikan dapur sentiasa bersih untuk mengelakkan pencemaran makanan.', { min: 10 }),
          B('perakaunan', 'Rumuskan kepentingan rekod kewangan kepada sesebuah perniagaan.', ['Kesimpulannya,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Kesimpulannya, rekod kewangan yang teratur membantu usahawan membuat keputusan perniagaan yang tepat.', { min: 10 }),
          B('umum', 'Latihan industri mencabar tetapi pelajar tetap bersemangat.', ['walaupun'], 'Bina satu ayat kompleks menggunakan kata hubung yang diberikan.', 'Pelajar vokasional tetap bersemangat menjalani latihan industri walaupun tugasan yang diberikan sangat mencabar.', { min: 10 }),
          B('umum', 'Anda ketua kelas dan perlu memaklumkan bahawa bengkel ditutup esok kerana kerja penyelenggaraan.', ['dimaklumkan'], 'Bina satu ayat notis yang formal.', 'Semua pelajar dimaklumkan bahawa bengkel automotif akan ditutup pada esok hari kerana kerja penyelenggaraan.', { min: 10 }),
          B('teknologi', 'Teknologi maklumat semakin penting dalam semua bidang pekerjaan.', ['Justeru,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Justeru, pelajar vokasional perlu menguasai kemahiran teknologi maklumat untuk bersaing dalam pasaran kerja.', { min: 10 }),
          B('automotif', 'Seorang pelajar berjaya membaiki enjin. Dia sentiasa berlatih di bengkel.', ['yang', 'kerana'], 'Bina satu ayat kompleks menggunakan kedua-dua kata hubung.', 'Pelajar yang berjaya membaiki enjin itu dipuji kerana dia sentiasa berlatih di bengkel.', { min: 10 }),
          B('perakaunan', 'Penyata kewangan sudah disiapkan oleh kerani akaun.', ['telah disediakan'], 'Bina satu ayat pasif menggunakan frasa yang diberikan.', 'Penyata kewangan bakeri itu telah disediakan oleh kerani akaun sebelum mesyuarat bermula.', { min: 10, jenis: 'pasif' }),
          B('automotif', 'Selain kemahiran teknikal, juruteknik perlu berkomunikasi dengan baik.', ['Di samping itu,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Di samping itu, juruteknik automotif perlu berkomunikasi dengan baik semasa melayan pelanggan.', { min: 10 }),
          B('bakeri', 'Langkah kedua membuat roti selepas doh diuli.', ['Seterusnya,'], 'Bina satu ayat arahan yang dimulakan dengan penanda wacana yang diberikan.', 'Seterusnya, doh yang telah diuli dibiarkan mengembang selama tiga puluh minit.', { min: 10 }),
          B('umum', 'Anda tidak dapat hadir ke kelas amali kerana demam dan ingin memaklumkan pensyarah.', ['tidak dapat hadir'], 'Bina satu ayat formal yang sopan.', 'Saya memohon maaf kerana tidak dapat hadir ke kelas amali hari ini kerana demam.', { min: 10 }),
          B('umum', 'Pelajar vokasional memperoleh kemahiran teknikal dan nilai kerja yang baik.', ['bukan sahaja', 'malah'], 'Bina satu ayat kompleks menggunakan frasa yang diberikan.', 'Pelajar vokasional bukan sahaja memperoleh kemahiran teknikal, malah membina sikap kerja yang positif.', { min: 10 }),
          B('teknologi', 'Pensyarah mengingatkan anda supaya menyiapkan tugasan pengaturcaraan.', ['kamu'], 'Bina satu ayat pasif diri kedua (tanpa "oleh kamu").', 'Tugasan pengaturcaraan itu mesti kamu siapkan sebelum hari Jumaat.', { min: 8, jenis: 'pasif2' }),
          B('perakaunan', 'Jualan meningkat, namun kos bahan mentah masih tinggi.', ['Walau bagaimanapun,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Walau bagaimanapun, kos bahan mentah yang tinggi perlu dikawal supaya keuntungan bakeri meningkat.', { min: 10 }),
          B('teknologi', 'Data pelanggan mesti dilindungi daripada dicuri.', ['yang', 'supaya'], 'Bina satu ayat kompleks menggunakan kedua-dua kata hubung.', 'Pelajar perlu menggunakan kata laluan yang kukuh supaya data pelanggan tidak dicuri.', { min: 10 }),
          B('elektrik', 'Berikan satu contoh cara menjimatkan tenaga elektrik di bengkel.', ['Sebagai contoh,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Sebagai contoh, pelajar perlu mematikan lampu dan kipas sebelum meninggalkan bengkel.', { min: 10 }),
          B('umum', 'Kolej telah menganjurkan pertandingan inovasi. Pertandingan itu disertai oleh pelajar semua bidang.', ['yang', 'telah'], 'Bina satu ayat kompleks menggunakan perkataan yang diberikan.', 'Pertandingan inovasi yang telah dianjurkan oleh pihak kolej disertai oleh pelajar daripada semua bidang.', { min: 10 }),
          B('umum', 'Projek akhir pelajar berjaya disiapkan dan dipamerkan.', ['Akhirnya,'], 'Bina satu ayat formal yang dimulakan dengan penanda wacana yang diberikan.', 'Akhirnya, projek akhir pelajar berjaya disiapkan dan dipamerkan pada hari inovasi kolej.', { min: 10 })
        ]
      }
    }
  };
})();
