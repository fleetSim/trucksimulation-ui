var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

    url: '/api/v1/simulations',

    modelId: function(attrs) {
        return attrs._id;
    }
});