/**
 * Controllers
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module('beheerApp')
        .controller('loginController', loginController)
        .controller('homeController', homeController)
        .controller('leverancierController', leverancierController)
        .controller('leverancierCreateController', leverancierCreateController)
        .controller('leverancierDetailController', leverancierDetailController)
        .controller('gebruikerController', gebruikerController)
        .controller('gebruikerDetailController', gebruikerDetailController)
        .controller('logController', logController)
        .controller('logDetailController', logDetailController)
        .controller('levserviceController', levserviceController)
        .controller('levserviceCreateController', levserviceCreateController)
        .controller('aanvraagController', aanvraagController)
        .controller('levserviceEditController', levserviceEditController);

    homeController.$inject = ['$location', 'loginService'];

    function homeController($location, loginService) {
        /*
        var vm = this;
        vm.flag = false;

        if(loginService.isAuth()) {
            vm.flag = true;
        }

        vm.subTitle = "Overzicht";
        vm.logIn = function() {
            $location.path('/login')
        }
        */
    }

    /*
    Login methode signatuur veranderen want is nu enkel voor te testen

     */
    
    loginController.$inject = ['$window','loginService','$scope', '$location'];

    function loginController($window,loginService, $scope, $location) {
        var vm = this;
        vm.credentials = null;

        vm.flag = undefined;

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
            vm.credentials = $scope.userName + $scope.pw;
            loginService.getPK()
                .success(function(data) {
                    var result = data[0].rsa;
                    var pk = cryptico.generateRSAKey(vm.credentials, 1024);
                    var pkString = cryptico.publicKeyString(pk);

                    var finalResult = cryptico.decrypt(result,pk);

                    if(finalResult.plaintext == 'ok') {
                        sessionStorage.setItem(['login'], pkString)

                    }
                });
            if(loginService.isAuth()) {
                $window.location.reload();
                $location.path('/home');
                vm.flag=true;
            }
        };
        vm.logOff = function() {
            sessionStorage.removeItem('login');
            $window.location.reload();
            $location.path('/');
        }
    }

    /*
    Retrieve controller
     */

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

    /*
    Create, Update Controller
     */

    leverancierDetailController.$inject = ['$routeParams', '$location', '$scope', 'leverancierService', 'tariefService'];

    function leverancierDetailController($routeParams,$location,$scope,leverancierService, tariefService) {
        var vm = this;
        vm.leverancier = {};
        vm.id = $routeParams.id;
        leverancierService.getLeveranciers()
            .success(function(leveranciers) {
                vm.leveranciers = leveranciers;
                vm.leverancier = leveranciers[vm.id-1];
            });

        tariefService.getTarieven()
            .success(function(tarieven) {
                var tars = tarieven;
                vm.tarieven = tars.filter(function(obj) {
                    return obj.provider == vm.leverancier.naam;
                });
            })
            .error(function(err) {
                vm.error = err;
                vm.errorMsg = "Something went wrong";
            });


        vm.saveChanges = function() {
            var lev = {};
            lev.naam = $scope.naamLev;
            lev.website = $scope.websiteLev;
            lev.types = [];
            if(typeof $scope.typeE !== 'undefined') {
                lev.types.push("Elektriciteit");
            }
            if(typeof $scope.typeG !== 'undefined') {
                lev.types.push("Gas");
            }
            leverancierService.saveLeverancier(lev)
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
            $location.path('/createabonnement/' + vm.id);
        }
    }

    gebruikerController.$inject = ['$routeParams','$scope', 'gebruikerService', 'logService'];

    function gebruikerController($routeParams,$scope, gebruikerService,logService) {
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

    gebruikerDetailController.$inject = ['$routeParams', 'gebruikerService', 'logService'];

    function gebruikerDetailController($routeParams, gebruikerService, logService) {
        var vm = this;
        vm.id = $routeParams.id;

        gebruikerService.getGebruikers()
            .success(function(gebruikers) {
                var gebs = gebruikers;
                vm.gebruiker = gebs[vm.id-1];
            });

        logService.getAllLogs()
            .success(function(logs) {
                var allLogs = logs;
                vm.logs = allLogs;
            });
        
        
    }
    
    logController.$inject = ['$scope', 'logService'];

    function logController($scope, logService) {
        var vm = this;
        vm.types = ["Alle","Elektriciteit", "Gas"];
        $scope.labels = null;
        $scope.data = null;
        $scope.isType = false;

        vm.onTypeChange = function() {
            vm.logs = null;
            $scope.labels = null;
            $scope.data = null;
            $scope.isType = false;
            var currentSelected = $scope.selectedType;
            logService.getAllLogs()
                .success(function(logs) {
                    if(currentSelected !== null && currentSelected === "Elektriciteit") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        });
                        vm.logs.sort(function(a,b) {
                            return new Date(b.datum) - new Date(a.datum);
                        });
                        $scope.labels = logService.maanden;
                        $scope.data = logService.analyseMonths(vm.logs);
                        $scope.isType = false;

                    }
                    else if(currentSelected !== null && currentSelected === "Gas") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        })
                        vm.logs.sort(function(a,b) {
                            return new Date(b.datum) - new Date(a.datum);
                        })
                        $scope.labels = logService.maanden;
                        $scope.data = logService.analyseMonths(vm.logs)
                        $scope.isType = false;
                    }
                    else {
                        vm.logs = logs;
                        vm.logs.sort(function(a,b) {
                            return new Date(b.datum) - new Date(a.datum);
                        })
                        $scope.labels = logService.types;
                        $scope.data = logService.analyseType(vm.logs)
                        $scope.isType = true;
                    }
                })
        };

        vm.clearSelection = function() {
            vm.logs = null;
        }
    }

    logDetailController.$inject = ['$routeParams','$scope', 'logService', 'gebruikerService', 'leverancierService','tariefService'];


    function logDetailController($routeParams,$scope,logService, gebruikerService, leverancierService,tariefService) {
        var vm = this;
        vm.id = $routeParams.id;

        logService.getAllLogs()
            .success(function(logs) {
                var temp = logs;
                vm.log = temp[vm.id - 1];
                vm.details = vm.log.details;
            });

        gebruikerService.getGebruikers()
            .success(function(gebs) {
                var temp = gebs;
                vm.naam = temp[vm.log.gebruikersID - 1].emailAdres;
            });

        leverancierService.getLeveranciers()
            .success(function(levs) {
                var temp = levs;
                var tempIDNew = vm.details.newLevID;
                var tempIDOld = vm.details.exLevID
                vm.naamLevO = temp[tempIDOld - 1].naam;
                vm.naamLevN = temp[tempIDNew - 1].naam;
            });

        tariefService.getTarieven()
            .success(function(tars) {
                var temp = tars;
                vm.tariefNaam = temp[vm.details.plan -1].naam
            })

    }
    

    levserviceController.$inject = ['$scope', "$routeParams", "tariefService", "leverancierService"];

    function levserviceController($scope, $routeParams, tariefService, leverancierService) {
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
            });
        var temp = leverancierService.getTemp();
        vm.provider = temp !== null ? temp.provider : undefined;
    }

    levserviceEditController.$inject = ['$routeParams','$scope', '$location', 'tariefService'];

    function levserviceEditController($routeParams,$scope, $location, tariefService) {
        var vm = this;
        vm.id = $routeParams.id;
        tariefService.getTarieven()
            .success(function(tarieven) {
                var tars = tarieven;
                vm.tarief = tars[vm.id - 1];
            });
    }

    aanvraagController.$inject = ['$scope', '$location'];

    function aanvraagController() {

    }

})();