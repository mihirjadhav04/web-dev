// Import necessary modules and connect to the database.
import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

// Establish a connection to the database.
dbconnect()

// Define an async POST function to handle user login.
export async function POST(request: NextRequest) {
    try {
        // Parse the request body to retrieve the user's email and password.
        const reqBody = await request.json()
        const { email, password } = reqBody

        // Log the request body for debugging purposes.
        console.log(reqBody);
        
        // Check if a user with the provided email exists in the database.
        const user = await User.findOne({ email })
        console.log(user);
        
        // If no user is found, respond with an error message and status 400.
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." },
                { status: 400 }
            ) 
        }

        // Compare the provided password with the stored hashed password.
        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword);
        
        // If the password is incorrect, respond with an error message and status 400.
        if (!validPassword) {
            return NextResponse.json(
                { error: "Incorrect Password!" },
                { status: 400 }
            ) 
        }

        console.log(user);

        // Prepare token data with user details to be signed.
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        // Sign the token with the user data, using a secret key, and set an expiration of 1 day.
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        console.log(token);
        
        // Create a response message indicating a successful login.
        const response = NextResponse.json({
            message: "Logged In Successfully!",
            success: true
        })

        // Set the token as a cookie with httpOnly enabled for security.
        response.cookies.set("token", token, { httpOnly: true })
        return response

    } catch (error: any) {
        // Catch and handle any errors that occur during the login process, returning a 500 status.
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
