#!/bin/bash

NODE=/nodejs/node-v0.10.5/
SERVER_JS_FILE=server.js
USER=root
OUT=nodejs.log

case "$1" in

start)
    echo "starting node: $NODE $SERVER_JS_FILE"
    sudo -u $USER $SERVER_JS_FILE > $OUT 2>$OUT &
    ;;

stop)
    killall $NODE
    ;;

*)
    echo "usage: $0 (start|stop)"
esac

exit 0