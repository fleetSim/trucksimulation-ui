var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
    idAttribute: '_id',

    start: function() {
        return $.post(this.url() + "/start").done(_.bind(() => {
            this.set("isRunning", true);
        }, this));
    },
    
    stop: function() {
        return $.post(this.url() + "/stop").done(_.bind(() => {
            this.set("isRunning", false);
        }, this));
    }
});