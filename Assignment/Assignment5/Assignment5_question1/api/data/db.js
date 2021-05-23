const mongoose = require("mongoose");
require("./games-model.js");
const dbName = "meanGames";
const dbURL = "mongodb://localhost:27017/" + dbName;

// this is needed to connect
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Signal interrupt
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit(0);
  });
});

// Signal termination
process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit(0);
  });
});

// Signal restart
process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app restart");
    process.kill(process.pid, "SIGUSR2");
  });
});

// this is logging info
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (error) {
  console.log("Mongoose connection error " + error);
});
