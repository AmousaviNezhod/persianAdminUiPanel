<?php
session_start();
include 'includes/db.php';
$product_id = $_GET['id'] ?? '';
$product = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM products WHERE slug = '$product_id'"));
$related = mysqli_query($conn, "SELECT * FROM products WHERE category = '" . $product['category'] . "' AND id != " . $product['id'] . " LIMIT 3");
$sizes = explode(',', $product['sizes']);
?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?= $product['name'] ?> | Sport Shoes</title>
  <meta name="description" content="<?= $product['description'] ?>">
  <link rel="stylesheet" href="store-assets/store.css">
  <script src="store-assets/data.js" defer></script>
  <script src="store-assets/app.js" defer></script>
</head>

<body data-page="details"><?php include __DIR__ . '/includes/header.php'; ?><main class="store-main">
    <div class="store-container">
      <div class="breadcrumbs" style="padding-top:27px"><a href="index.php">خانه</a>　/　<a href="products.php">محصولات</a>　/　<?= $product['name'] ?></div>
      <section class="details">
        <div class="detail-photo"><img src="<?= $product['image'] ?>" alt="کفش ورزشی <?= $product['name'] ?>"></div>
        <div class="detail-info">
          <div class="product-brand"><?= $product['brand'] ?> · <?= $product['category'] ?></div>
          <h1><?= $product['name'] ?></h1>
          <p><?= $product['description'] ?></p>
          <div class="detail-price"><span><?= $product['price_label'] ?></span><?php if ($product['old_price_label']): ?> <span class="old-price"><?= $product['old_price_label'] ?></span><?php endif; ?></div>
          <div class="stock"><?= $product['stock'] ? 'موجود در انبار · ' . $product['stock'] . ' جفت' : 'در حال حاضر ناموجود' ?></div>
          <h2 style="font-size:14px;margin:22px 0 5px">انتخاب سایز (EU)</h2>
          <div class="size-options" data-detail-sizes>
            <?php foreach ($sizes as $index => $size): ?>
              <button type="button" class="size-option<?= $index === 2 ? ' active' : '' ?>" data-size="<?= $size ?>" aria-pressed="<?= $index === 2 ? 'true' : 'false' ?>"><?= $size ?></button>
            <?php endforeach; ?>
          </div>
          <div class="buy-row">
            <div class="quantity"><button type="button" data-quantity-minus aria-label="کم کردن تعداد">−</button><input data-quantity-value aria-label="تعداد" value="1" readonly><button type="button" data-quantity-plus aria-label="زیاد کردن تعداد">＋</button></div><button class="button" type="button" data-detail-add data-add-cart="<?= $product['slug'] ?>"<?= $product['stock'] ? '' : ' disabled' ?>><?= $product['stock'] ? 'افزودن به سبد خرید' : 'ناموجود' ?></button>
          </div>
          <div class="specs">
            <div class="spec-row"><span>برند</span><span><?= $product['brand'] ?></span></div>
            <div class="spec-row"><span>کاربری</span><span><?= $product['category'] ?></span></div>
            <div class="spec-row"><span>رنگ</span><span><?= $product['color'] ?></span></div>
            <div class="spec-row"><span>ضمانت</span><span>اصالت کالا و ۷ روز بازگشت</span></div>
          </div>
        </div>
      </section>
      <section class="section" style="padding-top:5px">
        <div class="section-head">
          <div><span class="eyebrow">انتخاب‌های نزدیک</span>
            <h2 class="section-title">محصولات مشابه</h2>
          </div><a href="products.php" class="text-link">مشاهده همه ←</a>
        </div>
        <div class="product-grid">
          <?php while ($item = mysqli_fetch_assoc($related)): ?>
            <article class="product-card">
              <a class="product-image" href="product.php?id=<?= $item['slug'] ?>" aria-label="مشاهده <?= $item['name'] ?>">
                <img src="<?= $item['image'] ?>" alt="کفش ورزشی <?= $item['name'] ?>" loading="lazy">
              </a>
              <button class="product-heart" type="button" aria-label="افزودن <?= $item['name'] ?> به علاقه‌مندی‌ها">♡</button>
              <div class="product-brand"><?= $item['brand'] ?> · <?= $item['category'] ?></div>
              <h3 class="product-name"><a href="product.php?id=<?= $item['slug'] ?>"><?= $item['name'] ?></a></h3>
              <div class="product-row"><div class="price"><?= $item['price_label'] ?><?php if ($item['old_price_label']): ?> <span class="old-price"><?= $item['old_price_label'] ?></span><?php endif; ?></div>
                <button class="add-cart" type="button" data-add-cart="<?= $item['slug'] ?>" aria-label="افزودن به سبد خرید">＋</button></div>
            </article>
          <?php endwhile; ?>
        </div>
      </section>
    </div>
  </main><?php include __DIR__ . '/includes/footer.php'; ?>
</body>

</html>
