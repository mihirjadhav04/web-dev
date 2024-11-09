import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authMiddlewareJWT = asyncHandler( async (req, _, next) => {
    try {
        const token = req.cookies.accessToken || req.cookies.body || req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError(401, "Access token missing. Please log in.");
        }

        // Verify the access token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?._id);
        if (!user) {
            throw new ApiError(401, "Invalid token. User not found.");
        }

        // Attach user to request for subsequent handlers
        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, error?.message,  "Authentication failed. Please log in again."));
    }
});
