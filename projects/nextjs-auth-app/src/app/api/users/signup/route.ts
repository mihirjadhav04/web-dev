// we need to verify/make new db connection as this is independent
// function so while deplying it doesn't know about it's connection with db.

import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer";

dbconnect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        //validation 
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if (user){
            return NextResponse.json(
                { error : "User with email address, already exists!"},
                { status: 400 }
            )
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendMail({email, emailType:"VERIFY", userId:savedUser._id })
        return NextResponse.json(
            {
                message: "User Registered Successfully!",
                success: true,
                savedUser
            }
        )

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}