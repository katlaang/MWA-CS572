
const { request } = require("express");
const express=require("express");
const numController= require('../controller/number.controller');
 const router= express.Router();

 //Home page route

 router.get("/", function(req, res){
res.send("return home page");

 });

 router.get("/:number1", numController.numberAddittion);
 

 module.exports= router;
