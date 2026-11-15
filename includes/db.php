<?php
mysqli_report(MYSQLI_REPORT_OFF);
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'sport_shoes';
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if (!$conn) {
    die('اتصال به دیتابیس برقرار نشد.');
}
mysqli_set_charset($conn, 'utf8mb4');
