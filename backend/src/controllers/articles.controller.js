import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteArticleById,
    disLikeTheArticleByUser,
    findArticleById,
    findArticles,
    likeTheArticleByUser,
    updateArticleById,
    createArticle,
    findArticleCommentsById,
    addCommentOnArticle,
    findArticlesByQuery
} from "../services/article.service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import CustomError from "../error/CustomError.js";

export const allArticles = asyncHandler(async (req, res) => {
    const articles = await findArticles();
    if (req.query.query) {
        console.log(req.query);
        const queryArticles = await findArticlesByQuery(req.query.query);
        return res.status(200).json({ articles: queryArticles });
    }
    res.status(200).json({ articles });
});

export const articleById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await findArticleById(id);
    res.status(200).json({ article });
});

//store new article in DB from writeArticle function,Integrate channel as a author
export const addNewArticle = asyncHandler(async (req, res) => {
    const { title, content, description } = req.body;
    //validate article data
    if ([title, content, description].some(field => field?.trim() === "")) {
        throw new CustomError(400, "All fields are required");
    }
    if (!req.file.path) {
        throw new CustomError(400, "please upload article Image ");
    }
    const profileImage = await uploadOnCloudinary(req.file.path);
    const authorId = req.author._id;
    const createdArticle = await createArticle({
        title,
        content,
        description,
        urlToImage: profileImage.secure_url,
        author: authorId
    });
    res.status(201).json({
        message: "your new article has successfully !",
        article: createdArticle
    });
});

export const updateArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { updatedArticle } = req.body;
    await updateArticleById(id, updatedArticle);
    res.status(200).json({ message: "article has successfully updated " });
});

export const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteArticleById(id);
    res.status(200).json({ message: "article has successfully deleted " });
});

export const likeArticleById = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;
    const { _id: userId } = req.user;
    await likeTheArticleByUser(articleId, userId);
    res.status(200).json({ message: "your liked the article " });
});

export const disLikeArticleById = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;
    const { _id: userId } = req.user;
    await disLikeTheArticleByUser(articleId, userId);
    res.status(200).json({ message: "you dislike the article" });
});

//fetch all comments of specific article by Id
export const fetchArticleComments = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;
    const comments = await findArticleCommentsById(articleId);
    res.status(200).json({ comments });
});

//add new comment on specific article
export const addComment = asyncHandler(async (req, res) => {
    const { articleId, commentText } = req.body;
    const { _id: userId } = req.user;
    const createdComment = await addCommentOnArticle({
        articleId,
        commentText,
        userId
    });
    res.status(200).json({
        comment: createdComment,
        message: "comment added successfully "
    });
});
