var path = require('path');
var fs = require('fs');

module.exports = function rollupPluginImportAlias(options) {
	if (typeof options !== 'object') {
		return {};
	}

	var extensions = (options.Extensions || ['js']);
	var paths = options.Paths || {};
	return {
		resolveId: function(importee, importer) {
			var extCount = extensions.length;
			for (var key in paths) {
				if (importee.substring(0, key.length) === key) {
					var directory = importee.replace(key, paths[key]);
					var ext, absolute;
					for (var i = 0; i < extCount; i++) {
						ext = extensions[i];
						absolute = directory + '.' + ext;
						if (fs.existsSync(absolute)) {
							return path.normalize(absolute);
						}
					}
				}
			}
		}
	}
}