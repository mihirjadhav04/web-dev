import { dbconnect } from "@/db/dbconfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"

dbconnect()

export async function POST(request: NextRequest){
    try {
      
        const reqBody = await request.json()
        const {token} = reqBody

        console.log("verification token: ", token);
        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
            
        if(!user){
            return NextResponse.json({error:"invaild token!"},{status: 400})
        }

        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        
        await user.save() // await required as db is in another continent..
        return NextResponse.json({
            message: "email verified successfully!!",
            success: true
        }, { status: 200}) 
        
    } catch (error: any) {
        return NextResponse.json({error: error.message }, { status: 500}) 
    }
}