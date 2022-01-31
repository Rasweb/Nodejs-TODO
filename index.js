const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos");

// Initialize the app.
const app = express();

// Use the template engine/view.
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      todaysDate() {
        return new Date();
      },
    },
  })
);

app.set("view engine", "hbs");

// Tells the app that there will be css and/or image files.
app.use(express.static("public"));

// To change the url.
app.use(express.urlencoded({ extended: true }));

// Create the home page at /.
app.get("/", (req, res) => {
  res.render("home", { todos });
});

// Create the create page at /create
app.get("/create", (req, res) => {
  res.render("todoCreate");
});

// Create the remove page at /remove
app.get("/remove", (req, res) => {
  res.render("todoRemove");
});

// Create the update page at /update
app.get("/update", (req, res) => {
  res.render("todoUpdate");
});

// Create the delete page at /delete
app.get("/delete", (req, res) => {
  res.render("todoDelete");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});

let dateTime = new Date();
// Adjust 0 before single digit date and prevents more than two numbers.
//("0" + date()).slice(-2);

// get current date
let date = ("0" + dateTime.getDate()).slice(-2);

// get current month
let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);

// get current year
let year = dateTime.getFullYear();

// get current hours
let hours = ("0" + dateTime.getHours()).slice(-2);

// get current minutes
let minutes = ("0" + dateTime.getMinutes()).slice(-2);

// get current seconds
let seconds = ("0" + dateTime.getSeconds()).slice(-2);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(
  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
);
