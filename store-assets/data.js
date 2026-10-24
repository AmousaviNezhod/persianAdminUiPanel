(() => {
  let products = [
    { id: 'velocity-pro', name: 'Velocity Pro 2', brand: 'Nike', category: 'دویدن', price: 4890000, oldPrice: 5690000, stock: 18, tag: 'پرفروش', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=88' , color: 'لیمویی / سفید', sizes: [39, 40, 41, 42, 43, 44], description: 'کفش سبک و واکنش‌گرا برای تمرین‌های روزانه و مسیرهای طولانی. رویه مشبک تنفس‌پذیر و زیره فومی نرم، هر قدم را روان‌تر می‌کند.' },
    { id: 'court-classic', name: 'Court Classic', brand: 'Adidas', category: 'روزمره', price: 3650000, oldPrice: null, stock: 12, tag: 'تازه رسیده', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=88' , color: 'قهوه‌ای', sizes: [40, 41, 42, 43, 44], description: 'سیلوئت کلاسیک با رویه چرمی نرم؛ مناسب استفاده روزانه، رفت‌وآمد شهری و استایل‌های ساده.' },
    { id: 'air-dash', name: 'Air Dash 90', brand: 'Nike', category: 'دویدن', price: 5290000, oldPrice: 5990000, stock: 7, tag: 'تخفیف ویژه', image: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=88' , color: 'مشکی', sizes: [39, 40, 41, 42, 43], description: 'ساختار سبک و زیره مقاوم برای دویدن شهری؛ طراحی جمع‌وجور و حمایت مناسب از پا.' },
    { id: 'trail-motion', name: 'Trail Motion XT', brand: 'Salomon', category: 'طبیعت‌گردی', price: 6120000, oldPrice: null, stock: 9, tag: 'موجود', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=88' , color: 'سرمه‌ای', sizes: [40, 41, 42, 43, 44, 45], description: 'چسبندگی مطمئن و محافظت بیشتر برای مسیرهای ناهموار؛ انتخابی قابل اعتماد برای طبیعت‌گردی.' },
    { id: 'urban-flex', name: 'Urban Flex', brand: 'Puma', category: 'روزمره', price: 3190000, oldPrice: 3790000, stock: 23, tag: 'پرفروش', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88' , color: 'سفید', sizes: [38, 39, 40, 41, 42, 43], description: 'راحتی تمام‌روز با فرم مینیمال و زیره منعطف؛ برای روزهای شلوغ و قدم‌زدن‌های طولانی.' },
    { id: 'court-ace', name: 'Court Ace Indoor', brand: 'Asics', category: 'تمرین', price: 4380000, oldPrice: null, stock: 5, tag: 'موجودی محدود', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=88' , color: 'نارنجی / سفید', sizes: [39, 40, 41, 42, 43], description: 'پایداری جانبی و کف غیرلغزنده برای تمرین و بازی داخل سالن.' },
    { id: 'stride-lite', name: 'Stride Lite', brand: 'New Balance', category: 'دویدن', price: 4590000, oldPrice: null, stock: 14, tag: 'تازه رسیده', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88' , color: 'سفید / طوسی', sizes: [39, 40, 41, 42, 43, 44], description: 'ترکیب بالشتک‌گذاری نرم و پشتیبانی متعادل برای تمرین‌های منظم.' },
    { id: 'street-low', name: 'Street Low Canvas', brand: 'Converse', category: 'روزمره', price: 2780000, oldPrice: 3090000, stock: 0, tag: 'ناموجود', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=88' , color: 'سرمه‌ای', sizes: [39, 40, 41, 42, 43], description: 'کفش روزمره سبک با فرم آشنای خیابانی؛ مناسب ترکیب با استایل‌های کژوال.' },
    { id: 'run-essentials', name: 'Run Essentials', brand: 'Reebok', category: 'تمرین', price: 3420000, oldPrice: null, stock: 11, tag: 'موجود', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=88' , color: 'سفید', sizes: [38, 39, 40, 41, 42, 43, 44], description: 'کفشی کاربردی برای گرم‌کردن، تمرین سبک و استفاده روزمره.' },
  ];
  try { products = JSON.parse(localStorage.getItem('sport-shoes-products')) || products; } catch { /* Keep the bundled demo catalog. */ }
  const saveProducts = (nextProducts) => { products = nextProducts; localStorage.setItem('sport-shoes-products', JSON.stringify(products)); document.dispatchEvent(new CustomEvent('sport-shoes:products', { detail: products })); };
  const formatPrice = (amount) => `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
  const readCart = () => {
    try { return JSON.parse(localStorage.getItem('sport-shoes-cart') || '[]'); } catch { return []; }
  };
  const saveCart = (cart) => {
    localStorage.setItem('sport-shoes-cart', JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('sport-shoes:cart', { detail: cart }));
  };
  const addToCart = (id, quantity = 1, size = null) => {
    const item = products.find((product) => product.id === id);
    if (!item || item.stock < 1) return false;
    const cart = readCart();
    const existing = cart.find((entry) => entry.id === id && entry.size === size);
    if (existing) existing.quantity += quantity;
    else cart.push({ id, quantity, size });
    saveCart(cart);
    return true;
  };
  const updateCartCount = () => {
    const count = readCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((badge) => { badge.textContent = new Intl.NumberFormat('fa-IR').format(count); });
  };
  window.SportShoes = { get products() { return products; }, saveProducts, formatPrice, readCart, saveCart, addToCart, updateCartCount };
})();
