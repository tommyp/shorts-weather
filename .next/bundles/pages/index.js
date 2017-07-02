
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
      var _this2 = this;

      console.log('fetching');

      var url = "https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + this.state.lat + "&long=" + this.state.long;

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this2.setWeather(data);
      });
      // if (response.ok) {
      //   response.json().then((response) =>
      //     this.setWeather(response).bind
      //   )
      // }
      // }).bind(this);
    }
  }, {
    key: 'setWeather',
    value: function setWeather(data) {
      this.setState({
        weather: data.currently
      });

      this.setResult(data);
    }
  }, {
    key: 'setResult',
    value: function setResult(data) {
      var _this3 = this;

      var lines = [];
      var description = void 0;
      var high = void 0;

      var temp = data.currently.apparentTemperature;

      var warmer_hours = data.hourly.data.filter(function (hour) {
        return hour.apparentTemperature >= _this3.trigger && _this3.goodConditions.indexOf(hour.icon) !== -1;
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

      this.setState({
        result: result,
        hasForecast: true
      });
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
          lineNumber: 160
        }
      }, _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }, 'Is It Shorts Weather Today?'), _react2.default.createElement(_query2.default, { onClick: this.findOutClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        }
      }), _react2.default.createElement(_result2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8wMTYwZGM5Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcXVlcnkuanM/MDE2MGRjOSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Jlc3VsdC5qcz8wMTYwZGM5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztrQ0FJTDs7a0JBQVksT0FBTzt3Q0FBQTs7c0lBR2pCOztVQUFLLGVBQWUsTUFBSyxhQUFhLEtBRXRDOztVQUFLO1dBRUg7WUFDQTtjQUNBO2VBQ0E7bUJBQ0E7bUJBQWE7QUFMYjtXQU9IOzs7Ozt3Q0FJQTs7O2lDQXNCWSxHQUNYO1FBQ0E7YUFBTyxVQUFVLFlBQVksbUJBQW1CLEtBQUssWUFBWSxLQUNsRTs7OztnQ0FFVyxVQUNWO2NBQVEsSUFDUjtXQUFLO2FBQ0UsU0FBUyxPQUNkO2NBQU0sU0FBUyxPQUVqQjtBQUhFO1dBSUg7Ozs7aUNBRVk7bUJBQ1g7O2NBQVEsSUFFUjs7VUFBSSxNQUFNLGdFQUFnRSxLQUFLLE1BQU0sTUFBTSxXQUFXLEtBQUssTUFFM0c7O1lBQU0sS0FDSCxLQUFLO2VBQVksU0FBUztBQUQ3QixTQUVHLEtBQUs7ZUFBUSxPQUFLLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGO0FBQ0Q7Ozs7K0JBRVUsTUFDVDtXQUFLO2lCQUVRLEtBSWI7QUFKSTs7V0FJQyxVQUNOOzs7OzhCQUVTLE1BQU07bUJBQ2Q7O1VBQUksUUFDSjtVQUFJLG1CQUNKO1VBQUksWUFFSjs7VUFBSSxPQUFPLEtBQUssVUFFaEI7O1VBQUksb0JBQW9CLE9BQU8sS0FBSyxPQUFPLFVBQUMsTUFDMUM7ZUFBTyxLQUFLLHVCQUF1QixPQUFLLFdBQVcsT0FBSyxlQUFlLFFBQVEsS0FBSyxVQUFVLENBQy9GO0FBRUQsT0FKbUI7O1VBSWYsbUNBQW1DLEtBQUssVUFBUyxHQUFHLEdBQ3REO2VBQU8sV0FBVyxFQUFFLHVCQUF1QixXQUFXLEVBQ3ZEO0FBRUQsT0FKMEI7O1VBSXRCLG9CQUFvQixVQUFVLEdBQ2hDO2VBQU8sb0JBQ1I7QUFFRDs7VUFBSSxRQUFRLEtBQUssV0FBVyxLQUFLLGVBQWUsUUFBUSxLQUFLLFVBQVUsVUFBVSxDQUFDLEdBQ2hGO0FBQ0E7Y0FBTSxLQUFLLGFBQWEsYUFBYSxvQkFBb0IsU0FBUyxZQUFZLFlBQzlFO3NCQUFjLFVBQVUsS0FBSyxtQkFBbUIsS0FBSyxVQUFVLFFBQVEsTUFBTSxLQUFLLE1BQU0sUUFDekY7QUFKRCxpQkFJVyxhQUFhLFVBQVUsR0FDaEM7QUFDQTtjQUFNLEtBQUssc0NBQXNDLG9CQUFvQixtQkFBbUIsbUJBQW1CLGVBQzNHO3NCQUFjLFlBQVksS0FBSyxtQkFBbUIsS0FBSyxVQUFVLFFBQVEsTUFBTSxLQUFLLE1BQU0sUUFBUSxzQ0FBc0MsS0FBSyxtQkFBbUIsS0FBSyxRQUFRLE1BQU0sS0FBSyxNQUFNLEtBQUssdUJBQ3BNO0FBSk0sYUFLTDtBQUNBO2NBQU0sS0FBSyxVQUFVLFdBQVcscUJBQXFCLGtCQUFrQixhQUFhLFVBQVUsV0FBVyxpQkFDekc7c0JBQWMsVUFBVSxLQUFLLG1CQUFtQixLQUFLLFVBQVUsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUN6RjtBQUVEOztVQUFJO2dCQUNNLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxNQUN6QztxQkFHRjtBQUpFOztjQUlNLElBRVI7O1dBQUs7Z0JBRUg7cUJBRUg7QUFIRzs7Ozt1Q0FLZSxNQUNqQjtVQUFJO3FCQUNXLENBQUMsV0FBVyxTQUFTLFlBQVksZUFBZSxpQkFBaUIsWUFBWSxVQUFVLFdBQVcsVUFBVSxPQUFPLFFBQ2hJO3VCQUFlLENBQUMsVUFBVSxVQUMxQjtnQkFBUSxDQUFDLE9BQU8sU0FBUyxRQUFRLFNBQVMsUUFBUSxRQUFRLFVBQVUsWUFDcEU7Z0JBQVEsQ0FBQyxTQUFTLFNBQVMsVUFBVSxZQUFZLFlBQ2pEO2lCQUFTLENBQUMsT0FBUSxpQkFBaUIsWUFBWSxZQUFZLFFBQVEsU0FBUyxRQUFRLFFBQVEsVUFDNUY7Z0JBQVEsQ0FBQyxTQUFTLFVBQVUsUUFBUSxRQUFRLFVBQzVDO2VBQU8sQ0FDUDtrQkFBVSxDQUFDLFFBQVEsU0FBUyxVQUM1Qjs2QkFBcUIsQ0FBQyxVQUN0QjsrQkFBdUIsQ0FBQyxVQUFVLFVBR3BDO0FBWkU7O1VBWUUsT0FBTyxNQUFNLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBUyxNQUFNLE1BQ3REO1VBQUkscUJBRUo7O1VBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssUUFBUSxLQUFLLE9BQU8sUUFBUSxDQUFDLEdBQ3pEO3dCQUFnQixRQUNqQjtBQUZELGFBR0U7d0JBQWdCLE9BQ2pCO0FBRUQ7O2FBQ0Q7Ozs7NkJBR0M7NkJBQ0U7O29CQUFBO3NCQUNFO0FBREY7QUFBQSx5QkFDRTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBRUEsZ0RBQUMsaUNBQU0sU0FBUyxLQUFLO29CQUFyQjtzQkFFQTtBQUZBOzBCQUVDOztvQkFBRDtzQkFHTDtBQUhLO0FBQUE7Ozs7O0VBaEtxQixnQkFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKbkI7Ozs7Ozs7Ozs7a0NBR2Q7O2tCQUFZLE9BQU87d0NBQUE7O2lJQUVsQjs7Ozs7NkJBR0M7NkJBQ0UsMEJBQVEsU0FBUyxLQUFLLE1BQU07b0JBQTVCO3NCQUFBO0FBQUE7T0FBQSxFQUVIOzs7OztFQVQwQixnQkFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUtIOzZCQUNFOztvQkFBQTtzQkFDRTtBQURGO0FBQUEseUJBQ0U7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUdMOzs7OztFQVIwQixnQkFBTSIsImZpbGUiOiJidW5kbGVzL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZXN1bHQgZnJvbSAnLi4vY29tcG9uZW50cy9yZXN1bHQnO1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL2NvbXBvbmVudHMvcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcblxuICAgIHRoaXMuZmluZE91dENsaWNrID0gdGhpcy5maW5kT3V0Q2xpY2suYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBsYXQ6IG51bGwsXG4gICAgICBsb25nOiBudWxsLFxuICAgICAgZXJyb3JzOiB7fSxcbiAgICAgIHdlYXRoZXI6IHt9LFxuICAgICAgaGFzTG9jYXRpb246IGZhbHNlLFxuICAgICAgaGFzRm9yZWNhc3Q6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gIH1cblxuICB0cmlnZ2VyOiAxNjtcblxuICBwb3NzaWJsZUNvbmRpdGlvbnM6IFtcbiAgICBcImNsZWFyLWRheVwiLCAvLyBZRVNcbiAgICBcImNsZWFyLW5pZ2h0XCIsXG4gICAgXCJyYWluXCIsIC8vIE5PXG4gICAgXCJzbm93XCIsIC8vIE5PXG4gICAgXCJzbGVldFwiLCAvLyBOT1xuICAgIFwid2luZFwiLCAvLyBOT1xuICAgIFwiZm9nXCIsIC8vIE5PXG4gICAgXCJjbG91ZHlcIiwgLy8gTk9cbiAgICBcInBhcnRseS1jbG91ZHktZGF5XCIsIC8vIFlFU1xuICAgIFwicGFydGx5LWNsb3VkeS1uaWdodFwiLCAvLyBOT1xuICBdXG5cbiAgZ29vZENvbmRpdGlvbnM6IFtcbiAgICBcInBhcnRseS1jbG91ZHktZGF5XCIsIC8vIFlFU1xuICAgIFwiY2xlYXItZGF5XCIsIC8vIFlFU1xuICBdXG5cbiAgZmluZE91dENsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgd2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5zZXRQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgY29uc29sZS5sb2cocG9zaXRpb24pXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsYXQ6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgIGxvbmc6IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcbiAgICB9KVxuICAgIHRoaXMuZ2V0V2VhdGhlcigpO1xuICB9XG5cbiAgZ2V0V2VhdGhlcigpIHtcbiAgICBjb25zb2xlLmxvZygnZmV0Y2hpbmcnKVxuXG4gICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9zaG9ydHMtd2VhdGhlci1hcGkuaGVyb2t1YXBwLmNvbS9mb3JlY2FzdC5qc29uP2xhdD1cIiArIHRoaXMuc3RhdGUubGF0ICsgXCImbG9uZz1cIiArIHRoaXMuc3RhdGUubG9uZztcblxuICAgIGZldGNoKHVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4gdGhpcy5zZXRXZWF0aGVyKGRhdGEpKVxuICAgICAgLy8gaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAvLyAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChyZXNwb25zZSkgPT5cbiAgICAgIC8vICAgICB0aGlzLnNldFdlYXRoZXIocmVzcG9uc2UpLmJpbmRcbiAgICAgIC8vICAgKVxuICAgICAgLy8gfVxuICAgIC8vIH0pLmJpbmQodGhpcyk7XG4gIH1cblxuICBzZXRXZWF0aGVyKGRhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICB3ZWF0aGVyOiBkYXRhLmN1cnJlbnRseVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnNldFJlc3VsdChkYXRhKTtcbiAgfVxuXG4gIHNldFJlc3VsdChkYXRhKSB7XG4gICAgbGV0IGxpbmVzID0gW107XG4gICAgbGV0IGRlc2NyaXB0aW9uO1xuICAgIGxldCBoaWdoO1xuXG4gICAgbGV0IHRlbXAgPSBkYXRhLmN1cnJlbnRseS5hcHBhcmVudFRlbXBlcmF0dXJlO1xuXG4gICAgbGV0IHdhcm1lcl9ob3VycyA9IGRhdGEuaG91cmx5LmRhdGEuZmlsdGVyKChob3VyKSA9PiB7XG4gICAgICByZXR1cm4gaG91ci5hcHBhcmVudFRlbXBlcmF0dXJlID49IHRoaXMudHJpZ2dlciAmJiB0aGlzLmdvb2RDb25kaXRpb25zLmluZGV4T2YoaG91ci5pY29uKSAhPT0gLTE7XG4gICAgfSk7XG5cbiAgICBsZXQgc29ydGVkX3dhcm1lcl9ob3VycyA9IHdhcm1lcl9ob3Vycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEuYXBwYXJlbnRUZW1wZXJhdHVyZSkgLSBwYXJzZUZsb2F0KGIuYXBwYXJlbnRUZW1wZXJhdHVyZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydGVkX3dhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaCA9IHNvcnRlZF93YXJtZXJfaG91cnMucG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAgPj0gdGhpcy50cmlnZ2VyICYmIHRoaXMuZ29vZENvbmRpdGlvbnMuaW5kZXhPZihkYXRhLmN1cnJlbnRseS5pY29uKSAhPT0gLTEpICB7XG4gICAgICAvLyBXYXJtXG4gICAgICBsaW5lcy5wdXNoKFwiSGVsbCB5ZWFoXCIsIFwiT2YgY291cnNlXCIsIFwiR2V0IHRoZSBsZWdzIG91dFwiLCBcIlRvdGVzXCIsIFwiRmxhdCBvdXRcIiwgXCJObyBEb3VidFwiLCBcIkl0IGJsb29keSB3ZWxsIGlzXCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIERlZ3JlZXNcIjtcbiAgICB9IGVsc2UgaWYgKHdhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgLy8gTm90IHdhcm0gbm93IGJ1dCBhIHdhcm1lciBob3VyIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm90IG5vdywgYnV0IGl0J2xsIGJlIHdhcm1lciBsYXRlclwiLCBcIkdpdmUgaXQgYSBjaGFuY2VcIiwgXCJIb3VsIHllciBob3JzZXNcIiwgXCJSZWxheCB5ZXIga2Fja3NcIiwgXCJEb24ndCB3b3JyeVwiLCBcIk5vdCB5ZXRcIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBhIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBkZWdyZWVzIHJpZ2h0IG5vdywgYnV0IGl0J2xsIGJlIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoaGlnaC5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZChoaWdoLmFwcGFyZW50VGVtcGVyYXR1cmUpICsgXCIgZGVncmVlcyBsYXRlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3Qgd2FybSBhbmQgbm8gd2FybWVyIGhvdXJzIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm8gd2F5XCIsIFwiSGVsbCBub1wiLCBcIkFyZSB5b3Ugbm90IHdpc2U/XCIsIFwiSmVhbnMgZmxhdCBvdXRcIiwgXCJGcmFpZCBub3RcIiwgXCJXYXkgb25cIiwgXCJBd2F5IG9uXCIsIFwiRnVjayBhd2F5IG9mZlwiLCBcIkFyZSB5b3UgaGF2aW5nIGEgZ2lyYWZmZT9cIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgRGVncmVlc1wiO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICBhbnN3ZXI6IGxpbmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpbmVzLmxlbmd0aCldLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgaGFzRm9yZWNhc3Q6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBmb3JlY2FzdEljb25Ub1dvcmQoaWNvbikge1xuICAgIGxldCB3b3JkcyA9IHtcbiAgICAgIFwiY2xlYXItZGF5XCI6IFtcImJhbmdpbmdcIiwgXCJzdW5ueVwiLCBcInJvYXN0aW5nXCIsIFwic3dlYWx0ZXJpbmdcIiwgXCJzY2h3ZWFsdGVyaW4nXCIsIFwiZHluYW1pdGVcIiwgXCJ1bnJlYWxcIiwgXCJhbWF6aW5nXCIsIFwibG92ZWx5XCIsIFwiaG90XCIsIFwid2FybVwiLCBcImdyZWF0XCJdLFxuICAgICAgXCJjbGVhci1uaWdodFwiOiBbXCJzdGFycnlcIiwgXCJ1bnJlYWxcIiwgXCJsb3ZlbHlcIl0sXG4gICAgICBcInJhaW5cIjogW1wid2V0XCIsIFwic29nZ3lcIiwgXCJkYW1wXCIsIFwibW9pc3RcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImZyZWV6aW5nXCIsIFwiY2hpbGx5XCJdLFxuICAgICAgXCJzbm93XCI6IFtcInNub3d5XCIsIFwiYXJ0aWNcIiwgXCJiYWx0aWNcIiwgXCJmcmVlemluZ1wiLCBcImZyZWV6aW4nXCIsIFwiY2hpbGx5XCJdLFxuICAgICAgXCJzbGVldFwiOiBbXCJ3ZXRcIiwgIFwid2V0IGFuZCBzbm93eVwiLCBcImZyZWV6aW4nXCIsIFwiZnJlZXppbmdcIiwgXCJkYW1wXCIsIFwibW9pc3RcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwid2luZFwiOiBbXCJ3aW5keVwiLCBcImNoaWxseVwiLCBcImNvbGRcIiwgXCJjb3VsXCIsIFwiYmFsdGljXCIsIFwiYmx1c3RlcnlcIl0sXG4gICAgICBcImZvZ1wiOiBbXCJmb2dneVwiXSxcbiAgICAgIFwiY2xvdWR5XCI6IFtcImdyZXlcIiwgXCJzaGl0ZVwiLCBcImNsb3VkeVwiLCBcImJhbGxpeFwiXSxcbiAgICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIjogW1wiY2xvdWR5XCIsIFwibm90IHRvbyBiYWRcIl0sXG4gICAgICBcInBhcnRseS1jbG91ZHktbmlnaHRcIjogW1wic3RhcnJ5XCIsIFwicHJldHR5XCIsIFwibG92ZWx5XCJdLFxuICAgIH07XG5cbiAgICBsZXQgd29yZCA9IHdvcmRzW2ljb25dW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp3b3Jkc1tpY29uXS5sZW5ndGgpXTtcbiAgICBsZXQgcHJlZml4ZWRfd29yZDtcblxuICAgIGlmIChbJ2EnLCAnZScsICdpJywgJ28nLCAndSddLmluZGV4T2Yod29yZC5jaGFyQXQoMCkpICE9PSAtMSApIHtcbiAgICAgIHByZWZpeGVkX3dvcmQgPSBcImFuIFwiICsgd29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ZWRfd29yZCA9IFwiYSBcIiArIHdvcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWZpeGVkX3dvcmQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5JcyBJdCBTaG9ydHMgV2VhdGhlciBUb2RheT88L2gxPlxuXG4gICAgICAgIDxRdWVyeSBvbkNsaWNrPXt0aGlzLmZpbmRPdXRDbGlja30gLz5cblxuICAgICAgICA8UmVzdWx0Lz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfSA+RmluZCBvdXQ8L2J1dHRvbj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvcXVlcnkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+UmVzdWx0PC9oMj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9yZXN1bHQuanMiXSwic291cmNlUm9vdCI6IiJ9
            return { page: comp.default }
          })
        