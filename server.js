var http = require('http');
const port = process.env.PORT;

function handleRequest(req, res) {
    res.end('This is working, *bloody hell*...');
}

var server = http.createServer(handleRequest);

server.listen(port, '0.0.0.0', function(){
    console.log('Server listening on port: %s', port);
});
