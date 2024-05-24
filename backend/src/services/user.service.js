import { comparePassword, hashedPassword } from "../utils/helper.js";
import UserModel from "../models/User.model.js";

export const findUsers = async query => {
  return await UserModel.find(query);
};
export const findUserById = async userId => {
  return await UserModel.findById(userId);
};

export const findUserWithPassword = async query => {
  return await UserModel.findOne(query).select("+password");
};

export const findUserAndDelete = async query => {
  return await UserModel.findOneAndDelete(query);
};

//register new user in database
export const createNewUser = async userData => {
  const hashed = await hashedPassword(userData.password);
  const newUser = new UserModel({
    ...userData,
    password: hashed,
    role: "USER",
  });
  return await newUser.save();
};
//register new channel account and Ensure admin accept his request for account creating
export const createNewChannel = async channelData => {
  const hashed = await hashedPassword(channelData.password);
  const newUser = new UserModel({
    ...channelData,
    password: hashed,
    role: "NEWS_CHANNEL",
    approvalStatus: "PENDING",
  });
  return await newUser.save();
};

export const findUser = async query => {
  return await UserModel.findOne(query);
};

export const findUserByEmail = async email => {
  return await UserModel.findOne({ email });
};

export const findUserByEmailAndPassword = async (email, password) => {
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) return null;
  const isMatchedPassword = await comparePassword(password, user.password);
  if (!isMatchedPassword) return null;
  return user;
};

export const findUserAndUpdate = async (query, updatedInfo) => {
  return await UserModel.findOneAndUpdate(query, updatedInfo, { new: true });
};
