Rollup Import Alias
=========

Provides directory aliases for es2015 import statements. 

## Installation

  npm install rollup-import-alias --save-dev

## Usage
### In rollup.plugins
```javascript
var importAlias = require('rollup-import-alias');

importAlias({
    Paths: {
        Alias:path.join(__dirname, '/AliasTest/Alias'),
	    Framework:path.join(__dirname, '/Framework')						
    },
    Extensions: ['js']
});
```
### In your modules
```javascript
import isArray from 'Alias/isArray';
```
This import would actually look for file `./AliasTest/Alias/isArray`

## So? Why Care
    As I've worked more with ES2015 import statements I've noticed absolute paths being used to avoid "import hell".  This is great, but creates issues when copying files into other subdirectories that would break those paths.  With this super simple utility those absolute paths can be correctly re-mapped. 
