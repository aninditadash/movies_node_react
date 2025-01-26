const express = require("express");

const commentsController = require("../controllers/comments");

const router = express.Router();

router.get("/", commentsController.getAllComments);

router.get("/:comment_id", commentsController.getCommentById);

router.get("/movie/:movie_id", commentsController.getCommentsByMovieId);

router.post("/", commentsController.createComment);

router.post("/movie", commentsController.getCommentByUserEmail);

router.delete("/:comment_id", commentsController.deleteComment);

module.exports = router;
