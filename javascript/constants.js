/**
 * Bevat de constanten, zoals API calls naar REST service
 * Gebruikt IIFE-pattern
 */

(function() {
    angular.module('beheerApp').constant('GLOBALS', {
        leverancierUrl: 'http://metingrest.azurewebsites.net/api/leveranciers',
        gebruikerUrl: 'data/gebruikers.json',
        logUrl: 'data/log.json',
        tariefUrl: 'data/tarieven.json',
        userUrl: 'data/user.json',
        aanvraagUrl: 'data/aanvragen.json'
    })
})();
