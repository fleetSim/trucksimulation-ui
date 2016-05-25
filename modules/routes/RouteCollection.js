var backbone = require('backbone');
var RouteModel = require('./RouteModel');

module.exports = backbone.Collection.extend({

    initialize: function(simId) {
        this.url = "/api/v1/simulations/" + simId + "/routes";
    },

    model: RouteModel
});