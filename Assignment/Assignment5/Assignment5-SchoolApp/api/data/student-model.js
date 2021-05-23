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
    state:{
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
        required:true
    },
    studentNumber:{
        type: Number,
        unique: true,
        dropDups:true,
       required:true

    },
    address: addressSchema
   

});

mongoose.model("Student", studentSchema);
mongoose.model("Address", addressSchema);