var marionette = require('backbone.marionette');
var TrafficItemView = require('./TrafficItemView');

module.exports = marionette.CollectionView.extend({
    childView: TrafficItemView
});