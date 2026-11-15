<?php 

include 'jdf.php';

echo jdate('f - d - y').'<br>';

echo jdate('f - d - y' ,strtotime('-3 monday') ,);