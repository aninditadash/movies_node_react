const express = require("express");

const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("/", moviesController.getAllMovies);

router.get("/:movie_id", moviesController.getMovieById);

module.exports = router;
