var Marionette = require('backbone.marionette');
var rootView = require('main/RootView');
var TruckMapView = require('./views/TruckMapView');
var TruckCollection = require('./TruckCollection');
var TruckModel = require('./TruckModel');
var TruckListView = require('./views/TruckListView');
var TruckDetailView = require('./views/TruckDetailView');
var TrafficCollection = require('traffic/TrafficCollection');

module.exports = {

    truckMap: function(simId) {
        var trucks = new TruckCollection(simId);
        var traffic = new TrafficCollection(simId);
        trucks.fetch();

        var view = new TruckMapView({collection: trucks, controller: this, simId: simId, traffic: traffic});
        rootView.showChildView('body', view);

        var truckListView = new TruckListView({collection: trucks});
        rootView.showChildView('sidebar', truckListView);
        traffic.fetch();
    },

    truckList: function(simId) {
        var view = this._getTruckListView(simId);
        rootView.showChildView('body', view);
    },

    /**
     *
     * @param truck truck model
     */
    showTruckInSidebar: function(truck) {
        var truckView = new TruckDetailView({model: truck});
        rootView.showChildView('sidebar', truckView);
    },


    _getTruckListView(simId, collection) {
        var trucks = new TruckCollection(simId);
        trucks.fetch();
        return new TruckListView({collection: trucks});
    }

};
