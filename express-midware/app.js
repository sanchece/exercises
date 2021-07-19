const express = require("express");
const app = express();
const routes = require("./routes/items");
const customError = require("./customError");
app.use(express.json());
app.use("/items", routes);

app.use(function (req, res, next) {
  return new customError("something went wrong", 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});



module.exports = app