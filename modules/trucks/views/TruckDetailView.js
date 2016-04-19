var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckInfo.hbs');
var Radio = require('backbone.radio');


module.exports =  Marionette.ItemView.extend({
    template: tpl,
    truckChannel: Radio.channel("trucks"),
    modelEvents: {
        "change":"render"
    },
    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.updateModel);
    },
    updateModel(jsonFeature) {
        if(jsonFeature.id === this.model.id) {
            console.log(jsonFeature.geometry.coordinates);
            this.model.set({
                lon: jsonFeature.geometry.coordinates[0],
                lat: jsonFeature.geometry.coordinates[1]
            });
        }
    }
});