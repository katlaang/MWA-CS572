const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const standingSchema = new mongoose.Schema({
    totalWins: {
        type: Number,
        required: true
    },
    totalPolePositions: {
        type: Number,
        required: true
    },
    totalStarts: {
        type: Number,
        required: true, default: 0
    },
    totalRaceEntries: {
        type: Number,
        required: true
    },
    totalRaceFinishes: {
        type: Number,
        required: true
    },
    totalPodiumFinishes: {
        type: Number,
        required: true, default: 0
    },
    totalChampionshipWins: {
        type: Number,
        reuired: true, default: 0
    }

});

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true, 
        required: true,
        dropDups:true
    },
    country: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
     currentStatus:{
       type: String, "enum":["active", "retired"],
         required: true
     },

    currentTeam: {
        type: String,
        required: true
    },
    startingYear:{
        type: Number,
    }, 
    standings: standingSchema

});

driverSchema.plugin(uniqueValidator)
mongoose.model("Driver", driverSchema);
mongoose.model("Standings", standingSchema);