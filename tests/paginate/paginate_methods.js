/*
 * paginate_methods.js
 */
(function($) {

	module("paginate: methods");

	test("init", function() {
		$("<div></div>").appendTo('body').paginate().remove();
		ok(true, '.paginate() called on element');

		$([]).paginate().remove();
		ok(true, '.paginate() called on empty collection');

		$('<div></div>').paginate().remove();
		ok(true, '.paginate() called on disconnected DOMElement - never connected');

		$('<div></div>').appendTo('body').remove().paginate().remove();
		ok(true, '.paginate() called on disconnected DOMElement - removed');

		var el = $('<div></div>').paginate();
		var foo = el.paginate("option", "foo");
		el.remove();
		ok(true, 'arbitrary option getter after init');

		$('<div></div>').paginate().paginate("option", "foo", "bar").remove();
		ok(true, 'arbitrary option setter after init');
	});

	test("destroy", function() {
		var beforeHtml = $("#paginate").find("div").css("font-style", "normal").end().parent().html();
		var afterHtml = $("#paginate").paginate().paginate("destroy").parent().html();
		equal( afterHtml, beforeHtml );
	});

	test("page", function() {
		expect(2);

		$("#paginate").paginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').paginate("page", 7);
		ok($('#paginate em').html() == 7);
	});

	test("nextPage", function() {
		expect(2);

		$("#paginate").paginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').paginate("nextPage");
		ok($('#paginate em').html() == 7);
	});

	test("previousPage", function() {
		expect(2);

		$("#paginate").paginate({
			currentPage: 6,
			totalPages: 11
		});

		ok($('#paginate em').html() == 6);
		$('#paginate').paginate("previousPage");
		ok($('#paginate em').html() == 5);
	});

})(jQuery);
