#!/bin/sh

# Output environment
# (Helps us compare with our local versions)
echo "node $(node --version)\nnpm  v$(npm --version)\nNODE_ENV=$NODE_ENV\n"

# Ensure Node and NPM versions are valid for this app
# (Compares with "engines" field in package.json)
npx check-engine -y

# Ensure the package-lock.json file versions stays at version 3 (prevent regressions to an old version)
if grep -q '"lockfileVersion": 3' package-lock.json; then
    echo '\n  package-lock.json: lockfileVersion 3 confirmed.'
else
    echo '\n package-lock.json: ERROR - lockfileVersion has been downgraded to and old version. Please update your local version of NPM and revert package-lock.json changes.'
    exit 1
fi
