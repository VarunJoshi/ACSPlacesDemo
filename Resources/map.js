var Cloud = require('ti.cloud');
Cloud.debug = true;

var uiMap = (function() {
    var API = { };

    API.factoryView = function(opts) {

        var topView = Ti.UI.createView({});

        var isAndroid = false;
        if (Titanium.Platform.name == 'android') {
            isAndroid = true;
        }

        function getMapLocations() {

            var data = [];

            Cloud.Places.query({
                page : 1,
                per_page : 20,
                where : {
                    lnglat : {
                        '$nearSphere' : [-122.23, 37.12],
                        '$maxDistance' : 0.30126
                    }
                }
            }, function(e) {
                if (e.success) {


                    var annotationsArray = [];
                    
                    for (var c = 0; c < e.places.length; c++) {

                        var place = e.places[c];
                        var coordinates = " long: " + place.longitude + "lat: " + place.latitude + " ";

                        var placeName = place.name;

                        var annotations = {
                            latitude : place.latitude,
                            longitude : place.longitude,
                            title : place.name,
                            animate : true,
                            rightButton : Titanium.UI.iPhone.SystemButton.DISCLOSURE
                        };

                        if (!isAndroid) {
                            annotations.pincolor = Titanium.Map.ANNOTATION_PURPLE;
                        } else {
                            annotations.pinImage = "KS_nav_ui.png";
                        }

                        annotationsArray.push(annotations);

                    }

                    var anotherArray = [];
                    for (var i = 0; i < annotationsArray.length; i++) {
                        anotherArray.push(Titanium.Map.createAnnotation(annotationsArray[i]));
                    }

                    if (Ti.Geolocation) {
                        Ti.Geolocation.purpose = 'To find nearby places.';
                        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
                        Ti.Geolocation.distanceFilter = 0;
                        Ti.Geolocation.getCurrentPosition(function(e) {
                            if (!e.success || e.error) {

                            } else {
                                var mapview = Titanium.Map.createView({
                                    mapType : Titanium.Map.STANDARD_TYPE,
                                    region : {
                                        latitude : e.coords.latitude,
                                        longitude : e.coords.longitude,
                                        latitudeDelta : 0.5,
                                        longitudeDelta : 0.5
                                    },
                                    animate : true,
                                    regionFit : true,
                                    userLocation : true
                                });

                                for (var i = 0; i < anotherArray.length; i++) {
                                    if (!isAndroid) {
                                        mapview.addAnnotation(anotherArray[i]);
                                    }
                                    mapview.selectAnnotation(anotherArray[i]);
                                }
                                
                                topView.add(mapview);
                            }
                        });
                    }

                }
            });
        }

        getMapLocations();

        return topView;
    };

    API.factoryWindow = function(opts) {
        win = Ti.UI.createWindow({
            title : 'uiMap'
        });
        win.add(API.factoryView(options));
        return win;
    };

    return API;
})();

Ti.UI.currentWindow.add(uiMap.factoryView({}));

