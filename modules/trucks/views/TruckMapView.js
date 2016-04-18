var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckMap.hbs');
var MapView = require('map/views/MapView');
var Radio = require('backbone.radio');
var ol = require('openlayers');


module.exports = Marionette.LayoutView.extend({

    regions: {
        map: '[data-region=map]'
    },

    template: tpl,

    initialize: function (options) {
    },

    //truckChannel: Radio.channel("trucks"),

    onShow: function() {
        var mapView = new MapView();
        mapView.addFeature();
        this.map.show(mapView);
    }

});