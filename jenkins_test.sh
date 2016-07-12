istanbul cover node_modules/.bin/_mocha -- -r server.js -R tap app/tests/* > test.tap && istanbul report clover
eslint -c eslint.conf -f checkstyle app/**/*.js > checkstyle-result.xml
