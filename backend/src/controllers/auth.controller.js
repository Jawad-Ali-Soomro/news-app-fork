import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import verificationEmail from "../mails/verificationEmail.js";
import { cookieOptions } from "../config/options.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateFieldsBySchema } from "../utils/validationHelper.js";
import { verifyRefreshToken } from "../utils/authUtils.js";
import { userLoginSchema, userRegistrationSchema } from "../schema/userShema.js";
import {
  createNewUser,
  findUser,
  findUserAndUpdate,
  findUserById,
  findUserWithPassword,
} from "../services/user.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const validatedFields = validateFieldsBySchema(userRegistrationSchema, req.body);
  console.log(validatedFields);
  if (validatedFields) {
    throw new ApiError(400, "There is some validation error");
  }
  const userData = req.body;
  const createdUser = await createNewUser({ ...userData });
  if (!createdUser) {
    throw new ApiError(500, "Error while creating user document in database");
  }

  // send account verification email to user
  await verificationEmail(createdUser._id);
  return new ApiResponse(201, { user: createdUser }, "Account created successfully, varify now via email").send(res);
});

export const loginUser = asyncHandler(async (req, res) => {
  const validatedFields = validateFieldsBySchema(userLoginSchema, req.body);
  if (validatedFields) {
    throw new ApiError(400, "There is some validation error");
  }

  const { username, password } = req.body;

  const user = await findUserWithPassword({ $or: [{ email: username }, { username }] });
  if (!user) {
    throw new CustomError(400, "User not found Invalid username or password");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new CustomError(400, "User not found Invalid username or password");
  }

  const { accessToken, refreshToken } = await user.getJwtTokens();
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return new ApiResponse(200, { user }, "User Login successfully ").send(res);
});

export const userAutoLoginWithRefreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken || req.headers["Authorization"]?.replace("Berear ", "");
  if (!token) {
    throw new ApiError(401, "your are not authenticated, refresh token not found ");
  }

  const decodedToken = verifyRefreshToken(token);
  if (!decodedToken) {
    throw new ApiError(401, "your  are not authenticated, Invalid refresh token ");
  }

  const user = await findUserById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "your  are not authenticated, Invalid has expired or Invalid ");
  }
  const { accessToken, refreshToken } = await user.getJwtTokens();
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return new ApiResponse(200, { user }, "user access token has refreshed successfully ").send(res);
});

export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const deletedRefreshToken = await findUserAndUpdate({ _id: userId }, { $unset: { refreshToken: 1 } });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return new ApiResponse(200, {}, "user has logout successfully").send(res);
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (token?.trim()) {
    throw new ApiError(400, "verification token not found");
  }
  const user = await findUser({ verificationToken: token });
  if (!user) {
    throw new ApiError(401, "Invalid verification token ");
  }
  user.verified = true;
  const savedUser = await user.save({ validateModifiedOnly: true });
  console.log(savedUser);
  if (!savedUser) {
    throw new ApiError(401, "Error while saving user document in database");
  }
  return new ApiResponse(200, { user }, "user has verified succesfully now you can login ").send(res);
});
