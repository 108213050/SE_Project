<?php
require("phpModel.php");
$id = (int)$_GET['id'];
// $sql="select * from xxxTable where id=?";
$result=getData($id);
echo json_encode($result);
?>