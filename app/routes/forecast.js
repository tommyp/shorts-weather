import Ember from 'ember';

export default Ember.Route.extend({

  weather: {},

  geolocation: Ember.inject.service(),

  condition: null,

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
  ],

  goodConditions: [
    "partly-cloudy-day", // YES
    "clear-day", // YES
  ],

  getWeather: function(lat, long) {
    let controller = this.controller;
    let route = this;

    Ember.$.getJSON("https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + lat + "&long=" + long, function(data) {
      console.log(data);

      let weather = {
        condition: data.currently.icon,
        temperature: data.currently.temperature,
        apparentTemperature: data.currently.apparentTemperature,
        precipProbability: data.currently.precipProbability,
        humidity: data.currently.humidity,
        result: route.result(data)
      };

      route.set('weather', weather);
      controller.set('weather', weather);
    });
  },

  result: function(data) {
    let lines = [];
    let description;
    let high;
    let warmWords = ["lovely", "great", "warm", "hot", "sweltering", "sunny"];
    let coldWords = ["baltic", "freezing", "chilly", "cold", "crappy", "shitty"];
    let warmWord = warmWords[Math.floor(Math.random() * warmWords.length)];
    let coldWord = coldWords[Math.floor(Math.random() * coldWords.length)];

    let temp = data.currently.apparentTemperature;
    let controller = this.controller;

    let warmer_hours = data.hourly.data.filter((hour) => {
      return hour.apparentTemperature >= controller.get('trigger') && this.goodConditions.indexOf(hour.icon) !== -1;
    });

    warmer_hours = warmer_hours.sort(function(a, b) {
      return parseFloat(a.apparentTemperature) - parseFloat(b.apparentTemperature);
    });

    if (warmer_hours.length >= 1) {
      high = warmer_hours[0].apparentTemperature;
    }

    if (temp >= this.controller.get('trigger') && this.goodConditions.indexOf(data.currently.icon) !== -1)  {
      // Warm
      lines.push("Hell yeah", "Of course", "Get the legs out", "Totes", "Flat out", "No Doubt", "It bloody well is");
      description = "It's a " + this.forecast_icon_to_word(data.currently.icon) + " " + Math.round(temp) + " Degrees";
    } else if (warmer_hours.length >= 1) {
      // Not warm now but a warmer hour later
      lines.push("Give it a chance", "Houl yer horses", "Relax yer kacks", "Don't worry", "Possibly", "Maybe", "I dunno", "Fuck knows if I know", "Not yet");
      description = "It's a " + this.forecast_icon_to_word(data.currently.icon) + " " + temp + " degrees right now, but it'll be a " + this.forecast_icon_to_word(warmer_hours[0].icon) + " " + high + " degrees later";
    } else {
      // Not warm and no warmer hours later
      lines.push("No way", "Hell no", "Are you not wise?", "Jeans flat out", "Fraid not", "Way on", "Away on", "Fuck away off", "Are you having a giraffe?");
      description = "It's a " + this.forecast_icon_to_word(data.currently.icon) + " " + Math.round(temp) + " Degrees";
    }

    let result = {
      answer: lines[Math.floor(Math.random() * lines.length)],
      description: description,
    };

    controller.set('hasForecast', true);

    return result;
  },

  forecast_icon_to_word: function(icon) {
    let words = {
      "clear-day": "sunny",
      "clear-night": "starry",
      "rain": "wet",
      "snow": "snowy",
      "sleet": "wet and snowy",
      "wind": "windy",
      "fog": "foggy",
      "cloudy": "grey",
      "partly-cloudy-day": "cloudy",
      "partly-cloudy-night": "starry"
    };

    return words[icon];
  },

  actions: {
    getUserLocation: function() {
      this.controller.set('isLoading', true);
      let route = this;
      this.get('geolocation').getLocation().then(function(geoObject) {
        console.log(geoObject);
        route.controller.set('hasLocation', true);

        let lat = geoObject.coords.latitude;
        let long = geoObject.coords.longitude;
        route.controller.set('lat', lat);
        route.controller.set('long', long);
        route.controller.set('hasLocation', true);
        route.getWeather(lat, long);
      });
    }
  }

});
