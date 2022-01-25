#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

rand=$RANDOM
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJuYW1lIDE1ODk5IiwiaWQiOiI2MWFkY2M2ZjExYmQ3M2RlYjc0YmJmZjEiLCJpYXQiOjE2Mzg3ODA4ODV9.moZpNNABfKNwZ4-qF5xzvRmWBsLWLgKaQ_2xc857704

printResponse "$(
  $CURL \
    POST "$URL/api/blogs" \
    --header 'Content-Type: application/json' \
    --header "Authorization: bearer $token" \
    --data '{ "title": "Title '$rand'", "author": "Author '$rand'", "url": "https://'$rand'.com", "likes": '$rand' }'
)"
