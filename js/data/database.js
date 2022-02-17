const mongodb = require("mongodb");

async function getDb() {
  const client = new mongodb.MongoClient(process.env.MONGODB_CONNECTION_STRING);

  await client.connect();

  const db = client.db("NodeJS-Todo");

  return db;
}

async function getTodoCollection() {
  const db = await getDb();

  return db.collection("todos");
}

module.exports = {
  getTodoCollection,
};
