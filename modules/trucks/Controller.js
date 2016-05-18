var Marionette = require('backbone.marionette');
var rootView = require('main/RootView');
var TruckMapView = require('./views/TruckMapView');
var TruckCollection = require('./TruckCollection');
var TruckListView = require('./views/TruckListView');

module.exports = Marionette.Controller.extend({

    truckMap: function(simId) {
        var trucks = new TruckCollection(simId);
        var view = new TruckMapView({collection: trucks});
        rootView.showChildView('body', view);
    },

    truckList: function(simId) {
        var trucks = new TruckCollection(simId);
        var view = new TruckListView({collection: trucks});
        trucks.fetch();
        rootView.showChildView('body', view);
    }

});