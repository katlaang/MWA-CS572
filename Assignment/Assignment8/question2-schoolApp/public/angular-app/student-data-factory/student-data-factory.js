angular.module("schoolApp").factory("StudentDataFactory",StudentDataFactory);

function StudentDataFactory($http) {
  return {
    getAllStudents: getAllStudents,
    getOneStudent: getOneStudent,
    addOneStudent: addOneStudent,
    deleteOneStudent: deleteOneStudent,
  };

  function getAllStudents() {
    return $http.get("/api/students").then(complete).catch(failed);
  }

  function getOneStudent(id) {
    return $http
      .get("/api/students/" + id)
      .then(complete)
      .catch(failed);
  }

  function addOneStudent(student) {
    return $http
    .post("/api/students/", student)
    .then(complete)
    .catch(failed);
  }


  function deleteOneStudent(studentId) {
    return $http
      .delete("/api/students/" + studentId)
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