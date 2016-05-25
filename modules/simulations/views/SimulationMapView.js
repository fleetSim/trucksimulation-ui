var TruckMapView = require(trucks/views/TruckMapView);

module.exports = TruckMapView.extend({

    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.redraw);
        this.mergeOptions(options, ['controller', 'simId']);
    },

    onShow: function() {
        this.mapView = new MapView();
        this.map.show(this.mapView);
    }


});