#!/bin/bash
set -e

gql="`cat $(dirname "$0")/$1`"
variables=$([ -z "$2" ] && echo "{}" || echo "$2")

# escape "
gql="${gql//\"/\\\"}"
variables="${variables//\"/\\\"}"

data="{ \"query\": \"${gql}\", \"variables\": \"${variables}\" }"
data="$(echo $data)" # remove new lines

curl -X POST -H "Content-Type: application/json" -d "$data" http://localhost:4000/graphql | jq
