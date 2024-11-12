// Establish a new database connection since this is an independent function.
// In a deployment environment, it may not be aware of the existing database connection.

import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer";

// Connect to the database. This ensures that every time this function is called, it has a valid connection to the database.
dbconnect()

// Define an async POST function to handle user registration.
export async function POST(request: NextRequest){
    try {
        // Parse the request body to get user details like username, email, and password.
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        // Log the request body for debugging.
        console.log(reqBody);
        
        // Check if a user with the same email already exists in the database.
        const user = await User.findOne({ email })

        // If user with the email already exists, send a response with an error message and status 400.
        if (user){
            return NextResponse.json(
                { error: "User with email address, already exists!" },
                { status: 400 }
            )
        }

        // Generate a salt for password hashing.
        const salt = await bcryptjs.genSalt(10)
        // Hash the password using bcryptjs with the generated salt.
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create a new user instance with the hashed password.
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        // Save the new user to the database.
        const savedUser = await newUser.save()
        console.log(savedUser);

        // Send a verification email to the new user.
        // await sendMail({ email, emailType: "VERIFY", userId: savedUser._id })
        
        // Return a success response with the saved user details.
        return NextResponse.json(
            {
                message: "User Registered Successfully!",
                success: true,
                savedUser
            }
        )

    } catch (error: any) {
        // Handle any errors that occur during registration and return a status of 500 with the error message.
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
