function validateToken(token) {
	return token === 'grkgRpDElgRhlo9LXD1asYdE';
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
		function(done){done(validateMethod(req.method))},
		function(done){done(validatePathName(requestedUrl.pathname),)},
		function(done){done(validateToken(requestedUrl.params.token))}
	)
	.then(function (done, method, path, token) {
		if (method && path && token) done(requestedUrl.params.text)
		else done.fail("Invalid request")
	})
	.then(function(done, input) {
		done(runOneOnOne(input));
	})
	.val(function(val) {
		res.end(':thumbsup: This is working, *bloody hell*...');
	})
	.or(function(err) {
		console.error(err);
		res.writeHead(403);
		res.end('Boom! Not today...');
	});
	
	// params.token='grkgRpDElgRhlo9LXD1asYdE'
	// params.team_id='T0FTGTNUS'
	// params.team_domain='groozin'
	// params.channel_id='D1253SNA1'
	// params.channel_name='directmessage'
	// params.user_id='U0FTAU2UC'
	// params.user_name='tomasz'
	// params.command='/1on1'
	// params.text='@elaj {some text}'
	// params.response_url='https://hooks.slack.com/commands/T0FTGTNUS/55163960898/x8dAn7BJpps0zLIAyF3b5V6s'
}

const port = process.env.PORT;
const host = '0.0.0.0';
const extractQueryStringParams = true;

var ASQ = require('asynquence');
var url = require('url');
var http = require('http');
var server = http.createServer(handleRequest);

server.listen(port, host, function () {
	console.log('Server listening on port: %s', port);
});
 