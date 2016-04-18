var Marionette = require('backbone.marionette');
var rootView = require('main/RootView');
var TruckMapView = require('./views/TruckMapView');

module.exports = Marionette.Controller.extend({

    truckMap: function() {
        var view = new TruckMapView();
        rootView.showChildView('body', view);
    }

});