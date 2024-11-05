const http = require('http');
const fs = require('fs');
const path = require('path');


const port = 8080;

const server = http.createServer((req, res) => {
    
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})