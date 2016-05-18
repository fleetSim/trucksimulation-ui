var marionette = require('backbone.marionette');
var TruckItemView = require('./TruckItemView');

module.exports = marionette.CollectionView.extend({
    childView: TruckItemView
});