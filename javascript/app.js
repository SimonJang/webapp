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
            // Home
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })

            // CRUD Leveranciers

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
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/createleverancier', {
                templateUrl: 'views/createleverancier.html',
                controller: 'leverancierCreateController',
                controllerAs: 'leverancierCreateCtrl'
            })

            // CRUD tarieven

            .when('/detaillevservice/:id', {
                templateUrl: "views/edittariefplan.html",
                controller: "levserviceEditController",
                controllerAs: "levserviceEditCtrl"
            })
            .when('/zoeklevservice', {
                templateUrl: 'views/levservicesearch.html',
                controller: 'levserviceController',
                controllerAs: 'levserviceCtrl'
            })
            .when('/createabonnement', {
                templateUrl: "views/createtariefplan.html",
                controller: 'levserviceCreateController',
                controllerAs: 'levserviceCreateCtrl'
            })
            .when('/editabonnement/:id', {
                templateUrl: "views/edittariefplan.html",
                controlller: 'levserviceEditController',
                controllerAs: 'levserviceEditCtrl'
            })
            .when('/overzichtlevservice/:id', {
                templateUrl: 'views/overzichtlevservice.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/createabonnement/:id', {
                templateUrl: 'views/createtariefplanprovider.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })

            // CRUD users

            .when('/usersoverview', {
                templateUrl: 'views/useroverview.html',
                controller: 'gebruikerController',
                controllerAs: 'gebruikerCtrl'
            })

            // CRUD logs

            .when('/logs', {
                templateUrl: 'views/logboek.html',
                controller: 'logController',
                controllerAs: 'logCtrl'
            });

    }
})();
