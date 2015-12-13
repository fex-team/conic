#!/usr/bin/env bash

ROOT=`pwd`
TIEBAACCOUNT="http://gitlab.baidu.com/tb-component/awesome/blob/master/doc/publish.md"

trap ctrl_c INT

function ctrl_c() {
    rm npm-debug.log > /dev/null 2>&1
    rm lib/$1/npm-debug.log > /dev/null 2>&1
    exit 1
}

## npm login
login() {
   npm login
}

update() {
    if test -f package.json; then
        npm version patch
        npm publish
    else
        echo "There is no package.json file in `pwd`"
    fi
}

checkChange () {
    if git diff-index --quiet HEAD --; then
        echo "INFO:" "there no changes :)"
    else
        echo "ERROR:" "there are changes, please commit first" && exit 1
    fi
}

checkWhoami () {
    local knowami=1

    npm whoami > /dev/null 2>&1 || knowami=0

    if [ $knowami == 0 ]; then
        echo "You are not login..\n run npm login and login with tieba \n $TIEBAACCOUNT" && exit 1
    fi
}

checkChange
checkWhoami

if test `npm whoami` = tieba; then
    update
else
    echo "You must login with tieba"
    echo "|---------------------------------------------"
    echo "|  Login Url:   $TIEBAACCOUNT                 "
    echo "|---------------------------------------------"
    login
    update
fi