module.exports = function(require) {
	function loader(module) {
		var policy = {
			"EventEmitter": function() {
				return require("events").EventEmitter;
			}
		};

		return policy[module] ? policy[module]() : require.apply(this, arguments);
	}

	return loader;
};