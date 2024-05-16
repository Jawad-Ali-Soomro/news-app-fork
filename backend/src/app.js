import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import articlesRouter from "./routes/articles.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import channelRouter from "./routes/channel.route.js";
import collectionRouter from "./routes/collection.route.js";
import { handleError } from "./error/errorHandler.js";
import { corsOptions } from "./config/options.js";
const app = express();

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://news-app-mern-wheat.vercel.app/"); //https://news-app-mern-wheat.vercel.app/auth/login
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routers for respective endpoints routes
app.use("/api/v1/articles", articlesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/collections", collectionRouter);

//Handle Errors Globally !
app.use(handleError);
// eslint-disable-next-line no-undef
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, reason);
});

export default app;
