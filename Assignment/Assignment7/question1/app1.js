require("./api/data/db");
// require("./api/data/dbconnection").open();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api/routes");

app.set("port", 3000);

app.use(function (req, res, next) {
  //This will log for every thing
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public"))); // This is termination point
// app.use("node_modules", express.static(path.join(__dirname, "node_modules")));
// app.use(express.urlencoded({extended:false}));
app.use(express.json({ extended: false })); //work for form

app.use("/api", routes);

app.get("/file", function (req, res) {
  console.log("File request received");
  res.status(200).sendFile(path.join(__dirname, "app03.js"));
});

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to the port " + port);
});
