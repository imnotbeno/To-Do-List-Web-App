const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
//const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const { lstat } = require("fs");

//Establish connection and create database
mongoose.connect("https://mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Initializing the ejs module
app.set("view engine", "ejs");

//Initializing the body parser module
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

//Default items
const item1 = new Item({
  name: "Welcome to your todo list!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

//Array of our items
const defaultItems = [item1, item2, item3];

//Schema for lists in different tabs
const listSchema = {
  name: String,
  items: [itemsSchema],
};

//Model for lists in different tabs
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  //var day = date.getDay();

  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      //Inserting the items into DB
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Items were successfully inserted to DB!");
        }
      });
      res.redirect("/"); //Redirect back to home route so it renders the list
    } else {
      res.render("list", { listTitle: "Today", newitem: foundItems });
    }
  });
});

//To get custom site names
app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }, function (err, foundDocs) {
    if (!err) {
      if (!foundDocs) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show existing list
        res.render("list",{ listTitle: foundDocs.name, newitem: foundDocs.items });
      }
    }
  });
});

app.post("/", function (req, res) {
  // get value from input/new item
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName,
  });

  if(listName === "Today"){
    newItem.save();
    res.redirect();
  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+listName);
    })
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Item has been deleted!");
      res.redirect("back");
    }
  });
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
