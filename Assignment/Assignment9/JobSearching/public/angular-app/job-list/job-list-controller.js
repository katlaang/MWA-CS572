angular.module("meanJobSearch").controller("JobsController", JobsController);

function JobsController(JobDataFactory, $route, $scope) {
  const vm = this;
  vm.number=0;
  vm.title = "Mean Job Search App";
  vm.isSubmitted = false;

  JobDataFactory.jobsGetAll(vm.pages).then(function (response) {
    vm.jobs = response;
  });

  //pagination
  vm.nextPage = function () {
    if (vm.jobs.length == 5) {
      vm.number = vm.number + 5;
      JobDataFactory.jobsGetAll(vm.number)
        .then(function (response) {
          vm.jobs = response;
        })
    }
  }


  vm.previousPage = function () {
  if (vm.number >= 5)
    vm.number = vm.number - 5;
  jobDataFactory.jobsGetAll(vm.number).then(function (response) {
    vm.jobs = response;
  });
  }


vm.addJob = function () {
  const newJob = {

    title: vm.newJobTitle,
    salary: vm.newJobSalary,
    description: vm.newJobDescription,
    skills: vm.newJobSkills,
    experience: vm.newJobExperience,
    postDate: vm.newJobPostDate,
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
  $route.reload();
  // else{
  //     vm.isSubmitted=true;
  // }
};
}

