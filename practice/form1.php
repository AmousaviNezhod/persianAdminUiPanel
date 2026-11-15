

<?php

include('function1.php');

$value_price = isset($_GET['price'] ) ?  $_GET['price'] :0;
$value_discount = isset($_GET['discount'] ) ?  $_GET['discount'] :0;

if (isset($_GET['price'])){
    $price      =   $_GET['price'];
    $discount   =   $_GET['discount'];
    $currency   =   $_GET['currency'];
}

    $sale_price  =  calc_sale_price($price,  $discount);

    if($currency  ==  'tooman'){
        $price/=10;
        $sale_price/=10;
    }
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container mt-3">
  
  <form action="">
    <div class="mb-3 mt-3">
      <label for="price">Price:</label>
      <input type="text" class="form-control" id="price" placeholder="Enter price" name="price" value="<?php  echo $value_price ?>">
    </div>
    <div class="mb-3">
      <label for="count">Discount:</label>
      <input type="text" class="form-control" id="discount" placeholder="Enter discount" name="discount" value="<?php  echo $value_discount ?>">
    </div>
    <div class="mb-3">
      <label for="currency">Currency:</label>
        <select class="form-control" id="currency" name="currency">
            <option value="rial" <?php  echo  isset($currency) && $currency  ==  'rial' ? 'selected' : ''; ?>>ریال</option>
            <option value="tooman" <?php  echo  isset($currency) && $currency  ==  'tooman' ? 'selected' : ''; ?>>تومان</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>

  </form>

  <?php if(isset($sale_price)):  ?>  
    <div  >
        <del><?php  echo  number_format($price)   ?></del>
        <br>
        <ins>  <?php  echo  number_format($sale_price)  ?></ins>
        <br>
        <spa> <?php  echo  $discount  ?>%</spa>
    </div>
    <?php  endif;  ?>  

</div>

</body>
</html>




