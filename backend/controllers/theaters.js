const Theater = require("../models/theater");
const HttpError = require("../models/http_error");

const getAllTheaters = async (req, res, next) => {
  let theaters;
  try {
    theaters = await Theater.find().exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching theaters failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    theaters: theaters.map((theater) => theater.toObject({ getters: true })),
  });
};

const getTheaterById = async (req, res, next) => {
  const { theater_id } = req.params;

  let theater;
  try {
    theater = await Theater.findById(theater_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find theater!",
      500
    );
    return next(error);
  }

  if (!theater) {
    const error = new HttpError(
      "Something went wrong, could not find theater!",
      404
    );
    return next(error);
  }
  res.json({ theater: theater.toObject({ getters: true }) });
};

const getTheaterByTheaterId = async (req, res, next) => {
  const { theater_id } = req.params;

  let theaters;
  try {
    theaters = await Theater.find({ theaterId: theater_id });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find theater!",
      500
    );
    return next(error);
  }

  if (!theaters || theaters.length === 0) {
    const error = new HttpError(
      "Something went wrong, could not find theater!",
      404
    );
    return next(error);
  }
  res.json({
    theaters: theaters.map((theater) => theater.toObject({ getters: true })),
  });
};

exports.getAllTheaters = getAllTheaters;
exports.getTheaterById = getTheaterById;
exports.getTheaterByTheaterId = getTheaterByTheaterId;
