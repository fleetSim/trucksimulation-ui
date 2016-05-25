var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        'simulations/:simId/routes'  : 'routeList'
    }
});