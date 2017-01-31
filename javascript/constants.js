/**
 * Bevat de constanten, zoals API calls naar REST service
 */

(function() {
    angular.module('beheerApp').constant('GLOBALS', {
        leverancierUrl: 'http://metingrest.azurewebsites.net/api/leveranciers/',
        gebruikerUrl: 'http://metingrest.azurewebsites.net/api/gebruikers/',
        tariefUrl: 'http://metingrest.azurewebsites.net/api/tariefplannen/',
        userUrl: 'data/user.json',
        aanvraagUrl: 'http://metingrest.azurewebsites.net/api/aanvragen'
    })
})();
