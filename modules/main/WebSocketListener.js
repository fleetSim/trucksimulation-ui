/**
 * Listener for the vert.x eventbus that turns websocket messages into events. The listener is an abstraction layer
 * over the websocket client.
 * Events are sent via backbone.radio so that other modules can easily bind to radio events without the need to access
 * the websocket directly.
 */
var EventBus = require('vertx3-eventbus-client');
var _ = require('underscore');
var Radio = require('backbone.radio');

module.exports = {
    eb: new EventBus("/eventbus"),
    trucksChannel: Radio.channel("trucks"),
    start: function () {
        console.log("connecting to socket.");
        this.eb.onopen = _.bind(this.registerHandlers, this);
        this.eb.onclose = _.bind(this.reconnect, this);
    },

    registerHandlers: function () {
        this.eb.registerHandler("trucks", _.bind(function (err, res) {
            this.trucksChannel.trigger("trucks", res.body);
        }, this));
    },

    reconnect: function() {
        eb.open();
    }
};

