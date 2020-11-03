const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.get("/", function(req,res){
    console.log("Hello world");
});

app.post("/", function(){
    
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
