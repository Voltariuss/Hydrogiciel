var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message', 'Vous êtes bien connecté !');
    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        if (message == "get")
        {
        	console.log("get demandée");
        	const options = {
			    hostname: 'google.com',
			    port: 80,
			    path: '/',
			    method: 'GET'
			};
			const req = http.request(options, (res) => {

			    console.log(`statusCode: ${res.statusCode}`);

			    res.on('data', (d) => {

			        process.stdout.write(d);
			    });
			});

			req.on('error', (err) => {

			    console.error(err);
			});

			req.end();
        }
    });	
});

server.listen(8080);