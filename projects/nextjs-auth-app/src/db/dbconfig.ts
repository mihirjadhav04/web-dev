import mongoose, { mongo } from "mongoose";


export async function dbconnect(){
    try {
        // ! - just used for more confirmation about the value that will come from env - tpescript
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB connected successfully!");
        })
        connection.on('error', (error) => {
            console.log("MongoDB connection error!");
            console.log(error);
            process.exit()
            
        })


    } catch (error) {
        console.log("something went wrong while connecting to mongodb.");
        console.log(error);
        
        
    }
}