import mongoose from "mongoose";

const savedArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    articleId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "article",
    },
  },
  { timestamps: true },
);

const CollectionModel = mongoose.model("savedArticle", savedArticleSchema);

export default CollectionModel;
