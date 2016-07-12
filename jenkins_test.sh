echo '<<<EXECUTING ISTANBUL>>>'
istanbul cover node_modules/.bin/_mocha -- -r server.js -R tap app/tests/* > test.tap && istanbul report clover

echo '<<<CHANGE INDEX.JS TO PREVENT ERROR>>>'
echo ''use strict';
      module.exports = function(x) {
      	if (typeof x !== 'string') {
      		throw new TypeError('Expected a string, got ' + typeof x);
      	}

      	// Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
      	// conversion translates it to FEFF (UTF-16 BOM)
      	if (x.charCodeAt(0) === 0xFEFF) {
      		return x.slice(1);
      	}

      	return x;
      };
' > node_modules/eslint/node_modules/strip-bom/index.js

echo '<<<EXECUTING ESLINT>>>'
eslint -c .eslintrc.js -f checkstyle app/**/*.js > checkstyle-result.xml

