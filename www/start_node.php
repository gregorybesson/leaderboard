<?php
if(isset($_POST['command'])){
    if($_POST['command'] === "start"){
        $output = shell_exec('bash nodejs.sh start');
        echo $output;
    }
    else if($_POST['command'] === "stop"){
        $output = shell_exec('bash nodejs.sh stop');
        echo $output;
    }
}

?>