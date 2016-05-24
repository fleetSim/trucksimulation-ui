var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.Model.extend({
    idAttribute: '_id',

    start: function() {
        console.log(this.url() + "/start");
        return $.post(this.url() + "/start");
    },

    stop: function() {
        return $.post(this.url() + "/stop");
    }
});