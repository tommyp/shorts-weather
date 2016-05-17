import Ember from 'ember';

export default Ember.Route.extend({

  geolocation: Ember.inject.service(),

  actions: {
    getUserLocation: function() {
      let that = this;
      this.get('geolocation').getLocation().then(function(geoObject) {
        console.log(geoObject);
        let lat = geoObject.coords.latitude;
        let long = geoObject.coords.longitude;
        that.controller.set('lat', lat);
        that.controller.set('long', long);

      });
    }
  }

});
