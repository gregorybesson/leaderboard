<?php
$ch = curl_init();
$curlConfig = array(
    CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS     => json_encode(
		array(
			"apiKey" => "key_first",
			"userId" => ":tos0oihbl0akclorlt/",
			"container" => "body",
			"html" => "<div >test</div>"
		)
    )
);
curl_setopt_array($ch, $curlConfig);
$result = curl_exec($ch);
curl_close($ch);

?>
