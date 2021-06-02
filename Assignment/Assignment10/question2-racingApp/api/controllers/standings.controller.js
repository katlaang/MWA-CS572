const mongoose = require("mongoose");
const Driver = mongoose.model("Driver");

module.exports.standingsGetAll = function (req, res) {
  console.log("Get all standings for a game");
  const driverId = req.params.driverId;
  Driver.findById(driverId)
    .select("standing")
    .exec(function (err, driver) {
      const standing = driver.standing;
      const response = {
        status: 200,
        message: "",
      };
      if (err) {
        console.log("Error finding  driver");
        response.status = 500;
        response.message = err;
      } else if (!driver) {
        console.log(" driver id not founf in the database", driverId);
        response.status = 404;
        response.message = { message: " driver Id not found " + driverId };
      } else {
        response.message = driver.standing ? driver.standing : [];
      }
      console.log("GET drivers with driverid", driverId);
      res.status(response.status).json(response.message);
    });
};

module.exports.standingsGetOne = function (req, res) {
  console.log("get one standing record for a driver");
  const driverId = req.params.driverId;
  //const standingId= req.params.standingId;
  Driver.find({ driverId: driverId })
    .select("standing")
    .exec(function (err, driver) {
      const response = {
        status: 200,
        message: "",
      };
      if (!driver) {
        console.log("Error find driver in database with id : ", driverId);
        respose.status = 404;
        response.message = { message: "Driver not found" };
      }
      if (!err) {
        response.message = driver.standing ? driver.standing : [];
      } else {
        console.log("Error finding driver");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const _addStanding = function (req, res, driver) {
  console.log("req.body", req.body);
  driver.standing = {};
  driver.standing.totalWins = parseInt(req.body.totalWins);
  driver.standing.totalPolePositions = parseInt(req.body.totalPolePositions);
  driver.standing.totalStarts = parseInt(req.body.totalStarts);
  driver.standing.totalRaceEntries = parseInt(req.body.totalRaceEntries);
  driver.standing.totalRaceFinishes = parseInt(req.body.totalRaceFinishes);
  driver.standing.totalPodiumFinishes = parseInt(req.body.totalPodiumFinishes);
  driver.standing.totalChampionshipWins = parseInt(
    req.body.totalChampionshipWins
  );

  driver.save(function (err, updatedDriver) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedDriver;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.standingAddOne = function (req, res) {
  console.log("add one standing for a driver");
  const driverId = req.params.driverId;
  Driver.findById(driverId)
    .select("standing")
    .exec(function (err, driver) {
      const response = {
        status: 201,
        message: driver,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!driver) {
        console.log("driver id not fond in database");
        response.status = 404;
        response.message = { message: "DRiver id not found: " + driverId };
      }

      //This decides how to send a response
      if (driver) {
        _addStanding(req, res, driver);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

module.exports.standingFullUpdate = function (req, res) {
  console.log("updating standing for a driver");
  const driverId = req.params.driverId;
  //const publisherId= req.params.publisherId;
  console.log("PUT driverId", driverId);
  Driver.findById(driverId)
    .select("standing")
    .exec(function (err, driver) {
      const response = {
        status: 204,
        message: driver,
      };
      if (err) {
        console.log("Error finding driver");
        response.status = 500;
        response.message = err;
      } else if (!driver) {
        console.log("no driver");
        response.status = 404;
        response.message = { message: "driver ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        console.log("Driver found");
        _updateStanding(req, res, driver);
      }
    });
};

const _updateStanding = function (req, res, driver) {
  console.log("game to update" + driver);
  console.log("req.body", req.body);
  driver.standing.totalWins = req.body.totalWins;
  driver.standing.totalPolePositions = req.body.totalPolePositions;
  driver.standing.totalStarts = req.body.totalStarts;
  driver.standing.totalRaceEntries = req.body.totalRaceEntries;
  driver.standing.totalRaceFinishes = req.body.totalRaceFinishes;
  driver.standing.totalPodiumFinishes = req.body.totalPodiumFinishes;
  driver.standing.totalChampionshipWins = req.body.totalChampionshipWins;
  driver.save(function (err, updatedDriver) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedDriver;
      console.log("standing updated");
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.standingPartialUpdateOne = function (req, res) {
  console.log("Partially updating a game standing");
  const driverId = req.params.driverId;
  console.log("PATCH driverId", driverId);
  Driver.findById(driverId)
    .select("standing")
    .exec(function (err, driver) {
      const response = {
        status: 204,
        message: "Update Successful!",
      };
      if (err) {
        console.log("Error finding driver");
        response.status = 500;
        response.message = err;
      } else if (!driver) {
        console.log("no driver");
        response.status = 404;
        response.message = { message: "Driver ID not found" };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        console.log("Driver found");
        _partialUpdateStanding(req, res, driver);
      }
    });
};

const _partialUpdateStanding = function (req, res, driver) {
  console.log("game to update" + driver);
  console.log("req.body", req.body);
  //update
  if (req.body.totalWins) driver.standing.totalWins = req.body.totalWins;
  if (req.body.totalPolePositions)
    driver.standing.totalPolePositions = req.body.totalPolePositions;
  if (req.body.totalStarts) driver.standing.totalStarts = req.body.totalStarts;
  if (req.body.totalRaceEntries)
    driver.standing.totalRaceEntries = req.body.totalRaceEntries;
  if (req.body.totalRaceFinishes)
    driver.standing.totalRaceFinishes = req.body.totalRaceFinishes;
  if (req.body.totalPodiumFinishes)
    driver.standing.totalPodiumFinishes = req.body.totalPodiumFinishes;
  if (req.body.totalChampionshipWins)
    driver.standing.totalChampionshipWins = req.body.totalChampionshipWins;

  driver.save(function (err, updatedDriver) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedDriver;
      console.log("standing updated");
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.standingDeleteOne = function (req, res) {
  console.log("Delete controller reached");
  const driverId = req.params.driverId;
  Driver.findById(driverId)
    .select("standing")
    .exec(function (err, driver) {
      const response = {
        status: 204,
        message: "Successful Update!",
      };
      if (err) {
        console.log("Error finding driver");
        response.status = 500;
        response.message = err;
      } else if (!driver) {
        console.log("no driver");
        response.status = 404;
        response.message = { message: "Game ID not found" };
      }

      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        console.log("Driver found");
        _deleteStanding(req, res, driver);
      }
    });
};
const _deleteStanding = function (req, res, game) {
  console.log("game to delete" + game);
  console.log("req.body", req.body);
  game.standing.remove();
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.message = updatedGame;
      console.log("standing removed");
    }
    res.status(response.status).json(response.message);
  });
};
