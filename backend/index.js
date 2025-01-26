const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const userRoutes = require("./routes/users");
const theaterRoutes = require("./routes/theaters");
const movieRoutes = require("./routes/movies");
const commentsRoutes = require("./routes/comments");
const HttpError = require("./models/http_error");

const app = express();

// Node.js middleware that parses data from HTTP request bodies in Express applications.
// It's used to handle form submissions, JSON payloads, and other types of request bodies.
app.use(bodyParser.json());

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("Connected to the database!!");
  })
  .catch(() => {
    console.log("Connection failed!!");
  });

app.use("/api/users", userRoutes);

app.use("/api/theaters", theaterRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/comments", commentsRoutes);

// Middle for error handling for requests that did not get any response, means for requests we don't want to handle
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// Middleware for general error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  return res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured!" });
});

const PORT = process.env.PORT;

app.listen(PORT || 4000);
