/*
 * okaModal Custom Modal
 *
 * @author Guilherme Henrique Oka Marques
 * @version: 1.0
 * @dependencies: JQuery 1.6+
*/

	var okaModal = function (config) {
		"use strict";
		var m = this;
		
	//config
		m.config = {
			animationDelay: config.animationDelay || 300,
			container: config.container || $("body"),
			counter: 0,
			removalCallbacks: [],
		};
		
	//create modal div
		m.create = function (object) {
			var content = escape(object.content) || false, 
			classes = object.classes || "", 
			creationCallback = object.creationCallback || function(){}, 
			removalCallback = object.removalCallback || function(){};
			
			if(content){
			//create modal div wrapper
				var modalWrapper = $("<div></div>").addClass("okaModalWrapper").attr("data-okaModalID", m.config.counter),
				modalContent = $("<div></div>").addClass("okaModalContent "+ classes).html(unescape(content)),
				modalCloseButton = $("<span></span>").addClass("okaModalCloseButton");
			//append elements
				modalContent.append(modalCloseButton);
				modalWrapper.append(modalContent);
				$("body").append(modalWrapper);
			//if execute creationCallback
				$(modalWrapper).fadeIn(m.config.animationDelay, function(){
					if(creationCallback){
						creationCallback();
					}
				});
			//save removalCallback
				if(removalCallback){
					m.config.removalCallbacks.push(removalCallback);
				}
				m.config.counter = m.config.counter + 1;
				modalWrapper.perfectScrollbar();
				return true;
			}
			return false;
		};
		
	//remove modal div
		m.remove = function(index){
			if(m.config.counter > 0){
				if(index){
				//remove target modalDiv
					$('div[data-okaModalID="'+index+'"]').fadeOut(m.config.animationDelay, function(){
						$(this).remove();
						m.config.removalCallbacks[index]();
						m.config.removalCallbacks.splice(index, 1);
					});
				//update modal divs ids
					$('div.okaModalWrapper').each(function(){
						var modal = $(this);
						var id = modal.attr("data-okaModalID");
						if(id > index){
							modal.attr('data-okaModalID', (id - 1));
						}
					});
				}
				else{
				//remove last index modal
					var lastID = (m.config.counter - 1);
					$('div[data-okaModalID="'+lastID+'"]').fadeOut(m.config.animationDelay, function(){
						$(this).remove();
						m.config.removalCallbacks[lastID]();
						m.config.removalCallbacks.splice(lastID, 1);
					});
				}
				m.config.counter--;
				return true;
			}
			return false;
		};
		
	//set events
		m.events = (function () {
		//close modal on ESC press
			$(document).keyup(function(event){
				//call remove on "ESC"
				if(event.keyCode == 27){
					if(m.config.counter > 0){
						m.remove();
					}
				}
			});
		//close modal on close button
			$("body").on("click", "span.okaModalCloseButton", function () {
				m.remove();
			});
		//close modal on wrapper click
			$("body").on("click", "div.okaModalWrapper", function () {
				m.remove();
			});
		//prevent modal from closing within content click
			$("body").on("click", "div.okaModalWrapper > div.okaModalContent", function (event) {
				event.stopPropagation();
			});
		})();
	};