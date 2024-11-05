// server.js

const PORT = 3000;

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);  // Use URL to parse request URL

    // Root route
    if (url.pathname === "/") {
      return new Response("Welcome to the Bun Server!", {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }

    // /hello route
    else if (url.pathname === "/hello") {
      return new Response("Hello, world!", {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }

    // Handle other routes with a 404 response
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  },
});

console.log(`Server is running on http://localhost:${PORT}`);
