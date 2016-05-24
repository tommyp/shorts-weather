import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ["lat", "long"],

  weather: null,

  hasLocation: false,

  hasForecast: false,

  trigger: 13,

});
