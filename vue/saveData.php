<?php
require("phpModel.php");
$id = (int)$_POST['i'];
$dataStr = $_POST['dat'];
// 物件轉為json
$data = json_encode($dataStr);
// 取得特定欄位的值 $data['name'] = 
/* 如果append時用
for (const pair of new FormData(myform)) {
	mydat.append(pair[0], pair[1]);
}
----
// this is the tradition way
// 逐一欄位一個值加進去
$name = $_POST['name'];
.....
*/ 


// $sql="update xxxTable where id=?";
updateData($id,$data);
echo "OK";
?>