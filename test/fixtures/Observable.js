define(["EventEmitter"], function(EventEmitter) {
	function Observable() {
	};

	Observable.implementation = EventEmitter;

	return Observable;
});