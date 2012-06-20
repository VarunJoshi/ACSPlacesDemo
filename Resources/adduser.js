var Cloud = require('ti.cloud');
Cloud.debug = true;

var uiCreateUser = (function() {
    var API = { };
    API.name = "Create User";
    API.icon = "/KS_nav_ui.png";
    API.parentNav = null;
    API.win = null;

    API.factoryView = function(opts) {

        var content = Ti.UI.createScrollView({
            top : 40,
            contentHeight : 'auto',
            layout : 'vertical'
        });

        var username = Ti.UI.createTextField({
            hintText : 'Username',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            autocorrect : false
        });
        content.add(username);

        var password = Ti.UI.createTextField({
            hintText : 'Password',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            passwordMask : true
        });
        content.add(password);

        var confirmPassword = Ti.UI.createTextField({
            hintText : 'Confirm Password',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            passwordMask : true
        });
        content.add(confirmPassword);

        var firstName = Ti.UI.createTextField({
            hintText : 'First Name',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(firstName);

        var lastName = Ti.UI.createTextField({
            hintText : 'Last Name',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        content.add(lastName);
        
        var emailAddress = Ti.UI.createTextField({
            hintText : 'Email Address',
            top : 10,
            left : 10,
            right : 10,
            height : 40,
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED  
        });
        content.add(emailAddress);

        var button = Ti.UI.createButton({
            title : 'Create',
            top : 10,
            left : 10,
            right : 10,
            bottom : 10,
            height : 40
        });
        content.add(button);

        function submitForm() {

            if (password.value != confirmPassword.value) {
                alert('Passwords do not match!');
                confirmPassword.focus();
                return;
            }
            //button.hide();

            Cloud.Users.create({
                username : username.value,
                password : password.value,
                password_confirmation : confirmPassword.value,
                first_name : firstName.value,
                last_name : lastName.value,
                email: emailAddress.value
            }, function(e) {
                if (e.success) {
                    var user = e.users[0];
                    alert('Created! You are now logged in as ' + user.first_name +" "+ user.last_name);//user.id);
                    username.value = password.value = confirmPassword.value = firstName.value = lastName.value = emailAddress.value = '';
                } else {
                    error(e);
                }
                //button.show();
            });
        }


        button.addEventListener('click', submitForm);

        return content;

    };

    return API;
})();

Ti.UI.currentWindow.add(uiCreateUser.factoryView({}));
