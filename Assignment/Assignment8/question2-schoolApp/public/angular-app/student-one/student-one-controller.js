angular.module("schoolApp").controller("StudentController", StudentController);


function StudentController(StudentDataFactory,$routeParams,$route){
    const vm=this;
    const studentId=$routeParams.studentId;
    StudentDataFactory.getOneStudent(studentId).then(function(student){
        vm.student=student;
    }).catch(function(error){
        console.log(error);
    });


    vm.deleteOneStudent=function(){
        StudentDataFactory.deleteOneStudent(studentId).then(function(student){
            console.log("student deleted ", student);
        }).catch(function(error){
            console.log(error);
        });

        $route.reload();
    };
  
}