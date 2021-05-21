const mongoose=require("mongoose");
const Student= mongoose.model("Student");


module.exports.addressGetAll= function(req, res){
    console.log("Get all the student addresses");
    const studentId= req.params.studentId;
    Student.find({ "studentId": studentId }).select("address").exec(function (err, student) {
        console.log("Get address of students with studentId ", studentId);
        res.status(200).json(student);
    });

};

module.exports.addressGetOne=function(req, res){
    console.log("Get one address for a student");
    const  studentId = req.params.studentId;
    const zipcode= req.params.zipcode;
    Student.find({ "studentId": studentId }).select("address").exec(function (err, student) {
        const zipcode=student.address.zipcode(zipcode);
        console.log("Get address of students with studentId ", studentId);
        res.status(200).json(student.zipcode);
    });
}