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
    reconnectAttempts: 0,
    timerId: 0,
    start: function () {
        this.eb.onopen = _.bind(this.onOpen, this);
        this.eb.onclose = _.bind(this.onClose, this);
    },

    onOpen: function () {
        console.log("connected to websocket.");
        this.reconnectAttempts = 0;
        clearInterval(this.timerId);

        this.eb.registerHandler("trucks", _.bind(function (err, res) {
            this.trucksChannel.trigger("trucks", res.body);
        }, this));

        this.eb.registerHandler("trucks.real", _.bind(function (err, res) {
            this.trucksChannel.trigger("trucks.real", res.body);
        }, this));
    },

    reconnect: function() {
        this.reconnectAttempts = this.reconnectAttempts + 1;
        if(this.reconnectAttempts < 10) {
            console.log("websocket reconnect attempt " + this.reconnectAttempts + " of 10");
            this.eb = new EventBus("/eventbus");
            this.start();
        } else {
            console.log("could not reconnect after 10 attempts. Giving up.");
            clearInterval(this.timerId);
        }

    },
    
    onClose: function() {
        this.timerId = setTimeout(_.bind(this.reconnect, this), 1000);
        console.log("interval id is " + this.timerId);
    }
};

