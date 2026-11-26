/* BINA AYAT PRO DIGITAL — Lapisan data
   Satu API untuk dua mod:
   - SupabaseStore : pangkalan data berpusat (sistem rasmi)
   - DemoStore     : simpanan pelayar untuk percubaan sahaja */
(function () {
  const C = window.BAP_CONFIG || {};
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2));
  const now = () => new Date().toISOString();
  const normMatrik = s => String(s || '').trim().toUpperCase();
  const emailMatrik = m => normMatrik(m).toLowerCase().replace(/[^a-z0-9]/g, '') + '@' + (C.STUDENT_EMAIL_DOMAIN || 'pelajar.binaayatpro.app');
  const err = m => { const e = new Error(m); e.bap = true; return e; };

  /* ---------------- DEMO ---------------- */
  const KEY = 'bap_demo_v1';
  let mem = null;
  const blank = () => ({
    profiles: [{ id: 'guru-demo', nama: 'Guru Demo', no_matrik: null, email: 'guru@demo.my', semester: null, kelas: null, peranan: 'guru', aktif: true, pw: 'guru123', created_at: now() }],
    access_codes: [
      { kod: 'SVM1-DEMO', keterangan: 'Kod demo Semester 1', kelas: 'SVM 1 Demo', semester: 1, peranan: 'pelajar', aktif: true, had_guna: 200, bil_guna: 0, created_at: now() },
      { kod: 'SVM2-DEMO', keterangan: 'Kod demo Semester 2', kelas: 'SVM 2 Demo', semester: 2, peranan: 'pelajar', aktif: true, had_guna: 200, bil_guna: 0, created_at: now() },
      { kod: 'GURU-DEMO', keterangan: 'Kod pendaftaran guru (demo)', kelas: null, semester: null, peranan: 'guru', aktif: true, had_guna: 10, bil_guna: 0, created_at: now() }
    ],
    attempts: [], submissions: [], logs: [], session: null
  });
  const load = () => {
    if (mem) return mem;
    try { const raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : blank(); } catch (e) { mem = blank(); }
    return mem;
  };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* simpanan tidak tersedia: kekal dalam memori */ } };
  const pub = p => { if (!p) return null; const { pw, ...r } = p; return r; };

  const DemoStore = {
    mode: 'demo',
    async init() { load(); },
    async semasa() { const d = load(); return pub(d.profiles.find(p => p.id === d.session)); },
    async daftar({ nama, no_matrik, email, semester, kod, katalaluan }) {
      const d = load(); const k = d.access_codes.find(c => c.kod.toUpperCase() === String(kod).trim().toUpperCase());
      if (!k || !k.aktif) throw err('Kod akses tidak sah atau telah dinyahaktifkan.');
      if (k.had_guna && k.bil_guna >= k.had_guna) throw err('Kod akses ini telah mencapai had penggunaan.');
      if (String(katalaluan).length < 6) throw err('Kata laluan mesti sekurang-kurangnya 6 aksara.');
      const guru = k.peranan === 'guru';
      if (guru) { if (!email) throw err('Sila masukkan e-mel.'); if (d.profiles.some(p => (p.email || '').toLowerCase() === email.toLowerCase())) throw err('E-mel ini telah didaftarkan.'); }
      else if (d.profiles.some(p => p.no_matrik === normMatrik(no_matrik))) throw err('Nombor matrik ini telah didaftarkan.');
      const p = { id: uid(), nama: String(nama).trim(), no_matrik: guru ? null : normMatrik(no_matrik), email: guru ? email.trim().toLowerCase() : emailMatrik(no_matrik), semester: guru ? null : (k.semester || +semester), kelas: k.kelas || null, peranan: k.peranan, aktif: true, kod_akses: k.kod, pw: katalaluan, created_at: now() };
      d.profiles.push(p); k.bil_guna++; d.session = p.id; save(); return pub(p);
    },
    async masuk(pengenal, katalaluan) {
      const d = load(); const id = String(pengenal).trim();
      const p = d.profiles.find(x => id.includes('@') ? (x.email || '').toLowerCase() === id.toLowerCase() : x.no_matrik === normMatrik(id));
      if (!p || p.pw !== katalaluan) throw err('No. matrik/e-mel atau kata laluan tidak tepat.');
      if (!p.aktif) throw err('Akaun anda telah dinyahaktifkan. Sila hubungi guru.');
      d.session = p.id; save(); return pub(p);
    },
    async keluar() { const d = load(); d.session = null; save(); },
    async simpanCubaan(a) { const d = load(); const r = Object.assign({ id: uid(), user_id: d.session, created_at: now() }, a); d.attempts.push(r); save(); return r; },
    async cubaanSaya() { const d = load(); return d.attempts.filter(a => a.user_id === d.session); },
    async hantarAyat(s) { const d = load(); const r = Object.assign({ id: uid(), user_id: d.session, status: 'menunggu', created_at: now() }, s); d.submissions.push(r); save(); return r; },
    async ayatSaya() { const d = load(); return d.submissions.filter(a => a.user_id === d.session); },
    async senaraiProfil() { return load().profiles.map(pub); },
    async semuaCubaan() { return load().attempts.slice(); },
    async semuaAyat() { return load().submissions.slice(); },
    async semakAyat(id, patch) { const d = load(); const s = d.submissions.find(x => x.id === id); Object.assign(s, patch, { status: 'disemak', disemak_oleh: d.session, disemak_pada: now() }); save(); return s; },
    async senaraiKod() { return load().access_codes.slice(); },
    async simpanKod(c, baharu) {
      const d = load(); const kod = String(c.kod).trim().toUpperCase();
      if (!/^[A-Z0-9-]{4,30}$/.test(kod)) throw err('Kod mesti 4–30 aksara (huruf, nombor atau sengkang).');
      const ada = d.access_codes.find(x => x.kod === kod);
      if (baharu && ada) throw err('Kod ini sudah wujud.');
      if (ada) Object.assign(ada, c, { kod }); else d.access_codes.push(Object.assign({ bil_guna: 0, created_at: now() }, c, { kod }));
      save();
    },
    async kemaskiniProfil(id, patch) { const d = load(); Object.assign(d.profiles.find(p => p.id === id), patch); save(); },
    async catatLog(jenis) { const d = load(); if (!d.session) return; (d.logs = d.logs || []).push({ id: uid(), user_id: d.session, jenis, created_at: now() }); save(); },
    async semuaLog() { return (load().logs || []).slice(); },
    async padamCubaanUjian(user_id, jenis) { const d = load(); d.attempts = d.attempts.filter(a => !(a.user_id === user_id && a.jenis === jenis)); save(); },
    async sandaran() { const d = load(); return { dijana: now(), mod: 'demo', profiles: d.profiles.map(pub), access_codes: d.access_codes, attempts: d.attempts, submissions: d.submissions, usage_logs: d.logs || [] }; },
    async setSemula() { mem = blank(); save(); },
    async janaDataContoh() {
      const d = load(); const B = window.BANK;
      const nama = ['Ahmad Faiz bin Rosli', 'Nur Aina binti Hassan', 'Muhammad Haziq bin Ismail', 'Siti Nurul binti Abdullah', 'Amirul Hakim bin Zainal', 'Nurul Izzah binti Ramli', 'Mohd Danish bin Salleh', 'Farah Hani binti Yusof', 'Aiman Syafiq bin Kamal', 'Balqis binti Omar', 'Irfan bin Jamaludin', 'Hanis Sofea binti Ariff'];
      const rnd = (a, b) => a + Math.random() * (b - a);
      nama.forEach((n, i) => {
        const sem = (i % 4) + 1, id = uid(), kemahiran = rnd(0.3, 0.85);
        d.profiles.push({ id, nama: n, no_matrik: 'KVWT' + (24000 + i * 7), email: emailMatrik('KVWT' + (24000 + i * 7)), semester: sem, kelas: 'SVM ' + sem + ' Contoh', peranan: 'pelajar', aktif: true, pw: 'pelajar123', created_at: now(), contoh: true });
        const t0 = Date.now() - 30 * 864e5;
        const ujian = (jenis, k, hari) => {
          const qs = B.ujian[jenis].soalan; const but = qs.map(q => ({ q: q.id, t: q.t, b: Math.random() < k }));
          const m = but.filter(x => x.b).length * 4;
          d.attempts.push({ id: uid(), user_id: id, modul: 0, tahap: 0, jenis, markah: m, jumlah: 100, peratus: m, mata: 0, butiran: but, created_at: new Date(t0 + hari * 864e5).toISOString(), contoh: true });
        };
        ujian('pra', kemahiran, 0);
        (d.logs = d.logs || []).push({ id: uid(), user_id: id, jenis: 'daftar', created_at: new Date(t0).toISOString(), contoh: true });
        for (let s = 0; s < 8; s++) d.logs.push({ id: uid(), user_id: id, jenis: 'log_masuk', created_at: new Date(t0 + (2 + s * 3) * 864e5 - 36e5).toISOString(), contoh: true });
        for (let s = 0; s < 8; s++) {
          const m = [1, 2, 3, 5, 6][s % 5], t = 1 + (s > 4 ? 1 : 0), qs = B.modul[m].tahap[t].soalan.slice(0, 10);
          const k = Math.min(0.97, kemahiran + s * 0.03);
          const but = qs.map(q => ({ q: q.id, t: q.t, b: Math.random() < k })); const b = but.filter(x => x.b).length;
          d.attempts.push({ id: uid(), user_id: id, modul: m, tahap: t, jenis: 'latihan', markah: b, jumlah: qs.length, peratus: Math.round(b / qs.length * 100), mata: b * 10, butiran: but, created_at: new Date(t0 + (2 + s * 3) * 864e5).toISOString(), contoh: true });
        }
        if (i % 3 !== 2) ujian('pasca', Math.min(0.97, kemahiran + rnd(0.05, 0.2)), 28);
        if (i % 2 === 0) d.submissions.push({ id: uid(), user_id: id, soalan_id: 'm4t1q01', tahap: 1, tugasan: B.modul[4].tahap[1].soalan[0].arahan, ayat: i % 4 === 0 ? 'Juruteknik itu membaiki enjin kereta pelanggan.' : 'juruteknik membaiki kereta', semakan_auto: null, status: 'menunggu', created_at: new Date(t0 + 20 * 864e5).toISOString(), contoh: true });
      });
      save();
    }
  };

  /* ---------------- SUPABASE ---------------- */
  let sb = null, profil = null;
  const chk = ({ data, error }) => { if (error) throw err(terjemah(error.message)); return data; };
  const terjemah = m => {
    if (/Invalid login credentials/i.test(m)) return 'No. matrik/e-mel atau kata laluan tidak tepat.';
    if (/already registered|already exists/i.test(m)) return 'Akaun ini telah didaftarkan.';
    if (/KOD_TIDAK_SAH/.test(m)) return 'Kod akses tidak sah atau telah dinyahaktifkan.';
    if (/KOD_PENUH/.test(m)) return 'Kod akses ini telah mencapai had penggunaan.';
    if (/MATRIK_WUJUD/.test(m)) return 'Nombor matrik ini telah didaftarkan.';
    if (/Database error saving new user/i.test(m)) return 'Pendaftaran ditolak. Semak kod akses dan nombor matrik anda.';
    if (/email.*invalid|email_address_invalid/i.test(m)) return 'Format akaun tidak diterima oleh pelayan. Sila maklumkan kepada guru (tetapan STUDENT_EMAIL_DOMAIN).';
    if (/Password should be/i.test(m)) return 'Kata laluan mesti sekurang-kurangnya 6 aksara.';
    if (/duplicate key.*attempts/i.test(m)) return 'Ujian ini telah diduduki.';
    return m;
  };
  const muatSB = () => new Promise((res, rej) => {
    if (window.supabase) return res();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = res; s.onerror = () => rej(err('Gagal memuatkan pustaka Supabase. Semak sambungan Internet.'));
    document.head.appendChild(s);
  });
  const ambilProfil = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return (profil = null);
    profil = chk(await sb.from('profiles').select('*').eq('id', user.id).single());
    if (!profil.aktif) { await sb.auth.signOut(); profil = null; throw err('Akaun anda telah dinyahaktifkan. Sila hubungi guru.'); }
    return profil;
  };

  const SupabaseStore = {
    mode: 'supabase',
    async init() { await muatSB(); sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY, { auth: { persistSession: true } }); },
    async semasa() { try { return await ambilProfil(); } catch (e) { return null; } },
    async daftar({ nama, no_matrik, email, semester, kod, katalaluan }) {
      const guru = !!email;
      const res = chk(await sb.auth.signUp({
        email: guru ? email.trim().toLowerCase() : emailMatrik(no_matrik), password: katalaluan,
        options: { data: { nama: String(nama).trim(), no_matrik: guru ? null : normMatrik(no_matrik), semester: guru ? null : +semester, kod_akses: String(kod).trim().toUpperCase() } }
      }));
      if (!res.session) throw err('Akaun dicipta tetapi pengesahan e-mel diaktifkan di Supabase. Sila matikan "Confirm email" (rujuk Panduan Deployment) dan log masuk semula.');
      return ambilProfil();
    },
    async masuk(pengenal, katalaluan) {
      const id = String(pengenal).trim();
      chk(await sb.auth.signInWithPassword({ email: id.includes('@') ? id.toLowerCase() : emailMatrik(id), password: katalaluan }));
      return ambilProfil();
    },
    async keluar() { await sb.auth.signOut(); profil = null; },
    async simpanCubaan(a) { return chk(await sb.from('attempts').insert(Object.assign({ user_id: profil.id }, a)).select().single()); },
    async cubaanSaya() { return chk(await sb.from('attempts').select('*').eq('user_id', profil.id).order('created_at')); },
    async hantarAyat(s) { return chk(await sb.from('submissions').insert(Object.assign({ user_id: profil.id }, s)).select().single()); },
    async ayatSaya() { return chk(await sb.from('submissions').select('*').eq('user_id', profil.id).order('created_at')); },
    async senaraiProfil() { return chk(await sb.from('profiles').select('*').order('nama')); },
    async semuaCubaan() {
      const out = []; for (let i = 0; ; i += 1000) { const r = chk(await sb.from('attempts').select('*').order('created_at').range(i, i + 999)); out.push(...r); if (r.length < 1000) break; }
      return out;
    },
    async semuaAyat() { return chk(await sb.from('submissions').select('*').order('created_at')); },
    async semakAyat(id, patch) { return chk(await sb.from('submissions').update(Object.assign({}, patch, { status: 'disemak', disemak_oleh: profil.id, disemak_pada: now() })).eq('id', id).select().single()); },
    async senaraiKod() { return chk(await sb.from('access_codes').select('*').order('created_at')); },
    async simpanKod(c, baharu) {
      const kod = String(c.kod).trim().toUpperCase();
      if (!/^[A-Z0-9-]{4,30}$/.test(kod)) throw err('Kod mesti 4–30 aksara (huruf, nombor atau sengkang).');
      const row = Object.assign({}, c, { kod }); delete row.bil_guna; delete row.created_at;
      if (baharu) chk(await sb.from('access_codes').insert(row)); else chk(await sb.from('access_codes').update(row).eq('kod', kod));
    },
    async kemaskiniProfil(id, patch) { chk(await sb.from('profiles').update(patch).eq('id', id)); },
    async catatLog(jenis) { if (!profil) return; try { await sb.from('usage_logs').insert({ user_id: profil.id, jenis }); } catch (e) { /* rekod log tidak menghalang penggunaan */ } },
    async semuaLog() {
      const out = []; for (let i = 0; ; i += 1000) { const { data, error } = await sb.from('usage_logs').select('*').order('created_at').range(i, i + 999); if (error) return out; out.push(...data); if (data.length < 1000) break; }
      return out;
    },
    async padamCubaanUjian(user_id, jenis) { chk(await sb.from('attempts').delete().eq('user_id', user_id).eq('jenis', jenis)); },
    async sandaran() {
      return { dijana: now(), mod: 'supabase', profiles: await this.senaraiProfil(), access_codes: await this.senaraiKod(), attempts: await this.semuaCubaan(), submissions: await this.semuaAyat(), usage_logs: await this.semuaLog() };
    }
  };

  window.Store = (C.SUPABASE_URL && C.SUPABASE_ANON_KEY) ? SupabaseStore : DemoStore;
})();
