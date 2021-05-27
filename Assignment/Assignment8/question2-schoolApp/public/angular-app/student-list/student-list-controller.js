angular.module("schoolApp").controller("StudentsController", StudentsController);

function StudentsController(StudentDataFactory, $route) {
  const vm = this;
  vm.title = "Mean School App";
  vm.isSubmitted = false;
  StudentDataFactory.getAllStudents().then(function (response) {
    vm.students = response;
  });

  vm.addStudent = function () {
    const newStudent = {
      name: vm.newStudentName,
      gpa: vm.newStudentGpa,
      studentNumber: vm.newStudentNumber
    
    };
    if (vm.studentForm.$valid) {
      console.log(newStudent);
      StudentDataFactory.addOneStudent(newStudent)
        .then(function (response) {
          console.log("student saved");
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

