const router = require("express").Router();
const passport = require("passport");
const { User, Ticket, Issue, Reply } = require("../modles/index");

//Creat new reply and update the reply info in relative issue
router.post(
  "/replies",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Reply.create({
      content: req.body.content,
      author: req.user._id,
      issueId: req.body.issueId,
    })
      .then((reply) => {
        Issue.findByIdAndUpdate(req.body.issueId, {
          $push: { replies: reply._id },
        })
          .then(() => console.log("Reply update"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

/* 
router.post(
  "/replies",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Reply.create({
      content: req.body.content,
      author: req.user._id,
      issueId: req.body.issueId,
    })
      .then((reply) => {
        User.findById(req.user._id).then((author) => {
          Issue.findOneAndUpdate(
            { title: req.body.title },
            {
              $push: { replies: reply._id },
            }
          )
            .then(() => {
              reply.author = author;
              res.json(reply);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }
);*/

//Add replies
router.put(
  "/replies/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Reply.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((issue) => res.json(issue))
      .catch((err) => console.log(err));
  }
);

//Delete replies
router.delete(
  "/replies/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) =>
    Reply.findByIdAndDelete(req.params.id)
      .then((reply) => res.json(reply))
      .catch((err) => console.log(err))
);

module.exports = router;
