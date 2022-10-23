const LocalStrategy = require("passport-local").Strategy;
const User = require("../modles/user");

//Sign up
module.exports = (passport) => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { username } = req.body;
          const userExists = await User.findOne({ email: email });
          if (userExists) {
            return done(null, false, { msg: "This email is already taken" });
          }
          const newUser = await User.create({
            email: email,
            password: password,
            username: username,
          });
          return done(null, newUser, {
            msg: "Congrats! You sign up successfully.",
          });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) return done(null, false, { msg: "No user found" });
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            return done(null, false, { msg: "Wrong password" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );
};
