const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");
const controllerReviews = require("../controllers/reviews.controller");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerGames.gamesFullUpdateOne)
  .patch(controllerGames.gamesPartialUpdateOne)
  .delete(controllerGames.gamesDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublishers.publisherGet)
  .post(controllerPublishers.publisherAdd)
  .put(controllerPublishers.publisherFullUpdate)
  .patch(controllerPublishers.publisherPartialUpdate)
  .delete(controllerPublishers.publisherDelete);

router
  .route("/games/:gameId/reviews")
  .get(controllerReviews.reviewsGetAll)
  .post(controllerReviews.reviewsAdd);

router
  .route("/games/:gameId/reviews/:reviewId")
  .get(controllerReviews.reviewsGetOne)
  .put(controllerReviews.reviewsFullUpdate)
  .patch(controllerReviews.reviewsPartialUpdate)
  .delete(controllerReviews.reviewsDelete)
  ;

  module.exports = router;
