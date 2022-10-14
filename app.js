const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport")

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate('session'));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ejs.name);

var authRouter = require("./routes/auth");

app.use("/", authRouter);


module.exports = app;
