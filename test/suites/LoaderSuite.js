var expect = require("expect.js");

before(function() {
	require("include.js").configure("../fixtures/loader.js");
});

describe("Loader", function() {
	it("should follow defined policy for concerned modules", function() {
		var Observable = require("../fixtures/Observable");
		expect(Observable.implementation).to.be(require("events").EventEmitter);
	});

	it("should use underlying `require` function for other modules", function() {
		var Request = require("../fixtures/Request");
		expect(Request.implementation).to.be(require("http"));
	});
});