require("./api/data/db");

const express= require("express");
const app= express();
const path=require("path");
const routes= require("./api/routes");

app.set("port", 4000);

app.use(function(req, res, next){
console.log(req.method, req.url);
next();

});

app.use(express.static(path.join(__dirname, "public")));//for use with public folder to serve static files

app.use(express.json({extended:false}));


app.use("/api", routes);

 app.get("/file", function (req, res) {
   console.log("File request received");
   res.status(200).sendFile(path.join(__dirname, "app.js"));
 });

const server=app.listen(app.get("port"), function(){
    const port=server.address().port;
    console.log("Listening to port "+port);
});