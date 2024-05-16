/* eslint-disable no-unused-vars */
import { findChannelArticles } from "../services/article.service.js";
import {
  acceptChannelRequestByAdmin,
  findChannelById,
  findChannelRequestsForAdmin,
  findChannels,
  followingTheChannelByUser,
  isChannelFollowedByUser,
  rejectChannelRequestByAdmin,
  unfollowTheChannelByUser,
} from "../services/channel.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import notifyEmail from "../mails/notifyEmail.js";
export const allChannels = asyncHandler(async (req, res, next) => {
  const channels = await findChannels();
  res.status(200).json({ channels });
});

export const channelById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const channel = await findChannelById(id);
  res.status(200).json({ channel });
});

export const channelProfileById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const channel = await findChannelById(id);
  const articles = await findChannelArticles(id);
  res.status(200).json({ profile: { channel, articles } });
});

//user has follow and unfollow the channel by the its IDs
export const followToChannel = asyncHandler(async (req, res, next) => {
  const { id: channelId } = req.params;
  const { _id: userId } = req.user;
  //If already follow this channel,so unfollow this channel
  const hasFollowed = await isChannelFollowedByUser(channelId, userId);
  if (hasFollowed) {
    const channel = await unfollowTheChannelByUser(channelId, userId);
    res.status(201).json({
      message: ` you unfollow the  ${channel.username} channel `,
    });
  } else {
    //If user not following this channel, so follow this channel
    const channel = await followingTheChannelByUser(channelId, userId);
    res.status(201).json({
      message: `are you now following ${channel.username}`,
    });
  }
});

export const acceptChannelRequest = asyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const approval = await acceptChannelRequestByAdmin(channelId);
  const channel = await findChannelById(channelId);
  await notifyEmail({
    sendTo: "atifahmad2219@gmail.com",
    subject: `Congratulations your request has been approved by App admin...`,
    description:
      "your gave a request for channel creation so your request has been approved by admin, now you able to publish your Articles on App ",
    username: channel.username,
  });
  res.status(202).json({ message: "you approved this channel " });
});

export const rejectChannelRequest = asyncHandler(async (req, res) => {
  const channelId = req.params.id;
  const approval = await rejectChannelRequestByAdmin(channelId);
  const channel = await findChannelById(channelId);
  await notifyEmail({
    sendTo: "atifahmad2219@gmail.com",
    subject: `we are sorry! your request has been rejected by App admin...`,
    description:
      "your gave a request for channel creation so we are sorry because your request has been rejected by admin,please try another platform !",
    username: channel?.username,
  });
  res.status(202).json({ message: "you reject this channel " });
});

export const allRequest = asyncHandler(async (req, res) => {
  const requests = await findChannelRequestsForAdmin();
  res.status(200).json({ channels: requests });
});
