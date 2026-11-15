<?php
if(!isset($_POST)){
    echo "no value";
}

$price = $_POST['Pr'];
$Off = $_POST['Off'];
$select = $_POST['select'];

if(empty($price)){
    echo "no price value";
}
elseif($Off > 100 || $Off < 0){
    echo "off cant bigger than 100";
}
elseif($select == "R"){
    $p =  $Off * ($price / 100);
    $r = $price - $p;
    $r = number_format($r);
    echo "your finall output is : $r rial";
}
else{
    $p =  $Off * ($price / 100);
    $r = $price - $p;
    $r = number_format($r);
    echo "your finall output is : $r toman";
}