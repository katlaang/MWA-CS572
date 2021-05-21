const express= require("express");

const router= express.Router();

const controllerGames = require("../controllers/gamecontroller");

router.route("/games").get(controllerGames.gamesGetAll);

router.route("/games").get(controllerGames.gamesGetThree);

module.exports=router;