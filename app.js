const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var day = "";
  var date = new Date();
  var currentDay = date.getDay();

  if (currentDay === 6 || currentDay === 0) {
    day = "the weekend!";
    //res.send("It's the weekend!");
  } else {
    day = "a workday!";
    res.render('list', {today: day});
  }
});

app.post("/", function (req, res) {});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
