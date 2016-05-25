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
    model: new TruckModel(),

    childEvents: {
        'click:feature': "onFeatureClicked"
    },

    modelEvents: {
        'change:routeModel': "routeChanged"
    },

    /**
     *
     * @param options.collection TruckCollection
     * @param options.controller controller of the truck module
     * @param options.simId id of the current simulation
     */
    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.redraw);
        this.mergeOptions(options, ['controller', 'simId']);
    },

    onFeatureClicked: function(view, feature, layer) {
        var truckId = feature.getId();
        var that = this;
        if(this.model.id !== truckId) {
            var truck = this.collection.get(truckId);
            if(truck == null) {
                truck = new TruckModel({"_id": truckId});
                this.collection.add(truck);
            }
            this.model = truck;
            this.controller.showTruckInSidebar(truck);
            if(!truck.has("route")) {
                truck.fetch({success: function(model) {
                    model.fetchRoute().done(function(){
                        that.drawRoute(model.get('routeModel'));
                    });
                }});
            } else if(!truck.has("routeModel")) {
                truck.fetchRoute().done(function(){
                    that.drawRoute(truck.get('routeModel'));
                });
            } else {
                that.drawRoute(truck.get('routeModel'));
            }
        }
    },

    drawRoute: function(route) {
        if(this.mapView !== null) {
            var startIconBuilder = new IconBuilder({icon: "map-marker", color: "black", size: 24});
            var goalIconBuilder = new IconBuilder({icon: "flag-checkered", color: "black", size: 24});
            var startIcon = startIconBuilder.get();
            var goalIcon = goalIconBuilder.get();

            var startCoordinates = [route.get("start").lon, route.get("start").lat];
            var goalCoordinates = [route.get("goal").lon, route.get("goal").lat];
            this.mapView.drawPoint(startCoordinates, "start", [startIcon]);
            this.mapView.drawPoint(goalCoordinates, "goal", [goalIcon]);
            this.mapView.drawGeometryCollection(route.get("segments"), "route");
        }
    },

    routeChanged: function() {
        console.log("routeChanged called.");
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
        var style = [iconStyle, labelStyle];

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