angular
  .module("meanRacing")
  .controller("DriversController", DriversController);

function DriversController(DriverDataFactory,AuthFactory, $route) {
  const vm = this;
  vm.number=0;
  vm.title = "Mean Racing App";
  vm.isSubmitted = false;
  DriverDataFactory.getAllDrivers(vm.number).then(function (response) {
    vm.drivers = response;
  });
  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };

  //pagination
  vm.nextPage = function () {
    if (vm.drivers.length == 5) {
      vm.number = vm.number + 5;
      DriverDataFactory.getAllDrivers(vm.number).then(function (response) {
        vm.drivers = response;
      });
    }
  };

  vm.previousPage = function () {
    if (vm.number >= 5) vm.number = vm.number - 5;
    DriverDataFactory.getAllDrivers(vm.number).then(function (response) {
      vm.drivers = response;
    });
  };

  vm.addDriver = function () {
    const newDriver = {
      name: vm.newDriverName,
      country: vm.newDriverCountry,
      age: vm.newDriverAge,
      currentStatus: vm.newDriverCurrentStatus,
      currentTeam: vm.newDriverCurrentTeam,
      startingYear: vm.newDriverStartingYear,
    };
    if (vm.driverForm.$valid) {
      console.log(newDriver);
      DriverDataFactory.addOneDriver(newDriver)
        .then(function (response) {
          console.log("driver saved");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // else{
    //     vm.isSubmitted=true;
    // }
  };
}

