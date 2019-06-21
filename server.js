const debug = require("debug")("server");
const express = require("express");
const app = express();
const all = require("./src/routes/all");

// Set port the service will run on
const port = process.env.PORT || 3000;

// Set port the service will run on
app.set("port", port);

// Configure express router to pick up routes
app.use("/", all);

// Start server
debug(`Listening on port ${port}`);
app.listen(port);
