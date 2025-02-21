import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const defaultOpts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, defaultOpts);
    if (result?.secure_url) {
      return result.secure_url;
    }
    throw new Error("Upload failed");
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export default uploadImage