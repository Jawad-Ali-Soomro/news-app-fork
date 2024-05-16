import { cookieOptions } from "../config/options.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userTokenGenerator, verifyUserToken } from "../utils/helper.js";
import CustomError from "../error/CustomError.js";
import notifyEmail from "../mails/notifyEmail.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {
  createNewChannel,
  createNewUser,
  findUserByEmail,
  findUserByEmailAndPassword,
  findUserById,
} from "../services/user.service.js";

//register new user, Ensure this is not already exist in database and also automatic login
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(name, username, email, password);
  //validate user data
  if ([name, email, username, password].some(field => field === "")) {
    throw new CustomError(400, "All fields are required");
  }
  //validate profile Image and cover Image
  if (!req.files.profileImage[0].path || !req.files.coverImage[0].path) {
    throw new CustomError(409, "please upload Images ");
  }
  //check If user email is already exist in database
  const isExist = await findUserByEmail(email);
  if (isExist) {
    throw new CustomError(409, "your Email is already Exists ");
  }
  //upload profile Image on cloudinary server and Get Image URL
  const profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
  //upload cover Image on cloudinary server and Get Image URL
  const coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
  //If anyone create his user account
  const createdUser = await createNewUser({
    name,
    username,
    email,
    password,
    profileImage: profileImage.secure_url,
    coverImage: coverImage.secure_url,
  });
  //send notify email to this user for informed account creation
  await notifyEmail({
    sendTo: "atifahmad2219@gmail.com",
    subject: `Thanks for join us, your account has been created on NewsApp`,
    description: "your account has created ! we were has very excited to see you, why you here !",
    username,
  });
  //Generate Jwt token and assign to user in cookie
  const token = userTokenGenerator({ _id: createdUser._id });
  res.cookie("token", token, cookieOptions);
  return res.status(201).json({ user: createdUser });
});

//register new channel, Ensure this is not already exist in database and also automatic login
export const registerChannel = async (req, res) => {
  const { name, username, email, password, about, headline } = req.body;
  console.log(name, username, email, password, about, headline);
  //validate channel data
  if ([name, email, username, password, about, headline].some(field => field === "")) {
    throw new CustomError(400, "All fields are required");
  }
  //validate profile Image and cover Image
  if (!req.files.profileImage[0].path || !req.files.coverImage[0].path) {
    throw new CustomError(409, "please upload Images ");
  }
  //check If user email is already exist in database
  const isExist = await findUserByEmail(email);
  if (isExist) {
    throw new CustomError(409, "your Email is already Exists ");
  }
  //upload profile Image on cloudinary server and Get Image URL
  const profileImage = await uploadOnCloudinary(req.files.profileImage[0].path);
  //upload cover Image on cloudinary server and Get Image URL
  const coverImage = await uploadOnCloudinary(req.files.coverImage[0].path);
  //If anyone create his user account
  const createdChannel = await createNewChannel({
    name,
    username,
    email,
    password,
    about,
    headline,
    profileImage: profileImage.secure_url,
    coverImage: coverImage.secure_url,
  });
  //send notify email to this user for informed account creation
  await notifyEmail({
    sendTo: "atifahmad2219@gmail.com",
    subject: `your channel creation request has pending please wait for admin response...`,
    description:
      "Thanks for give us request for news channel creation so your request has pending please wait for admin response...",
    username,
  });
  //Generate Jwt token and assign to user in cookie
  const token = userTokenGenerator({ _id: createdChannel._id });
  res.cookie("token", token, cookieOptions);
  return res.status(201).json({ user: createdChannel });
};
//controller for login, Get email and password from request body and find it
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validate user data
  if (!email || !password) {
    throw new CustomError(400, "All fields are required");
  }
  //If user not found, Invalid email or password
  const user = await findUserByEmailAndPassword(email, password);
  if (!user) {
    throw new CustomError(400, "Invalid username or password");
  }
  //Generate Jwt token and assign to user in cookie
  const token = userTokenGenerator({ _id: user._id });
  res.cookie("token", token, cookieOptions);
  res.status(200).json({ user });
});

//controller of refresh route, whenever page has refresh so user has automatic login
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError(401, "your are not authenticated ");
  }
  //verify the user token, check user has login or not
  const verifiedUser = verifyUserToken(token);
  if (!verifiedUser) {
    throw new CustomError(401, "your are not authenticated ");
  }
  //assigned new token to user in cookie
  const newToken = userTokenGenerator({ _id: verifiedUser._id });
  res.cookie("token", newToken, cookieOptions);
  const user = await findUserById(verifiedUser._id);
  res.status(200).json({ user });
});

//logout the user and  Ensure user has already login
export const logout = asyncHandler((req, res) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError(401, "your are not authenticated  ");
  }
  //verify the user token, check user has login or not before logout
  const verifiedUser = verifyUserToken(token);
  if (!verifiedUser) {
    throw new CustomError(401, "your  are not authenticated  ");
  }
  //clear token  from user cookies
  res.clearCookie("token");
  res.status(200).json({ message: "your successfully logout !" });
});
