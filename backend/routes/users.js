const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.get("/:user_id", usersController.getUserById);

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").notEmpty().isLength({ min: 8 }),
    check("name").notEmpty(),
  ],
  usersController.signupNewUser
);

router.post("/login", usersController.loginUser);

router.patch(
  "/:user_id",
  [check("email").normalizeEmail().isEmail(), check("name").notEmpty()],
  usersController.updateUser
);

router.delete("/:user_id", usersController.deleteUser);

module.exports = router;
