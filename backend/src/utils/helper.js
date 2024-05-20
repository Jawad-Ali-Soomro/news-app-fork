import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config/envManager.js";
export const hashedPassword = async password => {
  const hash = await bcryptjs.hash(password, 10);
  return hash;
};

export const comparePassword = async (original, hashed) => {
  const isValid = await bcryptjs.compare(original, hashed);
  return isValid;
};

export const userTokenGenerator = userObj => {
  try {
    const userToken = Jwt.sign({ ...userObj }, TOKEN_SECRET_KEY, {
      expiresIn: Date.now() * 3600 * 1000,
    });
    return userToken;
  } catch (error) {
    console.log("Error in Tokens");
  }
};

export const verifyUserToken = token => {
  try {
    const isVerifiedUser = Jwt.verify(token, TOKEN_SECRET_KEY);
    return isVerifiedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const generateToken = () => {
  const string = crypto.randomBytes(30).toString("hex");
  const token = crypto.createHash("sha256").update(string).digest("hex");
  return token;
};

export const capitalizeWords = text => {
  return text.replace(/\b\w/g, m => m.toUpperCase());
};
