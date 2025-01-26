const { validationResult } = require("express-validator");

const User = require("../models/user");
const HttpError = require("../models/http_error");
const { getCoordinatesForAddress } = require("../util/location");

const getUserById = async (req, res, next) => {
  const { user_id } = req.params;

  let user;
  try {
    user = await User.findById(user_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user!",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Something went wrong, could not find user!",
      404
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) });
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signupNewUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.errors });
  }

  const { email } = req.body;

  // Check if the `email` already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead.",
      422
    );
    return next(error);
  }

  // If the `email` does not exist, proceed with creating new user
  const { name, password, image, address } = req.body;

  // Adding `address` as an optional property here to use Google Maps Platform API
  // Calculate coordinates from the given address
  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (err) {
    return next(err);
  }

  const newUser = new User({
    name: name,
    password: password,
    email: email,
    image: image || "",
    geo: { coordinates },
    address,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    // need to catch the error if user with the email exists, should throw error - Could not create user, email already exists. (422)
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if the `email` exists in the database
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again.", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not login you in.",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in." });
};

const updateUser = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({ errors: validationErrors.errors });
  }

  const { user_id } = req.params;
  const { name, email } = req.body;

  let user;
  try {
    user = await User.findById(user_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      404
    );
    return next(error);
  }

  user.name = name;
  user.email = email;

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not update user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const { user_id } = req.params;

  let user;
  try {
    user = await User.findById(user_id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user!",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Something went wrong, could not find user!",
      404
    );
    return next(error);
  }

  try {
    await user.deleteOne();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete user!",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "User deleted." });
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.signupNewUser = signupNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
