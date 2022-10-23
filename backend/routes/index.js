const router = require("express").Router();

router.use("/api", require("./issueRoute"));
router.use("/api", require("./replyRoute"));
router.use("/api", require("./ticketRoute"));
router.use("/api", require("./userRoute"));

module.exports = router;
