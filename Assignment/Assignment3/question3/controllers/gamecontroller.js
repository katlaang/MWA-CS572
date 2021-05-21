const ObjectId = require("mongodb").ObjectId;
const dbconnection = require("../data/dbconnection");


module.exports.gamesGetAll = function (req, res) {
    console.log("Get the games");
    console.log(req.query);
    var offset = 0;
    var count = 3;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.offset) {
        count = parseInt(req.query.count);

    }
    const db = dbconnection.get();
    const collection = db.collection("games");
if(count<1||count >7){
    res.status(403).send("Disallowed Number of selections. Please selct between 1 and 7 games to view");
}else{

    collection.find().skip(offset).limit(count).toArray(function (err, docs) {//do pagination
        console.log("Found games ", docs);
        res.status(200).json(docs);
    });
}



};

module.exports.gamesGetThree= function(req, res){
    console.log("Get the list of games");
    const db = dbconnection.get();
    const collection = db.collection("games");
    collection.find().limit(3).toArray(function(err, docs){
        console.log("Found games", docs);
        res.status(200).json(docs);
    });

}


