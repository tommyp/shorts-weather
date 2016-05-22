import Ember from 'ember';

export default Ember.Route.extend({

  geolocation: Ember.inject.service(),

  getWeather: function(lat, long) {
    let controller = this.controller
    Ember.$.getJSON("https://shorts-weather-api.herokuapp.com/forecast.json?lat=" + lat + "&long=" + long, function(data) {
      this.data = data

      controller.set('data', data)
    })
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
