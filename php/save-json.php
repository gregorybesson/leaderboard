<?php
$file = "action.json";
if(isset($_POST) && isset($_POST['data']))
	$json = $_POST['data'];

file_put_contents($file, $json);

?>