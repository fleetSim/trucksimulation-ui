var backbone = require('backbone');
var TrafficModel = require('./TrafficModel');

module.exports = backbone.Collection.extend({

    initialize: function(simId) {
        this.url = "/api/v1/simulations/" + simId + "/traffic";
    },

    model: TrafficModel
});