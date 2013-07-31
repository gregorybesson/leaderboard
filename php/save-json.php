<?php
$file = "action.json";

if(!isset($_POST) && !isset($_POST['data'])) {
	echo 0;
	die();
}

$json = $_POST['data'];

file_put_contents($file, $json);

echo 1;

die();
?>