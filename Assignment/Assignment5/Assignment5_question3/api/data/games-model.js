const mongoose = require("mongoose");

const reviewSchema=new mongoose.Schema({
  name:{
    type: String,
    //required: true
  },

  description:{
    type: String,
   // required: true
  },
  date: {
     type: Date, default: Date.now 
    },
});


const publisherSchema= new mongoose.Schema({
  name: String,
  country: String
  
});
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required:true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1, // default is a keyword in schema, so put in quotes,
    // and a default value if user does not provide a rate
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
    required:true
  },
  maxPlayers:{
    type:Number,
    required: true
  },
  minAge:{
    type:Number,
    required: true
  },
  designers: String,
  publisher:publisherSchema,
  review:[reviewSchema]
});

mongoose.model("Game", gameSchema, "games");
mongoose.model("Publisher", publisherSchema);
mongoose.model("Review", reviewSchema)
// if collection 'games' is not provided, it will take the
// plural version of 'Game' which would be 'games'
