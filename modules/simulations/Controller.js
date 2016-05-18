var Marionette = require('backbone.marionette');
var rootView = require('main/RootView');
var SimulationListView = require('./views/SimulationListView');
var SimulationDetailView = require('./views/SimulationDetailView');
var SimulationCollection = require('./SimulationCollection');
var SimulationModel = require('./SimulationModel');

module.exports = Marionette.Controller.extend({

    simulationList: function() {
        var simulations = new SimulationCollection();
        var view = new SimulationListView({collection: simulations});
        simulations.fetch();
        rootView.showChildView('body', view);
    },

    simulationDetail: function(id) {
        var simulations = new SimulationCollection();
        var model = new SimulationModel({_id:id});
        simulations.add(model);
        model.fetch();
        var view = new SimulationDetailView({model: model});
        rootView.showChildView('body', view);
    }

});