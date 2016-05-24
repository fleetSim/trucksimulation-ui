var Backbone = require('backbone');
$ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var RootView = require('main/RootView');
var Router = require('main/Router');
var Controller = require('main/Controller');
var WebsocketListener = require('main/WebSocketListener');

require('trucks/module');
require('simulations/module');
require('traffic/module');

var App = Marionette.Application.extend({
    getRoot: function () {
        return this.rootView;
    }
});

var app = new App();
app.rootView = RootView;
app.on('start', function() {
    app.rootView.render();
    WebsocketListener.start(); // publish websocket msgs via Radio
});


//start history as soon as app is initialized
app.on("start", function (options) {
    app.router = new Router({
        controller: Controller
    });
    Backbone.history.start();
    // add navigate method to views for easy access
    Backbone.View.prototype.navigate = function (loc) {
        app.router.navigate(loc, true);
    };
});

app.start();

module.exports = app;