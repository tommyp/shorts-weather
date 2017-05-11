
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(18);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(19);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(48);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _result = __webpack_require__(556);

var _result2 = _interopRequireDefault(_result);

var _query = __webpack_require__(555);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/tommy/Code/shorts-weather/pages/index.js?entry';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class(props) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

    _this.findOutClick = _this.findOutClick.bind(_this);

    _this.state = {
      lat: null,
      long: null,
      errors: {},
      weather: {},
      hasLocation: false,
      hasForecast: false
    };
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'findOutClick',
    value: function findOutClick(e) {
      e.preventDefault();
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      console.log(position);
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
      this.getWeather();
    }
  }, {
    key: 'getWeather',
    value: function getWeather() {
      console.log('fetching');
      fetch("https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + this.state.lat + "&long=" + this.state.long).then(this.setWeather.bind(this));
    }
  }, {
    key: 'setWeather',
    value: function setWeather(response) {
      var data = response.body;

      debugger;

      this.setState({
        weather: data.currently
      });

      this.setResult(data);
    }
  }, {
    key: 'setResult',
    value: function setResult(data) {
      var _this2 = this;

      var lines = [];
      var description = void 0;
      var high = void 0;

      var temp = data.currently.apparentTemperature;

      var warmer_hours = data.hourly.data.filter(function (hour) {
        return hour.apparentTemperature >= _this2.trigger && _this2.goodConditions.indexOf(hour.icon) !== -1;
      });

      var sorted_warmer_hours = warmer_hours.sort(function (a, b) {
        return parseFloat(a.apparentTemperature) - parseFloat(b.apparentTemperature);
      });

      if (sorted_warmer_hours.length >= 1) {
        high = sorted_warmer_hours.pop();
      }

      if (temp >= this.trigger && this.goodConditions.indexOf(data.currently.icon) !== -1) {
        // Warm
        lines.push("Hell yeah", "Of course", "Get the legs out", "Totes", "Flat out", "No Doubt", "It bloody well is");
        description = "It's " + this.forecastIconToWord(data.currently.icon) + " " + Math.round(temp) + " Degrees";
      } else if (warmer_hours.length >= 1) {
        // Not warm now but a warmer hour later
        lines.push("Not now, but it'll be warmer later", "Give it a chance", "Houl yer horses", "Relax yer kacks", "Don't worry", "Not yet");
        description = "It's a " + this.forecastIconToWord(data.currently.icon) + " " + Math.round(temp) + " degrees right now, but it'll be " + this.forecastIconToWord(high.icon) + " " + Math.round(high.apparentTemperature) + " degrees later";
      } else {
        // Not warm and no warmer hours later
        lines.push("No way", "Hell no", "Are you not wise?", "Jeans flat out", "Fraid not", "Way on", "Away on", "Fuck away off", "Are you having a giraffe?");
        description = "It's " + this.forecastIconToWord(data.currently.icon) + " " + Math.round(temp) + " Degrees";
      }

      var result = {
        answer: lines[Math.floor(Math.random() * lines.length)],
        description: description
      };

      console.log(result);

      this.setState(result);
      this.setState(hasForecast);
    }
  }, {
    key: 'forecastIconToWord',
    value: function forecastIconToWord(icon) {
      var words = {
        "clear-day": ["banging", "sunny", "roasting", "swealtering", "schwealterin'", "dynamite", "unreal", "amazing", "lovely", "hot", "warm", "great"],
        "clear-night": ["starry", "unreal", "lovely"],
        "rain": ["wet", "soggy", "damp", "moist", "cold", "coul", "baltic", "freezing", "chilly"],
        "snow": ["snowy", "artic", "baltic", "freezing", "freezin'", "chilly"],
        "sleet": ["wet", "wet and snowy", "freezin'", "freezing", "damp", "moist", "cold", "coul", "baltic", "chilly"],
        "wind": ["windy", "chilly", "cold", "coul", "baltic", "blustery"],
        "fog": ["foggy"],
        "cloudy": ["grey", "shite", "cloudy", "ballix"],
        "partly-cloudy-day": ["cloudy", "not too bad"],
        "partly-cloudy-night": ["starry", "pretty", "lovely"]
      };

      var word = words[icon][Math.floor(Math.random() * words[icon].length)];
      var prefixed_word = void 0;

      if (['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(0)) !== -1) {
        prefixed_word = "an " + word;
      } else {
        prefixed_word = "a " + word;
      }

      return prefixed_word;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        }
      }, _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, 'Is It Shorts Weather Today?'), _react2.default.createElement(_query2.default, { onClick: this.findOutClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }), _react2.default.createElement(_result2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        }
      }));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/tommy/Code/shorts-weather/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/tommy/Code/shorts-weather/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(18);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(19);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(48);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/tommy/Code/shorts-weather/components/query.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class(props) {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));
  }

  (0, _createClass3.default)(_class, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('button', { onClick: this.props.onClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, 'Find out');
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/tommy/Code/shorts-weather/components/query.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/tommy/Code/shorts-weather/components/query.js"); } } })();

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(46);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(18);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(19);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(48);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(47);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/tommy/Code/shorts-weather/components/result.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement('h2', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, 'Result'));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/tommy/Code/shorts-weather/components/result.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/tommy/Code/shorts-weather/components/result.js"); } } })();

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(554);


/***/ })

},[557]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8yOGRlY2NjIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcXVlcnkuanM/MjhkZWNjYyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Jlc3VsdC5qcz8yOGRlY2NjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztrQ0FJTDs7a0JBQVksT0FBTzt3Q0FBQTs7c0lBR2pCOztVQUFLLGVBQWUsTUFBSyxhQUFhLEtBRXRDOztVQUFLO1dBRUg7WUFDQTtjQUNBO2VBQ0E7bUJBQ0E7bUJBQWE7QUFMYjtXQU9IOzs7Ozt3Q0FJQTs7O2lDQXNCWSxHQUNYO1FBQ0E7YUFBTyxVQUFVLFlBQVksbUJBQW1CLEtBQUssWUFBWSxLQUNsRTs7OztnQ0FFVyxVQUNWO2NBQVEsSUFDUjtXQUFLO2FBQ0UsU0FBUyxPQUNkO2NBQU0sU0FBUyxPQUVqQjtBQUhFO1dBSUg7Ozs7aUNBR0M7Y0FBUSxJQUNSO1lBQU0sZ0VBQWdFLEtBQUssTUFBTSxNQUFNLFdBQVcsS0FBSyxNQUFNLE1BQzFHLEtBQUssS0FBSyxXQUFXLEtBQ3pCOzs7OytCQUVVLFVBQ1Q7VUFBSSxPQUFPLFNBRVg7O0FBRUE7O1dBQUs7aUJBRVEsS0FJYjtBQUpJOztXQUlDLFVBQ047Ozs7OEJBRVMsTUFBTTttQkFDZDs7VUFBSSxRQUNKO1VBQUksbUJBQ0o7VUFBSSxZQUVKOztVQUFJLE9BQU8sS0FBSyxVQUVoQjs7VUFBSSxvQkFBb0IsT0FBTyxLQUFLLE9BQU8sVUFBQyxNQUMxQztlQUFPLEtBQUssdUJBQXVCLE9BQUssV0FBVyxPQUFLLGVBQWUsUUFBUSxLQUFLLFVBQVUsQ0FDL0Y7QUFFRCxPQUptQjs7VUFJZixtQ0FBbUMsS0FBSyxVQUFTLEdBQUcsR0FDdEQ7ZUFBTyxXQUFXLEVBQUUsdUJBQXVCLFdBQVcsRUFDdkQ7QUFFRCxPQUowQjs7VUFJdEIsb0JBQW9CLFVBQVUsR0FDaEM7ZUFBTyxvQkFDUjtBQUVEOztVQUFJLFFBQVEsS0FBSyxXQUFXLEtBQUssZUFBZSxRQUFRLEtBQUssVUFBVSxVQUFVLENBQUMsR0FDaEY7QUFDQTtjQUFNLEtBQUssYUFBYSxhQUFhLG9CQUFvQixTQUFTLFlBQVksWUFDOUU7c0JBQWMsVUFBVSxLQUFLLG1CQUFtQixLQUFLLFVBQVUsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUN6RjtBQUpELGlCQUlXLGFBQWEsVUFBVSxHQUNoQztBQUNBO2NBQU0sS0FBSyxzQ0FBc0Msb0JBQW9CLG1CQUFtQixtQkFBbUIsZUFDM0c7c0JBQWMsWUFBWSxLQUFLLG1CQUFtQixLQUFLLFVBQVUsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUFRLHNDQUFzQyxLQUFLLG1CQUFtQixLQUFLLFFBQVEsTUFBTSxLQUFLLE1BQU0sS0FBSyx1QkFDcE07QUFKTSxhQUtMO0FBQ0E7Y0FBTSxLQUFLLFVBQVUsV0FBVyxxQkFBcUIsa0JBQWtCLGFBQWEsVUFBVSxXQUFXLGlCQUN6RztzQkFBYyxVQUFVLEtBQUssbUJBQW1CLEtBQUssVUFBVSxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQ3pGO0FBRUQ7O1VBQUk7Z0JBQ00sTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLE1BQ3pDO3FCQUdGO0FBSkU7O2NBSU0sSUFFUjs7V0FBSyxTQUNMO1dBQUssU0FDTjs7Ozt1Q0FFa0IsTUFDakI7VUFBSTtxQkFDVyxDQUFDLFdBQVcsU0FBUyxZQUFZLGVBQWUsaUJBQWlCLFlBQVksVUFBVSxXQUFXLFVBQVUsT0FBTyxRQUNoSTt1QkFBZSxDQUFDLFVBQVUsVUFDMUI7Z0JBQVEsQ0FBQyxPQUFPLFNBQVMsUUFBUSxTQUFTLFFBQVEsUUFBUSxVQUFVLFlBQ3BFO2dCQUFRLENBQUMsU0FBUyxTQUFTLFVBQVUsWUFBWSxZQUNqRDtpQkFBUyxDQUFDLE9BQVEsaUJBQWlCLFlBQVksWUFBWSxRQUFRLFNBQVMsUUFBUSxRQUFRLFVBQzVGO2dCQUFRLENBQUMsU0FBUyxVQUFVLFFBQVEsUUFBUSxVQUM1QztlQUFPLENBQ1A7a0JBQVUsQ0FBQyxRQUFRLFNBQVMsVUFDNUI7NkJBQXFCLENBQUMsVUFDdEI7K0JBQXVCLENBQUMsVUFBVSxVQUdwQztBQVpFOztVQVlFLE9BQU8sTUFBTSxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVMsTUFBTSxNQUN0RDtVQUFJLHFCQUVKOztVQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLFFBQVEsS0FBSyxPQUFPLFFBQVEsQ0FBQyxHQUN6RDt3QkFBZ0IsUUFDakI7QUFGRCxhQUdFO3dCQUFnQixPQUNqQjtBQUVEOzthQUNEOzs7OzZCQUdDOzZCQUNFOztvQkFBQTtzQkFDRTtBQURGO0FBQUEseUJBQ0U7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUVBLGdEQUFDLGlDQUFNLFNBQVMsS0FBSztvQkFBckI7c0JBRUE7QUFGQTswQkFFQzs7b0JBQUQ7c0JBR0w7QUFISztBQUFBOzs7OztFQXhKcUIsZ0JBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSm5COzs7Ozs7Ozs7O2tDQUdkOztrQkFBWSxPQUFPO3dDQUFBOztpSUFFbEI7Ozs7OzZCQUdDOzZCQUNFLDBCQUFRLFNBQVMsS0FBSyxNQUFNO29CQUE1QjtzQkFBQTtBQUFBO09BQUEsRUFFSDs7Ozs7RUFUMEIsZ0JBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRjVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFLSDs2QkFDRTs7b0JBQUE7c0JBQ0U7QUFERjtBQUFBLHlCQUNFOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FHTDs7Ozs7RUFSMEIsZ0JBQU0iLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVzdWx0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVzdWx0JztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9jb21wb25lbnRzL3F1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLmZpbmRPdXRDbGljayA9IHRoaXMuZmluZE91dENsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbGF0OiBudWxsLFxuICAgICAgbG9uZzogbnVsbCxcbiAgICAgIGVycm9yczoge30sXG4gICAgICB3ZWF0aGVyOiB7fSxcbiAgICAgIGhhc0xvY2F0aW9uOiBmYWxzZSxcbiAgICAgIGhhc0ZvcmVjYXN0OiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICB9XG5cbiAgdHJpZ2dlcjogMTY7XG5cbiAgcG9zc2libGVDb25kaXRpb25zOiBbXG4gICAgXCJjbGVhci1kYXlcIiwgLy8gWUVTXG4gICAgXCJjbGVhci1uaWdodFwiLFxuICAgIFwicmFpblwiLCAvLyBOT1xuICAgIFwic25vd1wiLCAvLyBOT1xuICAgIFwic2xlZXRcIiwgLy8gTk9cbiAgICBcIndpbmRcIiwgLy8gTk9cbiAgICBcImZvZ1wiLCAvLyBOT1xuICAgIFwiY2xvdWR5XCIsIC8vIE5PXG4gICAgXCJwYXJ0bHktY2xvdWR5LWRheVwiLCAvLyBZRVNcbiAgICBcInBhcnRseS1jbG91ZHktbmlnaHRcIiwgLy8gTk9cbiAgXVxuXG4gIGdvb2RDb25kaXRpb25zOiBbXG4gICAgXCJwYXJ0bHktY2xvdWR5LWRheVwiLCAvLyBZRVNcbiAgICBcImNsZWFyLWRheVwiLCAvLyBZRVNcbiAgXVxuXG4gIGZpbmRPdXRDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHdpbmRvdy5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0UG9zaXRpb24uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGF0OiBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsXG4gICAgICBsb25nOiBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlXG4gICAgfSlcbiAgICB0aGlzLmdldFdlYXRoZXIoKTtcbiAgfVxuXG4gIGdldFdlYXRoZXIoKSB7XG4gICAgY29uc29sZS5sb2coJ2ZldGNoaW5nJylcbiAgICBmZXRjaChcImh0dHBzOi8vc2hvcnRzLXdlYXRoZXItYXBpLmhlcm9rdWFwcC5jb20vZm9yZWNhc3QuanNvbj9sYXQ9XCIgKyB0aGlzLnN0YXRlLmxhdCArIFwiJmxvbmc9XCIgKyB0aGlzLnN0YXRlLmxvbmcpXG4gICAgICAudGhlbih0aGlzLnNldFdlYXRoZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXRXZWF0aGVyKHJlc3BvbnNlKSB7XG4gICAgbGV0IGRhdGEgPSByZXNwb25zZS5ib2R5O1xuXG4gICAgZGVidWdnZXJcblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7XG4gICAgICAgIHdlYXRoZXI6IGRhdGEuY3VycmVudGx5XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuc2V0UmVzdWx0KGRhdGEpO1xuICB9XG5cbiAgc2V0UmVzdWx0KGRhdGEpIHtcbiAgICBsZXQgbGluZXMgPSBbXTtcbiAgICBsZXQgZGVzY3JpcHRpb247XG4gICAgbGV0IGhpZ2g7XG5cbiAgICBsZXQgdGVtcCA9IGRhdGEuY3VycmVudGx5LmFwcGFyZW50VGVtcGVyYXR1cmU7XG5cbiAgICBsZXQgd2FybWVyX2hvdXJzID0gZGF0YS5ob3VybHkuZGF0YS5maWx0ZXIoKGhvdXIpID0+IHtcbiAgICAgIHJldHVybiBob3VyLmFwcGFyZW50VGVtcGVyYXR1cmUgPj0gdGhpcy50cmlnZ2VyICYmIHRoaXMuZ29vZENvbmRpdGlvbnMuaW5kZXhPZihob3VyLmljb24pICE9PSAtMTtcbiAgICB9KTtcblxuICAgIGxldCBzb3J0ZWRfd2FybWVyX2hvdXJzID0gd2FybWVyX2hvdXJzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYS5hcHBhcmVudFRlbXBlcmF0dXJlKSAtIHBhcnNlRmxvYXQoYi5hcHBhcmVudFRlbXBlcmF0dXJlKTtcbiAgICB9KTtcblxuICAgIGlmIChzb3J0ZWRfd2FybWVyX2hvdXJzLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdoID0gc29ydGVkX3dhcm1lcl9ob3Vycy5wb3AoKTtcbiAgICB9XG5cbiAgICBpZiAodGVtcCA+PSB0aGlzLnRyaWdnZXIgJiYgdGhpcy5nb29kQ29uZGl0aW9ucy5pbmRleE9mKGRhdGEuY3VycmVudGx5Lmljb24pICE9PSAtMSkgIHtcbiAgICAgIC8vIFdhcm1cbiAgICAgIGxpbmVzLnB1c2goXCJIZWxsIHllYWhcIiwgXCJPZiBjb3Vyc2VcIiwgXCJHZXQgdGhlIGxlZ3Mgb3V0XCIsIFwiVG90ZXNcIiwgXCJGbGF0IG91dFwiLCBcIk5vIERvdWJ0XCIsIFwiSXQgYmxvb2R5IHdlbGwgaXNcIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgRGVncmVlc1wiO1xuICAgIH0gZWxzZSBpZiAod2FybWVyX2hvdXJzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAvLyBOb3Qgd2FybSBub3cgYnV0IGEgd2FybWVyIGhvdXIgbGF0ZXJcbiAgICAgIGxpbmVzLnB1c2goXCJOb3Qgbm93LCBidXQgaXQnbGwgYmUgd2FybWVyIGxhdGVyXCIsIFwiR2l2ZSBpdCBhIGNoYW5jZVwiLCBcIkhvdWwgeWVyIGhvcnNlc1wiLCBcIlJlbGF4IHllciBrYWNrc1wiLCBcIkRvbid0IHdvcnJ5XCIsIFwiTm90IHlldFwiKTtcbiAgICAgIGRlc2NyaXB0aW9uID0gXCJJdCdzIGEgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIGRlZ3JlZXMgcmlnaHQgbm93LCBidXQgaXQnbGwgYmUgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChoaWdoLmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKGhpZ2guYXBwYXJlbnRUZW1wZXJhdHVyZSkgKyBcIiBkZWdyZWVzIGxhdGVyXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vdCB3YXJtIGFuZCBubyB3YXJtZXIgaG91cnMgbGF0ZXJcbiAgICAgIGxpbmVzLnB1c2goXCJObyB3YXlcIiwgXCJIZWxsIG5vXCIsIFwiQXJlIHlvdSBub3Qgd2lzZT9cIiwgXCJKZWFucyBmbGF0IG91dFwiLCBcIkZyYWlkIG5vdFwiLCBcIldheSBvblwiLCBcIkF3YXkgb25cIiwgXCJGdWNrIGF3YXkgb2ZmXCIsIFwiQXJlIHlvdSBoYXZpbmcgYSBnaXJhZmZlP1wiKTtcbiAgICAgIGRlc2NyaXB0aW9uID0gXCJJdCdzIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBEZWdyZWVzXCI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgIGFuc3dlcjogbGluZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGluZXMubGVuZ3RoKV0sXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHJlc3VsdClcblxuICAgIHRoaXMuc2V0U3RhdGUocmVzdWx0OiByZXN1bHQpO1xuICAgIHRoaXMuc2V0U3RhdGUoaGFzRm9yZWNhc3Q6IHRydWUpO1xuICB9XG5cbiAgZm9yZWNhc3RJY29uVG9Xb3JkKGljb24pIHtcbiAgICBsZXQgd29yZHMgPSB7XG4gICAgICBcImNsZWFyLWRheVwiOiBbXCJiYW5naW5nXCIsIFwic3VubnlcIiwgXCJyb2FzdGluZ1wiLCBcInN3ZWFsdGVyaW5nXCIsIFwic2Nod2VhbHRlcmluJ1wiLCBcImR5bmFtaXRlXCIsIFwidW5yZWFsXCIsIFwiYW1hemluZ1wiLCBcImxvdmVseVwiLCBcImhvdFwiLCBcIndhcm1cIiwgXCJncmVhdFwiXSxcbiAgICAgIFwiY2xlYXItbmlnaHRcIjogW1wic3RhcnJ5XCIsIFwidW5yZWFsXCIsIFwibG92ZWx5XCJdLFxuICAgICAgXCJyYWluXCI6IFtcIndldFwiLCBcInNvZ2d5XCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJmcmVlemluZ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic25vd1wiOiBbXCJzbm93eVwiLCBcImFydGljXCIsIFwiYmFsdGljXCIsIFwiZnJlZXppbmdcIiwgXCJmcmVlemluJ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic2xlZXRcIjogW1wid2V0XCIsICBcIndldCBhbmQgc25vd3lcIiwgXCJmcmVlemluJ1wiLCBcImZyZWV6aW5nXCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJjaGlsbHlcIl0sXG4gICAgICBcIndpbmRcIjogW1wid2luZHlcIiwgXCJjaGlsbHlcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImJsdXN0ZXJ5XCJdLFxuICAgICAgXCJmb2dcIjogW1wiZm9nZ3lcIl0sXG4gICAgICBcImNsb3VkeVwiOiBbXCJncmV5XCIsIFwic2hpdGVcIiwgXCJjbG91ZHlcIiwgXCJiYWxsaXhcIl0sXG4gICAgICBcInBhcnRseS1jbG91ZHktZGF5XCI6IFtcImNsb3VkeVwiLCBcIm5vdCB0b28gYmFkXCJdLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCI6IFtcInN0YXJyeVwiLCBcInByZXR0eVwiLCBcImxvdmVseVwiXSxcbiAgICB9O1xuXG4gICAgbGV0IHdvcmQgPSB3b3Jkc1tpY29uXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqd29yZHNbaWNvbl0ubGVuZ3RoKV07XG4gICAgbGV0IHByZWZpeGVkX3dvcmQ7XG5cbiAgICBpZiAoWydhJywgJ2UnLCAnaScsICdvJywgJ3UnXS5pbmRleE9mKHdvcmQuY2hhckF0KDApKSAhPT0gLTEgKSB7XG4gICAgICBwcmVmaXhlZF93b3JkID0gXCJhbiBcIiArIHdvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeGVkX3dvcmQgPSBcImEgXCIgKyB3b3JkO1xuICAgIH1cblxuICAgIHJldHVybiBwcmVmaXhlZF93b3JkO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+SXMgSXQgU2hvcnRzIFdlYXRoZXIgVG9kYXk/PC9oMT5cblxuICAgICAgICA8UXVlcnkgb25DbGljaz17dGhpcy5maW5kT3V0Q2xpY2t9IC8+XG5cbiAgICAgICAgPFJlc3VsdC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbGlja30gPkZpbmQgb3V0PC9idXR0b24+XG4gICAgKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL3F1ZXJ5LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPlJlc3VsdDwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvcmVzdWx0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
            return { page: comp.default }
          })
        