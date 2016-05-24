var Marionette = require('backbone.marionette');
var tpl = require('../templates/simulationDetail.hbs');

module.exports = Marionette.LayoutView.extend({
    template: tpl,
    ui: {
        startBtn: '#startSim',
        stopBtn: '#stopSim'
    },

    triggers: {
        "click @ui.startBtn": "sim:start",
        "click @ui.stopBtn": "sim:stop"
    },

    onSimStart: function() {
        console.log("button clicked");
        this.model.start();
    },

    onSimStop: function() {
        this.model.stop();
    }
});