<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>پنل کاربری | Sport Shoes</title>
  <meta name="description" content="پنل کاربری Sport Shoes.">
  <link rel="stylesheet" href="store-assets/store.css">
  <script src="store-assets/data.js" defer></script>
  <script src="store-assets/app.js" defer></script>
</head>
<body data-page="panel">
  <?php include __DIR__ . '/includes/header.php'; ?>
  <main class="store-main">
    <div class="page-heading">
      <div class="store-container">
        <div class="breadcrumbs"><a href="index.php">خانه</a>　/　پنل کاربری</div>
        <h1 class="page-title">پنل کاربری</h1>
        <p class="section-copy">حساب کاربری و اطلاعات شخصی خود را در این بخش ببینید.</p>
      </div>
    </div>
    <section class="store-container panel-layout">
      <aside class="contact-card panel-profile">
        <img class="panel-avatar" src="<?= htmlspecialchars($_SESSION['user_image'], ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?>">
        <h2><?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?></h2>
        <p class="section-copy">@<?= htmlspecialchars($_SESSION['user_username'], ENT_QUOTES, 'UTF-8') ?></p>
        <a class="button secondary" href="logout.php">خروج از حساب</a>
      </aside>
      <div class="panel-content">
        <div class="contact-card">
          <span class="eyebrow">اطلاعات حساب</span>
          <h2>مشخصات کاربری</h2>
          <div class="specs">
            <div class="spec-row"><span>نام و نام خانوادگی</span><span><?= htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8') ?></span></div>
            <div class="spec-row"><span>نام کاربری</span><span><?= htmlspecialchars($_SESSION['user_username'], ENT_QUOTES, 'UTF-8') ?></span></div>
            <div class="spec-row"><span>وضعیت حساب</span><span>فعال</span></div>
            <div class="spec-row"><span>دسترسی</span><span>کاربر فروشگاه</span></div>
          </div>
        </div>
        <div class="contact-card">
          <span class="eyebrow">دسترسی سریع</span>
          <h2>ادامه خرید</h2>
          <p class="section-copy">محصولات تازه و دسته‌بندی‌های فروشگاه را ببینید.</p>
          <a class="button" href="products.php">مشاهده محصولات <span aria-hidden="true">←</span></a>
        </div>
      </div>
    </section>
  </main>
  <?php include __DIR__ . '/includes/footer.php'; ?>
</body>
</html>
