const mongoose= require("mongoose");

const addressSchema= new mongoose.Schema({
    city:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    }
});

const studentSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        min:0,
        max:4,
        "deafault": 0
    },
    studentId:{
        type: Number,
        required:true
    },
    address: addressSchema
   

});

mongoose.model("Student", studentSchema);