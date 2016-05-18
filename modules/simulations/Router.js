var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        'simulations/:id' : 'simulationDetail',
        'simulations'  : 'simulationList'
    }
});