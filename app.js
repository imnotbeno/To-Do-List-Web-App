const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

//Array of new items
var items = [];
var workitems = [];

//Initializing the ejs module
app.set("view engine", "ejs");

//Initializing the body parser module
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  //Options for the date
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  // New instance of the class Date
  var date = new Date();

  // function to get the date in english with specific options
  var day = date.toLocaleDateString("en-UK", options);

  res.render("list", { listTitle: day, newitem: items });
});

app.post("/", function (req, res) {

  // get value from input/new item
  var item = req.body.newItem;

  if (req.body.list === "Work List") {
    workitems.push(item);
    res.redirect("/work");

  } else {
    //append new item into array of items
    items.push(item);

    //redirect to home route
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newitem: workitems });
});

app.post("/work", function (req, res) {
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
