const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require('../keys');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/insta-image-cloud/image/upload/v1612271171/defaultProfile_trtyty.png",
  },
  bio: String,
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followersCount: {
    type: Number,
    default: 0,
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  followingCount: {
    type: Number,
    default: 0,
  },
  posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  postCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Gets the jwt token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET);
};

// Checks if password matches
UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);