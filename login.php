<?php
session_start();
require __DIR__ . '/includes/db.php';
if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
$username = '';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    if ($username === '' || $password === '') {
        $error = 'نام کاربری و رمز عبور را وارد کنید.';
    } else {
        $login_stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE username = ?");
        mysqli_stmt_bind_param($login_stmt, 's', $username);
        mysqli_stmt_execute($login_stmt);
        $user = mysqli_fetch_assoc(mysqli_stmt_get_result($login_stmt));
        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_username'] = $user['username'];
            $_SESSION['user_image'] = $user['image'];
            header('Location: index.php');
            exit;
        }
        $error = 'نام کاربری یا رمز عبور اشتباه است.';
    }
}
?>
<!doctype html>
<html lang="fa" dir="rtl" data-bs-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ورود | Sport Shoes</title>
  <meta name="description" content="ورود به حساب کاربری Sport Shoes.">
  <link rel="stylesheet" href="store-assets/store.css">
  <script src="store-assets/data.js" defer></script>
  <script src="store-assets/app.js" defer></script>
</head>
<body data-page="login">
  <?php include __DIR__ . '/includes/header.php'; ?>
  <main class="store-main">
    <div class="page-heading">
      <div class="store-container">
        <div class="breadcrumbs"><a href="index.php">خانه</a>　/　ورود</div>
        <h1 class="page-title">ورود به حساب</h1>
        <p class="section-copy">برای مشاهده پنل کاربری، نام کاربری و رمز عبور خود را وارد کنید.</p>
      </div>
    </div>
    <section class="store-container login-layout">
      <form class="contact-form login-card" method="post" action="login.php">
        <span class="eyebrow">حساب کاربری</span>
        <h2>خوش برگشتی</h2>
        <p class="section-copy">اطلاعات ورود شما با جدول کاربران در دیتابیس بررسی می‌شود.</p>
        <div class="form-field">
          <label for="login-username">نام کاربری</label>
          <input class="field" id="login-username" type="text" name="username" value="<?= htmlspecialchars($username, ENT_QUOTES, 'UTF-8') ?>" placeholder="نام کاربری" autocomplete="username" required autofocus>
        </div>
        <div class="form-field">
          <label for="login-password">رمز عبور</label>
          <input class="field" id="login-password" type="password" name="password" placeholder="رمز عبور" autocomplete="current-password" required>
        </div>
        <button class="button" type="submit">ورود به حساب <span aria-hidden="true">←</span></button>
        <?php if ($error !== ''): ?>
          <p class="form-message error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p>
        <?php endif; ?>
      </form>
      <aside class="contact-card login-note">
        <span class="eyebrow">حساب نمایشی</span>
        <h2>برای آزمایش وارد شوید</h2>
        <div class="contact-item"><strong>نام کاربری</strong><span>amir</span></div>
        <div class="contact-item"><strong>رمز عبور</strong><span>123456</span></div>
        <div class="contact-item"><strong>حساب دوم</strong><span>sara / 123456</span></div>
        <p class="section-copy">پس از ورود، عکس و نام شما در صفحه اصلی و پنل کاربری نمایش داده می‌شود.</p>
      </aside>
    </section>
  </main>
  <?php include __DIR__ . '/includes/footer.php'; ?>
</body>
</html>
