export PATH=/usr/local/bin:./node_modules/istanbul:./node_modules/eslint:$PATH;

istanbul cover node_modules/.bin/_mocha -- -r server.js -R tap app/tests/* > test.tap && istanbul report clover
eslint -f checkstyle app/**/*.js > checkstyle-result.xml
