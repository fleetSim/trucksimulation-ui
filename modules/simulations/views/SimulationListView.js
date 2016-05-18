var Marionette = require('backbone.marionette');
var tpl = require('../templates/simulationItem.hbs');
var Radio = require('backbone.radio');
var backbone = require('backbone');

var MyChildView = Marionette.ItemView.extend({template: tpl});

module.exports = Marionette.CollectionView.extend({
    childView: MyChildView
});