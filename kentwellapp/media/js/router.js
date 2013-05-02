define([
    'backbone', 
    'marionette', 
    'app'], 
    function (Backbone, Marionette, App) {
        return Backbone.Marionette.AppRouter.extend({
            routes: {
                ''                           : 'home',
                'postcode/:postcode/'        : 'postcode',
                'thanks/'                    : 'thanks',
                'share/'                     : 'share',
                'about/'                     : 'about',
                'privacy/'                   : 'privacy'
            },
            home: function() {
                require([
                    'views/postcodeFormView'
                ], function(postcodeFormView){
                    view = new postcodeFormView()
                    App.regionMain.show(view)
                });
            },
            postcode: function(postcode) {
                require([
                    'views/postcodeView',
                    'models/postcodeModel',
                    'models/signupModel'
                ], function(postcodeView, postcodeModel, signupModel){
                    var postcode_model = new postcodeModel({postcode: postcode});
                    var signup_model = new signupModel();
                    var view = new postcodeView({model: postcode_model, signup: signup_model});
                    postcode_model.fetch({
                        success: function(model, response, options) {
                            var location = [model.get('wgs84_lat'), model.get('wgs84_lon')];
                            signup_model.set({location: location});
                            App.regionMain.show(view);
                            App.vent.trigger("infobox:show");
                        },
                        dataType: "jsonp"
                    });
                });
            },
            thanks: function() {
                require([
                    'views/thankyouView',
                ], function(thankyouView){
                    App.vent.trigger('infobox:show')
                    var view = new thankyouView();
                        App.regionMain.show(view)
                    });
            },
            share: function() {
                require([
                    'views/shareView',
                ], function(shareView){
                    App.vent.trigger('infobox:show')
                    var view = new shareView();
                        App.regionMain.show(view)
                    });
            },
            privacy: function() {
                require([
                    'text!templates/privacy.html',
                ], function(privacyText){
                    // App.vent.trigger('infobox:show')
                    var view = Backbone.Marionette.ItemView.extend({
                        template: '#privacyView',
                        onRender: function() {
                            this.$el.html(privacyText)
                        }
                    });
                    App.regionMain.show(new view)
                });
            },
            about: function() {
                App.vent.trigger('infobox:show')
                var view = Backbone.Marionette.ItemView.extend({
                    template: '#aboutView',
                });
                App.regionMain.show(new view)
            }
            
        })
});
