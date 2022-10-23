const router = require("express").Router();
const passport = require("passport");
const { User, Ticket, Issue, Reply } = require("../modles/index");

//Get all tickets
//*need to defind the route "/tickets/all", otherwise it call call by ticket id
router.get(
  "/tickets/all",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Ticket.find({})
      .populate("author")
      .populate({ path: "members", model: "User" })
      .populate({
        path: "issues",
        model: "Issue",
        populate: [
          {
            path: "author",
            model: "User",
          },
          {
            path: "replies",
            model: "Reply",
            populate: {
              path: "author",
              model: "User",
            },
          },
        ],
      })
      .then((ticket) => res.json(ticket))
      .catch((err) => console.log(err));
  }
);

//get ticket(by id)
router.get(
  "/tickets/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Ticket.findById(req.params.id)
      .populate("author")
      .populate({ path: "members", model: "User" })
      .populate({
        path: "issues",
        model: "Issue",
        populate: [
          {
            path: "author",
            model: "User",
          },
          {
            path: "replies",
            model: "Reply",
            populate: {
              path: "author",
              model: "User",
            },
          },
        ],
      })

      .then((ticket) => {
        if (ticket) {
          res.status(200).json(ticket);
        } else {
          res.status(404).json({ message: "404 Ticket not found!" });
        }
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
);
//all the features(title/description/author(refU)/priority/status/createDate(timestamp(doc.createAt))/completeDate/members(refU)/issues(refI))
//Create new ticket
router.post(
  "/tickets",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Ticket.create({
      title: req.body.title,
      description: req.body.description,
      author: req.user._id,
      priority: req.body.priority,
      status: req.body.status,
      deadLine: req.body.deadLine,
    })
      .then((ticket) => {
        User.findByIdAndUpdate(req.user._id, { $push: { tickets: ticket._id } })

          .then(() => {
            Ticket.findByIdAndUpdate(ticket._id, {
              $push: { members: ticket.author._id },
            })
              .then(() => res.json(ticket._id))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);
//Update ticket
router.put(
  "/tickets/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((ticket) => {
        res.json(ticket);
      })
      .catch((err) => console.log(err));
  }
);

//Update ticket-add members
//update each user's page of the ticket
//updata all members info in tickets/ticketid/addmember
router.put(
  `/tickets/:id/addMember`,
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
      $addToSet: { tickets: req.params.id },
    })
      .then(() =>
        Ticket.findByIdAndUpdate(
          req.params.id,
          {
            $addToSet: { members: req.body },
          },
          { new: true }
        )
      )
      .then((ticket) => res.json(ticket))
      .catch((err) => console.log(err));
  }
);

//Update Ticket-remove members
router.put(
  "/tickets/:id/removeMember",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
      $pull: { tickets: req.params.id },
    })
      .then(() =>
        Ticket.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { members: req.body._id },
          },
          { new: true }
        )
      )
      .then((ticket) => res.json(ticket))
      .catch((err) => console.log(err));
  }
);

//Delete old project
router.delete(
  "/tickets/:id",
  passport.authenticate("passportJwt", { session: false }),
  (req, res) => {
    Ticket.findByIdAndDelete(req.params.id)
      .then((ticket) => res.json(ticket))
      .catch((err) => console.log(err));
  }
);
module.exports = router;
