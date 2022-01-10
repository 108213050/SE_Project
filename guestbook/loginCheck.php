<?php
session_start();
require("dbconnect.php");
$userName = $_POST['id'];
$pwd = $_POST['pwd'];

$userName = mysqli_real_escape_string($conn,$userName);
$pwd = mysqli_real_escape_string($conn,$pwd);
// $sql = "SELECE password,id FROM user WHERE loginID=$userName and password = PASSWORD($pwd)";
$sql = "SELECT `password`, `id` FROM `user` WHERE loginID='$userName' and `password`=password('$pwd')";
if ($result = mysqli_query($conn,$sql)) {
	echo "right";
	if ($row=mysqli_fetch_assoc($result)) {
			$_SESSION['uID'] = $row['id'];
			//provide a link to the message list UI
			echo "<a href='listMessage.php'>go</a>";
	} else {
		//print error message
			echo "Invalid Username or Password - Please try again <br />";
	}
}else{
	echo " Connect error";
	echo $userName."密碼".$pwd;
}
?>
