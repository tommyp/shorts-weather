'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _result = require('../components/result');

var _result2 = _interopRequireDefault(_result);

var _query = require('../components/query');

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