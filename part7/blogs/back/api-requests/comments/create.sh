#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

rand=$RANDOM
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV2bW9yb3YiLCJpZCI6IjYyMDU4MDc0MjE0OGNmZjczNmFmMjhmMCIsImlhdCI6MTY0NTM4NDQ3MywiZXhwIjoxNjQ1Mzg4MDczfQ.A1vh-3Z_OpgrHnadLy5oup4Sh0vUsu-NknQDziUfJQg
blogId=62117c5203fc3927735a66a3

printResponse "$(
  $CURL \
    POST "$URL/api/blogs/$blogId/comments" \
    --header 'Content-Type: application/json' \
    --header "Authorization: bearer $token" \
    --data '{ "text": "Comment '$rand'" }'
)"
