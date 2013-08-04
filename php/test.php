<?php
// Required parameters
if(!isset($_POST) || !isset($_POST["apiKey"]) || !isset($_POST["userId"]) || !isset($_POST["action"]) ) die();

define('SELF', 'self');
define('OTHERS', 'others');
define('ALL', 'all');

// Add each parameters
$args = array( 'apiKey' => $_POST["apiKey"], 'userId' => $_POST["userId"] );
$action = $_POST["action"];
//$args["style"] = 'http://localhost/github/leaderboard/css/pmagento/all.css';
$args["style"] = 'http://ic.adfab.fr/mouthnode/leaderboard/css/pmagento/all.css';
$args["container"] = isset($_POST["container"]) ? $_POST["container"] : 'body';
$url = isset($_POST["url"]) ? $_POST["url"] : "http://ic.adfab.fr:88/notification";
// "http://192.168.1.34:88/notification"
// "http://192.168.1.108:88/notification"
// html for other user that the one that just logged in
$welcome ='<div id="welcome" class="playground" >' .
					'<div >' .
						'<a ' .
							'href="#" ' .
                            'onclick="document.getElementById(\'welcome\').parentNode.removeChild(document.getElementById(\'welcome\'));" ' .
							'>X</a>' .
						'User XXX has joined the game' .
					'</div>' .
			'</div>';

// html for other user that the one that just logged off
$bye = '<div id="bye" class="playground" >' .
					'<div >' .
						'<a ' .
							'href="#" ' .
                            'onclick="document.getElementById(\'bye\').parentNode.removeChild(document.getElementById(\'bye\'));" ' .
							'>X</a>' .
						'User XXX has quit the game' .
					'</div>' .
			'</div>';

// html for user that found the treasure
$win = '<div id="win" class="playground" >' .
					'<div >' .
						'<a ' .
							'href="#" ' .
                            'onclick="document.getElementById(\'win\').parentNode.removeChild(document.getElementById(\'win\'));" ' .
							'>X</a>' .
						'You have found the secret treasure' .
					'</div>' .
			'</div>';

// html for other user that loose and didn't find the treasure
$loose = '<div id="loose" class="playground" >' .
					'<div >' .
						'<a ' .
							'href="#" ' .
                            'onclick="document.getElementById(\'loose\').parentNode.removeChild(document.getElementById(\'loose\'));" ' .
							'>X</a>' .
						'User XXX has found the secret treasure' .
					'</div>' .
			'</div>';

/**
 * Actually send the notification
 * 
 * @return void
 */
function sendRequest()
{
    global $args, $url;
    
    $ch = curl_init();
    $curlConfig = array(
        CURLOPT_URL            => $url,
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
}

/**
 * Prepare the notification
 * @param $html, html content to send
 * @param $who, who will get it ( see constants at the beginning of the file )
 * 
 * @return void
 */
function setRequestParam( $html, $who )
{
	global $args, $loose;
	$args["html"] = str_replace("=", "%3D", $html);
	$args["who"] = $who;
	switch ($who) {
		case SELF:
			sendRequest();
		break;
		case OTHERS:
            sendRequest();
		break;
		case ALL:
			$args["who"] = SELF;
            sendRequest();
            
            $args["html"] = str_replace("=", "%3D", $loose);
            $args["who"] = OTHERS;
            sendRequest();
		break;
		default:break;
	}
}

// Switch to requested action
switch ($action) {
	case 'welcome':
		setRequestParam($welcome, OTHERS);
	break;
	case 'quit':
		setRequestParam($bye, OTHERS);
	break;
	case 'win':
		setRequestParam($win, ALL);
	break;
	default:break;
}

die();
?>
