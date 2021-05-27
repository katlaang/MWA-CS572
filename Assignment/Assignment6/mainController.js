angular.module("assignment6").controller("MainController", MainController);

function MainController($http){
    let vm=this;
    vm.name="Jack";

    $http.get("http://universities.hipolabs.com/search?name=middle").then(function (response) {
        vm.unis = response.data;
    });
};