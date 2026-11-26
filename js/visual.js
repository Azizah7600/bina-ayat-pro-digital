/* BINA AYAT PRO DIGITAL — Elemen visual "Futuristic 3D Creative Learning"
   Semua grafik dilukis dengan SVG asli (tiada imej luar). */
(function () {
  'use strict';
  let uidN = 0; const u = p => p + (++uidN);

  /* ---------- pembantu 3D ---------- */
  // Kiub isometri. (cx,cy) = bucu atas muka atas, s = saiz.
  function kiub(cx, cy, s, warna, huruf, hc) {
    const [t, l, r] = warna;
    const txt = huruf ? `<text transform="matrix(1,-0.5,0,1,${cx},${cy + s})" x="${s / 2}" y="${s * 0.78}" text-anchor="middle" font-size="${s * 0.62}" font-weight="800" fill="${hc || '#fff'}" font-family="Plus Jakarta Sans,sans-serif">${huruf}</text>` : '';
    return `<g><polygon points="${cx},${cy} ${cx + s},${cy + s * .5} ${cx},${cy + s} ${cx - s},${cy + s * .5}" fill="${t}"/>
      <polygon points="${cx - s},${cy + s * .5} ${cx},${cy + s} ${cx},${cy + 2 * s} ${cx - s},${cy + 1.5 * s}" fill="${l}"/>
      <polygon points="${cx},${cy + s} ${cx + s},${cy + s * .5} ${cx + s},${cy + 1.5 * s} ${cx},${cy + 2 * s}" fill="${r}"/>${txt}</g>`;
  }
  const BIRU = ['#8FB4FF', '#2F5BFF', '#1B3FC7'], UNGU = ['#C4A8FF', '#7C3AED', '#5B21B6'], CYAN = ['#A5F3FC', '#06B6D4', '#0E7490'], EMAS = ['#FBE6A6', '#E2B33C', '#B7881E'], NAVY = ['#3C4F86', '#16224F', '#0B1640'];

  // Kad perkataan 3D
  function kad(w, hgt, teks, bg1, bg2, tc) {
    const g = u('kg');
    return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>
      <rect x="6" y="9" width="${w}" height="${hgt}" rx="12" fill="#0B1640" opacity=".28"/>
      <rect x="0" y="0" width="${w}" height="${hgt}" rx="12" fill="url(#${g})"/>
      <rect x="0" y="0" width="${w}" height="${hgt * .42}" rx="12" fill="#fff" opacity=".16"/>
      <text x="${w / 2}" y="${hgt / 2 + 7}" text-anchor="middle" font-size="20" font-weight="800" fill="${tc || '#fff'}" font-family="Plus Jakarta Sans,sans-serif">${teks}</text>`;
  }

  /* ---------- elemen latar ---------- */
  const EL = {
    buku: () => { const a = u('b'), c = u('b'); return `<svg viewBox="0 0 200 130"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DCE6FF"/></linearGradient><linearGradient id="${c}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5B21B6"/><stop offset="1" stop-color="#2F5BFF"/></linearGradient></defs>
      <path d="M8 40 Q100 8 192 40 L192 112 Q100 84 8 112Z" fill="url(#${c})"/><path d="M14 30 Q58 14 100 34 L100 104 Q58 86 14 100Z" fill="url(#${a})"/><path d="M186 30 Q142 14 100 34 L100 104 Q142 86 186 100Z" fill="url(#${a})"/>
      <path d="M100 34 L100 104" stroke="#9DB4F5" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<path d="M28 ${44 + i * 13} Q58 ${34 + i * 13} 88 ${48 + i * 13}" stroke="#A8BDF0" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M112 ${48 + i * 13} Q142 ${34 + i * 13} 172 ${44 + i * 13}" stroke="#A8BDF0" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</svg>`; },
    pensel: () => { const a = u('p'); return `<svg viewBox="0 0 200 40"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBE6A6"/><stop offset=".5" stop-color="#E2B33C"/><stop offset="1" stop-color="#B7881E"/></linearGradient></defs>
      <rect x="30" y="8" width="130" height="24" fill="url(#${a})"/><rect x="160" y="8" width="16" height="24" fill="#C9D3EA"/><rect x="176" y="8" width="18" height="24" rx="6" fill="#A855F7"/><polygon points="30,8 4,20 30,32" fill="#F5D9A8"/><polygon points="12,16 4,20 12,24" fill="#16224F"/><rect x="30" y="8" width="130" height="5" fill="#fff" opacity=".35"/></svg>`; },
    pen: () => { const a = u('pn'); return `<svg viewBox="0 0 200 36"><defs><linearGradient id="${a}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5468B8"/><stop offset=".5" stop-color="#16224F"/><stop offset="1" stop-color="#0B1640"/></linearGradient></defs>
      <rect x="40" y="8" width="150" height="20" rx="10" fill="url(#${a})"/><polygon points="40,10 10,18 40,26" fill="#C9D3EA"/><polygon points="16,16 6,18 16,20" fill="#E2B33C"/><rect x="120" y="4" width="60" height="6" rx="3" fill="#22D3EE"/><rect x="48" y="10" width="136" height="4" rx="2" fill="#fff" opacity=".3"/></svg>`; },
    abc: () => `<svg viewBox="0 0 150 110">${kiub(38, 22, 30, BIRU, 'A')}${kiub(90, 4, 30, UNGU, 'B')}${kiub(108, 46, 30, EMAS, 'C', '#16224F')}</svg>`,
    kata1: () => `<svg viewBox="0 0 150 62">${kad(140, 52, 'Subjek', '#2F5BFF', '#7C3AED')}</svg>`,
    kata2: () => `<svg viewBox="0 0 160 62">${kad(150, 52, 'Predikat', '#06B6D4', '#2F5BFF')}</svg>`,
    kata3: () => `<svg viewBox="0 0 120 62">${kad(110, 52, 'meN-', '#FBE6A6', '#E2B33C', '#16224F')}</svg>`,
    kata4: () => `<svg viewBox="0 0 140 62">${kad(130, 52, 'S + P', '#7C3AED', '#C026D3')}</svg>`,
    kata5: () => `<svg viewBox="0 0 150 62">${kad(140, 52, 'FN + FK', '#16224F', '#3C4F86', '#F7E3A1')}</svg>`,
    tanda: (c) => { const a = u('t'); return `<svg viewBox="0 0 80 100"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A5F3FC"/><stop offset="1" stop-color="#7C3AED"/></linearGradient></defs><text x="44" y="84" text-anchor="middle" font-size="92" font-weight="800" fill="#0B1640" opacity=".25" font-family="Plus Jakarta Sans,sans-serif">${c}</text><text x="40" y="80" text-anchor="middle" font-size="92" font-weight="800" fill="url(#${a})" font-family="Plus Jakarta Sans,sans-serif">${c}</text></svg>`; },
    kiub: () => `<svg viewBox="0 0 80 90">${kiub(40, 4, 36, CYAN)}</svg>`,
    piramid: () => `<svg viewBox="0 0 100 90"><polygon points="50,4 6,80 50,66" fill="#A855F7"/><polygon points="50,4 94,80 50,66" fill="#5B21B6"/><polygon points="6,80 50,66 94,80 50,88" fill="#7C3AED" opacity=".6"/></svg>`,
    sfera: () => { const a = u('s'); return `<svg viewBox="0 0 100 100"><defs><radialGradient id="${a}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#8FB4FF"/><stop offset="1" stop-color="#1B3FC7"/></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#${a})"/></svg>`; },
    cincin: () => { const a = u('c'); return `<svg viewBox="0 0 140 80"><defs><linearGradient id="${a}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#E2B33C"/></linearGradient></defs><ellipse cx="70" cy="40" rx="58" ry="24" fill="none" stroke="url(#${a})" stroke-width="12"/><ellipse cx="70" cy="36" rx="58" ry="24" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/></svg>`; },
    bintang: () => `<svg viewBox="0 0 60 60"><path d="M30 2l7 19 21 1-16 13 6 21-18-12-18 12 6-21L2 22l21-1z" fill="#E2B33C"/><path d="M30 2l7 19-7 10z" fill="#fff" opacity=".35"/></svg>`
  };
  // [jenis, kiri%, atas%, lebar px, putaran, kelas animasi, hanya-desktop?]
  const SUSUN = [
    ['buku', 2, 84, 170, -8, 'f1'], ['abc', 84, 6, 150, 0, 'f2'], ['pensel', 60, 89, 180, -18, 'f3'], ['pen', 36, 93, 150, 14, 'f4', 1],
    ['kata1', 28, 2, 130, -6, 'f2', 1], ['kata2', 89, 40, 140, 8, 'f1'], ['kata3', 45, 12, 100, 10, 'f3', 1], ['kata4', 74, 92, 124, -4, 'f4', 1], ['kata5', 88, 66, 130, -10, 'f2', 1],
    ['tanda:?', 47, 32, 50, 12, 'f3', 1], ['tanda:!', 95, 24, 40, -10, 'f1'], ['tanda:,', 50, 60, 36, 0, 'f4', 1], ['tanda:.', 47, 80, 34, 0, 'f2', 1],
    ['kiub', 58, 3, 58, 0, 'f1', 1], ['piramid', 92, 88, 64, 0, 'f3'], ['sfera', 2, 6, 50, 0, 'f4'], ['cincin', 18, 94, 100, -10, 'f2', 1], ['bintang', 70, 14, 36, 0, 'f3'], ['bintang', 1, 50, 26, 0, 'f1', 1]
  ];
  function latar() {
    return `<div class="bg-grid"></div><div class="glow g1"></div><div class="glow g2"></div><div class="glow g3"></div>`
      + SUSUN.map(([k, x, y, w, r, f, d]) => { const [jenis, arg] = k.split(':'); return `<div class="fl ${f}${d ? ' d-only' : ''}" style="left:${x}%;top:${y}%;width:${w}px;--r:${r}deg">${EL[jenis](arg)}</div>`; }).join('');
  }

  /* ---------- ilustrasi hero: pelajar belajar ---------- */
  function heroPelajar() {
    const g = { p: u('h'), d: u('h'), s: u('h'), b: u('h'), l: u('h'), sk: u('h') };
    return `<svg class="hero-3d" viewBox="0 0 460 420" role="img" aria-label="Ilustrasi pelajar sedang belajar membina ayat bahasa Melayu">
    <defs>
      <linearGradient id="${g.p}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B6BFF"/><stop offset="1" stop-color="#7C3AED"/></linearGradient>
      <linearGradient id="${g.d}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7E3A1"/><stop offset="1" stop-color="#D9A93A"/></linearGradient>
      <linearGradient id="${g.s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#5B21B6"/></linearGradient>
      <linearGradient id="${g.b}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#DCE6FF"/></linearGradient>
      <linearGradient id="${g.l}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#2F5BFF"/></linearGradient>
      <radialGradient id="${g.sk}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#F3C796"/><stop offset="1" stop-color="#C98B55"/></radialGradient>
    </defs>
    <ellipse cx="230" cy="372" rx="190" ry="40" fill="#0B1640" opacity=".35"/>
    <path d="M40 330 L230 252 L420 330 L230 408Z" fill="url(#${g.p})"/>
    <path d="M40 330 L230 408 L230 422 L40 344Z" fill="#1B3FC7"/><path d="M230 408 L420 330 L420 344 L230 422Z" fill="#4C1D95"/>
    <path d="M40 330 L230 252 L420 330" fill="none" stroke="#A5F3FC" stroke-width="2" opacity=".7"/>
    ${[0, 1, 2, 3].map(i => `<path d="M${88 + i * 46} ${310 - i * 19} L${278 + i * 46} ${388 - i * 19}" stroke="#fff" opacity=".08" stroke-width="2"/>`).join('')}
    <!-- kerusi -->
    <path d="M118 236 l0 -78 q0 -10 10 -6 l40 16 l0 82z" fill="#16224F"/><path d="M110 250 L168 226 L212 246 L154 270Z" fill="#3C4F86"/><path d="M154 270 l0 52 M120 256 l0 50 M206 250 l0 46" stroke="#0B1640" stroke-width="7" stroke-linecap="round"/>
    <!-- badan pelajar -->
    <path d="M148 236 q-4 -64 40 -76 q44 -6 56 40 l6 50 q-50 22 -102 -14z" fill="url(#${g.s})"/>
    <path d="M158 196 q30 -16 70 -6" stroke="#fff" opacity=".18" stroke-width="10" fill="none" stroke-linecap="round"/>
    <!-- kepala bertudung -->
    <path d="M152 150 q0 -64 50 -66 q52 0 52 64 q0 28 -14 40 q-38 16 -76 0 q-12 -14 -12 -38z" fill="#16224F"/>
    <ellipse cx="204" cy="140" rx="31" ry="35" fill="url(#${g.sk})"/>
    <path d="M168 128 q6 -40 38 -40 q32 2 34 40 q-14 -22 -36 -22 q-22 0 -36 22z" fill="#16224F"/>
    <circle cx="193" cy="142" r="3.6" fill="#0B1640"/><circle cx="216" cy="142" r="3.6" fill="#0B1640"/><path d="M196 158 q8 6 16 0" stroke="#7A3E1D" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="186" cy="152" r="5" fill="#F29B8F" opacity=".45"/><circle cx="224" cy="152" r="5" fill="#F29B8F" opacity=".45"/>
    <!-- meja -->
    <path d="M196 226 L330 172 L420 212 L286 266Z" fill="url(#${g.d})"/><path d="M196 226 L286 266 L286 278 L196 238Z" fill="#B7881E"/><path d="M286 266 L420 212 L420 224 L286 278Z" fill="#9A7019"/>
    <path d="M212 240 l0 70 M282 276 l0 70 M404 224 l0 66" stroke="#9A7019" stroke-width="9" stroke-linecap="round"/>
    <!-- buku terbuka atas meja -->
    <path d="M238 214 Q262 188 296 196 L328 218 Q296 210 272 236Z" fill="url(#${g.b})"/><path d="M296 196 Q330 184 352 200 L360 226 Q340 212 328 218Z" fill="#EEF3FF"/>
    <path d="M296 196 L328 218" stroke="#9DB4F5" stroke-width="2"/>${[0, 1, 2].map(i => `<path d="M${254 + i * 6} ${212 - i * 6} q16 -10 32 -6" stroke="#9DB4F5" stroke-width="2.4" fill="none"/>`).join('')}
    <!-- tangan & pensel -->
    <path d="M232 214 q14 -8 30 -2" stroke="#C98B55" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M222 220 q-6 -24 6 -40" stroke="url(#${g.s})" stroke-width="18" stroke-linecap="round" fill="none"/>
    <g transform="rotate(-38 270 204)"><rect x="262" y="198" width="46" height="8" rx="2" fill="#E2B33C"/><polygon points="262,198 252,202 262,206" fill="#16224F"/><rect x="304" y="198" width="8" height="8" rx="2" fill="#A855F7"/></g>
    <!-- tablet di meja -->
    <path d="M336 186 L378 168 L404 180 L362 198Z" fill="#16224F"/><path d="M341 186 L377 171 L398 181 L362 196Z" fill="url(#${g.l})"/>
    <!-- elemen terapung -->
    <g class="hf1">${kiub(78, 84, 22, BIRU, 'A')}</g><g class="hf2">${kiub(118, 50, 18, EMAS, 'B', '#16224F')}</g><g class="hf3">${kiub(64, 150, 16, UNGU, 'C')}</g>
    <g class="hf2" transform="translate(300 60)">${kad(118, 42, 'Subjek', '#2F5BFF', '#7C3AED')}</g>
    <g class="hf3" transform="translate(338 116)">${kad(104, 42, 'Predikat', '#06B6D4', '#2F5BFF')}</g>
    <g class="hf1" transform="translate(262 4)"><path d="M0 14 q0 -14 14 -14 h118 q14 0 14 14 v20 q0 14 -14 14 h-96 l-18 14 l2 -14 h-6 q-14 0 -14 -14z" fill="#fff"/><text x="73" y="31" text-anchor="middle" font-size="15" font-weight="800" fill="#16224F" font-family="Plus Jakarta Sans,sans-serif">Ayat gramatis!</text></g>
    <g class="hf3" transform="translate(410 72)"><path d="M15 0l4 11 12 1-9 7 3 12-10-7-10 7 3-12-9-7 12-1z" fill="#E2B33C"/></g>
    <g class="hf1" transform="translate(30 240)"><path d="M11 0l3 8 9 1-7 5 2 9-7-5-7 5 2-9-7-5 9-1z" fill="#22D3EE"/></g>
    </svg>`;
  }

  /* ---------- ikon 3D modul ---------- */
  const MODUL = {
    1: { c1: '#2F5BFF', c2: '#06B6D4', nama: 'biru' },
    2: { c1: '#7C3AED', c2: '#A855F7', nama: 'ungu' },
    3: { c1: '#0891B2', c2: '#22D3EE', nama: 'cyan' },
    4: { c1: '#D9A93A', c2: '#F4CE6A', nama: 'emas', gelap: true },
    5: { c1: '#4338CA', c2: '#3B82F6', nama: 'indigo' },
    6: { c1: '#16224F', c2: '#6D28D9', nama: 'navy' }
  };
  function ikonModul(m) {
    const k = {
      1: `${kiub(30, 26, 20, BIRU, 'K')}${kiub(58, 12, 20, CYAN, 'A')}${kiub(58, 46, 20, EMAS, 'T', '#16224F')}`,
      2: `${kiub(28, 30, 22, BIRU, 'S')}${kiub(74, 30, 22, UNGU, 'P')}<path d="M44 74 h16" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
      3: `<g transform="translate(6 62)">${kad(52, 20, '', '#22D3EE', '#0891B2')}</g><g transform="translate(26 40)">${kad(52, 20, '', '#8FB4FF', '#2F5BFF')}</g><g transform="translate(46 18)">${kad(46, 20, '', '#FBE6A6', '#E2B33C')}</g>`,
      4: `<g transform="translate(10 22)">${kad(72, 58, '', '#FFFFFF', '#DCE6FF')}</g><path d="M22 44h44M22 56h36M22 68h24" stroke="#9DB4F5" stroke-width="4" stroke-linecap="round"/><g transform="rotate(-45 66 60)"><rect x="56" y="54" width="44" height="12" rx="2" fill="#7C3AED"/><polygon points="56,54 44,60 56,66" fill="#F5D9A8"/><polygon points="48,58 44,60 48,62" fill="#16224F"/></g>`,
      5: `<g transform="translate(8 44)">${kad(64, 30, '', '#FFFFFF', '#DCE6FF')}</g><circle cx="58" cy="40" r="20" fill="#A5F3FC" opacity=".55" stroke="#16224F" stroke-width="7"/><circle cx="52" cy="34" r="6" fill="#fff" opacity=".7"/><path d="M72 54 l16 16" stroke="#16224F" stroke-width="10" stroke-linecap="round"/><path d="M72 54 l16 16" stroke="#E2B33C" stroke-width="4" stroke-linecap="round"/>`,
      6: `<path d="M30 18h40v18q0 22-20 26q-20-4-20-26z" fill="#E2B33C"/><path d="M50 18h20v18q0 22-20 26z" fill="#B7881E"/><path d="M30 24h-10q0 18 14 20M70 24h10q0 18-14 20" stroke="#E2B33C" stroke-width="5" fill="none"/><rect x="44" y="62" width="12" height="12" fill="#B7881E"/><path d="M32 76h36l6 12H26z" fill="#F7E3A1"/><path d="M50 26l3 7 7 .5-5 4.5 1.5 7-6.5-4-6.5 4 1.5-7-5-4.5 7-.5z" fill="#fff"/>`
    }[m];
    return `<svg viewBox="0 0 100 96" width="84" height="80" aria-hidden="true" class="ik3d">${k}</svg>`;
  }

  /* ---------- tiga tahap ---------- */
  const TAHAP = {
    1: { nama: 'Tahap Asas', label: 'Bina Asas Penguasaan Bahasa', kelas: 't-asas' },
    2: { nama: 'Tahap Pertengahan', label: 'Tingkatkan Kemahiran Membina Ayat', kelas: 't-tengah' },
    3: { nama: 'Tahap Mahir', label: 'Kuasai Tatabahasa dan Ayat Gramatis', kelas: 't-mahir' }
  };
  function ikonTahap(t) {
    const k = {
      1: `<path d="M14 66 Q50 52 86 66 L86 78 Q50 66 14 78Z" fill="#2F5BFF"/><path d="M18 62 Q34 56 50 64 L50 76 Q34 68 18 74Z" fill="#fff"/><path d="M82 62 Q66 56 50 64 L50 76 Q66 68 82 74Z" fill="#EEF3FF"/><path d="M50 64 V36" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/><path d="M50 46 q-20 -2 -22 -20 q20 0 22 20z" fill="#22C55E"/><path d="M50 40 q18 -4 22 -22 q-20 2 -22 22z" fill="#4ADE80"/>`,
      2: `<path d="M50 8 q22 18 18 52 h-36 q-4 -34 18 -52z" fill="#fff"/><path d="M50 8 q22 18 18 52 h-18z" fill="#DCE6FF"/><circle cx="50" cy="34" r="9" fill="#22D3EE" stroke="#16224F" stroke-width="4"/><path d="M32 46 l-12 18 h14z M68 46 l12 18 h-14z" fill="#7C3AED"/><path d="M40 62 q10 28 20 0z" fill="#E2B33C"/><path d="M44 62 q6 16 12 0z" fill="#F97316"/>`,
      3: `<path d="M30 14h40v20q0 24-20 28q-20-4-20-28z" fill="#E2B33C"/><path d="M50 14h20v20q0 24-20 28z" fill="#B7881E"/><path d="M30 20h-12q0 20 16 22M70 20h12q0 20-16 22" stroke="#E2B33C" stroke-width="6" fill="none"/><rect x="43" y="62" width="14" height="10" fill="#B7881E"/><rect x="30" y="72" width="40" height="12" rx="3" fill="#16224F"/><path d="M50 22l3.5 8 8.5.6-6.5 5.4 2 8.4-7.5-4.6-7.5 4.6 2-8.4-6.5-5.4 8.5-.6z" fill="#fff"/>`
    }[t];
    return `<svg viewBox="0 0 100 92" width="76" height="70" aria-hidden="true">${k}</svg>`;
  }

  /* ---------- marquee ---------- */
  const IKON_MQ = ['<path d="M3 6q5-3 9 0v12q-4-3-9 0zM21 6q-5-3-9 0v12q4-3 9 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    '<path d="M4 20l3-1 12-12-2-2L5 17zM15 5l2-2 4 4-2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" fill="currentColor"/>',
    '<path d="M2 9l10-5 10 5-10 5zM6 11v5q6 4 12 0v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'];
  function marquee(teks) {
    const seg = teks.split('|').map(s => s.trim()).filter(Boolean);
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const grp = seg.map((s, i) => `<span class="mq-item"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${IKON_MQ[i % IKON_MQ.length]}</svg>${esc(s)}</span>`).join('');
    return `<div class="marquee" role="region" aria-label="Pengumuman: ${esc(seg.join('. '))}"><div class="mq-track"><div class="mq-group">${grp}</div><div class="mq-group" aria-hidden="true">${grp}</div></div></div>`;
  }

  /* ---------- animasi ganjaran ---------- */
  function ganjaran(host, label) {
    if (!host) return;
    const kurang = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const w = document.createElement('div'); w.className = 'reward'; w.setAttribute('aria-hidden', 'true');
    const warna = ['#E2B33C', '#22D3EE', '#7C3AED', '#2F5BFF', '#F472B6', '#4ADE80'];
    if (!kurang) for (let i = 0; i < 18; i++) {
      const s = document.createElement('i'); const a = (i / 18) * Math.PI * 2, d = 70 + Math.random() * 70;
      s.style.setProperty('--x', Math.cos(a) * d + 'px'); s.style.setProperty('--y', Math.sin(a) * d - 30 + 'px');
      s.style.background = warna[i % warna.length]; s.style.animationDelay = (Math.random() * 0.08) + 's';
      if (i % 3 === 0) s.className = 'st'; w.appendChild(s);
    }
    const b = document.createElement('b'); b.textContent = label || 'Hebat!'; w.appendChild(b);
    host.appendChild(w); setTimeout(() => w.remove(), 1300);
  }

  window.VIS = { latar, heroPelajar, ikonModul, MODUL, ikonTahap, TAHAP, marquee, ganjaran };
})();
