#!/bin/bash
set -e

# $1 - filename
# $2 - variables
# $3 - bearer token

gql="`cat $(dirname "$0")/$1`"
variables=$([ -z "$2" ] && echo "{}" || echo "$2")

# remove comments
gql=$(sed -r '/^[ \t]*#/d' <<<"$gql")

# escape "
gql="${gql//\"/\\\"}"
variables="${variables//\"/\\\"}"

data="{ \"query\": \"${gql}\", \"variables\": \"${variables}\" }"
data="$(echo $data)" # remove new lines

auth_header=$([ -z "$3" ] && echo "" || echo "authorization: bearer $3")

curl --request POST \
  --header 'Content-Type: application/json' \
  --header "$auth_header" \
  --data "$data" http://localhost:4000/graphql | jq
