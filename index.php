<?php
session_start();
require __DIR__ . '/includes/products.php';
$categories = mysqli_query($conn, "SELECT * FROM categories ORDER BY id");
$features = mysqli_query($conn, "SELECT * FROM features ORDER BY id");
?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Sport Shoes</title>
  <meta name="description" content="کفش‌های ورزشی انتخاب‌شده برای دویدن، تمرین و زندگی روزمره.">
  <link rel="stylesheet" href="store-assets/store.css">
  <script src="store-assets/data.js" defer></script><script src="store-assets/app.js" defer></script>
</head>
<body data-page="home">
  <?php include __DIR__ . '/includes/header.php'; ?>
  <main class="store-main">
    <section class="hero store-container" aria-label="کفش‌های منتخب">
      <div class="hero-slider">
        <?php $slide = 0; ?>
        <?php foreach ($products as $product): ?>
          <div class="hero-frame hero-slide<?= $slide === 0 ? ' active' : '' ?>">
            <div class="hero-media" style="background-image:linear-gradient(90deg,rgba(15,18,21,.08),rgba(15,18,21,.22)),url('<?= $product['image'] ?>')"></div>
            <div class="hero-copy">
              <div class="hero-meta"><?= $product['price_label'] ?></div>
              <h1><?= $product['name'] ?></h1>
              <p><?= $product['description'] ?></p>
              <div class="hero-cta"><a class="button" href="product.php?id=<?= $product['slug'] ?>">مشاهده محصول <span aria-hidden="true">←</span></a><a class="text-link" href="products.php">تمام محصولات</a></div>
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
    <?php if (isset($_SESSION['user_id'])): ?>
      <section class="store-container user-welcome" aria-label="حساب کاربری">
        <div class="user-welcome-profile">
          <img class="user-welcome-avatar" src="<?= htmlspecialchars($_SESSION['user_image'], ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?>">
          <div>
            <span class="eyebrow">خوش آمدید</span>
            <h2><?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?></h2>
            <p>حساب شما با نام کاربری <?= htmlspecialchars($_SESSION['user_username'], ENT_QUOTES, 'UTF-8') ?> فعال است.</p>
          </div>
        </div>
        <a class="button" href="panel.php">پنل کاربری <span aria-hidden="true">←</span></a>
      </section>
    <?php endif; ?>
    <section class="section store-container" aria-labelledby="categories-title">
      <div class="section-head"><div><span class="eyebrow">پیدا کن، انتخاب کن، حرکت کن</span><h2 class="section-title" id="categories-title">برای هر مسیر، یک جفت مناسب</h2></div><a href="products.php" class="text-link">دیدن همه دسته‌ها ←</a></div>
      <div class="category-grid">
        <?php while ($category = mysqli_fetch_assoc($categories)): ?>
          <a class="category-tile" href="products.php?category=<?= $category['name'] ?>"><div><strong><?= $category['name'] ?></strong><span><?= $category['description'] ?></span></div><span class="category-glyph"><?= $category['glyph'] ?></span></a>
        <?php endwhile; ?>
      </div>
    </section>
    <section class="section store-container" aria-labelledby="featured-title" style="padding-top:0">
      <div class="section-head"><div><span class="eyebrow">انتخاب‌های این هفته</span><h2 class="section-title" id="featured-title">مدل‌هایی که بیشتر می‌پسندید</h2><p class="section-copy">هر مدل را بر اساس راحتی، کیفیت ساخت و استفاده واقعی انتخاب کرده‌ایم.</p></div><a href="products.php" class="text-link">مشاهده همه محصولات ←</a></div>
      <div class="product-grid">
        <?php foreach ($products as $product): ?>
          <article class="product-card">
            <a class="product-image" href="product.php?id=<?= $product['slug'] ?>" aria-label="مشاهده <?= $product['name'] ?>">
              <img src="<?= $product['image'] ?>" alt="کفش ورزشی <?= $product['name'] ?>" loading="lazy">
            </a>
            <button class="product-heart" type="button" aria-label="افزودن <?= $product['name'] ?> به علاقه‌مندی‌ها">♡</button>
            <div class="product-brand"><?= $product['brand'] ?> · <?= $product['category'] ?></div>
            <h3 class="product-name"><a href="product.php?id=<?= $product['slug'] ?>"><?= $product['name'] ?></a></h3>
            <div class="product-row"><div class="price"><?= $product['price_label'] ?></div>
              <button class="add-cart" type="button" data-add-cart="<?= $product['slug'] ?>" aria-label="افزودن به سبد خرید">＋</button></div>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
    <section class="section store-container" style="padding-top:0">
      <div class="features">
        <div><span class="eyebrow">SPORT SHOES SERVICE</span><h2 class="section-title" style="font-size:20px;margin:3px 0">خریدی مطمئن، از انتخاب تا قدم اول</h2></div>
        <?php while ($feature = mysqli_fetch_assoc($features)): ?>
          <div class="feature"><span class="feature-icon"><?= $feature['icon'] ?></span><div><strong><?= $feature['title'] ?></strong><span><?= $feature['description'] ?></span></div></div>
        <?php endwhile; ?>
      </div>
    </section>
    <section class="section store-container" style="padding-top:0"><div class="cta-band"><div><span class="eyebrow">انتخاب بعدی نزدیک است</span><h2>یک جفت برای مسیر خودت پیدا کن</h2><p>مدل‌ها را مقایسه کن و چیزی را انتخاب کن که به حرکت تو می‌آید.</p></div><a class="button" href="products.php">رفتن به فروشگاه ←</a></div></section>
  </main>
  <?php include __DIR__ . '/includes/footer.php'; ?>
</body>
</html>
