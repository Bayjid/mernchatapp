//Router Setup
const express = require("express");
const router = express.Router();

// Controller Imports
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword  
} = require("../controllers/authController");


// Joining Controller With Router
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);


// Exports
module.exports = router;