echo '<<<EXECUTING ISTANBUL>>>'
istanbul cover node_modules/.bin/_mocha -- -r server.js -R tap app/tests/* > test.tap && istanbul report clover

#echo '<<<CHANGE INDEX.JS TO PREVENT ERROR>>>'
#cat indexJS > node_modules/eslint/node_modules/strip-bom/index.js
#cat node_modules/eslint/node_modules/strip-bom/index.js

echo '<<<EXECUTING ESLINT>>>'
eslint -c .eslintrc.js -f checkstyle app/**/*.js > checkstyle-result.xml

