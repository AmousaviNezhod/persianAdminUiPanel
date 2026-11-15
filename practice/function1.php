
<?php

function calc_sale_price($price,  $discount){
    $discount_price  =  $price *  ($discount   /  100);
    return  $price  -  $discount_price;
}

