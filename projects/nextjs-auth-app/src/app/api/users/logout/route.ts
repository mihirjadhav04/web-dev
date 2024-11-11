import { dbconnect } from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server"



dbconnect()



export async function GET(request: NextRequest){

    try {
        const response = NextResponse.json({
            message: "Logged Out Successfully!",
            success: true
        })  
        
        response.cookies.set("token","", { httpOnly: true , expires: new Date(0)})
        return response


    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        ) 
    }
}