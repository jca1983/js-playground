/*
 * Pipeline
 * Manipulate setInterval
 *
 * @author Guilherme Henrique Oka Marques
 * @version: 1.2
*/

var Pipeline = function () {
	"use strict";
	var p = this;
	
//set pipe storage
	p.pipe = {};
	
//add func to auto
	p.add = function (pipeName, func, delay, start) {
		var start = start || false;
	//replace pipe
		if(p.pipe.hasOwnProperty(pipeName)){
			p.del(pipeName);
		}
	//create
		p.pipe[pipeName] = {
			"func": func, 
			"delay": delay
		};
	//start
		if(start){
			p.start(pipeName, true);
		}
	};
	
//remove func from auto
	p.del = function (pipeName) {
		if(p.check(pipeName)){
			p.stop(pipeName);
			delete p.pipe[pipeName];
			return true;
		}
		return false;
	};
	
//start auto for given pipe
	p.start = function (pipeName, callNow) {
		if(p.check(pipeName)){
			p.pipe[pipeName].handler = setInterval(p.pipe[pipeName].func, p.pipe[pipeName].delay);
			if(callNow){
				p.pipe[pipeName].func();
			}
			return true;
		}
		return false;
	};
	
//stop auto for given pipe
	p.stop = function (pipeName) {
		if(p.check(pipeName)){
			clearInterval(p.pipe[pipeName].handler);
			return true;
		}
		return false;
	};
	
//start all pipes
	p.startAll = function (callNow) {
		var prop;
		for(prop in p.pipe){
			p.start(prop, callNow);
		}
	};
	
//stop all pipes
	p.stopAll = function () {
		var prop;
		for(prop in p.pipe){
			p.stop(prop);
		}
	};
	
//call a pipe function
	p.callFunc = function (pipeName){
		if(p.check(pipeName)){
			p.pipe[pipeName].func();
			return true;
		}
		return false;
	};
	
//check for given pipe
	p.check = function (pipeName) {
		if(p.pipe.hasOwnProperty(pipeName)){
			return true;
		}
		return false;
	};
};