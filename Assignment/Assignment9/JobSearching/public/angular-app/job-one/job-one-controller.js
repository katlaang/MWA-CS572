angular.module("meanJobSearch").controller("JobController", JobController);


function JobController(JobDataFactory, $routeParams, $route, $location) {
  const vm = this;
  const jobId = $routeParams.jobId;
  JobDataFactory.jobsGetOne(jobId)
    .then(function (job) {
      vm.job = job;
      //included here to prefill the data
    /*   vm.editedJobTitle=vm.job.title;
      vm.editedJobSalary=vm.job.salary;
       vm.editedJobDescription = vm.job.description;
      vm.editedJobExperience = vm.job.experience;
      vm.editedJobSkills = vm.job.skills;
      vm.editedJobPostDate= vm.job.postDate; */
    })
    .catch(function (error) {
      console.log(error);
    });

    //update function

    vm.updateJob= function(){
      const editedJob = {
        title: vm.editedJobTitle,
        salary: vm.editedJobSalary,
        description: vm.editedJobDescription,
        skills: vm.editedJobSkills,
        experience: vm.editedJobExperience,
        postDate: vm.editedJobPostDate
      };
    
      JobDataFactory.jobEditOne(jobId, editedJob)
      .then(function(job){
        console.log(job);
      }).catch(function(error){
        console.log(error);
      });
      $route.reload();
    };



  vm.jobsDeleteOne = function () {
    JobDataFactory.jobsDeleteOne(jobId)
      .then(function (job) {
        console.log("job deleted ", job);
      })
      .catch(function (error) {
        console.log(error);
      });
    //$route.reload();
    $location.path("/");
  };
}