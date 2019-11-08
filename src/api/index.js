const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 8008;
app.listen(port, () => console.log(`API listening on port ${port}`));
