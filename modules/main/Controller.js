var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

module.exports = {

    home: function() {
        //redirect to the home view
        Backbone.history.navigate('home', { trigger: true, replace: true});
    },

    /**
     * Performs a matching of the HTTP method against safe methods.
     * Only unsafe methods require CSRF protection.
     *
     * @param method method type
     * @return {boolean} true if one of GET|HEAD|OPTIONS|TRACE
     */
    isCsrfSafeMethod: function(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    },


    /**
     * Extracts CSRF-token from the cookie that has been set.
     * Requires the cookie to be readable from javascript.
     */
    setupCsrfHeader: function() {
        var token = $.cookie('csrftoken');
        // token should only be included when unsafe requests are sent to the
        // server, token must not be leaked to other hosts
        var isCsrfSafeMethod = _.bind(this.isCsrfSafeMethod, this);
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!isCsrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", token);
                }
            }
        });
    }

};