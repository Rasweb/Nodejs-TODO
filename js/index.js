require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const todoRouter = require("../routes/todoRoutes.js");

// Initialize the app.
const app = express();

// To change the url.
app.use(express.urlencoded({ extended: true }));

// Use the template engine/view.
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");

// Tells the app that there will be css and/or image files.
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/todo", todoRouter);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
