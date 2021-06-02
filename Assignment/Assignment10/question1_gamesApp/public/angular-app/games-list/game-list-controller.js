angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory, AuthFactory) {
  const vm = this;
  vm.number=0;
  vm.title = "Mean Games App";
  // vm.isSubmitted=false;
  GameDataFactory.getAllGames(vm.number).then(function (response) {
    vm.games = response;
  });
  vm.isLoggedIn = function () {
    return AuthFactory.auth.isLoggedIn;
  };
  //pagination
  vm.nextPage = function () {
    if (vm.games.length == 5) {
      vm.number = vm.number + 5;
      GameDataFactory.getAllGames(vm.number).then(function (response) {
        vm.games = response;
      });
    }
  };

  vm.previousPage = function () {
    if (vm.number >= 5) vm.number = vm.number - 5;
    GameDataFactory.getAllGames(vm.number).then(function (response) {
      vm.games = response;
    });
  };

  vm.addGame = function () {
    const newGame = {
      title: vm.newGameTitle,
      price: vm.newGamePrice,
      rate: vm.newGameRating,
      year: vm.newGameYear,
      minPlayers: vm.newGameMinPlayers,
      maxPlayers: vm.newGameMaxPlayers,
      minAge: vm.newGameMinAge,
      designers: vm.newGameDesigner,
    };
    if (vm.gameForm.$valid) {
      console.log(newGame);
      GameDataFactory.addOneGame(newGame)
        .then(function (response) {
          console.log("Game saved");
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // else{
    //     vm.isSubmitted=true;
    // }
  };
}
