

const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const standingsController = require("../controllers/standings.controller");


router.route("/drivers")
    .get(driverController.driversGetAll)
    .post(driverController.driversAddOne);


router.route("/drivers/:driverId")
    .get(driverController.driverGetOne)
    .put(driverController.driverFullUpdateOne)
    .patch(driverController.driverPartialUpdateOne)
    .delete(driverController.driverDelete);

router.route("/drivers/:driverId/standings")
    .get(standingsController.standingsGetAll);


module.exports = router;// Do not forget!!