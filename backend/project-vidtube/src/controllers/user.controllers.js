import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullname, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);


    console.warn(req.files);
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(avatarLocalPath);
    
    // let coverImageLocalPath;
    
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage = ""
    // if(coverImageLocalPath){
    //     coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // }

    // better way of handling images.
    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Uploaded Avatar : ", avatar);
        
    } catch (error) {
        console.log("Error Uploading Avatar", error);
        throw new ApiError(500, "Failed to upload avatar file.")
        
    }

    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        console.log("Uploaded Avatar : ", coverImage);
        
    } catch (error) {
        console.log("Error Uploading Cover Image", error);
        throw new ApiError(500, "Failed to upload cover image file.")
        
    }

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email, 
            password,
            username: username.toLowerCase()
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }
    
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
    } catch (error) {
        console.log("User Creation Failed!");

        if(avatar){
            await deleteFromCloudinary(avatar.public_id)
        }
        if(coverImage){
            await deleteFromCloudinary(coverImage.public_id)
        }
        
        throw new ApiError(500, "Something went wrong by registering the user. Deleted Images from cloudinary as well ")
    }

} )

export {
    registerUser
}