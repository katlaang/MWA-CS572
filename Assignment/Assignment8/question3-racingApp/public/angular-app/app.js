angular.module("meanRacing", ["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "angular-app/driver-list/driver-list.html",
        controller: "DriversController",
        controllerAs: "vm",
      })
      .when("/drivers/:driverId", {
        templateUrl: "angular-app/driver-one/driver-one.html",
        controller: "DriverController",
        controllerAs: "vm",
      });

}

