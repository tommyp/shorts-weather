import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ["lat", "long"],

  data: null,

  trigger: 13,

  forecast: function(data) {
    let weather = {
      temperature: data.currently.temperature,
      apparentTemperature: data.currently.apparentTemperature,
      humidity: data.currently.humidity
    }

    return weather
  }

});
