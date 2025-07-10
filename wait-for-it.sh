#!/bin/sh

# Usage: ./wait-for-it.sh host:port [--] [command...]
# Example: ./wait-for-it.sh rabbitmq:5672 -- pnpm run start:dev books

set -e

if [ $# -lt 1 ]; then
  echo "Usage: $0 host:port [--] [command...]" >&2
  exit 1
fi

hostport="$1"
shift

# Extract host and port
host=$(echo "$hostport" | cut -d : -f 1)
port=$(echo "$hostport" | cut -d : -f 2)

# Skip "--" if present
if [ "$1" = "--" ]; then
  shift
fi

# Wait until RabbitMQ is reachable
echo "Waiting for $host:$port..."
while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "$host:$port is available! Executing command..."
exec "$@"