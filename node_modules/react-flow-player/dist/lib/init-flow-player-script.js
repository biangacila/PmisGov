'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initFlowPlayerScript = function initFlowPlayerScript(_ref) {
	var context = _ref.context,
	    onLoad = _ref.onLoad,
	    src = _ref.src,
	    hlsConfig = _ref.hlsConfig,
	    hlsPlugin = _ref.hlsPlugin,
	    speedPlugin = _ref.speedPlugin,
	    hlsConfigUrl = _ref.hlsConfigUrl,
	    hlsUrl = _ref.hlsUrl,
	    speedUrl = _ref.speedUrl,
	    styleUrl = _ref.styleUrl,
	    vodQualitySelectorSrc = _ref.vodQualitySelectorSrc,
	    vodQualitySelectorPlugin = _ref.vodQualitySelectorPlugin,
	    vastPlugin = _ref.vastPlugin,
	    vastPluginSrc = _ref.vastPluginSrc,
	    vastIMASDKSrc = _ref.vastIMASDKSrc;

	var scripts = [src];
	if (hlsConfig && hlsConfigUrl) {
		scripts.unshift(hlsConfigUrl);
	}

	if (hlsPlugin && hlsUrl && (!hlsConfig || !hlsConfigUrl)) {
		scripts.push(hlsUrl);
	}

	if (vodQualitySelectorPlugin && vodQualitySelectorSrc) {
		scripts.push(vodQualitySelectorSrc);
	}

	if (speedPlugin && speedUrl) {
		scripts.push(speedUrl);
	}

	if (vastPlugin && vastPluginSrc && vastIMASDKSrc) {
		scripts.push(vastIMASDKSrc, vastPluginSrc);
	}

	// Stylesheet for the basic flowplayer
	var linkElem = context.createElement('link');
	linkElem.rel = 'stylesheet';
	linkElem.href = styleUrl;
	context.head.appendChild(linkElem);
	// Script for initializing the flowplayer
	loadScriptsSerially({ scripts: scripts, onComplete: onLoad, documentObj: context });
};

function loadScriptsSerially(_ref2) {
	var _ref2$scripts = _ref2.scripts,
	    scripts = _ref2$scripts === undefined ? [] : _ref2$scripts,
	    _ref2$onComplete = _ref2.onComplete,
	    onComplete = _ref2$onComplete === undefined ? function () {} : _ref2$onComplete,
	    documentObj = _ref2.documentObj;

	if (!documentObj) {
		return;
	}

	if (scripts.length > 0) {
		var scriptSrc = scripts.shift();
		var elem = documentObj.createElement('script');
		elem.src = scriptSrc;
		elem.onload = function (e) {
			loadScriptsSerially({ scripts: scripts, onComplete: onComplete, documentObj: documentObj });
		};

		return documentObj.head.appendChild(elem);
	}

	return onComplete();
}

exports.default = initFlowPlayerScript;