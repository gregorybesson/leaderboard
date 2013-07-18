<?php
if(isset($_POST['command'])){
    if($_POST['command'] === "start"){
        echo shell_exec('bash nodejs.sh start');
    }
    else if($_POST['command'] === "stop"){
        echo shell_exec('bash nodejs.sh stop');
    }
}

?>