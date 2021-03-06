/// <reference path="jquery-1.8.2.js" />
/// <reference path="jquery-ui-1.8.24.js" />
/// <reference path="jquery.validate.js" />
/// <reference path="jquery.validate.unobtrusive.js" />
/// <reference path="knockout-2.2.0.debug.js" />
/// <reference path="modernizr-2.6.2.js" />

function identityVM(name, password, isAuth) {
    var self = this;
    self.Name = name;
    self.Password = password;
    self.IsAuthenticated = isAuth;
    self.checkIsAuthenticated = function () {
        $.ajax({
            async: false,
            url: "/api/auth",
            type: 'get',
            data: ko.toJSON(this),
            contentType: 'application/json',
            success: function (result) {
                self.update(result);
                return result.IsAuthenticated;
            }
        });
        
    };

    self.update = function(identity) {
        var self = this;
        self.Name = identity.Name;
        self.IsAuthenticated = identity.IsAuthenticated;
    }

    self.login = function () {
        $.ajax({
            url: "/api/auth",
            type: 'post',
            data: ko.toJSON(this),
            contentType: 'application/json',
            success: function (result) {
            }
        });
    };
}

$(document).ready(function () {
    var identity = new identityVM(null, null);
    identity.checkIsAuthenticated();
    ko.applyBindings(identity, document.getElementById('authNode'));
});