Rollup Import Alias
=========

Provides directory aliases for es2015 import statements. 

## Installation

  npm install rollup-plugin-import-alias --save-dev

## Usage
### In rollup.plugins
```javascript
var importAlias = require('rollup-plugin-import-alias');

importAlias({
    Paths: {
        TypeChecks: '../Common/TypeChecks',
	    Framework: './V1.0/Framework'					
    },
    Extensions: ['js']
});
```
### In your modules
```javascript
import isArray from 'TypeChecks/isArray';
```
This import would actually look for file `../Common/TypeChecks/isArray`

## So? Why Care
As I've worked more with ES2015 import statements I've noticed absolute paths being used to avoid "import hell".  This is great, but creates issues when copying files into other subdirectories that would break those paths.  With this super simple utility those absolute paths can be correctly re-mapped. 
