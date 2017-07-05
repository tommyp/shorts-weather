
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

var _result = __webpack_require__(558);

var _result2 = _interopRequireDefault(_result);

var _query = __webpack_require__(556);

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
          lineNumber: 155
        }
      }, _react2.default.createElement('h1', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }, 'Is It Shorts Weather Today?'), _react2.default.createElement(_query2.default, { onClick: this.findOutClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        }
      }), this.state.hasForecast && this.state.result && _react2.default.createElement(_result2.default, { result: this.state.result, __source: {
          fileName: _jsxFileName,
          lineNumber: 162
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

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(554);


/***/ }),

/***/ 558:
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

/***/ })

},[557]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8xNzdiMmY1Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvcXVlcnkuanM/MTc3YjJmNSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3Jlc3VsdC5qcz8xNzdiMmY1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztrQ0FJTDs7a0JBQVksT0FBTzt3Q0FBQTs7c0lBR2pCOztVQUFLLGVBQWUsTUFBSyxhQUFhLEtBRXRDOztVQUFLO1dBRUg7WUFDQTtjQUNBO2VBQ0E7bUJBQ0E7bUJBQWE7QUFMYjtXQU9IOzs7Ozt3Q0FJQTs7O2lDQXNCWSxHQUNYO1FBQ0E7YUFBTyxVQUFVLFlBQVksbUJBQW1CLEtBQUssWUFBWSxLQUNsRTs7OztnQ0FFVyxVQUNWO2NBQVEsSUFDUjtXQUFLO2FBQ0UsU0FBUyxPQUNkO2NBQU0sU0FBUyxPQUNmO3FCQUVGO0FBSkU7V0FLSDs7OztpQ0FFWTttQkFDWDs7Y0FBUSxJQUVSOztVQUFJLE1BQU0sZ0VBQWdFLEtBQUssTUFBTSxNQUFNLFdBQVcsS0FBSyxNQUUzRzs7WUFBTSxLQUNILEtBQUs7ZUFBWSxTQUFTO0FBRDdCLFNBRUcsS0FBSztlQUFRLE9BQUssV0FBVztBQUNqQzs7OzsrQkFFVSxNQUNUO1dBQUs7aUJBRVEsS0FJYjtBQUpJOztXQUlDLFVBQ047Ozs7OEJBRVMsTUFBTTttQkFDZDs7VUFBSSxRQUNKO1VBQUksbUJBQ0o7VUFBSSxZQUVKOztVQUFJLE9BQU8sS0FBSyxVQUVoQjs7VUFBSSxvQkFBb0IsT0FBTyxLQUFLLE9BQU8sVUFBQyxNQUMxQztlQUFPLEtBQUssdUJBQXVCLE9BQUssV0FBVyxPQUFLLGVBQWUsUUFBUSxLQUFLLFVBQVUsQ0FDL0Y7QUFFRCxPQUptQjs7VUFJZixtQ0FBbUMsS0FBSyxVQUFTLEdBQUcsR0FDdEQ7ZUFBTyxXQUFXLEVBQUUsdUJBQXVCLFdB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QkFBUDtzQkFBc0I7QUFBdEI7Y0FBMkIsTUFBTSxPQUd0Qzs7Ozs7RUFqQjBCLGdCQUFNIiwiZmlsZSI6ImJ1bmRsZXMvcGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlc3VsdCBmcm9tICcuLi9jb21wb25lbnRzL3Jlc3VsdCc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vY29tcG9uZW50cy9xdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5maW5kT3V0Q2xpY2sgPSB0aGlzLmZpbmRPdXRDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxhdDogbnVsbCxcbiAgICAgIGxvbmc6IG51bGwsXG4gICAgICBlcnJvcnM6IHt9LFxuICAgICAgd2VhdGhlcjoge30sXG4gICAgICBoYXNMb2NhdGlvbjogZmFsc2UsXG4gICAgICBoYXNGb3JlY2FzdDogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgfVxuXG4gIHRyaWdnZXI6IDE2O1xuXG4gIHBvc3NpYmxlQ29uZGl0aW9uczogW1xuICAgIFwiY2xlYXItZGF5XCIsIC8vIFlFU1xuICAgIFwiY2xlYXItbmlnaHRcIixcbiAgICBcInJhaW5cIiwgLy8gTk9cbiAgICBcInNub3dcIiwgLy8gTk9cbiAgICBcInNsZWV0XCIsIC8vIE5PXG4gICAgXCJ3aW5kXCIsIC8vIE5PXG4gICAgXCJmb2dcIiwgLy8gTk9cbiAgICBcImNsb3VkeVwiLCAvLyBOT1xuICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIiwgLy8gWUVTXG4gICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIsIC8vIE5PXG4gIF1cblxuICBnb29kQ29uZGl0aW9uczogW1xuICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIiwgLy8gWUVTXG4gICAgXCJjbGVhci1kYXlcIiwgLy8gWUVTXG4gIF1cblxuICBmaW5kT3V0Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB3aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnNldFBvc2l0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhwb3NpdGlvbilcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhdDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgbG9uZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSxcbiAgICAgIGhhc0xvY2F0aW9uOiB0cnVlLFxuICAgIH0pXG4gICAgdGhpcy5nZXRXZWF0aGVyKCk7XG4gIH1cblxuICBnZXRXZWF0aGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdmZXRjaGluZycpXG5cbiAgICBsZXQgdXJsID0gXCJodHRwczovL3Nob3J0cy13ZWF0aGVyLWFwaS5oZXJva3VhcHAuY29tL2ZvcmVjYXN0Lmpzb24/bGF0PVwiICsgdGhpcy5zdGF0ZS5sYXQgKyBcIiZsb25nPVwiICsgdGhpcy5zdGF0ZS5sb25nO1xuXG4gICAgZmV0Y2godXJsKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB0aGlzLnNldFdlYXRoZXIoZGF0YSkpXG4gIH1cblxuICBzZXRXZWF0aGVyKGRhdGEpIHtcbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICB3ZWF0aGVyOiBkYXRhLmN1cnJlbnRseVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnNldFJlc3VsdChkYXRhKTtcbiAgfVxuXG4gIHNldFJlc3VsdChkYXRhKSB7XG4gICAgbGV0IGxpbmVzID0gW107XG4gICAgbGV0IGRlc2NyaXB0aW9uO1xuICAgIGxldCBoaWdoO1xuXG4gICAgbGV0IHRlbXAgPSBkYXRhLmN1cnJlbnRseS5hcHBhcmVudFRlbXBlcmF0dXJlO1xuXG4gICAgbGV0IHdhcm1lcl9ob3VycyA9IGRhdGEuaG91cmx5LmRhdGEuZmlsdGVyKChob3VyKSA9PiB7XG4gICAgICByZXR1cm4gaG91ci5hcHBhcmVudFRlbXBlcmF0dXJlID49IHRoaXMudHJpZ2dlciAmJiB0aGlzLmdvb2RDb25kaXRpb25zLmluZGV4T2YoaG91ci5pY29uKSAhPT0gLTE7XG4gICAgfSk7XG5cbiAgICBsZXQgc29ydGVkX3dhcm1lcl9ob3VycyA9IHdhcm1lcl9ob3Vycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEuYXBwYXJlbnRUZW1wZXJhdHVyZSkgLSBwYXJzZUZsb2F0KGIuYXBwYXJlbnRUZW1wZXJhdHVyZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydGVkX3dhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaCA9IHNvcnRlZF93YXJtZXJfaG91cnMucG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAgPj0gdGhpcy50cmlnZ2VyICYmIHRoaXMuZ29vZENvbmRpdGlvbnMuaW5kZXhPZihkYXRhLmN1cnJlbnRseS5pY29uKSAhPT0gLTEpICB7XG4gICAgICAvLyBXYXJtXG4gICAgICBsaW5lcy5wdXNoKFwiSGVsbCB5ZWFoXCIsIFwiT2YgY291cnNlXCIsIFwiR2V0IHRoZSBsZWdzIG91dFwiLCBcIlRvdGVzXCIsIFwiRmxhdCBvdXRcIiwgXCJObyBEb3VidFwiLCBcIkl0IGJsb29keSB3ZWxsIGlzXCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIERlZ3JlZXNcIjtcbiAgICB9IGVsc2UgaWYgKHdhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgLy8gTm90IHdhcm0gbm93IGJ1dCBhIHdhcm1lciBob3VyIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm90IG5vdywgYnV0IGl0J2xsIGJlIHdhcm1lciBsYXRlclwiLCBcIkdpdmUgaXQgYSBjaGFuY2VcIiwgXCJIb3VsIHllciBob3JzZXNcIiwgXCJSZWxheCB5ZXIga2Fja3NcIiwgXCJEb24ndCB3b3JyeVwiLCBcIk5vdCB5ZXRcIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBhIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBkZWdyZWVzIHJpZ2h0IG5vdywgYnV0IGl0J2xsIGJlIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoaGlnaC5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZChoaWdoLmFwcGFyZW50VGVtcGVyYXR1cmUpICsgXCIgZGVncmVlcyBsYXRlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3Qgd2FybSBhbmQgbm8gd2FybWVyIGhvdXJzIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm8gd2F5XCIsIFwiSGVsbCBub1wiLCBcIkFyZSB5b3Ugbm90IHdpc2U/XCIsIFwiSmVhbnMgZmxhdCBvdXRcIiwgXCJGcmFpZCBub3RcIiwgXCJXYXkgb25cIiwgXCJBd2F5IG9uXCIsIFwiRnVjayBhd2F5IG9mZlwiLCBcIkFyZSB5b3UgaGF2aW5nIGEgZ2lyYWZmZT9cIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgRGVncmVlc1wiO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICBhbnN3ZXI6IGxpbmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpbmVzLmxlbmd0aCldLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgaGFzRm9yZWNhc3Q6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICBmb3JlY2FzdEljb25Ub1dvcmQoaWNvbikge1xuICAgIGxldCB3b3JkcyA9IHtcbiAgICAgIFwiY2xlYXItZGF5XCI6IFtcImJhbmdpbmdcIiwgXCJzdW5ueVwiLCBcInJvYXN0aW5nXCIsIFwic3dlYWx0ZXJpbmdcIiwgXCJzY2h3ZWFsdGVyaW4nXCIsIFwiZHluYW1pdGVcIiwgXCJ1bnJlYWxcIiwgXCJhbWF6aW5nXCIsIFwibG92ZWx5XCIsIFwiaG90XCIsIFwid2FybVwiLCBcImdyZWF0XCJdLFxuICAgICAgXCJjbGVhci1uaWdodFwiOiBbXCJzdGFycnlcIiwgXCJ1bnJlYWxcIiwgXCJsb3ZlbHlcIl0sXG4gICAgICBcInJhaW5cIjogW1wid2V0XCIsIFwic29nZ3lcIiwgXCJkYW1wXCIsIFwibW9pc3RcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImZyZWV6aW5nXCIsIFwiY2hpbGx5XCJdLFxuICAgICAgXCJzbm93XCI6IFtcInNub3d5XCIsIFwiYXJ0aWNcIiwgXCJiYWx0aWNcIiwgXCJmcmVlemluZ1wiLCBcImZyZWV6aW4nXCIsIFwiY2hpbGx5XCJdLFxuICAgICAgXCJzbGVldFwiOiBbXCJ3ZXRcIiwgIFwid2V0IGFuZCBzbm93eVwiLCBcImZyZWV6aW4nXCIsIFwiZnJlZXppbmdcIiwgXCJkYW1wXCIsIFwibW9pc3RcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwid2luZFwiOiBbXCJ3aW5keVwiLCBcImNoaWxseVwiLCBcImNvbGRcIiwgXCJjb3VsXCIsIFwiYmFsdGljXCIsIFwiYmx1c3RlcnlcIl0sXG4gICAgICBcImZvZ1wiOiBbXCJmb2dneVwiXSxcbiAgICAgIFwiY2xvdWR5XCI6IFtcImdyZXlcIiwgXCJzaGl0ZVwiLCBcImNsb3VkeVwiLCBcImJhbGxpeFwiXSxcbiAgICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIjogW1wiY2xvdWR5XCIsIFwibm90IHRvbyBiYWRcIl0sXG4gICAgICBcInBhcnRseS1jbG91ZHktbmlnaHRcIjogW1wic3RhcnJ5XCIsIFwicHJldHR5XCIsIFwibG92ZWx5XCJdLFxuICAgIH07XG5cbiAgICBsZXQgd29yZCA9IHdvcmRzW2ljb25dW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp3b3Jkc1tpY29uXS5sZW5ndGgpXTtcbiAgICBsZXQgcHJlZml4ZWRfd29yZDtcblxuICAgIGlmIChbJ2EnLCAnZScsICdpJywgJ28nLCAndSddLmluZGV4T2Yod29yZC5jaGFyQXQoMCkpICE9PSAtMSApIHtcbiAgICAgIHByZWZpeGVkX3dvcmQgPSBcImFuIFwiICsgd29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ZWRfd29yZCA9IFwiYSBcIiArIHdvcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZWZpeGVkX3dvcmQ7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5JcyBJdCBTaG9ydHMgV2VhdGhlciBUb2RheT88L2gxPlxuXG4gICAgICAgIDxRdWVyeSBvbkNsaWNrPXt0aGlzLmZpbmRPdXRDbGlja30gLz5cblxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zdGF0ZS5oYXNGb3JlY2FzdCAmJiB0aGlzLnN0YXRlLnJlc3VsdCAmJlxuICAgICAgICAgIDxSZXN1bHQgcmVzdWx0PXt0aGlzLnN0YXRlLnJlc3VsdH0vPlxuICAgICAgICB9XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfSA+RmluZCBvdXQ8L2J1dHRvbj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvcXVlcnkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgLy8gY29uc3RydWN0b3IocHJvcHMpIHtcbiAgLy8gICBzdXBlcihwcm9wcylcbiAgLy9cbiAgLy8gICB0aGlzLnN0YXRlID0ge1xuICAvLyAgICAgLi4ucHJvcHMucmVzdWx0XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDIgaWQ9XCJhbnN3ZXJcIj57dGhpcy5wcm9wcy5yZXN1bHQuYW5zd2VyfTwvaDI+XG4gICAgICAgIDxoMiBpZD1cImRlc2NyaXB0aW9uXCI+e3RoaXMucHJvcHMucmVzdWx0LmRlc2NyaXB0aW9ufTwvaDI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvcmVzdWx0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
            return { page: comp.default }
          })
        