const fib= function(num){
    if(num<=2){
        return 1;

    }else{
        return fib(num-1) +fib(num-2);
    }

}
console.log("finding fib "+ fib(45));