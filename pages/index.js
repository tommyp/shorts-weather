import React from 'react';
import Result from '../components/result';
import Query from '../components/query';

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
    }
  }

  componentDidMount() {

  }

  trigger: 16;

  possibleConditions: [
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

  goodConditions: [
    "partly-cloudy-day", // YES
    "clear-day", // YES
  ]

  findOutClick(e) {
    e.preventDefault();
    window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
  }

  setPosition(position) {
    console.log(position)
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    })
    this.getWeather();
  }

  getWeather() {
    console.log('fetching')

    let url = "https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + this.state.lat + "&long=" + this.state.long;

    fetch(url)
      .then(response => response.json())
      .then(data => this.setWeather(data))
      // if (response.ok) {
      //   response.json().then((response) =>
      //     this.setWeather(response).bind
      //   )
      // }
    // }).bind(this);
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

    let temp = data.currently.apparentTemperature;

    let warmer_hours = data.hourly.data.filter((hour) => {
      return hour.apparentTemperature >= this.trigger && this.goodConditions.indexOf(hour.icon) !== -1;
    });

    let sorted_warmer_hours = warmer_hours.sort(function(a, b) {
      return parseFloat(a.apparentTemperature) - parseFloat(b.apparentTemperature);
    });

    if (sorted_warmer_hours.length >= 1) {
      high = sorted_warmer_hours.pop();
    }

    if (temp >= this.trigger && this.goodConditions.indexOf(data.currently.icon) !== -1)  {
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
      result: result,
      hasForecast: true,
    });
  }

  forecastIconToWord(icon) {
    let words = {
      "clear-day": ["banging", "sunny", "roasting", "swealtering", "schwealterin'", "dynamite", "unreal", "amazing", "lovely", "hot", "warm", "great"],
      "clear-night": ["starry", "unreal", "lovely"],
      "rain": ["wet", "soggy", "damp", "moist", "cold", "coul", "baltic", "freezing", "chilly"],
      "snow": ["snowy", "artic", "baltic", "freezing", "freezin'", "chilly"],
      "sleet": ["wet",  "wet and snowy", "freezin'", "freezing", "damp", "moist", "cold", "coul", "baltic", "chilly"],
      "wind": ["windy", "chilly", "cold", "coul", "baltic", "blustery"],
      "fog": ["foggy"],
      "cloudy": ["grey", "shite", "cloudy", "ballix"],
      "partly-cloudy-day": ["cloudy", "not too bad"],
      "partly-cloudy-night": ["starry", "pretty", "lovely"],
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
        <h1>Is It Shorts Weather Today?</h1>

        <Query onClick={this.findOutClick} />

        <Result/>
      </div>
    )
  }
}
