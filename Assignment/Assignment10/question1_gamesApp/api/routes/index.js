const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublishers = require("../controllers/publishers.controller");
const controllerReviews = require("../controllers/reviews.controller");
const controllerUsers= require("../controllers/users.controllers");

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.gamesAddOne);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerUsers.authenticate, controllerGames.gamesFullUpdateOne)
  .patch(controllerUsers.authenticate, controllerGames.gamesPartialUpdateOne)
  .delete(controllerUsers.authenticate, controllerGames.gamesDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublishers.publisherGet)
  .post(controllerUsers.authenticate, controllerPublishers.publisherAdd)
  .put(controllerUsers.authenticate, controllerPublishers.publisherFullUpdate)
  .patch(
    controllerUsers.authenticate,
    controllerPublishers.publisherPartialUpdate
  )
  .delete(controllerUsers.authenticate, controllerPublishers.publisherDelete);

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


 router
 .route("/users")
 .post(controllerUsers.usersRegister);

 router
 .route("/auth")
 .post(controllerUsers.usersAuthenticate);


  module.exports = router;
