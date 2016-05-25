var Marionette = require('backbone.marionette');
var tpl = require('../templates/routeItem.hbs');

module.exports =  Marionette.ItemView.extend({
    template: tpl
});