const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const reviewSchema= new mongoose.Schema({
    posterName:{
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },

    review:{
        type: String,
        required:true
    }

})


const jobSchema = new mongoose.Schema({
  title: {
    type: String,
   required: true
  },
  salary: {
    type: Number,
    required: true
  },
description:{
    type: String,
    required: true
},
  skills:{
    type: Array,
    required: true
  },
  

  experience: {
  type: String,
    required: true,
  },

  postDate: {
    type: Date,
    required: true
  },
  location: locationSchema,
  reviews: [reviewSchema]

});

mongoose.model("Job", jobSchema);
mongoose.model("Location", locationSchema);
mongoose.model("Review", reviewSchema);
