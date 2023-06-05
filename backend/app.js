//Express Setup
require('express-async-errors');
const express = require("express");
const app = express();
const path = require("path");

//Others Package
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//App Setup
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const auth = require("./routes/authRoute");
const user = require("./routes/userRoute");


// Joining Route With App
app.use("/api/v1", auth);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Route not found
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
app.use(notFoundMiddleware);

// Middleware for Errors
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

// Exports
module.exports = app;