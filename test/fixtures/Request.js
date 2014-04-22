define(["http"], function(HTTP) {
	function Request() {
	};

	Request.implementation = HTTP;

	return Request;
});