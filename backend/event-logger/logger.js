// Import the 'fs' module for file operations
const fs = require('fs');

// Import the 'os' module to get system information like memory usage
const os = require('os');

// Import the 'events' module to create and handle custom events
const EventEmitter = require('events');

// Define the Logger class extending the EventEmitter class
class Logger extends EventEmitter {
    /**
     * Emits a custom "message" event with the provided log message.
     * @param {string} message - The log message to emit.
     */
    log(message) {
        this.emit("message", { message }); // Emit the 'message' event with an object containing the message
    }
}

// Create an instance of the Logger class
const logger = new Logger();

// Define the file where log messages will be stored
const logfile = "./backend/event-logger/eventlogger.txt";

/**
 * Handles logging messages to the file.
 * Triggered when the "message" event is emitted.
 * @param {Object} event - The event object containing the log message.
 */
const logToFile = (event) => {
    // Format the log message with the current timestamp
    const logMessage = `${new Date().toISOString()} - ${event.message}\n`;

    // Append the log message to the file
    fs.appendFileSync(logfile, logMessage);
};

// Register the "logToFile" function as a listener for the "message" event
logger.on("message", logToFile);

// Use setInterval to log the memory usage every 3 seconds
setInterval(() => {
    // Calculate memory usage as a percentage of total memory
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;

    // Emit a log message with the current memory usage
    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}%`);
}, 3000); // Interval set to 3000 milliseconds (3 seconds)

// Emit some initial log messages for application events
logger.log("Application Started!"); // Log when the application starts
logger.log("Application Event Occurred!"); // Log when a specific event occurs
