<?php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'sport_shoes';
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
mysqli_set_charset($conn, 'utf8mb4');
