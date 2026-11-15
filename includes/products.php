<?php
require_once __DIR__ . '/db.php';
$products = array();
$products_result = mysqli_query($conn, "SELECT * FROM products ORDER BY id");
while ($products_row = mysqli_fetch_assoc($products_result)) {
    $products[] = $products_row;
}
