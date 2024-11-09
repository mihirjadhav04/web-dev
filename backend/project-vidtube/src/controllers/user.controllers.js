import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

// Helper function to generate access and refresh tokens
const generateUserAccessAndRefreshToken = async (userId) => {
    try {
        // Find user in the database
        const user = await User.findById(userId);
        
        // If no user is found, throw an error
        if (!user) {
            throw new ApiError(404, "User not found. Cannot generate tokens.");
        }
        
        // Generate tokens using user instance methods
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        // Save the refresh token in the database
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

    // Basic validation to ensure all required fields are provided
    if ([fullname, email, username, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    // Check for existing user by email or username
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists.");
    }

    // Handle image uploads (avatar is required, cover image is optional)
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

    // Create user in the database with provided data
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
        // Delete uploaded images if registration fails
        if (avatar) await deleteFromCloudinary(avatar.public_id);
        if (coverImage) await deleteFromCloudinary(coverImage.public_id);
        
        throw new ApiError(500, "Registration failed. Uploaded images have been removed.");
    }
});

// User Login
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!email || !username || !password) {
        throw new ApiError(400, "Email, Username, and Password fields are required.");
    }

    // Find the user by email or username
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Check if provided password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password.");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateUserAccessAndRefreshToken(user._id);

    // Set HTTP-only cookies for security
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

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    // Retrieve refresh token from cookies or request body
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token required!");
    }

    try {
        // Verify the refresh token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Find the user by decoded token's ID
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "User not found - Invalid Refresh Token!");
        }

        // Check if the refresh token matches the one stored in the database
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid Refresh Token!");
        }

        // Generate new access and refresh tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateUserAccessAndRefreshToken(user._id);

        // Set tokens as HTTP-only cookies for security
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully!"));
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing the access token.");
    }
});

// User Logout
const logoutUser = asyncHandler(async (req, res) => {
    // Clear cookies and remove refresh token from the database
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    
    return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully."));
});

export { registerUser, loginUser, refreshAccessToken, logoutUser };
