<?php
// Required parameters
if(!isset($_POST) || !isset($_POST["apiKey"]) || !isset($_POST["userId"]) || !isset($_POST["action"]) ){
	die();
}

define('SELF', 'self');
define('OTHERS', 'others');
define('ALL', 'all');

// Add each parameters
$args = array( 'apiKey' => $_POST["apiKey"], 'userId' => $_POST["userId"] );
$action = $_POST["action"];
$args["style"] = 'http://localhost/github/leaderboard/css/pmagento/all.css';
$args["container"] = 'body';
$welcome = '<div id="welcome" class="playground" >
					<div >
						<a
							href="#"
							 onclick="document.getElementById(\'welcome\').parentNode.removeChild(document.getElementById(\'welcome\'));"
							>X</a>
						User XXX has joined the game
					</div>
			</div>';

$bye = '<div id="bye" class="playground" >
					<div >
						<a
							href="#"
							 onclick="document.getElementById(\'bye\').parentNode.removeChild(document.getElementById(\'bye\'));"
							>X</a>
						User XXX has quit the game
					</div>
			</div>';
			
$win = '<div id="win" class="playground" >
					<div >
						<a
							href="#"
							 onclick="document.getElementById(\'win\').parentNode.removeChild(document.getElementById(\'win\'));"
							>X</a>
						You have found the secret treasure
					</div>
			</div>';

$loose = '<div id="loose" class="playground" >
					<div >
						<a
							href="#"
							 onclick="document.getElementById(\'loose\').parentNode.removeChild(document.getElementById(\'loose\'));"
							>X</a>
						User XXX has found the secret treasure
					</div>
			</div>';


function setRequestParam( $html, $who, $optional = '' )
{
	global $args;
	$args["html"] = str_replace("=", "%3D", $html);
	$args["who"] = $who;
	switch ($who) {
		case SELF:
			// nothing goes here yet
		break;
		case OTHERS:
			
		break;
		case ALL:
			$args["who"] = array(
				'others' => $optional
			);
		break;
		default:break;
	}
}

switch ($action) {
	case 'welcome':
		setRequestParam($welcome, OTHERS);
	break;
	case 'quit':
		setRequestParam($bye, OTHERS);
	break;
	case 'win':
		setRequestParam($win, ALL, array('container' => 'body', 'html', $loose));
	break;
	default:break;
}

// send to node server via curl
$ch = curl_init();
$curlConfig = array(
    CURLOPT_URL            => "http://192.168.1.34:88/notification",
    //CURLOPT_URL            => "http://192.168.1.108:88/notification",
    //CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
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
die();

// Add each parameters if they exist
$args = array( 'apiKey' => $_POST["apiKey"], 'userId' => $_POST["userId"] );
$args["container"] = (isset($_POST["container"]) && isset($_POST["container"]) != "") ? $_POST["container"] : "body";
$args["html"] = (isset($_POST["html"]) && $_POST["html"] != "") ?
    //str_replace("=", "%3D", $_POST["html"]) :
    urlencode($_POST["html"]) :
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
    CURLOPT_URL            => "http://192.168.1.34:88/notification",
    //CURLOPT_URL            => "http://192.168.1.108:88/notification",
    //CURLOPT_URL            => "http://ic.adfab.fr:88/notification",
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

die();
?>
