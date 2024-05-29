import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserModel from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { validateSchema } from "../utils/validationHelper.js";
import { changePasswordSchema, updateAccountSchema } from "../schema/userSchema.js";
import {
  findUser,
  findUserAndDelete,
  findUserAndUpdate,
  findUserWithPassword,
  findUsers,
} from "../services/user.service.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  new ApiResponse(200, { user }, "current user feched successfully").send(res);
});

export const getAllUsersList = asyncHandler(async (req, res) => {
  const users = await findUsers({});
  if (!users?.length) {
    throw new ApiError(404, "users not found !");
  }
  new ApiResponse(200, { users }, "users list feched successfully").send(res);
});

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id in params !");
  }
  const user = await findUser({ _id: userId });
  if (!user) {
    throw new ApiError(404, "user not found !");
  }
  new ApiResponse(200, { user }, "user feched successfully").send(res);
});

export const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const validatedFields = validateSchema(changePasswordSchema, req.body);
  const { currentPassword, newPassword } = validatedFields;
  const userId = req.user?._id;
  const user = await findUserWithPassword({ _id: userId });

  const isValidPassword = await user.comparePassword(currentPassword);
  if (!isValidPassword) {
    throw new ApiError(400, "Invalid current password");
  }
  user.password = newPassword;
  await user.save({ validateModifiedOnly: true });

  new ApiResponse(200, {}, "password changes successfully").send(res);
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const validatedFields = validateSchema(updateAccountSchema, req.body);
  const { name, username, headline, about } = validatedFields;
  const userId = req.user?._id;
  // Ensure provided username is not exists already
  const existedUser = await findUser({ username });
  // If loggedIn user and existedUser are same, means existedUser is current user document
  if (existedUser?._id && String(existedUser?._id) !== String(userId)) {
    throw new ApiError(400, "username is already exists");
  }
  const updatedUser = await findUserAndUpdate({ _id: userId }, { name, headline, about });
  new ApiResponse(200, { updatedUser }, "account has updated successfully ").send(res);
});

export const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  const userId = req.user?._id;
  console.log(req.file);
  if (!avatarLocalPath) {
    throw new ApiError(400, "please upload Image to change the avatar ");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const updatedUserDetails = await findUserAndUpdate({ _id: userId }, { avatar: avatar?.secure_url });
  if (!updatedUserDetails) {
    throw new ApiError(400, "Error while updating user avatar in database ");
  }
  new ApiResponse(200, { avatar: updatedUserDetails.avatar }, "avatar has changed successfully ").send(res);
});

export const changeUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req?.file?.path;
  const userId = req.user?._id;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "please upload Image to change the coverImage ");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  const updatedUserDetails = await findUserAndUpdate({ _id: userId }, { coverImage: coverImage?.secure_url });
  if (!updatedUserDetails) {
    throw new ApiError(400, "Error while updating user coverImage in database ");
  }
  new ApiResponse(200, { coverImage: updatedUserDetails.coverImage }, "coverImage has changed successfully ").send(res);
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const deletedAccount = await findUserAndDelete({ _id: userId });
  console.log(deletedAccount);
  if (!deletedAccount) {
    throw new ApiError(400, "Error while deleting user account from database");
  }
  new ApiResponse(200, {}, "your account has been deleted successfully !").send(res);
});
