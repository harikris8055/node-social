const passport = require("passport"),
  GoogleStrategy = require("passport-google-oidc");
const router = require("express").Router();
const User = require('../model/user')
var userProfile;

require("dotenv").config();

router.get("/success", (_req, res) => {
  res.render("success", { userProfile });
});

router.get("/login", (_req, res) => {
  res.render("login");
});

router.get("/login/federated/google", passport.authenticate("google"));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "912678136592-m4etpqln2dvpka8qc2nqvah0n2ac8p08.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function verify(issuer, profile, cb) {

      //db call

      userProfile = profile;
      let email = profile.emails[0].value
      
      const user = new User(email)

      let isValid = await user.isValidUser()

      userProfile.is_valid = isValid;

      console.log(isValid)
      
      return cb(null, userProfile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  // console.log({user})
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
