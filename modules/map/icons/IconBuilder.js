var ol = require('openlayers');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var fontAwesome = require("font-awesome-webpack"); // requires entry in webpack.config, see https://www.npmjs.com/package/font-awesome-webpack
var faIconMap = require('./faIconMap');

module.exports = Marionette.Object.extend({

    builderOptions: ['color', 'icon', 'size', 'rotation'],
    size: 32,
    rotation: 0,

    /**
     *
     * @param options options for the marker
     * @param options.color colorstring that is known byopenlayers (e.g. "black", "red", "green",...)
     * @param options.icon font awesome icon name (without fa-prefix), see https://fortawesome.github.io/Font-Awesome/cheatsheet/ for a complete list
     * @param options.size size in pixels (defaults to 32)
     */
    initialize: function (options) {
        this.mergeOptions(options, this.builderOptions);
    },


    /**
     * Creates a new style object using the objects atributes for styling.
     * @return {ol.style.Style} a new stye object which can be assigned to a feature
     */
    get: function () {
        var textStyle = _.assign({
            text: faIconMap["map-marker"],
            font: 'normal ' + this.size +'px FontAwesome',
            textBaseline: 'Bottom',
            rotation: this.rotation,
            fill: new ol.style.Fill({
                color: this.color
            })
        }, faIconMap[this.icon]);
        return new ol.style.Style({
            text: new ol.style.Text(textStyle)
        });
    }
});