<?php

$ch = curl_init();
$curlConfig = array(
    CURLOPT_URL            => "http://playground.dev:88/notification",
    //CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS     => json_encode(array(
		"apiKey" => "key_first",
		"userId" => ":tos0oihbl0akclorlt/",
		"container" => "body",
		"html" => '<div class%3D"imaclass">this is a test</div>'
	))
);
echo htmlentities("<div class='im-a-class'>this is a test</div>" ,ENT_QUOTES);
curl_setopt_array($ch, $curlConfig);
$result = curl_exec($ch);
curl_close($ch);

?>
