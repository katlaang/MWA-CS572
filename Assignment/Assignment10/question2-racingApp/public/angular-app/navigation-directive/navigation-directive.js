angular.module("meanRacing").directive("driversNavigation", DriversNavigation);

function DriversNavigation() {
  return {
    restrict: "E",
    templateUrl: "angular-app/navigation-directive/navigation-directive.html",
  };
}
