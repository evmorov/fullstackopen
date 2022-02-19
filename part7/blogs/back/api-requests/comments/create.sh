#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

rand=$RANDOM
blogId=62117c5203fc3927735a66a3

printResponse "$(
  $CURL \
    POST "$URL/api/blogs/$blogId/comments" \
    --header 'Content-Type: application/json' \
    --data '{ "text": "Comment '$rand'" }'
)"
