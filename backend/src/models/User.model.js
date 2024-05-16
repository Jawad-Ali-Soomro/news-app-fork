import mongoose from "mongoose";

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
      type: String, //url from third party server's service
      required: true,
    },
    coverImage: {
      type: String, //url from thirst party server's service
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
  },
  { timestamps: true },
);

//define custom functions of this model document
userSchema.methods.checkPassword = () => {
  console.log("your function whenever you call it ");
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
