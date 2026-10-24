/* ============================================================
   IYAL VANA – app.js
   Reads window.IYAL_DATA (data/products.js), builds the page,
   runs the 3D scroll animations and the WhatsApp cart.
   ============================================================ */
(function () {
  'use strict';

  const DATA = window.IYAL_DATA || { store: {}, products: [] };
  const STORE = DATA.store;
  const PRODUCTS = DATA.products.filter(p => !p.hidden);
  const CUR = STORE.currency || '₹';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = n => CUR + Number(n).toLocaleString('en-IN');
  const waLink = text => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------------- Store info into the page ---------------- */
  function fillStore() {
    document.title = `${STORE.name} – Handcrafted DIY Kits`;
    $$('.nav__title, .footer__brand span').forEach(el => el.textContent = STORE.name);
    if (STORE.logo) { $('#navLogo').src = STORE.logo; $('#footLogo').src = STORE.logo; }
    $('#heroTagline').textContent = STORE.tagline || '';
    $('#aboutText').textContent = STORE.description || '';
    $('#footTag').textContent = STORE.tagline || '';
    $('#year').textContent = new Date().getFullYear();
    $('#statKits').dataset.count = PRODUCTS.length;
    $('#cartDelivery').textContent = STORE.deliveryNote || '';
    // hero scene: a few figurines floating in 3D
    const heroImgs = STORE.heroImages && STORE.heroImages.length ? STORE.heroImages : PRODUCTS.slice(0, 5).map(p => p.image);
    $('#heroScene').innerHTML = heroImgs.slice(0, 5).map((src, i) =>
      `<div class="hero__fig hero__fig--${i + 1}" data-depth="${[1, .5, .35, .8, .65][i] || .5}"><img src="${src}" alt=""></div>`).join('');
    if (STORE.aboutImage && $('#aboutImg')) $('#aboutImg').src = STORE.aboutImage;

    const hi = waLink(`Hi ${STORE.name}! I'd like to know more about your DIY kits 🌸`);
    ['#navWa', '#heroWa', '#waFloat'].forEach(s => $(s).href = hi);

    // Contact cards
    const cards = [];
    if (STORE.phone) cards.push({ icon: '📞', title: 'Call us', text: STORE.phone, href: `tel:${STORE.whatsapp ? '+' + STORE.whatsapp : STORE.phone}` });
    if (STORE.whatsapp) cards.push({ icon: '💬', title: 'WhatsApp', text: 'Chat & order instantly', href: hi });
    if (STORE.instagram) cards.push({ icon: '📷', title: 'Instagram', text: '@' + STORE.instagram.replace(/\/$/, '').split('/').pop(), href: STORE.instagram });
    if (STORE.email) cards.push({ icon: '✉️', title: 'Email', text: STORE.email, href: `mailto:${STORE.email}` });
    if (STORE.address) cards.push({ icon: '📍', title: 'Find us', text: STORE.address });
    $('#contactGrid').innerHTML = cards.map(c => `
      <a class="contact__card" ${c.href ? `href="${c.href}" target="_blank" rel="noopener"` : ''}>
        <div class="contact__icon">${c.icon}</div><b>${c.title}</b><span>${c.text}</span>
      </a>`).join('');
  }

  /* ---------------- Products dropdown ---------------- */
  function buildMenu() {
    $('#productMenu').innerHTML = PRODUCTS.map(p => `
      <a class="dropdown__item" href="#${p.id}">
        <img src="${p.image}" alt="" loading="lazy">
        <div><b>${p.name}</b><small>${money(p.price)}</small></div>
      </a>`).join('');
  }

  /* ---------------- Product sections ---------------- */
  function contents(p) {
    const out = [];
    const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
    if (p.figurines) out.push(`🧸 ${plural(p.figurines, 'ready-to-paint figurine', 'ready-to-paint figurines')}`);
    if (p.colours) out.push(`🎨 ${plural(p.colours, 'colour', 'colours')} included`);
    if (p.brushes) out.push(`🖌️ ${plural(p.brushes, 'paintbrush', 'paintbrushes')}`);
    return out.concat(p.highlights || []);
  }

  function buildKits() {
    const pad = n => String(n).padStart(2, '0');
    const splats = ['#ff4d6d', '#ffd43b', '#4dabf7', '#51cf66', '#f06595', '#9775fa'];
    $('#kits').innerHTML = PRODUCTS.map((p, i) => {
      const save = p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
      return `
      <section class="kit" id="${p.id}" data-id="${p.id}">
        <div class="kit__bg"></div>
        <div class="kit__index">${pad(i + 1)}</div>
        <div class="kit__inner">
          <div class="kit__stage">
            <div class="kit__ring"></div>
            <div class="kit__orb kit__orb--a"></div>
            <div class="kit__orb kit__orb--b"></div>
            ${p.badge ? `<div class="kit__badge">${p.badge}</div>` : ''}
            <div class="kit__model">
              <img class="kit__img kit__img--plain" src="${p.image}" alt="${p.name} – plain white figurine" loading="lazy">
              <div class="kit__white" style="-webkit-mask-image:url('${p.image}');mask-image:url('${p.image}')"></div>
              <img class="kit__img kit__img--paint" src="${p.image}" alt="${p.name} – coloured" loading="lazy">
            </div>
            <div class="kit__shadow"></div>
            ${splats.map((c, k) => `<span class="kit__splat kit__splat--${k + 1}" style="color:${c}"><svg viewBox="0 0 100 100"><path fill="currentColor" d="M50 6c6 10 16 8 24 4c-2 10 8 14 16 18c-8 6-6 16-2 24c-10-2-14 8-18 16c-6-8-16-6-24-2c2-10-8-14-16-18c8-6 6-16 2-24c10 2 14-8 18-18z"/></svg></span>`).join('')}
            <img class="kit__brush" src="assets/img/brush.svg" alt="" aria-hidden="true">
            <img class="kit__palette" src="assets/img/palette.svg" alt="" aria-hidden="true">
            <div class="kit__state"><span class="kit__state-plain">Arrives plain white</span><span class="kit__state-paint">Coloured by you</span></div>
          </div>
          <div class="kit__info">
            <div class="kit__cat">${p.category || ''} · ${pad(i + 1)} / ${pad(PRODUCTS.length)}</div>
            <h3 class="kit__name">${p.name}</h3>
            <p class="kit__tag">${p.tagline || ''}</p>
            <div class="kit__price">
              <strong>${money(p.price)}</strong>
              ${p.mrp && p.mrp > p.price ? `<s>${money(p.mrp)}</s><span class="save">Save ${save}%</span>` : ''}
            </div>
            <ul class="kit__hl">${contents(p).map(h => `<li>${h}</li>`).join('')}</ul>
            ${p.options && p.options.length ? `
            <div class="kit__options">
              <span class="kit__options-label">Choose one or more</span>
              ${p.options.map((o, k) => `<label class="opt"><input type="checkbox" value="${o}" ${k === 0 ? 'checked' : ''}><span>${o}</span></label>`).join('')}
            </div>` : ''}
            <div class="kit__actions">
              <div class="qty">
                <button type="button" data-q="-1" aria-label="Decrease">−</button>
                <span class="qty__n">1</span>
                <button type="button" data-q="1" aria-label="Increase">+</button>
              </div>
              <button class="btn btn--primary add-btn" data-add="${p.id}">Add to cart</button>
              <a class="btn btn--ghost buy-btn" data-buy="${p.id}" href="#" target="_blank" rel="noopener">Order now</a>
            </div>
            ${p.tip ? `<p class="kit__tip">🎨 <b>Colour idea:</b> ${p.tip}</p>` : ''}
          </div>
        </div>
      </section>`;
    }).join('');

    // Quantity steppers
    $$('.kit .qty').forEach(q => {
      const n = $('.qty__n', q);
      q.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        n.textContent = Math.max(1, Math.min(20, +n.textContent + +b.dataset.q));
      });
    });

    // Add-to-cart
    const picked = sec => $$('.kit__options input:checked', sec).map(i => i.value);
    $$('.add-btn').forEach(b => b.addEventListener('click', e => {
      const sec = b.closest('.kit');
      const qty = +$('.qty__n', sec).textContent;
      const p = PRODUCTS.find(x => x.id === b.dataset.add);
      if (p.options && p.options.length) {
        const opts = picked(sec);
        if (!opts.length) { toast('Please pick at least one option'); return; }
        opts.forEach(o => cart.add(p.id, qty, o));
      } else cart.add(p.id, qty);
      flyToCart($('.kit__img--paint', sec));
      ripple(e);
    }));

    // Order-now (single product straight to WhatsApp)
    $$('.buy-btn').forEach(a => a.addEventListener('click', e => {
      const p = PRODUCTS.find(x => x.id === a.dataset.buy);
      const sec = a.closest('.kit');
      const qty = +$('.qty__n', sec).textContent;
      if (p.options && p.options.length) {
        const opts = picked(sec);
        if (!opts.length) { e.preventDefault(); toast('Please pick at least one option'); return; }
        a.href = waLink(buildMessage(opts.map(o => ({ ...p, qty, option: o }))));
      } else a.href = waLink(buildMessage([{ ...p, qty }]));
    }));
  }

  /* ---------------- Cart ---------------- */
  const cart = {
    key: 'iyalvana-cart',
    items: [],
    load() { try { this.items = JSON.parse(localStorage.getItem(this.key)) || []; } catch { this.items = []; } },
    save() { try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch {} },
    key(i) { return i.id + (i.option ? ':' + i.option : ''); },
    add(id, qty = 1, option = '') {
      const it = this.items.find(i => this.key(i) === id + (option ? ':' + option : ''));
      if (it) it.qty = Math.min(20, it.qty + qty); else this.items.push({ id, qty, option });
      this.save(); this.render();
      const p = PRODUCTS.find(x => x.id === id);
      toast(`${p.name}${option ? ' – ' + option : ''} added to cart 🌸`);
      const btn = $('#cartBtn'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
    },
    set(key, qty) {
      const it = this.items.find(i => this.key(i) === key); if (!it) return;
      it.qty = qty; if (it.qty <= 0) this.items = this.items.filter(i => this.key(i) !== key);
      this.save(); this.render();
    },
    clear() { this.items = []; this.save(); this.render(); },
    lines() { return this.items.map(i => ({ ...PRODUCTS.find(p => p.id === i.id), qty: i.qty, option: i.option || '', key: this.key(i) })).filter(l => l.name); },
    total() { return this.lines().reduce((s, l) => s + l.price * l.qty, 0); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    render() {
      const lines = this.lines();
      $('#cartItems').innerHTML = lines.map(l => `
        <div class="cart-item">
          <img src="${l.image}" alt="">
          <div><b>${l.name}${l.option ? ` <em class="cart-item__opt">${l.option}</em>` : ''}</b><small>${money(l.price)} × ${l.qty} = ${money(l.price * l.qty)}</small></div>
          <div class="qty">
            <button type="button" data-id="${l.key}" data-q="-1" aria-label="Decrease">−</button>
            <span>${l.qty}</span>
            <button type="button" data-id="${l.key}" data-q="1" aria-label="Increase">+</button>
          </div>
          <button class="cart-item__remove" data-rm="${l.key}">Remove</button>
        </div>`).join('');
      $('#cartTotal').textContent = money(this.total());
      const c = this.count();
      $('#cartCount').textContent = c;
      $('#cartCount').classList.toggle('show', c > 0);
      $('#cartEmpty').classList.toggle('show', !lines.length);
      $('#cartFoot').classList.toggle('hide', !lines.length);
    }
  };

  function buildMessage(lines) {
    const name = ($('#custName') && $('#custName').value.trim()) || '';
    const note = ($('#custNote') && $('#custNote').value.trim()) || '';
    const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
    let msg = `🌸 *New order – ${STORE.name}*\n\n`;
    lines.forEach((l, i) => { msg += `${i + 1}. ${l.name}${l.option ? ` (${l.option})` : ''}\n    ${money(l.price)} × ${l.qty} = ${money(l.price * l.qty)}\n`; });
    msg += `\n*Total: ${money(total)}*\n`;
    if (name) msg += `\n👤 Name: ${name}`;
    if (note) msg += `\n📍 Address / note: ${note}`;
    msg += `\n\nPlease confirm my order. Thank you!`;
    return msg;
  }

  function initCart() {
    cart.load(); cart.render();
    const open = () => { $('#cart').classList.add('show'); $('#overlay').classList.add('show'); $('#cart').setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
    const close = () => { $('#cart').classList.remove('show'); $('#overlay').classList.remove('show'); $('#cart').setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    $('#cartBtn').addEventListener('click', open);
    $('#cartClose').addEventListener('click', close);
    $('#overlay').addEventListener('click', close);
    $('#cartBrowse').addEventListener('click', close);
    document.addEventListener('keydown', e => e.key === 'Escape' && close());
    $('#cartItems').addEventListener('click', e => {
      const q = e.target.closest('[data-q]'); const rm = e.target.closest('[data-rm]');
      if (q) { const it = cart.items.find(i => cart.key(i) === q.dataset.id); cart.set(q.dataset.id, Math.min(20, it.qty + +q.dataset.q)); }
      if (rm) cart.set(rm.dataset.rm, 0);
    });
    $('#clearCart').addEventListener('click', () => { cart.clear(); toast('Cart cleared'); });
    $('#orderBtn').addEventListener('click', e => {
      ripple(e);
      if (!cart.items.length) return;
      window.open(waLink(buildMessage(cart.lines())), '_blank', 'noopener');
      toast('Opening WhatsApp… 💬');
    });
    // remember name
    try { $('#custName').value = localStorage.getItem('iyalvana-name') || ''; } catch {}
    $('#custName').addEventListener('input', e => { try { localStorage.setItem('iyalvana-name', e.target.value); } catch {} });
  }

  /* ---------------- Small UI helpers ---------------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function ripple(e) {
    const b = e.currentTarget; const r = b.getBoundingClientRect();
    const s = document.createElement('span'); s.className = 'ripple';
    const d = Math.max(r.width, r.height);
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  }
  function flyToCart(img) {
    if (reduceMotion || !img || !window.gsap) return;
    const from = img.getBoundingClientRect(), to = $('#cartBtn').getBoundingClientRect();
    const f = img.cloneNode(); f.className = 'fly';
    f.style.left = from.left + from.width / 2 - 35 + 'px'; f.style.top = from.top + from.height / 2 - 35 + 'px';
    document.body.appendChild(f);
    gsap.to(f, { left: to.left + to.width / 2 - 35, top: to.top + to.height / 2 - 35, scale: .15, rotate: 540, opacity: .4, duration: .85, ease: 'power2.in', onComplete: () => f.remove() });
  }

  /* ---------------- Navigation ---------------- */
  function initNav() {
    const nav = $('#nav'), links = $('#navLinks'), burger = $('#burger'), dd = $('.dropdown');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });
    burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
    $('.dropdown__btn').addEventListener('click', e => { e.preventDefault(); dd.classList.toggle('open'); });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) dd.classList.remove('open'); });
    $$('a', links).forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); dd.classList.remove('open'); }));

    // Scroll progress bar
    const bar = $('#progress');
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ---------------- Petals ---------------- */
  function petals() {
    if (reduceMotion) return;
    const box = $('#petals'); const n = innerWidth < 600 ? 10 : 18;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span'); p.className = 'petal';
      const s = 10 + Math.random() * 16;
      p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;animation-duration:${9 + Math.random() * 10}s;animation-delay:-${Math.random() * 15}s;opacity:${.35 + Math.random() * .5}`;
      box.appendChild(p);
    }
  }

  /* ---------------- 3D scroll animations ---------------- */
  function initMotion() {
    $('#loader').classList.add('done');
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    if (reduceMotion) { $$('.hero__title .word').forEach(w => { w.style.opacity = 1; w.style.transform = 'none'; }); return; }

    // Hero intro
    gsap.timeline({ delay: .2 })
      .to('.hero__title .word', { opacity: 1, y: 0, rotateX: 0, duration: .9, stagger: .12, ease: 'back.out(1.6)' })
      .from('.hero__sub, .hero__cta', { opacity: 0, y: 20, duration: .6, stagger: .15 }, '-=.4')
      .from('#heroCard', { opacity: 0, rotateY: -40, rotateX: 15, scale: .8, duration: 1.2, ease: 'power3.out' }, 0.2)
      .from('.hero__fig', { opacity: 0, scale: .3, y: 80, duration: .9, stagger: .12, ease: 'back.out(1.8)' }, 0.6)
      .from('.hero__chip', { opacity: 0, scale: .5, duration: .6, stagger: .15, ease: 'back.out(2)' }, '-=.5');

    // Hero card – mouse tilt (desktop) + scroll parallax
    const card = $('#heroCard');
    if (!isTouch) {
      const stage = $('.hero__stage');
      let rx = 0, ry = 0;
      stage.addEventListener('mousemove', e => {
        const r = stage.getBoundingClientRect();
        ry = ((e.clientX - r.left) / r.width - .5) * 24; rx = -((e.clientY - r.top) / r.height - .5) * 18;
        gsap.to(card, { rotateY: ry, rotateX: rx, duration: .6, ease: 'power2.out', transformPerspective: 1000 });
        $$('.hero__fig').forEach(f => gsap.to(f, { x: ry * 2.2 * f.dataset.depth, y: -rx * 2.2 * f.dataset.depth, z: 80 * f.dataset.depth, duration: .7, ease: 'power2.out' }));
      });
      stage.addEventListener('mouseleave', () => { gsap.to(card, { rotateY: 0, rotateX: 0, duration: .8, ease: 'power3.out' }); gsap.to('.hero__fig', { x: 0, y: 0, z: 0, duration: .8 }); });
    }
    // idle float for the hero figurines
    $$('.hero__fig').forEach((f, i) => gsap.to(f, { yPercent: -6 - i * 2, rotate: i % 2 ? 3 : -3, duration: 2.6 + i * .4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * .3 }));
    gsap.to('.hero__inner', { y: -120, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Hero brushes & palette – gentle float + parallax
    gsap.to('.hero__brush--1', { y: -18, rotate: -6, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.hero__brush--2', { y: 16, rotate: 8, duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.hero__palette', { y: -12, rotate: 5, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Steps reveal
    gsap.from('.step', { opacity: 0, y: 40, rotateX: -20, stagger: .12, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.steps', start: 'top 80%' } });

    // Products – each figurine pinned; it enters in 3D, then gets "painted" as you scroll
    const mobile = innerWidth < 980;
    $$('.kit').forEach((sec, i) => {
      const model = $('.kit__model', sec), paint = $('.kit__img--paint', sec), plain = $('.kit__img--plain', sec);
      const brush = $('.kit__brush', sec), palette = $('.kit__palette', sec), ring = $('.kit__ring', sec), bg = $('.kit__bg', sec);
      const shadow = $('.kit__shadow', sec), splats = $$('.kit__splat', sec), state = $('.kit__state', sec);
      const info = $$('.kit__info > *', sec);
      const dir = i % 2 ? -1 : 1;

      gsap.set(model, { rotateY: -80 * dir, rotateX: 14, z: -320, scale: .6, opacity: 0, transformPerspective: 1400 });
      gsap.set(paint, { clipPath: 'inset(0 0 100% 0)' });
      gsap.set(brush, { xPercent: 180 * dir, yPercent: -40, rotate: 35 * dir, opacity: 0, z: 160, transformPerspective: 1200 });
      gsap.set(palette, { opacity: 0, scale: .5, z: 120 });
      gsap.set(splats, { scale: 0, opacity: 0 });
      gsap.set(info, { opacity: 0, y: 40 });
      gsap.set('.kit__badge', { opacity: 0 });
      gsap.set(shadow, { scaleX: .4, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: () => '+=' + (mobile ? innerHeight * 1.8 : innerHeight * 2.6),
          pin: true, scrub: .6, anticipatePin: 1,
        }
      });

      // 1. figurine flies in (plain white)
      tl.to(model, { rotateY: 0, rotateX: 0, z: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, 0)
        .to(shadow, { scaleX: 1, opacity: 1, duration: 2 }, 0)
        .to(bg, { opacity: 1, duration: 1.5 }, 0)
        .to(ring, { rotate: 360 * dir, duration: 9, ease: 'none' }, 0)
        .to(info, { opacity: 1, y: 0, duration: 1, stagger: .15, ease: 'power2.out' }, .5)
        .to('.kit__badge', { opacity: 1, duration: .5 }, 1)
        // 2. brush comes in
        .to(brush, { xPercent: 10 * dir, yPercent: -55, rotate: 20 * dir, opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.8)
        .to(palette, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(2)' }, 2)
        // 3. painting – brush zigzags down while colour is revealed top-to-bottom
        .to(paint, { clipPath: 'inset(0 0 0% 0)', duration: 4, ease: 'none' }, 3)
        .to(brush, { keyframes: [
            { xPercent: -45 * dir, yPercent: -35, rotate: -15 * dir, duration: 1 },
            { xPercent: 45 * dir, yPercent: -10, rotate: 25 * dir, duration: 1 },
            { xPercent: -40 * dir, yPercent: 15, rotate: -15 * dir, duration: 1 },
            { xPercent: 35 * dir, yPercent: 40, rotate: 25 * dir, duration: 1 }
          ] }, 3)
        .to(model, { rotateY: 14 * dir, rotateX: -6, duration: 4, ease: 'sine.inOut' }, 3)
        .to(state, { '--p': 1, duration: 4, ease: 'none' }, 3)
        .to(splats, { scale: 1, opacity: 1, duration: .6, stagger: .55, ease: 'back.out(3)' }, 3.2)
        // 4. done – brush leaves, figurine does a little turn and bounce
        .to(brush, { xPercent: 200 * dir, yPercent: 60, rotate: 50 * dir, opacity: 0, duration: 1.2, ease: 'power2.in' }, 7)
        .to(palette, { opacity: 0, scale: .6, duration: .8 }, 7.2)
        .to(model, { rotateY: -12 * dir, rotateX: 4, scale: 1.06, duration: 1.4, ease: 'back.out(2)' }, 7.2)
        .to(model, { rotateY: 0, rotateX: 0, scale: 1, duration: 1, ease: 'power1.out' }, 8.6)
        .to({}, { duration: .8 });

      // Mouse tilt layered on top
      if (!isTouch) {
        const stage = $('.kit__stage', sec);
        stage.addEventListener('mousemove', e => {
          const r = stage.getBoundingClientRect();
          gsap.to(stage, { rotateY: ((e.clientX - r.left) / r.width - .5) * 16, rotateX: -((e.clientY - r.top) / r.height - .5) * 12, duration: .5, transformPerspective: 1200 });
        });
        stage.addEventListener('mouseleave', () => gsap.to(stage, { rotateY: 0, rotateX: 0, duration: .8 }));
      }
    });

    // About cards & contact cards reveal
    gsap.from('.about__card', { opacity: 0, y: 60, rotateX: 12, stagger: .2, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.about', start: 'top 75%' } });
    gsap.from('.contact__card', { opacity: 0, y: 40, stagger: .12, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.contact', start: 'top 75%' } });

    // Counters
    $$('.stat__num').forEach(el => {
      const target = +el.dataset.count || 0;
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => gsap.fromTo(el, { innerText: 0 }, { innerText: target, duration: 1.6, snap: { innerText: 1 }, ease: 'power2.out' }) });
    });

    // Cursor glow
    if (!isTouch) {
      const g = $('#glow');
      window.addEventListener('mousemove', e => gsap.to(g, { left: e.clientX, top: e.clientY, duration: .5, ease: 'power2.out' }), { passive: true });
    }

    // Correct pin positions once images load / layout settles
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  /* ---------------- Boot ---------------- */
  fillStore(); buildMenu(); buildKits(); initCart(); initNav(); petals();
  if (document.readyState === 'complete') initMotion();
  else window.addEventListener('DOMContentLoaded', initMotion);
  setTimeout(() => $('#loader').classList.add('done'), 2500); // never block the page
})();
