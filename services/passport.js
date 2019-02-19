const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser");
  User.findById(id).then((user, err) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const profileId = profile ? profile.id.toString() : false;
      const profileName = profile ? profile.displayName : "user" + profileId;
      if (profileId) {
        const existingUser = await User.findOne({ googleId: profileId });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({ googleId: profileId, name: profileName}).save();
        done(null, user);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.facebookClientID,
//       clientSecret: keys.facebookClientSecret,
//       callbackURL: "/auth/facebook/callback"
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const profileId = profile ? profile.id.toString() : false;
//       const profileName = profile ? profile.displayName : "user" + profileId;
//       if (profileId) {
//         User.findOne({ facebookId: profileId }).then((existingUser, err) => {
//           console.log("existingUser", existingUser);
//           if (!existingUser) {
//             new User({ facebookId: profileId, name: profileName })
//               .save()
//               .then(user => done(null, user));
//           } else {
//             done(null, existingUser);
//           }
//         });
//       }
//     }
//   )
// );
