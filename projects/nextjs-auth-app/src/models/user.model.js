import mongoose, { mongo } from "mongoose";

// Define a schema for the User model with fields for username, email, password, verification status, admin status, 
// forgot password token, and verification token.
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "please provide username."],
        unique: true
    },
    email: {
        type: String,
        required: [ true, "please provide email."],
        unique: true
    },
    password: {
        type: String,
        required: [ true, "please provide password."],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

// Check if the model is already created in the mongoose models collection. If so, use the existing model to avoid recompiling; otherwise, create a new model with the User schema. This is important in serverless environments (such as Next.js) where the connection might persist across function calls.
const User = mongoose.models.users || mongoose.model("users", UserSchema)
export default User

// Previous approach (for reference):
// We used to define and export the model directly as shown below.
// However, in Next.js, it's essential to check if the model already exists to avoid multiple model declarations,
// which can cause issues with mongoose models in serverless environments.
// const User = mongoose.model("users", userSchema)
// export default User
