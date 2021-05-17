const {spawn}= require("child_process");
console.log("1: step 1");
const child=spawn("node", ["fibbonacci/fibonacci.js"], {stdio: "inherit"} );
console.log("step2: end");