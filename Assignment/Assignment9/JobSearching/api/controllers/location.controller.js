const mongoose = require("mongoose");
const Job = mongoose.model("Job");


module.exports.locationGetAll= function (req, res) {
  console.log("Get all locations for a job");
  const jobId = req.params.jobId;
 Job.findById(jobId)
    .select("location")
    .exec(function (err, job) {
      console.log("GET location for job with jobid ", jobId);
      res.status(200).json(job.location);
    });
};


const _addLocation = function (req, res, job) {
  console.log(req.body);
  job.location = {};
    job.location.companyName= req.body.companyName;
    job.location.city = req.body.city;
    job.location.state = req.body.state;

  job.save(function (err, updatedJob) {
    const response = {
      status: 200,
      message: "",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedJob;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.locationAdd = function (req, res) {
  console.log("Add one location to the job");
  const jobId = req.params.jobId;
  Job.findById(jobId)
    .select("location")
    .exec(function (err, job) {
      const response = {
        status: 201,
        message: job,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        console.log("Job is not in the database");
        response.status = 404;
        response.message = { message: "Job Id " + jobId + " not found." };
      } else if (job) {
        _addLocation(req, res, job);
      } else {
        res.status(response.status).json(response.message);
      }
    });
};

const _updateLocation = function (req, res, job) {

    job.location.companyName= req.body.companyName;
    job.location.city = req.body.city;
    job.location.state = req.body.state;
  
    job.save(function (err, updatedJob) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      // response.status = 204;
      // response.message = updatedJob;
      response;
    }
    res.status(response.status).json(response.message);
  });
};


module.exports.locationFullUpdate = function (req, res) {
  console.log("Update location for a job");
  const jobId = req.params.jobId;
  // const response = {
  //   status: 204,
  //   message: "",
  // };
  Job.findById(jobId)
    .select("location")
    .exec(function (err, job) {
      console.log("Update location for job with jobid ", jobId);
      // res.status(200).json(job.location);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        console.log("Job is not in the database");
        response.status = 404;
        response.message = { message: "Job Id " + jobId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _updateLocation(req, res, job);
      }
    });
};


const _locationPartialUpdate = function (req, res, job) {

    if(req.body.companyName)
        job.location.companyName=req.body.companyName;
    if (req.body.city) {
         job.location.city = req.body.city;
     }
    if (req.body.state) {
        job.location.state = req.body.state;
  }
  job.save(function (err, updatedJob) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedJob;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.locationPartialUpdate = function (req, res) {
  console.log("Update location partially for a job");
  const jobId = req.params.jobId;
  const response = {
    status: 204,
    message: "",
  };

  Job.findById(jobId)
    .select("location")
    .exec(function (err, job) {
      console.log("Update location for job withjobid ", jobId);
      // res.status(200).json(job.location);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        console.log("Job is not in the database");
        response.status = 404;
        response.message = { message: "Job Id " + jobId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _locationPartialUpdate(req, res, job);
      }
    });
};

const _deleteLocation = function (req, res, job) {
  job.location.remove();
  job.save(function (err, updatedJob) {
    const response = {
      status: 204,
      message: "Success",
    };
    if (err) {
      console.log("error", err);
      response.status = 500;
      response.message = err;
    } else {
      response.status = 204;
      response.message = updatedJob;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.locationDelete = function (req, res) {
  console.log("Update location for a job");
  const jobId = req.params.jobId;
  Job.findById(jobId)
    .select("location")
    .exec(function (err, job) {
      console.log("Delete location for job with jobid ", jobId);
      const response = {
        status: 204,
        message: "Success",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!job) {
        console.log("Job is not in the database");
        response.status = 404;
        response.message = { message: "Job Id " + jobId + " not found." };
      }
      if (response.status !== 204) {
        res.status(response.status).json(response.message);
      } else {
        _deleteLocation(req, res, job);
      }
    });
};
