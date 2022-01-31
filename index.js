const express = require("express");
const exphbs = require("express-handlebars");
const todos = require("./data/todos");

function getNewId(list) {
  let maxId = 0;
  for (const item of list) {
    if (item.id > maxId) {
      maxId = item.id;
    }
  }
  return maxId + 1;
}

// Initialize the app.
const app = express();

// Use the template engine/view.
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

// Tells the app that there will be css and/or image files.
app.use(express.static("public"));

// To change the url.
app.use(express.urlencoded({ extended: true }));

// Create the home page at /.
app.get("/", (req, res) => {
  res.render("home");
});

// READ
app.get("/todo", (req, res) => {
  res.render("todoRead", { todos });
});

// CREATE
// Create the create page at /create
app.get("/todo/create", (req, res) => {
  res.render("todoCreate");
});

app.post("/todo/create", (req, res) => {
  const id = getNewId(todos);
  const newTodo = {
    id: id,
    created: req.body.created,
    description: req.body.description,
    done: req.body.done,
  };

  todos.push(newTodo);
  res.redirect("/todo/" + id);
});

app.get("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id == id);

  res.render("oneTodo", todo);
});

// UPDATE
// Create the update page at /update
app.get("/todo/update", (req, res) => {
  res.render("todoUpdate");
});

// DELETE
// Create the delete page at /delete
app.get("/todo/delete", (req, res) => {
  res.render("todoDelete");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
