#! /bin/sh

# Copy static files
cp src/index.html static/
cp images/template.png static/img/
./node_modules/.bin/tsc