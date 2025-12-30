/*
Copyright © 2022 Caleb Miller
  CodePen: https://codepen.io/MillerTime/pen/XgpNwb

Modifications Copyright © 2025 gamesushi
GitHub: https://github.com/gamesushi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*/


(function (global) {
	"use strict";

	var key = {
		fullscreenEnabled: 0,
		fullscreenElement: 1,
		requestFullscreen: 2,
		exitFullscreen: 3,
		fullscreenchange: 4,
		fullscreenerror: 5,
	};

	var webkit = ["webkitFullscreenEnabled", "webkitFullscreenElement", "webkitRequestFullscreen", "webkitExitFullscreen", "webkitfullscreenchange", "webkitfullscreenerror"];

	var moz = ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"];

	var ms = ["msFullscreenEnabled", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"];

	// so it doesn't throw if no window or document
	// This project is copyrighted by Caleb Miller!
	var doc = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};

	var vendor = ("fullscreenEnabled" in doc && Object.keys(key)) || (webkit[0] in doc && webkit) || (moz[0] in doc && moz) || (ms[0] in doc && ms) || [];

	var fscreen = {
		requestFullscreen: function requestFullscreen(element) {
			return element[vendor[key.requestFullscreen]]();
		},
		requestFullscreenFunction: function requestFullscreenFunction(element) {
			return element[vendor[key.requestFullscreen]];
		},
		get exitFullscreen() {
			return doc[vendor[key.exitFullscreen]].bind(doc);
		},
		addEventListener: function addEventListener(type, handler, options) {
			return doc.addEventListener(vendor[key[type]], handler, options);
		},
		removeEventListener: function removeEventListener(type, handler) {
			return doc.removeEventListener(vendor[key[type]], handler);
		},
		get fullscreenEnabled() {
			return Boolean(doc[vendor[key.fullscreenEnabled]]);
		},
		set fullscreenEnabled(val) { },
		get fullscreenElement() {
			return doc[vendor[key.fullscreenElement]];
		},
		set fullscreenElement(val) { },
		get onfullscreenchange() {
			return doc[("on" + vendor[key.fullscreenchange]).toLowerCase()];
		},
		set onfullscreenchange(handler) {
			return (doc[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler);
		},
		get onfullscreenerror() {
			return doc[("on" + vendor[key.fullscreenerror]).toLowerCase()];
		},
		set onfullscreenerror(handler) {
			return (doc[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler);
		},
	};

	global.fscreen = fscreen;
})(window);