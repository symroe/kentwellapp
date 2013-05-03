define([
    // Libraries.
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'
    ], function($, _, Backbone, Marionette) {
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
    
    
    App.areaView = Backbone.Marionette.ItemView.extend({
        template: '#area-template',
        modelEvents: {
            "change": "render"
          },
          serializeData: function() {
              var objects = this.model.get('objects')
              if (objects == undefined) {
                  objects = []
              }
              
              if (objects.length != 0) {
                  var name = objects[0].name
                  var description = objects[0].description
              } else {
                  name = "Unknown"
              } 
              return {
                     "friendlyName" : name,
                     "description" : description,
                 };
          }
        
    });
    
    App.areaModel = Backbone.Model.extend({
        url: function() {
            return 'http://talusdesign.co.uk:8001/api/area/?area__contains={"type":%20"Point",%20"coordinates":%20[' + this.get("lng") + ',' + this.get("lat") + ']}';
        }
    });
    
    App.areaModelInstance = new App.areaModel();
    
    App.ShowView = function() {
        App.regionMain.show(new App.areaView({model:App.areaModelInstance}))
    }
    
    var geolocate = function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = position.coords.latitude + ' ' +  position.coords.longitude;
            // $('#content').append("<li>" + pos + "</li>");
            App.areaModelInstance.set({lat: position.coords.latitude, lng: position.coords.longitude});
            App.areaModelInstance.fetch({dataType: "jsonp"});
            App.ShowView();
        });
    };
    
    App.addInitializer(function(options) {
        geolocate();
        setInterval(geolocate, 1000*10);
    });
    
    window.App = App;
    return App;
})
