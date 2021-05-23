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


const _addAddress = function (req, res, student) {
    console.log("req.body", req.body);
    student.address = {};
    student.address.city = req.body.city;
    student.address.street= req.body.street;
    student.address.state= req.body.state;
    student.address.zipcode= parseInt(req.body.zipcode)
    student.save(function (err, updatedStudent) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedStudent;
        }
        res.status(response.status).json(response.message);

    });
};

module.exports.addressAddOne = function (req, res) {
    console.log("add one address for a student");
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function (err, student) {
        const response = {
            status: 201,
            message: student
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!student) {
            console.log("Student id not fond in database");
            response.status = 404;;
            response.message = { "message": "Student id not found: " + studentId };
        }

        //This decides how to send a response
        if (student) {
            _addAddress(req, res, student);
        } else {
            res.status(response.status).json(response.message);
        }

    });

};

module.exports.addressFullUpdate = function (req, res) {
    console.log("updating publisher for a game");
    const studentId = req.params.studentId;
    //const publisherId= req.params.publisherId;
    console.log("PUT studentId", studentId);
    Student.findById(studentId).select("publisher").exec(function (err, student) {
        const response = {
            status: 204,
            message: student
        };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;

        } else if (!student) {
            console.log("no game");
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);

        } else {
            console.log("Student found");
            _updateAddress(req, res, student);

        }

    });
};

const _updateAddress = function (req, res, student) {
    console.log("student to update" + student);
    console.log("req.body", req.body);
    student.address.city = req.body.city;
    student.address.street = req.body.street;
    student.address.state = req.body.state;
    student.address.zipcode = parseInt(req.body.zipcode)
    student.save(function (err, updatedStudent) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedStudent;
            console.log("Address updated");
        }
        res.status(response.status).json(response.message);
    });
};


module.exports.addressPartialUpdateOne = function (req, res) {
    console.log("Partially updating a student address");
    const studentId = req.params.studentId;
    console.log("PATCH studentId", studentId);
    Student.findById(studentId).select("address").exec(function (err, student) {
        const response = {
            status: 204,
            message: "Update Successful!"
        };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;

        } else if (!student) {
            console.log("no student");
            response.status = 404;
            response.message = { "message": "student ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);

        } else {
            console.log("student found");
            _partialUpdateAddress(req, res, student);

        }

    });
};

const _partialUpdateAddress = function (req, res, student) {
    console.log("student to update" + student);
    console.log("req.body", req.body);
    //update
    if (req.body.city) {
        student.address.city = req.body.city;
    }
    if (req.body.street) {
        student.address.street = req.body.street;
    }
    if (req.body.state) {
        student.address.state = req.body.state;
    }
    if (req.body.zipcode) {
        student.address.zipcode = parseInt(req.body.zipcode);
    }

    student.save(function (err, updatedStudent) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedStudent;
            console.log("publisher updated");
        }
        res.status(response.status).json(response.message);
    });

};

module.exports.addressDeleteOne = function (req, res) {
    console.log("Delete controller reached");
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function (err, student) {
        const response = {
            status: 204,
            message: "Successful Update!"
        };
        if (err) {
            console.log("Error finding student");
            response.status = 500;
            response.message = err;

        } else if (!student) {
            console.log("no student");
            response.status = 404;
            response.message = { "message": "student ID not found" };
        }


        if (response.status !== 204) {
            res.status(response.status).json(response.message);

        } else {
            console.log("student found");
            _deleteAddress(req, res, student);

        }

    });
};
const _deleteAddress = function (req, res, student) {

    console.log("address to delete" + student);
    console.log("req.body", req.body);
    student.address.remove();
    student.save(function (err, updatedStudent) {
        const response = {
            status: 200,
            message: ""
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = updatedStudent;
            console.log("address removed");
        }
        res.status(response.status).json(response.message);
    });


}



