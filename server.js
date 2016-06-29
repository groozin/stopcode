function validateToken(token) {
	var companyToken = 'KteAYmCSHBoFFteuDQeFP3MY';
	var privateToken = 'grkgRpDElgRhlo9LXD1asYdE';
	var validTokens = [companyToken, privateToken];
	return _.includes(validTokens, token);
}

function validateMethod(method) {
	return method === 'GET';
}

function validatePathName(pathname) {
	return pathname === '/';
}

function runOneOnOne(input) {
	console.log("Input text: %s", input);
}

function handleRequest(req, res) {
	console.log('Incoming request url: %s', req.url);
	var requestedUrl = url.parse(req.url, extractQueryStringParams);

	ASQ()
		.all(
		done => done(validateMethod(req.method)),
		done => done(validatePathName(requestedUrl.pathname)),
		done => done(validateToken(requestedUrl.query.token))
		)
		.then((done, method, path, token) => {
			if (method && path && token) done(requestedUrl.query.text)
			else done.fail("Invalid request")
		})
		.then((done, input) => {
			done(runOneOnOne(input));
		})
		.val(val => res.end(':thumbsup: This is working, *bloody hell*...'))
		.or(err => {
			console.error(err);
			res.writeHead(403);
			res.end('Boom! Not today...');
		});
}

const port = 8080; //process.env.PORT;
const host = '0.0.0.0';
const extractQueryStringParams = true;

var ASQ = require('asynquence');
var _ = require('lodash');
var url = require('url');
var http = require('http');
var server = http.createServer(handleRequest);

server.listen(port, host, function () {
	console.log('Server listening on port: %s', port);
});
