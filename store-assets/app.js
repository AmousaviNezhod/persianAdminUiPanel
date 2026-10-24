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
  const showProducts = (items, target) => { if (!target) return; target.innerHTML = items.length ? items.map(card).join('') : '<div class="empty-state">محصولی با این مشخصات پیدا نشد. فیلترها را تغییر دهید.</div>'; };
  const setupHome = () => {
    const target = $('[data-home-products]');
    showProducts(catalog.products.slice(0, 9), target);
    const benefitsTarget = $('[data-store-benefits]');
    if (benefitsTarget) benefitsTarget.innerHTML = benefits();
    const slides = [
      { eyebrow: 'کالکشن تمرین ۱۴۰۵', title: 'هر قدم،\nیک شروع تازه', text: 'کفش‌هایی برای مسیرهای روزانه و تمرین‌های بی‌وقفه. مدل بعدی‌ات را پیدا کن.', product: 'velocity-pro', image: 'photo-1542291026-7eec264c27ff' },
      { eyebrow: 'روزهای پرتحرک', title: 'سبک‌تر حرکت کن', text: 'راحتیِ تمام‌روز، با انتخاب‌هایی که برای حرکت ساخته شده‌اند.', product: 'urban-flex', image: 'photo-1552346154-21d32810aba3' },
      { eyebrow: 'آماده مسیر بعدی', title: 'از شهر تا مسیر', text: 'پشتیبانی و چسبندگی بیشتر برای تجربه‌های تازه در فضای باز.', product: 'trail-motion', image: 'photo-1460353581641-37baddab0fa2' },
    ];
    let active = 0;
    let hasPainted = false;
    let slideTransitionTimer;
    const paint = () => {
      const slide = slides[active]; const product = catalog.products.find((item) => item.id === slide.product);
      const media = $('[data-hero-image]'); const copy = $('.hero-copy');
      const update = () => {
        $('[data-hero-eyebrow]').textContent = slide.eyebrow;
        $('[data-hero-title]').textContent = slide.title;
        $('[data-hero-copy]').textContent = slide.text;
        $('[data-hero-link]').href = `product.php?id=${product.id}`;
        media.style.backgroundImage = `linear-gradient(90deg,rgba(15,18,21,.08),rgba(15,18,21,.22)),url(https://images.unsplash.com/${slide.image}?auto=format&fit=crop&w=1400&q=88)`;
        document.querySelectorAll('.hero-dot').forEach((dot, index) => dot.classList.toggle('active', index === active));
      };
      window.clearTimeout(slideTransitionTimer);
      if (!hasPainted || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { update(); hasPainted = true; return; }
      media.classList.add('is-changing'); copy.classList.add('is-changing');
      slideTransitionTimer = window.setTimeout(() => {
        update();
        requestAnimationFrame(() => requestAnimationFrame(() => { media.classList.remove('is-changing'); copy.classList.remove('is-changing'); }));
      }, 150);
    };
    document.querySelectorAll('.hero-dot').forEach((dot) => dot.addEventListener('click', () => { active = Number(dot.dataset.slide); paint(); }));
    $('[data-hero-prev]').addEventListener('click', () => { active = (active + slides.length - 1) % slides.length; paint(); });
    $('[data-hero-next]').addEventListener('click', () => { active = (active + 1) % slides.length; paint(); });
    paint();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setInterval(() => { active = (active + 1) % slides.length; paint(); }, 6500);
  };
  const setupProducts = () => {
    const filterForm = $('[data-filter-form]'); const search = $('#catalog-search'); const category = $('#category-filter'); const brand = $('#brand-filter'); const sort = $('#sort-products');
    if (!search || !category || !brand || !sort || !filterForm) return;
    const min = $('#price-min'); const max = $('#price-max');
    const query = new URLSearchParams(location.search); if (query.has('category')) category.value = query.get('category');
    const filter = () => {
      let result = catalog.products.filter((item) => item.name.toLocaleLowerCase('fa').includes(search.value.trim().toLocaleLowerCase('fa')) && (!category.value || item.category === category.value) && (!brand.value || item.brand === brand.value) && item.price >= (Number(min.value) || 0) && item.price <= (Number(max.value) || Infinity));
      if (sort.value === 'price-low') result.sort((a, b) => a.price - b.price);
      if (sort.value === 'price-high') result.sort((a, b) => b.price - a.price);
      showProducts(result, $('[data-products-grid]'));
      $('[data-result-count]').textContent = `${new Intl.NumberFormat('fa-IR').format(result.length)} محصول`;
      const selected = [category.value, brand.value, min.value, max.value].filter(Boolean).length;
      const trigger = $('[data-open-filters]');
      if (trigger) { trigger.classList.toggle('has-filters', selected > 0); trigger.setAttribute('aria-label', selected ? `فیلترها، ${selected} مورد فعال` : 'فیلتر محصولات'); }
    };
    filterForm.addEventListener('input', filter); filterForm.addEventListener('change', filter);
    filterForm.addEventListener('reset', (event) => { event.preventDefault(); category.value = ''; brand.value = ''; min.value = ''; max.value = ''; filter(); });
    search.addEventListener('input', filter); sort.addEventListener('change', filter);
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-open-filters]')) {
        const panel = $('#product-filters'); $('#product-filters')?.classList.add('open'); document.documentElement.classList.add('filters-open'); $('[data-close-filters].filter-backdrop')?.classList.add('open');
        panel?.setAttribute('aria-hidden', 'false'); $('[data-open-filters]')?.setAttribute('aria-expanded', 'true');
        if (window.matchMedia('(max-width: 640px)').matches) $('[data-close-filters].filter-close')?.focus();
      }
      if (event.target.closest('[data-close-filters]')) {
        $('#product-filters')?.classList.remove('open'); document.documentElement.classList.remove('filters-open'); $('[data-close-filters].filter-backdrop')?.classList.remove('open');
        $('#product-filters')?.setAttribute('aria-hidden', 'true'); $('[data-open-filters]')?.setAttribute('aria-expanded', 'false');
        if (window.matchMedia('(max-width: 640px)').matches) $('[data-open-filters]')?.focus();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $('#product-filters')?.classList.contains('open')) {
        $('#product-filters').classList.remove('open'); document.documentElement.classList.remove('filters-open'); $('[data-close-filters].filter-backdrop')?.classList.remove('open');
        $('#product-filters').setAttribute('aria-hidden', 'true'); $('[data-open-filters]')?.setAttribute('aria-expanded', 'false'); $('[data-open-filters]')?.focus();
      }
    });
    filter();
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
    if (add) { event.preventDefault(); const success = catalog.addToCart(add.dataset.addCart, Number(add.dataset.quantity || 1), add.dataset.size || null); renderCart(); notify(success ? 'به سبد خرید اضافه شد.' : 'این محصول در حال حاضر موجود نیست.'); }
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
    if (document.body.dataset.page === 'products') setupProducts();
    if (document.body.dataset.page === 'details') setupDetails();
    if (document.body.dataset.page === 'contact') setupContact();
    setupScrollReveal();
    document.addEventListener('sport-shoes:cart', renderCart);
    document.addEventListener('sport-shoes:products', () => {
      if (document.body.dataset.page === 'home') showProducts(catalog.products.slice(0, 9), $('[data-home-products]'));
      if (document.body.dataset.page === 'products') setupProducts();
      if (document.body.dataset.page === 'details') setupDetails();
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { if ($('[data-cart-drawer]')?.classList.contains('open')) { $('[data-cart-drawer]')?.classList.remove('open'); document.documentElement.classList.remove('cart-open'); $('[data-cart-backdrop]')?.classList.remove('open'); $('[data-cart-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-open-cart]')?.focus(); } if ($('[data-mobile-drawer]')?.classList.contains('open')) { $('[data-mobile-drawer]')?.classList.remove('open'); $('[data-mobile-drawer]')?.setAttribute('aria-hidden', 'true'); $('[data-mobile-menu-backdrop]')?.classList.remove('open'); $('[data-mobile-menu]')?.focus(); } } });
  });
})();
