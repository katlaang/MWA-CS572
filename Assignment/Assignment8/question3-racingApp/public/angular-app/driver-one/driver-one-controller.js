angular.module("meanRacing").controller("DriverController", DriverController);


function DriverController(DriverDataFactory, $routeParams, $route, $location) {
  const vm = this;
  const driverId = $routeParams.driverId;
 DriverDataFactory.getOneDriver(driverId)
    .then(function (driver) {
      vm.driver = driver;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.deleteOneDriver= function () {
   DriverDataFactory.deleteOneDriver(driverId)
      .then(function (driver) {
        console.log("driver deleted ", driver);
      })
      .catch(function (error) {
        console.log(error);
      });
      $route.reload();

  };
}