const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

require("./backend/congifs/mongodb");
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors());
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./backend/routes/index"));
require("./backend/congifs/startegyConfig")(passport);
require("./backend/congifs/strategyJwtCongfig")(passport);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(err, user);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
