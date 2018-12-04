'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _initFlowPlayerSetup = require('./lib/init-flow-player-setup');

var _initFlowPlayerSetup2 = _interopRequireDefault(_initFlowPlayerSetup);

var _initFlowPlayerCustom = require('./lib/init-flow-player-custom');

var _initFlowPlayerCustom2 = _interopRequireDefault(_initFlowPlayerCustom);

var _initFlowPlayerScript = require('./lib/init-flow-player-script');

var _initFlowPlayerScript2 = _interopRequireDefault(_initFlowPlayerScript);

var _defaultPropsInit = require('./default-props-init');

var _defaultPropsInit2 = _interopRequireDefault(_defaultPropsInit);

var _propTypesConfig = require('./prop-types-config');

var _propTypesConfig2 = _interopRequireDefault(_propTypesConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactFlowPlayer = function (_React$Component) {
	_inherits(ReactFlowPlayer, _React$Component);

	function ReactFlowPlayer() {
		_classCallCheck(this, ReactFlowPlayer);

		var _this = _possibleConstructorReturn(this, (ReactFlowPlayer.__proto__ || Object.getPrototypeOf(ReactFlowPlayer)).call(this));

		_this._initPlayer = _this._initPlayer.bind(_this);
		return _this;
	}

	_createClass(ReactFlowPlayer, [{
		key: '_initPlayer',
		value: function _initPlayer() {
			var _this2 = this;

			var _props = this.props,
			    customButton = _props.customButton,
			    seeking = _props.seeking,
			    seekingText = _props.seekingText,
			    seekFwHtml = _props.seekFwHtml,
			    seekBwHtml = _props.seekBwHtml,
			    playerId = _props.playerId;

			(0, _initFlowPlayerSetup2.default)(Object.assign({}, this.props, {
				onLoad: function onLoad() {
					(0, _initFlowPlayerCustom2.default)({
						customButton: customButton,
						seeking: seeking,
						seekingText: seekingText,
						seekFwHtml: seekFwHtml,
						seekBwHtml: seekBwHtml,
						playerId: playerId
					});
					var playerElem = document.getElementById(playerId);
					if (playerElem) {
						_this2.props.getPlayerApi(window.flowplayer(playerElem));
					}
				}
			}));
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			/* eslint-disable no-undef */
			if (window.flowplayer) {
				this._initPlayer();
			} else {
				(0, _initFlowPlayerScript2.default)(_extends({
					context: document,
					onLoad: this._initPlayer,
					src: this.props.playerInitScript
				}, this.props));
			}
			/* eslint-disable no-undef */
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    splash = _props2.splash,
			    poster = _props2.poster;

			return _react2.default.createElement('div', { className: this.props.className, dangerouslySetInnerHTML: {
					__html: '<div class="' + this.props.playerClasses + '" id="' + this.props.playerId + '" style="' + (splash && poster ? 'background-image: url(' + poster + '); background-position: center' : '') + '"></div>'
				} });
		}
	}]);

	return ReactFlowPlayer;
}(_react2.default.Component);

ReactFlowPlayer.defaultProps = _defaultPropsInit2.default;
ReactFlowPlayer.propTypes = _propTypesConfig2.default;
exports.default = ReactFlowPlayer;