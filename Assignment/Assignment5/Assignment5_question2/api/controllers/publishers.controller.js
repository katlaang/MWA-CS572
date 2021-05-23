const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publishersGetAll = function (req, res) {
  console.log("Get all publishers for a game");
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 200,
      message: ""

    }

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not founf in the database", gameId);
      response.status = 404;
      response.message = { "message": "Game Id not found " + gameId };
    } else {
      response.message = game.publisher;
    }
    console.log("GET publishers with gameid", gameId);
    res.status(response.status).json(response.message);

  });
};

module.exports.publisherGetOne = function (req, res) {
  console.log("Get one publisher for a game");
  const gameId = req.params.gameId;
  const publisherId = req.params.publisherId;
  Game.findOne(publisherId, gameId).exec(function (err, game) {
    if (!game) {
      res.status = 404;
      return res.send({ error: 'Not found' });
    }
    if (!err) {
      return res.send({ status: "OK", publisher: game.publisher[0] });
    } else {
      res.status = 500;
    }
    res.status(200).json(publisher);

  });


};

const _addPublisher = function (req, res, game) {
  console.log("req.body", req.body);
  game.publisher = {};
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: ""
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);

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
      response.status = 404;;
      response.message = { "message": "Game id not found: " + gameId };
    }

    //This decides how to send a response
    if (game) {
      _addPublisher(req, res, game);
    } else {
      res.status(response.status).json(response.message);
    }

  });

};

module.exports.publisherFullUpdate = function (req, res) {
  console.log("updating publisher for a game");
  const gameId = req.params.gameId;
  //const publisherId= req.params.publisherId;
  console.log("PUT gameId", gameId);
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 204,
      message: game
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;

    } else if (!game) {
      console.log("no game");
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);

    } else {
      console.log("Game found");
      _updatePublisher(req, res, game);

    }

  });
};

const _updatePublisher = function (req, res, game) {
  console.log("game to update" + game);
  console.log("req.body", req.body);
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: ""
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
      console.log("publisher updated");
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.publisherPartialUpdateOne = function (req, res) {
  console.log("Partially updating a game publisher");
  const gameId = req.params.gameId;
  console.log("PATCH gameId", gameId);
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 204,
      message: "Update Successful!"
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;

    } else if (!game) {
      console.log("no game");
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);

    } else {
      console.log("Game found");
      _partialUpdatePublisher(req, res, game);

    }

  });
};

const _partialUpdatePublisher = function (req, res, game) {
  console.log("game to update" + game);
  console.log("req.body", req.body);
  //update
  if (req.body.name) {
    game.publisher.name = req.body.name;
  }
  if (req.body.country) {
    game.publisher.country = req.body.country;
  }

  game.save(function(err, updatedGame){
    const response = {
      status: 200,
      message: ""
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
      console.log("publisher updated");
    }
    res.status(response.status).json(response.message);
  });

};

module.exports.publisherDeleteOne=function(req, res){
  console.log("Delete controller reached");
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 204,
      message: "Successful Update!"
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;

    } else if (!game) {
      console.log("no game");
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
      

      if (response.status !== 204) {
        res.status(response.status).json(response.message);

      } else {
        console.log("Game found");
        _deletePublisher(req, res, game);

      }
    
  });
};
const _deletePublisher=function(req, res, game){
  
  console.log("game to delete" + game);
  console.log("req.body", req.body);
  game.publisher.remove();
  game.save(function(err, updatedGame){
    const response = {
      status: 200,
      message: ""
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
      console.log("publisher removed");
    }
    res.status(response.status).json(response.message);
  });


}






