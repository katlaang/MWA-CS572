const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const publisherController = require("../controllers/publishers.controller");
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
    .post(publisherController.publishersAddOne);


module.exports = router;
