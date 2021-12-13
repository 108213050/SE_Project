<?php
require('todoModel.php');
// 檢查有沒有這個act傳入值
if (isset($_REQUEST['act'])){
	$act=$_REQUEST['act'];
}else{
	$act = '';
}

switch ($act) {
	case "addJob":
		$title=$_POST['title'];
		$note=$_POST['note'];
		if ($title) {
			//實質上insert的
			addJob($title,$note);// 防呆
		}
		break;
	case "setFinish":
		// 傳回工作ID
		// 強迫變成整數，做個簡單防呆
		$id=(int)$_REQUEST['id'];
		if ($id>0) {
			// 傳給後台todoModel去處理工作完成的動作
			setFinished($id);
		}
		break;
	case "getList":
		// 產生一個清單
		// 假設沒有多個使用者，單一使用者
		// $list : 未完成工作清單
		// getjoblist() : 拿到清單
		// 2: type = 2 ，未完成 
		$list = getJobList(2);
		// 將清單轉為json
		echo json_encode($list);
		break;

	default:
}
?>

