/**
 * Controllers
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module('beheerApp')
        .controller('homeController', homeController)
        .controller('leverancierController', leverancierController)
        .controller('leverancierCreateController', leverancierCreateController)
        .controller('leverancierDetailController', leverancierDetailController)
        .controller('gebruikerController', gebruikerController)
        .controller('logController', logController)
        .controller('levserviceController', levserviceController)
        .controller('levserviceCreateController', levserviceCreateController);

    function homeController() {
        var vm = this;
        vm.subTitle = "Overzicht";
    }
    
    leverancierController.$inject = ['$scope','leverancierService'];

    function leverancierController($scope,leverancierService) {
        var vm = this;
        vm.types = ["Alle", "Elektriciteit", "Gas"];
        vm.selectE = false;
        vm.selectG = false;
        vm.getLeveranciers = function() {
            leverancierService.getLeveranciers()
                .success(function(leveranciers) {
                    vm.leveranciers = leveranciers;
                })
                .error(function(err) {
                    vm.errorMsg = "Er is een probleem met de server.";
                    vm.error = err;
                })
        };

        // TODO?
        // Wordt momenteel niet gebruikt, inline filtering met Angular in de plaats

        vm.getLeverancierByName = function(name) {
            leverancierService.getLeveranciers()
                .then(function(leveranciers) {
                    var allLevs = leveranciers.data;
                    vm.filteredLeveranciers = allLevs.filter(function(obj) {
                        if(obj.naam.indexOf(name) !== -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
                });
        };

        vm.clearSelection = function() {
            vm.leveranciers = undefined;
            vm.selectedLeveranciers = undefined;
        };

        vm.onTypeChange = function() {
            vm.leveranciers = null;
            var currentSelected = $scope.selectedType;
            leverancierService.getLeveranciers()
                .success(function(leveranciers) {
                    if(currentSelected !== null && currentSelected === "Elektriciteit") {
                        vm.leveranciers = leveranciers.filter(function(obj) {
                            return obj.type.indexOf(currentSelected) !== -1;
                        })
                    }
                    else if(currentSelected !== null && currentSelected === "Gas") {
                        vm.leveranciers = leveranciers.filter(function(obj) {
                            return obj.type.indexOf(currentSelected) !== -1
                        })
                    }
                    else {
                        vm.leveranciers = leveranciers;
                    }
                })
        };
    }

    leverancierCreateController.$inject = ['$scope', 'leverancierService','$location'];

    function leverancierCreateController($scope, leverancierService, $location) {
        var vm = this;
        vm.temp = null;
        vm.onCreateLevService = function() {
            var temp = {};
            temp.naam = $scope.naamLev;
            temp.website = $scope.websiteLev;
            temp.types = [];
            temp.types.push($scope.typeE);
            temp.types.push($scope.typeG);
            leverancierService.tempSave(temp);
            $location.path('/createabonnement');
        }
        
    }

    leverancierDetailController.$inject = ['$routeParams', '$scope', 'leverancierService'];

    function leverancierDetailController($routeParams,$scope, leverancierService) {
        var vm = this;
        vm.leverancier = {};
        vm.id = $routeParams.id;
        leverancierService.getLeveranciers()
            .success(function(leveranciers) {
                vm.leverancier = leveranciers[vm.id-1];
            });
    }

    gebruikerController.$inject = ['$scope', 'gebruikerService'];

    function gebruikerController($scope, gebruikerService) {
        var vm = this;

        vm.getGebruikers = function() {
            gebruikerService.getGebruikers()
                .success(function(gebruikers) {
                    vm.gebruikers = gebruikers;
                })
                .error(function(err) {
                    vm.error = err;
                    vm.errorMsg = "Er is iets fout gegaan";
                })
        };

        vm.clearSelection = function() {
            vm.gebruikers = null;
        }
    }
    
    logController.$inject = ['$scope', 'logService'];

    function logController($scope, logService) {
        var vm = this;
        vm.types = ["Alle","Elektriciteit", "Gas"];

        vm.getAllLogs = function() {
            logService.getAllLogs()
                .success(function(logs) {
                    vm.logs = logs;
                })
                .error(function(err){
                    vm.error = err;
                    vm.errorMsg = "Er is iets foutgegaan";
                });
        };

        vm.onTypeChange = function() {
            vm.logs = null;
            var currentSelected = $scope.selectedType;
            logService.getAllLogs()
                .success(function(logs) {
                    if(currentSelected !== null && currentSelected === "Elektriciteit") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        })
                    }
                    else if(currentSelected !== null && currentSelected === "Gas") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        })
                    }
                    else {
                        vm.logs = logs;
                    }
                })
        };

        vm.clearSelection = function() {
            vm.logs = null;
        }
    }

    levserviceController.$inject = ['$scope', "$routeParams", "tariefService"];

    function levserviceController($scope, $routeParams, tariefService) {
        var vm = this;

        vm.getTarieven = function() {
            tariefService.getTarieven()
                .success(function(tarieven) {
                    vm.tarieven = tarieven;
                })
                .error(function(err) {
                    vm.error = err;
                    vm.errorMsg = "Er is een iets foutgegaan"
                });
        };

        vm.clearSelection = function() {
            vm.tarieven = null;
        }
    }

    levserviceCreateController.$inject = ['$scope','$location','tariefService', 'leverancierService'];

    function levserviceCreateController($scope,$location,tariefService, leverancierService) {
        var vm = this;
        leverancierService.getLeveranciers()
            .success(function(leveranciers) {
                vm.providers = leveranciers;
            })
            .error(function(err) {
                vm.error = err;
                vm.errorMsg = "Er is iets gout gegaan";
            })
        var temp = leverancierService.getTemp();
        vm.provider = "Elektrabel"
    }

})();