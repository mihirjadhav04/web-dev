// Import necessary modules and connect to the database.
import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

// Establish a connection to the database.
dbconnect()

// Define an async POST function to handle email verification.
export async function POST(request: NextRequest) {
    try {
        // Parse the request body to retrieve the verification token.
        const reqBody = await request.json()
        const { token } = reqBody

        // Log the verification token for debugging.
        console.log("verification token: ", token);
        
        // Find the user with a matching verification token that has not expired.
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        
        // If no user is found, return an error message with a 400 status.
        if (!user) {
            return NextResponse.json({ error: "Invalid token!" }, { status: 400 })
        }

        console.log(user);

        // Update the user's verification status and clear the verification token and its expiry.
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        // Save the updated user document to the database.
        await user.save() // Await required due to potential latency from remote database location.

        // Return a success response indicating successful email verification.
        return NextResponse.json({
            message: "Email verified successfully!!",
            success: true
        }, { status: 200 }) 

    } catch (error: any) {
        // Catch and handle any errors that occur during verification, returning a 500 status.
        return NextResponse.json({ error: error.message }, { status: 500 }) 
    }
}
