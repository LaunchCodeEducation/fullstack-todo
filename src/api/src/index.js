const express = require("express");

const Model = require("./model");
const { Controller } = require("./controller");
const { allowCORS, injectModel } = require("./middleware");

const app = express();

app.use(allowCORS, injectModel(new Model()));

app.use("/todos", Controller);

const { PORT = 8008 } = process.env;
app.listen(PORT, () => console.log(`app server listening on ${PORT}`));
