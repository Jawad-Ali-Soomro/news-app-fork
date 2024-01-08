import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user"
        },
        articleId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "article"
        },
        commentText: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const CommentModel = mongoose.model("comment", commentSchema);

export default CommentModel;
