#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

printResponse "$(
  $CURL \
    POST "$URL/api/login" \
    --header 'Content-Type: application/json' \
    --data '{ "username": "Username 15899", "password": "Password" }'
)"
