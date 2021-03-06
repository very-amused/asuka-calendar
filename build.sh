#! /bin/sh

# Copy static files
cp src/index.html static/
cp fonts/* static/fonts/
cp images/template.png static/img/
./node_modules/.bin/tsc