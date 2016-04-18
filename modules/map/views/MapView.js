var Marionette = require('backbone.marionette');
var tpl = require('../templates/map.hbs');
var $ = require('jquery');
var ol = require("openlayers");
var mapStyles = require('./MapStyles');
var css = require("openlayers/dist/ol.css");
var mapDIvStyle = require('../map.less');

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
        center: [0, 0],
        zoom: 3
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

    /**
     * Adds a feature to the map layer and transforms it from WGS84 to the appropriate map projection.
     * @param geoJson the geometry object
     * @param geoJson.type type of the geometry (e.g. "LineString")
     * @param geoJson.coordinates an array with coordinates for this geometry
     */
    addFeature: function (geoJson) {
        var feature = this.transform(geoJson);
        this.vectorSource.addFeature(feature);
    },

    /**
     *
     * @param geom
     * @return {ol.Feature}
     */
    transform: function (geom) {
        var wgs84geojson = new ol.format.GeoJSON({defaultDataFormat: 'EPSG:4326'});
        var wgs84feature = wgs84geojson.readFeature({
            'type': 'Feature',
            'geometry': geom
        }, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
        return wgs84feature;
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