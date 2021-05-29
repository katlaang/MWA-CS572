const express = require("express");
const router = express.Router();
const jobController= require("../controllers/job.controller");
const locationController= require("../controllers/location.controller");


router
.route("/jobs")
.get(jobController.jobsGetAll)
.post(jobController.jobsAddOne);

router
  .route("/jobs/:jobId")
  .get(jobController.jobsGetOne)
  .put(jobController.jobsReplaceOne)
  .patch(jobController.jobsPartialUpdateOne)
  .delete(jobController.jobsDeleteOne);


  router
  .route("/jobs/:jobId/location")
  .get(locationController.locationGetAll)
  .post(locationController.locationAdd)
  .put(locationController.locationFullUpdate)
  .patch(locationController.locationPartialUpdate)
  .delete(locationController.locationDelete);


















module.exports=router;