#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

rand=$RANDOM

printResponse "$(
  $CURL \
    POST "$URL/api/users" \
    --header 'Content-Type: application/json' \
    --data '{ "username": "Username '$rand'", "name": "Name '$rand'", "password": "Password", "blogs": [] }'
)"
