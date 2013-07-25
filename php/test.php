<?php
// Required parameters
if(!isset($_POST) || !isset($_POST["apiKey"]) || !isset($_POST["userId"]) ){
	die();
}

// Add each parameters if they exist
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
// send to node server via curl
$ch = curl_init();
$curlConfig = array(
    //CURLOPT_URL            => "http://192.168.1.108:88/notification",
    CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS     => json_encode($args)
);
// print the array that was sent
echo "<pre>";
var_dump($args);
curl_setopt_array($ch, $curlConfig);
$result = curl_exec($ch);
curl_close($ch);

?>
