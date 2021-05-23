const mongoose = require("mongoose");
const Driver = mongoose.model("Driver");

//require("./standings.controller");

module.exports.driversGetAll = function (req, res) {

    console.log("GET all drivers");
    console.log(req.query);

    let offset = 0;
    let count = 10;
    let maxCount = 15;


    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {

        res.status(400).json({ message: "QueryString Offset and Count must be a number" });
    }
    // count check
    if (count > maxCount) {
        res.status(400).json({ message: "QueryString Count must not exceed " + maxCount });
    } else {
        Driver.find().skip(offset).limit(count).exec(function (err, drivers) {
            //checking errors
            if (err) {
                console.log("ERROR", err);
                res.status(500).json(err);
            } else {
                console.log("Driver found: ", drivers);
                res.status(200).json(drivers)
            }
        });
    }

};

module.exports.driverGetOne = function (req, res) {
    console.log("GET a driver");
    const driverId = req.params.driverId;

    Driver.findById(driverId).exec(function (err, driver) {
        const response = {
            status: 200,
            message: driver
        }
        if (err) {
            console.log("Error finding driver");
            res.status = 500;
            response.message = err;
        } else if (!driver) {
            response.status = 404;
            response.message = { "message": "Driver Id not found" };
        }
        res.status(response.status).json(response.message);

    });


};

module.exports.driversAddOne = function (req, res) {
    console.log("POST new driver");
    const response = {
        status: 201,
        message: ""
    };
    console.log(req.body);
    console.log("Adding a new Driver");

    let newDriver = new Driver();
    if (req.body.name) {
        newDriver.name = req.body.name;

    }
    if (req.body.country) {
        newDriver.country = req.body.country;
    }

    if (req.body.age) {
        newDriver.age = parseInt(req.body.age);
    }

    if (req.body.currentTeam) {
        newDriver.currentTeam = req.body.currentTeam;
    }

    if (req.body.startingYear) {
        newDriver.startingYear = parseInt(req.body.startingYear);
    }
    if (req.body.currentStatus) {
        newDriver.currentStatus = req.body.currentStatus
    }

    newDriver.save(function (err, driver) {
        console.log("added driver" + driver);

        if (err) {
            if (err.name == "ValidationError") {
                console.error("Validation Error: ", err);
                res.status(422).json(err);
            }
            console.log("There was an error");
            response.status = 500;
            response.message = err;
            res.status(response.status).json(response.message);
        } else {
            console.log("updated");
            return res.status(response.status).json({ message: "Success" });

        }
    });

};

module.exports.driverFullUpdateOne = function (req, res) {
    console.log("Full update of a driver");
    const driverId = req.params.driverId;
    Driver.findById(driverId).exec(function (err, driver) {
        const response = {
            status: 204,
            message: `DRiver with id ${driverId} was updated`
        }
        if (err) {
            console.log("Error finding driver");
            res.status = 500;
            response.message = err;
        }else if(!driver){
            response.status=400;
            response.message = { "message": "Driver Id not found" }
        }

        if(response.status!==204){
            res.status(response.status).json(response.message);
        }else{
            console.log("updating")
            //update the driver
            driver.name=req.body.name;
            driver.country = req.body.country;
            driver.age = parseInt(req.body.age);
            driver.currentTeam = req.body.currentTeam;
            driver.startingYear = parseInt(req.body.startingYear);
            driver.currentStatus = req.body.currentStatus
            driver.save(function(err, updatedDriver){
        if(err){
            if (err.name == "ValidationError") {
                console.error("Validation Error: ", err);
                res.status(422).json(err);
            }
            console.log("There was an error");
            response.status=500;
            response.message=err;
            res.status(response.status).json(response.message);
        }else{
            console.log("updated");
            return res.status(response.status).json({ message: "Success" });

        }
            });
        }
    });
}
