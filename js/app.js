/* ==========================================================
   RamaTime — المنطق المشترك لكل الصفحات
   (بحث • تسجيل دخول • قائمتي • صفحة التفاصيل)
   كل البيانات تُحفظ في المتصفح (localStorage) بدون خادم.
   ========================================================== */
(function () {
  'use strict';

  var DATA = window.RT_ANIME || [];
  var PAGES = window.RT_PAGES || {};
  var BY_ID = {};
  DATA.forEach(function (a) { BY_ID[a.id] = a; });

  /* ---------- أدوات صغيرة ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icons() { if (window.lucide && window.lucide.createIcons) { try { window.lucide.createIcons(); } catch (e) {} } }
  function typeLabel(a) { return a.type === 'movie' ? 'فيلم' : 'مسلسل'; }
  function fmtRating(a) { return Number(a.rating).toFixed(1); }

  /* تخزين آمن (مع بديل بالذاكرة لو كان localStorage محظورًا) */
  var mem = {};
  var Store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; }
    },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} delete mem[k]; }
  };

  function emit() { document.dispatchEvent(new CustomEvent('rt:change')); }

  /* ---------- رسائل منبثقة ---------- */
  function toast(msg, kind) {
    var wrap = $('.toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
    var t = document.createElement('div');
    t.className = 'toast' + (kind ? ' ' + kind : '');
    t.textContent = msg;
    wrap.appendChild(t);
    setTimeout(function () { t.classList.add('hide'); setTimeout(function () { t.remove(); }, 300); }, 2400);
  }

  /* ==========================================================
     الحسابات (تسجيل الدخول)
     ========================================================== */
  var USERS_KEY = 'rt_users', SESSION_KEY = 'rt_session';

  function hashPw(pw, salt) {
    var str = salt + ':' + pw;
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
      });
    }
    var h1 = 5381, h2 = 52711;
    for (var i = 0; i < str.length; i++) { var c = str.charCodeAt(i); h1 = (h1 * 33) ^ c; h2 = (h2 * 31 + c) | 0; }
    return Promise.resolve('x' + (h1 >>> 0).toString(16) + (h2 >>> 0).toString(16));
  }
  function users() { return Store.get(USERS_KEY, []); }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }

  var Auth = {
    current: function () {
      var email = Store.get(SESSION_KEY, null);
      if (!email) return null;
      var u = users().filter(function (x) { return x.email === email; })[0];
      return u ? { name: u.name, email: u.email } : null;
    },
    register: function (name, email, pw) {
      email = email.trim().toLowerCase();
      if (users().some(function (u) { return u.email === email; })) {
        return Promise.reject(new Error('هذا البريد مسجّل مسبقًا، جرّب تسجيل الدخول.'));
      }
      var salt = Math.random().toString(36).slice(2);
      return hashPw(pw, salt).then(function (h) {
        var list = users();
        list.push({ name: name.trim(), email: email, salt: salt, hash: h, created: Date.now() });
        Store.set(USERS_KEY, list);
        Auth._start(email);
      });
    },
    login: function (email, pw) {
      email = email.trim().toLowerCase();
      var u = users().filter(function (x) { return x.email === email; })[0];
      if (!u) return Promise.reject(new Error('لا يوجد حساب بهذا البريد.'));
      return hashPw(pw, u.salt).then(function (h) {
        if (h !== u.hash) throw new Error('كلمة المرور غير صحيحة.');
        Auth._start(email);
      });
    },
    _start: function (email) {
      /* دمج قائمة الزائر في قائمة الحساب */
      var guest = Store.get('rt_wl_guest', []);
      Store.set(SESSION_KEY, email);
      if (guest.length) {
        var mine = Store.get('rt_wl_u:' + email, []);
        guest.forEach(function (g) { if (!mine.some(function (m) { return m.id === g.id; })) mine.push(g); });
        Store.set('rt_wl_u:' + email, mine);
        Store.del('rt_wl_guest');
      }
      emit();
    },
    logout: function () { Store.del(SESSION_KEY); emit(); }
  };
  function userKey() { var u = Auth.current(); return u ? 'u:' + u.email : 'guest'; }

  /* ==========================================================
     قائمتي
     ========================================================== */
  var WL = {
    key: function () { return 'rt_wl_' + userKey(); },
    all: function () {
      var raw = Store.get(WL.key(), []);
      /* دعم الصيغة القديمة (مصفوفة نصوص) */
      return raw.map(function (x) { return typeof x === 'string' ? { id: x, t: 0 } : x; })
                .filter(function (x) { return BY_ID[x.id]; });
    },
    has: function (id) { return WL.all().some(function (x) { return x.id === id; }); },
    add: function (id) { var l = WL.all(); if (!WL.has(id)) { l.push({ id: id, t: Date.now() }); Store.set(WL.key(), l); emit(); } },
    remove: function (id) { Store.set(WL.key(), WL.all().filter(function (x) { return x.id !== id; })); emit(); },
    toggle: function (id) {
      if (WL.has(id)) { WL.remove(id); return false; }
      WL.add(id); return true;
    },
    clear: function () { Store.set(WL.key(), []); emit(); }
  };

  /* تقدّم المشاهدة */
  var Prog = {
    key: function () { return 'rt_prog_' + userKey(); },
    get: function (id) { var all = Store.get(Prog.key(), {}); return all[id] || { last: 0, seen: [] }; },
    mark: function (id, ep) {
      var all = Store.get(Prog.key(), {});
      var p = all[id] || { last: 0, seen: [] };
      p.last = ep;
      if (p.seen.indexOf(ep) < 0) p.seen.push(ep);
      all[id] = p; Store.set(Prog.key(), all);
    }
  };

  /* ==========================================================
     البحث
     ========================================================== */
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
      .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  }
  DATA.forEach(function (a) {
    a._t = norm(a.title); a._a = norm(a.ar);
    a._all = norm([a.title, a.ar, a.tags || '', a.genres.join(' '), a.year, a.studio || '',
      a.type === 'movie' ? 'فيلم افلام movie movies' : 'مسلسل مسلسلات انمي series anime'].join(' '));
  });

  function searchAnime(q, filter) {
    var nq = norm(q);
    if (!nq) return [];
    var toks = nq.split(' ');
    return DATA.map(function (a) {
      if (filter && filter !== 'all' && a.type !== filter) return null;
      var ok = toks.every(function (t) { return a._all.indexOf(t) > -1; });
      if (!ok) return null;
      var s = 10;
      if (a._t.indexOf(nq) === 0 || a._a.indexOf(nq) === 0) s = 100;
      else if (a._t.indexOf(nq) > -1 || a._a.indexOf(nq) > -1) s = 60;
      return { a: a, s: s + a.rating / 10 };
    }).filter(Boolean).sort(function (x, y) { return y.s - x.s; }).map(function (x) { return x.a; });
  }

  function setupSearch() {
    var input = $('#search-input');
    if (!input) return;
    var box = input.closest('.search-box');
    var dd = document.createElement('div');
    dd.className = 'search-dropdown'; dd.hidden = true;
    dd.setAttribute('role', 'listbox');
    box.appendChild(dd);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-label', 'بحث');
    var active = -1, items = [];

    function close() { dd.hidden = true; active = -1; }
    function render() {
      var q = input.value;
      if (!norm(q)) { close(); return; }
      items = searchAnime(q).slice(0, 6);
      if (!items.length) {
        dd.innerHTML = '<div class="sd-empty">لا توجد نتائج لـ «' + esc(q.trim()) + '»</div>';
      } else {
        dd.innerHTML = items.map(function (a, i) {
          return '<a class="sd-item" role="option" data-i="' + i + '" href="anime.html?id=' + encodeURIComponent(a.id) + '">' +
            '<img src="' + esc(a.poster) + '" alt="" loading="lazy">' +
            '<span class="sd-text"><b>' + esc(a.title) + '</b><small>' + esc(a.ar) + ' • ' + typeLabel(a) + ' • ' + a.year + '</small></span>' +
            '<span class="sd-rate">★ ' + fmtRating(a) + '</span></a>';
        }).join('') + '<a class="sd-all" href="search.html?q=' + encodeURIComponent(q.trim()) + '">عرض كل النتائج</a>';
      }
      dd.hidden = false; active = -1;
    }
    function go() {
      var q = input.value.trim();
      if (!q) { input.focus(); return; }
      if (active >= 0 && items[active]) { location.href = 'anime.html?id=' + encodeURIComponent(items[active].id); return; }
      location.href = 'search.html?q=' + encodeURIComponent(q);
    }
    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      var els = $$('.sd-item', dd);
      if (e.key === 'ArrowDown' && els.length) { e.preventDefault(); active = (active + 1) % els.length; }
      else if (e.key === 'ArrowUp' && els.length) { e.preventDefault(); active = (active - 1 + els.length) % els.length; }
      else if (e.key === 'Enter') { e.preventDefault(); go(); return; }
      else if (e.key === 'Escape') { close(); input.blur(); return; }
      else return;
      els.forEach(function (el, i) { el.classList.toggle('active', i === active); });
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) close(); });
    var icon = $('.search-icon', box);
    if (icon) { icon.style.cursor = 'pointer'; icon.style.pointerEvents = 'auto'; icon.addEventListener('click', go); }
  }

  /* ==========================================================
     البطاقات
     ========================================================== */
  function cardHTML(a, mode) {
    var added = WL.has(a.id);
    var btn = mode === 'watchlist'
      ? '<button class="add-watchlist-btn remove" data-wl="' + esc(a.id) + '" data-mode="remove">إزالة من القائمة</button>'
      : '<button class="add-watchlist-btn' + (added ? ' added' : '') + '" data-wl="' + esc(a.id) + '">' + (added ? '✓ في قائمتي' : 'إضافة لقائمتي') + '</button>';
    return '<div class="movie-card" data-id="' + esc(a.id) + '" data-title="' + esc(a.title.toLowerCase()) + '" data-category="' + (a.type === 'movie' ? 'movies' : 'series') + '">' +
      '<div class="movie-poster"><img src="' + esc(a.poster) + '" alt="' + esc(a.title) + '" loading="lazy">' +
      '<div class="movie-overlay"><button class="play-btn" data-watch="' + esc(a.id) + '" aria-label="مشاهدة ' + esc(a.title) + '"><i data-lucide="play"></i></button></div>' +
      '<span class="movie-rating">★ ' + fmtRating(a) + '</span></div>' +
      '<div class="movie-info"><h3>' + esc(a.title) + '</h3>' +
      '<p>' + esc(a.genres.slice(0, 2).join('، ')) + ' • ' + a.year + '</p>' + btn + '</div></div>';
  }
  function renderGrid(el, list, mode) {
    el.innerHTML = list.map(function (a) { return cardHTML(a, mode); }).join('');
    icons();
  }
  function listFor(name) { return (PAGES[name] || []).map(function (id) { return BY_ID[id]; }).filter(Boolean); }

  /* مزامنة أزرار القائمة والعدّاد */
  function syncWatchlistUI() {
    var count = WL.all().length;
    var badge = $('#watchlist-count');
    if (badge) { badge.textContent = count; badge.classList.toggle('empty', count === 0); }
    $$('[data-wl]').forEach(function (el) {
      if (el.dataset.mode === 'remove') return;
      var on = WL.has(el.dataset.wl);
      el.classList.toggle('added', on);
      var label = $('.wl-text', el);
      if (label) label.textContent = on ? (el.dataset.on || 'في قائمتك ✓') : (el.dataset.off || 'أضف لقائمتي');
      else if (el.classList.contains('add-watchlist-btn')) el.textContent = on ? '✓ في قائمتي' : 'إضافة لقائمتي';
    });
  }

  /* ==========================================================
     النوافذ المنبثقة + تسجيل الدخول
     ========================================================== */
  function openModal(html, cls) {
    closeModal();
    var bd = document.createElement('div');
    bd.className = 'modal-backdrop';
    bd.innerHTML = '<div class="modal ' + (cls || '') + '" role="dialog" aria-modal="true">' +
      '<button class="modal-close" aria-label="إغلاق">×</button>' + html + '</div>';
    document.body.appendChild(bd);
    document.body.classList.add('modal-open');
    bd.addEventListener('mousedown', function (e) { if (e.target === bd) closeModal(); });
    $('.modal-close', bd).addEventListener('click', closeModal);
    requestAnimationFrame(function () { bd.classList.add('show'); });
    return bd;
  }
  function closeModal() {
    var bd = $('.modal-backdrop');
    if (bd) bd.remove();
    document.body.classList.remove('modal-open');
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeUserMenu(); } });

  function confirmBox(msg, okText) {
    return new Promise(function (resolve) {
      var bd = openModal('<h3 class="modal-title">تأكيد</h3><p class="modal-text">' + esc(msg) + '</p>' +
        '<div class="modal-actions"><button class="btn btn-secondary" data-no>إلغاء</button><button class="btn btn-primary" data-yes>' + esc(okText || 'تأكيد') + '</button></div>', 'small');
      $('[data-yes]', bd).onclick = function () { closeModal(); resolve(true); };
      $('[data-no]', bd).onclick = function () { closeModal(); resolve(false); };
      $('.modal-close', bd).addEventListener('click', function () { resolve(false); });
    });
  }

  function openAuth(tab) {
    var bd = openModal(
      '<div class="auth-brand">Rama<span>Time</span></div>' +
      '<div class="auth-tabs"><button data-tab="login">تسجيل الدخول</button><button data-tab="register">حساب جديد</button></div>' +
      '<form class="auth-form" id="form-login" novalidate>' +
        '<label>البريد الإلكتروني<input type="email" name="email" autocomplete="email" placeholder="name@example.com" required></label>' +
        '<label>كلمة المرور<span class="pw"><input type="password" name="password" autocomplete="current-password" required><button type="button" class="pw-toggle" aria-label="إظهار كلمة المرور">👁</button></span></label>' +
        '<div class="form-error" aria-live="polite"></div>' +
        '<button class="btn btn-primary auth-submit" type="submit">دخول</button>' +
      '</form>' +
      '<form class="auth-form" id="form-register" novalidate hidden>' +
        '<label>الاسم<input type="text" name="name" autocomplete="name" placeholder="اسمك" required></label>' +
        '<label>البريد الإلكتروني<input type="email" name="email" autocomplete="email" placeholder="name@example.com" required></label>' +
        '<label>كلمة المرور<span class="pw"><input type="password" name="password" autocomplete="new-password" placeholder="6 أحرف على الأقل" required><button type="button" class="pw-toggle" aria-label="إظهار كلمة المرور">👁</button></span></label>' +
        '<label>تأكيد كلمة المرور<input type="password" name="confirm" autocomplete="new-password" required></label>' +
        '<div class="form-error" aria-live="polite"></div>' +
        '<button class="btn btn-primary auth-submit" type="submit">إنشاء الحساب</button>' +
      '</form>' +
      '<p class="auth-note">الحسابات تُحفظ على هذا الجهاز فقط (نسخة تجريبية بدون خادم).</p>', 'auth');

    function show(t) {
      $$('.auth-tabs button', bd).forEach(function (b) { b.classList.toggle('active', b.dataset.tab === t); });
      $('#form-login', bd).hidden = t !== 'login';
      $('#form-register', bd).hidden = t !== 'register';
      var f = $(t === 'login' ? '#form-login input' : '#form-register input', bd);
      if (f) setTimeout(function () { f.focus(); }, 30);
    }
    $$('.auth-tabs button', bd).forEach(function (b) { b.onclick = function () { show(b.dataset.tab); }; });
    $$('.pw-toggle', bd).forEach(function (b) {
      b.onclick = function () { var i = b.previousElementSibling; i.type = i.type === 'password' ? 'text' : 'password'; };
    });

    function fail(form, msg) { $('.form-error', form).textContent = msg; }
    function busy(form, on) { var s = $('.auth-submit', form); s.disabled = on; }

    $('#form-login', bd).addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, email = f.email.value, pw = f.password.value;
      if (!validEmail(email.trim())) return fail(f, 'أدخل بريدًا إلكترونيًا صحيحًا.');
      if (!pw) return fail(f, 'أدخل كلمة المرور.');
      busy(f, true); fail(f, '');
      Auth.login(email, pw).then(function () {
        closeModal(); toast('أهلًا بعودتك، ' + Auth.current().name + ' 👋', 'ok');
      }).catch(function (err) { fail(f, err.message); busy(f, false); });
    });
    $('#form-register', bd).addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, name = f.name.value.trim(), email = f.email.value, pw = f.password.value;
      if (name.length < 2) return fail(f, 'الاسم يجب أن يكون حرفين على الأقل.');
      if (!validEmail(email.trim())) return fail(f, 'أدخل بريدًا إلكترونيًا صحيحًا.');
      if (pw.length < 6) return fail(f, 'كلمة المرور يجب ألا تقل عن 6 أحرف.');
      if (pw !== f.confirm.value) return fail(f, 'كلمتا المرور غير متطابقتين.');
      busy(f, true); fail(f, '');
      Auth.register(name, email, pw).then(function () {
        closeModal(); toast('تم إنشاء حسابك، مرحبًا ' + name + ' 🎉', 'ok');
      }).catch(function (err) { fail(f, err.message); busy(f, false); });
    });
    show(tab || 'login');
  }

  /* قائمة المستخدم تحت الصورة الرمزية */
  var userMenu = null;
  function closeUserMenu() { if (userMenu) { userMenu.remove(); userMenu = null; } }
  function toggleUserMenu(anchor) {
    if (userMenu) return closeUserMenu();
    var u = Auth.current();
    userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = '<div class="um-head"><b>' + esc(u.name) + '</b><small>' + esc(u.email) + '</small></div>' +
      '<a href="watchlist.html">قائمتي (' + WL.all().length + ')</a><button data-logout>تسجيل الخروج</button>';
    anchor.parentNode.appendChild(userMenu);
    $('[data-logout]', userMenu).onclick = function () { Auth.logout(); closeUserMenu(); toast('تم تسجيل الخروج'); };
  }
  function syncAuthUI() {
    var av = $('#login-trigger');
    if (!av) return;
    var u = Auth.current();
    av.classList.toggle('logged', !!u);
    av.textContent = u ? (u.name.trim().charAt(0).toUpperCase() || 'R') : 'R';
    av.title = u ? u.name : 'تسجيل الدخول';
    av.setAttribute('role', 'button'); av.setAttribute('tabindex', '0');
  }
  function setupAuthUI() {
    var av = $('#login-trigger');
    if (!av) return;
    function act(e) { e.stopPropagation(); if (Auth.current()) toggleUserMenu(av); else openAuth('login'); }
    av.addEventListener('click', act);
    av.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(e); } });
    document.addEventListener('click', function (e) { if (userMenu && !userMenu.contains(e.target)) closeUserMenu(); });
  }

  /* ==========================================================
     أحداث عامة: القائمة + الانتقال لصفحة العمل
     ========================================================== */
  document.addEventListener('click', function (e) {
    var wl = e.target.closest('[data-wl]');
    if (wl) {
      e.preventDefault(); e.stopPropagation();
      var id = wl.dataset.wl, a = BY_ID[id];
      if (wl.dataset.mode === 'remove') { WL.remove(id); toast('أُزيل «' + a.title + '» من قائمتك'); return; }
      var on = WL.toggle(id);
      toast(on ? 'أُضيف «' + a.title + '» إلى قائمتك' : 'أُزيل «' + a.title + '» من قائمتك', on ? 'ok' : '');
      return;
    }
    var w = e.target.closest('[data-watch]');
    if (w) { e.preventDefault(); location.href = 'anime.html?id=' + encodeURIComponent(w.dataset.watch) + '&play=1'; return; }
    var card = e.target.closest('.movie-card[data-id]');
    if (card) location.href = 'anime.html?id=' + encodeURIComponent(card.dataset.id);
  });
  document.addEventListener('rt:change', function () { syncWatchlistUI(); syncAuthUI(); });

  /* ==========================================================
     الصفحات
     ========================================================== */
  /* شريط تصنيفات يفلتر الشبكة */
  function genreChips(container, grid, list) {
    var count = {};
    list.forEach(function (a) { a.genres.forEach(function (g) { count[g] = (count[g] || 0) + 1; }); });
    var top = Object.keys(count).sort(function (x, y) { return count[y] - count[x]; }).slice(0, 8);
    container.innerHTML = '<button class="chip active" data-g="">الكل</button>' +
      top.map(function (g) { return '<button class="chip" data-g="' + esc(g) + '">' + esc(g) + '</button>'; }).join('');
    container.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', container).forEach(function (c) { c.classList.toggle('active', c === b); });
      var g = b.dataset.g;
      renderGrid(grid, g ? list.filter(function (a) { return a.genres.indexOf(g) > -1; }) : list);
    });
  }

  function pageList() {
    $$('[data-list]').forEach(function (el) {
      var list = listFor(el.dataset.list);
      var limit = parseInt(el.dataset.limit, 10);
      if (limit) list = list.slice(0, limit);
      renderGrid(el, list);
      var chips = $('[data-chips="' + el.dataset.list + '"]');
      if (chips) genreChips(chips, el, list);
    });
  }

  function pageHome() {
    var f = BY_ID[PAGES.featured];
    var watch = $('#hero-watch'), add = $('#hero-wl');
    if (f && watch) watch.addEventListener('click', function () { location.href = 'anime.html?id=' + encodeURIComponent(f.id) + '&play=1'; });
    if (f && add) { add.dataset.wl = f.id; add.dataset.on = 'في قائمتك ✓'; add.dataset.off = 'أضف للقائمة'; }
    var t = $('#hero-title');
    if (f && t) { var s = $('#hero-sub'); if (s) s.textContent = f.title + ' • ' + f.year + ' • ★ ' + fmtRating(f); }
  }

  /* ---------- قائمتي ---------- */
  function pageWatchlist() {
    var grid = $('#wl-grid'), empty = $('#wl-empty'), count = $('#wl-total'), banner = $('#wl-guest');
    var filter = 'all', sort = 'recent';
    function render() {
      var items = WL.all();
      var total = items.length;
      var rows = items.map(function (x) { return { a: BY_ID[x.id], t: x.t }; });
      if (filter !== 'all') rows = rows.filter(function (r) { return r.a.type === filter; });
      rows.sort(function (p, q) {
        if (sort === 'name') return p.a.title.localeCompare(q.a.title);
        if (sort === 'rating') return q.a.rating - p.a.rating;
        return q.t - p.t;
      });
      count.textContent = total + (total === 1 ? ' عمل' : ' أعمال');
      $('#wl-tools').hidden = total === 0;
      banner.hidden = !!Auth.current() || total === 0;
      empty.hidden = rows.length > 0;
      if (total > 0 && rows.length === 0) {
        $('#wl-empty-title').textContent = 'لا توجد أعمال في هذا التصنيف';
        $('#wl-empty-text').textContent = 'جرّب اختيار تصنيف آخر.';
        $('#wl-empty-cta').hidden = true;
      } else if (total === 0) {
        $('#wl-empty-title').textContent = 'قائمتك فارغة حتى الآن';
        $('#wl-empty-text').textContent = 'اضغط «إضافة لقائمتي» على أي أنمي يعجبك وسيظهر هنا.';
        $('#wl-empty-cta').hidden = false;
      }
      renderGrid(grid, rows.map(function (r) { return r.a; }), 'watchlist');
    }
    $$('#wl-filters .chip').forEach(function (b) {
      b.onclick = function () {
        filter = b.dataset.f;
        $$('#wl-filters .chip').forEach(function (c) { c.classList.toggle('active', c === b); });
        render();
      };
    });
    $('#wl-sort').onchange = function (e) { sort = e.target.value; render(); };
    $('#wl-clear').onclick = function () {
      confirmBox('هل تريد حذف كل الأعمال من قائمتك؟', 'حذف الكل').then(function (ok) { if (ok) { WL.clear(); toast('تم مسح القائمة'); } });
    };
    $('#wl-login').onclick = function () { openAuth('login'); };
    document.addEventListener('rt:change', render);
    render();
  }

  /* ---------- نتائج البحث ---------- */
  function pageSearch() {
    var params = new URLSearchParams(location.search);
    var q = (params.get('q') || '').trim();
    var filter = 'all';
    var input = $('#search-input');
    if (input) input.value = q;
    function render() {
      var res = q ? searchAnime(q, filter) : [];
      $('#sr-title').textContent = q ? 'نتائج البحث عن «' + q + '»' : 'البحث';
      $('#sr-count').textContent = q ? res.length + (res.length === 1 ? ' نتيجة' : ' نتائج') : 'اكتب اسم أنمي أو تصنيفًا في مربع البحث.';
      var grid = $('#sr-grid'), empty = $('#sr-empty');
      empty.hidden = !q || res.length > 0;
      $('#sr-filters').hidden = !q;
      if (q && !res.length) {
        $('#sr-empty-text').textContent = 'لم نجد «' + q + '». جرّب كلمة أخرى أو اسمًا بالإنجليزية أو تصنيفًا مثل: أكشن، رومانسي.';
      }
      renderGrid(grid, res);
      if (!q) {
        var sug = DATA.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 8);
        $('#sr-sug').hidden = false; renderGrid($('#sr-sug-grid'), sug);
      } else $('#sr-sug').hidden = true;
    }
    $$('#sr-filters .chip').forEach(function (b) {
      b.onclick = function () {
        filter = b.dataset.f;
        $$('#sr-filters .chip').forEach(function (c) { c.classList.toggle('active', c === b); });
        render();
      };
    });
    if (q) document.title = 'بحث: ' + q + ' - RamaTime';
    render();
  }

  /* ---------- صفحة العمل ---------- */
  function pageAnime() {
    var root = $('#anime-root');
    var params = new URLSearchParams(location.search);
    var a = BY_ID[params.get('id')];
    if (!a) {
      root.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><h2>لم نجد هذا العمل</h2>' +
        '<p>ربما الرابط غير صحيح أو أن العمل غير متوفر.</p><a class="btn btn-primary" href="index.html">العودة للرئيسية</a></div>';
      return;
    }
    document.title = a.title + ' - RamaTime';
    var isSeries = a.type === 'series';
    var epMin = a.epMin || 24;
    var prog = Prog.get(a.id);
    var cur = prog.last || 1;
    var shown = 24;

    var epText = isSeries ? (a.episodes + (a.epPlus ? '+' : '') + ' حلقة') : (a.duration + ' دقيقة');
    var info = [
      ['النوع', typeLabel(a)],
      ['سنة العرض', a.year],
      [isSeries ? 'عدد الحلقات' : 'المدة', epText + (a.note ? ' (' + a.note + ')' : '')],
      ['الحالة', a.status],
      a.studio ? ['الاستوديو', a.studio] : null,
      ['التقييم', '★ ' + fmtRating(a) + ' / 10'],
      ['التصنيفات', a.genres.join('، ')]
    ].filter(Boolean);

    root.innerHTML =
      '<div class="detail-backdrop" style="background-image:url(\'' + esc(a.poster) + '\')"></div>' +
      '<section class="detail-hero">' +
        '<div class="detail-poster"><img src="' + esc(a.poster) + '" alt="' + esc(a.title) + '"></div>' +
        '<div class="detail-main">' +
          '<span class="badge">' + typeLabel(a) + '</span>' +
          '<h1>' + esc(a.title) + '</h1>' +
          '<div class="detail-ar">' + esc(a.ar) + '</div>' +
          '<div class="detail-meta"><span class="meta-rate">★ ' + fmtRating(a) + '</span><span>' + a.year + '</span><span>' + epText + '</span><span>' + esc(a.status) + '</span></div>' +
          '<div class="detail-genres">' + a.genres.map(function (g) { return '<a class="chip" href="search.html?q=' + encodeURIComponent(g) + '">' + esc(g) + '</a>'; }).join('') + '</div>' +
          '<p class="detail-desc">' + esc(a.desc) + '</p>' +
          '<div class="hero-buttons">' +
            '<button class="btn btn-primary" id="d-watch"><i data-lucide="play" class="btn-icon"></i> <span>' + (isSeries ? (prog.last ? 'تابع المشاهدة (الحلقة ' + prog.last + ')' : 'ابدأ المشاهدة') : 'شاهد الفيلم') + '</span></button>' +
            '<button class="btn btn-secondary" data-wl="' + esc(a.id) + '" data-on="في قائمتك ✓" data-off="أضف لقائمتي"><i data-lucide="plus" class="btn-icon"></i> <span class="wl-text">أضف لقائمتي</span></button>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<div class="detail-body">' +
        '<section class="detail-section" id="player-section">' +
          '<h2>المشاهدة</h2>' +
          '<div class="player" id="player"></div>' +
          '<div class="player-title" id="player-title"></div>' +
        '</section>' +

        (isSeries
          ? '<section class="detail-section"><div class="section-header"><h2>قائمة الحلقات</h2><span class="ep-count">' + a.episodes + (a.epPlus ? '+' : '') + ' حلقة</span></div>' +
            (a.episodes > 60 ? '<div class="ep-jump"><label>اذهب إلى الحلقة <input type="number" id="ep-jump" min="1" max="' + a.episodes + '" placeholder="رقم"></label><button class="btn btn-secondary" id="ep-go">اذهب</button></div>' : '') +
            '<div class="ep-list" id="ep-list"></div><div class="ep-more"><button class="btn btn-secondary" id="ep-more" hidden></button></div></section>'
          : '') +

        '<section class="detail-section"><h2>معلومات ' + (isSeries ? 'المسلسل' : 'الفيلم') + '</h2>' +
          '<dl class="info-grid">' + info.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl></section>' +

        '<section class="detail-section" id="related" hidden><div class="section-header"><h2>قد يعجبك أيضًا</h2></div><div class="movies-grid" id="related-grid"></div></section>' +
      '</div>';

    /* المشغّل */
    var player = $('#player'), ptitle = $('#player-title');
    function epLabel(n) { return isSeries ? a.title + ' — الحلقة ' + n : a.title; }
    function videoFor(ep) {
      var v = (window.RT_VIDEOS || {})[a.id];
      if (!v) return null;
      return typeof v === 'string' ? v : (v[ep] || null);
    }
    function idle() {
      player.className = 'player';
      player.style.backgroundImage = 'linear-gradient(rgba(15,16,21,.55),rgba(15,16,21,.8)),url(\'' + a.poster + '\')';
      player.innerHTML = '<button class="player-play" aria-label="تشغيل"><i data-lucide="play"></i></button>';
      ptitle.textContent = epLabel(cur);
      icons();
      $('.player-play', player).onclick = function () { play(cur); };
    }
    function play(ep) {
      cur = ep;
      Prog.mark(a.id, ep);
      var src = videoFor(ep);
      player.style.backgroundImage = '';
      if (!src) {
        player.className = 'player has-msg';
        player.style.backgroundImage = 'linear-gradient(rgba(15,16,21,.7),rgba(15,16,21,.9)),url(\'' + a.poster + '\')';
        player.innerHTML = '<div class="player-msg"><b>مصدر الفيديو غير مرتبط بعد</b><span>أضف رابط الفيديو لهذا العمل في <code>js/data.js</code> داخل <code>RT_VIDEOS</code> ليبدأ التشغيل هنا.</span></div>';
      } else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
        player.className = 'player playing';
        player.innerHTML = '<video controls autoplay playsinline src="' + esc(src) + '"></video>';
      } else {
        player.className = 'player playing';
        player.innerHTML = '<iframe src="' + esc(src) + '" allowfullscreen allow="autoplay; fullscreen"></iframe>';
      }
      ptitle.textContent = epLabel(ep);
      if (isSeries) renderEps();
      $('#d-watch span').textContent = isSeries ? 'تابع المشاهدة (الحلقة ' + ep + ')' : 'شاهد الفيلم';
    }
    function scrollToPlayer() { $('#player-section').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

    /* الحلقات */
    function renderEps() {
      if (!isSeries) return;
      var list = $('#ep-list'), seen = Prog.get(a.id).seen;
      var n = Math.min(shown, a.episodes), html = '';
      for (var i = 1; i <= n; i++) {
        html += '<button class="ep-row' + (i === cur ? ' current' : '') + (seen.indexOf(i) > -1 ? ' watched' : '') + '" data-ep="' + i + '">' +
          '<span class="ep-num">' + i + '</span><span class="ep-name">الحلقة ' + i + '</span>' +
          '<span class="ep-dur">' + epMin + ' د' + (seen.indexOf(i) > -1 ? ' • شوهدت' : '') + '</span></button>';
      }
      list.innerHTML = html;
      var more = $('#ep-more'), left = a.episodes - n;
      more.hidden = left <= 0;
      more.textContent = 'عرض المزيد (' + Math.min(left, 24) + ' حلقة إضافية — المتبقي ' + left + ')';
    }
    if (isSeries) {
      $('#ep-list').addEventListener('click', function (e) {
        var b = e.target.closest('.ep-row'); if (!b) return;
        play(parseInt(b.dataset.ep, 10)); scrollToPlayer();
      });
      $('#ep-more').onclick = function () { shown += 24; renderEps(); };
      var go = $('#ep-go');
      if (go) go.onclick = function () {
        var n = parseInt($('#ep-jump').value, 10);
        if (!n || n < 1 || n > a.episodes) { toast('اكتب رقم حلقة بين 1 و ' + a.episodes); return; }
        if (n > shown) shown = Math.ceil(n / 24) * 24;
        play(n); scrollToPlayer();
      };
      renderEps();
    }

    $('#d-watch').onclick = function () { play(cur); scrollToPlayer(); };
    idle();

    /* أعمال مشابهة */
    var rel = DATA.filter(function (x) { return x.id !== a.id; }).map(function (x) {
      var shared = x.genres.filter(function (g) { return a.genres.indexOf(g) > -1; }).length;
      return { x: x, s: shared * 10 + (x.type === a.type ? 2 : 0) + x.rating / 10 };
    }).filter(function (r) { return r.s >= 10; }).sort(function (p, q) { return q.s - p.s; }).slice(0, 6).map(function (r) { return r.x; });
    if (rel.length) { $('#related').hidden = false; renderGrid($('#related-grid'), rel); }

    icons(); syncWatchlistUI();
    if (params.get('play') === '1') {
      /* بدون مصدر فيديو نكتفي بعرض المعلومات والحلقات بدل رسالة الخطأ */
      if (videoFor(cur)) { play(cur); setTimeout(scrollToPlayer, 150); }
      else if (isSeries) setTimeout(function () { var l = $('#ep-list'); if (l) l.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
      else setTimeout(scrollToPlayer, 150);
    }
  }

  /* ==========================================================
     تشغيل
     ========================================================== */
  function init() {
    setupSearch(); setupAuthUI();
    var page = document.body.dataset.page;
    pageList();
    if (page === 'home') pageHome();
    if (page === 'watchlist') pageWatchlist();
    if (page === 'search') pageSearch();
    if (page === 'anime') pageAnime();
    syncWatchlistUI(); syncAuthUI(); icons();
    /* لو تأخّر تحميل مكتبة الأيقونات */
    window.addEventListener('load', icons);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.RamaTime = { Auth: Auth, Watchlist: WL, search: searchAnime, openAuth: openAuth };
})();
