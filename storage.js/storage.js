/*
 * Storage
 * Manipulate HTML5 localStorage data object
 *
 * @author Guilherme Henrique Oka Marques
 * @version: 1.0
*/

var Storage = function (config) {
	"use strict";
	var s = this;
	s.config = {
		name: config.name,
		data: config.data || {},
	};

//startup
	s.start = function(){
		if(!s.checkStorage()){
			s.setStorage(s.config.data);
		}
	};
//check if a storage already exists with given config storageName
	s.checkStorage = function(){
		if(localStorage.getItem(s.config.name)){
			return true;
		}
		return false;
	};
//get storage object
	s.getStorage = function(){
		return JSON.parse(localStorage.getItem(s.config.name));
	};
//set storage object
	s.setStorage = function(data){
		localStorage.setItem(s.config.name, JSON.stringify(data));
		return s.getStorage();
	};
//clear storage
	s.clearStorage = function(){
		s.setStorage({});
	};
//remove storage
	s.delStorage = function(){
		localStorage.removeItem(s.config.name);
	};
//get property
	s.get = function(propName){
		var currentStorage = s.getStorage();
		if(propName){
			if(currentStorage.hasOwnProperty(propName)){
				return currentStorage[propName];
			}
			return false;
		}
		return currentStorage;
	};
//set property
	s.set = function(propName, value){
		var currentStorage = s.getStorage();
		currentStorage[propName] = value;
		s.setStorage(currentStorage);
		return s.get(propName);
	};
//remove property
	s.del = function(propName){
		var currentStorage = s.getStorage();
		if(currentStorage.hasOwnProperty(propName)){
			var prop = currentStorage[propName];
			delete currentStorage[propName];
			s.setStorage(currentStorage);
			return prop;
		}
		return false;
	};

//startup storage
	(function(){
		s.start();
	});
};