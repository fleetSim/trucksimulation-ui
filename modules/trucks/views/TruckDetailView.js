var Marionette = require('backbone.marionette');
var tpl = require('../templates/truckInfo.hbs');
var Radio = require('backbone.radio');


module.exports =  Marionette.ItemView.extend({
    template: tpl,
    truckChannel: Radio.channel("trucks"),
    modelEvents: {
        "change":"render",
        "sync":"render"
    },
    initialize: function (options) {
        this.listenTo(this.truckChannel, "trucks", this.updateModel);
    },
    updateModel(boxMessage) {
        if(boxMessage.truckId === this.model.id) {
            this.model.set({
                lon: boxMessage.position.geometry.coordinates[0],
                lat: boxMessage.position.geometry.coordinates[1],
                speed: boxMessage.speed,
                ts: boxMessage.ts,
                bearing: boxMessage.bearing,
                horizontalAccuracy: boxMessage.horizontalAccuracy
            });
        }
    }
});