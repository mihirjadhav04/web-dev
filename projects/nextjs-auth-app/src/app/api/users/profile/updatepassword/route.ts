import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { log } from "console";

// Connect to the database
dbconnect();

export async function POST(request: NextRequest) {
    try {
        // Retrieve the user ID from the token in the request using the helper function.
        const userId = await getDataFromToken(request);

        // Parse the request body
        const reqBody = await request.json();
        console.log("Request Body:", reqBody);

        // Destructure the oldPassword and updatedPassword from the request body
        const { oldPassword, updatedPassword } = reqBody;

        // Validate if required fields are present in the request
        if (!oldPassword || !updatedPassword) {
            return NextResponse.json({
                message: "Old and updated passwords are required.",
            }, { status: 400 });
        }

        // Log the user ID retrieved from the token
        console.log("User ID from token:", userId);

        // Find the user by ID and exclude the password from the result
        const user = await User.findById(userId);

        // If no user is found, return an error response
        if (!user) {
            return NextResponse.json({
                message: "User not found.",
            }, { status: 404 });
        }

        console.log("User found:", user);

        // Verify the old password provided by the user
        const isOldPasswordCorrect = await bcryptjs.compare(oldPassword, user.password);
        
        // If the old password doesn't match, return an error response
        if (!isOldPasswordCorrect) {
            return NextResponse.json({
                message: "Old password is incorrect.",
            }, { status: 400 });
        }

        // Generate a salt and hash the updated password
        const salt = await bcryptjs.genSalt(10);
        const updatedHashedPassword = await bcryptjs.hash(updatedPassword, salt);

        // Update the user's password with the hashed new password
        user.password = updatedHashedPassword;

        // Save the updated user data to the database
        await user.save();
        console.log("Updated user:", user);

        // Return a success response with the updated user (excluding the password)
        return NextResponse.json({
            message: "Password updated successfully!",
            user: {
                id: user._id,
                email: user.email,
                // Include other fields as necessary, excluding the password
            },
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error updating password:", error);
        return NextResponse.json({
            message: "An error occurred while updating the password.",
        }, { status: 500 });
    }
}
