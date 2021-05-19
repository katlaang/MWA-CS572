const express= require("express");
const app= express();

const path= require("path");

const routes= require("./route");

app.set("port", 3000);


app.use(routes);


app.listen(app.get('port'), function() {
    console.log("server is is listening at port " + app.get('port'));
})
