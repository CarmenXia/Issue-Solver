const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongoose is connected");
  }
);
