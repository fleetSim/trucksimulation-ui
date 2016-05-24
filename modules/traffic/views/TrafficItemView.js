var marionette = require('backbone.marionette');
var tpl = require('../templates/trafficItem.hbs');

module.exports = marionette.ItemView.extend({
    template: tpl
});