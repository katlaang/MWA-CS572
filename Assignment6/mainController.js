angular.module("assignment6").controller("MainController", MainController);

function MainController($http){
    let vm=this;
    vm.name="Jack";

    $http.get("https://breaking-bad-quotes.herokuapp.com/v1/quotes/5").then(function (response) {
        vm.quotes = response.data;
    });
}