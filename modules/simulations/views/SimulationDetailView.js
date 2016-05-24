var Marionette = require('backbone.marionette');
var tpl = require('../templates/simulationDetail.hbs');
var TruckCollection = require('trucks/TruckCollection');
var TruckListView = require('trucks/views/TruckListView');
var TrafficCollection = require('traffic/TrafficCollection');
var TrafficListView = require('traffic/views/TrafficListView');

module.exports = Marionette.LayoutView.extend({
    template: tpl,
    ui: {
        startBtn: '#startSim',
        stopBtn: '#stopSim'
    },

    triggers: {
        "click @ui.startBtn": "sim:start",
        "click @ui.stopBtn": "sim:stop"
    },

    regions: {
        "trucks": "[data-region=truckList]",
        "traffic": "[data-region=trafficList]"
    },

    onSimStart: function() {
        this.model.start();
    },

    onSimStop: function() {
        this.model.stop();
    },

    onShow: function() {
        this._showTrucks();
        this._showTraffic();
    },

    _showTrucks: function() {
        var trucks = new TruckCollection(this.model.get('_id'));
        var view = new TruckListView({collection: trucks});
        this.showChildView('trucks', view);
        trucks.fetch();
    },

    _showTraffic: function() {
        var traffic = new TrafficCollection(this.model.get('_id'));
        var view = new TrafficListView({collection: traffic});
        this.showChildView('traffic', view);
        traffic.fetch();
    }
});