const { startSession } = require("mongoose");

const Comments = require("../models/comments");
const Movie = require("../models/movies");
const HttpError = require("../models/http_error");

const getAllComments = async (req, res, next) => {
  let comments;
  try {
    comments = await Comments.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching comments failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

const getCommentById = async (req, res, next) => {
  const { comment_id } = req.params;

  let comment;
  try {
    comment = await Comments.findById(comment_id);
  } catch (err) {
    const error = new HttpError(
      "Could not find comment for the provided id.",
      500
    );
    return next(error);
  }

  res.json({
    comment: comment.toObject({ getters: true }),
  });
};

const createComment = async (req, res, next) => {
  const { name, email, movie_id, text, date } = req.body;

  let movie;
  try {
    movie = await Movie.findById(movie_id);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find movie for the provided id, please try again",
      500
    );
    return next(error);
  }

  if (!movie) {
    const error = new HttpError(
      "Could not find movie for the provided id",
      404,
      500
    );
    return next(error);
  }

  const newComment = new Comments({
    name,
    email,
    movie_id,
    text,
    date,
  });

  try {
    const new_session = await startSession();
    new_session.startTransaction();
    await newComment.save({ session: new_session });
    movie.num_mflix_comments = movie.num_mflix_comments + 1;
    await movie.save({ session: new_session });
    await new_session.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not create new comment, please try again",
      500
    );
    return next(error);
  }
  res.status(201).json({ comment: newComment.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;

  let comment;
  try {
    comment = await Comments.findById(comment_id).populate("movie_id");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete comment.",
      500
    );
    return next(error);
  }

  if (!comment) {
    const error = new HttpError(
      "Could not find comment for the provided id.",
      500
    );
    return next(error);
  }

  try {
    const new_session = await startSession();
    new_session.startTransaction();
    await comment.deleteOne({ session: new_session });
    comment.movie_id.num_mflix_comments =
      comment.movie_id.num_mflix_comments - 1;
    await comment.movie_id.save();
    await new_session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete comment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Comment deleted." });
};

const getCommentsByMovieId = async (req, res, next) => {
  const { movie_id } = req.params;

  let comments;
  try {
    comments = await Comments.find({ movie_id });
    console.log(comments);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find comment for the provided id.",
      500
    );
    return next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

const getCommentByUserEmail = async (req, res, next) => {
  const { email } = req.body;

  let comments;
  try {
    comments = await Comments.find({ email });
    console.log(comments);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not find comment for the provided email.",
      500
    );
    return next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

exports.getAllComments = getAllComments;
exports.getCommentById = getCommentById;
exports.createComment = createComment;
exports.deleteComment = deleteComment;
exports.getCommentsByMovieId = getCommentsByMovieId;
exports.getCommentByUserEmail = getCommentByUserEmail;
