const { response } = require("express");
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

//Sort
function sortEarly() {
  todos.sort(function (a, b) {
    return new Date(a.created) - new Date(b.created);
  });
}

function sortLate() {
  todos.sort(function (a, b) {
    return new Date(b.created) - new Date(a.created);
  });
}

function doneTodo() {
  // for (const todo of todos) {
  //   if ((todo.done = true)) {
  //     console.log("Its done");
  //   } else {
  //     console.log("Not done");
  //   }
  // }
  const doneTodo = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].done === true) {
      //console.log("hej");
      doneTodo.push(todos[i]);
    } else {
      continue;
    }
  }
  return doneTodo;
}

//completed

// If value done
// if (req.body.checked) {
//   console.log("It's done");
// } else {
//   console.log("NOT done.");
// }

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
  doneTodo();

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

app.get("/todo/sortEarly", (req, res) => {
  sortEarly();
  res.render("todoSortEarly", { todos });
});

app.get("/todo/sortLate", (req, res) => {
  sortLate();
  res.render("todoSortLate", { todos });
});

app.get("/todo/done", (req, res) => {
  res.render("todoDone", { doneTodo });
});

app.get("/todo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id == id);

  res.render("oneTodo", todo);
});

// UPDATE
// Create the update page at /update
app.get("/todo/:id/update", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id == id);
  res.render("todoUpdate", todo);
});

app.post("/todo/:id/update", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((i) => i.id == id);

  todos[index].created = req.body.created;
  todos[index].description = req.body.description;
  todos[index].done = req.body.done;

  res.redirect("/todo/");
});

// DELETE
// Create the delete page at /delete
app.get("/todo/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id == id);

  res.render("todoDelete", todo);
});

app.post("/todo/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((i) => i.id == id);

  todos.splice(index, 1);

  res.redirect("/todo");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
