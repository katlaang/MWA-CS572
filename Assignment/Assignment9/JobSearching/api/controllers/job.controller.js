const mongoose = require("mongoose");
const Job = mongoose.model("Job");
require("./location.controller");

module.exports.jobsGetAll = function (req, res) {
  console.log("Get all jobs");
  console.log(req.query);

  let offset = 0;
  let count = 5;
  const maxCount = 10;

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
    return;
  }
  if (count > maxCount) {
    res
      .status(400)
      .json({ message: "QueryString Count must not exceed " + maxCount });
  } else {
    Job.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, jobs) {
        if (err) {
          console.log("Error: ", err);
          res.status(500).json(err);
        } else {
          console.log("Found jobs", jobs.length);
          res.status(200).json(jobs);
        }
      });
  }
};

module.exports.jobsGetOne = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = "Job ID not found";
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsAddOne = function (req, res) {
  console.log("Adding a job");
  console.log(req.body);
  const response = {
    status: 201,
    message: "",
  };

  const newJob= {
    title: req.body.title,
    salary :parseInt( req.body.salary),  
    description : req.body.description,
    skills : req.body.skills.split(","),
    experience : req.body.experience,
    postDate : req.body.postDate
  }
    Job.create(newJob, function(err, job){
        if(err){
             response.status = 500;
             response.message = err;
        }else{
            console.log("Job added successfully", job);
            response.status = 201;
            response.message = job;
        }
         res.status(response.status).json(response.message);
    });

};

module.exports.jobsReplaceOne= function(req, res){
console.log("Replacing one job posting");
const jobID = req.params.jobId;
console.log(req.body);

Job.findById(jobID).exec(function (err, job) {
  const response = {
    status: 204,
    message: job,
  };
  if (err) {
    console.log("Error finding job" + jobID);
    response.status = 500;
    response.message = err;
  } else if (!job) {
    response.status = 404;
    response.message = { message: "Job id not found" };
  }
  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    job.title = req.body.title;
    job.salary = parseInt(req.body.salary);
    job.description = req.body.description;
    job.skills = req.body.skills.split(",");
    job.experience = req.body.experience;
    job.postDate = req.body.postDate;

    job.save(function (err, replacedJob) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 204;
        response.message = { message: "replacedJob" };
      }
      res.status(response.status).json(response.message);
    });
  }
});

};



module.exports.jobsPartialUpdateOne = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    // first hardening
    const response = {
      status: 204,
      message: job,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      if (req.body.title) {
        job.title = req.body.title;
      }
      if (req.body.salary) {
        job.salary =parseInt( req.body.salary);
      }
      if (req.body.description) {
        job.description = req.body.description;
      }
      if (req.body.currentStatus) {
        job.currentStatus = req.body.currentStatus;
      }
      if (req.body.skills) {
        job.skills = req.body.split(",");
      }
      if (req.body.experience) {
        job.experience = req.body.experience;
      }

      if (req.body.postDate) {
        job.postDate = req.body.postDate;
      }

      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          //console.log(updatedJob);
          response.status = 204;
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};

module.exports.jobsDeleteOne= function(req, res){
  console.log("Deleting a job");

  const jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    const response = {
      status: 204,
      message: deletedJob,
    };
    if (err) {
      console.log("Error finding job: " + jobId);
      response.status = 500;
      response.message = err;
    } else if (!deletedJob) {
      response.status = 404;
      response.message = { message: "Job not found" };
    }
    console.log("Job deleted" + jobId);
    res.status(response.status).json(response.message);
  });
};
