import mongoose from "mongoose";
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
    {
        token: { type: String, required: true },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
    },
    { timestamps: true }
);
export const TokenModel = mongoose.model("token", refreshTokenSchema);
