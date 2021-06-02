angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars) {
  return new Array(stars);
}

function GameController(GameDataFactory, $location, $routeParams, $route, AuthFactory) {
  const vm = this;
  const gameId = $routeParams.gameId;
  GameDataFactory.getOneGame(gameId)
    .then(function (game) {
      vm.game = game;
      vm.rating = _getStarRating(vm.game.rate);

      // vm.editedGamePrice = game.price;
      // vm.editedGameMinPlayers = game.minPlayers;
      // vm.editedGameMaxPlayers = game.maxPlayers;
      // vm.editedGameMinAge = game.minAge;
    })
    .catch(function (error) {
      console.log(error);
    });
  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
    
  };

  vm.updateGame = function () {
    const editedGame = {
      title: vm.game.title,
      year: vm.game.year,
      rate: vm.game.rate,
      price: vm.editedGamePrice,
      minPlayers: vm.editedGameMinPlayers,
      maxPlayers: vm.editedGameMaxPlayers,
      minAge: vm.editedGameMinAge,
      designers: vm.game.designers,
      publisher: vm.game.publisher,
    };
    GameDataFactory.gameEditOne(gameId, editedGame)
      .then(function (game) {
        console.log(game);
        
      })
      .catch(function (error) {
        console.log(error);
      });
      $route.reload();
  };

vm.deleteOneGame = function () {
  GameDataFactory.deleteOneGame(gameId)
    .then(function (game) {
      console.log("game deleted ", game);
    })
    .catch(function (error) {
      console.log(error);
    });

 // $route.reload();
   $location.path("/");
};

}
