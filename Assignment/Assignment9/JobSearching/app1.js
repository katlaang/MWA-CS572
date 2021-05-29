require("./api/data/db");

const express = require("express");
const app = express();
const routes = require("./api/routes");
const path = require("path");


app.set("port", 4000);


  //app.use(bodyParser.urlencoded({ extended: true }));
 //app.use(bodyParser.json());

app.use(express.json()); 

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));
//app.use("node_modules", express.static(path.join(__dirname, "node_modules")));

const server = app.listen(app.get("port"), function () {
  const port = server.address().port;
  console.log("Listening to port", port);
});
