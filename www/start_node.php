<?php
if(isset($_POST['command'])){
    if($_POST['command'] === "start"){
        $output = shell_exec('bash nodejs.sh start');
        echo "<pre>$output</pre>";
        $output = shell_exec('ls');
        echo '-------------------------\n';
        echo "<pre>$output</pre>";
    }
    else if($_POST['command'] === "stop"){
        $output = shell_exec('bash nodejs.sh stop');
        echo "<pre>$output</pre>";
    }
}

?>