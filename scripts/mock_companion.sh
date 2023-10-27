#!/bin/bash

# This script will listen on port 3001 and return a 200 OK response with the body "OK" for any request and print the resource path
# It was not entirely clear from the internet documentation I found, but it seems like companion wants get requests
# This allows me to at least confirm that the backend is doing what I expect it to do

while :; do
    { echo -ne "HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK"; } | nc -l -p 3001 -q 1 | awk 'NR==1{print $2}'
done