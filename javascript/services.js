/**
 * Services
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    'use strict';
    angular.module('beheerApp')
        .service('leverancierService', leverancierService)
        .service('gebruikerService', gebruikerService)
        .service('logService', logService)
        .service('tariefService', tariefService);

    leverancierService.$inject = ['$http','GLOBALS'];

    function leverancierService($http,GLOBALS) {
        var service = {};
        service.temp = {};
        service.getLeveranciers = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.leverancierUrl
            })
        };

        service.getLeverancierById = function(id) {
            // TODO voor REST, tijdelijke implementatie met lokale JSON

        };
        
        service.saveLeverancier = function(lev) {
            service.temp = null;
            // TODO voor REST
        };
        
        service.tempSave = function(tempLev) {
            service.temp = tempLev;
            var d = new Date();
            service.temp.createdOn = d.getTime();
            d = null;
        };
        
        service.getTemp = function() {
            var d = new Date();
            var checker = d.getTime();
            if(checker - (5 * 60 * 1000) > service.temp.createdOn) {
                service.temp = null;
                return service.temp;
            }
            else {
                return service.temp;
            }
        };

        service.saveTarief = function(tarief) {
            // TODO
        }

        return service;
    }

    gebruikerService.$inject = ['$http', 'GLOBALS'];

    function gebruikerService($http, GLOBALS) {
        var service = {};
        service.getGebruikers = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.gebruikerUrl
            })
        };

        service.getGebruikerById = function(id) {
            // TODO voor REST
        };
        return service;
    }

    logService.$inject = ['$http', 'GLOBALS'];

    function logService($http, GLOBALS) {
        var service = {};

        service.getAllLogs = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.logUrl
            })
        };

        service.getLogById = function(id) {
            // TODO voor REST
        };

        return service;
    }
    
    tariefService.$inject = ['$http', 'GLOBALS'];
    
    function tariefService($http, GLOBALS) {
        var service = {};
        
        service.getTarieven = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.tariefUrl
            })
        };

        service.getTariefById = function(id) {
            // TODO voor REST
        };

        return service;
    }
    
})();