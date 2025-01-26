const mongoose = require("mongoose");
const User = require("./models/user");

const getUsers = async (req, res, next) => {
  const users = await User.find().exec();
  res.json(users);
};

const createNewUser = async (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    image: req.body.image || "",
  });

  console.log(typeof newUser.id);
  const result = await newUser.save();

  res.json(result);
};

exports.getUsers = getUsers;
exports.createNewUser = createNewUser;
