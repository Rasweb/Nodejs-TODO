const express = require("express");
const mongodb = require("mongodb");
const db = require("../js/data/database.js");
const { ObjectId } = require("mongodb");

const router = express.Router();

// READ
router.get("/", async (req, res) => {
  const collection = await db.getTodoCollection();
  const todos = await collection.find().toArray();

  res.render("todo/todoRead", { todos });
});

// CREATE
// Create the create page at /create
router.get("/create", (req, res) => {
  res.render("todo/todoCreate");
});

router.post("/create", async (req, res) => {
  const todo = {
    created: parseInt(req.body.created),
    description: req.body.description,
    done: req.body.done,
  };
  const collection = await db.getTodoCollection();
  await collection.insertOne(todo);

  res.redirect("/todo");
});

router.get("/:id", async (req, res) => {
  const id = ObjectId(req.params.id);

  const dataBase = await db.getTodoCollection();
  dataBase.findOne({ _id: id }, (err, todo) => {
    res.render("todo/oneTodo", todo);
  });
});

// UPDATE
// Create the update page at /update
router.get("/:id/update", async (req, res) => {
  const id = ObjectId(req.params.id);

  const dataBase = await db.getTodoCollection();
  dataBase.findOne({ _id: id }, (err, todo) => {
    res.render("todo/todoUpdate", todo);
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
  await dataBase.updateOne({ _id: id }, { $set: todo });

  res.redirect(`/todo/${id}`);
});

// DELETE
router.post("/:id/delete", async (req, res) => {
  const id = ObjectId(req.params.id);

  const collection = await db.getTodoCollection();
  await collection.deleteOne({ _id: id });

  res.redirect("/todo");
});

// Sort
router.get("/sortEarly", async (req, res) => {
  const collection = await db.getTodoCollection();
  const todos = await collection.find().toArray();

  function sortEarly() {
    todos.sort(function (a, b) {
      return new Date(a.created) - new Date(b.created);
    });
  }

  const sortFunction = sortEarly();

  res.render("todo/todoSortEarly", { todos, sortFunction });
});

router.get("/sortLate", async (req, res) => {
  const collection = await db.getTodoCollection();
  const todos = await collection.find().toArray();

  function sortLate() {
    todos.sort(function (a, b) {
      return new Date(b.created) - new Date(a.created);
    });
  }
  const sortFunction = sortLate();
  res.render("todo/todoSortLate", { todos, sortFunction });
});

module.exports = router;
