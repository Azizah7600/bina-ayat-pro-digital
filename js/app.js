/* BINA AYAT PRO DIGITAL — Aplikasi utama
   Inovasi: Cikgu Azizah Ismail, Kolej Vokasional Wakaf Tembesu */
(function () {
  'use strict';
  const B = window.BANK, C = window.BAP_CONFIG || {}, Store = window.Store;
  const app = document.getElementById('app');

  /* ---------- utiliti ---------- */
  const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tok = w => String(w).replace(/_/g, ' ');
  const fmtS = s => h(s).replace(/\[\[(.+?)\]\]/g, '<mark>$1</mark>');
  const plain = s => String(s).replace(/\[\[(.+?)\]\]/g, '$1');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const tarikh = iso => iso ? new Date(iso).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }) : '–';
  const masa = iso => iso ? new Date(iso).toLocaleString('ms-MY', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '–';
  const hariKey = d => { const x = new Date(d); return x.getFullYear() + '-' + (x.getMonth() + 1) + '-' + x.getDate(); };
  const avg = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
  const r0 = x => x == null ? '–' : Math.round(x);
  const norm = s => String(s).toLowerCase().replace(/[.,!?;:"“”]/g, '').replace(/\s+/g, ' ').trim();
  const ayatDari = w => { const s = w.map(tok).join(' '); return s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? '' : '.'); };
  const MOD_NAMA = { 1: 'Kenali Kata', 2: 'Struktur Ayat', 3: 'Susun Ayat', 4: 'Bina Ayat', 5: 'Detektif Tatabahasa', 6: 'Cabaran Master Ayat' };
  const TAHAP_NAMA = { 1: 'Asas', 2: 'Pertengahan', 3: 'Mahir' };
  const RUBRIK = [['struktur', 'Struktur ayat', 25], ['tatabahasa', 'Ketepatan tatabahasa', 25], ['imbuhan', 'Penggunaan imbuhan', 20], ['makna', 'Ketepatan makna', 20], ['tanda', 'Tanda baca dan ejaan', 10]];

  const V3 = window.VIS;
  const PENGUMUMAN = '✨ SELAMAT DATANG KE BINA AYAT PRO DIGITAL | FAHAM • SUSUN • BINA • SEMAK | KUASAI TATABAHASA, BINA AYAT GRAMATIS! | 📚 TERUS BERLATIH, TINGKATKAN PENGUASAAN DAN JADI MASTER BAHASA MELAYU! | INOVASI PdP DIGITAL OLEH CIKGU AZIZAH ISMAIL – KOLEJ VOKASIONAL WAKAF TEMBESU.';
  const NAMA_KHAS = /_|^(Aina|Siti|Haziq|Aiman|Faiz|Ahmad|Nurul|Kuala)$/;
  const S = { user: null, view: 'auth', p: {}, cub: [], ayat: [], g: null, run: null, authTab: 'masuk', busy: false };

  /* ---------- toast & modal ---------- */
  function toast(msg, jenis) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.className = 'toast show ' + (jenis || '');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.className = 'toast', 3800);
  }
  function modal(html, butang) {
    return new Promise(res => {
      const m = document.getElementById('modal');
      m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}<div class="row end gap">${butang.map((b, i) => `<button class="btn ${b[1] || ''}" data-m="${i}">${h(b[0])}</button>`).join('')}</div></div>`;
      m.classList.add('show');
      m.onclick = e => { const b = e.target.closest('[data-m]'); if (b) { m.classList.remove('show'); m.innerHTML = ''; res(+b.dataset.m); } };
      m.querySelector('[data-m]').focus();
    });
  }
  const sahkan = (msg, ya) => modal(`<p>${h(msg)}</p>`, [['Batal', 'ghost'], [ya || 'Ya, teruskan', 'primary']]).then(i => i === 1);

  function muatTurun(nama, teks, mime) {
    try {
      const blob = new Blob(['﻿' + teks], { type: mime || 'text/csv;charset=utf-8' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nama;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast('Fail "' + nama + '" sedang dimuat turun. Jika tiada fail muncul, gunakan butang Salin.', 'ok');
    } catch (e) { toast('Muat turun tidak dibenarkan di sini. Gunakan butang Salin.', 'bad'); }
  }
  async function salin(teks) {
    try { await navigator.clipboard.writeText(teks); toast('Disalin ke papan klip. Tampal ke dalam Excel atau Google Sheets.', 'ok'); }
    catch (e) { toast('Penyalinan tidak dibenarkan oleh pelayar ini.', 'bad'); }
  }
  const csv = rows => rows.map(r => r.map(v => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
  function cetak(html) {
    document.getElementById('print-area').innerHTML = html;
    try { window.print(); } catch (e) { /* abaikan */ }
    setTimeout(() => toast('Jika tetingkap cetak tidak muncul (contohnya dalam pratonton), buka aplikasi melalui pautan rasmi untuk mencetak atau menyimpan PDF.'), 800);
  }

  /* ---------- analitik ---------- */
  const A = {
    terbaik(cub, m, t) { const x = cub.filter(a => a.modul === m && a.tahap === t && ['latihan', 'cabaran', 'mingguan'].includes(a.jenis)).map(a => a.peratus); return x.length ? Math.max(...x) : null; },
    ujian(cub, j) { return cub.filter(a => a.jenis === j).sort((a, b) => a.created_at < b.created_at ? -1 : 1)[0] || null; },
    topik(cub) {
      const m = {}; cub.forEach(a => (a.butiran || []).forEach(b => { if (!b.t) return; const x = m[b.t] || (m[b.t] = { b: 0, n: 0 }); x.n++; if (b.b) x.b++; }));
      return m;
    },
    lemah(cub) { return Object.entries(A.topik(cub)).filter(([, v]) => v.n >= 3 && v.b / v.n < 0.6).sort((a, b) => a[1].b / a[1].n - b[1].b / b[1].n).map(([t, v]) => ({ t, acc: Math.round(v.b / v.n * 100), n: v.n })); },
    mata(cub, ayat) { return cub.reduce((s, a) => s + (a.mata || 0), 0) + ayat.length * 15; },
    streak(cub) {
      const hari = new Set(cub.map(a => hariKey(a.created_at))); let n = 0; const d = new Date();
      if (!hari.has(hariKey(d))) d.setDate(d.getDate() - 1);
      while (hari.has(hariKey(d))) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },
    TAHAP: [[0, 'Pemula'], [200, 'Perantis Bahasa'], [600, 'Pembina Ayat'], [1200, 'Pakar Tatabahasa'], [2000, 'Master Bahasa']],
    tahapMata(m) { let i = 0; A.TAHAP.forEach((t, k) => { if (m >= t[0]) i = k; }); const nx = A.TAHAP[i + 1]; return { nama: A.TAHAP[i][1], idx: i, min: A.TAHAP[i][0], next: nx ? nx[0] : null }; },
    minggu(d) { const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = x.getUTCDay() || 7; x.setUTCDate(x.getUTCDate() + 4 - day); const y0 = new Date(Date.UTC(x.getUTCFullYear(), 0, 1)); const w = Math.ceil(((x - y0) / 864e5 + 1) / 7); return { key: x.getUTCFullYear() + '-M' + w, w }; },
    cabaran() { const { key, w } = A.minggu(new Date()); const mods = [1, 2, 3, 5, 6]; return { key, modul: mods[w % 5], tahap: (w % 3) + 1 }; },
    lencana(cub, ayat) {
      const t = (m, k) => A.terbaik(cub, m, k) || 0, pasca = A.ujian(cub, 'pasca');
      return [
        { id: 'rookie', nama: 'Rookie Bahasa', syarat: 'Selesaikan latihan pertama anda.', ok: cub.some(a => a.jenis !== 'pra') },
        { id: 'struktur', nama: 'Pakar Struktur Ayat', syarat: 'Capai 80% dalam Modul 2 (Struktur Ayat) Tahap 2 atau 3.', ok: t(2, 2) >= 80 || t(2, 3) >= 80 },
        { id: 'detektif', nama: 'Detektif Tatabahasa', syarat: 'Capai 80% dalam Modul 5 Tahap 2 atau 3.', ok: t(5, 2) >= 80 || t(5, 3) >= 80 },
        { id: 'juara', nama: 'Juara Bina Ayat', syarat: 'Capai 80% dalam Susun Ayat Tahap 3 dan hantar 5 ayat dalam Modul 4.', ok: t(3, 3) >= 80 && ayat.length >= 5 },
        { id: 'tatabahasa', nama: 'Master Tatabahasa', syarat: 'Capai 80% dalam Tahap 3 bagi Modul 1, 2 dan 5.', ok: t(1, 3) >= 80 && t(2, 3) >= 80 && t(5, 3) >= 80 },
        { id: 'konsisten', nama: 'Konsisten 7 Hari', syarat: 'Berlatih tujuh hari berturut-turut.', ok: A.streak(cub) >= 7 },
        { id: 'master', nama: 'Master Bahasa Melayu', syarat: 'Capai 80% dalam Cabaran Master Ayat Tahap 3 dan 80 markah dalam Ujian Pasca.', ok: t(6, 3) >= 80 && pasca && pasca.markah >= 80 }
      ];
    },
    sijil(cub, ayat) {
      const pasca = A.ujian(cub, 'pasca');
      const modulOk = [1, 2, 3, 5, 6].every(m => [1, 2, 3].some(k => (A.terbaik(cub, m, k) || 0) >= 60));
      return { layak: !!(pasca && pasca.markah >= 60 && modulOk && ayat.length >= 3), pasca, modulOk, ayatOk: ayat.length >= 3 };
    },
    gred(p) { return p >= 80 ? 'Cemerlang' : p >= 65 ? 'Kepujian' : p >= 50 ? 'Lulus' : 'Perlu Bimbingan'; },
    syor(cub) { const p = A.ujian(cub, 'pra'); if (!p) return null; return p.markah >= 75 ? 3 : p.markah >= 50 ? 2 : 1; }
  };

  /* ---------- semakan automatik Bina Ayat ---------- */
  const BASAHAN = ['tak', 'nak', 'dah', 'korang', 'kitorang', 'diorang', 'je', 'jer', 'gi', 'x', 'tau', 'ni', 'tu', 'camne', 'mcm', 'sbb', 'utk', 'dgn', 'yg', 'kat', 'pastu', 'takde', 'ape', 'kene'];
  const GANDA_MANTAP = ['kanak-kanak', 'rama-rama', 'labah-labah', 'biri-biri', 'kura-kura', 'oleh-oleh', 'anai-anai', 'kupu-kupu'];
  function semakAuto(q, teks) {
    const t = teks.trim(), n = norm(t), w = n.split(' ').filter(Boolean), c = [];
    c.push({ n: 'Dimulakan dengan huruf besar', ok: /^[A-Z]/.test(t) });
    c.push({ n: 'Diakhiri dengan tanda noktah, tanda soal atau tanda seru', ok: /[.!?]$/.test(t) });
    c.push({ n: `Sekurang-kurangnya ${q.min || 4} perkataan (anda: ${w.length})`, ok: w.length >= (q.min || 4) });
    q.kata.forEach(k => {
      c.push({ n: `Menggunakan "${k.replace(/,$/, '')}"`, ok: (' ' + n + ' ').includes(' ' + norm(k) + ' ') });
      if (/,$/.test(k)) c.push({ n: `Penanda wacana "${k.replace(/,$/, '')}" diikuti tanda koma`, ok: t.toLowerCase().includes(k.toLowerCase()) });
    });
    const bs = w.filter(x => BASAHAN.includes(x));
    c.push({ n: 'Tiada bahasa basahan atau singkatan' + (bs.length ? ` (dikesan: ${bs.join(', ')})` : ''), ok: !bs.length });
    c.push({ n: 'Tiada "yang mana" atau "di mana" sebagai penghubung', ok: /\?$/.test(t) || !/\b(yang mana|di mana)\b/.test(n) });
    c.push({ n: 'Tiada kelewahan (contoh: telah sudah, sangat ... sekali, tentang mengenai)', ok: !/\b(telah sudah|sudah telah|tentang mengenai|mengenai tentang)\b/.test(n) && !/\bsangat \w+ sekali\b/.test(n) });
    const g = n.match(/\b(semua|para|banyak|setiap|beberapa|pelbagai|segala)\s+([a-z]+-[a-z]+)/);
    c.push({ n: 'Tiada kata ganda selepas kata bilangan jamak', ok: !g || GANDA_MANTAP.includes(g[2]) });
    if (q.jenis === 'pasif') c.push({ n: 'Menggunakan kata kerja pasif berawalan di-', ok: w.some(x => /^di[a-z]{3,}$/.test(x)) });
    if (q.jenis === 'pasif1') c.push({ n: 'Pasif diri pertama tanpa "oleh saya" atau "disaya"', ok: !/\b(oleh saya|disaya|oleh kami|dikami)\b/.test(n) });
    if (q.jenis === 'pasif2') c.push({ n: 'Pasif diri kedua tanpa "oleh kamu" atau "dikamu"', ok: !/\b(oleh kamu|dikamu|oleh anda|dianda)\b/.test(n) });
    c.push({ n: 'Jarak dan tanda baca kemas (tiada ruang berganda atau ruang sebelum tanda baca)', ok: !/\s{2,}|\s[.,!?]/.test(t) });
    const tanda = (c[0].ok ? 4 : 0) + (c[1].ok ? 4 : 0) + (c[c.length - 1].ok ? 2 : 0);
    return { checks: c, lulus: c.filter(x => x.ok).length, jumlah: c.length, tanda };
  }

  /* ---------- ikon SVG ---------- */
  const IKON = {
    automotif: '<path d="M8 30l4-10h24l4 10v8H8z" fill="var(--royal)"/><circle cx="15" cy="38" r="4" fill="var(--navy)"/><circle cx="33" cy="38" r="4" fill="var(--navy)"/><path d="M14 20l3-6h14l3 6" fill="none" stroke="var(--gold)" stroke-width="2.5"/>',
    bakeri: '<path d="M8 28c0-8 7-13 16-13s16 5 16 13v10H8z" fill="var(--gold)"/><path d="M15 22c2 3 2 7 0 10M24 20c2 4 2 9 0 12M33 22c-2 3-2 7 0 10" stroke="var(--navy)" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="6" y="37" width="36" height="4" rx="2" fill="var(--navy)"/>',
    perakaunan: '<rect x="11" y="6" width="26" height="36" rx="4" fill="var(--navy)"/><rect x="15" y="10" width="18" height="8" rx="1.5" fill="var(--gold)"/><g fill="var(--royal-l)"><rect x="15" y="22" width="5" height="4" rx="1"/><rect x="21.5" y="22" width="5" height="4" rx="1"/><rect x="28" y="22" width="5" height="4" rx="1"/><rect x="15" y="29" width="5" height="4" rx="1"/><rect x="21.5" y="29" width="5" height="4" rx="1"/><rect x="28" y="29" width="5" height="11" rx="1" fill="var(--gold)"/><rect x="15" y="36" width="11.5" height="4" rx="1"/></g>',
    elektrik: '<circle cx="24" cy="24" r="17" fill="var(--navy)"/><path d="M27 8L14 27h9l-3 13 13-20h-9z" fill="var(--gold)"/>',
    teknologi: '<rect x="8" y="10" width="32" height="21" rx="3" fill="var(--navy)"/><rect x="11" y="13" width="26" height="15" rx="1.5" fill="var(--royal)"/><path d="M16 20l4 3-4 3M23 26h7" stroke="var(--gold)" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M4 34h40l-3 4H7z" fill="var(--navy)"/>',
    umum: '<rect x="10" y="8" width="28" height="34" rx="3" fill="var(--navy)"/><rect x="18" y="5" width="12" height="7" rx="2" fill="var(--gold)"/><path d="M15 20h18M15 26h18M15 32h11" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>'
  };
  const ikon = (k, s) => `<svg viewBox="0 0 48 48" width="${s || 48}" height="${s || 48}" aria-hidden="true">${IKON[k] || IKON.umum}</svg>`;
  const MOD_IKON = { 1: 'umum', 2: 'teknologi', 3: 'perakaunan', 4: 'bakeri', 5: 'elektrik', 6: 'automotif' };
  const logo = s => `<svg viewBox="0 0 64 64" width="${s}" height="${s}" aria-hidden="true"><rect x="4" y="40" width="26" height="16" rx="3" fill="var(--royal)"/><rect x="34" y="40" width="26" height="16" rx="3" fill="#fff"/><rect x="12" y="22" width="26" height="16" rx="3" fill="var(--gold)"/><rect x="24" y="4" width="26" height="16" rx="3" fill="var(--royal-l)"/><path d="M40 12l3 3 6-6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const lencanaSVG = (ok, huruf) => `<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><path d="M20 38l-6 20 10-5 6 8 4-18zM44 38l6 20-10-5-6 8-4-18z" fill="${ok ? 'var(--royal)' : 'var(--line)'}"/><circle cx="32" cy="28" r="20" fill="${ok ? 'var(--gold)' : 'var(--line)'}"/><circle cx="32" cy="28" r="15" fill="none" stroke="${ok ? '#fff' : 'var(--muted)'}" stroke-width="2" opacity=".7"/><text x="32" y="34" text-anchor="middle" font-size="16" font-weight="800" fill="${ok ? 'var(--navy)' : 'var(--muted)'}">${h(huruf)}</text></svg>`;

  /* ---------- navigasi ---------- */
  function go(view, p) { S.view = view; S.p = p || {}; if (!view.startsWith('run')) S.run = null; render(); window.scrollTo(0, 0); }
  const NAV_P = [['utama', 'Utama'], ['modul', 'Modul'], ['ujian', 'Ujian Pra & Pasca'], ['pencapaian', 'Pencapaian'], ['panduan', 'Panduan']];
  const NAV_G = [['g-ringkasan', 'Ringkasan'], ['g-pelajar', 'Pelajar'], ['g-analisis', 'Analisis'], ['g-semakan', 'Semakan Ayat'], ['g-kod', 'Kod Akses'], ['g-penggunaan', 'Rekod Penggunaan'], ['g-laporan', 'Laporan'], ['panduan', 'Panduan']];

  function jalurKuning() {
    const teks = C.JALUR_TEKS || 'BELAJAR TATABAHASA DENGAN SERONOK • FAHAM • SUSUN • BINA • SEMAK';
    return `<div class="demo-strip">${h(teks)}${Store.mode === 'demo' ? '<span class="demo-tag">Mod Demo: data disimpan dalam pelayar ini sahaja</span>' : ''}</div>`;
  }
  function shell(isi) {
    const guru = S.user.peranan === 'guru', nav = guru ? NAV_G : NAV_P;
    const aktif = v => S.view === v || (v === 'modul' && /^(modulDetail|run|bina)/.test(S.view)) || (v === 'g-pelajar' && S.view === 'g-pelajarDetail');
    const menunggu = guru && S.g ? S.g.ayat.filter(a => a.status === 'menunggu').length : 0;
    return `${jalurKuning()}
    <header class="top"><div class="top-in">
      <a class="brand" href="#" data-act="nav" data-v="${guru ? 'g-ringkasan' : 'utama'}"><img class="brand-img" src="assets/logo-bina-ayat.png" alt="BINA AYAT PRO DIGITAL – Faham, Susun, Bina, Semak" width="260" height="54"></a>
      <div class="who"><span class="who-n">${h(S.user.nama)}</span><span class="who-r">${guru ? 'Guru' : 'Semester ' + h(S.user.semester || '–')}</span><button class="btn sm ghost-inv" data-act="keluar">Log keluar</button></div>
    </div><nav class="nav scroll" aria-label="Navigasi utama">${nav.map(([v, l]) => `<a href="#" class="${aktif(v) ? 'on' : ''}" data-act="nav" data-v="${v}">${l}${v === 'g-semakan' && menunggu ? ` <span class="pill">${menunggu}</span>` : ''}</a>`).join('')}</nav></header>
    ${V3.marquee(PENGUMUMAN)}
    <main class="main">${isi}</main>
    <footer class="foot">BINA AYAT PRO DIGITAL · Inovasi ${h(C.PEMILIK_INOVASI)} · ${h(C.NAMA_INSTITUSI)}</footer>`;
  }

  function aturLatar() {
    const bg = document.getElementById('bg');
    if (bg && !bg.dataset.siap) { bg.innerHTML = '<div class="bg-img"></div><div class="bg-ov"></div>'; bg.dataset.siap = '1'; }
    let m = 'app';
    if (!S.user) m = 'hero';
    else if (S.user.peranan === 'guru') m = 'formal';
    else if (/^(run|padanan)$/.test(S.view) || (S.view === 'bina' && S.p.q != null)) m = 'minimal';
    document.body.dataset.bg = m;
  }
  async function render() {
    aturLatar();
    if (!S.user) { app.innerHTML = vAuth(); return; }
    const guru = S.user.peranan === 'guru';
    if (guru && S.view.startsWith('g-') && !S.g) { app.innerHTML = shell('<div class="loading">Memuatkan data kelas…</div>'); await muatGuru(); }
    const V = { utama: vUtama, modul: vModul, modulDetail: vModulDetail, run: vRun, bina: vBina, ujian: vUjian, pencapaian: vPencapaian, sijil: vSijil, panduan: vPanduan, padanan: () => S.run && S.run.padanan ? vPadanan() : vModul(), 'g-ringkasan': gRingkasan, 'g-pelajar': gPelajar, 'g-pelajarDetail': gPelajarDetail, 'g-analisis': gAnalisis, 'g-semakan': gSemakan, 'g-kod': gKod, 'g-laporan': gLaporan, 'g-penggunaan': gPenggunaan };
    const fn = V[S.view] || (guru ? gRingkasan : vUtama);
    app.innerHTML = shell(fn());
    pasca();
  }
  function pasca() {
    document.querySelectorAll('[data-line]').forEach(lukisGaris); if (S.run && S.run.masa) mulaPemasa();
    if (S.reward) { V3.ganjaran(document.querySelector('.q-card'), S.reward); S.reward = null; }
  }

  /* ---------- AUTH ---------- */
  function vAuth() {
    const tab = S.authTab;
    const demo = Store.mode === 'demo';
    const borang = tab === 'masuk' ? `
      <form data-form="masuk" class="form">
        <label>No. Matrik (pelajar) atau E-mel (guru)<input name="id" required autocomplete="username" placeholder="Contoh: KVWT24001"></label>
        <label>Kata laluan<input name="pw" type="password" required autocomplete="current-password"></label>
        <button class="btn primary block">Log Masuk</button>
      </form>` : tab === 'pelajar' ? `
      <form data-form="daftar-pelajar" class="form">
        <label>Nama penuh<input name="nama" required maxlength="80"></label>
        <div class="grid2"><label>No. Matrik<input name="matrik" required maxlength="20" placeholder="KVWT24001"></label>
        <label>Semester<select name="sem" required><option value="1">Semester 1</option><option value="2">Semester 2</option><option value="3">Semester 3</option><option value="4">Semester 4</option></select></label></div>
        <label>Kod akses kelas<input name="kod" required maxlength="30" placeholder="Diberikan oleh guru"></label>
        <div class="grid2"><label>Kata laluan<input name="pw" type="password" minlength="6" required autocomplete="new-password"></label>
        <label>Sahkan kata laluan<input name="pw2" type="password" minlength="6" required autocomplete="new-password"></label></div>
        <button class="btn primary block">Daftar Akaun Pelajar</button>
      </form>` : `
      <form data-form="daftar-guru" class="form">
        <label>Nama penuh<input name="nama" required maxlength="80"></label>
        <label>E-mel<input name="email" type="email" required autocomplete="email"></label>
        <label>Kod pendaftaran guru<input name="kod" required maxlength="30"></label>
        <div class="grid2"><label>Kata laluan<input name="pw" type="password" minlength="6" required autocomplete="new-password"></label>
        <label>Sahkan kata laluan<input name="pw2" type="password" minlength="6" required autocomplete="new-password"></label></div>
        <button class="btn primary block">Daftar Akaun Guru</button>
      </form>`;
    return `${jalurKuning()}
    <header class="top land-top"><div class="top-in">
      <a class="brand" href="#" data-act="lompat-ke" data-ke="atas"><img class="brand-img" src="assets/logo-bina-ayat.png" alt="BINA AYAT PRO DIGITAL – Faham, Susun, Bina, Semak" width="260" height="54"></a>
      <div class="row gap"><button class="btn sm ghost-inv" data-act="lompat-ke" data-ke="kenali">Kenali Aplikasi</button><button class="btn sm gold" data-act="lompat-ke" data-ke="akses" data-tab="masuk">Log Masuk</button></div>
    </div></header>
    ${V3.marquee(PENGUMUMAN)}
    <section class="hero" id="atas"><div class="hero-in">
      <div class="hero-txt">
        <p class="hero-chip">Inovasi PdP Digital · Bahasa Melayu SVM</p>
        <h1 class="hero-title">BINA AYAT<span>PRO DIGITAL</span></h1>
        <p class="hero-slogan">FAHAM <i>•</i> SUSUN <i>•</i> BINA <i>•</i> SEMAK</p>
        <p class="hero-tag">Mahir Tatabahasa, Cekap Membina Ayat.</p>
        <p class="lead">Platform pembelajaran tatabahasa dan pembinaan ayat gramatis untuk pelajar Sijil Vokasional Malaysia, Semester 1 hingga Semester 4.</p>
        <div class="row gap wrap-r"><button class="btn xl gold" data-act="lompat-ke" data-ke="akses" data-tab="pelajar">MULA BELAJAR</button><button class="btn xl glass" data-act="lompat-ke" data-ke="kenali">KENALI APLIKASI</button></div>
        <p class="credit">Inovasi oleh <b>${h(C.PEMILIK_INOVASI)}</b> · ${h(C.NAMA_INSTITUSI)}</p>
      </div>
      <div class="hero-pic">${V3.heroPelajar()}</div>
    </div></section>
    <section class="land-sec" id="kenali"><div class="wrap stack-l">
      <div class="sec-title"><p class="hero-chip dark">Kenali Aplikasi</p><h2>Enam modul, tiga tahap, satu matlamat: ayat yang gramatis</h2><p class="muted">Setiap modul mempunyai nota ringkas, contoh, sekurang-kurangnya 20 soalan bagi setiap tahap, jawapan dan penerangan, rekod markah serta maklum balas automatik.</p></div>
      <div class="grid-mod">${[1, 2, 3, 4, 5, 6].map(m => kadModul(m, true)).join('')}</div>
      <div class="sec-title"><h2>Tiga Tahap Pembelajaran</h2></div>
      <div class="grid-tahap">${[1, 2, 3].map(t => kadTahap(t)).join('')}</div>
      <div class="grid-ciri">${[['Ujian pra dan pasca', 'Dua set ujian setara (100 markah) untuk mengukur peningkatan sebenar.'], ['Pembelajaran pintar', 'Sistem merekod kesilapan, mengesan topik lemah dan mencadangkan latihan pemulihan.'], ['Gamifikasi', 'Mata ganjaran, lencana digital, streak, cabaran mingguan dan sijil digital.'], ['Dashboard guru', 'Analisis kelemahan tatabahasa, perbandingan pra dan pasca, serta laporan CSV dan PDF.']].map(([a, b], i) => `<div class="card ciri"><span class="ciri-n">${i + 1}</span><h3>${a}</h3><p class="muted small">${b}</p></div>`).join('')}</div>
    </div></section>
    <section class="land-sec akses" id="akses"><div class="wrap akses-in">
      <div class="akses-txt"><h2>Mula sekarang</h2><p>Pelajar mendaftar menggunakan nama, nombor matrik, semester dan kod akses kelas yang diberikan oleh guru. Untuk log masuk seterusnya, gunakan nombor matrik dan kata laluan.</p>
        ${demo ? `<div class="hint"><b>Untuk mencuba (mod demo):</b><br>Guru: <code>guru@demo.my</code> / <code>guru123</code><br>Kod akses pelajar: <code>SVM1-DEMO</code> atau <code>SVM2-DEMO</code><br>Kod pendaftaran guru: <code>GURU-DEMO</code></div>` : ''}</div>
      <div class="auth-card card">
        <div class="tabs" role="tablist">${[['masuk', 'Log Masuk'], ['pelajar', 'Daftar Pelajar'], ['guru', 'Daftar Guru']].map(([k, l]) => `<button role="tab" class="${tab === k ? 'on' : ''}" data-act="authtab" data-t="${k}">${l}</button>`).join('')}</div>
        ${borang}
      </div>
    </div></section>
    <footer class="foot">BINA AYAT PRO DIGITAL · Inovasi ${h(C.PEMILIK_INOVASI)} · ${h(C.NAMA_INSTITUSI)}</footer>`;
  }
  function kadTahap(t, opt) {
    const T = V3.TAHAP[t]; opt = opt || {};
    const isi = `<div class="th-ic">${V3.ikonTahap(t)}</div><div><p class="th-n">Tahap ${t}</p><h3>${h(T.nama.replace('Tahap ', ''))}</h3><p class="th-l">${h(T.label)}</p>${opt.extra || ''}</div>`;
    return opt.btn ? `<button class="tahap ${T.kelas} ${opt.on ? 'on' : ''}" data-act="nav" data-v="modulDetail" data-m="${opt.m}" data-t="${t}" aria-pressed="${!!opt.on}">${isi}</button>` : `<div class="tahap ${T.kelas}">${isi}</div>`;
  }

  /* ---------- PELAJAR: UTAMA ---------- */
  function vUtama() {
    const cub = S.cub, ay = S.ayat, mata = A.mata(cub, ay), tm = A.tahapMata(mata), st = A.streak(cub), lc = A.lencana(cub, ay), syor = A.syor(cub);
    const cab = A.cabaran(), cabSiap = cub.some(a => a.jenis === 'mingguan' && a.minggu === cab.key && a.peratus >= 70);
    const lemah = A.lemah(cub);
    const prog = tm.next ? Math.round((mata - tm.min) / (tm.next - tm.min) * 100) : 100;
    const siri = cub.filter(a => a.jenis !== 'padanan').slice(-15);
    return `
    <section class="band hero-band"><div class="wrap">
      <div class="hb-grid">
        <div><p class="eyebrow-s">Selamat datang</p><h1>${h(S.user.nama)}</h1>
          <p class="sub">Semester ${h(S.user.semester || '–')}${S.user.kelas ? ' · ' + h(S.user.kelas) : ''} · No. Matrik ${h(S.user.no_matrik || '–')}</p>
          ${syor ? `<p class="syor">Tahap disyorkan berdasarkan Ujian Pra: <b>Tahap ${syor} – ${TAHAP_NAMA[syor]}</b></p>` : `<p class="syor">Mulakan dengan <b>Ujian Pra</b> untuk mengetahui tahap penguasaan anda. <button class="btn sm gold" data-act="nav" data-v="ujian">Ambil Ujian Pra</button></p>`}
        </div>
        <div class="lvl"><div class="lvl-top"><span>${h(tm.nama)}</span><b>${mata} mata</b></div><div class="meter gold-m"><i style="width:${prog}%"></i></div>
          <small>${tm.next ? (tm.next - mata) + ' mata lagi ke tahap seterusnya' : 'Tahap tertinggi dicapai'}</small>
          <div class="mini-stats"><div><b>${cub.filter(a => !['pra', 'pasca'].includes(a.jenis)).length}</b><span>latihan selesai</span></div><div><b>${st}</b><span>hari berturut-turut</span></div><div><b>${lc.filter(l => l.ok).length}/${lc.length}</b><span>lencana</span></div></div>
        </div>
      </div>
    </div></section>
    <div class="wrap stack-l">
      ${kadCadangan()}
      <section class="card"><div class="sec-h"><h3>Lencana pencapaian</h3><a href="#" data-act="nav" data-v="pencapaian">Lihat semua</a></div>
        <div class="badge-row">${lc.map(l => `<div class="bmini ${l.ok ? 'got' : ''}" title="${h(l.nama)}: ${h(l.syarat)}">${lencanaSVG(l.ok, l.nama.split(' ').map(x => x[0]).join('').slice(0, 2))}<span>${h(l.nama)}</span></div>`).join('')}</div></section>
      <section class="card cabaran ${cabSiap ? 'siap' : ''}"><div><p class="tag">Cabaran Mingguan</p><h3>${MOD_NAMA[cab.modul]} · Tahap ${cab.tahap} (${TAHAP_NAMA[cab.tahap]})</h3><p class="muted">Capai sekurang-kurangnya 70% untuk mendapat 50 mata bonus. Cabaran bertukar setiap minggu.</p></div>
        ${cabSiap ? '<span class="badge-ok">Selesai minggu ini</span>' : `<button class="btn gold" data-act="mula" data-m="${cab.modul}" data-t="${cab.tahap}" data-j="mingguan">Sahut cabaran</button>`}</section>
      <section><div class="sec-h"><h2>Kemajuan modul</h2><a href="#" data-act="nav" data-v="modul">Lihat semua modul</a></div>
        <div class="grid-mod">${[1, 2, 3, 4, 5, 6].map(m => kadModul(m)).join('')}</div></section>
      <div class="grid2 top-al">
        <section class="card"><h3>Topik yang perlu dikuasai</h3>
          ${lemah.length ? `<ul class="weak">${lemah.slice(0, 6).map(x => `<li><span>${h(B.topik[x.t] || x.t)}</span><span class="meter sm bad-m"><i style="width:${x.acc}%"></i></span><b>${x.acc}%</b></li>`).join('')}</ul>
          <button class="btn primary" data-act="pemulihan">Mulakan latihan pemulihan</button>` : `<p class="muted">${cub.length ? 'Tiada topik lemah dikesan setakat ini. Teruskan berlatih!' : 'Sistem akan mengenal pasti topik lemah selepas anda menjawab beberapa latihan.'}</p>`}
        </section>
        <section class="card"><h3>Carta kemajuan</h3>
          ${siri.length >= 2 ? `<div class="fig" data-line='${JSON.stringify(siri.map(a => a.peratus))}'></div><p class="muted small">Peratus markah bagi ${siri.length} aktiviti terkini.</p>` : '<p class="muted">Carta akan dipaparkan selepas anda melengkapkan sekurang-kurangnya dua aktiviti.</p>'}
        </section>
      </div>
    </div>`;
  }
  function cadangan() {
    const cub = S.cub;
    if (!A.ujian(cub, 'pra')) return { tajuk: 'Duduki Ujian Pra', sebab: 'Ujian pra menentukan tahap yang paling sesuai untuk anda.', act: 'data-act="nav" data-v="ujian"', btn: 'Pergi ke Ujian Pra' };
    const lemah = A.lemah(cub);
    const mula = A.syor(cub) || 1;
    for (let t = mula; t <= 3; t++) for (const m of [1, 2, 3, 5]) {
      const b = A.terbaik(cub, m, t);
      if (b == null || b < 70) return { tajuk: `Modul ${m}: ${MOD_NAMA[m]} · Tahap ${t} (${TAHAP_NAMA[t]})`, sebab: b == null ? 'Anda belum mencuba latihan ini.' : `Markah terbaik anda ${b}%. Sasarkan sekurang-kurangnya 70%.`, act: `data-act="nav" data-v="modulDetail" data-m="${m}" data-t="${t}"`, btn: 'Mula latihan', m, lemah };
    }
    if ((A.terbaik(cub, 6, 3) || 0) < 80) return { tajuk: 'Cabaran Master Ayat · Tahap 3', sebab: 'Anda telah menguasai modul latihan. Uji penguasaan keseluruhan anda.', act: 'data-act="nav" data-v="modulDetail" data-m="6" data-t="3"', btn: 'Sahut cabaran', m: 6, lemah };
    if (!A.ujian(cub, 'pasca')) return { tajuk: 'Duduki Ujian Pasca', sebab: 'Lihat sejauh mana penguasaan anda meningkat.', act: 'data-act="nav" data-v="ujian"', btn: 'Pergi ke Ujian Pasca' };
    return { tajuk: 'Teruskan Bina Ayat (Modul 4)', sebab: 'Hantar lebih banyak ayat untuk dinilai oleh guru.', act: 'data-act="nav" data-v="bina" data-t="3"', btn: 'Bina ayat', m: 4, lemah };
  }
  function kadCadangan() {
    const c = cadangan(), W = c.m ? V3.MODUL[c.m] : V3.MODUL[1];
    return `<section class="cadangan" style="--c1:${W.c1};--c2:${W.c2}"><div class="cad-ic">${c.m ? V3.ikonModul(c.m) : V3.ikonTahap(1)}</div>
      <div><p class="cad-k">Cadangan latihan seterusnya</p><h3>${h(c.tajuk)}</h3><p>${h(c.sebab)}</p></div>
      <div class="cad-b"><button class="btn gold" ${c.act}>${h(c.btn)}</button>${c.lemah && c.lemah.length ? '<button class="btn glass" data-act="pemulihan">Latihan pemulihan</button>' : ''}</div></section>`;
  }
  function kadModul(m, awam) {
    const mod = B.modul[m], W = V3.MODUL[m];
    const chips = awam ? '' : `<div class="tps">${[1, 2, 3].map(t => {
      if (m === 4) { const n = new Set(S.ayat.filter(a => a.tahap === t).map(a => a.soalan_id)).size; return `<div class="tp"><span>${TAHAP_NAMA[t]}</span><span class="meter sm"><i style="width:${n * 5}%"></i></span><b>${n}/20</b></div>`; }
      const p = A.terbaik(S.cub, m, t);
      return `<div class="tp"><span>${TAHAP_NAMA[t]}</span><span class="meter sm"><i style="width:${p || 0}%"></i></span><b>${p == null ? '–' : p + '%'}</b></div>`;
    }).join('')}</div>`;
    const btn = awam ? `<button class="btn mod-btn" data-act="lompat-ke" data-ke="akses" data-tab="pelajar">MASUK MODUL</button>` : `<button class="btn mod-btn" data-act="nav" data-v="modulDetail" data-m="${m}">MASUK MODUL</button>`;
    return `<article class="mod3d m${m}" style="--c1:${W.c1};--c2:${W.c2}"><div class="mod-top ${W.gelap ? 'gelap' : ''}"><span class="mod-no">MODUL ${m}</span>${V3.ikonModul(m)}</div>
      <div class="mod-body"><h3>${h(mod.nama)}</h3><p class="muted small">${h(mod.ringkas)}</p>${chips}${btn}</div></article>`;
  }

  /* ---------- MODUL ---------- */
  function vModul() {
    return `<div class="wrap stack-l"><div class="page-h"><h1>Enam Modul Utama</h1><p class="muted">Setiap modul mempunyai tiga tahap: Asas, Pertengahan dan Mahir. Setiap tahap mengandungi nota, contoh dan sekurang-kurangnya 20 soalan.</p></div>
    <div class="grid-mod">${[1, 2, 3, 4, 5, 6].map(m => kadModul(m)).join('')}</div>
    <div class="sec-title"><h2>Tiga Tahap Pembelajaran</h2><p class="muted">Pilih tahap di dalam setiap modul. Tahap yang disyorkan bergantung pada markah Ujian Pra anda.</p></div>
    <div class="grid-tahap">${[1, 2, 3].map(t => kadTahap(t, { extra: A.syor(S.cub) === t ? '<span class="badge-ok sm">Disyorkan untuk anda</span>' : '' })).join('')}</div></div>`;
  }
  function vModulDetail() {
    const m = +S.p.m, t = +(S.p.t || A.syor(S.cub) || 1), mod = B.modul[m], th = mod.tahap[t];
    const cubT = S.cub.filter(a => a.modul === m && a.tahap === t).slice(-6).reverse();
    let aksi;
    if (m === 4) {
      const s = S.ayat.filter(a => a.tahap === t);
      aksi = `<button class="btn primary" data-act="nav" data-v="bina" data-m="4" data-t="${t}">Buka ${th.soalan.length} tugasan bina ayat</button><p class="muted small">${s.length} ayat telah dihantar · ${s.filter(x => x.status === 'disemak').length} telah disemak guru</p>`;
    } else if (m === 6) {
      aksi = `<button class="btn primary" data-act="mula" data-m="6" data-t="${t}" data-j="cabaran">Mulakan cabaran (20 soalan · 15 minit)</button>`;
    } else {
      aksi = `<button class="btn primary" data-act="mula" data-m="${m}" data-t="${t}" data-n="10">Latihan pantas (10 soalan)</button><button class="btn ghost" data-act="mula" data-m="${m}" data-t="${t}" data-n="99">Latihan penuh (${th.soalan.length} soalan)</button>${m === 1 ? `<button class="btn gold" data-act="padanan" data-t="${t}">Permainan padanan</button>` : ''}`;
    }
    const best = m === 4 ? null : A.terbaik(S.cub, m, t);
    return `<div class="wrap stack-l">
      <a href="#" class="back" data-act="nav" data-v="modul">← Semua modul</a>
      <div class="mod-hero" style="--c1:${V3.MODUL[m].c1};--c2:${V3.MODUL[m].c2}"><div class="mod-hero-ic">${V3.ikonModul(m)}</div><div><p class="mod-no">MODUL ${m}</p><h1>${h(mod.nama)}</h1><p>${h(mod.ringkas)}</p></div></div>
      <div class="grid-tahap pilih" role="group" aria-label="Pilih tahap">${[1, 2, 3].map(k => kadTahap(k, { btn: true, on: k === t, m })).join('')}</div>
      <div class="grid-nota">
        <section class="card"><h2>Nota ringkas</h2>${th.nota.map(([a, b]) => `<div class="nota"><h4>${h(a)}</h4><p>${h(b)}</p></div>`).join('')}</section>
        <aside class="stack">
          <section class="card"><h2>Contoh</h2>${th.contoh.map(([a, b]) => `<div class="contoh"><p class="ayat-c">${h(a)}</p><p class="muted small">${h(b)}</p></div>`).join('')}</section>
          <section class="card act-card"><h2>Latihan interaktif</h2>${best != null ? `<p>Markah terbaik: <b>${best}%</b> (${A.gred(best)})</p>` : ''}<div class="stack-s">${aksi}</div></section>
          ${cubT.length ? `<section class="card"><h3>Rekod markah</h3><table class="tbl"><tbody>${cubT.map(a => `<tr><td>${masa(a.created_at)}</td><td>${h(labelJenis(a.jenis))}</td><td class="num">${a.peratus}%</td></tr>`).join('')}</tbody></table></section>` : ''}
        </aside>
      </div></div>`;
  }
  const labelJenis = j => ({ latihan: 'Latihan', cabaran: 'Cabaran', mingguan: 'Cabaran mingguan', padanan: 'Padanan', pemulihan: 'Pemulihan', pra: 'Ujian pra', pasca: 'Ujian pasca' }[j] || j);

  /* ---------- RUNNER LATIHAN ---------- */
  function sediakan(q) {
    const it = Object.assign({}, q, { jaw: null, b: null, step: 0 });
    if (q.k === 'p' || q.k === 'd') it.ord = shuffle(q.p.map((_, i) => i));
    if (q.k === 's') { it.b0 = q.b; it.b = null; }
    if (q.k === 'u') { it.w = q.w.map((x, i) => i === 0 && !NAMA_KHAS.test(x) ? x.charAt(0).toLowerCase() + x.slice(1) : x); let o; do { o = shuffle(q.w.map((_, i) => i)); } while (q.w.length > 2 && o.every((v, i) => v === i)); it.bank = o; it.ans = []; }
    return it;
  }
  function mulaRun(o) {
    S.run = Object.assign({ i: 0, mula: Date.now(), selesai: false }, o, { items: o.items.map(sediakan) });
    if (S.run.masa) S.run.tamat = Date.now() + S.run.masa * 60000;
    go('run', {});
  }
  function vRun() {
    const r = S.run; if (!r) return vUtama();
    if (r.selesai) return vKeputusan();
    const it = r.items[r.i], n = r.items.length;
    const nav = !r.segera ? `<div class="qnav">${r.items.map((x, k) => `<button class="${k === r.i ? 'on' : ''} ${x.jaw != null ? 'done' : ''}" data-act="lompat" data-i="${k}" aria-label="Soalan ${k + 1}">${k + 1}</button>`).join('')}</div>` : '';
    return `<div class="wrap narrow stack-l run">
      <div class="run-h"><div><p class="tag">${h(r.label)}</p><h2>${h(r.judul)}</h2></div>${r.masa ? '<div class="timer" id="timer">--:--</div>' : ''}<button class="btn sm ghost" data-act="tamat-awal">Keluar</button></div>
      <div class="meter"><i style="width:${Math.round(r.i / n * 100)}%"></i></div><p class="muted small">Soalan ${r.i + 1} daripada ${n}</p>
      <section class="card q-card">${renderItem(it, r)}</section>${nav}</div>`;
  }
  function renderItem(it, r) {
    const fb = it.b != null && r.segera ? `<div class="fb ${it.b ? 'ok' : 'bad'}"><b>${it.b ? 'Tepat!' : 'Kurang tepat.'}</b> ${h(it.e)}</div>` : '';
    const lanjut = (r.segera && it.b != null) || (!r.segera) ? `<div class="row end gap">${!r.segera && r.i > 0 ? '<button class="btn ghost" data-act="sebelum">Sebelumnya</button>' : ''}${r.i < r.items.length - 1 ? `<button class="btn primary" data-act="seterusnya" ${!r.segera ? '' : ''}>Seterusnya</button>` : `<button class="btn gold" data-act="hantar-run">${r.segera ? 'Lihat keputusan' : 'Hantar jawapan'}</button>`}</div>` : '';
    if (it.k === 'p') {
      const kunci = r.segera && it.b != null, pilihan = r.segera ? it.pil : it.jaw;
      const semak = r.segera && !kunci ? `<div class="row end"><button class="btn xl semak-btn" data-act="psemak" ${pilihan == null ? 'disabled' : ''}>Semak Jawapan</button></div>` : '';
      return `<p class="q-text">${fmtS(it.s)}</p><div class="opts">${it.ord.map((oi, k) => {
        let c = ''; if (kunci) { if (oi === it.j) c = 'ok'; else if (oi === it.jaw) c = 'bad'; } else if (oi === pilihan) c = 'sel';
        return `<button class="opt ${c}" data-act="pilih" data-o="${oi}" ${kunci ? 'disabled' : ''}><span class="ol">${'ABCD'[k] || k + 1}</span>${fmtS(it.p[oi])}</button>`;
      }).join('')}</div>${semak}${fb}${lanjut}`;
    }
    if (it.k === 's') {
      const kunci = it.b != null;
      let html = '<div class="sentence">';
      it.w.forEach((w, k) => {
        if (k > 0) { let c = ''; if (kunci) { if (k === it.b0) c = 'ok'; else if (k === it.jaw) c = 'bad'; } html += `<button class="sgap ${c}" data-act="gap" data-g="${k}" ${kunci ? 'disabled' : ''} aria-label="Sempadan sebelum ${h(w)}">|</button>`; }
        const sub = kunci ? (k < it.b0 ? 'subj' : 'pred') : '';
        html += `<span class="w ${sub}">${h(w)}</span>`;
      });
      html += '</div>';
      return `<p class="q-text">${h(it.s)}</p>${html}${kunci ? '<p class="legend"><span class="subj">Subjek</span> <span class="pred">Predikat</span></p>' : ''}${fb}${lanjut}`;
    }
    if (it.k === 'd') {
      const kata = it.w.map((w, k) => {
        let c = ''; if (it.step >= 1 && k === it.x) c = 'target'; if (it.jawKata != null && it.jawKata !== it.x && k === it.jawKata) c = 'bad';
        return `<button class="wtok ${c}" data-act="dkata" data-i="${k}" ${it.step > 0 || it.b != null ? 'disabled' : ''}>${h(tok(w))}</button>`;
      }).join(' ');
      let bawah = '';
      if (it.step === 0 && it.b == null) bawah = '<p class="muted">Langkah 1: Ketik perkataan yang salah.</p>';
      if (it.step === 1 && it.b == null) bawah = `<p class="muted">Langkah 2: Pilih pembetulan bagi <b>"${h(tok(it.w[it.x]))}"</b>.</p><div class="opts">${it.ord.map(oi => `<button class="opt" data-act="dbetul" data-o="${oi}">${h(it.p[oi])}</button>`).join('')}</div>`;
      if (it.b != null) { const bt = it.w.slice(); bt[it.x] = it.p[it.j]; bawah = `<p class="betul-ayat">Ayat yang betul: <b>${h(ayatDari(bt).replace(/\.\.$/, '.'))}</b></p>`; }
      return `<p class="q-text">Kesan kesalahan dalam ayat di bawah.</p><div class="sentence det">${kata}</div>${bawah}${fb}${lanjut}`;
    }
    if (it.k === 'u') {
      const kunci = it.b != null;
      const chip = (wi, z, pos) => `<button class="chip" draggable="${!kunci}" data-act="${z === 'bank' ? 'smasuk' : 'skeluar'}" data-wi="${wi}" data-pos="${pos}" data-z="${z}" ${kunci ? 'disabled' : ''}>${h(tok(it.w[wi]))}</button>`;
      return `<p class="q-text">Susun perkataan berikut menjadi ayat yang gramatis.</p>
        <div class="zone ans ${kunci ? (it.b ? 'ok' : 'bad') : ''}" data-z="ans">${it.ans.length ? it.ans.map((wi, p) => chip(wi, 'ans', p)).join('') : '<span class="ph">Ketik atau seret perkataan ke sini</span>'}</div>
        <div class="zone bank" data-z="bank">${it.bank.map((wi, p) => chip(wi, 'bank', p)).join('')}</div>
        ${kunci ? `<p class="betul-ayat">Jawapan: <b>${h(ayatDari(it.w))}</b></p>` : `<div class="row end gap"><button class="btn ghost" data-act="sreset">Set semula</button><button class="btn primary" data-act="ssemak" ${it.bank.length ? 'disabled' : ''}>Semak susunan</button></div>`}
        ${fb}${kunci ? lanjut : ''}`;
    }
    return '';
  }
  function tandaJawapan(it, val) {
    const r = S.run;
    if (it.k === 'p') { it.jaw = val; it.b = val === it.j; }
    beriGanjaran(it); render();
  }
  const PUJIAN = ['Tepat!', 'Hebat!', 'Syabas!', 'Bagus!', 'Cemerlang!'];
  function beriGanjaran(it) { if (S.run && S.run.segera && it.b) S.reward = PUJIAN[Math.floor(Math.random() * PUJIAN.length)] + ' +10'; }
  function semakSusun(it) {
    const j = norm(it.ans.map(i => tok(it.w[i])).join(' '));
    const sah = [it.w, ...(it.alt || [])].map(a => norm(a.map(tok).join(' ')));
    it.jaw = j; it.b = sah.includes(j); beriGanjaran(it); render();
  }
  async function selesaiRun() {
    const r = S.run; if (!r || r.selesai) return;
    r.items.forEach(it => { if (it.b == null) it.b = false; });
    r.selesai = true; clearInterval(S.timer);
    const betul = r.items.filter(i => i.b).length, n = r.items.length;
    const peratus = Math.round(betul / n * 100);
    const ujian = r.jenis === 'pra' || r.jenis === 'pasca';
    const markah = ujian ? betul * Math.round(100 / n) : betul;
    let mata = ujian ? 50 : betul * 10 + (peratus >= 80 ? 20 : 0);
    if (r.jenis === 'mingguan' && peratus >= 70) mata += 50;
    r.hasil = { betul, n, peratus: ujian ? markah : peratus, markah, mata };
    try {
      const rec = await Store.simpanCubaan({ modul: r.modul || 0, tahap: r.tahap || 0, jenis: r.jenis, markah, jumlah: ujian ? 100 : n, peratus: ujian ? markah : peratus, mata, minggu: r.jenis === 'mingguan' ? A.cabaran().key : null, butiran: r.items.map(it => ({ q: it.id, t: it.t, b: !!it.b })) });
      S.cub.push(rec);
    } catch (e) { toast('Markah tidak dapat disimpan: ' + e.message, 'bad'); }
    render();
  }
  function vKeputusan() {
    const r = S.run, x = r.hasil, ujian = r.jenis === 'pra' || r.jenis === 'pasca';
    const salah = r.items.filter(i => !i.b);
    const sudut = Math.round(x.peratus * 3.6);
    return `<div class="wrap narrow stack-l">
      <section class="card result"><div class="ring" style="--a:${sudut}deg"><div><b>${ujian ? x.markah : x.peratus + '%'}</b><span>${ujian ? '/ 100' : x.betul + '/' + x.n + ' betul'}</span></div></div>
        <div><p class="tag">${h(r.label)}</p><h2>${A.gred(x.peratus)}</h2><p>${h(r.judul)}</p><p class="mata">+${x.mata} mata ganjaran</p>
        ${r.jenis === 'mingguan' ? `<p class="${x.peratus >= 70 ? 'okc' : 'badc'}">${x.peratus >= 70 ? 'Cabaran mingguan berjaya! Bonus 50 mata diberikan.' : 'Cuba lagi untuk mencapai 70%.'}</p>` : ''}</div></section>
      ${salah.length ? `<section class="card"><h3>Semakan jawapan salah (${salah.length})</h3>${salah.map(it => `<div class="rev"><p>${it.k === 'p' ? fmtS(it.s) : it.k === 'u' ? 'Susun ayat' : it.k === 's' ? h(it.w.join(' ')) : h(it.w.map(tok).join(' '))}</p>
        <p class="okc">Jawapan betul: <b>${h(it.k === 'p' ? plain(it.p[it.j]) : it.k === 'u' ? ayatDari(it.w) : it.k === 's' ? it.w.slice(0, it.b0).join(' ') + ' | ' + it.w.slice(it.b0).join(' ') : tok(it.w[it.x]) + ' → ' + it.p[it.j])}</b></p><p class="muted small">${h(it.e)}</p></div>`).join('')}</section>` : '<section class="card"><p class="okc"><b>Semua jawapan betul. Syabas!</b></p></section>'}
      <div class="row gap wrap-r">${!ujian ? '<button class="btn primary" data-act="ulang">Ulang latihan</button>' : ''}${r.modul ? `<button class="btn ghost" data-act="nav" data-v="modulDetail" data-m="${r.modul}" data-t="${r.tahap}">Kembali ke modul</button>` : ''}<button class="btn ghost" data-act="nav" data-v="${ujian ? 'ujian' : 'utama'}">${ujian ? 'Lihat perbandingan ujian' : 'Ke halaman utama'}</button>${A.lemah(S.cub).length ? '<button class="btn gold" data-act="pemulihan">Latihan pemulihan</button>' : ''}</div></div>`;
  }
  function mulaPemasa() {
    clearInterval(S.timer);
    const tick = () => {
      const el = document.getElementById('timer'); if (!S.run || S.run.selesai) return clearInterval(S.timer);
      const s = Math.max(0, Math.round((S.run.tamat - Date.now()) / 1000));
      if (el) { el.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); el.classList.toggle('warn', s < 60); }
      if (s <= 0) { clearInterval(S.timer); toast('Masa tamat. Jawapan anda dihantar secara automatik.'); selesaiRun(); }
    };
    tick(); S.timer = setInterval(tick, 1000);
  }
  function mulaLatihan(m, t, n, jenis) {
    const th = B.modul[m].tahap[t];
    const items = jenis === 'cabaran' || jenis === 'mingguan' && m === 6 ? shuffle(th.soalan) : shuffle(th.soalan).slice(0, Math.min(n || 10, th.soalan.length));
    mulaRun({ modul: m, tahap: t, jenis: jenis || 'latihan', segera: !(m === 6), masa: m === 6 ? 15 : 0, label: (jenis === 'mingguan' ? 'Cabaran Mingguan · ' : '') + 'Modul ' + m + ' · Tahap ' + t, judul: B.modul[m].nama + ' – ' + TAHAP_NAMA[t], items, asal: { m, t, n, jenis } });
  }
  function mulaPemulihan() {
    const lemah = A.lemah(S.cub).map(x => x.t); if (!lemah.length) return toast('Tiada topik lemah dikesan.');
    const pool = [];
    [1, 2, 3, 5, 6].forEach(m => [1, 2, 3].forEach(t => B.modul[m].tahap[t].soalan.forEach(q => { if (lemah.includes(q.t)) pool.push(q); })));
    mulaRun({ modul: 0, tahap: 0, jenis: 'pemulihan', segera: true, label: 'Latihan Pemulihan', judul: 'Fokus: ' + lemah.slice(0, 3).map(t => B.topik[t]).join(', '), items: shuffle(pool).slice(0, 10), asal: { pemulihan: true } });
  }

  /* ---------- PADANAN (Modul 1) ---------- */
  function vPadanan() {
    const g = S.run; const sisa = g.kata.filter(k => !k.done);
    if (!sisa.length) return '';
    return `<div class="wrap narrow stack-l run"><div class="run-h"><div><p class="tag">Modul 1 · Tahap ${g.tahap} · Permainan Padanan</p><h2>Padankan perkataan dengan golongannya</h2></div><button class="btn sm ghost" data-act="nav" data-v="modulDetail" data-m="1" data-t="${g.tahap}">Keluar</button></div>
      <p class="muted">Ketik satu perkataan, kemudian ketik kotak golongan yang sepadan. Markah dikira berdasarkan percubaan pertama.</p>
      <div class="zone bank">${sisa.map(k => `<button class="chip ${g.pilih === k.i ? 'sel' : ''} ${k.salah ? 'shake' : ''}" data-act="ppilih" data-i="${k.i}">${h(k.w)}</button>`).join('')}</div>
      <div class="buckets">${g.kategori.map((c, ci) => `<button class="bucket" data-act="pletak" data-c="${ci}"><b>${h(c)}</b><span>${g.kata.filter(k => k.done && k.c === ci).map(k => h(k.w)).join(', ') || '&nbsp;'}</span></button>`).join('')}</div>
      <p class="muted small">Betul pada percubaan pertama: ${g.kata.filter(k => k.done && k.first).length} / ${g.kata.length}</p></div>`;
  }
  function mulaPadanan(t) {
    const d = B.modul[1].padanan[t];
    S.run = { padanan: true, tahap: t, kategori: d.kategori, kata: shuffle(d.kata).slice(0, 10).map(([w, c], i) => ({ i, w, c, done: false, first: true })), pilih: null };
    S.view = 'padanan'; aturLatar(); app.innerHTML = shell(vPadanan()); window.scrollTo(0, 0);
  }
  async function letakPadanan(ci) {
    const g = S.run; const k = g.kata.find(x => x.i === g.pilih); if (!k) return toast('Pilih satu perkataan dahulu.');
    if (k.c === ci) { k.done = true; g.pilih = null; } else { k.first = false; k.salah = true; toast('"' + k.w + '" bukan ' + g.kategori[ci].toLowerCase() + '. Cuba lagi.', 'bad'); }
    if (g.kata.every(x => x.done)) {
      const betul = g.kata.filter(x => x.first).length, n = g.kata.length, peratus = Math.round(betul / n * 100);
      try { S.cub.push(await Store.simpanCubaan({ modul: 1, tahap: g.tahap, jenis: 'padanan', markah: betul, jumlah: n, peratus, mata: betul * 5, butiran: g.kata.map(x => ({ q: 'pad-' + x.w, t: 'golongan-kata', b: x.first })) })); } catch (e) { toast(e.message, 'bad'); }
      await modal(`<h3>Permainan selesai!</h3><p>Anda memadankan <b>${betul} daripada ${n}</b> perkataan dengan betul pada percubaan pertama (${peratus}%).</p><p>+${betul * 5} mata ganjaran</p>`, [['Tutup', 'primary']]);
      return go('modulDetail', { m: 1, t: g.tahap });
    }
    app.innerHTML = shell(vPadanan()); setTimeout(() => g.kata.forEach(x => x.salah = false), 400);
  }

  /* ---------- BINA AYAT (Modul 4) ---------- */
  function vBina() {
    const t = +S.p.t || 1, th = B.modul[4].tahap[t];
    if (S.p.q == null) {
      return `<div class="wrap stack-l"><a href="#" class="back" data-act="nav" data-v="modulDetail" data-m="4" data-t="${t}">← Modul 4: Bina Ayat</a>
      <div class="page-h"><p class="tag">Modul 4 · Tahap ${t} (${TAHAP_NAMA[t]})</p><h1>Tugasan Bina Ayat</h1><p class="muted">Pilih satu tugasan. Sistem membuat semakan awal, kemudian guru akan menilai ayat anda menggunakan rubrik.</p></div>
      <div class="grid-tugas">${th.soalan.map((q, i) => { const s = S.ayat.filter(a => a.soalan_id === q.id).pop();
        return `<a href="#" class="card tugas" data-act="nav" data-v="bina" data-t="${t}" data-q="${i}">${ikon(q.tema, 36)}<div><b>Tugasan ${i + 1}</b><p class="small muted">${h(q.situasi)}</p></div><span class="st ${s ? s.status : ''}">${s ? (s.status === 'disemak' ? s.markah + '/100' : 'Menunggu semakan') : 'Belum dijawab'}</span></a>`; }).join('')}</div></div>`;
    }
    const i = +S.p.q, q = th.soalan[i], sej = S.ayat.filter(a => a.soalan_id === q.id).reverse();
    const draf = S.p.draf || '', hasil = S.p.hasil;
    return `<div class="wrap narrow stack-l"><a href="#" class="back" data-act="nav" data-v="bina" data-t="${t}">← Senarai tugasan</a>
      <section class="card scene"><div class="scene-pic">${ikon(q.tema, 88)}<span>${h(q.tema.charAt(0).toUpperCase() + q.tema.slice(1))}</span></div>
        <div><p class="tag">Tugasan ${i + 1} · Tahap ${t}</p><p class="situasi">${h(q.situasi)}</p><p><b>${h(q.arahan)}</b></p>
        <div class="kunci">${q.kata.map(k => `<span>${h(k)}</span>`).join('')}</div></div></section>
      <section class="card"><label class="lbl" for="ayat-in">Tulis ayat anda</label><textarea id="ayat-in" rows="3" maxlength="400" placeholder="Tulis satu ayat lengkap di sini…">${h(draf)}</textarea>
        <div class="row end gap"><button class="btn ghost" data-act="bsemak" data-t="${t}" data-q="${i}">Semakan awal</button><button class="btn primary" data-act="bhantar" data-t="${t}" data-q="${i}">Hantar kepada guru</button></div>
        ${hasil ? `<div class="checks"><h4>Semakan awal sistem (${hasil.lulus}/${hasil.jumlah})</h4><ul>${hasil.checks.map(c => `<li class="${c.ok ? 'ok' : 'bad'}">${c.ok ? '✓' : '✗'} ${h(c.n)}</li>`).join('')}</ul>
          <p class="muted small">Skor sementara bahagian tanda baca dan ejaan: <b>${hasil.tanda}/10</b>. Struktur, tatabahasa, imbuhan dan makna dinilai oleh guru kerana sistem tidak dapat memastikan ketepatan jawapan terbuka.</p></div>` : ''}
      </section>
      ${sej.length ? `<section class="card"><h3>Ayat yang telah dihantar</h3>${sej.map(s => `<div class="rev"><p class="ayat-c">${h(s.ayat)}</p><p class="small muted">${masa(s.created_at)} · ${s.status === 'disemak' ? `<b class="okc">Disemak: ${s.markah}/100</b>` : 'Menunggu semakan guru'}</p>
        ${s.status === 'disemak' ? `<div class="rub-v">${RUBRIK.map(([k, l, mx]) => `<span>${l}: <b>${(s.rubrik || {})[k] ?? '–'}/${mx}</b></span>`).join('')}</div>${s.ulasan ? `<p class="ulasan">Ulasan guru: ${h(s.ulasan)}</p>` : ''}` : ''}</div>`).join('')}
        <details><summary>Lihat contoh jawapan</summary><p class="ayat-c">${h(q.contoh)}</p><p class="muted small">Ini hanya satu contoh. Ayat lain yang gramatis dan menepati arahan juga diterima.</p></details></section>` : ''}
    </div>`;
  }

  /* ---------- UJIAN ---------- */
  function vUjian() {
    const pra = A.ujian(S.cub, 'pra'), pasca = A.ujian(S.cub, 'pasca');
    const kad = (j, u, dah, boleh, nota) => `<section class="card ujian-k"><p class="tag">${j === 'pra' ? 'Sebelum pembelajaran' : 'Selepas pembelajaran'}</p><h2>${u.nama}</h2><p class="muted">${u.soalan.length} soalan · 100 markah · ${u.masa} minit</p>
      ${dah ? `<p class="skor">${dah.markah}<small>/100</small></p><p>${A.gred(dah.markah)} · ${tarikh(dah.created_at)}</p>` : boleh ? `<button class="btn primary" data-act="ujian" data-j="${j}">Mula ${u.nama}</button>` : `<p class="muted">${nota}</p>`}</section>`;
    let banding = '';
    if (pra && pasca) {
      const d = pasca.markah - pra.markah, pc = pra.markah ? Math.round(d / pra.markah * 100) : null;
      const tp = A.topik([pra]), tq = A.topik([pasca]);
      banding = `<section class="card"><h2>Perbandingan ujian pra dan pasca</h2>
        <div class="bars2"><div class="b2"><span>Ujian Pra</span><span class="meter"><i style="width:${pra.markah}%"></i></span><b>${pra.markah}</b></div><div class="b2"><span>Ujian Pasca</span><span class="meter gold-m"><i style="width:${pasca.markah}%"></i></span><b>${pasca.markah}</b></div></div>
        <p class="big-diff ${d >= 0 ? 'okc' : 'badc'}">${d >= 0 ? '+' : ''}${d} markah${pc != null ? ` (${pc >= 0 ? '+' : ''}${pc}% peningkatan)` : ''}</p>
        <table class="tbl stack"><thead><tr><th>Topik</th><th class="num">Pra</th><th class="num">Pasca</th></tr></thead><tbody>${Object.keys(tp).map(t => `<tr><td>${h(B.topik[t])}</td><td class="num">${tp[t].b}/${tp[t].n}</td><td class="num">${tq[t] ? tq[t].b + '/' + tq[t].n : '–'}</td></tr>`).join('')}</tbody></table></section>`;
    }
    return `<div class="wrap stack-l"><div class="page-h"><h1>Ujian Pra dan Ujian Pasca</h1><p class="muted">Dua set ujian yang setara dari segi aras kesukaran. Setiap ujian hanya boleh diduduki sekali. Ujian meliputi golongan kata, struktur ayat, subjek dan predikat, imbuhan, pembinaan ayat serta kesalahan tatabahasa.</p></div>
      <div class="grid2">${kad('pra', B.ujian.pra, pra, true)}${kad('pasca', B.ujian.pasca, pasca, !!pra, 'Ujian pasca dibuka selepas anda menduduki ujian pra dan melengkapkan latihan modul.')}</div>${banding}</div>`;
  }

  /* ---------- PENCAPAIAN ---------- */
  function vPencapaian() {
    const cub = S.cub, ay = S.ayat, mata = A.mata(cub, ay), tm = A.tahapMata(mata), lc = A.lencana(cub, ay), sj = A.sijil(cub, ay);
    return `<div class="wrap stack-l"><div class="page-h"><h1>Pencapaian Saya</h1></div>
      <div class="stats4"><div class="card stat"><span>Mata ganjaran</span><b>${mata}</b></div><div class="card stat"><span>Tahap penguasaan</span><b>${h(tm.nama)}</b></div><div class="card stat"><span>Streak latihan</span><b>${A.streak(cub)} hari</b></div><div class="card stat"><span>Lencana</span><b>${lc.filter(l => l.ok).length}/${lc.length}</b></div></div>
      <section class="card"><h2>Tahap penguasaan</h2><div class="ladder">${A.TAHAP.map((t, i) => `<div class="${i <= tm.idx ? 'on' : ''}"><b>${h(t[1])}</b><span>${t[0]} mata</span></div>`).join('')}</div></section>
      <section><h2>Lencana digital</h2><div class="grid-badge">${lc.map(l => `<div class="card badge ${l.ok ? 'got' : ''}">${lencanaSVG(l.ok, l.nama.split(' ').map(x => x[0]).join('').slice(0, 2))}<div><b>${h(l.nama)}</b><p class="small muted">${h(l.syarat)}</p><span class="small ${l.ok ? 'okc' : 'muted'}">${l.ok ? 'Diperoleh' : 'Belum diperoleh'}</span></div></div>`).join('')}</div></section>
      <section class="card sijil-k"><div><h2>Sijil digital</h2><p class="muted">Syarat: Ujian Pasca sekurang-kurangnya 60 markah, sekurang-kurangnya 60% dalam Modul 1, 2, 3, 5 dan 6 (mana-mana tahap), dan hantar sekurang-kurangnya 3 ayat dalam Modul 4.</p>
        <ul class="syarat"><li class="${sj.pasca && sj.pasca.markah >= 60 ? 'ok' : ''}">Ujian Pasca ≥ 60${sj.pasca ? ' (anda: ' + sj.pasca.markah + ')' : ''}</li><li class="${sj.modulOk ? 'ok' : ''}">Modul 1, 2, 3, 5 dan 6 ≥ 60%</li><li class="${sj.ayatOk ? 'ok' : ''}">3 ayat Modul 4 dihantar (anda: ${ay.length})</li></ul></div>
        ${sj.layak ? '<button class="btn gold" data-act="nav" data-v="sijil">Lihat dan cetak sijil</button>' : '<span class="muted">Belum layak</span>'}</section></div>`;
  }
  function noSiri(u) {
    let x = 2166136261; for (const ch of String(u.id)) { x ^= ch.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; }
    return 'BAP-' + new Date().getFullYear() + '-' + x.toString(36).toUpperCase().padStart(7, '0').slice(-7);
  }
  function htmlSijil() {
    const sj = A.sijil(S.cub, S.ayat), lc = A.lencana(S.cub, S.ayat).filter(l => l.ok);
    const m = sj.pasca ? sj.pasca.markah : 0, gred = A.gred(m);
    const sudut = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M4 4h60v6H10v54H4z" fill="#0B1640"/><path d="M16 16h34v3H19v31h-3z" fill="#D9A93A"/><circle cx="16" cy="16" r="5" fill="#D9A93A"/></svg>';
    return `<div class="sjw"><div class="sijil2">
      <div class="sj-fr"></div>${['tl', 'tr', 'bl', 'br'].map(k => `<span class="sj-c ${k}">${sudut}</span>`).join('')}
      <div class="sj-top"><img class="sj-kv" src="assets/logo-kv.png" alt="Kolej Vokasional, Kementerian Pendidikan Malaysia"><div class="sj-band"><img src="assets/logo-bina-ayat.png" alt="BINA AYAT PRO DIGITAL"></div></div>
      <p class="sj-k">SIJIL PENCAPAIAN</p>
      <p class="sj-d">Dengan ini disahkan bahawa</p>
      <h2 class="sj-n">${h(S.user.nama)}</h2>
      <p class="sj-m">No. Matrik ${h(S.user.no_matrik || '–')} &nbsp;·&nbsp; ${h(S.user.kelas || 'Semester ' + S.user.semester)}</p>
      <p class="sj-x">telah berjaya melengkapkan program penguasaan tatabahasa dan pembinaan ayat gramatis bahasa Melayu melalui inovasi <b>BINA AYAT PRO DIGITAL</b> dengan pencapaian</p>
      <div class="sj-g"><span>${h(gred.toUpperCase())}</span><small>${A.ujian(S.cub, 'pra') ? `Ujian Pra ${A.ujian(S.cub, 'pra').markah} &nbsp;→&nbsp; Ujian Pasca ${m}/100` : `Ujian Pasca ${m}/100`}</small></div>
      ${lc.length ? `<p class="sj-l">${lc.map(l => `<span>${h(l.nama)}</span>`).join('')}</p>` : ''}
      <div class="sj-bot">
        <div class="sj-sig"><img src="assets/tandatangan-azizah.svg" alt="Tandatangan"><i></i><b>CIKGU AZIZAH ISMAIL</b><small>Pensyarah Bahasa Melayu<br>Pemilik Inovasi BINA AYAT PRO DIGITAL</small></div>
        <div class="sj-seal"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="sjg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7E3A1"/><stop offset=".5" stop-color="#D9A93A"/><stop offset="1" stop-color="#9A7019"/></linearGradient></defs>
          <path d="M60 2l9 10 13-4 4 13 13 4-4 13 10 9-10 9 4 13-13 4-4 13-13-4-9 10-9-10-13 4-4-13-13-4 4-13-10-9 10-9-4-13 13-4 4-13 13 4z" fill="url(#sjg)"/><circle cx="60" cy="60" r="38" fill="#0B1640"/><circle cx="60" cy="60" r="33" fill="none" stroke="#D9A93A" stroke-width="1.5" stroke-dasharray="2 3"/>
          <text x="60" y="50" text-anchor="middle" font-size="8" font-weight="800" fill="#F7E3A1" letter-spacing="1.5">KVWT</text><text x="60" y="63" text-anchor="middle" font-size="10" font-weight="900" fill="#fff">BINA AYAT</text><text x="60" y="74" text-anchor="middle" font-size="6.5" font-weight="800" fill="#F7E3A1" letter-spacing="1">PRO DIGITAL</text></svg></div>
        <div class="sj-info"><p><small>Tarikh</small><b>${tarikh(new Date().toISOString())}</b></p><p><small>No. Siri Sijil</small><b>${noSiri(S.user)}</b></p><p><small>Institusi</small><b>${h(C.NAMA_INSTITUSI)}</b></p></div>
      </div>
    </div></div>`;
  }
  function vSijil() {
    if (!A.sijil(S.cub, S.ayat).layak) return vPencapaian();
    return `<div class="wrap stack-l"><a href="#" class="back" data-act="nav" data-v="pencapaian">← Pencapaian</a>${htmlSijil()}<div class="row center"><button class="btn gold" data-act="cetak-sijil">Cetak atau simpan sebagai PDF</button></div></div>`;
  }

  /* ---------- PANDUAN ---------- */
  function vPanduan() {
    const guru = S.user && S.user.peranan === 'guru';
    const P = guru ? [
      ['Mengurus kod akses', 'Buka menu Kod Akses. Cipta satu kod bagi setiap kelas (contoh: SVM1-BAKERI-2026), tetapkan semester, nama kelas dan had penggunaan. Berikan kod kepada pelajar. Nyahaktifkan kod selepas pendaftaran selesai.'],
      ['Memantau pelajar', 'Menu Pelajar memaparkan semua pelajar berdaftar dengan markah pra, pasca dan purata latihan. Klik "Lihat" untuk rekod aktiviti, topik lemah dan pilihan menyahaktifkan akaun atau membenarkan ujian diulang.'],
      ['Analisis', 'Menu Analisis menunjukkan topik yang paling sukar dikuasai, keputusan setiap modul mengikut tahap, perbandingan ujian pra dan pasca bagi individu dan kumpulan, serta senarai pelajar yang memerlukan intervensi.'],
      ['Semakan Bina Ayat', 'Ayat terbuka dalam Modul 4 tidak diberi markah automatik. Buka Semakan Ayat, baca ayat dan semakan awal sistem, kemudian isi markah bagi lima kriteria rubrik dan berikan ulasan.'],
      ['Laporan dan sandaran', 'Menu Laporan membolehkan anda memuat turun CSV (dibuka dalam Excel atau Google Sheets), mencetak laporan PDF dan memuat turun sandaran penuh dalam format JSON. Buat sandaran sekurang-kurangnya sebulan sekali.'],
      ['Kriteria intervensi', 'Pelajar disenaraikan untuk intervensi jika markah ujian pra kurang daripada 40, purata latihan kurang daripada 50% (sekurang-kurangnya 3 aktiviti), atau markah pasca tidak meningkat berbanding pra.']
    ] : [
      ['Bermula', 'Duduki Ujian Pra dahulu. Sistem akan mencadangkan tahap yang sesuai untuk anda: Asas, Pertengahan atau Mahir.'],
      ['Belajar mengikut modul', 'Setiap modul mempunyai nota ringkas, contoh dan latihan interaktif. Baca nota dahulu sebelum menjawab latihan.'],
      ['Maklum balas segera', 'Selepas setiap jawapan, sistem memberikan penerangan. Jawapan yang salah direkodkan supaya sistem dapat mengesan topik yang belum dikuasai.'],
      ['Latihan pemulihan', 'Di halaman Utama, sistem menyenaraikan topik lemah anda. Klik "Mulakan latihan pemulihan" untuk berlatih dengan soalan daripada topik tersebut.'],
      ['Bina Ayat', 'Tulis ayat anda sendiri, gunakan "Semakan awal" untuk menyemak huruf besar, tanda baca dan kata kunci, kemudian hantar kepada guru untuk dinilai.'],
      ['Mata, lencana dan sijil', 'Setiap jawapan betul memberikan 10 mata. Kumpul mata untuk naik tahap, sahut cabaran mingguan, kumpul lencana dan layakkan diri untuk sijil digital.'],
      ['Ujian Pasca', 'Selepas melengkapkan modul, duduki Ujian Pasca untuk melihat peningkatan anda.']
    ];
    return `<div class="wrap narrow stack-l"><div class="page-h"><h1>Panduan Penggunaan</h1><p class="muted">${guru ? 'Panduan untuk guru dan pentadbir.' : 'Panduan untuk pelajar.'}</p></div>
      ${P.map(([a, b], i) => `<section class="card guide"><span class="gn">${i + 1}</span><div><h3>${h(a)}</h3><p>${h(b)}</p></div></section>`).join('')}
      ${guru ? `<section class="card"><h3>Status sistem</h3><p>Mod: <b>${Store.mode === 'demo' ? 'Demo (pelayar sahaja)' : 'Supabase (pangkalan data berpusat)'}</b></p><p class="muted small">Panduan setup Supabase dan deployment disediakan dalam fail docs/PANDUAN-DEPLOYMENT.md di dalam pakej projek.</p></section>` : ''}</div>`;
  }

  /* ---------- GURU: data ---------- */
  async function muatGuru() {
    try {
      const [pr, cb, ay, kd, lg] = await Promise.all([Store.senaraiProfil(), Store.semuaCubaan(), Store.semuaAyat(), Store.senaraiKod(), Store.semuaLog()]);
      const lama = S.g || {};
      S.g = { pr, pel: pr.filter(p => p.peranan === 'pelajar'), cub: cb, ayat: ay, kod: kd, log: lg, sem: lama.sem || 'semua', kelas: lama.kelas || 'semua', dari: lama.dari || '', hingga: lama.hingga || '', tanpaContoh: lama.tanpaContoh != null ? lama.tanpaContoh : true };
    } catch (e) { S.g = { pr: [], pel: [], cub: [], ayat: [], kod: [], log: [], sem: 'semua', kelas: 'semua', dari: '', hingga: '', tanpaContoh: true }; toast('Gagal memuatkan data: ' + e.message, 'bad'); }
  }
  function ringkasPelajar(p) {
    const c = S.g.cub.filter(a => a.user_id === p.id), pra = A.ujian(c, 'pra'), pasca = A.ujian(c, 'pasca');
    const lat = c.filter(a => !['pra', 'pasca'].includes(a.jenis)), pl = avg(lat.map(a => a.peratus));
    const akhir = c.reduce((m, a) => a.created_at > m ? a.created_at : m, '');
    const sebab = [];
    if (pra && pra.markah < 40) sebab.push('Ujian pra < 40');
    if (lat.length >= 3 && pl < 50) sebab.push('Purata latihan < 50%');
    if (pra && pasca && pasca.markah <= pra.markah) sebab.push('Tiada peningkatan pasca');
    return { p, c, pra, pasca, pl, n: lat.length, akhir, sebab, lemah: A.lemah(c) };
  }
  function tapis(list) { const g = S.g; return list.filter(p => (g.sem === 'semua' || String(p.semester) === g.sem) && (g.kelas === 'semua' || (p.kelas || '–') === g.kelas)); }
  function penapis() {
    const g = S.g, kelas = [...new Set(g.pel.map(p => p.kelas || '–'))].sort();
    return `<div class="filters"><label>Semester<select data-chg="fsem"><option value="semua">Semua</option>${[1, 2, 3, 4].map(s => `<option value="${s}" ${g.sem === String(s) ? 'selected' : ''}>Semester ${s}</option>`).join('')}</select></label>
      <label>Kelas<select data-chg="fkelas"><option value="semua">Semua</option>${kelas.map(k => `<option ${g.kelas === k ? 'selected' : ''}>${h(k)}</option>`).join('')}</select></label>
      <button class="btn sm ghost" data-act="muat-semula">Muat semula data</button></div>`;
  }
  const bar = (label, v, mx, sub, cls) => `<div class="hbar"><span class="hl">${h(label)}</span><span class="meter ${cls || ''}"><i style="width:${!v ? 0 : Math.max(2, v / (mx || 100) * 100)}%"></i></span><b>${v == null ? '–' : r0(v) + (sub || '')}</b></div>`;

  function gRingkasan() {
    const g = S.g, R = tapis(g.pel).map(ringkasPelajar);
    const pra = R.filter(r => r.pra).map(r => r.pra.markah), pas = R.filter(r => r.pasca).map(r => r.pasca.markah);
    const iv = R.filter(r => r.sebab.length), mng = g.ayat.filter(a => a.status === 'menunggu' && R.some(r => r.p.id === a.user_id)).length;
    const kelasMap = {}; R.forEach(r => { const k = r.p.kelas || '–'; (kelasMap[k] = kelasMap[k] || []).push(r); });
    const cubR = R.flatMap(r => r.c);
    const empty = !g.pel.length;
    return `<div class="wrap stack-l"><div class="page-h row-sb"><div><h1>Dashboard Guru</h1><p class="muted">Gambaran keseluruhan penguasaan tatabahasa pelajar.</p></div>${penapis()}</div>
      ${empty ? `<section class="card empty"><h3>Belum ada pelajar berdaftar</h3><p class="muted">Cipta kod akses di menu Kod Akses dan berikan kepada pelajar untuk mendaftar.</p>${Store.mode === 'demo' ? '<button class="btn gold" data-act="jana-contoh">Jana data contoh untuk demo</button>' : ''}</section>` : ''}
      <div class="stats4">
        <div class="card stat"><span>Jumlah pelajar</span><b>${R.length}</b></div>
        <div class="card stat"><span>Purata ujian pra</span><b>${r0(avg(pra))}</b><small>${pra.length} pelajar</small></div>
        <div class="card stat"><span>Purata ujian pasca</span><b>${r0(avg(pas))}</b><small>${pas.length} pelajar</small></div>
        <div class="card stat ${iv.length ? 'alert' : ''}"><span>Perlu intervensi</span><b>${iv.length}</b><small><a href="#" data-act="nav" data-v="g-analisis">Lihat senarai</a></small></div>
      </div>
      <div class="grid2 top-al">
        <section class="card"><h3>Pelajar mengikut semester</h3>${[1, 2, 3, 4].map(s => bar('Semester ' + s, R.filter(r => r.p.semester === s).length, Math.max(1, R.length), ' org')).join('')}</section>
        <section class="card"><h3>Peningkatan pencapaian (purata)</h3>${[1, 2, 3, 4].map(s => { const x = R.filter(r => r.p.semester === s); const a = avg(x.filter(r => r.pra).map(r => r.pra.markah)), b = avg(x.filter(r => r.pasca).map(r => r.pasca.markah));
          return `<div class="pp"><span class="hl">Semester ${s}</span><div>${bar('Pra', a, 100, '', '')}${bar('Pasca', b, 100, '', 'gold-m')}</div></div>`; }).join('')}</section>
      </div>
      <section class="card"><h3>Analisis keputusan setiap modul</h3>${[1, 2, 3, 5, 6].map(m => bar('Modul ' + m + ': ' + MOD_NAMA[m], avg(cubR.filter(a => a.modul === m).map(a => a.peratus)), 100, '%')).join('')}
        ${bar('Modul 4: Bina Ayat (semakan guru)', avg(g.ayat.filter(a => a.status === 'disemak' && R.some(r => r.p.id === a.user_id)).map(a => a.markah)), 100, '%')}</section>
      <section class="card"><h3>Purata markah setiap kelas</h3><table class="tbl stack"><thead><tr><th>Kelas</th><th class="num">Pelajar</th><th class="num">Purata latihan</th><th class="num">Purata pra</th><th class="num">Purata pasca</th></tr></thead><tbody>
        ${Object.entries(kelasMap).map(([k, x]) => `<tr><td>${h(k)}</td><td class="num">${x.length}</td><td class="num">${r0(avg(x.filter(r => r.pl != null).map(r => r.pl)))}%</td><td class="num">${r0(avg(x.filter(r => r.pra).map(r => r.pra.markah)))}</td><td class="num">${r0(avg(x.filter(r => r.pasca).map(r => r.pasca.markah)))}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Tiada data.</td></tr>'}</tbody></table></section>
      ${mng ? `<section class="card cabaran"><div><h3>${mng} ayat menunggu semakan anda</h3><p class="muted">Jawapan terbuka Modul 4 memerlukan penilaian guru.</p></div><button class="btn primary" data-act="nav" data-v="g-semakan">Semak sekarang</button></section>` : ''}
    </div>`;
  }
  function gPelajar() {
    const q = (S.p.cari || '').toLowerCase();
    const R = tapis(S.g.pel).filter(p => !q || p.nama.toLowerCase().includes(q) || (p.no_matrik || '').toLowerCase().includes(q)).map(ringkasPelajar);
    return `<div class="wrap stack-l"><div class="page-h row-sb"><div><h1>Pelajar Berdaftar</h1><p class="muted">${R.length} pelajar dipaparkan.</p></div>${penapis()}</div>
      <input class="search" type="search" placeholder="Cari nama atau no. matrik…" value="${h(S.p.cari || '')}" data-inp="cari">
      <section class="card flush"><table class="tbl stack"><thead><tr><th>Nama</th><th>No. Matrik</th><th>Sem</th><th>Kelas</th><th class="num">Pra</th><th class="num">Pasca</th><th class="num">Beza</th><th class="num">Purata latihan</th><th>Aktiviti terakhir</th><th>Status</th><th></th></tr></thead><tbody>
      ${R.map(r => `<tr class="${r.p.aktif ? '' : 'off'}"><td><b>${h(r.p.nama)}</b>${r.sebab.length ? ' <span class="flag">Intervensi</span>' : ''}</td><td>${h(r.p.no_matrik)}</td><td>${h(r.p.semester)}</td><td>${h(r.p.kelas || '–')}</td><td class="num">${r.pra ? r.pra.markah : '–'}</td><td class="num">${r.pasca ? r.pasca.markah : '–'}</td><td class="num">${r.pra && r.pasca ? (r.pasca.markah - r.pra.markah > 0 ? '+' : '') + (r.pasca.markah - r.pra.markah) : '–'}</td><td class="num">${r.pl == null ? '–' : r0(r.pl) + '%'}</td><td>${tarikh(r.akhir)}</td><td>${r.p.aktif ? 'Aktif' : 'Tidak aktif'}</td><td><button class="btn sm ghost" data-act="nav" data-v="g-pelajarDetail" data-id="${h(r.p.id)}">Lihat</button></td></tr>`).join('') || '<tr><td colspan="11" class="muted">Tiada pelajar ditemui.</td></tr>'}</tbody></table></section></div>`;
  }
  function gPelajarDetail() {
    const p = S.g.pel.find(x => x.id === S.p.id); if (!p) return gPelajar();
    const r = ringkasPelajar(p), ay = S.g.ayat.filter(a => a.user_id === p.id);
    const d = r.pra && r.pasca ? r.pasca.markah - r.pra.markah : null;
    return `<div class="wrap stack-l"><a href="#" class="back" data-act="nav" data-v="g-pelajar">← Senarai pelajar</a>
      <div class="page-h row-sb"><div><h1>${h(p.nama)}</h1><p class="muted">${h(p.no_matrik)} · Semester ${h(p.semester)} · ${h(p.kelas || '–')} · Didaftarkan ${tarikh(p.created_at)}</p>${r.sebab.length ? `<p class="flag-l">Perlu intervensi: ${r.sebab.map(h).join(', ')}</p>` : ''}</div>
        <div class="row gap wrap-r"><button class="btn sm ghost" data-act="togol-pelajar" data-id="${h(p.id)}">${p.aktif ? 'Nyahaktifkan akaun' : 'Aktifkan semula'}</button>${r.pra ? `<button class="btn sm ghost" data-act="ulang-ujian" data-id="${h(p.id)}" data-j="pra">Benarkan ulang ujian pra</button>` : ''}${r.pasca ? `<button class="btn sm ghost" data-act="ulang-ujian" data-id="${h(p.id)}" data-j="pasca">Benarkan ulang ujian pasca</button>` : ''}</div></div>
      <div class="stats4"><div class="card stat"><span>Ujian pra</span><b>${r.pra ? r.pra.markah : '–'}</b></div><div class="card stat"><span>Ujian pasca</span><b>${r.pasca ? r.pasca.markah : '–'}</b></div><div class="card stat"><span>Perbezaan</span><b>${d == null ? '–' : (d > 0 ? '+' : '') + d}</b><small>${d != null && r.pra.markah ? Math.round(d / r.pra.markah * 100) + '% peningkatan' : ''}</small></div><div class="card stat"><span>Mata</span><b>${A.mata(r.c, ay)}</b></div></div>
      <div class="grid2 top-al"><section class="card"><h3>Markah terbaik setiap modul</h3><table class="tbl"><thead><tr><th>Modul</th><th class="num">Asas</th><th class="num">Pertengahan</th><th class="num">Mahir</th></tr></thead><tbody>${[1, 2, 3, 5, 6].map(m => `<tr><td>${m}. ${MOD_NAMA[m]}</td>${[1, 2, 3].map(t => { const b = A.terbaik(r.c, m, t); return `<td class="num">${b == null ? '–' : b + '%'}</td>`; }).join('')}</tr>`).join('')}<tr><td>4. Bina Ayat</td><td class="num" colspan="3">${ay.length} dihantar · purata ${r0(avg(ay.filter(a => a.status === 'disemak').map(a => a.markah)))}</td></tr></tbody></table></section>
      <section class="card"><h3>Kelemahan tatabahasa</h3>${r.lemah.length ? r.lemah.map(x => bar(B.topik[x.t] || x.t, x.acc, 100, '%', 'bad-m')).join('') : '<p class="muted">Tiada topik lemah dikesan (minimum 3 soalan bagi setiap topik).</p>'}</section></div>
      <section class="card"><h3>Rekod aktiviti</h3><table class="tbl stack"><thead><tr><th>Tarikh</th><th>Aktiviti</th><th>Modul / Tahap</th><th class="num">Markah</th></tr></thead><tbody>${r.c.slice().reverse().map(a => `<tr><td>${masa(a.created_at)}</td><td>${h(labelJenis(a.jenis))}</td><td>${a.modul ? 'Modul ' + a.modul + ' · ' + TAHAP_NAMA[a.tahap] : '–'}</td><td class="num">${a.jenis === 'pra' || a.jenis === 'pasca' ? a.markah + '/100' : a.peratus + '%'}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Belum ada aktiviti.</td></tr>'}</tbody></table></section></div>`;
  }
  function gAnalisis() {
    const R = tapis(S.g.pel).map(ringkasPelajar), cub = R.flatMap(r => r.c);
    const tp = Object.entries(A.topik(cub)).filter(([, v]) => v.n >= 3).map(([t, v]) => ({ t, acc: v.b / v.n * 100, n: v.n })).sort((a, b) => a.acc - b.acc);
    const both = R.filter(r => r.pra && r.pasca);
    const kump = {}; R.forEach(r => { const k = r.p.kelas || 'Semester ' + r.p.semester; (kump[k] = kump[k] || []).push(r); });
    return `<div class="wrap stack-l"><div class="page-h row-sb"><div><h1>Analisis Pencapaian</h1><p class="muted">Kenal pasti topik sukar, prestasi modul dan keberkesanan intervensi.</p></div>${penapis()}</div>
      <section class="card"><h3>Topik paling sukar dikuasai</h3><p class="muted small">Peratus jawapan betul bagi setiap topik (semua latihan dan ujian). Topik di bahagian atas memerlukan perhatian.</p>
        ${tp.length ? tp.slice(0, 12).map(x => bar(B.topik[x.t] || x.t, x.acc, 100, '%', x.acc < 60 ? 'bad-m' : x.acc < 75 ? 'warn-m' : '')).join('') : '<p class="muted">Belum cukup data.</p>'}</section>
      <section class="card"><h3>Keputusan modul mengikut tahap</h3><table class="tbl stack"><thead><tr><th>Modul</th>${[1, 2, 3].map(t => `<th class="num">Tahap ${t} purata</th><th class="num">Cubaan</th>`).join('')}</tr></thead><tbody>
        ${[1, 2, 3, 5, 6].map(m => `<tr><td>${m}. ${MOD_NAMA[m]}</td>${[1, 2, 3].map(t => { const x = cub.filter(a => a.modul === m && a.tahap === t && a.jenis !== 'pra'); return `<td class="num">${x.length ? r0(avg(x.map(a => a.peratus))) + '%' : '–'}</td><td class="num">${x.length}</td>`; }).join('')}</tr>`).join('')}</tbody></table></section>
      <section class="card"><h3>Perbandingan ujian pra dan pasca (kumpulan)</h3><table class="tbl stack"><thead><tr><th>Kumpulan</th><th class="num">Pelajar (pra & pasca)</th><th class="num">Purata pra</th><th class="num">Purata pasca</th><th class="num">Beza</th><th class="num">% peningkatan</th></tr></thead><tbody>
        ${Object.entries(kump).map(([k, x]) => { const y = x.filter(r => r.pra && r.pasca); const a = avg(y.map(r => r.pra.markah)), b = avg(y.map(r => r.pasca.markah)); return `<tr><td>${h(k)}</td><td class="num">${y.length}</td><td class="num">${r0(a)}</td><td class="num">${r0(b)}</td><td class="num">${a == null ? '–' : (b - a >= 0 ? '+' : '') + (b - a).toFixed(1)}</td><td class="num">${a ? ((b - a) / a * 100).toFixed(1) + '%' : '–'}</td></tr>`; }).join('')}
        ${both.length ? (() => { const a = avg(both.map(r => r.pra.markah)), b = avg(both.map(r => r.pasca.markah)); return `<tr class="tot"><td>Keseluruhan</td><td class="num">${both.length}</td><td class="num">${a.toFixed(1)}</td><td class="num">${b.toFixed(1)}</td><td class="num">${(b - a >= 0 ? '+' : '') + (b - a).toFixed(1)}</td><td class="num">${a ? ((b - a) / a * 100).toFixed(1) + '%' : '–'}</td></tr>`; })() : ''}</tbody></table></section>
      <section class="card"><h3>Perbandingan individu</h3><table class="tbl stack"><thead><tr><th>Nama</th><th>Kelas</th><th class="num">Pra</th><th class="num">Pasca</th><th class="num">Beza</th><th class="num">% peningkatan</th></tr></thead><tbody>
        ${both.sort((x, y) => (y.pasca.markah - y.pra.markah) - (x.pasca.markah - x.pra.markah)).map(r => { const d = r.pasca.markah - r.pra.markah; return `<tr><td>${h(r.p.nama)}</td><td>${h(r.p.kelas || '–')}</td><td class="num">${r.pra.markah}</td><td class="num">${r.pasca.markah}</td><td class="num ${d > 0 ? 'okc' : 'badc'}">${d > 0 ? '+' : ''}${d}</td><td class="num">${r.pra.markah ? (d / r.pra.markah * 100).toFixed(1) + '%' : '–'}</td></tr>`; }).join('') || '<tr><td colspan="6" class="muted">Belum ada pelajar yang menduduki kedua-dua ujian.</td></tr>'}</tbody></table></section>
      <section class="card"><h3>Pelajar yang memerlukan intervensi</h3><table class="tbl stack"><thead><tr><th>Nama</th><th>Kelas</th><th>Sebab</th><th>Topik lemah utama</th><th></th></tr></thead><tbody>
        ${R.filter(r => r.sebab.length).map(r => `<tr><td>${h(r.p.nama)}</td><td>${h(r.p.kelas || '–')}</td><td>${r.sebab.map(h).join('; ')}</td><td>${r.lemah.slice(0, 3).map(x => h(B.topik[x.t])).join(', ') || '–'}</td><td><button class="btn sm ghost" data-act="nav" data-v="g-pelajarDetail" data-id="${h(r.p.id)}">Lihat</button></td></tr>`).join('') || '<tr><td colspan="5" class="muted">Tiada pelajar memerlukan intervensi.</td></tr>'}</tbody></table></section></div>`;
  }
  function cariTugasan(id) { for (const t of [1, 2, 3]) { const q = B.modul[4].tahap[t].soalan.find(x => x.id === id); if (q) return q; } return null; }
  function gSemakan() {
    const tab = S.p.tab || 'menunggu', nm = id => (S.g.pr.find(p => p.id === id) || {}).nama || 'Pelajar';
    const list = S.g.ayat.filter(a => a.status === tab).sort((a, b) => tab === 'menunggu' ? (a.created_at < b.created_at ? -1 : 1) : (a.disemak_pada > b.disemak_pada ? -1 : 1));
    return `<div class="wrap stack-l"><div class="page-h"><h1>Semakan Bina Ayat</h1><p class="muted">Nilai ayat pelajar menggunakan rubrik: struktur (25), tatabahasa (25), imbuhan (20), makna (20), tanda baca dan ejaan (10).</p></div>
      <div class="seg">${[['menunggu', 'Menunggu'], ['disemak', 'Telah disemak']].map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-act="nav" data-v="g-semakan" data-tab="${k}">${l} (${S.g.ayat.filter(a => a.status === k).length})</button>`).join('')}</div>
      ${list.map(a => { const q = cariTugasan(a.soalan_id) || {}; const au = q.kata ? semakAuto(q, a.ayat) : null; const rb = a.rubrik || {};
        return `<section class="card semak"><div class="row-sb"><div><b>${h(nm(a.user_id))}</b><p class="small muted">${masa(a.created_at)} · Tahap ${a.tahap} · ${h(a.soalan_id)}</p></div>${a.status === 'disemak' ? `<span class="badge-ok">${a.markah}/100</span>` : ''}</div>
          <p class="small muted">Tugasan: ${h(q.situasi || '')} ${h(q.arahan || a.tugasan || '')} ${q.kata ? 'Kata kunci: ' + q.kata.map(h).join(', ') : ''}</p>
          <p class="ayat-c big">${h(a.ayat)}</p>
          ${au ? `<details><summary>Semakan awal sistem (${au.lulus}/${au.jumlah})</summary><ul class="checks-l">${au.checks.map(c => `<li class="${c.ok ? 'ok' : 'bad'}">${c.ok ? '✓' : '✗'} ${h(c.n)}</li>`).join('')}</ul><p class="small muted">Contoh jawapan: ${h(q.contoh)}</p></details>` : ''}
          <form class="rubrik" data-form="semak" data-id="${h(a.id)}">${RUBRIK.map(([k, l, mx]) => `<label>${l}<span class="rin"><input type="number" name="${k}" min="0" max="${mx}" step="1" required value="${rb[k] ?? (k === 'tanda' && au ? au.tanda : '')}"><small>/ ${mx}</small></span></label>`).join('')}
            <label class="ul">Ulasan kepada pelajar<textarea name="ulasan" rows="2" maxlength="400">${h(a.ulasan || '')}</textarea></label>
            <div class="row end gap"><span class="muted small" data-total></span><button class="btn primary">${a.status === 'disemak' ? 'Kemas kini semakan' : 'Simpan semakan'}</button></div></form></section>`; }).join('') || `<section class="card empty"><p class="muted">${tab === 'menunggu' ? 'Tiada ayat menunggu semakan.' : 'Belum ada ayat yang disemak.'}</p></section>`}</div>`;
  }
  function gKod() {
    const k = S.g.kod;
    return `<div class="wrap stack-l"><div class="page-h"><h1>Kod Akses</h1><p class="muted">Pelajar memerlukan kod akses untuk mendaftar. Setiap kod menetapkan semester dan kelas pelajar secara automatik.</p></div>
      <section class="card"><h3>Cipta kod baharu</h3><form class="form grid-kod" data-form="kod-baru">
        <label>Kod<input name="kod" required maxlength="30" placeholder="SVM1-BAKERI-2026"></label>
        <label>Peranan<select name="peranan"><option value="pelajar">Pelajar</option><option value="guru">Guru</option></select></label>
        <label>Semester<select name="semester"><option value="">–</option>${[1, 2, 3, 4].map(s => `<option value="${s}">Semester ${s}</option>`).join('')}</select></label>
        <label>Nama kelas<input name="kelas" maxlength="40" placeholder="SVM 1 Bakeri"></label>
        <label>Had penggunaan<input name="had_guna" type="number" min="1" max="1000" value="40"></label>
        <label>Keterangan<input name="keterangan" maxlength="80"></label>
        <button class="btn primary">Tambah kod</button></form></section>
      <section class="card flush"><table class="tbl stack"><thead><tr><th>Kod</th><th>Peranan</th><th>Semester</th><th>Kelas</th><th class="num">Digunakan</th><th>Keterangan</th><th>Status</th><th></th></tr></thead><tbody>
        ${k.map(c => `<tr class="${c.aktif ? '' : 'off'}"><td><code>${h(c.kod)}</code></td><td>${h(c.peranan)}</td><td>${h(c.semester || '–')}</td><td>${h(c.kelas || '–')}</td><td class="num">${c.bil_guna}/${h(c.had_guna || '∞')}</td><td>${h(c.keterangan || '')}</td><td>${c.aktif ? '<span class="okc">Aktif</span>' : '<span class="muted">Tidak aktif</span>'}</td>
          <td class="row gap"><button class="btn sm ghost" data-act="kod-togol" data-k="${h(c.kod)}">${c.aktif ? 'Nyahaktifkan' : 'Aktifkan'}</button><button class="btn sm ghost" data-act="kod-ubah" data-k="${h(c.kod)}">Ubah</button></td></tr>`).join('') || '<tr><td colspan="8" class="muted">Belum ada kod.</td></tr>'}</tbody></table></section></div>`;
  }
  function gLaporan() {
    return `<div class="wrap stack-l"><div class="page-h"><h1>Laporan dan Sandaran</h1><p class="muted">Muat turun laporan mengikut penapis semasa (semester dan kelas).</p></div>${penapis()}
      <div class="grid2">${[['ringkasan', 'Ringkasan pelajar', 'Nama, matrik, kelas, pra, pasca, beza, % peningkatan, purata latihan, topik lemah.'], ['prapasca', 'Ujian pra dan pasca', 'Markah pra dan pasca setiap pelajar serta perbezaannya.'], ['aktiviti', 'Semua aktiviti', 'Setiap latihan, cabaran dan ujian berserta markah.'], ['ayat', 'Semakan Bina Ayat', 'Ayat pelajar, skor rubrik dan ulasan guru.']].map(([k, l, d]) => `<section class="card"><h3>${l} (CSV)</h3><p class="muted small">${d}</p><div class="row gap"><button class="btn primary" data-act="csv" data-k="${k}">Muat turun CSV</button><button class="btn ghost" data-act="csv-salin" data-k="${k}">Salin</button></div></section>`).join('')}</div>
      <div class="grid2"><section class="card"><h3>Laporan PDF</h3><p class="muted small">Laporan bercetak mengandungi ringkasan statistik, perbandingan pra dan pasca, topik sukar dan senarai intervensi. Pilih "Simpan sebagai PDF" dalam tetingkap cetak.</p><button class="btn gold" data-act="pdf">Jana laporan PDF</button></section>
      <section class="card"><h3>Sandaran data (JSON)</h3><p class="muted small">Salinan penuh semua profil, kod akses, aktiviti dan semakan. Simpan di tempat yang selamat.</p><div class="row gap"><button class="btn primary" data-act="sandaran">Muat turun sandaran</button><button class="btn ghost" data-act="sandaran-salin">Salin</button></div></section></div>
      ${Store.mode === 'demo' ? `<section class="card"><h3>Alat mod demo</h3><div class="row gap wrap-r"><button class="btn ghost" data-act="jana-contoh">Tambah data contoh</button><button class="btn ghost danger" data-act="reset-demo">Padam semua data demo</button></div></section>` : ''}</div>`;
  }
  function binaCSV(k) {
    const R = tapis(S.g.pel).map(ringkasPelajar), nm = id => (S.g.pr.find(p => p.id === id) || {}).nama || '';
    if (k === 'ringkasan') return csv([['Nama', 'No Matrik', 'Semester', 'Kelas', 'Ujian Pra', 'Ujian Pasca', 'Beza', '% Peningkatan', 'Purata Latihan (%)', 'Bil Aktiviti', 'Topik Lemah', 'Intervensi', 'Status'], ...R.map(r => [r.p.nama, r.p.no_matrik, r.p.semester, r.p.kelas, r.pra ? r.pra.markah : '', r.pasca ? r.pasca.markah : '', r.pra && r.pasca ? r.pasca.markah - r.pra.markah : '', r.pra && r.pasca && r.pra.markah ? ((r.pasca.markah - r.pra.markah) / r.pra.markah * 100).toFixed(1) : '', r.pl == null ? '' : Math.round(r.pl), r.n, r.lemah.map(x => B.topik[x.t]).join('; '), r.sebab.join('; '), r.p.aktif ? 'Aktif' : 'Tidak aktif'])]);
    if (k === 'prapasca') return csv([['Nama', 'No Matrik', 'Semester', 'Kelas', 'Pra', 'Tarikh Pra', 'Pasca', 'Tarikh Pasca', 'Beza', '% Peningkatan'], ...R.map(r => [r.p.nama, r.p.no_matrik, r.p.semester, r.p.kelas, r.pra ? r.pra.markah : '', r.pra ? tarikh(r.pra.created_at) : '', r.pasca ? r.pasca.markah : '', r.pasca ? tarikh(r.pasca.created_at) : '', r.pra && r.pasca ? r.pasca.markah - r.pra.markah : '', r.pra && r.pasca && r.pra.markah ? ((r.pasca.markah - r.pra.markah) / r.pra.markah * 100).toFixed(1) : ''])]);
    if (k === 'aktiviti') return csv([['Tarikh', 'Nama', 'No Matrik', 'Kelas', 'Jenis', 'Modul', 'Tahap', 'Markah', 'Jumlah', 'Peratus'], ...R.flatMap(r => r.c.map(a => [new Date(a.created_at).toLocaleString('ms-MY'), r.p.nama, r.p.no_matrik, r.p.kelas, labelJenis(a.jenis), a.modul || '', a.tahap || '', a.markah, a.jumlah, a.peratus]))]);
    if (k === 'ayat') { const ids = new Set(R.map(r => r.p.id)); return csv([['Tarikh', 'Nama', 'Tugasan', 'Tahap', 'Ayat', 'Status', ...RUBRIK.map(x => x[1]), 'Jumlah', 'Ulasan'], ...S.g.ayat.filter(a => ids.has(a.user_id)).map(a => [new Date(a.created_at).toLocaleString('ms-MY'), nm(a.user_id), a.soalan_id, a.tahap, a.ayat, a.status, ...RUBRIK.map(x => (a.rubrik || {})[x[0]] ?? ''), a.markah ?? '', a.ulasan || ''])]); }
  }
  /* ---------- REKOD PENGGUNAAN (bukti penggunaan inovasi) ---------- */
  const LOG_LABEL = { daftar: 'Pendaftaran akaun', log_masuk: 'Log masuk', sesi: 'Sesi penggunaan' };
  const fmtT = d => d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });
  function dataGuna() {
    const g = S.g, pel = tapis(g.pel).filter(p => !(g.tanpaContoh && p.contoh)), ids = new Set(pel.map(p => p.id));
    const dari = g.dari ? new Date(g.dari + 'T00:00:00') : null, hingga = g.hingga ? new Date(g.hingga + 'T23:59:59') : null;
    const dalam = o => ids.has(o.user_id) && (!dari || new Date(o.created_at) >= dari) && (!hingga || new Date(o.created_at) <= hingga);
    const ev = [
      ...(g.log || []).filter(dalam).map(l => ({ t: l.created_at, u: l.user_id, k: 'log', j: LOG_LABEL[l.jenis] || l.jenis, s: 0, jenis: l.jenis })),
      ...g.cub.filter(dalam).map(a => ({ t: a.created_at, u: a.user_id, k: 'akt', j: labelJenis(a.jenis) + (a.modul ? ` · Modul ${a.modul} (${MOD_NAMA[a.modul]}) Tahap ${a.tahap}` : ''), s: (a.butiran || []).length || a.jumlah || 0, m: a.modul, mk: a.jenis === 'pra' || a.jenis === 'pasca' ? a.markah + '/100' : a.peratus + '%' })),
      ...g.ayat.filter(dalam).map(a => ({ t: a.created_at, u: a.user_id, k: 'ayat', j: 'Hantar ayat · Modul 4 (Bina Ayat) Tahap ' + a.tahap, s: 1, m: 4, mk: a.status === 'disemak' ? a.markah + '/100' : 'Menunggu semakan' }))
    ].sort((a, b) => a.t < b.t ? 1 : -1);
    const guna = ev.filter(e => e.jenis !== 'daftar');
    const aktifIds = new Set(guna.map(e => e.u));
    const hari = new Set(guna.map(e => hariKey(e.t)));
    const t0 = ev.length ? new Date(ev[ev.length - 1].t) : null, t1 = ev.length ? new Date(ev[0].t) : null;
    const R = pel.map(ringkasPelajar), both = R.filter(r => r.pra && r.pasca);
    const aPra = avg(both.map(r => r.pra.markah)), aPas = avg(both.map(r => r.pasca.markah));
    // bulanan
    const bulan = {}; guna.forEach(e => { const d = new Date(e.t), k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); const b = bulan[k] || (bulan[k] = { u: new Set(), log: 0, akt: 0, s: 0, ayat: 0 }); b.u.add(e.u); if (e.k === 'log') b.log++; if (e.k === 'akt') b.akt++; if (e.k === 'ayat') b.ayat++; b.s += e.s; });
    // mingguan (12 minggu terakhir dalam data)
    const isnin = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
    const minggu = []; if (t1) { let w = isnin(t1); for (let i = 0; i < 12; i++) { minggu.unshift({ d: new Date(w), n: 0, u: new Set() }); w.setDate(w.getDate() - 7); if (t0 && w < isnin(t0) && i >= 3) break; } }
    guna.forEach(e => { const w = isnin(e.t).getTime(); const m = minggu.find(x => x.d.getTime() === w); if (m && e.k !== 'log') { m.n++; m.u.add(e.u); } });
    const kelas = {}; pel.forEach(p => { const k = p.kelas || 'Semester ' + p.semester; const x = kelas[k] || (kelas[k] = { n: 0, aktif: 0, akt: 0, s: 0, log: 0 }); x.n++; if (aktifIds.has(p.id)) x.aktif++; });
    guna.forEach(e => { const p = pel.find(x => x.id === e.u); if (!p) return; const x = kelas[p.kelas || 'Semester ' + p.semester]; if (e.k === 'log') x.log++; else { x.akt++; x.s += e.s; } });
    const modul = [1, 2, 3, 4, 5, 6].map(m => ({ m, n: guna.filter(e => e.m === m).length, u: new Set(guna.filter(e => e.m === m).map(e => e.u)).size }));
    const contohAda = !g.tanpaContoh && tapis(g.pel).some(p => p.contoh);
    return { pel, ev, guna, aktifIds, hari, t0, t1, both, aPra, aPas, meningkat: both.filter(r => r.pasca.markah > r.pra.markah).length, bulan, minggu, kelas, modul, contohAda,
      sesi: ev.filter(e => e.jenis === 'log_masuk' || e.jenis === 'sesi').length, akt: ev.filter(e => e.k === 'akt').length, ayat: ev.filter(e => e.k === 'ayat').length, soalan: ev.reduce((a, e) => a + e.s, 0) };
  }
  const NAMA_BULAN = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
  const labelBulan = k => { const [y, m] = k.split('-'); return NAMA_BULAN[+m - 1] + ' ' + y; };
  function gPenggunaan() {
    const g = S.g, D = dataGuna(), nm = id => g.pr.find(p => p.id === id) || {};
    const mx = Math.max(1, ...D.minggu.map(w => w.n));
    const adaContoh = tapis(g.pel).some(p => p.contoh);
    return `<div class="wrap stack-l"><div class="page-h row-sb"><div><h1>Rekod Penggunaan Inovasi</h1><p class="muted">Bukti penggunaan sebenar BINA AYAT PRO DIGITAL oleh pelajar. Semua angka dijana secara automatik daripada pangkalan data aplikasi.</p></div>${penapis()}</div>
      <section class="card filters-k"><div class="filters">
        <label>Dari tarikh<input type="date" data-chg="gdari" value="${h(g.dari)}"></label><label>Hingga tarikh<input type="date" data-chg="ghingga" value="${h(g.hingga)}"></label>
        <div class="row gap wrap-r">${[['semua', 'Semua'], ['7', '7 hari'], ['30', '30 hari'], ['bulan', 'Bulan ini'], ['tahun', 'Tahun ini']].map(([k, l]) => `<button class="btn sm ghost" data-act="tempoh" data-h="${k}">${l}</button>`).join('')}</div>
        ${adaContoh ? `<label class="chk"><input type="checkbox" data-chg="gcontoh" ${g.tanpaContoh ? 'checked' : ''}> Kecualikan data contoh (demo)</label>` : ''}</div></section>
      ${D.contohAda ? '<div class="warn-box">Paparan ini MENGANDUNGI DATA CONTOH (demo). Jangan gunakan sebagai bukti penggunaan sebenar.</div>' : ''}
      <div class="stats4">
        <div class="card stat"><span>Pelajar berdaftar</span><b>${D.pel.length}</b><small>${new Set(D.pel.map(p => p.kelas || p.semester)).size} kelas/kumpulan</small></div>
        <div class="card stat"><span>Pelajar aktif</span><b>${D.aktifIds.size}</b><small>${D.pel.length ? Math.round(D.aktifIds.size / D.pel.length * 100) : 0}% daripada pelajar berdaftar</small></div>
        <div class="card stat"><span>Sesi log masuk</span><b>${D.sesi}</b><small>${D.hari.size} hari penggunaan</small></div>
        <div class="card stat"><span>Soalan dijawab</span><b>${D.soalan.toLocaleString('ms-MY')}</b><small>${D.akt} aktiviti · ${D.ayat} ayat dibina</small></div>
      </div>
      <section class="card"><div class="row-sb"><div><h3>Penggunaan mingguan</h3><p class="muted small">Bilangan aktiviti (latihan, ujian dan ayat dihantar) setiap minggu.${D.t0 ? ` Tempoh data: ${fmtT(D.t0)} hingga ${fmtT(D.t1)}.` : ''}</p></div></div>
        ${D.minggu.length ? `<div class="colchart">${D.minggu.map(w => `<div class="col"><b>${w.n}</b><i style="height:${Math.max(w.n ? 4 : 0, w.n / mx * 100)}%"></i><span>${w.d.getDate()} ${NAMA_BULAN[w.d.getMonth()].slice(0, 3)}</span><small>${w.u.size} pelajar</small></div>`).join('')}</div>` : '<p class="muted">Belum ada penggunaan direkodkan dalam tempoh ini.</p>'}</section>
      <div class="grid2 top-al">
        <section class="card"><h3>Ringkasan bulanan</h3><table class="tbl stack"><thead><tr><th>Bulan</th><th class="num">Pelajar aktif</th><th class="num">Log masuk</th><th class="num">Aktiviti</th><th class="num">Soalan</th></tr></thead><tbody>
          ${Object.keys(D.bulan).sort().reverse().map(k => { const b = D.bulan[k]; return `<tr><td>${labelBulan(k)}</td><td class="num">${b.u.size}</td><td class="num">${b.log}</td><td class="num">${b.akt + b.ayat}</td><td class="num">${b.s}</td></tr>`; }).join('') || '<tr><td colspan="5" class="muted">Tiada data.</td></tr>'}</tbody></table></section>
        <section class="card"><h3>Penggunaan mengikut modul</h3>${D.modul.map(x => bar('Modul ' + x.m + ': ' + MOD_NAMA[x.m], x.n, Math.max(1, ...D.modul.map(y => y.n)), ' kali')).join('')}<p class="muted small">Bilangan aktiviti bagi setiap modul dalam tempoh dipilih.</p></section>
      </div>
      <div class="grid2 top-al">
        <section class="card"><h3>Penggunaan mengikut kelas</h3><table class="tbl stack"><thead><tr><th>Kelas</th><th class="num">Pelajar</th><th class="num">Aktif</th><th class="num">Log masuk</th><th class="num">Aktiviti</th></tr></thead><tbody>
          ${Object.entries(D.kelas).map(([k, x]) => `<tr><td>${h(k)}</td><td class="num">${x.n}</td><td class="num">${x.aktif}</td><td class="num">${x.log}</td><td class="num">${x.akt}</td></tr>`).join('') || '<tr><td colspan="5" class="muted">Tiada data.</td></tr>'}</tbody></table></section>
        <section class="card"><h3>Impak terhadap pencapaian</h3>${D.both.length ? `<div class="bars2"><div class="b2"><span>Purata pra</span><span class="meter"><i style="width:${D.aPra}%"></i></span><b>${D.aPra.toFixed(1)}</b></div><div class="b2"><span>Purata pasca</span><span class="meter gold-m"><i style="width:${D.aPas}%"></i></span><b>${D.aPas.toFixed(1)}</b></div></div>
          <p class="big-diff okc">${D.aPas - D.aPra >= 0 ? '+' : ''}${(D.aPas - D.aPra).toFixed(1)} markah (${D.aPra ? ((D.aPas - D.aPra) / D.aPra * 100).toFixed(1) : '–'}% peningkatan)</p><p class="muted small">${D.meningkat} daripada ${D.both.length} pelajar (${Math.round(D.meningkat / D.both.length * 100)}%) menunjukkan peningkatan markah daripada ujian pra ke ujian pasca.</p>` : '<p class="muted">Data impak dipaparkan selepas pelajar menduduki ujian pra dan pasca.</p>'}</section>
      </div>
      <section class="card cabaran"><div><h3>Laporan Bukti Penggunaan Inovasi</h3><p class="muted">Laporan lengkap untuk pembentangan (contohnya Guru Cemerlang), dengan ruang tandatangan pengesahan pentadbir. Laporan mengikut penapis tempoh, semester dan kelas semasa.</p></div>
        <div class="row gap wrap-r"><button class="btn gold" data-act="pdf-guna">Jana laporan PDF</button><button class="btn primary" data-act="csv-guna">Muat turun log (CSV)</button><button class="btn ghost" data-act="csv-guna-salin">Salin log</button></div></section>
      <section class="card"><h3>Log aktiviti terkini</h3><table class="tbl stack"><thead><tr><th>Tarikh dan masa</th><th>Pelajar</th><th>Kelas</th><th>Aktiviti</th><th class="num">Markah</th></tr></thead><tbody>
        ${D.ev.slice(0, 25).map(e => { const p = nm(e.u); return `<tr><td>${masa(e.t)}</td><td>${h(p.nama || '')}</td><td>${h(p.kelas || '–')}</td><td>${h(e.j)}</td><td class="num">${h(e.mk || '')}</td></tr>`; }).join('') || '<tr><td colspan="5" class="muted">Belum ada rekod.</td></tr>'}</tbody></table>
        ${D.ev.length > 25 ? `<p class="muted small">Memaparkan 25 daripada ${D.ev.length} rekod. Muat turun CSV untuk log penuh.</p>` : ''}</section></div>`;
  }
  function csvGuna() {
    const D = dataGuna(), nm = id => S.g.pr.find(p => p.id === id) || {};
    return csv([['Tarikh', 'Masa', 'Nama', 'No Matrik', 'Semester', 'Kelas', 'Aktiviti', 'Bil Soalan', 'Markah'], ...D.ev.slice().reverse().map(e => { const p = nm(e.u), d = new Date(e.t); return [d.toLocaleDateString('ms-MY'), d.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }), p.nama, p.no_matrik, p.semester, p.kelas, e.j, e.s || '', e.mk || '']; })]);
  }
  function htmlBuktiGuna() {
    const g = S.g, D = dataGuna(), nm = id => g.pr.find(p => p.id === id) || {};
    const tempoh = g.dari || g.hingga ? `${g.dari ? fmtT(new Date(g.dari)) : 'awal'} hingga ${g.hingga ? fmtT(new Date(g.hingga)) : fmtT(new Date())}` : (D.t0 ? `${fmtT(D.t0)} hingga ${fmtT(D.t1)}` : '–');
    const perPel = D.pel.map(p => { const e = D.guna.filter(x => x.u === p.id); return { p, log: e.filter(x => x.k === 'log').length, akt: e.filter(x => x.k !== 'log').length, s: e.reduce((a, x) => a + x.s, 0), akhir: e[0] ? e[0].t : null }; }).sort((a, b) => b.akt - a.akt);
    return `<div class="laporan bukti">${D.contohAda ? '<p class="wm">MENGANDUNGI DATA CONTOH (DEMO) – BUKAN BUKTI SEBENAR</p>' : ''}
      <h1>LAPORAN BUKTI PENGGUNAAN INOVASI</h1><h2 class="nm">BINA AYAT PRO DIGITAL</h2><p><i>Faham, Susun, Bina dan Semak</i></p>
      <table><tr><td>Pemilik inovasi</td><td>${h(C.PEMILIK_INOVASI)}</td></tr><tr><td>Institusi</td><td>${h(C.NAMA_INSTITUSI)}</td></tr><tr><td>Sasaran</td><td>Pelajar Sijil Vokasional Malaysia (SVM)${g.sem !== 'semua' ? ', Semester ' + h(g.sem) : ', Semester 1 hingga 4'}${g.kelas !== 'semua' ? ', ' + h(g.kelas) : ''}</td></tr><tr><td>Tempoh laporan</td><td>${tempoh}</td></tr><tr><td>Tarikh laporan dijana</td><td>${new Date().toLocaleString('ms-MY')}</td></tr></table>
      <h2>1. Ringkasan penggunaan</h2><table>
        <tr><td>Bilangan pelajar berdaftar</td><td>${D.pel.length}</td></tr><tr><td>Bilangan pelajar aktif</td><td>${D.aktifIds.size} (${D.pel.length ? Math.round(D.aktifIds.size / D.pel.length * 100) : 0}%)</td></tr>
        <tr><td>Jumlah sesi log masuk</td><td>${D.sesi}</td></tr><tr><td>Bilangan hari penggunaan</td><td>${D.hari.size}</td></tr>
        <tr><td>Jumlah aktiviti latihan dan ujian</td><td>${D.akt}</td></tr><tr><td>Jumlah ayat dibina dan dihantar (Modul 4)</td><td>${D.ayat}</td></tr>
        <tr><td>Jumlah soalan dijawab</td><td>${D.soalan}</td></tr><tr><td>Purata aktiviti bagi setiap pelajar aktif</td><td>${D.aktifIds.size ? ((D.akt + D.ayat) / D.aktifIds.size).toFixed(1) : '–'}</td></tr></table>
      <h2>2. Penggunaan bulanan</h2><table><tr><th>Bulan</th><th>Pelajar aktif</th><th>Log masuk</th><th>Aktiviti</th><th>Soalan dijawab</th></tr>${Object.keys(D.bulan).sort().map(k => { const b = D.bulan[k]; return `<tr><td>${labelBulan(k)}</td><td>${b.u.size}</td><td>${b.log}</td><td>${b.akt + b.ayat}</td><td>${b.s}</td></tr>`; }).join('')}</table>
      <h2>3. Penggunaan mengikut modul</h2><table><tr><th>Modul</th><th>Bilangan aktiviti</th><th>Bilangan pelajar</th></tr>${D.modul.map(x => `<tr><td>Modul ${x.m}: ${MOD_NAMA[x.m]}</td><td>${x.n}</td><td>${x.u}</td></tr>`).join('')}</table>
      <h2>4. Penggunaan mengikut kelas</h2><table><tr><th>Kelas</th><th>Pelajar</th><th>Pelajar aktif</th><th>Log masuk</th><th>Aktiviti</th></tr>${Object.entries(D.kelas).map(([k, x]) => `<tr><td>${h(k)}</td><td>${x.n}</td><td>${x.aktif}</td><td>${x.log}</td><td>${x.akt}</td></tr>`).join('')}</table>
      <h2>5. Impak terhadap pencapaian (ujian pra dan pasca)</h2>${D.both.length ? `<table><tr><td>Pelajar yang menduduki kedua-dua ujian</td><td>${D.both.length}</td></tr><tr><td>Purata ujian pra</td><td>${D.aPra.toFixed(1)}</td></tr><tr><td>Purata ujian pasca</td><td>${D.aPas.toFixed(1)}</td></tr><tr><td>Perbezaan purata</td><td>${(D.aPas - D.aPra >= 0 ? '+' : '') + (D.aPas - D.aPra).toFixed(1)}</td></tr><tr><td>Peratus peningkatan</td><td>${D.aPra ? ((D.aPas - D.aPra) / D.aPra * 100).toFixed(1) + '%' : '–'}</td></tr><tr><td>Pelajar yang menunjukkan peningkatan</td><td>${D.meningkat} (${Math.round(D.meningkat / D.both.length * 100)}%)</td></tr></table>` : '<p>Belum ada data ujian pra dan pasca yang lengkap.</p>'}
      <h2>6. Senarai pelajar yang terlibat</h2><table><tr><th>Bil</th><th>Nama</th><th>No. Matrik</th><th>Kelas</th><th>Log masuk</th><th>Aktiviti</th><th>Soalan</th><th>Aktiviti terakhir</th></tr>${perPel.map((x, i) => `<tr><td>${i + 1}</td><td>${h(x.p.nama)}</td><td>${h(x.p.no_matrik || '')}</td><td>${h(x.p.kelas || '')}</td><td>${x.log}</td><td>${x.akt}</td><td>${x.s}</td><td>${x.akhir ? tarikh(x.akhir) : '–'}</td></tr>`).join('')}</table>
      <p class="small">Semua data dalam laporan ini dijana secara automatik daripada pangkalan data aplikasi BINA AYAT PRO DIGITAL dan tidak diubah secara manual.</p>
      <div class="ttd"><div><p>Disediakan oleh:</p><span></span><b>${h(C.PEMILIK_INOVASI)}</b><small>Pensyarah Bahasa Melayu<br>${h(C.NAMA_INSTITUSI)}</small><small>Tarikh:</small></div>
        <div><p>Disahkan oleh:</p><span></span><b>Nama:</b><small>Jawatan:<br>Cop rasmi:</small><small>Tarikh:</small></div></div></div>`;
  }
  function htmlLaporan() {
    const R = tapis(S.g.pel).map(ringkasPelajar), cub = R.flatMap(r => r.c), both = R.filter(r => r.pra && r.pasca);
    const a = avg(both.map(r => r.pra.markah)), b = avg(both.map(r => r.pasca.markah));
    const tp = Object.entries(A.topik(cub)).filter(([, v]) => v.n >= 3).map(([t, v]) => [t, v.b / v.n * 100]).sort((x, y) => x[1] - y[1]).slice(0, 8);
    return `<div class="laporan"><h1>Laporan Pencapaian BINA AYAT PRO DIGITAL</h1><p>${h(C.NAMA_INSTITUSI)} · Dijana pada ${new Date().toLocaleString('ms-MY')} · Penapis: Semester ${h(S.g.sem)}, Kelas ${h(S.g.kelas)}</p>
      <h2>Ringkasan</h2><table><tr><td>Jumlah pelajar</td><td>${R.length}</td></tr><tr><td>Pelajar yang menduduki kedua-dua ujian</td><td>${both.length}</td></tr><tr><td>Purata ujian pra</td><td>${a == null ? '–' : a.toFixed(1)}</td></tr><tr><td>Purata ujian pasca</td><td>${b == null ? '–' : b.toFixed(1)}</td></tr><tr><td>Peratus peningkatan</td><td>${a ? ((b - a) / a * 100).toFixed(1) + '%' : '–'}</td></tr><tr><td>Pelajar perlu intervensi</td><td>${R.filter(r => r.sebab.length).length}</td></tr></table>
      <h2>Topik paling sukar</h2><table><tr><th>Topik</th><th>% betul</th></tr>${tp.map(([t, v]) => `<tr><td>${h(B.topik[t])}</td><td>${v.toFixed(1)}%</td></tr>`).join('')}</table>
      <h2>Keputusan individu</h2><table><tr><th>Nama</th><th>Kelas</th><th>Pra</th><th>Pasca</th><th>Beza</th><th>Purata latihan</th><th>Intervensi</th></tr>${R.map(r => `<tr><td>${h(r.p.nama)}</td><td>${h(r.p.kelas || '')}</td><td>${r.pra ? r.pra.markah : '–'}</td><td>${r.pasca ? r.pasca.markah : '–'}</td><td>${r.pra && r.pasca ? r.pasca.markah - r.pra.markah : '–'}</td><td>${r.pl == null ? '–' : Math.round(r.pl) + '%'}</td><td>${r.sebab.map(h).join('; ')}</td></tr>`).join('')}</table>
      <p class="small">Inovasi ${h(C.PEMILIK_INOVASI)}</p></div>`;
  }

  /* ---------- carta garis ---------- */
  function lukisGaris(el) {
    const v = JSON.parse(el.dataset.line); el.innerHTML = '<svg></svg>'; const s = el.firstChild;
    const draw = () => {
      const W = s.clientWidth, H = s.clientHeight; if (!W) return; const p = { l: 34, r: 12, t: 12, b: 24 };
      const x = i => p.l + (v.length === 1 ? 0 : i / (v.length - 1) * (W - p.l - p.r)), y = n => p.t + (1 - n / 100) * (H - p.t - p.b);
      const pts = v.map((n, i) => x(i) + ',' + y(n)).join(' ');
      s.innerHTML = [0, 50, 100].map(g => `<line x1="${p.l}" x2="${W - p.r}" y1="${y(g)}" y2="${y(g)}" stroke="var(--line)"/><text x="${p.l - 6}" y="${y(g) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${g}</text>`).join('')
        + `<polygon points="${x(0)},${y(0)} ${pts} ${x(v.length - 1)},${y(0)}" fill="var(--royal)" opacity=".12"/><polyline points="${pts}" fill="none" stroke="var(--royal)" stroke-width="2.5" stroke-linejoin="round"/>`
        + v.map((n, i) => `<circle cx="${x(i)}" cy="${y(n)}" r="4" fill="${n >= 80 ? 'var(--gold)' : 'var(--royal)'}" stroke="var(--card)" stroke-width="2"><title>${n}%</title></circle>`).join('')
        + `<text x="${p.l}" y="${H - 6}" font-size="11" fill="var(--muted)">Lama</text><text x="${W - p.r}" y="${H - 6}" text-anchor="end" font-size="11" fill="var(--muted)">Terkini</text>`;
    };
    const ro = new ResizeObserver(draw); ro.observe(s); draw();
  }

  /* ---------- tindakan ---------- */
  async function selepasMasuk(u, jenis) {
    S.user = u; S.g = null;
    if (!jenis) { const k = 'bap_sesi_' + u.id, hari = hariKey(new Date()); let lama = null; try { lama = localStorage.getItem(k); localStorage.setItem(k, hari); } catch (e) { /* */ } if (lama !== hari) jenis = 'sesi'; }
    else { try { localStorage.setItem('bap_sesi_' + u.id, hariKey(new Date())); } catch (e) { /* */ } }
    if (jenis) Store.catatLog(jenis).catch(() => {});
    if (u.peranan === 'pelajar') { [S.cub, S.ayat] = await Promise.all([Store.cubaanSaya(), Store.ayatSaya()]); go('utama'); }
    else go('g-ringkasan');
  }
  const ACT = {
    nav: el => { const d = el.dataset; const p = {}; ['m', 't', 'q', 'id', 'tab'].forEach(k => { if (d[k] != null) p[k] = d[k]; }); go(d.v, p); },
    authtab: el => { S.authTab = el.dataset.t; render(); },
    'lompat-ke': el => {
      if (el.dataset.tab && S.authTab !== el.dataset.tab) { S.authTab = el.dataset.tab; render(); }
      const t = document.getElementById(el.dataset.ke); if (!t) return;
      const kurang = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      t.scrollIntoView({ behavior: kurang ? 'auto' : 'smooth', block: 'start' });
      if (el.dataset.ke === 'akses') setTimeout(() => { const f = document.querySelector('.auth-card input'); if (f) f.focus({ preventScroll: true }); }, kurang ? 0 : 500);
    },
    keluar: async () => { document.getElementById('toast').className = 'toast'; await Store.keluar(); S.user = null; S.g = null; S.run = null; S.authTab = 'masuk'; render(); },
    mula: el => mulaLatihan(+el.dataset.m, +el.dataset.t, +el.dataset.n || 10, el.dataset.j),
    padanan: el => mulaPadanan(+el.dataset.t),
    ppilih: el => { S.run.pilih = +el.dataset.i; app.innerHTML = shell(vPadanan()); },
    pletak: el => letakPadanan(+el.dataset.c),
    pemulihan: () => mulaPemulihan(),
    ujian: async el => {
      const j = el.dataset.j, u = B.ujian[j];
      if (A.ujian(S.cub, j)) return toast('Ujian ini telah diduduki.');
      if (!(await sahkan(`${u.nama} mengandungi ${u.soalan.length} soalan (100 markah) dan perlu disiapkan dalam ${u.masa} minit. Ujian hanya boleh diduduki sekali. Mula sekarang?`, 'Mula ujian'))) return;
      mulaRun({ jenis: j, segera: false, masa: u.masa, label: u.nama, judul: 'Penguasaan Tatabahasa Bahasa Melayu', items: u.soalan });
    },
    pilih: el => { const r = S.run, it = r.items[r.i]; if (r.segera && it.b != null) return; if (r.segera) { it.pil = +el.dataset.o; render(); } else tandaJawapan(it, +el.dataset.o); },
    psemak: () => { const it = S.run.items[S.run.i]; if (it.pil == null) return toast('Pilih satu jawapan dahulu.'); tandaJawapan(it, it.pil); },
    gap: el => { const it = S.run.items[S.run.i]; if (it.b != null) return; it.jaw = +el.dataset.g; it.b = it.jaw === it.b0; beriGanjaran(it); render(); },
    dkata: el => { const it = S.run.items[S.run.i], i = +el.dataset.i; it.jawKata = i; if (i === it.x) it.step = 1; else { it.step = 1; it.b = false; } render(); },
    dbetul: el => { const it = S.run.items[S.run.i]; it.jaw = +el.dataset.o; it.b = it.jaw === it.j; beriGanjaran(it); render(); },
    smasuk: el => { const it = S.run.items[S.run.i], p = +el.dataset.pos; it.ans.push(it.bank.splice(p, 1)[0]); render(); },
    skeluar: el => { const it = S.run.items[S.run.i], p = +el.dataset.pos; it.bank.push(it.ans.splice(p, 1)[0]); render(); },
    sreset: () => { const it = S.run.items[S.run.i]; it.bank = it.bank.concat(it.ans); it.ans = []; render(); },
    ssemak: () => semakSusun(S.run.items[S.run.i]),
    seterusnya: () => { const r = S.run; if (r.segera && r.items[r.i].b == null) return toast('Sila jawab soalan ini dahulu.'); r.i++; render(); window.scrollTo(0, 0); },
    sebelum: () => { S.run.i--; render(); },
    lompat: el => { S.run.i = +el.dataset.i; render(); },
    'hantar-run': async () => {
      const r = S.run;
      if (r.segera && r.items[r.i].b == null) return toast('Sila jawab soalan ini dahulu.');
      if (!r.segera) { const kosong = r.items.filter(i => i.jaw == null).length; if (!(await sahkan(kosong ? `${kosong} soalan belum dijawab. Hantar juga?` : 'Hantar semua jawapan sekarang?', 'Hantar'))) return; }
      selesaiRun();
    },
    'tamat-awal': async () => { if (await sahkan('Keluar daripada aktiviti ini? Jawapan yang belum dihantar tidak akan disimpan.', 'Keluar')) { clearInterval(S.timer); const r = S.run; S.run = null; go(r.modul ? 'modulDetail' : r.jenis === 'pra' || r.jenis === 'pasca' ? 'ujian' : 'utama', { m: r.modul, t: r.tahap }); } },
    ulang: () => { const a = S.run.asal; if (a.pemulihan) mulaPemulihan(); else mulaLatihan(a.m, a.t, a.n, a.jenis); },
    bsemak: el => { const q = B.modul[4].tahap[+el.dataset.t].soalan[+el.dataset.q], v = document.getElementById('ayat-in').value; if (!v.trim()) return toast('Sila tulis ayat anda dahulu.'); S.p.draf = v; S.p.hasil = semakAuto(q, v); render(); },
    bhantar: async el => {
      const t = +el.dataset.t, q = B.modul[4].tahap[t].soalan[+el.dataset.q], v = document.getElementById('ayat-in').value.trim();
      if (v.split(/\s+/).length < 3) return toast('Ayat terlalu pendek.');
      const au = semakAuto(q, v);
      try { const rec = await Store.hantarAyat({ soalan_id: q.id, tahap: t, tugasan: q.arahan, ayat: v, semakan_auto: { lulus: au.lulus, jumlah: au.jumlah, tanda: au.tanda } }); S.ayat.push(rec); S.p.draf = ''; S.p.hasil = au; toast('Ayat dihantar kepada guru. +15 mata', 'ok'); render(); }
      catch (e) { toast('Gagal menghantar: ' + e.message, 'bad'); }
    },
    'cetak-sijil': () => cetak(htmlSijil()),
    'muat-semula': async () => { S.g = null; await muatGuru(); render(); toast('Data dikemas kini.', 'ok'); },
    'jana-contoh': async () => { await Store.janaDataContoh(); S.g = null; await muatGuru(); render(); toast('Data contoh ditambah (12 pelajar).', 'ok'); },
    'reset-demo': async () => { if (!(await sahkan('Padam SEMUA data demo dalam pelayar ini? Tindakan ini tidak boleh dibatalkan.', 'Padam'))) return; await Store.setSemula(); S.user = null; S.g = null; render(); },
    'togol-pelajar': async el => { const p = S.g.pel.find(x => x.id === el.dataset.id); if (!(await sahkan(p.aktif ? `Nyahaktifkan akaun ${p.nama}? Pelajar tidak akan dapat log masuk.` : `Aktifkan semula akaun ${p.nama}?`))) return; try { await Store.kemaskiniProfil(p.id, { aktif: !p.aktif }); p.aktif = !p.aktif; render(); } catch (e) { toast(e.message, 'bad'); } },
    'ulang-ujian': async el => { const p = S.g.pel.find(x => x.id === el.dataset.id), j = el.dataset.j; if (!(await sahkan(`Padam rekod ujian ${j} bagi ${p.nama} supaya pelajar boleh menduduki semula? Markah lama akan dipadam.`, 'Padam & benarkan'))) return; try { await Store.padamCubaanUjian(p.id, j); S.g.cub = S.g.cub.filter(a => !(a.user_id === p.id && a.jenis === j)); render(); toast('Ujian boleh diduduki semula.', 'ok'); } catch (e) { toast(e.message, 'bad'); } },
    'kod-togol': async el => { const c = S.g.kod.find(x => x.kod === el.dataset.k); try { await Store.simpanKod({ kod: c.kod, aktif: !c.aktif }, false); c.aktif = !c.aktif; render(); } catch (e) { toast(e.message, 'bad'); } },
    csv: el => muatTurun('bina-ayat-' + el.dataset.k + '-' + new Date().toISOString().slice(0, 10) + '.csv', binaCSV(el.dataset.k)),
    'csv-salin': el => salin(binaCSV(el.dataset.k)),
    pdf: () => cetak(htmlLaporan()),
    'pdf-guna': () => cetak(htmlBuktiGuna()),
    'csv-guna': () => muatTurun('rekod-penggunaan-bina-ayat-' + new Date().toISOString().slice(0, 10) + '.csv', csvGuna()),
    'csv-guna-salin': () => salin(csvGuna()),
    tempoh: el => {
      const k = el.dataset.h, d = new Date(), iso = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
      if (k === 'semua') { S.g.dari = ''; S.g.hingga = ''; }
      else if (k === 'bulan') { S.g.dari = iso(new Date(d.getFullYear(), d.getMonth(), 1)); S.g.hingga = iso(d); }
      else if (k === 'tahun') { S.g.dari = iso(new Date(d.getFullYear(), 0, 1)); S.g.hingga = iso(d); }
      else { const x = new Date(d); x.setDate(x.getDate() - (+k - 1)); S.g.dari = iso(x); S.g.hingga = iso(d); }
      render();
    },
    sandaran: async () => muatTurun('sandaran-bina-ayat-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify(await Store.sandaran(), null, 2), 'application/json'),
    'sandaran-salin': async () => salin(JSON.stringify(await Store.sandaran()))
  };
  // "Ubah kod" menggunakan borang dalam modal
  ACT['kod-ubah'] = async el => {
    const c = S.g.kod.find(x => x.kod === el.dataset.k);
    const m = document.getElementById('modal');
    m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true"><h3>Ubah kod ${h(c.kod)}</h3><form class="form" id="f-ubah"><label>Nama kelas<input name="kelas" value="${h(c.kelas || '')}" maxlength="40"></label><label>Semester<select name="semester"><option value="">–</option>${[1, 2, 3, 4].map(s => `<option value="${s}" ${c.semester === s ? 'selected' : ''}>Semester ${s}</option>`).join('')}</select></label><label>Had penggunaan<input name="had_guna" type="number" min="1" max="1000" value="${h(c.had_guna || '')}"></label><label>Keterangan<input name="keterangan" value="${h(c.keterangan || '')}" maxlength="80"></label><div class="row end gap"><button type="button" class="btn ghost" id="ub-batal">Batal</button><button class="btn primary">Simpan</button></div></form></div>`;
    m.classList.add('show'); m.onclick = null;
    m.querySelector('#ub-batal').onclick = () => { m.classList.remove('show'); m.innerHTML = ''; };
    m.querySelector('form').onsubmit = async e => {
      e.preventDefault(); const f = new FormData(e.target);
      const patch = { kod: c.kod, kelas: f.get('kelas') || null, semester: f.get('semester') ? +f.get('semester') : null, had_guna: f.get('had_guna') ? +f.get('had_guna') : null, keterangan: f.get('keterangan') || null };
      try { await Store.simpanKod(patch, false); Object.assign(c, patch); m.classList.remove('show'); m.innerHTML = ''; render(); toast('Kod dikemas kini.', 'ok'); } catch (er) { toast(er.message, 'bad'); }
    };
  };

  const FORM = {
    masuk: async f => selepasMasuk(await Store.masuk(f.get('id'), f.get('pw')), 'log_masuk'),
    'daftar-pelajar': async f => {
      if (f.get('pw') !== f.get('pw2')) throw new Error('Kata laluan tidak sepadan.');
      if (!/^[A-Za-z0-9-/]{4,20}$/.test(f.get('matrik').trim())) throw new Error('No. matrik hanya boleh mengandungi huruf, nombor, "-" atau "/" (4–20 aksara).');
      selepasMasuk(await Store.daftar({ nama: f.get('nama'), no_matrik: f.get('matrik'), semester: f.get('sem'), kod: f.get('kod'), katalaluan: f.get('pw') }), 'daftar');
    },
    'daftar-guru': async f => {
      if (f.get('pw') !== f.get('pw2')) throw new Error('Kata laluan tidak sepadan.');
      selepasMasuk(await Store.daftar({ nama: f.get('nama'), email: f.get('email'), kod: f.get('kod'), katalaluan: f.get('pw') }), 'daftar');
    },
    semak: async (f, form) => {
      const rub = {}; let tot = 0;
      for (const [k, , mx] of RUBRIK) { const v = +f.get(k); if (!(v >= 0 && v <= mx)) throw new Error('Markah ' + k + ' mesti antara 0 dan ' + mx + '.'); rub[k] = v; tot += v; }
      const rec = await Store.semakAyat(form.dataset.id, { rubrik: rub, markah: tot, ulasan: f.get('ulasan') || null });
      const a = S.g.ayat.find(x => x.id === form.dataset.id); Object.assign(a, rec || {}, { rubrik: rub, markah: tot, status: 'disemak', ulasan: f.get('ulasan') || null });
      toast('Semakan disimpan: ' + tot + '/100', 'ok'); render();
    },
    'kod-baru': async (f, form) => {
      const c = { kod: f.get('kod'), peranan: f.get('peranan'), semester: f.get('semester') ? +f.get('semester') : null, kelas: f.get('kelas') || null, had_guna: f.get('had_guna') ? +f.get('had_guna') : null, keterangan: f.get('keterangan') || null, aktif: true };
      await Store.simpanKod(c, true); form.reset(); S.g.kod = await Store.senaraiKod(); render(); toast('Kod akses ditambah.', 'ok');
    }
  };

  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
    e.preventDefault(); const fn = ACT[el.dataset.act]; if (fn) Promise.resolve(fn(el)).catch(er => toast(er.message, 'bad'));
  });
  document.addEventListener('submit', async e => {
    const form = e.target.closest('[data-form]'); if (!form) return; e.preventDefault();
    if (S.busy) return; S.busy = true; const btn = form.querySelector('button:not([type=button])'); if (btn) btn.disabled = true;
    try { await FORM[form.dataset.form](new FormData(form), form); } catch (er) { toast(er.message || String(er), 'bad'); }
    finally { S.busy = false; if (btn && document.body.contains(btn)) btn.disabled = false; }
  });
  document.addEventListener('change', e => {
    const c = e.target.dataset.chg; if (!c) return;
    if (c === 'fsem') S.g.sem = e.target.value; if (c === 'fkelas') S.g.kelas = e.target.value;
    if (c === 'gdari') S.g.dari = e.target.value; if (c === 'ghingga') S.g.hingga = e.target.value; if (c === 'gcontoh') S.g.tanpaContoh = e.target.checked;
    render();
  });
  document.addEventListener('input', e => {
    if (e.target.dataset.inp === 'cari') { S.p.cari = e.target.value; const pos = e.target.selectionStart; render(); const n = document.querySelector('[data-inp=cari]'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }
    const fr = e.target.closest('form.rubrik'); if (fr) { let t = 0; RUBRIK.forEach(([k]) => t += +(fr.elements[k].value || 0)); fr.querySelector('[data-total]').textContent = 'Jumlah: ' + t + '/100'; }
  });
  /* seret dan lepas (Susun Ayat) */
  let seret = null;
  document.addEventListener('dragstart', e => { const c = e.target.closest('.chip[data-z]'); if (!c) return; seret = { z: c.dataset.z, pos: +c.dataset.pos }; e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', c.textContent); } catch (er) { /* */ } c.classList.add('drag'); });
  document.addEventListener('dragover', e => { if (seret && e.target.closest('.zone')) { e.preventDefault(); e.target.closest('.zone').classList.add('over'); } });
  document.addEventListener('dragleave', e => { const z = e.target.closest && e.target.closest('.zone'); if (z) z.classList.remove('over'); });
  document.addEventListener('drop', e => {
    const z = e.target.closest('.zone'); if (!seret || !z || !S.run) return; e.preventDefault();
    const it = S.run.items[S.run.i]; const src = seret.z === 'bank' ? it.bank : it.ans; const wi = src.splice(seret.pos, 1)[0];
    const dst = z.dataset.z === 'bank' ? it.bank : it.ans; const onChip = e.target.closest('.chip[data-z]');
    let at = dst.length; if (onChip && onChip.dataset.z === z.dataset.z) { at = +onChip.dataset.pos; if (src === dst && seret.pos < at) at--; const r = onChip.getBoundingClientRect(); if (e.clientX > r.left + r.width / 2) at++; }
    dst.splice(at, 0, wi); seret = null; render();
  });
  document.addEventListener('dragend', () => { seret = null; document.querySelectorAll('.drag,.over').forEach(x => x.classList.remove('drag', 'over')); });

  /* ---------- mula ---------- */
  (async () => {
    app.innerHTML = '<div class="loading">Memuatkan BINA AYAT PRO DIGITAL…</div>';
    try { await Store.init(); const u = await Store.semasa(); if (u) await selepasMasuk(u); else render(); }
    catch (e) { app.innerHTML = `<div class="wrap narrow"><section class="card"><h2>Aplikasi tidak dapat dimulakan</h2><p>${h(e.message)}</p><p class="muted">Semak tetapan dalam js/config.js.</p></section></div>`; }
  })();
})();
