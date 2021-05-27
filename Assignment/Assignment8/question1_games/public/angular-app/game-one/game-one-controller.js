angular.module("meanGames").controller("GameController",GameController);

function _getStarRating(stars){
    return new Array(stars);
}

function GameController(GameDataFactory,$routeParams,$route){
    const vm=this;
    const gameId=$routeParams.gameId;
    GameDataFactory.getOneGame(gameId).then(function(game){
        vm.game=game;
        vm.rating=_getStarRating(vm.game.rate);

        vm.editedGamePrice=game.price;
        vm.editedGameMinPlayers=game.minPlayers;
        vm.editedGameMaxPlayers=game.maxPlayers;
        vm.editedGameMinAge=game.minAge;
    }).catch(function(error){
        console.log(error);
    });


    vm.deleteOneGame=function(){
        GameDataFactory.deleteOneGame(gameId).then(function(game){
            console.log("game deleted ", game);
        }).catch(function(error){
            console.log(error);
        });

        $route.reload();
    };
  
}