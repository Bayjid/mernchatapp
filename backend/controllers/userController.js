const ErrorHandler = require("../error/errorHandler");
const User = require("../models/userModel");

// Get User Detail
exports.getUserDetails = async (req, res, next) => {

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });

};