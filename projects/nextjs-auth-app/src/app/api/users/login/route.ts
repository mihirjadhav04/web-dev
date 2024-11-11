import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


dbconnect()



export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        //validation 
        console.log(reqBody);
        
        const user = await User.findOne({email})
        console.log(user);
        
        if(!user){
            return NextResponse.json(
                {error: "User does not exists."},
                {status: 400}
            ) 
        }

        const vaildPassword = await bcryptjs.compare(password, user.password)
        console.log(vaildPassword);
        
        if(!vaildPassword){
            return NextResponse.json(
                {error: "Incorrect Password!"},
                {status: 400}
            ) 
        }

        console.log(user);

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d'})
        console.log(token);
        
        const response = NextResponse.json({
            message: "Logged In Successfully!",
            success: true
        })

        response.cookies.set("token", token, { httpOnly : true })
        return response


    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}