//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const { Todo } = require('./db.js');
const ejs = require("ejs");


const app = express();

app.set('view engine',"ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", async function (req, res) {
  try {
    const allTodos = await Todo.find(); // Fetch all todo items from the database

    let today = new Date();
    let option = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    let day = today.toLocaleDateString("en-US", option);

    // Use ejs.renderFile to render the view and send it as an HTML response
    ejs.renderFile(__dirname + "/views/1.ejs", { dayk: day, newlist: allTodos }, function (err, html) {
      if (err) {
        console.error('Error rendering EJS view:', err);
        return res.status(500).send('Error rendering EJS view');
      }
      res.send(html); // Send the rendered HTML as the response
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    return res.status(500).send('Error fetching todos from the database');
  }
});



app.post("/", async function (req, res) {
  let item = req.body.newItems;

  try {
    const todo = new Todo({
      item: item
    });

    await todo.save();
    console.log('Item inserted:', item);
    res.redirect("/");
  } catch (err) {
    console.error('Error inserting item:', err);
    return res.status(500).send('Error inserting item into the database');
  }
});


app.post("/update", async function (req, res) {
  let itemIds = req.body.itemIds;
  let updatedItem = req.body.updatedItem;

  try {
    const updateResult = await Todo.findByIdAndUpdate(itemIds, { item: updatedItem });

    if (updateResult) {
      console.log('Item updated:', updateResult);
      res.redirect("/");
    } else {
      console.log('Item not found:', itemIds);
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('Error updating item:', err);
    return res.status(500).send('Error updating item in the database');
  }
});



app.post("/delete", async function (req, res) {
  let itemId = req.body.itemId;

  try {
    const deleteResult = await Todo.findByIdAndDelete(itemId);

    if (deleteResult) {
      console.log('Item deleted:', deleteResult);
      res.redirect("/");
    } else {
      console.log('Item not found:', itemId);
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    return res.status(500).send('Error deleting item from the database');
  }
});



app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
