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
                templateUrl: 'views/beheerlev/leveranciersearch.html',
                controller: 'leverancierController',
                controllerAs: 'leverancierCtrl'
            })
            .when('/detailleverancier/:id', {
                templateUrl: 'views/beheerlev/leverancierdetails.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/detailleverancier/edit/:id', {
                templateUrl: 'views/beheerlev/leverancieredit.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/createleverancier', {
                templateUrl: 'views/beheerlev/createleverancier.html',
                controller: 'leverancierCreateController',
                controllerAs: 'leverancierCreateCtrl'
            })

            // CRUD tarieven

            .when('/detaillevservice/:id', {
                templateUrl: "views/beheertarief/edittariefplan.html",
                controller: "levserviceEditController",
                controllerAs: "levserviceEditCtrl"
            })
            .when('/zoeklevservice', {
                templateUrl: 'views/beheertarief/levservicesearch.html',
                controller: 'levserviceController',
                controllerAs: 'levserviceCtrl'
            })
            .when('/createabonnement', {
                templateUrl: "views/beheertarief/createtariefplan.html",
                controller: 'levserviceCreateController',
                controllerAs: 'levserviceCreateCtrl'
            })
            .when('/editabonnement/:id', {
                templateUrl: "views/beheertarief/edittariefplan.html",
                controlller: 'levserviceEditController',
                controllerAs: 'levserviceEditCtrl'
            })
            .when('/overzichtlevservice/:id', {
                templateUrl: 'views/beheertarief/overzichtlevservice.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })
            .when('/createabonnement/:id', {
                templateUrl: 'views/beheertarief/createtariefplanprovider.html',
                controller: 'leverancierDetailController',
                controllerAs: 'leverancierDetailCtrl'
            })

            // CRUD users

            .when('/usersoverview', {
                templateUrl: 'views/users/useroverview.html',
                controller: 'gebruikerController',
                controllerAs: 'gebruikerCtrl'
            })
            .when('/userdetails/:id', {
                templateUrl: 'views/users/userdetails.html',
                controller: 'gebruikerDetailController',
                controllerAs: 'gebruikerDetailCtrl'
            })

    }
})();
