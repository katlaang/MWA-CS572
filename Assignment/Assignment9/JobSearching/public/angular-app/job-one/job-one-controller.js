angular.module("meanJobSearch").controller("JobController", JobController);


function JobController(JobDataFactory, $routeParams, $route, $location) {
  const vm = this;
  const jobId = $routeParams.jobId;
  JobDataFactory.jobsGetOne(jobId)
    .then(function (job) {
      vm.job = job;
    })
    .catch(function (error) {
      console.log(error);
    });

  vm.jobsDeleteOne = function () {
    JobDataFactory.jobsDeleteOne(jobId)
      .then(function (job) {
        console.log("job deleted ", job);
      })
      .catch(function (error) {
        console.log(error);
      });
    $route.reload();
  };
}