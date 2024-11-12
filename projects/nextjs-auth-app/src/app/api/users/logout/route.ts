// Import necessary modules and connect to the database.
import { dbconnect } from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server"

// Establish a connection to the database.
dbconnect()

// Define an async GET function to handle user logout.
export async function GET(request: NextRequest) {
    try {
        // Create a response indicating a successful logout.
        const response = NextResponse.json({
            message: "Logged Out Successfully!",
            success: true
        })  
        
        // Set the token cookie to an empty string and expire it immediately to clear it from the browser.
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
        return response

    } catch (error: any) {
        // Catch and handle any errors that occur during logout, returning a 500 status.
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        ) 
    }
}
