var Marionette = require('backbone.marionette');
var tpl = require('../templates/simulationList.hbs');
var itemTpl = require('../templates/simulationItem.hbs');
var Radio = require('backbone.radio');
var backbone = require('backbone');

var MyChildView = Marionette.ItemView.extend({template: itemTpl});

module.exports = Marionette.CompositeView.extend({
    template: tpl,
    childViewContainer: '#simulationList',
    childView: MyChildView
});