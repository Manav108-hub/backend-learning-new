// this is used to store files in the cloudinary 
import { v2 as cloudinary } from "cloudinary"
import fs from "fs" // -> this used for file system read write etc

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_API_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

// trying to upload a file from local to cloud 
const uploadOnCloudinary = async (localFilePath)  => {
    try {
        if(!localFilePath) {
            return null
        }

        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        }) 
        //file uploaded   
        console.log("FILE UPLOADED SUCCESSFULLY : " , response.url);
    return response;     
    }  
catch (error) {
    // error in the uploading so we need to remove it locally 
    fs.unlinkSync(localFilePath)

    return null;
}
}

export { uploadOnCloudinary }