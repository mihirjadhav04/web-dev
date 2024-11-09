import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: auto})
        console.log("File Uploaded on Cloudinary. File Source : ", response.url);
        
        // once uploaded then delete from local server.
        fs.unlinkSync(localFilePath)

        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


export { uploadOnCloudinary }