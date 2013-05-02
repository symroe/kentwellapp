/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, document, define, Backbone */
require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery',
                'modernizr'
            ],
            exports: 'Backbone'
        },
        'backbone-tastypie': {
            deps: [
                'underscore',
                'jquery',
                'backbone',
            ]
        }
    },
    paths: {
        'bootstrap': "lib/bootstrap.min",
        'backbone': "lib/backbone-min",
        'backbone-tastypie': "lib/backbone-tastypie",
        'backbone-analytics': "lib/backbone.analytics",
        'marionette': 'lib/backbone.marionette.min',
        'syphon': 'lib/backbone.syphon.min',
        'text': 'lib/text',
        'underscore': 'lib/underscore-min',
        'modernizr': 'lib/modernizr',
        'templates': '../templates/'
        
    }
});


require([
    'app',], 
    function(App) {
        App.start();
    });
