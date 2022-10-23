const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  email: { type: String, lowercase: true, unique: true },
  password: { type: String, require: true },
  tickets: [{ type: mongoose.Types.ObjectId, ref: "Ticket" }],
  issues: [{ type: mongoose.Types.ObjectId, ref: "Issue" }],
});

//To store the hash version of the password.
//solve the validationError
UserSchema.pre("save", async function (next) {
  try {
    //check whether the password is changing
    const user = this;
    if (!user.isModified("password")) next();
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);

    //replace plan text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
UserSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
