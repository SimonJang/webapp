/**
 * Services
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    'use strict';
    angular.module('beheerApp')
        .service('loginService', loginService)
        .service('aanvraagService', aanvraagService)
        .service('leverancierService', leverancierService)
        .service('gebruikerService', gebruikerService)
        .service('tariefService', tariefService);

    loginService.$inject = ['$http', 'GLOBALS'];

    function loginService($http, GLOBALS) {
        var service = {};
        service.getPK = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.userUrl
            })
        };
        service.isAuth = function() {
            if(sessionStorage.getItem('login') == "z2TM1T80mY4HzMQf5TLmWkRlxL3yRXaRNTrMQ7ky2rrKtM+Gh48s6PGBE71x042LhGoyzXMx3UiHzdTaAjgVOI3GX6+0EbEv6MAj+VVoJkGQr0JTJyGmByPLhl2vkfFRmklpnHUKzS2Jc7/QMo5Ym3QHVaptryPxsqildy9ieNc=") {
                return true;
            }
            else {
                return false;
            }
        };
        return service;
    }

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
            return $http({
                method: 'GET',
                url: GLOBALS.leverancierUrl + id
            })
        };
        
        service.saveLeverancier = function(lev) {
            service.temp = null;
            $http.post(GLOBALS.leverancierUrl, lev)
        };
        
        service.tempSave = function(tempLev) {
            service.temp = tempLev;
            var d = new Date();
            service.temp.createdOn = d.getTime();
            d = null;
        };

        service.saveTarief = function(tarief) {
            tarief.discriminator = "EnergieTariefplan";
            tarief.groen = tarief.groen ? tarief.groen : false;
            $http.post(GLOBALS.tariefUrl, tarief)
        };

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
            return $http({
                method: 'GET',
                url: GLOBALS.gebruikerUrl+id
            })
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
            return $http({
                method: 'GET',
                url: GLOBALS.tariefUrl+id
            })
        };

        service.saveTarief = function(tarief) {
            tarief.discriminator = "EnergieTariefplan";
            $http.post(GLOBALS.tariefUrl, tarief)
        };

        return service;
    }

    aanvraagService.$inject = ['$http', 'GLOBALS']

    function aanvraagService($http, GLOBALS) {
        var service = {};

        service.getAanvragen = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.aanvraagUrl
            })
        };

        return service;
    }
    
})();