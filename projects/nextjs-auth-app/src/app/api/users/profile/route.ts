// Import necessary modules and connect to the database.
import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken"

// Establish a connection to the database.
dbconnect()

// Define an async GET function to fetch user details based on a token.
export async function GET(request: NextRequest) {
    try {
        // Retrieve the user ID from the token in the request, using a helper function.
        const userId = await getDataFromToken(request);

        // Find the user in the database by their ID, excluding the password field from the result.
        const user = await User.findOne({ _id: userId }).select("-password");

        // Return a success response with the user's data.
        return NextResponse.json({
            message: "User found",
            data: user
        })

    } catch (error: any) {
        // If an error occurs, return an error message with a 400 status code.
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
