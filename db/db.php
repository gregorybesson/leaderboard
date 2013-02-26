<?php
if(!isset($_GET)) die();

$hostname = "localhost";
$username = "root";
$password = "";

if(isset($_GET['API_KEY']) && isset($_GET['leaderboard'])){
	getLeaderboard($hostname, $username, $password, $_GET['API_KEY']);
}

if(isset($_GET['iduser']) && isset($_GET['points'])){
    updtUserPoints($hostname, $username, $password, $_GET['iduser'], $_GET['points']);
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
        $sql = "SELECT *
                FROM user AS u
                LEFT JOIN leaderboard AS l
                ON u.iduser = l.user_iduser
                WHERE l.client_apikey = '$key';";
            
	    $result = $db->query($sql);
		$arr = array("users" => array());
	    foreach ($result as $row) {
	    	array_push($arr["users"], array(
				"username"	=> "user-0" . $row["iduser"],
				"total_points"	=> $row["total_points"],
				"last_updt" => $row["last_updt"],
				"points" => $row["last_points_updt"]
			));
	    }
        
		header('Cache-Control: no-cache, must-revalidate');
		header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
		header('Content-type: application/json');
		echo json_encode($arr);
        
		disconnect($db);
	} catch(PDOException $e) { echo $e->getMessage(); }
}

function updtUserPoints ($hostname, $username, $password, $iduser, $points)
{
    $db = connect($hostname, $username, $password);
    try {
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        $sql = "UPDATE user
                SET total_points=(total_points+$points), last_updt=NOW(), last_points_updt=$points
                WHERE user.iduser=$iduser;";
        
        $result = $db->query($sql);
        echo 1;
        disconnect($db);
    } catch(PDOException $e) { echo $e->getMessage(); }
}

?>