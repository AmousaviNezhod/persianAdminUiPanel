<?php
$currentPage = basename($_SERVER['SCRIPT_NAME'] ?? 'index.php');
$navItems = [
    'index.php' => ['home', 'خانه'],
    'products.php' => ['products', 'محصولات'],
    'about.php' => ['about', 'درباره ما'],
    'contact.php' => ['contact', 'تماس با ما'],
];
?>
<header class="store-header">
  <nav class="store-container store-nav" aria-label="ناوبری اصلی">
    <a href="index.php" class="store-brand"><span class="brand-mark">S</span> Sport Shoes</a>
    <div class="store-links">
      <?php foreach ($navItems as $href => [$page, $label]): ?>
        <a href="<?= htmlspecialchars($href, ENT_QUOTES, 'UTF-8') ?>" data-nav="<?= htmlspecialchars($page, ENT_QUOTES, 'UTF-8') ?>"<?= $currentPage === $href ? ' class="active" aria-current="page"' : '' ?>><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></a>
      <?php endforeach; ?>
    </div>
    <div class="store-actions">
      <a class="icon-button search-action" href="products.php#catalog-search" aria-label="جست‌وجوی محصولات">⌕</a>
      <button class="icon-button" type="button" data-open-cart aria-label="نمایش سبد خرید">♧<span class="cart-count" data-cart-count>۰</span></button>
      <button class="icon-button mobile-menu" type="button" data-mobile-menu aria-label="باز کردن منو">☰</button>
    </div>
  </nav>
</header>
<button class="mobile-nav-backdrop" type="button" data-mobile-menu-close data-mobile-menu-backdrop aria-label="بستن منوی ناوبری"></button>
<aside class="mobile-nav-sheet" data-mobile-drawer role="dialog" aria-modal="true" aria-label="منوی اصلی" aria-hidden="true">
  <div class="mobile-nav-handle" aria-hidden="true"></div>
  <div class="mobile-nav-sheet-head"><a href="index.php" class="store-brand"><span class="brand-mark">S</span> Sport Shoes</a><button class="mobile-nav-close" type="button" data-mobile-menu-close aria-label="بستن منو">×</button></div>
  <nav class="mobile-nav-links" aria-label="صفحات فروشگاه">
    <?php foreach ($navItems as $href => [$page, $label]): ?>
      <a href="<?= htmlspecialchars($href, ENT_QUOTES, 'UTF-8') ?>" data-nav="<?= htmlspecialchars($page, ENT_QUOTES, 'UTF-8') ?>"<?= $currentPage === $href ? ' class="active" aria-current="page"' : '' ?>><span><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></span><span class="mobile-nav-arrow" aria-hidden="true">←</span></a>
    <?php endforeach; ?>
  </nav>
  <p class="mobile-nav-note">برای حرکت ساخته شده.</p>
</aside>
<button class="cart-backdrop" type="button" data-close-cart data-cart-backdrop aria-label="بستن سبد خرید" tabindex="-1"></button>
<aside class="cart-drawer" data-cart-drawer role="dialog" aria-modal="true" aria-label="سبد خرید" aria-hidden="true">
  <div class="cart-drawer-head"><strong>سبد خرید</strong><button class="cart-drawer-close" type="button" data-close-cart aria-label="بستن">×</button></div>
  <div data-cart-items></div><div class="cart-total" data-cart-total></div>
</aside>
<div class="toast" role="status" aria-live="polite" data-toast></div>
