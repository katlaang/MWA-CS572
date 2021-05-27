const express= require("express");
const router= express.Router();
const studentController= require("../controllers/student.controller");
const addressController=require("../controllers/address.controller");

router.route("/students")
    .get(studentController.studentsGetAll)
    .post(studentController.studentsAddOne);


router.route("/students/:studentId")
      .get(studentController.studentsGetOne)
      .put(studentController.studentsFullUpdateOne)
      .patch(studentController.StudentsPartialUpdateOne)
      .delete(studentController.studentsDeleteOne);

router.route("/students/:studentId/addresses")
    .get(addressController.addressGetAll)
    .post(addressController.addressAddOne)
    .put(addressController.addressFullUpdate)
    .patch(addressController.addressPartialUpdateOne)
    .delete(addressController.addressDeleteOne);


router.route("/students/:studentId/addresses/:zipcode")
    .get(addressController.addressGetAll);

module.exports=router;