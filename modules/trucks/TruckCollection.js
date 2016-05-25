var backbone = require('backbone');
var TruckModel = require('./TruckModel');

module.exports = backbone.Collection.extend({

    initialize: function(simId) {
        this.url = "/api/v1/simulations/" + simId + "/trucks";
        this.simId = simId;
    },

    // modelId: function(attrs) {
    //     return attrs._id;
    // },

    model: TruckModel
});