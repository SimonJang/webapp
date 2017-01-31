/**
 * Testing met Jasmine (behavior)
 */

describe('TESTEN Login Controller', function() {
    var $controller;

    beforeEach(function() {
        module('beheerApp');
    });

    beforeEach(inject(function ($route) {
        route = $route;
    }));

    describe('Testing routes', function() {
        it('Login route', function () {
            var loginR = route.routes['/login'];
            expect(loginR).toBeDefined();
            expect(loginR.controller).toEqual('loginController');
            expect(loginR.templateUrl).toEqual('views/auth/login.html');
        });
    });

    describe('loginController', function() {
        beforeEach(inject(function(_$controller_, _$location_, _$route_) {
            $controller = _$controller_;
            $location = _$location_;
        }));

        it("controleren van de vlag", function() {
            expect($controller.flag).toBe(undefined);
        });

        it("controleren van waarschuwing", function() {
            expect($controller.warning).toBe(undefined);
        });

        it("controleren van state na initialisatie", function() {
            var $scope = {};
            var controller = $controller('loginController', {$scope : $scope});
            expect(controller.warning).toBe(false);
            expect(controller.credentials).toBe(null);
        });
        it("controleren van state", function() {
            var $scope = {};
            var controller = $controller('loginController', {$scope : $scope, $location : $location});
            controller.gotologIn();
            expect($location.$$path).toBe('/login')
        });
        it("controleren van foute login", function() {
            var $scope = {};
            var controller = $controller('loginController', {$scope : $scope, $location : $location});
            $scope.credentials = "lolie2";
            controller.logIn();
            expect(controller.warning).toBe(true);
            expect(controller.flag).toBe(false);
        });
        it("controleren van login", function() {
            var $scope = {};
            var controller = $controller('loginController', {$scope : $scope, $$location : $location});
            $scope.userName = "admin";
            $scope.pw = "test01";
            controller.logIn();
            console.log($location);
            expect(controller.warning).toBe(false);
            expect(controller.flag).toBe(false);
        });

    })
});


