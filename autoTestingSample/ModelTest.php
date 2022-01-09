<?php
// 我要測的模組
require("model.php");
echo "test getAvg\n";
// 定義預期輸入值
$testcase=[
	//[x, y, expected]
	[0,2,1],
	[1,2,1],
	[1,1,1]
];

foreach ($testcase as $t) {
	echo "testing {$t[0]}, {$t[1]}";
	// 如果為預期輸入值
	if (getAvg($t[0], $t[1]) == $t[2]) {
		echo "... pass\n";
	} else {
		echo "... failed\n";		
	}
}

echo "test getMax\n";
// 定義一組輸入值
$testcase=[
	//[x, y, expected]
	[0,2,2],
	[1,1,1],
	[3,1,3]
];

foreach ($testcase as $t) {
	echo "testing {$t[0]}, {$t[1]}";
	if (getMax($t[0], $t[1]) == $t[2]) {
		echo "... pass\n";
	} else {
		echo "... failed\n";		
	}
}

?>