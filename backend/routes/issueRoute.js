const router = require("express").Router();
const passport = require("passport");
const { User, Ticket, Issue, Reply } = require("../modles/index");

//Get all issues
router.get(
  "/issues/all",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Issue.find({})
      .populate({ path: "author", model: "User" })
      .populate({ path: "belongTo", model: "Ticket" })
      .then((issues) => res.json(issues))
      .catch((err) => console.log(err));
  }
);

//Get issue by id
router.get(
  "/issues/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    //console.log(req.params.id);
    Issue.findById(req.params.id)
      .populate("author")
      .populate({
        path: "belongTo",
        model: "Ticket",
      })
      .populate({
        path: "replies",
        model: "Reply",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .then((issue) => {
        if (issue) res.status(200).json(issue);
        else res.status(404).json({ message: "404 Issue not found!" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
);

//Create new issues
//create a link to user.issuse
//create a link to ticket.issuse
router.post(
  "/issues",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Issue.create({
      title: req.body.title,
      body: req.body.body,
      priority: req.body.priority,
      belongTo: req.body.belongTo,
      status: req.body.status,
      author: req.user._id,
    })
      .then((issue) => {
        Ticket.findByIdAndUpdate(req.body.belongTo, {
          $push: { issues: issue._id },
        })
          .then((data) => {
            let members = data.members;
            for (const member of members) {
              User.findByIdAndUpdate(member, { $push: { issues: issue._id } })
                .then(() =>
                  console.log("Issue attrated to every project member")
                )
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);
//Update issues
router.put(
  "/issues/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Issue.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((issue) => res.json(issue))
      .catch((err) => console.log(err));
  }
);

//title,body,priority,belongTo(refT),status,author(refU)/replies

//Delete issue
router.delete(
  "/issues/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Issue.findByIdAndDelete(req.params.id)
      .then((issue) => res.json(issue))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
