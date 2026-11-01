<?php require __DIR__ . '/includes/products.php'; ?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>محصولات | Sport Shoes</title><meta name="description" content="تمام کفش‌های ورزشی Sport Shoes را ببینید."><link rel="stylesheet" href="store-assets/store.css"><script src="store-assets/data.js" defer></script><script src="store-assets/app.js" defer></script></head>
<body data-page="products"><?php require __DIR__ . '/includes/header.php'; ?><main class="store-main"><div class="page-heading"><div class="store-container"><div class="breadcrumbs"><a href="index.php">خانه</a>　/　محصولات</div><h1 class="page-title">پیدا کردن جفت بعدی</h1><p class="section-copy">مدل‌های منتخب برای دویدن، تمرین، طبیعت‌گردی و روزهای معمولی.</p></div></div>
  <div class="store-container" style="padding:32px 0 70px">
    <div class="product-grid">
      <?php foreach ($products as $product): ?>
        <article class="product-card">
          <a class="product-image" href="<?= $product['link'] ?>" aria-label="مشاهده <?= $product['name'] ?>">
            <img src="<?= $product['image'] ?>" alt="کفش ورزشی <?= $product['name'] ?>" loading="lazy">
          </a>
          <button class="product-heart" type="button" aria-label="افزودن <?= $product['name'] ?> به علاقه‌مندی‌ها">♡</button>
          <div class="product-brand"><?= $product['description'] ?></div>
          <h3 class="product-name"><a href="<?= $product['link'] ?>"><?= $product['name'] ?></a></h3>
          <div class="product-row"><div class="price"><?= $product['price'] ?></div>
            <button class="add-cart" type="button" data-add-cart="<?= $product['link'] ?>" aria-label="افزودن به سبد خرید">＋</button></div>
        </article>
      <?php endforeach; ?>
    </div>
  </div></main><?php require __DIR__ . '/includes/footer.php'; ?></body></html>
