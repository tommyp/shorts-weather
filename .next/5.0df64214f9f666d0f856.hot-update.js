webpackHotUpdate(5,{

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8zNTA5ZGQ0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU87Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2tDQUlMOztrQkFBWSxPQUFPO3dDQUFBOztzSUFHakI7O1VBQUssZUFBZSxNQUFLLGFBQWEsS0FFdEM7O1VBQUs7V0FFSDtZQUNBO2NBQ0E7ZUFDQTttQkFDQTttQkFBYTtBQUxiO1dBT0g7Ozs7O3dDQUlBOzs7aUNBc0JZLEdBQ1g7UUFDQTthQUFPLFVBQVUsWUFBWSxtQkFBbUIsS0FBSyxZQUFZLEtBQ2xFOzs7O2dDQUVXLFVBQ1Y7Y0FBUSxJQUNSO1dBQUs7YUFDRSxTQUFTLE9BQ2Q7Y0FBTSxTQUFTLE9BRWpCO0FBSEU7V0FJSDs7OztpQ0FFWTttQkFDWDs7Y0FBUSxJQUVSOztVQUFJLE1BQU0sZ0VBQWdFLEtBQUssTUFBTSxNQUFNLFdBQVcsS0FBSyxNQUUzRzs7WUFBTSxLQUNILEtBQUs7ZUFBWSxTQUFTO0FBRDdCLFNBRUcsS0FBSztlQUFRLE9BQUssV0FBVztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Y7QUFDRDs7OzsrQkFFVSxNQUNUO1dBQUs7aUJBRVEsS0FJYjtBQUpJOztXQUlDLFVBQ047Ozs7OEJBRVMsTUFBTTttQkFDZDs7VUFBSSxRQUNKO1VBQUksbUJBQ0o7VUFBSSxZQUVKOztVQUFJLE9BQU8sS0FBSyxVQUVoQjs7VUFBSSxvQkFBb0IsT0FBTyxLQUFLLE9BQU8sVUFBQyxNQUMxQztlQUFPLEtBQUssdUJBQXVCLE9BQUssV0FBVyxPQUFLLGVBQWUsUUFBUSxLQUFLLFVBQVUsQ0FDL0Y7QUFFRCxPQUptQjs7VUFJZixtQ0FBbUMsS0FBSyxVQUFTLEdBQUcsR0FDdEQ7ZUFBTyxXQUFXLEVBQUUsdUJBQXVCLFdBQVcsRUFDdkQ7QUFFRCxPQUowQjs7VUFJdEIsb0JBQW9CLFVBQVUsR0FDaEM7ZUFBTyxvQkFDUjtBQUVEOztVQUFJLFFBQVEsS0FBSyxXQUFXLEtBQUssZUFBZSxRQUFRLEtBQUssVUFBVSxVQUFVLENBQUMsR0FDaEY7QUFDQTtjQUFNLEtBQUssYUFBYSxhQUFhLG9CQUFvQixTQUFTLFlBQVksWUFDOUU7c0JBQWMsVUFBVSxLQUFLLG1CQUFtQixLQUFLLFVBQVUsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUN6RjtBQUpELGlCQUlXLGFBQWEsVUFBVSxHQUNoQztBQUNBO2NBQU0sS0FBSyxzQ0FBc0Msb0JBQW9CLG1CQUFtQixtQkFBbUIsZUFDM0c7c0JBQWMsWUFBWSxLQUFLLG1CQUFtQixLQUFLLFVBQVUsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUFRLHNDQUFzQyxLQUFLLG1CQUFtQixLQUFLLFFBQVEsTUFBTSxLQUFLLE1BQU0sS0FBSyx1QkFDcE07QUFKTSxhQUtMO0FBQ0E7Y0FBTSxLQUFLLFVBQVUsV0FBVyxxQkFBcUIsa0JBQWtCLGFBQWEsVUFBVSxXQUFXLGlCQUN6RztzQkFBYyxVQUFVLEtBQUssbUJBQW1CLEtBQUssVUFBVSxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQ3pGO0FBRUQ7O1VBQUk7Z0JBQ00sTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLE1BQ3pDO3FCQUdGO0FBSkU7O2NBSU0sSUFFUjs7V0FBSztnQkFFSDtxQkFFSDtBQUhHOzs7O3VDQUtlLE1BQ2pCO1VBQUk7cUJBQ1csQ0FBQyxXQUFXLFNBQVMsWUFBWSxlQUFlLGlCQUFpQixZQUFZLFVBQVUsV0FBVyxVQUFVLE9BQU8sUUFDaEk7dUJBQWUsQ0FBQyxVQUFVLFVBQzFCO2dCQUFRLENBQUMsT0FBTyxTQUFTLFFBQVEsU0FBUyxRQUFRLFFBQVEsVUFBVSxZQUNwRTtnQkFBUSxDQUFDLFNBQVMsU0FBUyxVQUFVLFlBQVksWUFDakQ7aUJBQVMsQ0FBQyxPQUFRLGlCQUFpQixZQUFZLFlBQVksUUFBUSxTQUFTLFFBQVEsUUFBUSxVQUM1RjtnQkFBUSxDQUFDLFNBQVMsVUFBVSxRQUFRLFFBQVEsVUFDNUM7ZUFBTyxDQUNQO2tCQUFVLENBQUMsUUFBUSxTQUFTLFVBQzVCOzZCQUFxQixDQUFDLFVBQ3RCOytCQUF1QixDQUFDLFVBQVUsVUFHcEM7QUFaRTs7VUFZRSxPQUFPLE1BQU0sTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFTLE1BQU0sTUFDdEQ7VUFBSSxxQkFFSjs7VUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxRQUFRLEtBQUssT0FBTyxRQUFRLENBQUMsR0FDekQ7d0JBQWdCLFFBQ2pCO0FBRkQsYUFHRTt3QkFBZ0IsT0FDakI7QUFFRDs7YUFDRDs7Ozs2QkFHQzs2QkFDRTs7b0JBQUE7c0JBQ0U7QUFERjtBQUFBLHlCQUNFOztvQkFBQTtzQkFBQTtBQUFBO0FBQUEsU0FFQSxnREFBQyxpQ0FBTSxTQUFTLEtBQUs7b0JBQXJCO3NCQUVBO0FBRkE7MEJBRUM7O29CQUFEO3NCQUdMO0FBSEs7QUFBQTs7Ozs7RUFoS3FCLGdCQUFNIiwiZmlsZSI6IjUuMGRmNjQyMTRmOWY2NjZkMGY4NTYuaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVzdWx0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVzdWx0JztcbmltcG9ydCBRdWVyeSBmcm9tICcuLi9jb21wb25lbnRzL3F1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLmZpbmRPdXRDbGljayA9IHRoaXMuZmluZE91dENsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbGF0OiBudWxsLFxuICAgICAgbG9uZzogbnVsbCxcbiAgICAgIGVycm9yczoge30sXG4gICAgICB3ZWF0aGVyOiB7fSxcbiAgICAgIGhhc0xvY2F0aW9uOiBmYWxzZSxcbiAgICAgIGhhc0ZvcmVjYXN0OiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICB9XG5cbiAgdHJpZ2dlcjogMTY7XG5cbiAgcG9zc2libGVDb25kaXRpb25zOiBbXG4gICAgXCJjbGVhci1kYXlcIiwgLy8gWUVTXG4gICAgXCJjbGVhci1uaWdodFwiLFxuICAgIFwicmFpblwiLCAvLyBOT1xuICAgIFwic25vd1wiLCAvLyBOT1xuICAgIFwic2xlZXRcIiwgLy8gTk9cbiAgICBcIndpbmRcIiwgLy8gTk9cbiAgICBcImZvZ1wiLCAvLyBOT1xuICAgIFwiY2xvdWR5XCIsIC8vIE5PXG4gICAgXCJwYXJ0bHktY2xvdWR5LWRheVwiLCAvLyBZRVNcbiAgICBcInBhcnRseS1jbG91ZHktbmlnaHRcIiwgLy8gTk9cbiAgXVxuXG4gIGdvb2RDb25kaXRpb25zOiBbXG4gICAgXCJwYXJ0bHktY2xvdWR5LWRheVwiLCAvLyBZRVNcbiAgICBcImNsZWFyLWRheVwiLCAvLyBZRVNcbiAgXVxuXG4gIGZpbmRPdXRDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHdpbmRvdy5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0UG9zaXRpb24uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGF0OiBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsXG4gICAgICBsb25nOiBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlXG4gICAgfSlcbiAgICB0aGlzLmdldFdlYXRoZXIoKTtcbiAgfVxuXG4gIGdldFdlYXRoZXIoKSB7XG4gICAgY29uc29sZS5sb2coJ2ZldGNoaW5nJylcblxuICAgIGxldCB1cmwgPSBcImh0dHBzOi8vc2hvcnRzLXdlYXRoZXItYXBpLmhlcm9rdWFwcC5jb20vZm9yZWNhc3QuanNvbj9sYXQ9XCIgKyB0aGlzLnN0YXRlLmxhdCArIFwiJmxvbmc9XCIgKyB0aGlzLnN0YXRlLmxvbmc7XG5cbiAgICBmZXRjaCh1cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihkYXRhID0+IHRoaXMuc2V0V2VhdGhlcihkYXRhKSlcbiAgICAgIC8vIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgLy8gICByZXNwb25zZS5qc29uKCkudGhlbigocmVzcG9uc2UpID0+XG4gICAgICAvLyAgICAgdGhpcy5zZXRXZWF0aGVyKHJlc3BvbnNlKS5iaW5kXG4gICAgICAvLyAgIClcbiAgICAgIC8vIH1cbiAgICAvLyB9KS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgc2V0V2VhdGhlcihkYXRhKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAgd2VhdGhlcjogZGF0YS5jdXJyZW50bHlcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5zZXRSZXN1bHQoZGF0YSk7XG4gIH1cblxuICBzZXRSZXN1bHQoZGF0YSkge1xuICAgIGxldCBsaW5lcyA9IFtdO1xuICAgIGxldCBkZXNjcmlwdGlvbjtcbiAgICBsZXQgaGlnaDtcblxuICAgIGxldCB0ZW1wID0gZGF0YS5jdXJyZW50bHkuYXBwYXJlbnRUZW1wZXJhdHVyZTtcblxuICAgIGxldCB3YXJtZXJfaG91cnMgPSBkYXRhLmhvdXJseS5kYXRhLmZpbHRlcigoaG91cikgPT4ge1xuICAgICAgcmV0dXJuIGhvdXIuYXBwYXJlbnRUZW1wZXJhdHVyZSA+PSB0aGlzLnRyaWdnZXIgJiYgdGhpcy5nb29kQ29uZGl0aW9ucy5pbmRleE9mKGhvdXIuaWNvbikgIT09IC0xO1xuICAgIH0pO1xuXG4gICAgbGV0IHNvcnRlZF93YXJtZXJfaG91cnMgPSB3YXJtZXJfaG91cnMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhLmFwcGFyZW50VGVtcGVyYXR1cmUpIC0gcGFyc2VGbG9hdChiLmFwcGFyZW50VGVtcGVyYXR1cmUpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNvcnRlZF93YXJtZXJfaG91cnMubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2ggPSBzb3J0ZWRfd2FybWVyX2hvdXJzLnBvcCgpO1xuICAgIH1cblxuICAgIGlmICh0ZW1wID49IHRoaXMudHJpZ2dlciAmJiB0aGlzLmdvb2RDb25kaXRpb25zLmluZGV4T2YoZGF0YS5jdXJyZW50bHkuaWNvbikgIT09IC0xKSAge1xuICAgICAgLy8gV2FybVxuICAgICAgbGluZXMucHVzaChcIkhlbGwgeWVhaFwiLCBcIk9mIGNvdXJzZVwiLCBcIkdldCB0aGUgbGVncyBvdXRcIiwgXCJUb3Rlc1wiLCBcIkZsYXQgb3V0XCIsIFwiTm8gRG91YnRcIiwgXCJJdCBibG9vZHkgd2VsbCBpc1wiKTtcbiAgICAgIGRlc2NyaXB0aW9uID0gXCJJdCdzIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBEZWdyZWVzXCI7XG4gICAgfSBlbHNlIGlmICh3YXJtZXJfaG91cnMubGVuZ3RoID49IDEpIHtcbiAgICAgIC8vIE5vdCB3YXJtIG5vdyBidXQgYSB3YXJtZXIgaG91ciBsYXRlclxuICAgICAgbGluZXMucHVzaChcIk5vdCBub3csIGJ1dCBpdCdsbCBiZSB3YXJtZXIgbGF0ZXJcIiwgXCJHaXZlIGl0IGEgY2hhbmNlXCIsIFwiSG91bCB5ZXIgaG9yc2VzXCIsIFwiUmVsYXggeWVyIGthY2tzXCIsIFwiRG9uJ3Qgd29ycnlcIiwgXCJOb3QgeWV0XCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgYSBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgZGVncmVlcyByaWdodCBub3csIGJ1dCBpdCdsbCBiZSBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGhpZ2guaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQoaGlnaC5hcHBhcmVudFRlbXBlcmF0dXJlKSArIFwiIGRlZ3JlZXMgbGF0ZXJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IHdhcm0gYW5kIG5vIHdhcm1lciBob3VycyBsYXRlclxuICAgICAgbGluZXMucHVzaChcIk5vIHdheVwiLCBcIkhlbGwgbm9cIiwgXCJBcmUgeW91IG5vdCB3aXNlP1wiLCBcIkplYW5zIGZsYXQgb3V0XCIsIFwiRnJhaWQgbm90XCIsIFwiV2F5IG9uXCIsIFwiQXdheSBvblwiLCBcIkZ1Y2sgYXdheSBvZmZcIiwgXCJBcmUgeW91IGhhdmluZyBhIGdpcmFmZmU/XCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIERlZ3JlZXNcIjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgYW5zd2VyOiBsaW5lc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaW5lcy5sZW5ndGgpXSxcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2cocmVzdWx0KVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgIGhhc0ZvcmVjYXN0OiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgZm9yZWNhc3RJY29uVG9Xb3JkKGljb24pIHtcbiAgICBsZXQgd29yZHMgPSB7XG4gICAgICBcImNsZWFyLWRheVwiOiBbXCJiYW5naW5nXCIsIFwic3VubnlcIiwgXCJyb2FzdGluZ1wiLCBcInN3ZWFsdGVyaW5nXCIsIFwic2Nod2VhbHRlcmluJ1wiLCBcImR5bmFtaXRlXCIsIFwidW5yZWFsXCIsIFwiYW1hemluZ1wiLCBcImxvdmVseVwiLCBcImhvdFwiLCBcIndhcm1cIiwgXCJncmVhdFwiXSxcbiAgICAgIFwiY2xlYXItbmlnaHRcIjogW1wic3RhcnJ5XCIsIFwidW5yZWFsXCIsIFwibG92ZWx5XCJdLFxuICAgICAgXCJyYWluXCI6IFtcIndldFwiLCBcInNvZ2d5XCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJmcmVlemluZ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic25vd1wiOiBbXCJzbm93eVwiLCBcImFydGljXCIsIFwiYmFsdGljXCIsIFwiZnJlZXppbmdcIiwgXCJmcmVlemluJ1wiLCBcImNoaWxseVwiXSxcbiAgICAgIFwic2xlZXRcIjogW1wid2V0XCIsICBcIndldCBhbmQgc25vd3lcIiwgXCJmcmVlemluJ1wiLCBcImZyZWV6aW5nXCIsIFwiZGFtcFwiLCBcIm1vaXN0XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJjaGlsbHlcIl0sXG4gICAgICBcIndpbmRcIjogW1wid2luZHlcIiwgXCJjaGlsbHlcIiwgXCJjb2xkXCIsIFwiY291bFwiLCBcImJhbHRpY1wiLCBcImJsdXN0ZXJ5XCJdLFxuICAgICAgXCJmb2dcIjogW1wiZm9nZ3lcIl0sXG4gICAgICBcImNsb3VkeVwiOiBbXCJncmV5XCIsIFwic2hpdGVcIiwgXCJjbG91ZHlcIiwgXCJiYWxsaXhcIl0sXG4gICAgICBcInBhcnRseS1jbG91ZHktZGF5XCI6IFtcImNsb3VkeVwiLCBcIm5vdCB0b28gYmFkXCJdLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCI6IFtcInN0YXJyeVwiLCBcInByZXR0eVwiLCBcImxvdmVseVwiXSxcbiAgICB9O1xuXG4gICAgbGV0IHdvcmQgPSB3b3Jkc1tpY29uXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqd29yZHNbaWNvbl0ubGVuZ3RoKV07XG4gICAgbGV0IHByZWZpeGVkX3dvcmQ7XG5cbiAgICBpZiAoWydhJywgJ2UnLCAnaScsICdvJywgJ3UnXS5pbmRleE9mKHdvcmQuY2hhckF0KDApKSAhPT0gLTEgKSB7XG4gICAgICBwcmVmaXhlZF93b3JkID0gXCJhbiBcIiArIHdvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeGVkX3dvcmQgPSBcImEgXCIgKyB3b3JkO1xuICAgIH1cblxuICAgIHJldHVybiBwcmVmaXhlZF93b3JkO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDE+SXMgSXQgU2hvcnRzIFdlYXRoZXIgVG9kYXk/PC9oMT5cblxuICAgICAgICA8UXVlcnkgb25DbGljaz17dGhpcy5maW5kT3V0Q2xpY2t9IC8+XG5cbiAgICAgICAgPFJlc3VsdC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5Il0sInNvdXJjZVJvb3QiOiIifQ==