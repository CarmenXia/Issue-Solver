const router = require("express").Router();
const passport = require("passport");
const { User } = require("../modles/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//get all users
router.get(
  "/users/all",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

//Sign up
router.post(
  "/users/register",
  passport.authenticate("register", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

/*router.post("/users/register", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    if (err) return res.status(400).json(err);
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ msg: "Server side error" });
      return res.json(user);
    });
  })(req, res, next);
});*/

//log in
/*router.post("/users/login", (req, res) => {
  passport.authenticate("login", { session: false }),
    (err, user) => {
      if (err) console.log(err);
      //don't pass any sensitive info in sign()
      res.json(
        user ? jwt.sign({ email: user.email }, process.env.SECRET) : null
      );
    };
});*/

router.post(
  "/users/login",
  passport.authenticate("login", { session: false }),
  (req, res, next) => {
    //don't pass any sensitive info in sign()
    jwt.sign(
      { user: req.user },
      process.env.SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) {
          return res.json({ msg: "Login failed", token: null });
        }
        res.json(token);
      }
    );
  }
);

/*
router.post("/users/login", (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    if (err) return res.status(400).json(err);
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ msg: "Server side error" });
      return res.json(user);
    });
  })(req, res, next);
});
*/

//get current user
router.get(
  "/users/me",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id)
      .populate({ path: "tickets", model: "Ticket" })
      .populate({
        path: "issues",
        model: "Issue",
      })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
);

//get users (also the issue author)
router.get(
  "/users/:username",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.findOne({ username: req.params.username })
      .populate({
        path: "tickets",
        model: "Ticket",

        populate: {
          path: "issues",
          model: "Issue",

          populate: {
            path: "author",
            model: "User",
          },
        },
      })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
);

router.get(
  "/users/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .populate({
        path: "tickets",
        model: "Ticket",
        populate: {
          path: "issues",
          model: "Issue",
          populate: {
            path: "author",
            model: "User",
          },
        },
      })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
