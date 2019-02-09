#!/bin/sh

rm -rf docs && cp -r build docs

origin="docs.js"
current="docs."`date +"%s"`".js"

sed -i '' "s/$origin/$current/" docs/index.html
mv docs/$origin docs/$current

