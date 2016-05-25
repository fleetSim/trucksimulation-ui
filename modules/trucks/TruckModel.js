var backbone = require('backbone');
var RouteModel = require('routes/RouteModel');
var RouteCollection = require('routes/RouteCollection');

module.exports = backbone.Model.extend({
    idAttribute: '_id',

    fetchRoute: function() {
        console.log(this);
        if(this.has('route')) {
            var col = new RouteCollection(this.collection.simId);
            var model = new RouteModel({'_id': this.get('route')});
            col.add(model);
            this.set("routeModel", model);
            var jqXHR = model.fetch();
            return jqXHR;
        } else {
            throw new ReferenceError("route id required to fetch route.");
        }

    }
});