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

var _style = require('next/node_modules/styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _result = require('../components/result');

var _result2 = _interopRequireDefault(_result);

var _query = require('../components/query');

var _query2 = _interopRequireDefault(_query);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _reactTypekit = require('react-typekit');

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