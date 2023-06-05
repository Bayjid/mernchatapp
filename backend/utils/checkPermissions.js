const ErrorHandler = require("../error/errorHandler");

exports.chechPermissions = (requestUser, resourceUserId) => {
  
  if (requestUser.role === 'admin') return;
  
  if (requestUser.id === resourceUserId.toString()) return;
  
  new ErrorHandler('Not authorized to access this route', 401)

};
