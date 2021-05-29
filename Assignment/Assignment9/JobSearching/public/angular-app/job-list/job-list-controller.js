angular.module("meanJobSearch").controller("JobsController", JobsController);

function JobsController(JobDataFactory, $route, $scope) {
  const vm = this;
  vm.title = "Mean Job Search App";
  vm.isSubmitted = false;

  JobDataFactory.jobsGetAll().then(function (response) {
    vm.jobs = response;
  });

  vm.addJob = function () {
    const newJob = {

      title:vm.newJobTitle,
      salary:vm.newJobSalary,
      description:vm.newJobDescription,
      skills:vm.newJobSkills,
      experience:vm.newJobExperience,
      postDate:vm.newJobPostDate,
    };
    if (vm.jobForm.$valid) {
      console.log(newJob);
      JobDataFactory.jobsAddOne(newJob)
        .then(function (response) {
          console.log("job saved");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // else{
    //     vm.isSubmitted=true;
    // }
  };
}

