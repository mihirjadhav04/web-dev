import mongoose, { mongo } from "mongoose";


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


const User = mongoose.models.users || mongoose.model("users", UserSchema)
export default User
// First we use to do this below thing for model exporting.
// But in nextjs now it doesn't know whether the connection with mongoose is for the first time or already made.
// const User = mongoose.model("users", userSchema)
// export default User