angular
  .module("meanRacing")
  .controller("DriversController", DriversController);

function DriversController(DriverDataFactory, $route) {
  const vm = this;
  vm.title = "Mean Racing App";
  vm.isSubmitted = false;
  DriverDataFactory.getAllDrivers().then(function (response) {
    vm.drivers = response;
  });

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

