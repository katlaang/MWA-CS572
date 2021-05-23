const mongoose = require("mongoose");
const Game = mongoose.model("Game");


const runGeoQuery = function (req, res) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  console.log("Geo searching");

  const query = {
    "publisher.location": {
      $near: {
        $geometry: {
          type: "point",
          coordinates: [lng, lat]
        },
        $maxDistance: 1000,
        $minDistance: 0
      }
    }
  };
  Game.find(query).exec(function (err, games) {
    if (err) {
      console.log("Error", err)
    };
    console.log("Found games");
    res.status(200).json(games);
  });
}
module.exports.gamesGetAll = function (req, res) {
  console.log("Get the Games");
  console.log(req.query);

  let offset = 0;
  let count = 5;
  let maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  
  if (isNaN(offset) || isNaN(count)) {
    
    res
      .status(400)
      .json({ message: "QueryString Offset and Count must be a number" });
  }
  // count check
  if (count > maxCount) {
    res
      .status(400)
      .json({ message: "QueryString Count must not exceed " + maxCount });
  } else {
    Game.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, games) {
        // error check
        if (err) {
          console.log("Error ", err);
          res.status(500).json(err);
        } else {
          console.log("Found games", games);
          res.status(200).json(games);
        }
      });
  }
};
module.exports.gamesGetOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 200,
      message: game
    }
    // console.log("The exec result is"+game);
    if (err) {//error check
      console.log("Error finding game");
      res.status = 500;
      response.message = error;
    } else if (!game) {//result check
      //res.status(404).json({"message": "Game ID not found"});
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.gamesAddOne = function (req, res) {
  console.log("POST new game");
  const response = {
    status: 201,
    message: ""
  };
  if (req.body && req.body.title && req.body.price && req.body.rate) {
    console.log(req.body);

    const newGame = {};
    newGame.publisher = {};
    newGame.title = req.body.title;
    newGame.price = parseFloat(req.body.price);
    newGame.rate = parseInt(req.body.rate);
    Game.create(newGame, function (err, game) {
      console.log("The callback game is: " + game);
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.message = game;
      }
      res.status(response.status).json(response.game);
    });
  } else {
    console.log("data missing from body");
    res.status(400);
    response.message = json({ err: "Request data missing from post body" });
    res.status(response.status).json(response.message);
  }

};


module.exports.gamesFullUpdateOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game
    }
    // console.log("The exec result is"+game);
    if (err) {//error check
      console.log("Error finding game");
      res.status = 500;
      response.message = error;
    } else if (!game) {//result check
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      //update the game
      res.status(response.status).json(response.message);
      game.title = req.body.title;
      game.year = req.body.year;
      game.price = req.body.price;
      game.minPlayers = req.body.minPlayers;
      game.maxPlayers = req.body.maxPlayers;
      game.rate = req.body.rate;
      game.minAge = req.body.minAge;
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = { "message": "Game updated:" + gameId };
        }
        res.status(response.status).json(response.message);
      });
    }

  });
}

module.exports.gamesPartialUpdateOne = function (req, res) {
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game
    }
    // console.log("The exec result is"+game);
    if (err) {//error check
      console.log("Error finding game");
      res.status = 500;
      response.message = error;
    } else if (!game) {//result check
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      //update the game
      res.status(response.status).json(response.message);
      if(req.body.title){
        game.title = req.body.title;
      }
      if(req.body.year){
        game.year = req.body.year;
      }
       if(req.body.price){
        game.price = req.body.price;
      }else if(req.body.minPlayers){
        game.minPlayers = req.body.minPlayers;
      }
      if(req.body.maxPlayers){
        game.maxPlayers = req.body.maxPlayers;
      }
      if(req.body.rate){
        game.rate = req.body.rate;
      }
      if(req.body.minAge){
        game.minAge = req.body.minAge;
      }
    
      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.message = { "message": "Game updated:" + gameId };
        }
        res.status(response.status).json(response.message);
      });
    }

  });
};

module.exports.gamesDeleteOne = function (req, res) {
  console.log("Delete controller reached");
  const gameId = req.params.gameId;
  Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
    const response = {
      status: 200,
      message: deletedGame
    }
    // console.log("The exec result is"+game);
    if (err) {//error check
      console.log("Error finding game");
      res.status = 500;
      response.message = error;
    } else if (!deletedGame) {//result check
      //res.status(404).json({"message": "Game ID not found"});
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
}




