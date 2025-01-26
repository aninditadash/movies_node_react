const Movie = require("../models/movies");
const HttpError = require("../models/http_error");

const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching movies failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    movies: movies.map((movie) => movie.toObject({ getters: true })),
  });
};

const getMovieById = async (req, res, next) => {
  const { movie_id } = req.params;

  let movie;
  try {
    movie = await Movie.findById(movie_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find movie!",
      500
    );
    return next(error);
  }

  if (!movie) {
    const error = new HttpError(
      "Something went wrong, could not find movie!",
      404
    );
    return next(error);
  }
  res.json({ movie: movie.toObject({ getters: true }) });
};

exports.getAllMovies = getAllMovies;
exports.getMovieById = getMovieById;
