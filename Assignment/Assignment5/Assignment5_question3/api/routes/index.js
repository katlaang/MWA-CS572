const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const publisherController = require("../controllers/publishers.controller");
const reviewController = require("../controllers/review.controller");
//const publisherController = require("../controllers/publishers.controller");

router.route("/games")
      .get(controllerGames.gamesGetAll)
      .post(controllerGames.gamesAddOne);



router.route("/games/:gameId")
      .get(controllerGames.gamesGetOne)
      .put(controllerGames.gamesFullUpdateOne)
      .patch(controllerGames.gamesPartialUpdateOne)
      .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
      .get(publisherController.publishersGetAll)
      .post(publisherController.publishersAddOne)
      .put(publisherController.publisherFullUpdate)
      .patch(publisherController.publisherPartialUpdateOne)
      .delete(publisherController.publisherDeleteOne);


router.route("/games/:gameId/publishers/:publisherId")
      .get(publisherController.publisherGetOne);


router.route("/games/:gameId/reviews")
      .get(reviewController.reviewsGetAll)
      .post(reviewController.reviewsAddOne)
      


router.route("/games/:gameId/reviews/:reviewId")
      .get(reviewController.reviewGetOne)
      .put(reviewController.reviewsFullUpdate)
      .patch(reviewController.reviewspartialUpdate)
      .delete(reviewController.reviewsDeleteOne);


module.exports = router;
