(() => {
  const catalog = window.SportShoes;
  const $ = (selector, root = document) => root.querySelector(selector);
  const money = catalog.formatPrice;
  const imageFor = (product, size = 850) => product.image.replace('w=900', `w=${size}`);
  const card = (product) => `<article class="product-card">
    <a class="product-image" href="product.php?id=${product.id}" aria-label="مشاهده ${product.name}">
      <img src="${imageFor(product)}" alt="کفش ورزشی ${product.name}" loading="lazy">
      ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
    </a>
    <button class="product-heart" type="button" aria-label="افزودن ${product.name} به علاقه‌مندی‌ها">♡</button>
    <div class="product-brand">${product.brand} · ${product.category}</div>
    <h3 class="product-name"><a href="product.php?id=${product.id}">${product.name}</a></h3>
    <div class="product-row"><div class="price">${money(product.price)} ${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ''}</div>
    <button class="add-cart" type="button" data-add-cart="${product.id}" aria-label="افزودن به سبد خرید">＋</button></div>
  </article>`;
  const benefits = () => `<div class="features"><div><span class="eyebrow">SPORT SHOES SERVICE</span><h2 class="section-title" style="font-size:20px;margin:3px 0">خریدی مطمئن، از انتخاب تا قدم اول</h2></div><div class="feature"><span class="feature-icon">↗</span><div><strong>ارسال سریع</strong><span>ارسال به سراسر ایران</span></div></div><div class="feature"><span class="feature-icon">↺</span><div><strong>بازگشت آسان</strong><span>۷ روز برای تصمیم بهتر</span></div></div><div class="feature"><span class="feature-icon">✓</span><div><strong>اصالت کالا</strong><span>انتخاب‌شده با دقت</span></div></div></div>`;
  const setupHome = () => {
    const benefitsTarget = $('[data-store-benefits]');
    if (benefitsTarget) benefitsTarget.innerHTML = benefits();
    const slider = $('.hero-slider');
    if (!slider) return;
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dots = Array.from(slider.querySelectorAll('.hero-dot'));
    if (!slides.length) return;
    let active = 0;
    const paint = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => slide.classList.toggle('active', position === active));
      dots.forEach((dot, position) => dot.classList.toggle('active', position === active));
    };
    dots.forEach((dot, position) => dot.addEventListener('click', () => paint(position)));
    $('[data-hero-prev]', slider).addEventListener('click', () => paint(active - 1));
    $('[data-hero-next]', slider).addEventListener('click', () => paint(active + 1));
    paint(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setInterval(() => paint(active + 1), 6500);
  };
  const setupDetails = () => {
    const params = new URLSearchParams(location.search); const product = catalog.products.find((item) => item.id === params.get('id')) || catalog.products[0];
    $('[data-detail-image]').src = imageFor(product); $('[data-detail-image]').alt = `کفش ورزشی ${product.name}`;
    $('[data-detail-name]').textContent = product.name; $('[data-detail-brand]').textContent = `${product.brand} · ${product.category}`;
    $('[data-detail-price]').textContent = money(product.price); $('[data-detail-copy]').textContent = product.description;
    $('[data-detail-old-price]').textContent = product.oldPrice ? money(product.oldPrice) : '';
    $('[data-detail-stock]').textContent = product.stock ? `موجود در انبار · ${new Intl.NumberFormat('fa-IR').format(product.stock)} جفت` : 'در حال حاضر ناموجود';
    document.title = `${product.name} | Sport Shoes`;
    $('[data-detail-add]').disabled = !product.stock;
    if (!product.stock) $('[data-detail-add]').textContent = 'ناموجود';
    $('[data-detail-sizes]').innerHTML = product.sizes.map((size, index) => `<button type="button" class="size-option${index === 2 ? ' active' : ''}" data-size="${size}" aria-pressed="${index === 2}">${new Intl.NumberFormat('fa-IR').format(size)}</button>`).join('');
    $('[data-detail-add]').dataset.addCart = product.id;
    $('[data-related]').innerHTML = catalog.products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3).map(card).join('');
    let count = 1; $('[data-quantity-value]').value = count;
    $('[data-quantity-minus]').addEventListener('click', () => { count = Math.max(1, count - 1); $('[data-quantity-value]').value = count; });
    $('[data-quantity-plus]').addEventListener('click', () => { count = Math.min(10, count + 1); $('[data-quantity-value]').value = count; });
    $('[data-detail-sizes]').addEventListener('click', (event) => { const button = event.target.closest('[data-size]'); if (!button) return; document.querySelectorAll('[data-size]').forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); }); button.classList.add('active'); button.setAttribute('aria-pressed', 'true'); });
    $('[data-detail-add]').addEventListener('click', (event) => { event.currentTarget.dataset.quantity = count; event.currentTarget.dataset.size = $('[data-size].active')?.dataset.size || ''; });
  };
  const renderCart = () => {
    const drawer = $('[data-cart-drawer]'); const entries = catalog.readCart(); const container = $('[data-cart-items]');
    if (!drawer || !container || ! $('[data-cart-total]')) { catalog.updateCartCount(); return; }
    container.innerHTML = entries.length ? entries.map((entry) => { const product = catalog.products.find((item) => item.id === entry.id); return product ? `<div class="cart-line"><img src="${imageFor(product, 160)}" alt=""><div><strong>${product.name}</strong><span>${entry.size ? `سایز ${entry.size} · ` : ''}${new Intl.NumberFormat('fa-IR').format(entry.quantity)} عدد</span><b>${money(product.price * entry.quantity)}</b></div><button type="button" data-remove-cart="${entry.id}" data-size="${entry.size || ''}" aria-label="حذف ${product.name}">×</button></div>` : ''; }).join('') : '<p class="cart-empty">سبد خرید شما هنوز خالی است.</p>';
    $('[data-cart-total]').textContent = entries.length ? `جمع تقریبی: ${money(entries.reduce((sum, entry) => sum + (catalog.products.find((item) => item.id === entry.id)?.price || 0) * entry.quantity, 0))}` : '';
    catalog.updateCartCount(); drawer.setAttribute('aria-hidden', drawer.classList.contains('open') ? 'false' : 'true');
  };
  const notify = (message) => { const toast = $('[data-toast]'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); window.clearTimeout(notify.timer); notify.timer = window.setTimeout(() => toast.classList.remove('show'), 2600); };
  const setupScrollReveal = () => {
    const targets = document.querySelectorAll('.store-main > section, .store-main > .page-heading, .product-card, .contact-card, .contact-form');
    targets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
    });
    document.documentElement.classList.add('motion-ready');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    targets.forEach((element) => observer.observe(element));
  };
  const setupContact = () => {
    $('[data-contact-form]').addEventListener('submit', (event) => {
      event.preventDefault(); const form = event.currentTarget; const message = $('[data-contact-message]');
      if (!form.reportValidity()) { message.textContent = 'لطفاً فیلدهای مشخص‌شده را بررسی کنید.'; message.className = 'form-message error'; return; }
      message.textContent = 'پیام شما ثبت شد. این فرم نمایشی است و اطلاعات به سرور ارسال نشده‌اند.'; message.className = 'form-message success'; form.reset();
    });
  };
  document.addEventListener('click', (event) => {
    const add = event.target.closest('[data-add-cart]');
    if (add) { event.preventDefault(); const reference = add.dataset.addCart; const id = reference.includes('?') ? new URL(reference, location.href).searchParams.get('id') : reference; const success = catalog.addToCart(id, Number(add.dataset.quantity || 1), add.dataset.size || null); renderCart(); notify(success ? 'به سبد خرید اضافه شد.' : 'این محصول در حال حاضر موجود نیست.'); }
    if (event.target.closest('[data-open-cart]')) { const drawer = $('[data-cart-drawer]'); if (!drawer) return; drawer.classList.add('open'); document.documentElement.classList.add('cart-open'); $('[data-cart-backdrop]')?.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); renderCart(); $('[data-close-cart].cart-drawer-close')?.focus(); }
    if (event.target.closest('[data-close-cart]')) { $('[data-cart-drawer]')?.classList.remove('open'); document.documentElement.classList.remove('cart-open'); $('[data-cart-backdrop]')?.classList.remove('open'); $('[data-cart-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-open-cart]')?.focus(); }
    const remove = event.target.closest('[data-remove-cart]');
    if (remove) { catalog.saveCart(catalog.readCart().filter((entry) => !(entry.id === remove.dataset.removeCart && String(entry.size || '') === remove.dataset.size))); renderCart(); }
    if (event.target.closest('[data-mobile-menu]')) {
      const drawer = $('[data-mobile-drawer]'); const backdrop = $('[data-mobile-menu-backdrop]');
      const opening = !drawer?.classList.contains('open');
      if (drawer) { drawer.classList.toggle('open', opening); drawer.setAttribute('aria-hidden', String(!opening)); }
      backdrop?.classList.toggle('open', opening);
      if (opening) $('[data-mobile-menu-close]')?.focus();
    }
    if (event.target.closest('[data-mobile-menu-close]')) {
      $('[data-mobile-drawer]')?.classList.remove('open'); $('[data-mobile-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-mobile-menu-backdrop]')?.classList.remove('open'); $('[data-mobile-menu]')?.focus();
    }
    const heart = event.target.closest('.product-heart'); if (heart) { event.preventDefault(); heart.classList.toggle('liked'); heart.textContent = heart.classList.contains('liked') ? '♥' : '♡'; }
    const link = event.target.closest('a[href]');
    if (link && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && !link.target && !link.hasAttribute('download')) {
      const destination = new URL(link.href, location.href);
      if (destination.origin === location.origin && (destination.pathname !== location.pathname || destination.search !== location.search) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        event.preventDefault(); document.documentElement.classList.add('page-leaving'); window.setTimeout(() => location.assign(destination.href), 180);
      }
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.body.dataset.page; document.querySelectorAll(`[data-nav="${nav}"]`).forEach((link) => link.classList.add('active'));
    renderCart();
    if (document.body.dataset.page === 'home') setupHome();
    if (document.body.dataset.page === 'details') setupDetails();
    if (document.body.dataset.page === 'contact') setupContact();
    setupScrollReveal();
    document.addEventListener('sport-shoes:cart', renderCart);
    document.addEventListener('sport-shoes:products', () => {
      if (document.body.dataset.page === 'details') setupDetails();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { if ($('[data-cart-drawer]')?.classList.contains('open')) { $('[data-cart-drawer]')?.classList.remove('open'); document.documentElement.classList.remove('cart-open'); $('[data-cart-backdrop]')?.classList.remove('open'); $('[data-cart-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-open-cart]')?.focus(); } if ($('[data-mobile-drawer]')?.classList.contains('open')) { $('[data-mobile-drawer]')?.classList.remove('open'); $('[data-mobile-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-mobile-menu-backdrop]')?.classList.remove('open'); $('[data-mobile-menu]')?.focus(); } } });
  });
})();
