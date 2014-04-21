var Module = require("module");
var FileSystem = require("fs");

var fragment = "if(typeof define !== \"function\") { var define = require(\"amdefine\")(module); }";

function include() {
}

fragment += "\n" + include;

function stripByteOrderMarker(text) {
	if(text.charCodeAt(0) === 0xFEFF) {
		text = text.slice(1);
	}
	return text;
}

function intercept(module, file) {
	// Let's remove UTF-8 BOM because Node's buffer-to-string conversion translates it to UTF-16 BOM:
	var contents = stripByteOrderMarker(FileSystem.readFileSync(file, "utf8"));
console.log(module.id);
	if(!/include\.js$/.test(module.id)) {
		contents = fragment + contents;
	}
contents = "console.log('AAAAAA', define);" + contents;
console.log(contents);
	module._compile(contents, file);
}

intercept._id = "include.js/intercept";

var original = Module._extensions[".js"];

if(!original._id || original._id !== intercept._id) {
	Module._extensions[".js"] = intercept;
}
