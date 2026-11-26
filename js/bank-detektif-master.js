/* BINA AYAT PRO DIGITAL — Modul 5 (Detektif Tatabahasa) & Modul 6 (Cabaran Master Ayat) */
(function () {
  const { P, D } = window.BANK.h;

  /* ================= MODUL 5: DETEKTIF TATABAHASA ================= */
  window.BANK.modul[5] = {
    id: 5, nama: 'Detektif Tatabahasa', ringkas: 'Kesan dan betulkan kesalahan ejaan, imbuhan, struktur dan penggunaan kata.',
    tahap: {
      1: {
        nota: [
          ['Cara bermain', 'Setiap ayat mengandungi SATU kesalahan. Ketik perkataan yang salah, kemudian pilih pembetulan yang tepat.'],
          ['Kata sendi di, ke, dari, daripada', '"Di" untuk tempat, "ke" untuk arah tempat, "dari" untuk tempat atau masa, dan "daripada" untuk sumber manusia, benda atau perbandingan.'],
          ['Kata sendi pada dan kepada', '"Pada" digunakan untuk masa (pada pukul 8 pagi). "Kepada" digunakan untuk manusia sebagai penerima (memberi nasihat kepada pelajar).'],
          ['Kata nafi', '"Tidak" untuk kata kerja dan kata adjektif. "Bukan" untuk kata nama dan frasa sendi nama.'],
          ['Ejaan', 'Semak ejaan istilah vokasional: enjin, wayar, ketuhar, kualiti, keselamatan, jualan.']
        ],
        contoh: [
          ['Pelajar itu pergi di bengkel. → Pelajar itu pergi ke bengkel.', '"Ke" menunjukkan arah tujuan.'],
          ['Dia tidak juruteknik. → Dia bukan juruteknik.', '"Juruteknik" ialah kata nama, maka kata nafi "bukan" digunakan.']
        ],
        soalan: [
          D('ejaan', 'Juruteknik itu memeriksa {enjen} kereta pelanggan.', ['enjin', 'enjinn', 'injin', 'enjen'], 0, 'Ejaan yang betul ialah "enjin".'),
          D('ejaan', 'Kek itu dibakar di dalam {ketuha} selama tiga puluh minit.', ['ketuhar', 'ketohar', 'ketuar', 'ketuha'], 0, 'Ejaan yang betul ialah "ketuhar".'),
          D('kata-sendi', 'Pelajar itu pergi {di} bengkel elektrik.', ['ke', 'pada', 'dari', 'kepada'], 0, '"Ke" digunakan untuk menunjukkan arah tujuan ke sesuatu tempat.'),
          D('kata-sendi', 'Mereka berlatih {ke} bengkel setiap petang.', ['di', 'pada', 'kepada', 'daripada'], 0, '"Di" digunakan untuk menunjukkan tempat berlakunya perbuatan.'),
          D('ejaan', 'Siti menyimpan resit itu {didalam} fail.', ['di dalam', 'didalam', 'di-dalam', 'dalam-dalam'], 0, 'Kata sendi "di" ditulis terpisah daripada kata arah "dalam".'),
          D('ejaan', 'Pelanggan memuji {qualiti} roti kami.', ['kualiti', 'kwaliti', 'kuality', 'qualiti'], 0, 'Ejaan baku ialah "kualiti".'),
          D('ejaan', 'Sila pakai kasut {kesalamatan} di bengkel.', ['keselamatan', 'kesalamatan', 'keselamatn', 'keslamatan'], 0, 'Ejaan yang betul ialah "keselamatan" (ke- + selamat + -an).'),
          D('ejaan', 'Pelajar perakaunan mengira jumlah {juallan} harian.', ['jualan', 'juallan', 'jualaan', 'juwalan'], 0, 'Ejaan yang betul ialah "jualan" (jual + -an).'),
          D('kata-tugas', 'Encik Azman {adalah} ketua bengkel automotif.', ['ialah', 'iaitu', 'merupakan', 'adalah'], 0, 'Kata pemeri "ialah" digunakan di hadapan frasa nama "ketua bengkel automotif".'),
          D('ejaan', 'Haziq menyambung {wayer} elektrik dengan cermat.', ['wayar', 'waya', 'wayer', 'wiyar'], 0, 'Ejaan yang betul ialah "wayar".'),
          D('kata-tugas', 'Saya {bukan} suka makanan yang terlalu pedas.', ['tidak', 'belum', 'jangan', 'bukan'], 0, '"Suka" ialah kata kerja, maka kata nafi "tidak" digunakan.'),
          D('kata-tugas', 'Dia {tidak} juruteknik di bengkel itu.', ['bukan', 'belum', 'jangan', 'tiada'], 0, '"Juruteknik" ialah kata nama, maka kata nafi "bukan" digunakan.'),
          D('kata-sendi', 'Mesyuarat kelab bermula {di} pukul lapan pagi.', ['pada', 'ke', 'dari', 'kepada'], 0, '"Pada" digunakan di hadapan kata yang menunjukkan masa.'),
          D('kata-sendi', 'Pensyarah memberikan nasihat {pada} pelajar itu.', ['kepada', 'di', 'daripada', 'ke'], 0, '"Kepada" digunakan di hadapan kata nama manusia sebagai penerima.'),
          D('kata-sendi', 'Pelajar itu lebih rajin {dari} rakannya.', ['daripada', 'pada', 'kepada', 'ke'], 0, '"Daripada" digunakan untuk perbandingan.'),
          D('kata-sendi', 'Bas itu bertolak {daripada} Kuala Terengganu pada pukul tujuh.', ['dari', 'pada', 'kepada', 'di'], 0, '"Dari" digunakan di hadapan nama tempat untuk menunjukkan tempat permulaan.'),
          D('kata-ganda', 'Semua {pelajar-pelajar} wajib memakai topi keselamatan.', ['pelajar', 'para pelajar', 'pelajar-pelajarnya', 'pelajar-pelajar'], 0, 'Kata bilangan "semua" sudah menunjukkan jamak, maka kata nama tidak perlu digandakan.'),
          D('imbuhan', 'Kami {mengguna} spana untuk mengetatkan skru.', ['menggunakan', 'digunakan', 'mengguna', 'gunakan'], 0, 'Kata kerja "guna" memerlukan apitan meN-...-kan, iaitu "menggunakan".'),
          D('ejaan', 'Pelajar itu memasukkan data {kedalam} komputer.', ['ke dalam', 'kedalam', 'ke-dalam', 'dalam'], 0, 'Kata sendi "ke" ditulis terpisah daripada kata arah "dalam".'),
          D('kata-sendi', 'Kek itu diperbuat {dari} tepung gandum dan telur.', ['daripada', 'dari', 'pada', 'kepada'], 0, '"Daripada" digunakan untuk menunjukkan asal kejadian sesuatu benda.')
        ]
      },
      2: {
        nota: [
          ['Imbuhan meN-', 'meN- + p → mem (pukul → memukul), t → men (tampal → menampal), k → meng (kaji → mengkaji), s → meny (sasar → menyasarkan). Kata satu suku kata: menge- (cat → mengecat, lap → mengelap).'],
          ['Akhiran -kan dan -i', '-kan biasanya kausatif atau benefaktif (menghadiahkan buku kepada ibu). -i biasanya lokatif (memasuki bengkel, menaiki bas).'],
          ['Imbuhan peN- dan peN-...-an', 'peN- membentuk pelaku atau alat (pemotong). peN-...-an membentuk proses atau hasil (pemotongan).'],
          ['Kata hubung', 'Pilih kata hubung mengikut makna: tetapi (pertentangan), supaya (tujuan), kerana (sebab).']
        ],
        contoh: [
          ['Pelajar itu mensasarkan markah penuh. → menyasarkan', 'Huruf "s" pada kata dasar "sasar" luluh menjadi "ny".'],
          ['Mereka memasukkan bengkel. → memasuki', '"Memasuki" bermaksud masuk ke dalam sesuatu tempat.']
        ],
        soalan: [
          D('imbuhan', 'Pelajar itu {mensasarkan} markah penuh dalam ujian amali.', ['menyasarkan', 'mesasarkan', 'mensasarkan', 'sasarkan'], 0, 'Huruf "s" pada kata dasar "sasar" luluh apabila menerima awalan meN-, menjadi "menyasarkan".'),
          D('imbuhan', 'Encik Hakim {menkaji} punca kerosakan enjin itu.', ['mengkaji', 'mengaji', 'menkaji', 'kaji'], 0, 'meN- + kaji → "mengkaji". Huruf "k" dikekalkan bagi perkataan "kaji" untuk membezakannya daripada "mengaji".'),
          D('imbuhan', 'Mereka {memasukkan} bengkel selepas loceng berbunyi.', ['memasuki', 'masukkan', 'dimasukkan', 'termasuk'], 0, '"Memasuki" bermaksud masuk ke dalam sesuatu tempat. "Memasukkan" bermaksud membawa sesuatu masuk.'),
          D('imbuhan', 'Aina {menghadiahi} kek itu kepada ibunya.', ['menghadiahkan', 'dihadiahi', 'berhadiah', 'menghadiahi'], 0, 'Benda yang dihadiahkan menjadi objek, maka gunakan "menghadiahkan ... kepada".'),
          D('imbuhan', 'Haziq {mencat} dinding bengkel dengan warna kelabu.', ['mengecat', 'mencat', 'mecat', 'cat'], 0, 'Kata dasar satu suku kata menerima awalan "menge-": mengecat.'),
          D('imbuhan', 'Siti {melap} meja dapur selepas memotong sayur.', ['mengelap', 'melap', 'mlap', 'lap'], 0, 'Kata dasar satu suku kata menerima awalan "menge-": mengelap.'),
          D('imbuhan', 'Ketua kelas {menyampai} notis itu kepada semua pelajar.', ['menyampaikan', 'menyampaii', 'disampai', 'sampai'], 0, 'Kata kerja ini memerlukan akhiran -kan: menyampaikan notis kepada pelajar.'),
          D('kata-hubung', 'Saya mahu menyertai pertandingan itu {dan} saya tidak sihat.', ['tetapi', 'kerana', 'supaya', 'sambil'], 0, 'Kedua-dua idea bertentangan, maka kata hubung "tetapi" digunakan.'),
          D('kata-hubung', 'Anda mesti memakai kaca mata keselamatan {dan} mata anda terlindung.', ['supaya', 'tetapi', 'atau', 'sambil'], 0, 'Klausa kedua menyatakan tujuan, maka kata hubung "supaya" digunakan.'),
          D('imbuhan', 'Mesin {pemotongan} kayu itu sangat bising.', ['pemotong', 'potongan', 'memotong', 'pemotongan'], 0, 'Alat dinamakan dengan awalan peN-: pemotong. "Pemotongan" ialah proses.'),
          D('imbuhan', '{Kebersih} dapur mesti dijaga setiap masa.', ['Kebersihan', 'Pembersih', 'Bersihkan', 'Kebersih'], 0, 'Apitan ke-...-an membentuk kata nama "kebersihan".'),
          D('imbuhan', 'Bakeri kolej menerima banyak {tempah} sempena Hari Raya.', ['tempahan', 'menempah', 'ditempah', 'tempah'], 0, 'Kata nama "tempahan" (tempah + -an) diperlukan selepas "banyak".'),
          D('imbuhan', 'Haziq {perjaya} membaiki enjin kereta itu.', ['berjaya', 'kejayaan', 'menjayakan', 'perjaya'], 0, 'Kata kerja yang tepat ialah "berjaya" (beR- + jaya).'),
          D('imbuhan', 'Kunci bengkel itu {dibawa} balik tanpa sengaja.', ['terbawa', 'membawa', 'dibawakan', 'bawaan'], 0, 'Awalan ter- membawa maksud tidak sengaja: terbawa.'),
          D('kata-sendi', 'Surat itu {dari} pengetua kolej.', ['daripada', 'pada', 'kepada', 'ke'], 0, '"Daripada" digunakan di hadapan manusia sebagai sumber.'),
          D('kata-ganda', 'Para {pelajar-pelajar} diminta berkumpul di dewan.', ['pelajar', 'pelajar-pelajarnya', 'pelajar semua', 'pelajar-pelajar'], 0, '"Para" sudah menunjukkan jamak, maka kata nama tidak perlu digandakan.'),
          D('kata-ganda', 'Banyak {alat-alat} bengkel perlu diselenggara.', ['alat', 'peralatan-peralatan', 'alat-alatan', 'alat-alat'], 0, '"Banyak" sudah menunjukkan jamak, maka gunakan "alat".'),
          D('kata-sendi', 'Kek itu diberikan {pada} pelanggan setia bakeri.', ['kepada', 'di', 'ke', 'dari'], 0, '"Kepada" digunakan di hadapan kata nama manusia sebagai penerima.'),
          D('imbuhan', 'Pelajar itu {menaikkan} bas ke kolej setiap pagi.', ['menaiki', 'naikkan', 'dinaikkan', 'kenaikan'], 0, '"Menaiki" bermaksud naik ke atas kenderaan. "Menaikkan" bermaksud mengangkat sesuatu ke atas.'),
          D('imbuhan', 'Wang jualan itu {disimpankan} di dalam peti besi.', ['disimpan', 'menyimpankan', 'tersimpankan', 'disimpankan'], 0, 'Kata kerja "simpan" tidak memerlukan akhiran -kan dalam konteks ini: disimpan.')
        ]
      },
      3: {
        nota: [
          ['Kata hubung relatif', 'Gunakan "yang". Jangan gunakan "yang mana" atau "di mana" sebagai penghubung dalam ayat penyata.'],
          ['Pasif diri pertama dan kedua', 'Salah: Kereta itu dibaiki oleh saya. Betul: Kereta itu saya baiki.'],
          ['Kelewahan', 'Elakkan penggunaan kata yang berulang maksudnya, contohnya "telah sudah", "sangat ... sekali" dan "tentang mengenai".'],
          ['Ejaan kata majmuk dan imbuhan', 'mengemas kini (bukan mengemaskini), antarabangsa (bukan antara bangsa), memperoleh (bukan memperolehi), walau bagaimanapun.'],
          ['Laras formal', 'Elakkan bahasa basahan seperti "tak", "nak" dan "dah" dalam ayat rasmi.']
        ],
        contoh: [
          ['Kami telah sudah menyiapkan projek. → Kami telah menyiapkan projek.', 'Gunakan satu kata bantu aspek sahaja.'],
          ['Saya punya projek sudah siap. → Projek saya sudah siap.', 'Struktur "saya punya" ialah pengaruh bahasa asing.']
        ],
        soalan: [
          P('ayat-aktif-pasif', 'Pilih pembetulan bagi ayat: "Kereta itu telah dibaiki oleh saya."', ['Kereta itu telah saya baiki.', 'Kereta itu telah dibaiki saya.', 'Kereta itu saya telah dibaiki.', 'Kereta itu telah disaya baiki.'], 0, 'Ayat pasif diri pertama menggunakan susunan kata bantu + saya + kata kerja dasar.'),
          D('kesalahan-tatabahasa', 'Pelajar itu membaiki komputer {yang_mana} rosak semalam.', ['yang', 'di mana', 'yang mana', 'mana'], 0, 'Kata hubung relatif yang betul ialah "yang".'),
          D('kesalahan-tatabahasa', 'Bengkel {di_mana} kami berlatih itu sangat luas.', ['tempat', 'yang mana', 'di mana', 'mana'], 0, '"Di mana" ialah kata tanya. Dalam ayat penyata, gunakan "tempat" atau susun semula ayat itu.'),
          D('kesalahan-tatabahasa', 'Kami {telah_sudah} menyiapkan projek akhir itu.', ['telah', 'telah pun sudah', 'sudah telah', 'telah sudah'], 0, '"Telah" dan "sudah" mempunyai maksud yang sama. Gunakan salah satu sahaja.'),
          P('kesalahan-tatabahasa', 'Pilih ayat yang TIDAK lewah.', ['Kek itu sangat sedap.', 'Kek itu sangat sedap sekali.', 'Kek itu amat sangat sedap.', 'Kek itu sedap sangat sekali.'], 0, 'Kata penguat "sangat" dan "sekali" tidak digunakan serentak.'),
          P('kesalahan-tatabahasa', 'Pilih pembetulan bagi ayat: "Saya punya projek sudah siap."', ['Projek saya sudah siap.', 'Saya punya projek telah siap.', 'Projek punya saya sudah siap.', 'Projek kepunyaan punya saya sudah siap.'], 0, 'Struktur "saya punya projek" tidak gramatis. Gunakan "projek saya" mengikut hukum D-M.'),
          P('ayat-aktif-pasif', 'Pilih pembetulan bagi ayat: "Penyata kewangan itu disediakan oleh kami."', ['Penyata kewangan itu kami sediakan.', 'Penyata kewangan itu dikami sediakan.', 'Penyata kewangan itu disediakan kami.', 'Kami penyata kewangan itu sediakan.'], 0, 'Bagi kata ganti nama diri pertama "kami", gunakan "kami sediakan" tanpa "di-" dan tanpa "oleh".'),
          D('penanda-wacana', '{Walau_bagaimana_pun,} kos bahan mentah semakin meningkat.', ['Walau bagaimanapun,', 'Walaubagaimanapun,', 'Walau bagaimana pun,', 'Walau-bagaimanapun,'], 0, 'Ejaan yang betul ialah "Walau bagaimanapun". Partikel "pun" dicantumkan dengan "bagaimana".'),
          D('penanda-wacana', 'Pelajar itu tidak hadir ke bengkel. {Oleh_itu,} dia demam sejak semalam.', ['Hal ini kerana', 'Selain itu,', 'Kesimpulannya,', 'Oleh itu,'], 0, 'Ayat kedua menyatakan sebab, maka penanda wacana yang sesuai ialah "Hal ini kerana".'),
          P('ayat-formal', 'Pilih ayat yang menggunakan laras bahasa formal.', ['Saya tidak dapat hadir ke kelas esok.', 'Saya tak dapat hadir ke kelas esok.', 'Saya tak dapat datang kelas esok.', 'Saya x dapat hadir ke kelas esok.'], 0, '"Tak" dan "x" ialah bahasa basahan. Gunakan "tidak" dalam ayat formal.'),
          D('kata-ganda', '{Mereka-mereka} sedang membaiki enjin di bengkel.', ['Mereka', 'Mereka semua-semua', 'Merekanya', 'Mereka-mereka'], 0, 'Kata ganti nama "mereka" sudah menunjukkan jamak dan tidak digandakan.'),
          D('ejaan', 'Pelajar itu {mengemaskini} rekod inventori setiap minggu.', ['mengemas kini', 'mengemaskinikan', 'mengkemaskini', 'mengemaskini'], 0, 'Kata majmuk "kemas kini" dieja terpisah walaupun menerima awalan: mengemas kini.'),
          D('imbuhan', 'Pelajar bakeri itu {memperolehi} anugerah pelajar cemerlang.', ['memperoleh', 'mendapati', 'memperolehkan', 'memperolehi'], 0, 'Bentuk yang betul ialah "memperoleh" tanpa akhiran -i.'),
          D('ejaan', 'Pertandingan inovasi {antara_bangsa} itu disertai oleh 20 buah negara.', ['antarabangsa', 'antara-bangsa', 'antara bangsa', 'antarbangsa'], 0, '"Antarabangsa" ialah kata majmuk mantap yang dieja bercantum.'),
          P('ayat-kompleks', 'Pilih pembetulan bagi ayat: "Bengkel itu ditutup di mana pelajar tidak dibenarkan masuk."', ['Bengkel itu ditutup dan pelajar tidak dibenarkan masuk.', 'Bengkel itu ditutup yang mana pelajar tidak dibenarkan masuk.', 'Bengkel itu ditutup di mana-mana pelajar tidak dibenarkan masuk.', 'Bengkel itu ditutup mana pelajar tidak dibenarkan masuk.'], 0, '"Di mana" tidak boleh digunakan sebagai penghubung. Gunakan kata hubung yang sesuai seperti "dan".'),
          D('kata-ganda', 'Setiap {pelajar-pelajar} mesti membawa buku log amali.', ['pelajar', 'para pelajar', 'pelajar-pelajarnya', 'pelajar-pelajar'], 0, '"Setiap" merujuk kepada satu-satu, maka kata nama tidak digandakan.'),
          P('ayat-aktif-pasif', 'Pilih pembetulan bagi ayat: "Tugasan itu mesti disiapkan oleh kamu."', ['Tugasan itu mesti kamu siapkan.', 'Tugasan itu mesti dikamu siapkan.', 'Tugasan itu kamu mesti disiapkan.', 'Tugasan itu mesti siapkan kamu.'], 0, 'Bagi kata ganti nama diri kedua, gunakan "mesti kamu siapkan".'),
          D('ejaan', 'Kami mengucapkan terima kasih {diatas} kerjasama anda.', ['atas', 'diatas', 'di atasnya', 'ke atas'], 0, 'Untuk perkara abstrak seperti kerjasama, gunakan "atas". Bentuk "diatas" juga salah ejaan.'),
          P('kesalahan-tatabahasa', 'Pilih ayat yang TIDAK lewah.', ['Kami berbincang tentang projek itu.', 'Kami berbincang tentang mengenai projek itu.', 'Kami berbincang mengenai tentang projek itu.', 'Kami berbincang-bincang tentang mengenai projek itu.'], 0, '"Tentang" dan "mengenai" mempunyai maksud yang sama. Gunakan salah satu sahaja.'),
          D('kata-tugas', 'Encik Lim {adalah} pensyarah automotif yang berpengalaman.', ['ialah', 'adalah merupakan', 'iaitu', 'adalah'], 0, 'Kata pemeri "ialah" digunakan di hadapan frasa nama.')
        ]
      }
    }
  };

  /* ================= MODUL 6: CABARAN MASTER AYAT ================= */
  window.BANK.modul[6] = {
    id: 6, nama: 'Cabaran Master Ayat', ringkas: 'Ujian penguasaan keseluruhan dengan markah, lencana dan tahap pencapaian.',
    tahap: {
      1: {
        nota: [
          ['Format cabaran', '20 soalan campuran yang meliputi golongan kata, subjek dan predikat, ayat dasar, kata sendi dan kata hubung. Masa: 15 minit.'],
          ['Tahap pencapaian', 'Cemerlang (80% ke atas), Kepujian (65–79%), Lulus (50–64%) dan Perlu Bimbingan (bawah 50%).'],
          ['Ganjaran', 'Markah 80% ke atas memberikan mata bonus. Cabaran Tahap 3 menjadi syarat lencana Master Bahasa Melayu.']
        ],
        contoh: [['Tip', 'Baca keseluruhan ayat sebelum memilih jawapan. Semak jenis kata yang hadir selepas tempat kosong.']],
        soalan: [
          P('pembinaan-ayat', 'Pilih ayat yang gramatis.', ['Kami sedang membersihkan bengkel.', 'Kami sedang bersihkan bengkel.', 'Kami bengkel sedang membersihkan.', 'Sedang kami bengkel membersihkan.'], 0, 'Susunan subjek + kata bantu + kata kerja berimbuhan + objek adalah betul.'),
          P('kata-nama', 'Antara berikut, manakah kata nama?', ['pelanggan', 'melayan', 'mesra', 'dengan'], 0, '"Pelanggan" ialah nama orang. "Melayan" (KK), "mesra" (KA) dan "dengan" (KT).'),
          P('kata-kerja', 'Antara berikut, manakah kata kerja?', ['menyelenggara', 'penyelenggaraan', 'rapi', 'kerana'], 0, '"Menyelenggara" menunjukkan perbuatan.'),
          P('kata-adjektif', 'Antara berikut, manakah kata adjektif?', ['tekun', 'ketekunan', 'menekuni', 'dengan'], 0, '"Tekun" menerangkan sifat. "Ketekunan" ialah kata nama.'),
          P('kata-tugas', 'Antara berikut, manakah kata tugas?', ['sambil', 'sabar', 'menyambung', 'sambungan'], 0, '"Sambil" ialah kata hubung yang tergolong dalam kata tugas.'),
          P('subjek-predikat', 'Apakah subjek bagi ayat "Pelanggan setia bakeri itu menempah kek lapis."?', ['Pelanggan setia bakeri itu', 'menempah kek lapis', 'kek lapis', 'Pelanggan'], 0, 'Subjek ialah keseluruhan frasa nama "Pelanggan setia bakeri itu".'),
          P('subjek-predikat', 'Apakah predikat bagi ayat "Encik Rahim penyelia bengkel automotif."?', ['penyelia bengkel automotif', 'Encik Rahim', 'bengkel automotif', 'automotif'], 0, 'Predikat ialah frasa nama "penyelia bengkel automotif".'),
          P('pola-ayat', 'Ayat manakah berpola FN + FA?', ['Pelajar bengkel elektrik itu sangat cekap.', 'Pelajar itu pemenang pertandingan.', 'Pelajar itu memasang lampu.', 'Pelajar itu di bengkel.'], 0, '"Sangat cekap" ialah frasa adjektif.'),
          P('kata-sendi', 'Pelajar itu sedang berehat ____ kantin.', ['di', 'ke', 'pada', 'kepada'], 0, '"Di" digunakan untuk tempat.'),
          P('kata-sendi', 'Kami akan bertolak ____ kolej pada pukul tujuh pagi.', ['dari', 'daripada', 'kepada', 'pada'], 0, '"Dari" digunakan untuk tempat permulaan.'),
          P('kata-hubung', 'Aina menguli doh ____ Siti memotong mentega.', ['dan', 'tetapi', 'kerana', 'supaya'], 0, '"Dan" menggabungkan dua perbuatan yang setara.'),
          P('kata-tugas', 'Pensyarah ____ menyemak laporan kami sekarang.', ['sedang', 'telah', 'belum', 'pernah'], 0, '"Sedang" sesuai dengan keterangan masa "sekarang".'),
          P('kata-tugas', 'Itu ____ kunci bengkel automotif.', ['bukan', 'tidak', 'belum', 'jangan'], 0, '"Kunci bengkel automotif" ialah frasa nama, maka kata nafi "bukan" digunakan.'),
          P('kata-tugas', 'Wayar itu ____ cukup panjang untuk disambung ke soket.', ['tidak', 'bukan', 'jangan', 'tiada'], 0, '"Panjang" ialah kata adjektif, maka kata nafi "tidak" digunakan.'),
          P('ayat-dasar', 'Manakah ayat yang lengkap?', ['Juruteknik itu memeriksa tekanan tayar.', 'Juruteknik yang memeriksa tekanan tayar.', 'Memeriksa tekanan tayar dengan teliti.', 'Di bengkel automotif kolej.'], 0, 'Ayat ini mempunyai subjek dan predikat yang lengkap.'),
          P('golongan-kata', 'Bakeri kolej membeli se____ ketuhar baharu.', ['buah', 'ekor', 'helai', 'batang'], 0, 'Penjodoh bilangan "buah" digunakan untuk benda besar seperti ketuhar.'),
          P('kata-nama', 'Encik Azman pensyarah kami. ____ sangat berpengalaman dalam bidang automotif.', ['Beliau', 'Ia', 'Engkau', 'Kami'], 0, '"Beliau" digunakan untuk orang ketiga yang dihormati.'),
          P('kata-nama', 'Antara berikut, manakah kata ganti nama diri pertama jamak?', ['kami', 'mereka', 'kamu', 'beliau'], 0, '"Kami" ialah kata ganti nama diri pertama jamak.'),
          P('kata-tugas', 'Encik Hakim ____ juruteknik terbaik di bengkel itu.', ['ialah', 'adalah', 'iaitu', 'merupakan ialah'], 0, '"Ialah" hadir di hadapan frasa nama.'),
          P('struktur-ayat', 'Susun perkataan berikut: (itu / bersih / bengkel / sangat)', ['Bengkel itu sangat bersih.', 'Bengkel sangat itu bersih.', 'Itu bengkel bersih sangat.', 'Sangat bengkel itu bersih.'], 0, 'Subjek "Bengkel itu" + predikat "sangat bersih".')
        ]
      },
      2: {
        nota: [
          ['Format cabaran', '20 soalan campuran yang meliputi imbuhan, pola ayat, ayat majmuk, kata sendi nama dan pengembangan ayat. Masa: 15 minit.'],
          ['Fokus', 'Imbuhan meN-, -kan dan -i, peN-, ke-...-an, per-...-an, beR- dan ter-.']
        ],
        contoh: [['Tip', 'Untuk soalan imbuhan, tentukan sama ada perkataan yang diperlukan ialah kata nama, kata kerja atau kata adjektif.']],
        soalan: [
          P('imbuhan', 'Pelajar itu ____ tayar kereta yang pancit.', ['menampal', 'mentampal', 'menampalkan', 'ditampal'], 0, 'meN- + tampal → menampal. Huruf "t" luluh.'),
          P('imbuhan', 'Siti ____ meja dapur dengan kain lap.', ['mengelap', 'melap', 'mengelapkan', 'lapkan'], 0, 'Kata satu suku kata "lap" menerima awalan "menge-".'),
          P('imbuhan', 'Encik Lim ____ cara menggunakan multimeter kepada pelajar.', ['menerangkan', 'menerangi', 'menerang', 'diterang'], 0, '"Menerangkan" bermaksud menjelaskan.'),
          P('imbuhan', 'Pelajar itu ____ bas untuk ke kolej.', ['menaiki', 'menaikkan', 'naikkan', 'menaik'], 0, '"Menaiki" bermaksud naik ke atas kenderaan.'),
          P('imbuhan', 'Mesin ____ rumput di kolej itu rosak.', ['pemotong', 'pemotongan', 'potongan', 'memotong'], 0, 'Alat dinamakan dengan awalan peN-: pemotong.'),
          P('imbuhan', '____ dapur amat penting dalam industri makanan.', ['Kebersihan', 'Pembersih', 'Membersihkan', 'Bersihkan'], 0, '"Kebersihan" ialah kata nama yang sesuai menjadi subjek.'),
          P('pola-ayat', 'Apakah pola ayat "Hadiah itu untuk pelajar terbaik."?', ['FN + FS', 'FN + FN', 'FN + FK', 'FN + FA'], 0, 'Predikat dimulakan dengan kata sendi nama "untuk".'),
          P('ayat-majmuk', 'Manakah ayat majmuk?', ['Haziq menyapu lantai sambil Faiz mengemas rak.', 'Haziq menyapu lantai bengkel.', 'Lantai bengkel itu licin.', 'Haziq di bengkel.'], 0, 'Dua ayat dicantumkan dengan kata hubung "sambil".'),
          P('kata-sendi', 'Roti itu diperbuat ____ tepung gandum.', ['daripada', 'dari', 'pada', 'kepada'], 0, '"Daripada" menunjukkan asal kejadian.'),
          P('kata-sendi', 'Kek coklat itu lebih mahal ____ kek pandan.', ['daripada', 'dari', 'pada', 'kepada'], 0, '"Daripada" digunakan untuk perbandingan.'),
          P('kata-sendi', 'Pensyarah memberikan taklimat ____ semua pelajar.', ['kepada', 'pada', 'di', 'ke'], 0, '"Kepada" digunakan di hadapan manusia sebagai penerima.'),
          P('kata-sendi', 'Kelas amali bermula ____ pukul 8.00 pagi.', ['pada', 'di', 'kepada', 'ke'], 0, '"Pada" digunakan di hadapan masa.'),
          P('kata-hubung', 'Kami tidak dapat ke bengkel ____ hujan sangat lebat.', ['kerana', 'tetapi', 'atau', 'supaya'], 0, '"Kerana" menyatakan sebab.'),
          P('kata-hubung', 'Anda boleh membayar secara tunai ____ melalui pindahan wang dalam talian.', ['atau', 'tetapi', 'kerana', 'supaya'], 0, '"Atau" menyatakan pilihan.'),
          P('kata-hubung', 'Pelajar itu menyimpan salinan fail ____ data tidak hilang.', ['supaya', 'kerana', 'tetapi', 'atau'], 0, '"Supaya" menyatakan tujuan.'),
          P('pengembangan-ayat', 'Ayat dasar: "Pelajar itu memasang lampu." Manakah ayat yang mengembangkan SUBJEK?', ['Pelajar bidang elektrik yang tekun itu memasang lampu.', 'Pelajar itu memasang lampu di dewan.', 'Pelajar itu memasang lampu dengan cermat.', 'Pelajar itu memasang lampu semalam.'], 0, 'Unsur "bidang elektrik yang tekun" menambah keterangan pada subjek.'),
          P('ayat-kompleks', 'Manakah ayat yang menggunakan kata hubung relatif dengan betul?', ['Kek yang ditempah oleh pelanggan itu sudah siap.', 'Kek yang mana ditempah oleh pelanggan itu sudah siap.', 'Kek di mana ditempah oleh pelanggan itu sudah siap.', 'Kek mana ditempah oleh pelanggan itu sudah siap.'], 0, 'Kata hubung relatif yang betul ialah "yang".'),
          P('imbuhan', 'Pelajar itu ____ di bengkel setiap petang.', ['berlatih', 'melatih', 'latihan', 'dilatih'], 0, '"Berlatih" ialah kata kerja tak transitif yang tidak memerlukan objek.'),
          P('imbuhan', 'Ini ialah bengkel ____ di kolej kami.', ['terbesar', 'berbesar', 'membesar', 'kebesaran'], 0, 'Awalan ter- membawa maksud paling: terbesar.'),
          P('imbuhan', '____ itu disertai oleh 50 orang pelajar.', ['Pertandingan', 'Bertanding', 'Penanding', 'Tandingan'], 0, 'Apitan per-...-an membentuk kata nama "pertandingan".')
        ]
      },
      3: {
        nota: [
          ['Format cabaran', '20 soalan campuran yang meliputi ayat kompleks, ayat aktif dan pasif, penyuntingan, penanda wacana dan ayat formal. Masa: 15 minit.'],
          ['Lencana', 'Markah 80% ke atas dalam cabaran ini dan dalam ujian pasca melayakkan anda menerima lencana Master Bahasa Melayu.']
        ],
        contoh: [['Tip', 'Untuk soalan penanda wacana, kenal pasti hubungan antara dua ayat, sama ada tambahan, akibat, pertentangan atau kesimpulan.']],
        soalan: [
          P('ayat-aktif-pasif', 'Apakah ayat pasif bagi "Kami menyediakan laporan itu."?', ['Laporan itu kami sediakan.', 'Laporan itu disediakan oleh kami.', 'Laporan itu dikami sediakan.', 'Kami laporan itu sediakan.'], 0, 'Pasif diri pertama: objek + kami + kata kerja dasar.'),
          P('ayat-aktif-pasif', 'Apakah ayat pasif bagi "Encik Lim menyemak tugasan itu."?', ['Tugasan itu disemak oleh Encik Lim.', 'Tugasan itu Encik Lim semak.', 'Tugasan itu menyemak Encik Lim.', 'Encik Lim disemak tugasan itu.'], 0, 'Bagi nama orang, gunakan di- + kata kerja + oleh + pelaku.'),
          P('penanda-wacana', 'Pelajar perlu menjaga kebersihan bengkel. ____, mereka juga perlu menyimpan peralatan dengan betul.', ['Selain itu', 'Oleh itu', 'Sebaliknya', 'Kesimpulannya'], 0, 'Ayat kedua menambah isi, maka "Selain itu" digunakan.'),
          P('penanda-wacana', 'Kos bahan mentah meningkat. ____, harga kek terpaksa dinaikkan.', ['Oleh itu', 'Selain itu', 'Sebaliknya', 'Contohnya'], 0, 'Ayat kedua ialah akibat, maka "Oleh itu" digunakan.'),
          P('penanda-wacana', 'Ramai pelajar menganggap bidang automotif sukar. ____, mereka yang tekun mampu menguasainya.', ['Walau bagaimanapun', 'Oleh itu', 'Tambahan pula', 'Kesimpulannya'], 0, 'Ayat kedua bertentangan dengan ayat pertama.'),
          P('ayat-formal', 'Pilih ayat yang paling sesuai untuk notis rasmi.', ['Semua pelajar dikehendaki hadir ke dewan pada pukul 2.00 petang.', 'Korang semua kena datang dewan pukul 2 petang.', 'Semua pelajar kena datang ke dewan pukul 2.', 'Pelajar-pelajar semua sila datang dewan tau.'], 0, 'Ayat ini menggunakan laras formal tanpa bahasa basahan.'),
          P('penyuntingan', 'Pilih ayat yang TIDAK mengandungi kesalahan.', ['Para pelajar sedang menyiapkan projek akhir.', 'Para pelajar-pelajar sedang menyiapkan projek akhir.', 'Semua pelajar-pelajar sedang menyiapkan projek akhir.', 'Para pelajar sedang menyiapkan projek-projek akhir semua.'], 0, '"Para" tidak diikuti kata ganda.'),
          P('ayat-kompleks', 'Gabungkan: "Pelajar itu menerima anugerah. Pelajar itu mencipta alat penjimat tenaga."', ['Pelajar yang mencipta alat penjimat tenaga itu menerima anugerah.', 'Pelajar di mana mencipta alat penjimat tenaga menerima anugerah.', 'Pelajar yang mana mencipta alat penjimat tenaga menerima anugerah.', 'Pelajar itu menerima anugerah dan pelajar itu mencipta alat penjimat tenaga.'], 0, 'Ayat kompleks dibentuk dengan kata hubung relatif "yang".'),
          P('penyuntingan', 'Pilih pembetulan bagi: "Makmal di mana kami belajar itu baru dibaik pulih."', ['Makmal tempat kami belajar itu baru dibaik pulih.', 'Makmal yang mana kami belajar itu baru dibaik pulih.', 'Makmal di mana-mana kami belajar itu baru dibaik pulih.', 'Makmal mana kami belajar itu baru dibaik pulih.'], 0, 'Gunakan "tempat" untuk menggantikan "di mana".'),
          P('ayat-aktif-pasif', 'Apakah ayat aktif bagi "Kek itu dihias oleh Aina."?', ['Aina menghias kek itu.', 'Aina dihias kek itu.', 'Kek itu menghias Aina.', 'Aina kek itu hias.'], 0, 'Pelaku "Aina" menjadi subjek dan kata kerja menerima awalan meN-.'),
          P('penyuntingan', 'Pilih ayat yang TIDAK lewah.', ['Kami telah menyiapkan laporan itu.', 'Kami telah sudah menyiapkan laporan itu.', 'Kami sudah telah menyiapkan laporan itu.', 'Kami telah pun sudah menyiapkan laporan itu.'], 0, 'Gunakan satu kata bantu aspek sahaja.'),
          P('ejaan', 'Pilih ejaan yang betul.', ['Pelajar perlu mengemas kini rekod inventori.', 'Pelajar perlu mengemaskini rekod inventori.', 'Pelajar perlu mengkemaskini rekod inventori.', 'Pelajar perlu mengemaskinikan rekod inventori.'], 0, '"Mengemas kini" dieja terpisah.'),
          P('imbuhan', 'Pelajar itu berjaya ____ Sijil Kemahiran Malaysia.', ['memperoleh', 'memperolehi', 'perolehi', 'diperolehi'], 0, 'Bentuk yang betul ialah "memperoleh".'),
          P('penyuntingan', 'Pilih pembetulan bagi: "Saya punya bengkel sudah siap dibaik pulih."', ['Bengkel saya sudah siap dibaik pulih.', 'Saya punya bengkel telah siap dibaik pulih.', 'Bengkel punya saya sudah siap dibaik pulih.', 'Punya saya bengkel sudah siap dibaik pulih.'], 0, 'Gunakan susunan D-M: bengkel saya.'),
          P('penanda-wacana', 'Penanda wacana yang paling sesuai untuk memulakan perenggan penutup ialah', ['Kesimpulannya', 'Selain itu', 'Contohnya', 'Seterusnya'], 0, '"Kesimpulannya" digunakan untuk merumuskan.'),
          P('kepelbagaian-ayat', 'Manakah ayat songsang?', ['Cekap sungguh juruteknik muda itu.', 'Juruteknik muda itu cekap sungguh.', 'Juruteknik muda itu membaiki enjin.', 'Enjin itu dibaiki oleh juruteknik muda.'], 0, 'Predikat "Cekap sungguh" mendahului subjek.'),
          P('ayat-aktif-pasif', 'Manakah ayat pasif yang betul?', ['Borang itu hendaklah anda isi dengan lengkap.', 'Borang itu hendaklah diisi oleh anda dengan lengkap.', 'Borang itu hendaklah dianda isi dengan lengkap.', 'Anda borang itu hendaklah isi dengan lengkap.'], 0, 'Pasif diri kedua: kata bantu + anda + kata kerja dasar.'),
          P('ayat-kompleks', 'Manakah ayat yang menggunakan "bukan sahaja ... malah" dengan betul?', ['Program itu bukan sahaja meningkatkan kemahiran, malah membina keyakinan pelajar.', 'Program itu bukan sahaja meningkatkan kemahiran, tetapi malah membina keyakinan pelajar.', 'Program itu malah meningkatkan kemahiran, bukan sahaja membina keyakinan pelajar.', 'Bukan sahaja program itu, malah meningkatkan kemahiran.'], 0, 'Pasangan "bukan sahaja ... malah" digunakan tanpa "tetapi".'),
          P('ayat-kompleks', 'Manakah ayat yang betul strukturnya?', ['Sungguhpun penat, pelajar itu tetap menyiapkan tugasannya.', 'Sungguhpun penat tetapi pelajar itu tetap menyiapkan tugasannya.', 'Sungguhpun penat, tetapi pelajar itu tetap menyiapkan tugasannya.', 'Pelajar itu sungguhpun tetapi penat menyiapkan tugasannya.'], 0, '"Sungguhpun" tidak dipasangkan dengan "tetapi".'),
          P('ayat-formal', 'Pilih ayat pembuka yang sesuai untuk surat rasmi.', ['Dengan hormatnya, saya merujuk kepada perkara di atas.', 'Hai, saya nak tanya pasal perkara ini.', 'Assalamualaikum, korang apa khabar?', 'Saya tulis surat ni sebab nak minta tolong.'], 0, 'Ayat ini menggunakan laras formal yang sopan tanpa bahasa basahan.')
        ]
      }
    }
  };
})();
