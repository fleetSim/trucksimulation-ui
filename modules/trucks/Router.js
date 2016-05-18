var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        'simulations/:simId/trucks/map'  : 'truckMap',
        'simulations/:simId/trucks' : 'truckList'
    }
});