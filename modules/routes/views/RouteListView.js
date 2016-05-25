var Marionette = require('backbone.marionette');
var tpl = require('../templates/routeItem.hbs');

module.exports = Marionette.CollectionView.extend({
    childView: require('./RouteItemView')
});