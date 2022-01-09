<?php
require("phpModel.php");
// In base4.js
// 取得資料
// getData: 處理SQL語法，負責處理拿到資料庫的資料
// let url="getData.php";
// 要求拿到資料，需要傳id(參數)告知要查哪一筆資料
// fetch(url+"?id=" + id.toString())


$id = (int)$_GET['id'];
// $sql="select * from xxxTable where id=?";
$result=getData($id);
echo json_encode($result);
?>