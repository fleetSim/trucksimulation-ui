var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckMap.hbs');
var MapView = require('map/views/MapView');
var Radio = require('backbone.radio');
var backbone = require('backbone');
var ol = require('openlayers');
var IconBuilder = require('map/icons/IconBuilder');
var TruckDetailView = require('./TruckDetailView');


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
    },

    onFeatureClicked: function(view, feature, layer) {
        var model = new backbone.Model({id: feature.getId()});
        var truckView = new TruckDetailView({model: model});
        this.truckInfo.show(truckView);
    },

    redraw: function(truck) {

        var iconBuilder = new IconBuilder({icon: "truck", color: "black", size: 24});
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
            console.log("redraw truck.");
            console.log(truck.position);
            truck.position.id = truck.truckId;
            this.mapView.drawFeature(truck.position, style);
        }
    },

    onShow: function() {
        this.mapView = new MapView();
        this.map.show(this.mapView);
    }

});