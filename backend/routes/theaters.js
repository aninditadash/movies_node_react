const express = require("express");

const theatersController = require("../controllers/theaters");

const router = express.Router();

router.get("/", theatersController.getAllTheaters);

router.get("/:theater_id", theatersController.getTheaterById);

router.get("/theater/:theater_id", theatersController.getTheaterByTheaterId);

module.exports = router;
