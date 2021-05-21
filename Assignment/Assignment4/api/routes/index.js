const express= require("express");
const router= express.Router();
const studentController= require("../controllers/student.controller");
const addressController=require("../controllers/address.controller");

router.route("/students").get(studentController.studentsGetAll);
router.route("/students/:studentId").get(studentController.studentsGetOne);

router.route("/students/:studentId/addresses").get(addressController.addressGetAll);
router.route("/students/:studentId/addresses/:zipcode").get(addressController.addressGetAll);

module.exports=router;