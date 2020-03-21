var http = require('http');
var fs = require('fs');
var ioS = require('socket.io');

// Classe qui gère les communications avec le serveur, récupération des données et du catalogue
class CommunicationServeur {
	
	// attributs
	serveur;	// serveur http exécuté sur localhost
	port;		// port du localhost où écoute le serveur pour communiquer avec l'appli

	// Constructeur
	constructor(port) {
		this.port = port;
	}

	print() {
		console.log("Sa marchent")
	}

	// Initialisation du serveur
	init() {
		// Chargement du fichier index.html affiché au client
		var server = http.createServer(function(req, res) {
		    fs.readFile('./index.html', 'utf-8', function(error, content) {
		        res.writeHead(200, {"Content-Type": "text/html"});
		        res.end(content);
		    });
		});

		// Chargement de socket.io
		var io = ioS.listen(server);

		io.sockets.on('connection', function (socket) {
		    // Quand le serveur reçoit un signal de type "message" du client    
		    socket.on('message', function (message) {
		        if (message == "getCatalogue")
				{
					getCatalogue(socket);
				}		 
		    });	
		});

		server.listen(this.port);
	}

	
}

module.exports.CommunicationServeur = CommunicationServeur;

function getCatalogue(socket) {
	// Requête http pour récupérer le catalogue
	const options = {
	    hostname: '127.0.0.1',
	    port: 8081,
	    path: '/',
	    method: 'GET'
	};
	const req = http.request(options, (res) => {

	    console.log(`statusCode: ${res.statusCode}`);

	    res.on('data', (d) => {
	        //process.stdout.write(d);
	        console.log("là");
	        var stringData = String.fromCharCode.apply(null, new Uint16Array(d));
	        console.log(stringData);
	        // Parsing
			var arrayCatalogue = stringData.split("\r\n");
			console.log(arrayCatalogue);
			arrayCatalogue.forEach(flux => console.log(flux.length));
	    });
	});

	req.on('error', (err) => {
	    console.error(err);
	});

	req.end();
}