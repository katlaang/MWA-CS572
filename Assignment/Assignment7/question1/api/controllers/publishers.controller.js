const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publishersGetAll = function (req, res) {
  console.log("Get all publishers for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    console.log("GET publishers with gameid", gameId);
    res.status(200).json(publishers);
  });
};
const _addPublisher=function(req, res, game, response){
  console.log("req.body", req.body);
  game.publisher.name=req.body.name;
 // game.publisher.location.type="point";
  game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lng)];
  game.save(function(err, updatedGame){
    if(err){
      response.statu=500;
      response.message=err;
    
    }else{
      response.message = updatedGame;
    }
  response.status(response.status).json(response.message);

  });
};

module.exports.publishersAddOne = function (req, res) {
  console.log("add one publishers for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 201,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not fond in database");
      response.statu;
      response.message = { "message": "Game id not found: " + gameId };
    }

    //This decides how to send a response
    if (game) {
      _addPublisher(req, res, game, response);
    } else {
      res.status(response.status).json(response.message);
    }
    //console.log("GET publishers with gameid", gameId);
    //res.status(200).json(publishers);
  });

};
