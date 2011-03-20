/*
 * jQuery Fiji MultiSearch @VERSION
 *
 * Copyright (c) 2011 Torsten Kühr, Kai Schlamp
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * https://github.com/medihack/jquery-fiji
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *   jquery.ui.sortable.js
 */
(function( $, undefined ) {

	$.widget( "fiji.multisearch", $.ui.mouse, {
		options: {
			initialFields: 1,
			placeholder: '',
			maxFields: 10,
			inputName: 'search[]',
			submitLabel: 'Search',
			submit: function(data) {
				return false;
			}
		},

		_create: function() {
			var self = this,
			options = self.options;

			self.element.addClass('fiji-multisearch');

			var form = $('<form><ul class="ui-helper-reset"></ul></form>');
			for (var i = 0; i < options.initialFields; i++) {
				$('<li><input type="text" placeholder="' + options.placeholder + '" name="' + options.inputName + '" /></li>')
				.appendTo(form.children("ul").first());
			}
			$('<input type="submit" value="' + options.submitLabel + '"/>')
			.click(function() {
				var data = form.serialize();
				return options.submit(data);
			})
			.appendTo(form);
			form.appendTo(self.element);

			self.element.find('li input').each(function() {
				var controlBox = $('<div class="fiji-multisearch-controls">'+
					'<div class="fiji-multisearch-gripper" />'+
					'<div class="fiji-multisearch-field-add">+</div>'+
					'<div class="fiji-multisearch-field-remove">&times;</div>'+
					'</div>');

				controlBox.insertAfter($(this));
			});
		},

		_init: function() {
			var self = this;

			self._addVisibilityBindings();
			self._addButtonBindings();
			self._adaptButtonVisibility();
			self._addSortable();
		},

		destroy: function() {
		},

		_addVisibilityBindings: function() {
			var self = this;

			self.element.find("li").mouseenter(function() {
				var $this = $(this);
				if (self.element.find("li").length > 1) {
					$this.find('.fiji-multisearch-gripper').show();
				}
			}).mouseleave(function(){
				$(this).find('.fiji-multisearch-gripper').hide();
			});
		},

		_addButtonBindings: function() {
			var self = this;

			self.element.find(".fiji-multisearch-field-remove").click(function() {
				var index = self.element.find('li').has(this).index();
				self.removeSearchField(index);
				self._adaptButtonVisibility();
				return false;
			});

			self.element.find(".fiji-multisearch-field-add").click(function() {
				var index = self.element.find('li').has(this).index();
				self.addSearchField(index);
				self._adaptButtonVisibility(index);
				return false;
			});
		},

		_adaptButtonVisibility: function(index) {
			var self = this,
			options = self.options;

			var fields = self.element.find("li");
			if (fields.length > 1) {
				fields.find('.fiji-multisearch-field-remove').show();
			}
			if (fields.length == 2 && index == 0) {
				fields.eq(index).mouseenter();
			}

			if (fields.length == 1) {
				fields.find('.fiji-multisearch-gripper,.fiji-multisearch-field-remove').hide();
			}
			if (fields.length >= options.maxFields) {
				fields.find('.fiji-multisearch-field-add').hide();
			}
			else {
				fields.find('.fiji-multisearch-field-add').show();
			}
		},

		_addSortable: function() {
			var self = this;

			self.element.find("ul").sortable({
				axis: 'y',
				handle: '.fiji-multisearch-gripper',
				stop: function(event, ui) {
					ui.item.mouseleave();
				}
			});
		},

		addSearchField: function(index) {
			var self = this,
			options = self.options;

			if (self.element.find('li').length < options.maxFields) {
				self.element.find("li:first")
				.clone(true)
				.insertAfter(self.element.find("li").eq(index))
				.find("input")
				.val('')
				.focus()
				.mouseleave();
			}
		},

		removeSearchField: function(index) {
			var self = this;
			var fields = self.element.find("li");
			
			if (fields.length > 1) {
				fields.eq(index).remove();
				return true;
			}
			return false;
		}
	});

	$.extend( $.fiji.multisearch, {
		version: "@VERSION"
	});
})( jQuery );
