import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import ApiError from "../utils/ApiError.js";
import { assignAccessToken, assignRefreshToken } from "../utils/authUtils.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [5, "Name at least should be Greater then 5 characters "],
      maxLength: [15, "Name must be less then 15 characters "],
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImage: {
      type: String, //url from cloudry service
      required: true,
    },
    coverImage: {
      type: String, //url from cloudry service
      default: "myImage",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "NEWS_CHANNEL"],
      default: "USER",
    },
    about: {
      type: String,
      default: "Hey, i am using newsApp",
    },
    headline: {
      type: String,
      default: "Frontend Developer | React Developers",
    },
    channelApprovalStatus: {
      type: String,
      enum: ["ACCEPTED", "REJECTED", "PENDING"],
      default: "PENDING",
    },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],

    verified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    accountVerificationToken: String,
    accountVerificationExpire: Date,
  },
  { timestamps: true },
);

// handle duplicate key error
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]; // Get the field causing the error
    const value = error.keyValue[field]; // Get the value causing the error
    throw new ApiError(409, `${field} ${value} already exists`);
  }
  next(error);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Middleware to generate a verification token before saving a new user
userSchema.pre("save", function (next) {
  const now = new Date();
  if (!(this.isNew && !this.verified)) return next();
  this.verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationExpire = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate access and refresh token using JWT and refresh token save in user document
userSchema.methods.getJwtTokens = async function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  const accessToken = assignAccessToken(payload);
  const refreshToken = assignRefreshToken(payload);

  this.refreshToken = refreshToken;
  await this.save();

  return { accessToken, refreshToken };
};

userSchema.methods.generateResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  await this.save();
  console.log("reset password token", this.resetPasswordToken, this.resetPasswordExpire);
  return resetToken;
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
