angular.module("meanRacing").controller("DriversController", DriversController);

function DriversController(DriverDataFactory){
    const vm = this;
    vm.title = "Mean Racing App";
    DriverDataFactory.getAllDrivers().then(function(response){
        vm.drivers = response;
    });
}