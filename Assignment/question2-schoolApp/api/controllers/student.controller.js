const { ReplSet } = require("mongodb");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
require("./address.controller");



module.exports.studentsGetAll = function (req, res) {//done
    console.log("get the students");
    console.log(req.query);
    const offset = 0;
    const count = 10;
    const maxCount = 15;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {

        res
            .status(400)
            .json({ message: "QueryString Offset and Count must be a number" });
    }
    // count check
    if (count > maxCount) {
        res
            .status(400)
            .json({ message: "QueryString Count must not exceed " + maxCount });
    } else {

        Student.find()
            .skip(offset)
            .limit(count)
            // .select("students")
            .exec(function (err, students) {
                console.log("Students found", students);
                // error check
                if (err) {
                    console.log("Error ", err);
                    res.status(500).json(err);
                } else {
                    console.log("Found students", students);
                    res.status(200).json(students);
                }
            });

    }
};

module.exports.studentsGetOne = function (req, res) {//done
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        const response = {
            status: 200,
            message: student
        }
        // console.log("The exec result is"+game);
        if (err) {//error check
            console.log("Error finding student");
            res.status = 500;
            response.message = error;
        } else if (!student) {//result check

            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        res.status(response.status).json(response.message);
    });
}


//CRUD operations

//ADD One student

module.exports.studentsAddOne = function (req, res) {
    console.log("POST new student");
    const response = {
        status: 201,
        message: "",
    };
    console.log(req.body);
    console.log("adding a new Student");
    let newStudent = new Student();
    if (req.body.name)
        newStudent.name = req.body.name;
    if (req.body.studentNumber)
        newStudent.studentNumber = parseFloat(req.body.studentNumber);
    if (req.body.gpa)
        newStudent.gpa = parseFloat(req.body.gpa);

    newStudent.save(function (err, student) {
        console.log("The callback student is: " + student);
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.message = student;
        }
        res.status(response.status).json(response.message);
    });

};

//FullUpdate Student


module.exports.studentsFullUpdateOne = function (req, res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        const response = {
            status: 204,
            message: `Student with id ${studentId} was updated`
        }
        // console.log("The exec result is"+game);
        if (err) {//error check
            console.log("Error finding student");
            res.status = 500;
            response.message = err;
        } else if (!student) {//result check
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            //update the game
            student.name = req.body.name;
            student.studentNumber = req.body.studentNumber;
            student.gpa = req.body.gpa;
            student.save(function (err, updatedStudent) {
                if (err) {
                    console.log("there is an error");
                    response.status = 500;
                    response.message = err;
                    res.status(response.status).json(response.message);
                } else {
                    console.log("updated");

                    //response.message = `Game with id ${ gameId } was updated`
                    return res.status(response.status).json({ message: "Success" });
                }

            });
        }

    });
}



//Student partial Update

module.exports.StudentsPartialUpdateOne = function (req, res) {
    console.log("updating");
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        // first hardening
        const response = {
            status: 204,
            message: student,
        };
        if (err) {
            console.log("Error finding student: " + studentId);
            response.status = 500;
            response.message = err;
        } else if (!student) {
            response.status = 404;
            response.message = { message: "Student ID not found" }; //err
        }

        if (response.status !== 204) {
            res.status(response.status).json({ message: "Successfully Updated" });
        } else {
            // Update student
            if (req.body.name) {
                student.name = req.body.name;
            }
            if (req.body.gpa) {
                student.gpa = req.body.gpa;
            }

            if (req.body.studentId) {
                student.studentId = req.body.studentId;
            }

            student.save(function (err, updatedStudent) {
                if (err) {
                    response.status = 500;
                    response.message = err;
                } else {
                    response.status = 204;
                    //response.message = "Successfully Updated";
                    res.status(response.status).json({message: "Successfully Updated"});
                }
                
            });
        }
    });
};

//Delete student
module.exports.studentsDeleteOne = function (req, res) {
    console.log("Delete a student controller reached.");
    const studentId = req.params.studentId;
    Student.findByIdAndDelete(studentId).exec(function (err, deletedStudent) {
        console.log("deleted id");
        const response = {
            status: 200,
            message: deletedStudent,
        };
        if (err) {
            console.log("Error finding game: " + studentId);
            response.status = 500;
            response.message = err;
        } else if (!deletedStudent) {//result check

            response.status = 404;
            response.message = { "message": "Student not found" };
        }
        res.status(response.status).json(response.message);
    });
};






