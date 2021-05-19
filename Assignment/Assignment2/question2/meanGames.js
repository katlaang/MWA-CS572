const express= require("express");
const app= express();

const path= require("path");
const port=5000;

app.use("/games", express.static(path.join(__dirname, "public")));
