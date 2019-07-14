var path = require('path');
var fs = require('fs');

function transformPaths(paths) {
	if (Array.isArray(paths)) {
		return paths;
	}
	return Object.keys(paths).map((key) => {
		return {
			key,
			path: paths[key],
		};
	});
}

module.exports = function rollupPluginImportAlias(options) {
	if (typeof options !== 'object') {
		return {};
	}

	var extensions = (options.Extensions || ['js']);
	var paths = transformPaths(options.Paths || {});
	return {
		resolveId: function(importee, importer) {
			var extCount = extensions.length;
			for (var entry of paths) {
				if (importee.substring(0, entry.key.length) === entry.key) {
					var directory = path.resolve(importee.replace(entry.key, entry.path));
					var ext, absolute;
					for (var i = 0; i < extCount; i++) {
						ext = extensions[i];
						if (directory.endsWith('.' + ext))
						{
							absolute = directory;
						}
						else
						{
							absolute = directory + '.' + ext;
						}
						
						if (fs.existsSync(absolute)) {
							return path.normalize(absolute);
						
						} else if (fs.existsSync(directory) && fs.statSync(directory).isDirectory()) {
							for (var j = 0; j < extCount; j++) {
								ext = extensions[i];
								absolute = directory + '/index.' + ext;
								if (fs.existsSync(absolute)) {
									return path.normalize(absolute);
								}
							};
						}
					}
				}
			}
		}
	}
}