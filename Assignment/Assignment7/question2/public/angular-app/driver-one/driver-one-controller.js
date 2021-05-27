angular.module("meanRacing").controller("DriverController", DriverController);

function DriverController($routeParams, DriverDataFactory){
    const vm = this;
    let driverId = $routeParams.id;
    DriverDataFactory.getOneDriver(driverId).then(function(response){
        vm.driver = response;
    });
}