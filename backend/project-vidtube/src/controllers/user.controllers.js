import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

// Helper function to generate access and refresh tokens
const generateUserAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log(user);
        
        if (!user) {
            throw new ApiError(404, "User not found. Cannot generate tokens.");
        }
    
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        console.log(accessToken);
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
    
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens.");
    }
};

// User Registration
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    // Basic validation
    if ([fullname, email, username, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists.");
    }

    // Handle image uploads
    const avatarPath = req.files?.avatar?.[0]?.path;
    const coverImagePath = req.files?.coverImage?.[0]?.path;
    
    if (!avatarPath) {
        throw new ApiError(400, "Avatar file is required.");
    }

    // Upload images to Cloudinary
    let avatar, coverImage;
    try {
        avatar = await uploadOnCloudinary(avatarPath);
        if (coverImagePath) {
            coverImage = await uploadOnCloudinary(coverImagePath);
        }
    } catch (error) {
        throw new ApiError(500, "Failed to upload images.");
    }

    // Create user in the database
    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
        if (!createdUser) {
            throw new ApiError(500, "Error during user registration.");
        }

        return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully."));
    } catch (error) {
        if (avatar) await deleteFromCloudinary(avatar.public_id);
        if (coverImage) await deleteFromCloudinary(coverImage.public_id);
        
        throw new ApiError(500, "Registration failed. Uploaded images have been removed.");
    }
});

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
        throw new ApiError(400, "Email, Username, and Password fields are required.");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password.");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateUserAccessAndRefreshToken(user._id);

    // Send tokens as HTTP-only cookies for security
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully."));
});

export { registerUser, loginUser };
