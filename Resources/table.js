var Cloud = require('ti.cloud');
Cloud.debug = true;

var uiPlaces = (function() {

    var API = { };

    API.name = "Places Table";
    API.icon = "/KS_nav_ui.png";
    API.parentNav = null;
    API.win = null;

    API.factoryView = function(opts) {

        topView = Ti.UI.createView({});
        
        /*
         * CHANGING FOR CLOUD SEARCH
         */
        
        var table = Ti.UI.createTableView({
        backgroundColor: '#fff',
        top: 0, bottom: 0
    });
    table.addEventListener('click', function (evt) {
        alert(JSON.stringify(evt.row));
    });
    topView.add(table);

    function findPlaces(lat, lon) {
        Cloud.Places.search({
            latitude: lat,
            longitude: lon
        }, function (e) {
            if (e.success) {
                if (e.places.length == 0) {
                    table.setData([
                        { title: 'No Results!' }
                    ]);
                }
                else {
                    var data = [];
                    for (var i = 0, l = e.places.length; i < l; i++) {
                        data.push(Ti.UI.createTableViewRow({
                            title: e.places[i].name,
                            id: e.places[i].id
                        }));
                    }
                    table.setData(data);
                }
            }
            else {
                error(e);
            }
        });
    }

    function findMe() {

        table.setData([
            { title: 'Geolocating...' }
        ]);

        if (Ti.Geolocation) {
            Ti.Geolocation.purpose = 'To find nearby places.';
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
            Ti.Geolocation.distanceFilter = 0;
            Ti.Geolocation.getCurrentPosition(function (e) {
                if (!e.success || e.error) {
                    findPlaces(null, null);
                    table.setData([
                        { title: 'GPS lost, looking nearby...' }
                    ]);
                }
                else {
                    table.setData([
                        { title: 'Located, looking nearby...' }
                    ]);
                    findPlaces(e.coords.latitude, e.coords.longitude);
                }
            });
        }
        else {
            Cloud.Clients.geolocate(function (e) {
                if (e.success) {
                    table.setData([
                        { title: 'Located, looking nearby...' }
                    ]);
                    findPlaces(e.location.latitude, e.location.longitude)
                }
                else {
                    findPlaces(null, null);
                    table.setData([
                        { title: 'GPS lost, looking nearby...' }
                    ]);
                }
            });
        }
    }
        
        findMe();
        /*
         * END OF CLOUD SEARCH
         */
        
        
        
        
        
        

 /*       function getMapLocations() {

            var data = [];

            Cloud.Places.query({
                page : 1,
                per_page : 20,
                where : {
                    lnglat : {
                        '$nearSphere' : [-122.23, 37.12],
                        '$maxDistance' : 20000000.30126
                    }
                }
            }, function(e) {
                if (e.success) {

                    for (var c = 0; c < e.places.length; c++) {

                        var place = e.places[c];
                        var coordinates = " long: " + place.longitude + "lat: " + place.latitude + " ";

                        var placeName = place.name;

                        var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

                        var row = Ti.UI.createTableViewRow({
                            hasChild : true,
                            height : 'fill',
                            backgroundColor : bgcolor
                        });

                        var place_view = Ti.UI.createView({
                            height : 'fill',
                            layout : 'vertical',
                            left : 5,
                            top : 5,
                            bottom : 5,
                            right : 5
                        });

                        var av = Ti.UI.createImageView({
                            image : 'KS_nav_ui.png',
                            left : 0,
                            top : 0,
                            height : 48,
                            width : 48
                        });

                        place_view.add(av);

                        var place_label = Ti.UI.createLabel({
                            text : placeName,
                            left : 54,
                            width : 120,
                            top : -48,
                            bottom : 2,
                            height : 16,
                            textAlign : 'left',
                            color : '#444444',
                            font : {
                                fontFamily : 'Trebuchet MS',
                                fontSize : 14,
                                fontWeight : 'bold'
                            }
                        });

                        place_view.add(place_label);

                        var showCoordinates = Ti.UI.createLabel({
                            text : coordinates,
                            left : 54,
                            top : 0,
                            bottom : 2,
                            height : 'fill',
                            width : 236,
                            textAlign : 'left',
                            font : {
                                fontSize : 14
                            }
                        });
                        place_view.add(showCoordinates);

                        row.add(place_view);
                        row.className = 'item' + c;
                        data[c] = row;

                    }

                    var tableview = Titanium.UI.createTableView({
                        data : data,
                        minRowHeight : 58
                    });
                    topView.add(tableview);
                }
            });
        }

        getMapLocations();
*/
        return topView;
    };

    return API;
})();
Ti.UI.currentWindow.add(uiPlaces.factoryView({}));

