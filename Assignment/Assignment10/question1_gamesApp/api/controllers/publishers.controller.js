const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGet = function (req, res) {
  console.log("Get all publishers for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("GET publishers for game with gameid ", gameId);
      res.status(200).json(game.publisher);
    });
};

const _addPublisher = function (req, res, game) {
  console.log(req.body);
  game.publisher = {};
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherAdd = function (req, res) {
  console.log("Add one publisher to the game");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      const response = {
        status: 201,
        message: game,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game is not in the database");
        response.status = 404;
        response.message = { message: "Game Id " + gameId + " not found." };
      } else if (game) {
        _addPublisher(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updatePublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      // response.status = 204;
      // response.message = updatedGame;
      response;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherFullUpdate = function (req, res) {
  console.log("Update publisher for a game");
  const gameId = req.params.gameId;
  // const response = {
  //   status: 204,
  //   message: "",
  // };
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("Update publisher for game with gameid ", gameId);
      // res.status(200).json(game.publisher);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game is not in the database");
        response.status = 404;
        response.message = { message: "Game Id " + gameId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updatePublisher(req, res, game);
      }
    });
};

const _deletePublisher = function (req, res, game) {
  game.publisher.remove();
  game.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherDelete = function (req, res) {
  console.log("Update publisher for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("Delete publisher for game with gameid ", gameId);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game is not in the database");
        response.status = 404;
        response.message = { message: "Game Id " + gameId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deletePublisher(req, res, game);
      }
    });
};


const _partialUpdatePublisher = function (req, res, game) {
  if (req.body.name) {
    game.publisher.name = req.body.name;
  }
  if (req.body.country) {
    game.publisher.country = req.body.country;
  }  
  game.save(function (err, updatedGame) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherPartialUpdate = function (req, res) {
  console.log("Update publisher partially for a game");
  const gameId = req.params.gameId;
  const response = {
    status: 204,
    message: "",
  };
  Game.findById(gameId)
    .select("publisher")
    .exec(function (err, game) {
      console.log("Update publisher for game with gameid ", gameId);
      // res.status(200).json(game.publisher);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!game) {
        console.log("Game is not in the database");
        response.status = 404;
        response.message = { message: "Game Id " + gameId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _partialUpdatePublisher(req, res, game);
      }
    });
};