import Ember from 'ember';

export default Ember.Route.extend({

  weather: {},

  geolocation: Ember.inject.service(),

  possibleStates: [ "clear-day", "partly-cloudy-day" ],

  getWeather: function(lat, long) {
    let controller = this.controller;
    let that = this;

    Ember.$.getJSON("https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + lat + "&long=" + long, function(data) {
      console.log(data);

      let weather = {
        temperature: data.currently.temperature,
        apparentTemperature: data.currently.apparentTemperature,
        precipProbability: data.currently.precipProbability,
        humidity: data.currently.humidity,
        icon: data.currently.icon,
        statement: that.statement(data)
      };

      that.set('weather', weather);
      controller.set('weather', weather);
    });
  },

  statement: function(data) {
    let lines = [];
    let words = [];
    let temp = data.currently.temperature;
    let apprentTemp = data.currently.apparentTemperature;
    if (temp >= this.controller.get('trigger')) {
      // Warm
      lines.push("Hell yeah", "Of course", "Get the legs out", "Totes", "Flat out", "No Doubt", "It bloody well is");
      words.push("lovely", "great", "warm", "hot", "sweltering", "sunny");
    } else if (temp < this.controller.get('trigger')) {
      // Cold
      lines.push("No way", "Hell no", "Are you not wise?", "Jeans flat out", "Fraid not", "Way on", "Away on");
      words.push("baltic", "freezing", "chilly", "cold", "crappy", "shitty");
    } else {

    }
    let word = words[Math.floor(Math.random() * words.length)];

    let result = {
      answer: lines[Math.floor(Math.random() * lines.length)],
      description: "It's a " + word + " " + Math.round(temp) + " Degrees"
    };

    return result;
  },

  actions: {
    getUserLocation: function() {
      let that = this;
      this.get('geolocation').getLocation().then(function(geoObject) {
        console.log(geoObject);
        let lat = geoObject.coords.latitude;
        let long = geoObject.coords.longitude;
        that.controller.set('lat', lat);
        that.controller.set('long', long);

        that.getWeather(lat, long);
      });
    }
  }

});
