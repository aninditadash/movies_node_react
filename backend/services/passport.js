const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const User = mongoose.model("shopify_users");

// Create an instance of Google strategy, have to provide client ID and client secret.
// client ID - public token that can be shared.
// client secret - private token, that should not be shared.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (existingUser) {
          // We already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // Save the user record
          new User({ googleID: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
