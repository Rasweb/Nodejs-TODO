const express = require("express");
const mongodb = require("mongodb");
const db = require("../js/data/database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

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

// READ
router.get("/", async (req, res) => {
  const todos = await db.getTodoCollection();

  res.render("todoRead", { todos });
});

// CREATE
// Create the create page at /create
router.get("/create", (req, res) => {
  res.render("todoCreate");
});

router.post("/create", async (req, res) => {
  const todo = {
    created: parseInt(req.body.created),
    description: req.body.description,
    done: req.body.done,
  };
  const dataBase = await db.getTodoCollection();
  await dataBase.insertOne(todo);

  res.redirect("/todo");
});

router.get("/sortEarly", async (req, res) => {
  const todos = await db.getTodoCollection();
  sortEarly();
  res.render("todoSortEarly", { todos });
});

router.get("/sortLate", async (req, res) => {
  const todos = await db.getTodoCollection();
  sortLate();
  res.render("todoSortLate", { todos });
});

router.get("/:id", async (req, res) => {
  const id = ObjectId(req.params.id);

  const dataBase = await db.getTodoCollection();
  dataBase.findOne({ _id: id }, (err, todo) => {
    res.render("oneTodo", todo);
  });
});

// UPDATE
// Create the update page at /update
router.get("/:id/update", async (req, res) => {
  const id = ObjectId(req.params.id);

  const dataBase = await db.getTodoCollection();
  await dataBase.findOne({ _id: id }, (err, todo) => {
    res.render("todoUpdate", todo);
  });
});

router.post("/:id/update", async (req, res) => {
  const id = ObjectId(req.params.id);
  const todo = {
    created: parseInt(req.body.created),
    description: req.body.description,
    done: req.body.done,
  };

  const dataBase = await db.getTodoCollection();
  await dataBase.updateOne({ _id: id }, { set: todo });

  res.redirect("/:id");
});

// DELETE
router.get("/todo/:id/delete", async (req, res) => {
  const id = ObjectId(req.params.id);

  const dataBase = await db.getTodoCollection();
  await dataBase.deleteOne({ _id: id });

  res.redirect("/todo");
});

module.exports = router;
