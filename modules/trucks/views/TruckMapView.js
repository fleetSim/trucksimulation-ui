var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckMap.hbs');
var MapView = require('map/views/MapView');
var Radio = require('backbone.radio');
var ol = require('openlayers');
var IconBuilder = require('map/icons/IconBuilder');


module.exports = Marionette.LayoutView.extend({

    truckChannel: Radio.channel("trucks"),
    template: tpl,
    regions: {
        map: '[data-region=map]'
    },
    mapVIew: null,

    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.redraw);
    },

    redraw: function(truck) {

        var iconBuilder = new IconBuilder({icon: "truck", color: "black", size: 24});
        var style = iconBuilder.get();

        if(this.mapView !== null) {
            this.mapView.drawFeature(truck, style);
        }
    },

    onShow: function() {
        this.mapView = new MapView();
        this.map.show(this.mapView);
    }

});