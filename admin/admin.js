(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const money = (value) => window.SportShoes.formatPrice(Number(value) || 0);
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const seedOrders = [
    { id: 'SS-1408', customer: 'نرگس حیدری', date: '۱۴۰۵/۰۷/۲۴', product: 'Velocity Pro 2', total: 4890000, status: 'در حال پردازش' },
    { id: 'SS-1407', customer: 'آرمان رضایی', date: '۱۴۰۵/۰۷/۲۳', product: 'Urban Flex', total: 3190000, status: 'ارسال‌شده' },
    { id: 'SS-1406', customer: 'الهام صادقی', date: '۱۴۰۵/۰۷/۲۲', product: 'Court Classic', total: 3650000, status: 'تکمیل‌شده' },
    { id: 'SS-1405', customer: 'کیان نادری', date: '۱۴۰۵/۰۷/۲۱', product: 'Trail Motion XT', total: 6120000, status: 'در حال پردازش' },
    { id: 'SS-1404', customer: 'سارا موسوی', date: '۱۴۰۵/۰۷/۲۰', product: 'Stride Lite', total: 4590000, status: 'تکمیل‌شده' },
  ];
  const seedCategories = ['دویدن', 'تمرین', 'روزمره', 'طبیعت‌گردی'];
  const storageRead = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  let orders = storageRead('sport-shoes-orders', seedOrders);
  let categories = storageRead('sport-shoes-categories', seedCategories);
  const image = (src) => src.replace(/^\.\.\//, '');
  const showToast = (text) => { const toast = $('#admin-toast'); if (!toast) return; toast.textContent = text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); };
  const listRows = (items) => items.map((product) => `<tr data-product-row="${escapeHtml(product.id)}"><td><div class="d-flex align-items-center gap-2"><img class="admin-product-image" src="${image(product.image)}" alt="${escapeHtml(product.name)}"><span class="fw-semibold">${escapeHtml(product.name)}</span></div></td><td>${escapeHtml(product.category)}</td><td>${money(product.price)}</td><td>${new Intl.NumberFormat('fa-IR').format(product.stock)}</td><td><span class="badge ${product.stock ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}">${product.stock ? 'فعال' : 'ناموجود'}</span></td><td><div class="admin-actions"><button type="button" class="btn btn-sm btn-soft-primary" data-edit-product="${escapeHtml(product.id)}">ویرایش</button><button type="button" class="btn btn-sm btn-soft-danger" data-delete-product="${escapeHtml(product.id)}">حذف</button></div></td></tr>`).join('');
  const renderProducts = () => {
    const body = $('[data-admin-products]'); if (!body) return;
    const selectedCategory = $('#admin-product-category')?.value || '';
    const formCategory = $('#form-product-category');
    if (formCategory && !formCategory.dataset.categoriesReady) { formCategory.innerHTML = categories.map((item) => `<option>${escapeHtml(item)}</option>`).join(''); formCategory.dataset.categoriesReady = 'true'; }
    const term = ($('#admin-product-search')?.value || '').trim().toLocaleLowerCase('fa');
    const category = $('#admin-product-category')?.value || '';
    const found = window.SportShoes.products.filter((product) => product.name.toLocaleLowerCase('fa').includes(term) && (!category || product.category === category));
    body.innerHTML = found.length ? listRows(found) : '<tr><td colspan="6" class="text-center p-4 text-muted">محصولی پیدا نشد.</td></tr>';
    const select = $('#admin-product-category');
    if (select && !select.dataset.ready) { select.innerHTML = '<option value="">همه دسته‌ها</option>' + categories.map((item) => `<option>${escapeHtml(item)}</option>`).join(''); select.dataset.ready = 'true'; }
    if (select && selectedCategory && categories.includes(selectedCategory)) select.value = selectedCategory;
  };
  const renderOrders = () => {
    const body = $('[data-admin-orders]'); if (!body) return;
    body.innerHTML = orders.map((order) => `<tr><td><a href="#order-${escapeHtml(order.id)}">#${escapeHtml(order.id)}</a></td><td>${escapeHtml(order.date)}</td><td>${escapeHtml(order.customer)}</td><td>${escapeHtml(order.product)}</td><td>${money(order.total)}</td><td><select class="form-select form-select-sm" data-order-status="${escapeHtml(order.id)}" aria-label="وضعیت سفارش ${escapeHtml(order.id)}">${['در حال پردازش', 'ارسال‌شده', 'تکمیل‌شده', 'لغوشده'].map((status) => `<option${order.status === status ? ' selected' : ''}>${status}</option>`).join('')}</select></td></tr>`).join('');
  };
  const renderCategories = () => {
    const container = $('[data-admin-categories]'); if (!container) return;
    container.innerHTML = categories.map((category, index) => `<div class="admin-category"><strong>${escapeHtml(category)}<button class="btn btn-sm btn-link text-danger category-delete" type="button" data-remove-category="${index}" aria-label="حذف دسته ${escapeHtml(category)}">×</button></strong><span>${new Intl.NumberFormat('fa-IR').format(window.SportShoes.products.filter((product) => product.category === category).length)} محصول در نمونه‌ها</span></div>`).join('');
  };
  const openProductForm = (product = null) => {
    const modal = $('#product-modal'); const form = $('#admin-product-form'); if (!modal || !form) return;
    form.reset(); $('[data-form-id]').value = product?.id || '';
    $('#form-product-name').value = product?.name || ''; $('#form-product-brand').value = product?.brand || '';
    $('#form-product-category').value = product?.category || categories[0]; $('#form-product-price').value = product?.price || '';
    $('#form-product-stock').value = product?.stock ?? ''; $('#form-product-image').value = product?.image || '';
    $('#form-product-color').value = product?.color || ''; $('#form-product-sizes').value = product?.sizes?.join(', ') || '39, 40, 41, 42, 43';
    $('#form-product-description').value = product?.description || ''; $('#product-modal-title').textContent = product ? 'ویرایش محصول' : 'افزودن محصول';
    bootstrap.Modal.getOrCreateInstance(modal).show();
  };
  const initializeAdmin = () => {
    renderProducts(); renderOrders(); renderCategories();
    $('#admin-product-search')?.addEventListener('input', renderProducts); $('#admin-product-category')?.addEventListener('change', renderProducts);
    $('#admin-add-product')?.addEventListener('click', () => openProductForm());
    $('[data-admin-products]')?.addEventListener('click', (event) => {
      const edit = event.target.closest('[data-edit-product]'); const remove = event.target.closest('[data-delete-product]');
      if (edit) openProductForm(window.SportShoes.products.find((product) => product.id === edit.dataset.editProduct));
      if (remove && confirm('این محصول از نمونه‌های محلی حذف شود؟')) { window.SportShoes.saveProducts(window.SportShoes.products.filter((product) => product.id !== remove.dataset.deleteProduct)); renderProducts(); showToast('محصول نمونه حذف شد.'); }
    });
    $('#admin-product-form')?.addEventListener('submit', (event) => {
      event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
      const id = $('[data-form-id]').value || `shoe-${Date.now()}`;
      const old = window.SportShoes.products.find((product) => product.id === id);
      const next = { id, name: $('#form-product-name').value.trim(), brand: $('#form-product-brand').value.trim(), category: $('#form-product-category').value, price: Number($('#form-product-price').value), oldPrice: old?.oldPrice || null, stock: Number($('#form-product-stock').value), tag: 'موجود', image: $('#form-product-image').value.trim() || old?.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=88', color: $('#form-product-color').value.trim() || 'مشکی', sizes: $('#form-product-sizes').value.split(',').map((value) => Number(value.trim())).filter(Number.isFinite), description: $('#form-product-description').value.trim() };
      const products = [...window.SportShoes.products]; const index = products.findIndex((product) => product.id === id); if (index >= 0) products[index] = next; else products.unshift(next);
      window.SportShoes.saveProducts(products); renderProducts(); bootstrap.Modal.getInstance($('#product-modal')).hide(); showToast(index >= 0 ? 'تغییرات نمونه ذخیره شد.' : 'محصول نمونه اضافه شد.');
    });
    $('[data-admin-orders]')?.addEventListener('change', (event) => { const select = event.target.closest('[data-order-status]'); if (!select) return; orders = orders.map((order) => order.id === select.dataset.orderStatus ? { ...order, status: select.value } : order); localStorage.setItem('sport-shoes-orders', JSON.stringify(orders)); showToast('وضعیت سفارش نمونه تغییر کرد.'); });
    $('#admin-category-form')?.addEventListener('submit', (event) => { event.preventDefault(); const input = $('#new-category-name'); const name = input.value.trim(); if (!name || categories.includes(name)) { input.setCustomValidity('نام دسته تکراری یا خالی است.'); input.reportValidity(); input.setCustomValidity(''); return; } categories.push(name); localStorage.setItem('sport-shoes-categories', JSON.stringify(categories)); input.value = ''; renderCategories(); const filter = $('#admin-product-category'); if (filter) filter.dataset.ready = ''; const formCategory = $('#form-product-category'); if (formCategory) formCategory.dataset.categoriesReady = ''; renderProducts(); showToast('دسته نمونه اضافه شد.'); });
    $('[data-admin-categories]')?.addEventListener('click', (event) => { const remove = event.target.closest('[data-remove-category]'); if (!remove) return; categories.splice(Number(remove.dataset.removeCategory), 1); localStorage.setItem('sport-shoes-categories', JSON.stringify(categories)); const filter = $('#admin-product-category'); if (filter) filter.dataset.ready = ''; const formCategory = $('#form-product-category'); if (formCategory) formCategory.dataset.categoriesReady = ''; renderCategories(); showToast('دسته نمونه حذف شد.'); });
    $('#admin-profile-form')?.addEventListener('submit', (event) => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; const feedback = $('#profile-feedback'); feedback.textContent = 'اطلاعات پروفایل نمونه به‌روزرسانی شد. این تغییر فقط در همین نمایش ثبت شد.'; });
    $('#admin-settings-form')?.addEventListener('submit', (event) => { event.preventDefault(); const feedback = $('#settings-feedback'); feedback.textContent = 'تنظیمات نمونه ذخیره شد؛ تغییری به سرور ارسال نشده است.'; });
    document.addEventListener('sport-shoes:products', renderProducts);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeAdmin, { once: true });
  else initializeAdmin();
})();
