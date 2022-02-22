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

// Sort
router.get("/sortAsc", async (req, res) => {
  const collection = await db.getTodoCollection();
  const todos = await collection
    .find()
    .sort([["created", "asc"]])
    .toArray();

  res.render("todo/todoSortAsc", { todos });
});

router.get("/sortDesc", async (req, res) => {
  const collection = await db.getTodoCollection();
  const todos = await collection
    .find()
    .sort([["created", "desc"]])
    .toArray();

  res.render("todo/todoSortDesc", { todos });
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

module.exports = router;
