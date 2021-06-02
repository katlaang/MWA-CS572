angular.module("meanRacing").controller("DriverController", DriverController);


function DriverController(
  DriverDataFactory,
  AuthFactory, $routeParams,
  $route,
  $location
) {
  const vm = this;
  const driverId = $routeParams.driverId;
  DriverDataFactory.getOneDriver(driverId)
    .then(function (driver) {
      vm.driver = driver;
      vm.editedDriverName = driver.name;
      vm.editedDriverCountry = driver.country;
      vm.editedDriverAge = driver.age;
      vm.editedDriverCurrentTeam = driver.currentStatus;
      vm.editedDriverStartingYear = driver.startingYear;
      vm.editedDriverCurrentStatus = driver.currentStatus;
      vm.editedDriverStanding = driver.standing;
    })
    .catch(function (error) {
      console.log(error);
    });
  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };

  vm.updateDriver = function () {
    const editedDriver = {
      name: vm.driver.name,
      country: vm.driver.country,
      age: vm.driver.age,
      currentTeam: vm.driver.currentTeam,
      startingYear: vm.driver.startingYear,
      currentStatus: vm.driver.currentStatus,
      // standing: vm.driver.standing,
    };
    DriverDataFactory.updateOneDriver(driverId, editedDriver)
      .then(function (driver) {
        console.log(driver);
        $route.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  vm.deleteOneDriver = function () {
    DriverDataFactory.deleteOneDriver(driverId)
      .then(function (driver) {
        console.log("driver deleted ", driver);
      })
      .catch(function (error) {
        console.log(error);
      });
    // $route.reload();
    $location.path("/");
  };
}