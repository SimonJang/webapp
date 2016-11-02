/**
 * Bevat de constanten, zoals API calls naar REST service
 * Gebruikt IIFE-pattern
 */

(function() {
    angular.module('beheerApp').constant('GLOBALS', {
        leverancierUrl: 'data/leveranciers.json',
        gebruikerUrl: 'data/gebruikers.json',
        logUrl: 'data/log.json',
        tariefUrl: 'data/tarieven.json'
    })
})();
