import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../error/CustomError.js";
import CollectionModel from "../models/Collection.model.js";

export const addToCollection = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;
    const { _id: userId } = req.user;
    const isExists = await CollectionModel.findOne({ userId, articleId });
    if (isExists) {
        throw new CustomError(
            409,
            "article has already exists in your collection"
        );
    }
    const savedArticle = await CollectionModel.create({
        userId,
        articleId
    });
    res.status(201).json({ article: savedArticle });
});

export const fetchUserCollection = asyncHandler(async (req, res) => {
    const  userId  = req.user._id;
    const saved = await CollectionModel.find({ userId }).populate(
        "userId articleId"
    );
    res.status(200).json({ articles: saved });
});

export const removeToCollection = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { id: articleId } = req.params;
    const removeItem = await CollectionModel.findOneAndDelete({
        userId,
        articleId
    });
    if (!removeItem) {
        throw new CustomError(409, "article not found ");
    }
    res.status(200).json({
        message: "remove article from your save collection"
    });
});
