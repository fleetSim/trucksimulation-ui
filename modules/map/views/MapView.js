var Marionette = require('backbone.marionette');
var tpl = require('../templates/map.hbs');
var $ = require('jquery');
var ol = require("openlayers");
var mapStyles = require('./MapStyles');
require("openlayers/dist/ol.css");
require('../map.less');
var _ = require('underscore');


/**
 * Mapview for displaying features on an OSM map.
 */
module.exports = Marionette.ItemView.extend({
    template: tpl,
    viewOptions: ['zoom', 'center'],
    map: null,
    vectorSource: new ol.source.Vector({features: []}),
    vectorLayer: null,
    /**
     * Default view of the map.
     */
    view: new ol.View({
        center: ol.proj.transform([11.665394, 55.926081], 'EPSG:4326', 'EPSG:3857'),
        zoom: 10
    }),

    triggers: {
    },

    layers: {
        "osm": new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    },

    initialize: function (options) {
        this.mergeOptions(options, this.viewOptions);
        this.vectorLayer = new ol.layer.Vector({
            source: this.vectorSource,
            style: this.styleFunction
        });

    },

    onShow: function () {
        console.log("showing map");
        this.showMap();
        this.addClickHandler();
    },


    /**
     * Creates a new ol.map object and renders it in the #map dom element using
     * the views layer.
     */
    showMap: function () {
        this.map = new ol.Map({
            layers: [
                this.layers.osm,
                this.vectorLayer
            ],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }),
            view: this.view
        });
    },

    addClickHandler: function() {
        this.map.on("click", _.bind(function(e) {
            this.map.forEachFeatureAtPixel(e.pixel, _.bind(function (feature, layer) {
                //do something
                console.log("clicked on " + feature.getId());
                this.triggerMethod('click:feature', feature, layer);
                this.triggerMethod('test', feature, layer);
            }, this));
        }, this));
    },

    center: function(lat, lon) {
        this.map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    },

    /**
     * Adds a feature to the map layer and transforms it from WGS84 to the appropriate map projection.
     * @param featureJson the geometry object
     * @param style feature style
     */
    drawFeature: function (featureJson, style) {
        var f = new ol.format.GeoJSON();
        var feature = f.readFeature(featureJson, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
        if(style !== undefined) {
            feature.setStyle(style);
        }

        if( this.vectorSource.getFeatureById(featureJson.id) !== null) {
            var feat = this.vectorSource.getFeatureById(featureJson.id);
            feat.setGeometry(feature.getGeometry());
        } else {
            this.vectorSource.addFeature(feature);
        }
    },


    /**
     * Looks up style definitions for feature types.
     * @param feature feature name
     * @param resolution
     * @return {*}
     */
    styleFunction: function (feature, resolution) {
        return mapStyles[feature.getGeometry().getType()];
    },

    /**
     * Clears the map and sets the map reference to null to allow it being garbage collected.
     */
    onDestroy: function () {
        this.map.setTarget(null);
        this.map = null;
        this.vectorSource.clear();
        console.log("map view destroyed");
    }


});