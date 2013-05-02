define([
    // Libraries.
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'
    ], function($, _, Backbone, Marionette, mapView, signupCollection) {
    'use strict';
    
    var App = new Marionette.Application();
    
    App.addRegions({
        regionMain: '#content',
    });
    
    // Set up basic paths.
    App.root = '/';
    
    App.addInitializer(function(options) {
        Backbone.history.start({
            root: App.root,
            pushState: true
        });
    })
    
    var geolocate = function() {
        
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = position.coords.latitude + ' ' +  position.coords.longitude;
            $('#content').append("<li>" + pos + "</li>");
        });
    };
    
    App.addInitializer(function(options) {
        geolocate();
        setInterval(geolocate, 1000*10);
    });
    
    
    window.App = App;
    return App;
})
