var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

/**
 * The RootView manages the complete page body and all its regions.
 * Instead of using the Application as the root of the view tree, this Layout View is used.
 *
 * Modules can  render their views in the appropriate regions with
 * require('<path to RootView>').showChildView('<region>', view)
 */
var RootView = Marionette.LayoutView.extend({
    el: "body",
    template: false,

    regions: {
        body: '[data-region=body]'
    }

});

var rootView = new RootView();
module.exports = rootView;