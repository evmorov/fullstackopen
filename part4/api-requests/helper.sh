#!/bin/bash
set -e

URL='http://localhost:3003'
CURL='curl --include --silent --show-error --request'

printResponse () {
  echo "$1" | sed -e '$ d' # remove the last line which is json
  echo "$1" | tail -n1 | jq # send the last line to jq
}
