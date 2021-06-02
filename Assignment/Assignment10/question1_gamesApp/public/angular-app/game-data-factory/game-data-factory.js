angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http){
    return {
      getAllGames: getAllGames,
      getOneGame: getOneGame,
      addOneGame: addOneGame,
      gameEditOne: gameEditOne,
      deleteOneGame: deleteOneGame,
    };

    function getAllGames(number){
        return $http
          .get("/api/games?offset=" + number + "&count=5").then(complete).catch(failed);
    }

    function getOneGame(id){
        return $http.get("/api/games/"+id).then(complete).catch(failed);

    }

    function addOneGame(game){        
        return $http.post("/api/games/",game).then(complete).catch(failed);
    }

    function gameEditOne(gameId, game) {
      return $http
        .put("/api/games/" + gameId, game)
        .then(complete)
        .catch(failed);
    }

    function deleteOneGame(gameId){
        return $http.delete("/api/games/"+gameId).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}