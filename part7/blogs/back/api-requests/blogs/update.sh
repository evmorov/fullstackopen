#!/bin/bash
set -e

CUR_DIR="$(dirname "$0")"
. "$CUR_DIR/../helper.sh"

id=61b9183a03dbfdf74c8430b2
rand=$RANDOM
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXJuYW1lIDE1ODk5IiwiaWQiOiI2MWFkY2M2ZjExYmQ3M2RlYjc0YmJmZjEiLCJpYXQiOjE2Mzk1MjAyMTcsImV4cCI6MTYzOTUyMzgxN30.6Vrkik1M6m8qw9_r9guyrO_UT40vCa7aZ50EWfpJpNs

printResponse "$(
  $CURL \
    PUT "$URL/api/blogs/$id" \
    --header 'Content-Type: application/json' \
    --header "Authorization: bearer $token" \
    --data '{ "likes": '$rand' }'
)"
