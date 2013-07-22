<?php
if(!isset($_POST) || !isset($_POST["apiKey"]) || !isset($_POST["userId"]) ){
	die();
}

$args = array( 'apiKey' => $_POST["apiKey"], 'userId' => $_POST["userId"] );

$args["container"] = (isset($_POST["container"]) && isset($_POST["container"]) != "") ? $_POST["container"] : "body";

$args["html"] = (isset($_POST["html"]) && $_POST["html"] != "") ?
    str_replace("=", "%3D", $_POST["html"]) :
    "";

if(isset($_POST["style"]) && $_POST["style"] != ""){
	$args["style"] = $_POST["style"];
}

if(isset($_POST["duration"]) && $_POST["duration"] != ""){
	$args["duration"] = $_POST["duration"];
}

if(isset($_POST["script"]) && $_POST["script"] != ""){
	$args["script"] = $_POST["script"];
}

$ch = curl_init();
$curlConfig = array(
    //CURLOPT_URL            => "http://playground.dev:88/notification",
    CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS     => json_encode($args)
);
echo "<pre>";
var_dump($args);
curl_setopt_array($ch, $curlConfig);
$result = curl_exec($ch);
echo $result;
curl_close($ch);

?>
