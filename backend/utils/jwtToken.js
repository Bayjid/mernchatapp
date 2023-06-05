// Create Token and saving in cookie
const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  return token;
};


const sendToken = (user, statusCode, res) => {
  // const token = user.getJWTToken();

  const token = createJWT(user._id);

  const oneDay = 1000 * 60 * 60 * 24;

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() +  process.env.COOKIE_EXPIRE * oneDay
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;