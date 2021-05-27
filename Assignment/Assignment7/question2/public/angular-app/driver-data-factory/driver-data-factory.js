angular.module("meanRacing").factory("DriverDataFactory", DriverDataFactory)

function DriverDataFactory($http) {
    return {
        getAllDrivers: getAllDrivers,
        getOneDriver: getOneDriver
    };
    function getAllDrivers(){
        return $http.get("/api/drivers").then(complete).catch(failed);
    };
    function getOneDriver(id) {
        return $http.get("/api/drivers/" + id).then(complete).catch(failed);
    };
    function complete(response){
        console.log(response.data);
        return response.data;
    };
    function failed(error){
        return error.status.statusText;
    }
}