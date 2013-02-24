<?php
if(!isset($_GET)) die();

$hostname = "localhost";
$username = "root";
$password = "";

if(isset($_GET['API_KEY']) && isset($_GET['leaderboard'])){
	getLeaderboard($hostname, $username, $password, $_GET['API_KEY']);
}

function connect ($hostname, $username, $password)
{
	try{
		$db = new PDO("mysql:host=$hostname;dbname=leaderboard", $username, $password);
		return $db;
	}
	catch(PDOException $e) { echo $e->getMessage(); }
}

function disconnect ($db)
{
    $db = null; // close the database connection
}

function getLeaderboard ($hostname, $username, $password, $key)
{
	$db = connect($hostname, $username, $password);
	try {
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
	    $sql = "SELECT * FROM user join leaderboard WHERE user.iduser = leaderboard.user_iduser AND leaderboard.client_apikey = '$key';";
	    $result = $db->query($sql);
		$arr = array("users" => array());
	    foreach ($result as $row) {
	    	$arr["users"][] = 
	    	array_push($arr["users"], array(
				"username"	=> "user-0" . $row["iduser"],
				"total_points"	=> $row["total_points"],
				"last_updt" => $row["last_updt"],
				"points" => $row["last_points_updt"]
			));
	        //echo $row["iduser"] ." - ". $row["total_points"] . "<br />";
	    }
		header('Cache-Control: no-cache, must-revalidate');
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Content-type: application/json');
		echo json_encode($arr);
		disconnect($db);
	} catch(PDOException $e) { echo $e->getMessage(); }
}
/*
{
            "users" : [
                { "username" : "user 1", "points" : "250" },
                { "username" : "user 2", "points" : "220" },
                { "username" : "user 3", "points" : "200" },
                { "username" : "user 4", "points" : "150" },
                { "username" : "user 5", "points" : "135" },
                { "username" : "user 6", "points" : "99" },
                { "username" : "user 7", "points" : "75" },
                { "username" : "user 8", "points" : "55" },
                { "username" : "user 9", "points" : "46" },
                { "username" : "user 10", "points" : "12" }
            ],
            room : roomName // Don't forget to re-send room's name
        }
*/

?>