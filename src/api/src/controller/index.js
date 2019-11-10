const express = require("express");

const {
  getToDosHandler,
  createToDoHandler,
  completeToDoHandler,
  deleteToDoHandler,
} = require("./handlers");
const { enforceJSON } = require("./middleware");

// handles all routes with the root path "/todos"
// Router is used to group route handlers under a common path
// behaves similarly to the Express app itself
const Controller = express.Router({ caseSensitive: true });

// GET /todos/
Controller.get("/", getToDosHandler);

// POST /todos/
Controller.post("/", enforceJSON, express.json(), createToDoHandler);

// handles all routes with the root path "/todos/:todoId" (todoId is a path variable)
// the route() method is an alternative way to group handlers under a common path
// it can be used on the Express app as app.route() as well
Controller.route("/:todoId")
  .delete(deleteToDoHandler) // DELETE /todos/:todoId
  .patch(completeToDoHandler); // PATCH /todos/:todoId

module.exports = {
  Controller,
  handlers,
};
