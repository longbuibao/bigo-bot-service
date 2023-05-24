#!/bin/bash

if [[ $(docker ps -aqf "name=bg-redis") ]]; then
  echo "Redis container already exists. Starting it..."
  docker container start bg-redis
else
  echo "Redis container does not exist. Creating and starting it..."
  docker container run -d --name bg-redis -p 6379:6379 redis
fi

if [[ $(docker ps -aqf "name=bg-mongo") ]]; then
  echo "Mongo container already exists. Starting it..."
  docker container start bg-mongo
else
  echo "Mongo container does not exist. Creating and starting it..."
  docker container run -d --name bg-mongo -p 27017:27017  redis
fi

yarn

yarn build

echo "Starting bot-aws..."
node dist/apps/bot-aws/main &
bot_aws_pid=$!

echo "    ^"
echo "   / \\"
echo "  /___\\"
echo "  |   |"
echo "  | B |"
echo "  | I |"
echo "  | G |"
echo "  | O |"
echo "  |   |"
echo " B  O  T"
echo "  |   |"
echo "  |_ _|"


node dist/apps/bot-gateway/main &
bot_gateway_pid=$!

echo "Starting bot-gateway..."
while ! curl -s http://localhost:3000 >/dev/null; do
  sleep 1
done

echo "    ^"
echo "   / \\"
echo "  /___\\"
echo "  |   |"
echo "  | B |"
echo "  | I |"
echo "  | G |"
echo "  | O |"
echo "  |   |"
echo "  |   |"
echo "| GATEWAY |"
echo "  |_ _|"

trap 'kill $bot_aws_pid $bot_gateway_pid' INT
wait
