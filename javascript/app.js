/**
 * Main
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module("beheerApp",['ngRoute', 'chart.js'])
        .config(moduleConfig)
        .run(rootChange);

    rootChange.$inject = ['$rootScope','$location'];

    function rootChange($rootScope, $location) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            if (sessionStorage.getItem('login') == null) {
                $location.path('/login')
            }
        })
    }
    
    moduleConfig.$inject = ['$routeProvider'];
    
    function moduleConfig($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/auth/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
            // Home
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            })
                
            // Login
                
            .when('/login', {
                templateUrl: 'views/auth/login.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            })

            // Aanvragen
                
            .when('/aanvraag/todo', {
                templateUrl: 'views/aanvraag/aanvragen.html',
                controller: 'aanvraagController',
                controllerAs: 'aanvraagCtrl'
            })
            .when('/aanvraag/ok', {
                templateUrl: 'views/aanvraag/aanvragen.html',
                controller: 'aanvraagController',
                controllerAs: 'aanvraagCtrl'
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
            .when('/userdetails/:id', {
                templateUrl: 'views/userdetails.html',
                controller: 'gebruikerDetailController',
                controllerAs: 'gebruikerDetailCtrl'
            })

            // CRUD logs

            .when('/logs', {
                templateUrl: 'views/logboek.html',
                controller: 'logController',
                controllerAs: 'logCtrl'
            })
            .when('/detailtransactie/:id', {
                templateUrl: 'views/logdetails.html',
                controller: 'logDetailController',
                controllerAs: 'logDetailCtrl'
            })
            .when('/logsuser/:id', {
                templateUrl: 'views/logboekuser.html',
                controller: 'gebruikerDetailController',
                controllerAs: 'gebruikerDetailCtrl'
            });

    }
})();
