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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz9mMjM5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU87Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O2tDQUlMOztrQkFBWSxPQUFPO3dDQUFBOztzSUFHakI7O1VBQUssZUFBZSxNQUFLLGFBQWEsS0FFdEM7O1VBQUs7V0FFSDtZQUNBO2NBQ0E7ZUFDQTttQkFDQTttQkFBYTtBQUxiO1dBT0g7Ozs7O3dDQUlBOzs7aUNBc0JZLEdBQ1g7UUFDQTthQUFPLFVBQVUsWUFBWSxtQkFBbUIsS0FBSyxZQUFZLEtBQ2xFOzs7O2dDQUVXLFVBQ1Y7Y0FBUSxJQUNSO1dBQUs7YUFDRSxTQUFTLE9BQ2Q7Y0FBTSxTQUFTLE9BRWpCO0FBSEU7V0FJSDs7OztpQ0FHQztjQUFRLElBQ1I7WUFBTSxnRUFBZ0UsS0FBSyxNQUFNLE1BQU0sV0FBVyxLQUFLLE1BQU0sTUFDMUcsS0FBSyxLQUFLLFdBQVcsS0FDekI7Ozs7K0JBRVUsVUFDVDtVQUFJLE9BQU8sU0FFWDs7QUFFQTs7V0FBSztpQkFFUSxLQUliO0FBSkk7O1dBSUMsVUFDTjs7Ozs4QkFFUyxNQUFNO21CQUNkOztVQUFJLFFBQ0o7VUFBSSxtQkFDSjtVQUFJLFlBRUo7O1VBQUksT0FBTyxLQUFLLFVBRWhCOztVQUFJLG9CQUFvQixPQUFPLEtBQUssT0FBTyxVQUFDLE1BQzFDO2VBQU8sS0FBSyx1QkFBdUIsT0FBSyxXQUFXLE9BQUssZUFBZSxRQUFRLEtBQUssVUFBVSxDQUMvRjtBQUVELE9BSm1COztVQUlmLG1DQUFtQyxLQUFLLFVBQVMsR0FBRyxHQUN0RDtlQUFPLFdBQVcsRUFBRSx1QkFBdUIsV0FBVyxFQUN2RDtBQUVELE9BSjBCOztVQUl0QixvQkFBb0IsVUFBVSxHQUNoQztlQUFPLG9CQUNSO0FBRUQ7O1VBQUksUUFBUSxLQUFLLFdBQVcsS0FBSyxlQUFlLFFBQVEsS0FBSyxVQUFVLFVBQVUsQ0FBQyxHQUNoRjtBQUNBO2NBQU0sS0FBSyxhQUFhLGFBQWEsb0JBQW9CLFNBQVMsWUFBWSxZQUM5RTtzQkFBYyxVQUFVLEtBQUssbUJBQW1CLEtBQUssVUFBVSxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQ3pGO0FBSkQsaUJBSVcsYUFBYSxVQUFVLEdBQ2hDO0FBQ0E7Y0FBTSxLQUFLLHNDQUFzQyxvQkFBb0IsbUJBQW1CLG1CQUFtQixlQUMzRztzQkFBYyxZQUFZLEtBQUssbUJBQW1CLEtBQUssVUFBVSxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQVEsc0NBQXNDLEtBQUssbUJBQW1CLEtBQUssUUFBUSxNQUFNLEtBQUssTUFBTSxLQUFLLHVCQUNwTTtBQUpNLGFBS0w7QUFDQTtjQUFNLEtBQUssVUFBVSxXQUFXLHFCQUFxQixrQkFBa0IsYUFBYSxVQUFVLFdBQVcsaUJBQ3pHO3NCQUFjLFVBQVUsS0FBSyxtQkFBbUIsS0FBSyxVQUFVLFFBQVEsTUFBTSxLQUFLLE1BQU0sUUFDekY7QUFFRDs7VUFBSTtnQkFDTSxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFDekM7cUJBR0Y7QUFKRTs7Y0FJTSxJQUVSOztXQUFLLFNBQ0w7V0FBSyxTQUNOOzs7O3VDQUVrQixNQUNqQjtVQUFJO3FCQUNXLENBQUMsV0FBVyxTQUFTLFlBQVksZUFBZSxpQkFBaUIsWUFBWSxVQUFVLFdBQVcsVUFBVSxPQUFPLFFBQ2hJO3VCQUFlLENBQUMsVUFBVSxVQUMxQjtnQkFBUSxDQUFDLE9BQU8sU0FBUyxRQUFRLFNBQVMsUUFBUSxRQUFRLFVBQVUsWUFDcEU7Z0JBQVEsQ0FBQyxTQUFTLFNBQVMsVUFBVSxZQUFZLFlBQ2pEO2lCQUFTLENBQUMsT0FBUSxpQkFBaUIsWUFBWSxZQUFZLFFBQVEsU0FBUyxRQUFRLFFBQVEsVUFDNUY7Z0JBQVEsQ0FBQyxTQUFTLFVBQVUsUUFBUSxRQUFRLFVBQzVDO2VBQU8sQ0FDUDtrQkFBVSxDQUFDLFFBQVEsU0FBUyxVQUM1Qjs2QkFBcUIsQ0FBQyxVQUN0QjsrQkFBdUIsQ0FBQyxVQUFVLFVBR3BDO0FBWkU7O1VBWUUsT0FBTyxNQUFNLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBUyxNQUFNLE1BQ3REO1VBQUkscUJBRUo7O1VBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssUUFBUSxLQUFLLE9BQU8sUUFBUSxDQUFDLEdBQ3pEO3dCQUFnQixRQUNqQjtBQUZELGFBR0U7d0JBQWdCLE9BQ2pCO0FBRUQ7O2FBQ0Q7Ozs7NkJBR0M7NkJBQ0U7O29CQUFBO3NCQUNFO0FBREY7QUFBQSx5QkFDRTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBRUEsZ0RBQUMsaUNBQU0sU0FBUyxLQUFLO29CQUFyQjtzQkFFQTtBQUZBOzBCQUVDOztvQkFBRDtzQkFHTDtBQUhLO0FBQUE7Ozs7O0VBeEpxQixnQkFBTSIsImZpbGUiOiI1LmU3NDNlMWU0YzA5YWY5ODliZTA5LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlc3VsdCBmcm9tICcuLi9jb21wb25lbnRzL3Jlc3VsdCc7XG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vY29tcG9uZW50cy9xdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5maW5kT3V0Q2xpY2sgPSB0aGlzLmZpbmRPdXRDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxhdDogbnVsbCxcbiAgICAgIGxvbmc6IG51bGwsXG4gICAgICBlcnJvcnM6IHt9LFxuICAgICAgd2VhdGhlcjoge30sXG4gICAgICBoYXNMb2NhdGlvbjogZmFsc2UsXG4gICAgICBoYXNGb3JlY2FzdDogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cbiAgfVxuXG4gIHRyaWdnZXI6IDE2O1xuXG4gIHBvc3NpYmxlQ29uZGl0aW9uczogW1xuICAgIFwiY2xlYXItZGF5XCIsIC8vIFlFU1xuICAgIFwiY2xlYXItbmlnaHRcIixcbiAgICBcInJhaW5cIiwgLy8gTk9cbiAgICBcInNub3dcIiwgLy8gTk9cbiAgICBcInNsZWV0XCIsIC8vIE5PXG4gICAgXCJ3aW5kXCIsIC8vIE5PXG4gICAgXCJmb2dcIiwgLy8gTk9cbiAgICBcImNsb3VkeVwiLCAvLyBOT1xuICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIiwgLy8gWUVTXG4gICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIsIC8vIE5PXG4gIF1cblxuICBnb29kQ29uZGl0aW9uczogW1xuICAgIFwicGFydGx5LWNsb3VkeS1kYXlcIiwgLy8gWUVTXG4gICAgXCJjbGVhci1kYXlcIiwgLy8gWUVTXG4gIF1cblxuICBmaW5kT3V0Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB3aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbih0aGlzLnNldFBvc2l0aW9uLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICBjb25zb2xlLmxvZyhwb3NpdGlvbilcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhdDogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgbG9uZzogcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxuICAgIH0pXG4gICAgdGhpcy5nZXRXZWF0aGVyKCk7XG4gIH1cblxuICBnZXRXZWF0aGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdmZXRjaGluZycpXG4gICAgZmV0Y2goXCJodHRwczovL3Nob3J0cy13ZWF0aGVyLWFwaS5oZXJva3VhcHAuY29tL2ZvcmVjYXN0Lmpzb24/bGF0PVwiICsgdGhpcy5zdGF0ZS5sYXQgKyBcIiZsb25nPVwiICsgdGhpcy5zdGF0ZS5sb25nKVxuICAgICAgLnRoZW4odGhpcy5zZXRXZWF0aGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0V2VhdGhlcihyZXNwb25zZSkge1xuICAgIGxldCBkYXRhID0gcmVzcG9uc2UuYm9keTtcblxuICAgIGRlYnVnZ2VyXG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICB3ZWF0aGVyOiBkYXRhLmN1cnJlbnRseVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnNldFJlc3VsdChkYXRhKTtcbiAgfVxuXG4gIHNldFJlc3VsdChkYXRhKSB7XG4gICAgbGV0IGxpbmVzID0gW107XG4gICAgbGV0IGRlc2NyaXB0aW9uO1xuICAgIGxldCBoaWdoO1xuXG4gICAgbGV0IHRlbXAgPSBkYXRhLmN1cnJlbnRseS5hcHBhcmVudFRlbXBlcmF0dXJlO1xuXG4gICAgbGV0IHdhcm1lcl9ob3VycyA9IGRhdGEuaG91cmx5LmRhdGEuZmlsdGVyKChob3VyKSA9PiB7XG4gICAgICByZXR1cm4gaG91ci5hcHBhcmVudFRlbXBlcmF0dXJlID49IHRoaXMudHJpZ2dlciAmJiB0aGlzLmdvb2RDb25kaXRpb25zLmluZGV4T2YoaG91ci5pY29uKSAhPT0gLTE7XG4gICAgfSk7XG5cbiAgICBsZXQgc29ydGVkX3dhcm1lcl9ob3VycyA9IHdhcm1lcl9ob3Vycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEuYXBwYXJlbnRUZW1wZXJhdHVyZSkgLSBwYXJzZUZsb2F0KGIuYXBwYXJlbnRUZW1wZXJhdHVyZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29ydGVkX3dhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaCA9IHNvcnRlZF93YXJtZXJfaG91cnMucG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKHRlbXAgPj0gdGhpcy50cmlnZ2VyICYmIHRoaXMuZ29vZENvbmRpdGlvbnMuaW5kZXhPZihkYXRhLmN1cnJlbnRseS5pY29uKSAhPT0gLTEpICB7XG4gICAgICAvLyBXYXJtXG4gICAgICBsaW5lcy5wdXNoKFwiSGVsbCB5ZWFoXCIsIFwiT2YgY291cnNlXCIsIFwiR2V0IHRoZSBsZWdzIG91dFwiLCBcIlRvdGVzXCIsIFwiRmxhdCBvdXRcIiwgXCJObyBEb3VidFwiLCBcIkl0IGJsb29keSB3ZWxsIGlzXCIpO1xuICAgICAgZGVzY3JpcHRpb24gPSBcIkl0J3MgXCIgKyB0aGlzLmZvcmVjYXN0SWNvblRvV29yZChkYXRhLmN1cnJlbnRseS5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZCh0ZW1wKSArIFwiIERlZ3JlZXNcIjtcbiAgICB9IGVsc2UgaWYgKHdhcm1lcl9ob3Vycy5sZW5ndGggPj0gMSkge1xuICAgICAgLy8gTm90IHdhcm0gbm93IGJ1dCBhIHdhcm1lciBob3VyIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm90IG5vdywgYnV0IGl0J2xsIGJlIHdhcm1lciBsYXRlclwiLCBcIkdpdmUgaXQgYSBjaGFuY2VcIiwgXCJIb3VsIHllciBob3JzZXNcIiwgXCJSZWxheCB5ZXIga2Fja3NcIiwgXCJEb24ndCB3b3JyeVwiLCBcIk5vdCB5ZXRcIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBhIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoZGF0YS5jdXJyZW50bHkuaWNvbikgKyBcIiBcIiArIE1hdGgucm91bmQodGVtcCkgKyBcIiBkZWdyZWVzIHJpZ2h0IG5vdywgYnV0IGl0J2xsIGJlIFwiICsgdGhpcy5mb3JlY2FzdEljb25Ub1dvcmQoaGlnaC5pY29uKSArIFwiIFwiICsgTWF0aC5yb3VuZChoaWdoLmFwcGFyZW50VGVtcGVyYXR1cmUpICsgXCIgZGVncmVlcyBsYXRlclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3Qgd2FybSBhbmQgbm8gd2FybWVyIGhvdXJzIGxhdGVyXG4gICAgICBsaW5lcy5wdXNoKFwiTm8gd2F5XCIsIFwiSGVsbCBub1wiLCBcIkFyZSB5b3Ugbm90IHdpc2U/XCIsIFwiSmVhbnMgZmxhdCBvdXRcIiwgXCJGcmFpZCBub3RcIiwgXCJXYXkgb25cIiwgXCJBd2F5IG9uXCIsIFwiRnVjayBhd2F5IG9mZlwiLCBcIkFyZSB5b3UgaGF2aW5nIGEgZ2lyYWZmZT9cIik7XG4gICAgICBkZXNjcmlwdGlvbiA9IFwiSXQncyBcIiArIHRoaXMuZm9yZWNhc3RJY29uVG9Xb3JkKGRhdGEuY3VycmVudGx5Lmljb24pICsgXCIgXCIgKyBNYXRoLnJvdW5kKHRlbXApICsgXCIgRGVncmVlc1wiO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7XG4gICAgICBhbnN3ZXI6IGxpbmVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpbmVzLmxlbmd0aCldLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZyhyZXN1bHQpXG5cbiAgICB0aGlzLnNldFN0YXRlKHJlc3VsdDogcmVzdWx0KTtcbiAgICB0aGlzLnNldFN0YXRlKGhhc0ZvcmVjYXN0OiB0cnVlKTtcbiAgfVxuXG4gIGZvcmVjYXN0SWNvblRvV29yZChpY29uKSB7XG4gICAgbGV0IHdvcmRzID0ge1xuICAgICAgXCJjbGVhci1kYXlcIjogW1wiYmFuZ2luZ1wiLCBcInN1bm55XCIsIFwicm9hc3RpbmdcIiwgXCJzd2VhbHRlcmluZ1wiLCBcInNjaHdlYWx0ZXJpbidcIiwgXCJkeW5hbWl0ZVwiLCBcInVucmVhbFwiLCBcImFtYXppbmdcIiwgXCJsb3ZlbHlcIiwgXCJob3RcIiwgXCJ3YXJtXCIsIFwiZ3JlYXRcIl0sXG4gICAgICBcImNsZWFyLW5pZ2h0XCI6IFtcInN0YXJyeVwiLCBcInVucmVhbFwiLCBcImxvdmVseVwiXSxcbiAgICAgIFwicmFpblwiOiBbXCJ3ZXRcIiwgXCJzb2dneVwiLCBcImRhbXBcIiwgXCJtb2lzdFwiLCBcImNvbGRcIiwgXCJjb3VsXCIsIFwiYmFsdGljXCIsIFwiZnJlZXppbmdcIiwgXCJjaGlsbHlcIl0sXG4gICAgICBcInNub3dcIjogW1wic25vd3lcIiwgXCJhcnRpY1wiLCBcImJhbHRpY1wiLCBcImZyZWV6aW5nXCIsIFwiZnJlZXppbidcIiwgXCJjaGlsbHlcIl0sXG4gICAgICBcInNsZWV0XCI6IFtcIndldFwiLCAgXCJ3ZXQgYW5kIHNub3d5XCIsIFwiZnJlZXppbidcIiwgXCJmcmVlemluZ1wiLCBcImRhbXBcIiwgXCJtb2lzdFwiLCBcImNvbGRcIiwgXCJjb3VsXCIsIFwiYmFsdGljXCIsIFwiY2hpbGx5XCJdLFxuICAgICAgXCJ3aW5kXCI6IFtcIndpbmR5XCIsIFwiY2hpbGx5XCIsIFwiY29sZFwiLCBcImNvdWxcIiwgXCJiYWx0aWNcIiwgXCJibHVzdGVyeVwiXSxcbiAgICAgIFwiZm9nXCI6IFtcImZvZ2d5XCJdLFxuICAgICAgXCJjbG91ZHlcIjogW1wiZ3JleVwiLCBcInNoaXRlXCIsIFwiY2xvdWR5XCIsIFwiYmFsbGl4XCJdLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LWRheVwiOiBbXCJjbG91ZHlcIiwgXCJub3QgdG9vIGJhZFwiXSxcbiAgICAgIFwicGFydGx5LWNsb3VkeS1uaWdodFwiOiBbXCJzdGFycnlcIiwgXCJwcmV0dHlcIiwgXCJsb3ZlbHlcIl0sXG4gICAgfTtcblxuICAgIGxldCB3b3JkID0gd29yZHNbaWNvbl1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKndvcmRzW2ljb25dLmxlbmd0aCldO1xuICAgIGxldCBwcmVmaXhlZF93b3JkO1xuXG4gICAgaWYgKFsnYScsICdlJywgJ2knLCAnbycsICd1J10uaW5kZXhPZih3b3JkLmNoYXJBdCgwKSkgIT09IC0xICkge1xuICAgICAgcHJlZml4ZWRfd29yZCA9IFwiYW4gXCIgKyB3b3JkO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXhlZF93b3JkID0gXCJhIFwiICsgd29yZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZml4ZWRfd29yZDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgxPklzIEl0IFNob3J0cyBXZWF0aGVyIFRvZGF5PzwvaDE+XG5cbiAgICAgICAgPFF1ZXJ5IG9uQ2xpY2s9e3RoaXMuZmluZE91dENsaWNrfSAvPlxuXG4gICAgICAgIDxSZXN1bHQvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSJdLCJzb3VyY2VSb290IjoiIn0=