const mongoose = require("mongoose");

const { Schema } = mongoose;

const MoviesSchema = new Schema({
  plot: { type: String, required: true },
  genres: { type: Array, required: true },
  cast: { type: Array, required: true },
  poster: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  countries: { type: Array, required: true },
  num_mflix_comments: { type: Number, required: true, ref: "comments" },
});

module.exports = mongoose.model("movies", MoviesSchema);
