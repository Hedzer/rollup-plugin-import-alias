var path = require('path');
var fs = require('fs');

module.exports = function rollupPluginImportAlias(options) {
	if (typeof options !== 'object') {
		return {};
	}
	return {
		resolveId: function(importee, importer) {
			var extCount = options.Extensions.length;
			for (var key in options.Paths) {
				if (importee.substring(0, key.length) === key) {
					var directory = importee.replace(key, options.Paths[key]);
					var ext, absolute;
					for (var i = 0; i < extCount; i++) {
						ext = options.Extensions[i];
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