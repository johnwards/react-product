#!/bin/bash

npm run build
( cd public
 rm js/.gitignore
 git init
 git config user.name "Travis-CI"
 git config user.email "johnwards@gmail.com"
 git add --all .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
