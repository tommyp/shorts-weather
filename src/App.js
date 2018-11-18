import React from 'react';
import Result from './components/result';
import Query from './components/query';
import {Helmet} from "react-helmet";


export default class extends React.Component {

  constructor(props) {
    super(props)

    this.findOutClick = this.findOutClick.bind(this);

    this.state = {
      lat: null,
      long: null,
      errors: {},
      weather: {},
      hasLocation: false,
      hasForecast: false,
      isLoading: false,
    }
  }

  componentDidMount() {

  }

  findOutClick(e) {
    e.preventDefault();
    this.setState({isLoading: true})
    window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
  }

  setPosition(position) {
    console.log(position)
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
      hasLocation: true,
    })
    this.getWeather();
  }

  getWeather() {
    console.log('fetching')

    let url = "https://shorts-backend.herokuapp.com/forecast.json?lat=" + this.state.lat + "&lng=" + this.state.long;

    fetch(url)
      .then(response => response.json())
      .then(data => this.setWeather(data))
  }

  setWeather(data) {
    this.setState(
      {
        weather: data.currently
      }
    );

    this.setResult(data);
  }

  setResult(data) {
    let lines = [];
    let description;
    let high;

    let trigger = 16;

    let possibleConditions = [
      "clear-day", // YES
      "clear-night",
      "rain", // NO
      "snow", // NO
      "sleet", // NO
      "wind", // NO
      "fog", // NO
      "cloudy", // NO
      "partly-cloudy-day", // YES
      "partly-cloudy-night", // NO
    ]

    let goodConditions = [
      "partly-cloudy-day", // YES
      "clear-day", // YES
    ]

    let temp = data.currently.apparentTemperature;

    let warmer_hours = data.hourly.data.filter((hour) => {
      return hour.apparentTemperature >= trigger && goodConditions.indexOf(hour.icon) !== -1;
    });

    let sorted_warmer_hours = warmer_hours.sort(function(a, b) {
      return parseFloat(a.apparentTemperature) - parseFloat(b.apparentTemperature);
    });

    if (sorted_warmer_hours.length >= 1) {
      high = sorted_warmer_hours.pop();
    }

    if (temp >= trigger && goodConditions.indexOf(data.currently.icon) !== -1)  {
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

    let result = {
      answer: lines[Math.floor(Math.random() * lines.length)],
      description: description,
    };

    console.log(result)

    this.setState({
      isLoading: false,
      result: result,
      hasForecast: true,
    });
  }

  forecastIconToWord(icon) {
    let words = {
      "clear-day": ["nice", "sunny", "roasting", "swealtering", "schwealterin'", "dynamite", "unreal", "amazing", "lovely", "hot", "warm", "great"],
      "clear-night": ["starry", "unreal", "lovely"],
      "rain": ["wet", "soggy", "damp", "moist", "cold", "coul", "baltic", "freezing", "chilly"],
      "snow": ["snowy", "artic", "baltic", "freezing", "freezin'", "chilly"],
      "sleet": ["wet",  "wet and snowy", "freezin'", "freezing", "damp", "moist", "cold", "coul", "baltic", "chilly"],
      "wind": ["windy", "chilly", "cold", "coul", "baltic", "blustery"],
      "fog": ["foggy"],
      "cloudy": ["grey", "shite", "cloudy", "ballix"],
      "partly-cloudy-day": ["cloudy", "not too bad"],
      "partly-cloudy-night": ["starry"],
    };

    let word = words[icon][Math.floor(Math.random()*words[icon].length)];
    let prefixed_word;

    if (['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(0)) !== -1 ) {
      prefixed_word = "an " + word;
    } else {
      prefixed_word = "a " + word;
    }

    return prefixed_word;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Is it Shorts Weather today?</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://use.typekit.net/ioh1wfg.css" />
        </Helmet>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          h1, h2 {
            font-weight: normal;
            margin: 0;
          }

          body {
            border-top: 5px solid #fff;
            width: 100%;
            margin: 0 auto;
            background: #c02425;
            /* Old browsers */
            background: -moz-linear-gradient(top, #c02425 0%, #f0cb35 100%);
            background: -webkit-linear-gradient(top, #c02425 0%, #f0cb35 100%);
            background: linear-gradient(to bottom, #c02425 0%, #f0cb35 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c02425', endColorstr='#f0cb35',GradientType=0 );
            height: 100%;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
          body .container {
            text-align: center;
          }

          html {
            height: 100%;
          }

          h1 {
            font-family: "futura-pt-condensed",sans-serif;
            font-style: italic;
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            color: #fff;
            font-size: 120px;
            text-align: center;
            font-weight: bold;
          }

          h2 {
            font-family: "futura-pt-condensed",sans-serif;
            font-style: italic;
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            color: #fff;
            font-size: 80px;
            max-width: 80%;
            margin: 0 auto;
          }

          #description {
            font-size: 60px;
            margin-bottom: 20px;
          }

          button {
            -webkit-appearance: none;
            border: none;
            background: none;
            font-family: "futura-pt-condensed",sans-serif;
            font-style: italic;
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            color: #fff;
            margin: 20px auto 0;
            border: 5px solid #fff;
            font-size: 30px;
            display: block;
            cursor: pointer;
          }

          #tweet {
            display: none;
          }

          footer {
            font-family: "futura-pt-condensed",sans-serif;
            font-style: italic;
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            margin: 25px auto 0;
            font-size: 24px;
            text-transform: uppercase;
          }

          footer a {
            color: #fff;
            text-decoration: none;
            border-bottom: 1px solid #fff;
          }

          @media screen and (max-width: 700px) {
            h1 {
              font-size: 60px;
              margin-bottom: 20px;
            }

            #answer {
              font-size: 40px;
              margin-bottom: 20px;
            }

            #description {
              font-size: 50px;
            }
          }

        `}</style>

        <h1>Is It Shorts Weather Today?</h1>

        { !this.state.result && !this.state.isLoading &&
          <Query onClick={this.findOutClick} />
        }

        {
          this.state.isLoading &&
          <h2>Loading...</h2>
        }

        {
          this.state.hasForecast && this.state.result &&
          <Result result={this.state.result}/>
        }

        <footer>
          <a href='http://tommyp.org'>Made by Tommy</a>
        </footer>

      </div>
    )
  }
}
