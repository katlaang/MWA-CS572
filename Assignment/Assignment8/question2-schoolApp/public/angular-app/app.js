angular.module("schoolApp", ["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "angular-app/student-list/student-list.html",
        controller: "StudentsController",
        controllerAs: "vm",
      })
      .when("/students/:studentId", {
        templateUrl: "angular-app/student-one/student-one.html",
        controller: "StudentController",
        controllerAs: "vm",
      });

}

