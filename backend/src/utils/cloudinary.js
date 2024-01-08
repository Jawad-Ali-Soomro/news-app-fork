import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import CustomError from "../error/CustomError.js";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME
} from "../config/exportEnv.js";
cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadOnCloudinary = async localFilePath => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been upload process success full
        fs.unlinkSync(localFilePath, err => {
            console.log(err);
        });
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath, err => {
            console.log(err);
        });
        throw new CustomError(500, "please retry file upload again !");
    }
};
