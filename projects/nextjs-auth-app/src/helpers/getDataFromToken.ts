// Import NextRequest from Next.js and jsonwebtoken for handling JWTs.
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

// Function to retrieve the user ID by decoding the token from the request cookies.
export const getDataFromToken = (request: NextRequest) => {
    console.log("inside getDataFromToken");

    try {
        // Retrieve the token from the cookies in the request. If it doesn’t exist, default to an empty string.
        const token = request.cookies.get("token")?.value || ""
        console.log(token);

        // Decode the token using the secret stored in environment variables.
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log("Decoded Token:", decodedToken);
        console.log("User ID:", decodedToken.id);

        // Return the user ID extracted from the decoded token.
        return decodedToken.id
    } catch (error: any) {
        // If decoding fails, throw a new error with the message for further handling.
        throw new Error(error.message)
    }
}
