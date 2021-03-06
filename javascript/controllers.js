/**
 * Controllers
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module('beheerApp')
        .controller('loginController', loginController)
        .controller('leverancierController', leverancierController)
        .controller('leverancierCreateController', leverancierCreateController)
        .controller('leverancierDetailController', leverancierDetailController)
        .controller('gebruikerController', gebruikerController)
        .controller('gebruikerDetailController', gebruikerDetailController)
        .controller('levserviceController', levserviceController)
        .controller('levserviceCreateController', levserviceCreateController)
        .controller('aanvraagController', aanvraagController)
        .controller('levserviceEditController', levserviceEditController);

    /*
    Login methode signatuur veranderen want is nu enkel voor te testen

     */
    
    loginController.$inject = ['$window','loginService','$scope', '$location'];

    function loginController($window,loginService, $scope, $location) {
        var vm = this;
        vm.credentials = null;

        vm.flag = undefined;
        vm.warning = false;

        if(loginService.isAuth()) {
            vm.flag = true;
        }
        else {
            vm.flag = false;
        }

        vm.subTitle = "Overzicht";
        vm.gotologIn = function() {
            $location.path('/login')
        };

        vm.logIn = function() {
            var credentials = $scope.userName + $scope.pw;
            if(!credentials) {
                vm.warning = true;
            }
            else {
                loginService.getPK()
                    .success(function(data) {
                        var result = data[0].rsa;
                        var pk = cryptico.generateRSAKey(credentials, 1024);
                        var pkString = cryptico.publicKeyString(pk);

                        var finalResult = cryptico.decrypt(result,pk);

                        if(finalResult.plaintext == 'ok') {
                            sessionStorage.setItem(['login'], pkString)
                            $window.location.reload();
                            $location.path('/aanvraag/todo');
                            vm.flag=true;
                        }
                        else {
                            vm.warning = true;
                        }
                    });
            }
        };
        vm.logOff = function() {
            sessionStorage.removeItem('login');
            $window.location.reload();
            $location.path('/');
        }
    }

    /*
    Ophalen van leveranciers
     */

    leverancierController.$inject = ['leverancierService'];

    function leverancierController(leverancierService) {
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
    }

    leverancierCreateController.$inject = ['$scope', 'leverancierService','$location'];

    function leverancierCreateController($scope, leverancierService, $location) {
        var vm = this;
        vm.temp = null;
        vm.onCreateLevService = function() {
            $location.path('/createabonnement');
        };

        vm.createLeverancier = function() {
            var lev = {};
            lev.naam = $scope.naamLev;
            lev.website = $scope.websiteLev;
            leverancierService.saveLeverancier(lev);
            $location.path('/zoekleverancier');
        }
        
    }

    /*
    Create, Update Controller
     */

    leverancierDetailController.$inject = ['$routeParams', '$location', '$scope', 'leverancierService', 'tariefService'];

    function leverancierDetailController($routeParams,$location,$scope,leverancierService, tariefService) {
        var vm = this;
        vm.leverancier = {};
        vm.id = $routeParams.id;
        leverancierService.getLeverancierById(vm.id)
            .success(function(leverancier) {
                vm.leverancier = leverancier
            });

        vm.saveChanges = function() {
            var lev = {};
            lev.naam = $scope.naamLev;
            lev.id =  vm.leverancier.id;
            lev.website = $scope.websiteLev;
            leverancierService.saveLeverancier(lev)
            $location.path('/zoekleverancier');
        };
        
        vm.saveTarief = function() {
            var tarief = {
                naam: $scope.naamTarief,
                basisprijs: $scope.basisPrijs,
                isGroen: $scope.isGroen,
                provider: $scope.selectedValue
            };
            
            leverancierService.saveTarief(tarief);
        };

        vm.onCreateLevService = function() {
            $location.path('/createabonnement');
        }
    }

    gebruikerController.$inject = ['gebruikerService'];

    function gebruikerController(gebruikerService) {
        var vm = this;

        vm.getGebruikers = function() {
            gebruikerService.getGebruikers()
                .success(function(gebruikers) {
                    vm.gebruikers = gebruikers;
                    vm.gebruiker = gebruikers[vm.id - 1];
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

    gebruikerDetailController.$inject = ['$routeParams', 'gebruikerService'];

    function gebruikerDetailController($routeParams, gebruikerService) {
        var vm = this;
        vm.id = $routeParams.id;

        gebruikerService.getGebruikers()
            .success(function(gebruikers) {
                var gebs = gebruikers;
                vm.gebruiker = gebs[vm.id-1];
            });
    }

    /* Controller voor het aanpassen van de tarieven*/

    levserviceController.$inject = ["tariefService"];

    function levserviceController(tariefService) {
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

    levserviceCreateController.$inject = ['leverancierService','$location', '$scope'];

    function levserviceCreateController(leverancierService,$location, $scope) {
        var vm = this;
        leverancierService.getLeveranciers()
            .success(function(leveranciers) {
                vm.providers = leveranciers;
            })
            .error(function(err) {
                vm.error = err;
                vm.errorMsg = "Er is iets gout gegaan";
            });

        vm.saveTarief = function() {
            var tarief = {};
            tarief.naam = $scope.naamTarief
            tarief.basisprijs = $scope.basisPrijs;
            tarief.groen = $scope.isGroen;
            tarief.leverancier = {};
            tarief.leverancier.id = $scope.providerID;

            leverancierService.saveTarief(tarief);
            $location.path('/zoeklevservice');

        };

        vm.onCreateLeverancier = function() {
            $location.path('/createleverancier');
        };
    }

    levserviceEditController.$inject = ['$routeParams','tariefService','$location','$scope'];

    function levserviceEditController($routeParams,tariefService, $location,$scope) {
        var vm = this;
        vm.id = $routeParams.id;
        tariefService.getTarieven()
            .success(function(tarieven) {
                var tars = tarieven;
                vm.tarief = tars[vm.id - 1];
            });

        vm.saveTarief = function() {
            var nieuwTarief = vm.tarief;
            nieuwTarief.naam = $scope.naamTarief;
            nieuwTarief.basisprijs = $scope.basisPrijs;
            nieuwTarief.groen = $scope.isGroen;

            tariefService.saveTarief(nieuwTarief);
            $location.path('/zoeklevservice');
        }
    }

    /* Controller voor het beheren van aanvragen */

    aanvraagController.$inject = ['$location', 'aanvraagService', 'tariefService'];

    function aanvraagController($location, aanvraagService,tariefService ) {
        var vm = this;

        vm.loc = $location.path();
        vm.flag = vm.loc.indexOf('todo') == -1;

        tariefService.getTarieven().success(function(data) {
            vm.tarieven = data;
        });

        vm.aanvragen = {};
        vm.aantal = {};
        vm.tarieven = {};
        aanvraagService.getAanvragen()
            .success(function(data) {
                vm.aanvragen = data;
                vm.aantal = vm.aanvragen.length;

                for(aanvraag in vm.aanvragen) {
                    for(tarief in vm.tarieven) {
                        if(aanvraag.tariefPlanId == tarief.id) {
                            aanvraag.tarief = tarief.naam
                        }
                    }
                }
            });

        

        
    }

})();