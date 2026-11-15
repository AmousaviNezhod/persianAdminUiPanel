(() => {
  let products = window.SportShoesProducts || [];
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
