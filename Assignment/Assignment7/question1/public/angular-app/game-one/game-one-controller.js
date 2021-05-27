angular.module("meanGames").controller("GameController", GameController);

function GameController($routeParams, GameDataFactory){
    const vm = this;
    let gameId = $routeParams.id;
    GameDataFactory.getOneGame(gameId).then(function(response){
        vm.game = response;
    });
}