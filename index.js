const port = process.env.PORT;
// const port = '8080';
const host = '0.0.0.0';

var ASQ = require('asynquence');
var _ = require('lodash');
var url = require('url');
var http = require('http');
var server = http.createServer(handleRequest);
var fs = require('fs');

server.listen(port, host, function () {
	console.log('Server listening on port: %s', port);
});

function handleRequest(req, res) {
	
	fs.readFile('index.html', function (error, content) {
		if (error) {
			if (error.code == 'ENOENT') {
				fs.readFile('./404.html', function (error, content) {
					res.writeHead(200, { 'Content-Type': 'text\html' });
					res.end(content, 'utf-8');
				});
			}
			else {
				res.writeHead(500);
				res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				res.end();
			}
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text\html' });
			res.end(content, 'utf-8');
		}
	});
}
