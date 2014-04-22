var Module = require("module");
var FileSystem = require("fs");

var fragment;

require.extensions[".js"] = function(module, file) {
	// Let's remove UTF-8 BOM because Node's buffer-to-string conversion translates it to UTF-16 BOM:
	var script = stripByteOrderMarker(FileSystem.readFileSync(file, "utf8"));

	if(!/amdefine\.js$/.test(module.id)) {
		script = fragment + script;
	}

	module._compile(script, file);
};

function stripByteOrderMarker(text) {
	if(text.charCodeAt(0) === 0xFEFF) {
		text = text.slice(1);
	}
	return text;
}

function configure(loader) {
	function include() {
		var loader/*%LOADER%*/;
		return loader.apply(this, arguments);
	}

	fragment = "if(typeof define !== \"function\") { var define = require(\"amdefine\")(module, include); }"
		+ ("\n" + include).replace("/*%LOADER%*/", " = " + (loader ? "require(\"" + loader + "\")(require)" : "require"));

	// Let's insert `fragment` right before the first statement in the module (without introducing any new line)
	// so that we won't need any particular source maps for debugging and could read stack traces fairly naturally:
	fragment = fragment.replace(/\n\s*/g, "").replace(/\s+(\{|\})\s+/g, "$1");
};

// Let's allow simple usage: `require("include.js")`.
configure();

module.exports = {
	// Advanced usage: `require("include.js").configure("loader.js")`.
	configure: configure
};