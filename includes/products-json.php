<?php
require_once __DIR__ . '/db.php';
$json_result = mysqli_query($conn, "SELECT * FROM products ORDER BY id");
$json_products = array();
while ($json_row = mysqli_fetch_assoc($json_result)) {
    $json_sizes = array();
    foreach (explode(',', $json_row['sizes']) as $json_size) {
        $json_sizes[] = (int) $json_size;
    }
    $json_products[] = array(
        'id' => $json_row['slug'],
        'name' => $json_row['name'],
        'brand' => $json_row['brand'],
        'category' => $json_row['category'],
        'price' => (int) $json_row['price'],
        'oldPrice' => $json_row['old_price'] === null ? null : (int) $json_row['old_price'],
        'stock' => (int) $json_row['stock'],
        'tag' => $json_row['tag'],
        'image' => $json_row['image'],
        'color' => $json_row['color'],
        'sizes' => $json_sizes,
        'description' => $json_row['description'],
    );
}
?>
<script>window.SportShoesProducts = <?php echo json_encode($json_products, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG); ?>;</script>
