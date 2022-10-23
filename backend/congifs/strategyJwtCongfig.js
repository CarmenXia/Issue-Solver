const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();

module.exports = (passport) => {
  passport.use(
    "passportJwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = jwtPayload.user;
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
