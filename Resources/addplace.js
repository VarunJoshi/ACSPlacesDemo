var Cloud = require('ti.cloud');
Cloud.debug = true;

var uiCreate = (function() {
    var API = { };
    API.name = "Create";
    API.icon = "/KS_nav_ui.png";
    API.parentNav = null;
    API.win = null;

    API.factoryView = function(opts) {

        var content = Ti.UI.createScrollView({
            top : 40,
            contentHeight : 'auto',
            layout : 'vertical'
        });

        var name = Ti.UI.createTextField({
            hintText : 'Name',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(name);

        var address = Ti.UI.createTextField({
            hintText : 'Address',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(address);

        var city = Ti.UI.createTextField({
            hintText : 'City',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(city);

        var state = Ti.UI.createTextField({
            hintText : 'State',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(state);

        var postalCode = Ti.UI.createTextField({
            hintText : 'Postal Code',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
        });
        content.add(postalCode);

        var createPlaceButton = Ti.UI.createButton({
            title : 'Create',
            top : 10,
            left : 10,
            right : 10,
            bottom : 10,
            height : 40
        });
        content.add(createPlaceButton);

        function submitForm() {
            //createPlaceButton.hide();

            Cloud.Places.create({
                name : name.value,
                address : address.value,
                city : city.value,
                state : state.value,
                postal_code : postalCode.value
            }, function(e) {
                if (e.success) {
                    alert('Created ' +e.name);
                    name.value = address.value = city.value = state.value = postalCode.value = '';
                } else {
                    error(e);
                }
               // createPlaceButton.show();
            });
        }


        createPlaceButton.addEventListener('click', submitForm);

        return content;

    };
    return API;
})();

Ti.UI.currentWindow.add(uiCreate.factoryView({}));
