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
    updateModel(boxMessage) {
        if(boxMessage.truckId === this.model.id) {
            console.log(boxMessage.position.geometry.coordinates);
            this.model.set({
                lon: boxMessage.position.geometry.coordinates[0],
                lat: boxMessage.position.geometry.coordinates[1],
                speed: boxMessage.speed,
                ts: boxMessage.ts,
                horizontalAccuracy: boxMessage.horizontalAccuracy
            });
        }
    }
});