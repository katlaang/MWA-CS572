const mongoose = require("mongoose");
const Driver = mongoose.model("Driver");



module.exports.standingGetAll= function(req, res){
console.log("GET all standings for a driver");
const driverId= req.params.driverId;
Driver.findById(driverId).select("standings").exec(function(err, driver){
    const response = {
        status: 200,
        message: ""

    }
    if (err) {
        console.log("Error finding driver");
        response.status = 500;
        response.message = err;
    } else if (!driver) {
        console.log("Game id not founf in the database", driverId);
        response.status = 404;
        response.message = { "message": "Game Id not found " + driverId};
    } else {
        response.message = driver.standings;
    }
    console.log("GET standings with driverId", driverId);
    res.status(response.status).json(response.message);
});

};