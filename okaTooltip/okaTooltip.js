/*
 * okaTooltip: Custom Tooltip
 *
 * @author Guilherme Henrique Oka Marques
 * @version: 1.0
 * @dependencies: JQuery 1.6+
*/

	var okaTooltip = function (config) {
		"use strict";
		var t = this;
		
	//set dom handlers
		t.dom = {
			container: config.container || body, 
			trigger: config.trigger, 
		};
	//create tooltip container
		t.createContainer = (function(){
			var container = $("<div></div>").addClass("okaTooltip");
			t.dom.container = $(container);
			$("body").prepend(container);
		})();
	//return document size
		t.docSize = function () {
			return {
				width: Math.max($(document).width(),$(window).width(),document.documentElement.clientWidth),
				height: Math.max($(document).height(),$(window).height(),document.documentElement.clientHeight),
			}
		};
	//return current mouse posisition array ([0]=> x axis, [1]=> y axis)
		t.mousePos = function (event) {
			return {
				x: event.clientX,
				y: event.clientY,
			}
		};
	//show tooltip
		t.show = function (content, event) {
			var offsetX = 0,
				offsetY = 0;	
		//calc left offset
			if(t.mousePos(event).x > (t.docSize.width / 2)) {
				offsetX = Math.min((t.mousePos(event).x - (t.dom.container.width() / 2)), (t.docSize().width - t.dom.container.width() - 5));
			}
			else{
				offsetX = Math.max((t.mousePos(event).x - (t.dom.container.width() / 2)), 5);
			}
		//calc top offset
			offsetY = (t.mousePos(event).y + 30);
			
			t.dom.container.show();
			t.dom.container.html(content);
			t.dom.container.css({'top': offsetY, 'left': offsetX});
		};
	//hide tooltip
		t.hide = function () {
			t.dom.container.hide();
		};
	//create tooltip for given element
		t.create = function(element, text){
			element.attr("data-okaTooltip", text);
			element.addClass(t.dom.trigger.replace(".", ""));
		};
	//set tooltip events
		t.events = (function () {
		//toggle tooltip visibility on element hover
			$('body').on({
				mousemove: function (event) {
					t.show($(this).attr('data-okaTooltip'), event);
					event.stopPropagation();
				},
				mouseleave: function () {
					t.hide();
				}
			}, t.dom.trigger);
		})();
	};