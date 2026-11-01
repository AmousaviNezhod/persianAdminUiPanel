<?php require __DIR__ . '/includes/products.php'; ?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Sport Shoes | برای حرکت ساخته شده</title>
  <meta name="description" content="کفش‌های ورزشی انتخاب‌شده برای دویدن، تمرین و زندگی روزمره.">
  <link rel="stylesheet" href="store-assets/store.css">
  <script src="store-assets/data.js" defer></script><script src="store-assets/app.js" defer></script>
</head>
<body data-page="home">
  <?php require __DIR__ . '/includes/header.php'; ?>
  <main class="store-main">
    <section class="hero store-container" aria-label="کفش‌های منتخب">
      <div class="hero-slider">
        <?php $slide = 0; ?>
        <?php foreach ($products as $product): ?>
          <div class="hero-frame hero-slide<?= $slide === 0 ? ' active' : '' ?>">
            <div class="hero-media" style="background-image:linear-gradient(90deg,rgba(15,18,21,.08),rgba(15,18,21,.22)),url('<?= $product['image'] ?>')"></div>
            <div class="hero-copy">
              <div class="hero-meta"><?= $product['price'] ?></div>
              <h1><?= $product['name'] ?></h1>
              <p><?= $product['description'] ?></p>
              <div class="hero-cta"><a class="button" href="<?= $product['link'] ?>">مشاهده محصول <span aria-hidden="true">←</span></a><a class="text-link" href="products.php">تمام محصولات</a></div>
            </div>
          </div>
          <?php $slide++; ?>
        <?php endforeach; ?>
        <div class="hero-controls">
          <button class="hero-arrow" type="button" data-hero-prev aria-label="اسلاید قبلی">‹</button>
          <button class="hero-arrow" type="button" data-hero-next aria-label="اسلاید بعدی">›</button>
          <?php foreach ($products as $product): ?>
            <button class="hero-dot" type="button" data-slide aria-label="نمایش <?= $product['name'] ?>"></button>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
    <section class="section store-container" aria-labelledby="categories-title">
      <div class="section-head"><div><span class="eyebrow">پیدا کن، انتخاب کن، حرکت کن</span><h2 class="section-title" id="categories-title">برای هر مسیر، یک جفت مناسب</h2></div><a href="products.php" class="text-link">دیدن همه دسته‌ها ←</a></div>
      <div class="category-grid">
        <a class="category-tile" href="products.php?category=دویدن"><div><strong>دویدن</strong><span>برای ریتم‌های تازه</span></div><span class="category-glyph">↗</span></a>
        <a class="category-tile" href="products.php?category=تمرین"><div><strong>تمرین</strong><span>پایداری در هر تکرار</span></div><span class="category-glyph">⌁</span></a>
        <a class="category-tile" href="products.php?category=روزمره"><div><strong>روزمره</strong><span>راحتی از صبح تا شب</span></div><span class="category-glyph">◌</span></a>
        <a class="category-tile" href="products.php?category=طبیعت‌گردی"><div><strong>طبیعت‌گردی</strong><span>آماده راه‌های نرفته</span></div><span class="category-glyph">⌖</span></a>
      </div>
    </section>
    <section class="section store-container" aria-labelledby="featured-title" style="padding-top:0">
      <div class="section-head"><div><span class="eyebrow">انتخاب‌های این هفته</span><h2 class="section-title" id="featured-title">مدل‌هایی که بیشتر می‌پسندید</h2><p class="section-copy">هر مدل را بر اساس راحتی، کیفیت ساخت و استفاده واقعی انتخاب کرده‌ایم.</p></div><a href="products.php" class="text-link">مشاهده همه محصولات ←</a></div>
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
    </section>
    <section class="section store-container" style="padding-top:0"><div data-store-benefits></div></section>
    <section class="section store-container" style="padding-top:0"><div class="cta-band"><div><span class="eyebrow">انتخاب بعدی نزدیک است</span><h2>یک جفت برای مسیر خودت پیدا کن</h2><p>مدل‌ها را مقایسه کن و چیزی را انتخاب کن که به حرکت تو می‌آید.</p></div><a class="button" href="products.php">رفتن به فروشگاه ←</a></div></section>
  </main>
  <?php require __DIR__ . '/includes/footer.php'; ?>
</body>
</html>
