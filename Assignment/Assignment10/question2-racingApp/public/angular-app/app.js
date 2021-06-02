angular
  .module("meanRacing", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/welcome/welcome.html",
      access: { restricted: false },
    })
    .when("/drivers", {
      templateUrl: "angular-app/driver-list/driver-list.html",
      controller: "DriversController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/register", {
      templateUrl: "angular-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/drivers/:driverId", {
      templateUrl: "angular-app/driver-one/driver-one.html",
      controller: "DriverController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/profile", {
      templateUrl: "angular-app/profile/profile.html",
      access: { restricted: true },
    })
    .otherwise({
      redirectTo: "/",
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      //This is to enable overcomming restricted URLs
      if (
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !$window.sessionStorage.token &&
        !AuthFactory.auth.isLoggedIn
      ) {
        event.preventDefault();
        $location.path("/");
      }
    }
  );
}
