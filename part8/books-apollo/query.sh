#!/bin/bash
set -e

filename=$1
gql="`cat $(dirname "$0")/$filename`"
gql="${gql//\"/\\\"}" # escape "
data="{ \"query\": \"${gql}\" }"
data="$(echo $data)" # remove new lines

curl -X POST -H "Content-Type: application/json" -d "$data" http://localhost:4000/graphql | jq
