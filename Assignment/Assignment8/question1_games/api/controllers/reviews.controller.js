const mongoose = require("mongoose");
const Game = mongoose.model("Game");
// const Reviews = mongoose.model("Reviews");

// Get all Reviews
module.exports.reviewsGetAll = function (req, res) {
  console.log("Get reviews for a game controller");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("reviews")
    .exec(function (err, game) {
      console.log("GET reviews for game with gameId ", gameId);
      res.status(200).json(game.reviews);
    });
};

// Get one Review by Id
module.exports.reviewsGetOne = function (req, res) {
  console.log("Get one review for a game");
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId).exec(function (err, game) {
    const reviews = game.reviews.id(reviewId);
    console.log(
      "GET reviews with " +
        reviewId +
        " for game with gameId" +
        gameId
    );
    res.status(200).json(reviews);
  });
};

const _addReviews = function (req, res, game) {
  console.log("game " + game);
  console.log(req.body);
  game.reviews =  game.reviews || [];
  game.reviews.push(req.body);
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: updatedGame,
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

// Add a Review
module.exports.reviewsAdd = function (req, res) {
  console.log("Add one review to the game");
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .select("reviews")
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
        response.message = {
          message: "Game Id " + gameId + " not found.",
        };
      } else if (game) {
        _addReviews(req, res, game);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

// Full update one Reviews - Needs Header as well in ARC
module.exports.reviewsFullUpdate = function (req, res) {
  const gameId = req.params.gameId;
  const reviewId = req.params.reviewId;
  Game.findById(gameId, function (err, game) {  
    const reviewUpdate = game.reviews.id(reviewId);
    if (!err) {
      if (!game) {
        res.status(404).send("Game was not found");
      } else {
        // game.reviews.id(reviewId).name = req.body.name;
        // game.reviews.id(reviewId).review = req.body.review;
        // game.reviews.id(reviewId).date = req.body.date;
        reviewUpdate.name = req.body.name;
        reviewUpdate.review = req.body.review;
        reviewUpdate.date = req.body.date;
        game.save(function (saveerr, saveGame) {
          if (!saveerr) {
            res.status(200).send(saveGame);
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

// Partial update one Reviews - Needs Header as well in ARC
module.exports.reviewsPartialUpdate = function (req, res) {
  const reviewId = req.params.reviewId;
  const gameId = req.params.gameId;

  Game.findById(gameId, function (err, game) {
    const reviewUpdate = game.reviews.id(reviewId);
    if (!err) {
      if (!game) {
        res.status(404).send("Game was not found");
      } else {
        if (req.body.name) {
          reviewUpdate.name = req.body.name;
        }
        if (req.body.review) {
          reviewUpdate.review = req.body.review;
        }
        if (req.body.date) {
          reviewUpdate.date = req.body.date;
        }
        game.save(function (saveErr, saveGame) {
          if (!saveErr) {
            res.status(200).send(saveGame.reviews.id(reviewId));
          } else {
            res.status(400).send(saveErr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};

// Delete One Reviews 
module.exports.reviewsDelete = function (req, res) {
  const reviewId = req.params.reviewId;
  const gameId = req.params.gameId;

  Game.findById(gameId, function (err, game) {
    if (!err) {
      if (!game) {
        res.status(404).send("Game was not found");
      } else {
        game.reviews.id(reviewId).remove(function (removeerr, removeGame) {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        // game.markModified("reviews");
        game.save(function (saveerr, saveGame) {
          if (!saveerr) {
            res.status(200).send({"message": "Successfully deleted"});
          } else {
            res.status(400).send(saveerr.message);
          }
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
};
