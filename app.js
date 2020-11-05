const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

//Establish connection and create database
mongoose.connect("https://mongodb://localhost:27017/todolistDB", {useNewUrlParser:true},{useUnifiedTopology: true});

//Initializing the ejs module
app.set("view engine", "ejs");

//Initializing the body parser module
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
  name: String
});

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

//Array of our items
const defaultItems = [items1, items2, items3];

const Item = mongoose.Model("Item", itemsSchema);

app.get("/", function (req, res) {
  //var day = date.getDay();

  res.render("list", { listTitle: "Today", newitem: items });
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

//Get request for work tab
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newitem: workitems });
});

//Post request for work tab
app.post("/work", function (req, res) {
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

//Get request for about tab
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
