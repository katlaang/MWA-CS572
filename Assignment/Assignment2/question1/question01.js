const express= require("express");
const app= express();

const port=5000;

app.get("/", function(req, res){
    res.send("Game app homepage");
});

app.listen(port, function(){
    console.log("Listening to port:  "+ port);
});

