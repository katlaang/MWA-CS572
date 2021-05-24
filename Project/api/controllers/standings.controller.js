const mongoose = require("mongoose");
const Driver = mongoose.model("Driver");


module.exports.standingsGetAll = function (req, res) {
    console.log("Get all standings for a game");
    const driverId = req.params. driverId;
   Driver.findById(driverId).select("standings").exec(function (err, driver) {
        const response = {
            status: 200,
            message: ""

        }
        if (err) {
            console.log("Error finding  driver");
            response.status = 500;
            response.message = err;
        } else if (!driver) {
            console.log(" driver id not founf in the database",  driverId);
            response.status = 404;
            response.message = { "message": " driver Id not found " +  driverId };
        } else {
            response.message = driver.standings;
        }
       console.log("GET publishers with gameid",  driverId);
        res.status(response.status).json(response.message);

    });
};