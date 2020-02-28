const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type' : 'text/html'});
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if(err) {
            return console.error(err);
        }
        response.end(data, 'utf-8');
    });
}).listen(8000);