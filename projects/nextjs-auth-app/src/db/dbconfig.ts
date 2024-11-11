// Importing mongoose, a library to interact with MongoDB, along with the core 'mongo' module from mongoose.
import mongoose, { mongo } from "mongoose";

// Function to establish a connection to MongoDB
export async function dbconnect() {
    try {
        // Connect to MongoDB using the URI from the environment variable.
        // The '!' asserts that process.env.MONGODB_URI will have a value (TypeScript feature).
        mongoose.connect(process.env.MONGODB_URI!);
        
        // Get the default connection object for mongoose
        const connection = mongoose.connection;

        // Event listener for a successful connection to MongoDB
        connection.on('connected', () => {
            console.log("MongoDB connected successfully!");
        });

        // Event listener for any errors during connection
        connection.on('error', (error) => {
            console.log("MongoDB connection error!");
            console.log(error);
            process.exit(); // Exit the process if there is a connection error
        });

    } catch (error) {
        // Catch any other errors that occur during connection setup
        console.log("Something went wrong while connecting to MongoDB.");
        console.log(error);
    }
}
