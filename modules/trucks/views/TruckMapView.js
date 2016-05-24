var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckMap.hbs');
var MapView = require('map/views/MapView');
var Radio = require('backbone.radio');
var backbone = require('backbone');
var ol = require('openlayers');
var IconBuilder = require('map/icons/IconBuilder');
var TruckDetailView = require('./TruckDetailView');
var TruckModel = require('../TruckModel');


module.exports = Marionette.LayoutView.extend({
    truckChannel: Radio.channel("trucks"),
    template: tpl,
    regions: {
        map: '[data-region=map]',
        truckInfo: '[data-region=truckInfo]'
    },
    mapView: null,

    childEvents: {
        'click:feature': "onFeatureClicked"
    },

    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.redraw);
        this.mergeOptions(options, ['controller', 'simId']);
    },

    onFeatureClicked: function(view, feature, layer) {
        this.controller.showTruckInSidebar(this.simId, feature.getId());
    },

    redraw: function(truck) {
        var rotationRadians = (truck.bearing + 90) * (Math.PI/180);
        var iconBuilder = new IconBuilder({icon: "truck", color: "black", size: 24, rotation: rotationRadians});
        var iconStyle = iconBuilder.get();
        var labelStyle = new ol.style.Style({
            text: new ol.style.Text({
                text: "Truck #" + truck.truckId,
                offsetY: -24,
                fill: new ol.style.Fill({
                    color: "black"
                })
            })
        });
        style = [iconStyle, labelStyle];

        if(this.mapView !== null) {
            truck.position.id = truck.truckId;
            this.mapView.drawFeature(truck.position, style);
        }
    },

    onShow: function() {
        this.mapView = new MapView();
        this.map.show(this.mapView);
    }

});