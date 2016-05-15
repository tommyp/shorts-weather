import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ["lat", "long"],

  didRender() {
    debugger
    this._super();
    console.log(this.route);
  }
});
