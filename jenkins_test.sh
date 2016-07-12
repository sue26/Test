echo '<<<EXECUTING ISTANBUL>>>'
istanbul cover node_modules/.bin/_mocha -- -r server.js -R tap app/tests/* > test.tap && istanbul report clover

echo '<<<EXECUTING ESLINT>>>'
echo '111'
./node_modules/.bin/eslint -c eslint.conf -f checkstyle app/**/*.js > checkstyle-result.xml
echo '222'
export PATH=/usr/local/bin:node_modules/.bin/eslint:$PATH;
eslint -f checkstyle app/**/*.js > checkstyle-result.xml
