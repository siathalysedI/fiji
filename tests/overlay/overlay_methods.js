/*
 * overlay_methods.js
 */
(function($) {

	module("overlay: methods");

	test("openContainer", function() {
		expect(1);

		$(window).overlay().overlay("openContainer", '<div class="message">Hello World!</div>');
		ok($("body").has(".fiji-overlay-container").length > 0);
		
		$(window).overlay("destroy");
	});

	test("closeContainer", function() {
		expect(1);

		$(window).overlay().overlay("openContainer", '<div class="message">Hello World!</div>');
		$(window).overlay("closeContainer");
		ok($("body").has(".fiji-overlay-container").length == 0);
		
		$(window).overlay("destroy");
	});
	
	test("destroy", function() {
		expect(1);
		var beforeHtml = $("body").html();
		$(window).overlay();
		$(window).overlay("destroy");
		var afterHtml = $("body").html();
		equals(afterHtml, beforeHtml);
	});

})(jQuery);
