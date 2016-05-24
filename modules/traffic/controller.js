var rootView = require('main/RootView');
var TrafficCollection = require('./TrafficCollection');
var TrafficListView = require('./views/TrafficListView');


module.exports = {

    trafficList: function(simId) {
        var traffic = new TrafficCollection(simId);
        traffic.fetch();
        var view = new TrafficListView({collection: traffic});
        rootView.showChildView('body', view);
    }
};