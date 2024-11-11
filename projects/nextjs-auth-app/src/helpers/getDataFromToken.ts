import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"


// willl return the id by decoding the token.
export const getDataFromToken = (request: NextRequest) => {
    console.log("inside getDataFromToken");
    
    try {
        const token = request.cookies.get("token")?.value || ""
        console.log(token);
        
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("Decoded Token:", decodedToken);
        console.log("User ID:", decodedToken.id);
        
        return decodedToken.id
    } catch (error:any) {
        throw new Error(error.message)
    }
}