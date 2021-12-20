<?php
require("phpModel.php");
$id = (int)$_POST['i'];
$dataStr = $_POST['dat'];
$data = json_encode($dataStr);

/* 如果append時用
for (const pair of new FormData(myform)) {
	mydat.append(pair[0], pair[1]);
}
----
$name = $_POST['name'];
.....
*/ 


// $sql="update xxxTable where id=?";
updateData($id,$data);
echo "OK";
?>