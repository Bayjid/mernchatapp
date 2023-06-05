//Router Setup
const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authMiddleware");

// Controller Imports
const {
  getUserDetails     
} = require("../controllers/userController");

// Joining Controller With Router
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// Exports
module.exports = router;