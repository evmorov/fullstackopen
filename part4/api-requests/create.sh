#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/helper.sh"

rand=$RANDOM

printResponse "$(
  $CURL \
    POST "$URL/api/blogs" \
    --header 'Content-Type: application/json' \
    --data '{ "title": "Title '$rand'", "author": "Author '$rand'", "url": "https://'$rand'.com", "likes": 1 }'
)"
