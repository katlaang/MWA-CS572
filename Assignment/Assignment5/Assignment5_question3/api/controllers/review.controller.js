const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function (req, res) {
    console.log("Get all reviews for a game");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 200,
            message: ""

        }
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Game id not founf in the database", gameId);
            response.status = 404;
            response.message = { "message": "Game Id not found " + gameId };
        } else {
            response.message = game.review;
        }
        console.log("GET reviews with gameid", gameId);
        res.status(response.status).json(response.message);

    });
};

module.exports.reviewGetOne = function (req, res) {
    console.log("Get one review for a game");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).exec(function (err, game) {


        if (!game) {
            res.status = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: "OK", review: game.review[0] });
        } else {
            res.status = 500;
        }
        res.status(200).json(review);

    });

};

const _addReview = function (req, res, game) {
    console.log("req.body", req.body);
    game.review.push({
        name: req.body.name,
        description: req.body.description,
    });
    //game.review.name = req.body.name;
    // game.review.date = req.body.date;
    //game.review.description = req.body.description;
    game.save(function (err, updatedGame) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedGame;
        }
        res.status(response.status).json(response.message);

    });
};

module.exports.reviewsAddOne = function (req, res) {
    console.log("add one review for a game");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            console.log("Game id not fond in database");
            response.status = 404;;
            response.message = { "message": "Game id not found: " + gameId };
        }

        //This decides how to send a response
        if (game) {
            _addReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });

};




module.exports.reviewsFullUpdate = function (req, res) {
    console.log("updating review for a game");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("PUT gameId", gameId);
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = { 
            status: 204,
            message:""
        };
        if (!game) {
            return res.status(404).json({ "message": "Game not found" });

        } else if (err) {
            return res.status(500).json(err);
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            const thisReview= game.review.id(reviewId);
            thisReview.name = req.body.name;
            thisReview.description = req.body.description;
            _updateReview(req, res, game);
        }

    });
};

module.exports.reviewspartialUpdate = function (req, res) {
    console.log("updating review for a game");
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    console.log("PUT gameId", gameId);
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 204,
            message: ""
        };
        if (!game) {
            return res.status(404).json({ "message": "Game not found" });

        } else if (err) {
            return res.status(500).json(err);
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            const thisReview = game.review.id(reviewId);
            if(req.body.name){
                thisReview.name = req.body.name;
            }
            if(req.body.description){
                thisReview.description = req.body.description;
            }
            
            _updateReview(req, res, game);
        }

    });
};



const _updateReview = function (req, res, game) {
    console.log("game to update" + game);
    console.log("req.body", req.body);
    game.save(function (err, updatedGame) {
        const response = {
            status: 204,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedGame.reviews;
            console.log("review updated");
        }
        res.status(response.status).json(response.message);
    });
};


module.exports.reviewsDeleteOne = function (req, res) {
    console.log("Delete controller reached");
    const gameId = req.params.gameId;
    const reviewId= req.params.reviewId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 204,
            message: "Successful Update!"
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;

        } else if (!game) {
            console.log("no game");
            response.status = 404;
            response.message = { "message": "Game ID not found" };
        }


        if (response.status !== 204) {
            res.status(response.status).json(response.message);

        } else {
            console.log("Game found");
            _deleteReview(req, res, game);

        }

    });
};
const _deleteReview = function (req, res, game) {
   
    const thisReview = game.review.id(reviewId);
    console.log("delete helper method");
    console.log("review to delete" + game);
    console.log("req.body", req.body);
    thisReview.remove();
    game.save(function (err, updatedGame) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedGame;
            console.log("publisher removed");
        }
        res.status(response.status).json(response.message);
    });


}