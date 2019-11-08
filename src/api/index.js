const express = require("express");

const {
  getToDosHandler,
  createToDoHandler,
  completeToDoHandler,
  deleteToDoHandler,
} = require("./route-handlers");
const DataHandler = require("./data-handler");
const { allowCORS, enforceJSON, injectDataHandler } = require("./middleware");

const app = express();

app.use(allowCORS, injectDataHandler(new DataHandler()));

app.get("/todos", getToDosHandler);

app.post("/todos", enforceJSON, express.json(), createToDoHandler);

app.patch("/todos/:id", completeToDoHandler);

app.delete("/todos/:id", deleteToDoHandler);

const { PORT = 8008 } = process.env;
app.listen(PORT, () => console.log(`app server listening on ${PORT}`));
