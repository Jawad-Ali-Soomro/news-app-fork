import UserModel from "../models/User.model.js";
import { findUserById } from "./user.service.js";

export const findChannels = async () => {
  const channels = await UserModel.find({
    role: "NEWS_CHANNEL",
    channelApprovalStatus: "ACCEPTED",
  });
  return channels;
};

export const findChannelById = async channelId => {
  const channel = await UserModel.findOne({
    role: "NEWS_CHANNEL",
    channelApprovalStatus: "ACCEPTED",
    _id: channelId,
  });
  return channel;
};

//follow the channel push userId in channel followers,Ensure user has not already following this channel
export const followingTheChannelByUser = async (channelId, userId) => {
  const channel = await findChannelById(channelId);
  const user = await findUserById(userId);
  //update the new lists of followers and following to respective document
  user.following = [...user.following, channelId];
  channel.followers = [...channel.followers, userId];
  await user.save();
  await channel.save();
  return channel;
};

//unfollow the channel,
export const unfollowTheChannelByUser = async (channelId, userId) => {
  const channel = await findChannelById(channelId);
  const user = await findUserById(userId);
  //remove userId from channel followers list, remove channelId from user following list
  channel.followers = [...channel.followers].filter(item => item != userId);
  user.following = [...user.following].filter(item => item != channelId);
  await user.save();
  await channel.save();
  return channel;
};

//check user has already following given channel or not,
export const isChannelFollowedByUser = async (channelId, userId) => {
  const channel = await findChannelById(channelId);
  const user = await findUserById(userId);
  const hasFollowing = user.following.includes(channelId);
  const hasFollower = channel.followers.includes(userId);
  if (hasFollowing && hasFollower) return true;
  return false;
};

export const acceptChannelRequestByAdmin = async channelId => {
  return await UserModel.findByIdAndUpdate(channelId, {
    channelApprovalStatus: "ACCEPTED",
  });
};

export const rejectChannelRequestByAdmin = async channelId => {
  return await UserModel.findByIdAndUpdate(channelId, {
    channelApprovalStatus: "REJECTED",
  });
};

export const findChannelRequestsForAdmin = async () => {
  return await UserModel.find({ role: "NEWS_CHANNEL" });
};
