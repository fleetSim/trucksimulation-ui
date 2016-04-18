var Backbone = require('backbone');
$ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var RootView = require('main/RootView');
var Router = require('main/Router');
var Controller = require('main/Controller');

var trucksRouter = require('trucks/index');

var App = Marionette.Application.extend({
    getRoot: function () {
        return this.rootView;
    }
});

var app = new App();
app.rootView = RootView;
app.on('start', function() {
    app.rootView.render();
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