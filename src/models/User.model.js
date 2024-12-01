const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = model("User", userSchema);

module.exports = User;
