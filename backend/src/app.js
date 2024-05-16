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
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declare Index route of app
app.use((_, res) => {
  res.status(200).json({ message: "Welcome to NewsApp server " });
});

// declare routes
app.use("/api/v1/articles", articlesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/collections", collectionRouter);

// handle 404 route
app.use((_, res) => {
  res.status(404).json({ message: "route not found" });
});

// apply global error handler
app.use(handleError);

export default app;
