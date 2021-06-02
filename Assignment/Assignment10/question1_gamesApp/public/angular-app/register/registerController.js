angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController($http){
    const vm=this;
    vm.register=function(){
        const newUser={
            name: vm.name,
            username:vm.username,
            password:vm.password
        };
        if(!vm.username || !vm.password){
            vm.err="Please add a username and password";
        }else{
            if(vm.password!==vm.passwordRepeat){
                vm.err="Please make sure the passwords match";
            }else{

                $http.post("/api/users", newUser).then(function(result){
                    console.log(result);
                    vm.message="Successful resgistration, please login";
                    vm.err="";// remove error if you have successful registration
                }).catch(function(err){
                    console.log(err);
                });
            }
        }
    };
}