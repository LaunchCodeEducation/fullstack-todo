const express = require("express");

const handlers = require("./handlers");
const { enforceJSON } = require("../middleware");

const {
  getToDosHandler,
  createToDoHandler,
  completeToDoHandler,
  deleteToDoHandler,
} = handlers;
// handles all routes with the root path "/todos"
// Router is used to group route handlers under a common path
// behaves similarly to the Express app itself
const Controller = express.Router({ caseSensitive: true });

// GET /todos/
Controller.get("/", getToDosHandler);

// POST /todos/
Controller.post("/", enforceJSON, express.json(), createToDoHandler);

// handles all routes with the root path "/todos/:id" (id is a path variable representing the item id)
// the route() method is an alternative way to group handlers under a common path
// it can be used on the Express app as app.route() as well
Controller.route("/:id")
  .delete(deleteToDoHandler) // DELETE /todos/:id
  .patch(completeToDoHandler); // PATCH /todos/:id

module.exports = {
  Controller,
  handlers,
};
