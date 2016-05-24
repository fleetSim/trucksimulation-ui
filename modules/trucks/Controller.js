var Marionette = require('backbone.marionette');
var rootView = require('main/RootView');
var TruckMapView = require('./views/TruckMapView');
var TruckCollection = require('./TruckCollection');
var TruckModel = require('./TruckModel');
var TruckListView = require('./views/TruckListView');
var TruckDetailView = require('./views/TruckDetailView');

module.exports = {

    truckMap: function(simId) {
        var trucks = new TruckCollection(simId);
        var view = new TruckMapView({collection: trucks, controller: this, simId: simId});
        rootView.showChildView('body', view);

        var truckListView = this._getTruckListView(simId);
        rootView.showChildView('sidebar', truckListView);
    },

    truckList: function(simId) {
        var view = this._getTruckListView(simId);
        rootView.showChildView('body', view);
    },

    showTruckInSidebar: function(simId, truckId) {
        var model = new TruckModel({_id: truckId});
        var collection = new TruckCollection(simId);
        collection.add(model);
        var truckView = new TruckDetailView({model: model});
        model.fetch();
        rootView.showChildView('sidebar', truckView);
    },


    _getTruckListView(simId) {
        var trucks = new TruckCollection(simId);
        trucks.fetch();
        return new TruckListView({collection: trucks});
    }

};