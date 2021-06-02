angular.module("meanRacing").factory("DriverDataFactory", DriverDataFactory);

function DriverDataFactory($http) {
  return {
    getAllDrivers: getAllDrivers,
    getOneDriver: getOneDriver,
    addOneDriver: addOneDriver,
    updateOneDriver: updateOneDriver,
    deleteOneDriver: deleteOneDriver,
  };

  function getAllDrivers(number) {
    return $http
      .get("/api/drivers?offset=" + number + "&count=10")
      .then(complete)
      .catch(failed);
  }

  function getOneDriver(id) {
    return $http
      .get("/api/drivers/" + id)
      .then(complete)
      .catch(failed);
  }

  function addOneDriver(driver) {
    return $http
    .post("/api/drivers/", driver)
    .then(complete)
    .catch(failed);
  }
  
function updateOneDriver(driverId, driver) {
  return $http
    .put("/api/drivers/" + driverId, driver)
    .then(complete)
    .catch(failed);
}

  function deleteOneDriver(driverId) {
    return $http
      .delete("/api/drivers/" + driverId)
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