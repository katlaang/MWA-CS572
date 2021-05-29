angular.module("meanJobSearch").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http) {
  return {
    jobsGetAll: jobsGetAll,
    jobsGetOne: jobsGetOne,
    jobsAddOne: jobsAddOne,
    jobEditOne: jobEditOne,
    jobsDeleteOne: jobsDeleteOne,
  };

  function jobsGetAll() {
    return $http.get("/api/jobs").then(complete).catch(failed);
  }

  function jobsGetOne(id) {
    return $http
      .get("/api/jobs/" + id)
      .then(complete)
      .catch(failed);
  }
  function jobEditOne(jobId, job){
   return $http
    .put("/api/jobs/" +jobId, job)
    .then(complete)
    .catch(failed);
  }
  function jobsAddOne(job) {
    return $http
    .post("/api/jobs/", job)
    .then(complete)
    .catch(failed);
  }

  function jobsDeleteOne(jobId) {
    return $http
      .delete("/api/jobs/" + jobId)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error.status.statusText;
  }
}