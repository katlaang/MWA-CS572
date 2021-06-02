const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const standingsController = require("../controllers/standings.controller");
const controllerUsers = require("../controllers/user.controller");

router
  .route("/drivers")
  .get(driverController.driversGetAll)
  .post(driverController.driversAddOne);

router
  .route("/drivers/:driverId")
  .get(driverController.driverGetOne)
  .put(driverController.driverFullUpdateOne)
  .patch(driverController.driverPartialUpdateOne)
  .delete(driverController.driverDeleteOne);

router
  .route("/drivers/:driverId/standings")
  .get(standingsController.standingsGetAll)
  .post(standingsController.standingAddOne)
  .put(standingsController.standingFullUpdate)
  .patch(standingsController.standingPartialUpdateOne)
  .delete(standingsController.standingDeleteOne);

router
  .route("/drivers/:driverId/standings/:standingId")
  .get(standingsController.standingsGetOne);

router.route("/users").post(controllerUsers.usersRegister);

router.route("/auth").post(controllerUsers.usersAuthenticate);

module.exports = router;
