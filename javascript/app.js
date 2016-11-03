/**
 * Main
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module("beheerApp",['ngRoute']).config(moduleConfig);
    
    moduleConfig.$inject = ['$routeProvider'];
    
    function moduleConfig($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .when('/zoekleverancier', {
                templateUrl: 'views/leveranciersearch.html',
                controller: 'leverancierController',
                controllerAs: 'leverancierCtrl'
            })
            .when('/detailleverancier/:id', {
                templateUrl: 'views/leverancierdetails.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/detailleverancier/edit/:id', {
                templateUrl: 'views/leverancieredit.html',
                controller: 'leverancierEditController',
                controllerAs: 'leverancierEditCtrl'
            })
            .when('/usersoverview', {
                templateUrl: 'views/useroverview.html',
                controller: 'gebruikerController',
                controllerAs: 'gebruikerCtrl'
            })
            .when('/logs', {
                templateUrl: 'views/logboek.html',
                controller: 'logController',
                controllerAs: 'logCtrl'
            })
            .when('/zoeklevservice', {
                templateUrl: 'views/levservicesearch.html',
                controller: 'levserviceController',
                controllerAs: 'levserviceCtrl'
            })
            .when('/createleverancier', {
                templateUrl: 'views/createleverancier.html',
                controller: 'leverancierCreateController',
                controllerAs: 'leverancierCreateCtrl'
            })
            .when('/createabonnement', {
                templateUrl: "views/createtariefplan.html",
                controller: 'levserviceCreateController',
                controllerAs: 'levserviceCreateCtrl'
            })
    }
})();
