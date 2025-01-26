const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: mongoose.Types.ObjectId, required: true, ref: "movies" },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("comments", CommentsSchema);
