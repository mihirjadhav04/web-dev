// Import the 'http' module to create a web server.
const http = require('http');

// Define the hostname and port for the server.
// '127.0.0.1' refers to localhost, which is accessible only from your machine.
const hostname = '127.0.0.1';
const port = 3000;

// Create the server using 'http.createServer'. It takes a callback function with 'req' (request) and 'res' (response) parameters.
const server = http.createServer((req, res) => {
    // Check if the request URL is '/' (the root of the website).
    if (req.url === '/') {
        // Set the HTTP status code to 200 (OK).
        res.statusCode = 200;

        // Set the Content-Type header to 'text/plain' to indicate the response is plain text.
        res.setHeader('Content-Type', 'text/plain');

        // Send the response body for the root URL.
        res.end('This is my testing server..');
    } 

     // Handle the '/home' route.
     else if (req.url === "/home") {
        res.statusCode = 200; // Status code for success.
        res.setHeader('Content-Type', 'text/html'); // Ensure response is HTML.

        // Send the HTML content to display on the webpage.
        res.end(`
            <html>
                <head>
                    <title>Home Page</title>
                </head>
                <body>
                    <h1>Welcome to the Home Page!</h1>
                    <p>This is the content of the home page displayed on the web browser.</p>
                </body>
            </html>
        `);
    } 
    else {
        // For any other URL, set the HTTP status code to 404 (Not Found).
        res.statusCode = 404;

        // Set the Content-Type header to 'text/plain' to indicate the response is plain text.
        res.setHeader('Content-Type', 'text/plain');

        // Send the response body for invalid URLs.
        res.end('ERROR 404 - Invalid URL!');
    }
});

// Start the server and listen on the defined hostname and port.
// The callback function is executed once the server starts successfully.
server.listen(port, hostname, () => {
    // Log a message to the console indicating the server is running and where it's accessible.
    console.log(`Server listening at http://${hostname}:${port}`);
});



// Key Points for Notes:
// Module Import: The "http" module is built into Node.js and allows the creation of web servers.


// Server Hostname and Port:
// hostname: Localhost (127.0.0.1), accessible only on the same machine.
// port: The port number where the server listens for incoming requests.


// HTTP Server:
// http.createServer creates an HTTP server and takes a callback function.
// req represents the incoming request, and res represents the response sent back.
// Request Handling:

// Check the req.url to determine the endpoint being accessed.
// Respond with appropriate status codes (200 for success, 404 for not found).
// Response Headers:

// Use res.setHeader('Content-Type', 'text/plain') to specify the type of content in the response.
// Response Body:

// Use res.end() to send the response to the client and end the process.
// Start Listening:

// server.listen(port, hostname, callback) starts the server and listens for requests on the specified hostname and port.
// A callback is used to log a message when the server starts successfully.
// Error Handling:

// Provide meaningful messages for valid and invalid URLs to improve user experience.





