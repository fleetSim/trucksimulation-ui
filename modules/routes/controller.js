var rootView = require('main/RootView');
var RouteCollection = require('./RouteCollection');
var RouteListView = require('./views/RouteListView');


module.exports = {

    routeList: function(simId) {
        var traffic = new RouteCollection(simId);
        traffic.fetch();
        var view = new RouteListView({collection: traffic});
        rootView.showChildView('body', view);
    }
};