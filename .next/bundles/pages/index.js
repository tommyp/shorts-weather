
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 573:
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

var _style = __webpack_require__(574);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _result = __webpack_require__(576);

var _result2 = _interopRequireDefault(_result);

var _query = __webpack_require__(575);

var _query2 = _interopRequireDefault(_query);

var _head = __webpack_require__(198);

var _head2 = _interopRequireDefault(_head);

var _reactTypekit = __webpack_require__(577);

var _reactTypekit2 = _interopRequireDefault(_reactTypekit);

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
      hasForecast: false,
      isLoading: false
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
      this.setState({ isLoading: true });
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      console.log(position);
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        hasLocation: true
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
        isLoading: false,
        result: result,
        hasForecast: true
      });
    }
  }, {
    key: 'forecastIconToWord',
    value: function forecastIconToWord(icon) {
      var words = {
        "clear-day": ["nice", "sunny", "roasting", "swealtering", "schwealterin'", "dynamite", "unreal", "amazing", "lovely", "hot", "warm", "great"],
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
        'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        }
      }, _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }, _react2.default.createElement('title', {
        'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        }
      }, 'Is it Shorts Weather today?'), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', 'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        }
      }), _react2.default.createElement(_reactTypekit2.default, { kitId: 'ioh1wfg', __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        }
      })), _react2.default.createElement(_style2.default, {
        styleId: 3072156723,
        css: '\n          * {\n            box-sizing: border-box;\n          }\n\n          h1, h2 {\n            font-weight: normal;\n            margin: 0;\n          }\n\n          body {\n            border-top: 5px solid #fff;\n            width: 100%;\n            margin: 0 auto;\n            background: #c02425;\n            /* Old browsers */\n            background: -moz-linear-gradient(top, #c02425 0%, #f0cb35 100%);\n            background: -webkit-linear-gradient(top, #c02425 0%, #f0cb35 100%);\n            background: linear-gradient(to bottom, #c02425 0%, #f0cb35 100%);\n            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#c02425\', endColorstr=\'#f0cb35\',GradientType=0 );\n            height: 100%;\n            background-repeat: no-repeat;\n            background-attachment: fixed;\n          }\n          body .container {\n            text-align: center;\n          }\n\n          html {\n            height: 100%;\n          }\n\n          h1 {\n            font-family: "futura-pt-condensed",sans-serif;\n            font-style: italic;\n            text-align: center;\n            text-transform: uppercase;\n            font-weight: 600;\n            color: #fff;\n            font-size: 120px;\n            text-align: center;\n            font-weight: bold;\n          }\n\n          h2 {\n            font-family: "futura-pt-condensed",sans-serif;\n            font-style: italic;\n            text-align: center;\n            text-transform: uppercase;\n            font-weight: 600;\n            color: #fff;\n            font-size: 80px;\n            max-width: 80%;\n            margin: 0 auto;\n          }\n\n          #description {\n            font-size: 60px;\n            margin-bottom: 20px;\n          }\n\n          button {\n            -webkit-appearance: none;\n            border: none;\n            background: none;\n            font-family: "futura-pt-condensed",sans-serif;\n            font-style: italic;\n            text-align: center;\n            text-transform: uppercase;\n            font-weight: 600;\n            color: #fff;\n            margin: 20px auto 0;\n            border: 5px solid #fff;\n            font-size: 30px;\n            display: block;\n            cursor: pointer;\n          }\n\n          #tweet {\n            display: none;\n          }\n\n          footer {\n            font-family: "futura-pt-condensed",sans-serif;\n            font-style: italic;\n            text-align: center;\n            text-transform: uppercase;\n            font-weight: 600;\n            margin: 25px auto 0;\n            font-size: 24px;\n            text-transform: uppercase;\n          }\n\n          footer a {\n            color: #fff;\n            text-decoration: none;\n            border-bottom: 1px solid #fff;\n          }\n\n          @media screen and (max-width: 700px) {\n            h1 {\n              font-size: 60px;\n              margin-bottom: 20px;\n            }\n\n            #answer {\n              font-size: 40px;\n              margin-bottom: 20px;\n            }\n\n            #description {\n              font-size: 50px;\n            }\n          }\n\n        '
      }), _react2.default.createElement('h1', {
        'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 283
        }
      }, 'Is It Shorts Weather Today?'), !this.state.result && !this.state.isLoading && _react2.default.createElement(_query2.default, { onClick: this.findOutClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 286
        }
      }), this.state.isLoading && _react2.default.createElement('h2', {
        'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 291
        }
      }, 'Loading...'), this.state.hasForecast && this.state.result && _react2.default.createElement(_result2.default, { result: this.state.result, __source: {
          fileName: _jsxFileName,
          lineNumber: 296
        }
      }), _react2.default.createElement('footer', {
        'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 299
        }
      }, _react2.default.createElement('a', { href: 'http://tommyp.org', 'data-jsx': 3072156723,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 300
        }
      }, 'Made by Tommy')));
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

/***/ 575:
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

/***/ 576:
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

var _jsxFileName = "/Users/tommy/Code/shorts-weather/components/result.js";


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: "render",

    // constructor(props) {
    //   super(props)
    //
    //   this.state = {
    //     ...props.result
    //   }
    // }

    value: function render() {
      return _react2.default.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement("h2", { id: "answer", __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, this.props.result.answer), _react2.default.createElement("h2", { id: "description", __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, this.props.result.description));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/tommy/Code/shorts-weather/components/result.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/tommy/Code/shorts-weather/components/result.js"); } } })();

/***/ }),

/***/ 646:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(573);


/***/ })

},[646]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8wNjBmMDU0Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcXVlcnkuanM/MDYwZjA1NCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Jlc3VsdC5qcz8wNjBmMDU0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2tDQUlMOztrQkFBWSxPQUFPO3dDQUFBOztzSUFHakI7O1VBQUssZUFBZSxNQUFLLGFBQWEsS0FFdEM7O1VBQUs7V0FFSDtZQUNBO2NBQ0E7ZUFDQTttQkFDQTttQkFDQTtpQkFBVztBQU5YO1dBUUg7Ozs7O3dDQUlBOzs7aUNBc0JZLEdBQ1g7UUFDQTtXQUFLLFNBQVMsRUFBQyxXQUNmO2FBQU8sVUFBVSxZQUFZLG1CQUFtQixLQUFLLFlBQVksS0FDbEU7Ozs7Z0NBRVcsVUFDVjtjQUFRLElBQ1I7V0FBSzthQUNFLFNBQVMsT0FDZDtjQUFNLFNBQVMsT0FDZjtxQkFFRjtBQUpFO1dBS0g7Ozs7aUNBRVk7bUJBQ1g7O2NBQVEsSUFFUjs7VUFBSSxNQUFNLGdFQUFnRSxLQUFLLE1BQU0sTUFBTSxXQUFXLEtBQUssTUFFM0c7O1lBQU0sS0FDSCxLQUFLO2VBQVksU0FBUztBQUQ3QixTQUVHLEtBQUs7ZUFBUSxPQUFLLFdBQVc7QUFDakM7Ozs7K0JBRVUsTUFDVDtXQUFLO2lCQUVRLEtBSWI7QUFKSTs7V0FJQyxVQUNOOzs7OzhCQUVTLE1BQU07bUJBQ2Q7O1VBQUksUUFDSjtVQUFJLG1CQUNKO1VBQUksWUFFSjs7VUFBSSxPQUFPLEtBQUssVUFFaEI7O1VBQUksb0JBQW9CLE9BQU8sS0FBSyxPQUFPLFVBQUMsTUFDMUM7ZUFBTyxLQUFLLHVCQUF1QixPQUFLLFdBQVcsT0FBSyxlQUFlLFFBQVEsS0FBSyxVQUFVLENBQy9GO0FBRUQsT0FKbUI7O1VBSWYsbUNBQW1D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MVMwQixnQkFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNObkI7Ozs7Ozs7Ozs7a0NBR2Q7O2tCQUFZLE9BQU87d0NBQUE7O2lJQUVsQjs7Ozs7NkJBR0M7NkJBQ0UsMEJBQVEsU0FBUyxLQUFLLE1BQU07b0JBQTVCO3NCQUFBO0FBQUE7T0FBQSxFQUVIOzs7OztFQVQwQixnQkFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJTDs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs2QkFHRTs2QkFDRTs7b0JBQUE7c0JBQ0U7QUFERjtBQUFBLHlCQUNFLHNCQUFJLElBQUc7b0JBQVA7c0JBQWlCO0FBQWpCO2NBQXNCLE1BQU0sT0FDNUIsK0NBQUksSUFBRztvQkFBUDtzQkFBc0I7QUFBdEI7Y0FBMkIsTUFBTSxPQUd0Qzs7Ozs7RUFqQjBCLGdCQUFNIiwiZmlsZSI6ImJ1bmRsZXMvcGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlc3VsdCBmcm9tICcuLi9jb21wb25lbnRzL3Jlc3VsdCc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vY29tcG9uZW50cy9xdWVyeSc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IFR5cGVraXQgZnJvbSAncmVhY3QtdHlwZWtpdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5maW5kT3V0Q2xpY2sgPSB0aGlzLmZpbmRPdXRDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxhdDogbnVsbCxcbiAgICAgIGxvbmc6IG51bGwsXG4gICAgICBlcnJvcnM6IHt9LFxuICAgICAgd2VhdGhlcjoge30sXG4gICAgICBoYXNMb2NhdGlvbjogZmFsc2UsXG4gICAgICBoYXNGb3JlY2FzdDogZmFsc2UsXG4gICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gIH1cblxuICB0cmlnZ2VyOiAxNjtcblxuICBwb3NzaWJsZUNvbmRpdGlvbnM6IFtcbiAgICBcImNsZWFyLWRheVwiLCAvLyBZRVNcbiAgICBcImNsZWFyLW5pZ2h0XCIsXG4gICAgXCJyYWluXCIsIC8vIE5PXG4gICAgXCJzbm93XCIsIC8vIE5PXG4gICAgXCJzbGVldFwiLCAvLyBOT1xuICAgIFwid2luZFwiLCAvLyBOT1xuICAgIFwiZm9nXCIsIC8vIE5PXG4gICAgXCJjbG91ZHlcIiwgLy8gTk9cbiAgICBcInBhcnRseS1jbG91ZHktZGF5XCIsIC8vIFlFU1xuICAgIFwicGFydGx5LWNsb3VkeS1uaWdodFwiLCAvLyBOT1xuICBdXG5cbiAgZ29vZENvbmRpdGlvbnM6IFtcbiAgICBcInBhcnRseS1jbG91ZHktZGF5XCIsIC8vIFlFU1xuICAgIFwiY2xlYXItZGF5XCIsIC8vIFlFU1xuICBdXG5cbiAgZmluZE91dENsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNMb2FkaW5nOiB0cnVlfSlcbiAgICB3aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnNldFBvc2l0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhwb3NpdGlvbilcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhdDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgbG9uZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgIGhhc0xvY2F0aW9uOiB0cnVlLFxuICAgIH0pXG4gICAgdGhpcy5nZXRXZWF0aGVyKCk7XG4gIH1cblxuICBnZXRXZWF0aGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdmZXRjaGluZycpXG5cbiAgICBsZXQgdXJsID0gXCJodHRwczovL3Nob3J0cy13ZWF0aGVyLWFwaS5oZXJva3VhcHAuY29tL2ZvcmVjYXN0Lmpzb24/bGF0PVwiICsgdGhpcy5zdGF0ZS5sYXQgKyBcIiZsb25nPVwiICsgdGhpcy5zdGF0ZS5sb25nO1xuXG4gICAgZmV0Y2godXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB0aGlzLnNldFdlYXRoZXIoZGF0YSkpXG4gIH1cblxuICBzZXRXZWF0aGVyKGRhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICB3ZWF0aGVyOiBkYXRhLmN1cnJlbnRseVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnNldFJlc3VsdChkYXRhKTtcbiAgfVxuXG4gIHNldFJlc3VsdChkYXRhKSB7XG4gICAgbGV0IGxpbmVzID0gW107XG4gICAgbGV0IGRlc2NyaXB0aW9uO1xuICAgIGxldCBoaWdoO1xuXG4gICAgbGV0IHRlbXAgPSBkYXRhLmN1cnJlbnRseS5hcHBhcmVudFRlbXBlcmF0dXJlO1xuXG4gICAgbGV0IHdhcm1lcl9ob3VycyA9IGRhdGEuaG91cmx5LmRhdGEuZmlsdGVyKChob3VyKSA9PiB7XG4gICAgICByZXR1cm4gaG91ci5hcHBhcmVudFRlbXBlcmF0dXJlID49IHRoaXMudHJpZ2dlciAmJiB0aGlzLmdvb2RDb25kaXRpb25zLmluZGV4T2YoaG91ci5pY29uKSAhPT0gLTE7XG4gICAgfSk7XG5cbiAgICBsZXQgc29ydGVkX3dhcm1lcl9ob3VycyA9IHdhcm1lcl9ob3Vycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEuYXBwYXJlbnRUZW1wZXJhdHVyZSkgLSBwYXJzZUZsb2F0KGIuYXBwYXJlbnRUZW1wZXJhdHVyZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydGVkX3dhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaCA9IHNvcnRlZF93YXJtZXJfaG91cnMucG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAgPj0gdGhpcy50cmlnZ2VyICYmIHRoaXMuZ29vZENvbmRpdGlvbnMuaW5kZXhPZihkYXRhLmN1cnJlbnRseS5pY29uKSAhPT0gLTEpICB7XG4gICAgICAvLyBXYXJtXG4gICAgICBsaW5lcy5wdXNoKFwiSGVsbCB5ZWFoXCIsIFwiT2YgY291cnNlXCIsIFwiR2V0IHRoZSBsZWdzIG91dFwiLCBcIlRvdGVzXCIsIFwiRmxhdCBvdXRcIiwgXCJObyBEb3VidFwiLCBcIkl0IGJsb29keSB3ZWxsIGlzXCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIERlZ3JlZXNcIjtcbiAgICB9IGVsc2UgaWYgKHdhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgLy8gTm90IHdhcm0gbm93IGJ1dCBhIHdhcm1lciBob3VyIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm90IG5vdywgYnV0IGl0J2xsIGJlIHdhcm1lciBsYXRlclwiLCBcIkdpdmUgaXQgYSBjaGFuY2VcIiwgXCJIb3VsIHllciBob3JzZXNcIiwgXCJSZWxheCB5ZXIga2Fja3NcIiwgXCJEb24ndCB3b3JyeVwiLCBcIk5vdCB5ZXRcIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBhIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBkZWdyZWVzIHJpZ2h0IG5vdywgYnV0IGl0J2xsIGJlIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoaGlnaC5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZChoaWdoLmFwcGFyZW50VGVtcGVyYXR1cmUpICsgXCIgZGVncmVlcyBsYXRlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3Qgd2FybSBhbmQgbm8gd2FybWVyIGhvdXJzIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm8gd2F5XCIsIFwiSGVsbCBub1wiLCBcIkFyZSB5b3Ugbm90IHdpc2U/XCIsIFwiSmVhbnMgZmxhdCBvdXRcIiwgXCJGcmFpZCBub3RcIiwgXCJXYXkgb25cIiwgXCJBd2F5IG9uXCIsIFwiRnVjayBhd2F5IG9mZlwiLCBcIkFyZSB5b3UgaGF2aW5nIGEgZ2lyYWZmZT9cIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgRGVncmVlc1wiO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICBhbnN3ZXI6IGxpbmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpbmVzLmxlbmd0aCldLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgIGhhc0ZvcmVjYXN0OiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgZm9yZWNhc3RJY29uVG9Xb3JkKGljb24pIHtcbiAgICBsZXQgd29yZHMgPSB7XG4gICAgICBcImNsZWFyLWRheVwiOiBbXCJuaWNlXCIsIFwic3VubnlcIiwgXCJyb2FzdGluZ1wiLCBcInN3ZWFsdGVyaW5nXCIsIFwic2Nod2VhbHRlcmluJ1wiLCBcImR5bmFtaXRlXCIsIFwidW5yZWFsXCIsIFwiYW1hemluZ1wiLCBcImxvdmVseVwiLCBcImhvdFwiLCBcIndhcm1cIiwgXCJncmVhdFwiXSxcbiAgICAgIFwiY2xlYXItbmlnaHRcIjogW1wic3RhcnJ5XCIsIFwidW5yZWFsXCIsIFwibG92ZWx5XCJdLFxuICAgICAgXCJyYWluXCI6IFtcIndldFwiLCBcInNvZ2d5XCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJmcmVlemluZ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic25vd1wiOiBbXCJzbm93eVwiLCBcImFydGljXCIsIFwiYmFsdGljXCIsIFwiZnJlZXppbmdcIiwgXCJmcmVlemluJ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic2xlZXRcIjogW1wid2V0XCIsICBcIndldCBhbmQgc25vd3lcIiwgXCJmcmVlemluJ1wiLCBcImZyZWV6aW5nXCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJjaGlsbHlcIl0sXG4gICAgICBcIndpbmRcIjogW1wid2luZHlcIiwgXCJjaGlsbHlcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImJsdXN0ZXJ5XCJdLFxuICAgICAgXCJmb2dcIjogW1wiZm9nZ3lcIl0sXG4gICAgICBcImNsb3VkeVwiOiBbXCJncmV5XCIsIFwic2hpdGVcIiwgXCJjbG91ZHlcIiwgXCJiYWxsaXhcIl0sXG4gICAgICBcInBhcnRseS1jbG91ZHktZGF5XCI6IFtcImNsb3VkeVwiLCBcIm5vdCB0b28gYmFkXCJdLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCI6IFtcInN0YXJyeVwiLCBcInByZXR0eVwiLCBcImxvdmVseVwiXSxcbiAgICB9O1xuXG4gICAgbGV0IHdvcmQgPSB3b3Jkc1tpY29uXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqd29yZHNbaWNvbl0ubGVuZ3RoKV07XG4gICAgbGV0IHByZWZpeGVkX3dvcmQ7XG5cbiAgICBpZiAoWydhJywgJ2UnLCAnaScsICdvJywgJ3UnXS5pbmRleE9mKHdvcmQuY2hhckF0KDApKSAhPT0gLTEgKSB7XG4gICAgICBwcmVmaXhlZF93b3JkID0gXCJhbiBcIiArIHdvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeGVkX3dvcmQgPSBcImEgXCIgKyB3b3JkO1xuICAgIH1cblxuICAgIHJldHVybiBwcmVmaXhlZF93b3JkO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8dGl0bGU+SXMgaXQgU2hvcnRzIFdlYXRoZXIgdG9kYXk/PC90aXRsZT5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwiaW5pdGlhbC1zY2FsZT0xLjAsIHdpZHRoPWRldmljZS13aWR0aFwiIC8+XG4gICAgICAgICAgPFR5cGVraXQga2l0SWQ9XCJpb2gxd2ZnXCIgLz5cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICoge1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBoMSwgaDIge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDVweCBzb2xpZCAjZmZmO1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNjMDI0MjU7XG4gICAgICAgICAgICAvKiBPbGQgYnJvd3NlcnMgKi9cbiAgICAgICAgICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2MwMjQyNSAwJSwgI2YwY2IzNSAxMDAlKTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2MwMjQyNSAwJSwgI2YwY2IzNSAxMDAlKTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNjMDI0MjUgMCUsICNmMGNiMzUgMTAwJSk7XG4gICAgICAgICAgICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudCggc3RhcnRDb2xvcnN0cj0nI2MwMjQyNScsIGVuZENvbG9yc3RyPScjZjBjYjM1JyxHcmFkaWVudFR5cGU9MCApO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJvZHkgLmNvbnRhaW5lciB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaHRtbCB7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaDEge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IFwiZnV0dXJhLXB0LWNvbmRlbnNlZFwiLHNhbnMtc2VyaWY7XG4gICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMjBweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGgyIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBcImZ1dHVyYS1wdC1jb25kZW5zZWRcIixzYW5zLXNlcmlmO1xuICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogODBweDtcbiAgICAgICAgICAgIG1heC13aWR0aDogODAlO1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgI2Rlc2NyaXB0aW9uIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNjBweDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnV0dG9uIHtcbiAgICAgICAgICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgICAgICBmb250LWZhbWlseTogXCJmdXR1cmEtcHQtY29uZGVuc2VkXCIsc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICBtYXJnaW46IDIwcHggYXV0byAwO1xuICAgICAgICAgICAgYm9yZGVyOiA1cHggc29saWQgI2ZmZjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICN0d2VldCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvb3RlciB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogXCJmdXR1cmEtcHQtY29uZGVuc2VkXCIsc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgbWFyZ2luOiAyNXB4IGF1dG8gMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9vdGVyIGEge1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCkge1xuICAgICAgICAgICAgaDEge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDYwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICNhbnN3ZXIge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDQwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICNkZXNjcmlwdGlvbiB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgYH08L3N0eWxlPlxuXG4gICAgICAgIDxoMT5JcyBJdCBTaG9ydHMgV2VhdGhlciBUb2RheT88L2gxPlxuXG4gICAgICAgIHsgIXRoaXMuc3RhdGUucmVzdWx0ICYmICF0aGlzLnN0YXRlLmlzTG9hZGluZyAmJlxuICAgICAgICAgIDxRdWVyeSBvbkNsaWNrPXt0aGlzLmZpbmRPdXRDbGlja30gLz5cbiAgICAgICAgfVxuXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmlzTG9hZGluZyAmJlxuICAgICAgICAgIDxoMj5Mb2FkaW5nLi4uPC9oMj5cbiAgICAgICAgfVxuXG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLmhhc0ZvcmVjYXN0ICYmIHRoaXMuc3RhdGUucmVzdWx0ICYmXG4gICAgICAgICAgPFJlc3VsdCByZXN1bHQ9e3RoaXMuc3RhdGUucmVzdWx0fS8+XG4gICAgICAgIH1cblxuICAgICAgICA8Zm9vdGVyPlxuICAgICAgICAgIDxhIGhyZWY9J2h0dHA6Ly90b21teXAub3JnJz5NYWRlIGJ5IFRvbW15PC9hPlxuICAgICAgICA8L2Zvb3Rlcj5cblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2t9ID5GaW5kIG91dDwvYnV0dG9uPlxuICAgIClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9xdWVyeS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAvLyBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAvLyAgIHN1cGVyKHByb3BzKVxuICAvL1xuICAvLyAgIHRoaXMuc3RhdGUgPSB7XG4gIC8vICAgICAuLi5wcm9wcy5yZXN1bHRcbiAgLy8gICB9XG4gIC8vIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMiBpZD1cImFuc3dlclwiPnt0aGlzLnByb3BzLnJlc3VsdC5hbnN3ZXJ9PC9oMj5cbiAgICAgICAgPGgyIGlkPVwiZGVzY3JpcHRpb25cIj57dGhpcy5wcm9wcy5yZXN1bHQuZGVzY3JpcHRpb259PC9oMj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9yZXN1bHQuanMiXSwic291cmNlUm9vdCI6IiJ9
            return { page: comp.default }
          })
        