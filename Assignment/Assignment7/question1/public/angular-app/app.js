angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameController",
        controllerAs: "vm"
    });
}

function pageCtrl($scope){
    $scope.currentPage=0;
    $scope.pageSize=10;
    $scope.data=[];

    $scope.numberOfPages = function () {
        return Math.ceil($scope.data.length / $scope.pageSize);
    }
    for (var i = 0; i < 45; i++) {
        $scope.data.push("Item " + i);
    }
}

//let's make a startFrom filter
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

