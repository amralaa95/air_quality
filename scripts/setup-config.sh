#!/bin/bash -e

username=$1
if [ -z ${username} ]; then
    read -p "Please enter db username: " username
fi

echo

password=$2
if [ -z ${password} ]; then
    read -s -p "Please enter db user password: " password
fi

echo

host=$3
if [ -z ${HOST} ]; then
    host='localhost'
fi

echo

port=$4
if [ -z ${port} ]; then
    port=5432
fi

CONFIG=$(cat <<EOF
{
    "username": "${username}",
    "password": "${password}",
    "port": "${port}",
    "database": "air_quality_db",
    "host": "${host}",
    "dialect": "postgres",
    "operatorsAliases": "0"
}
EOF
)

echo ${CONFIG} > config/config.json
