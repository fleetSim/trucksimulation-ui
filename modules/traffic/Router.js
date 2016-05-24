var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        'simulations/:simId/traffic'  : 'trafficList',
    }
});