var http = require('http');
var fs = require('fs');
var ioS = require('socket.io');
var appFile = require('./app.js');
var fluxFile = require('../Flux.js');

// Classe qui gère les communications avec le serveur, récupération des données et du catalogue
class CommunicationServeur {
	
	// attributs
	serveur;	// serveur http exécuté sur localhost
	port;		// port du localhost où écoute le serveur pour communiquer avec l'appli

	// Constructeur
	constructor(port) {
		this.port = port;
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

		getCatalogue();
		var app =  appFile.app;
		console.log("App server : " + app.ComServeur.port);

		// Chargement de socket.io
		var io = ioS.listen(server);

		io.sockets.on('connection', ConnectionHandle);

		server.listen(this.port);
	}

}

module.exports.CommunicationServeur = CommunicationServeur;

// Handling of the connection
// Links event received and the function to execute then
function ConnectionHandle(socket) {
    // Quand le serveur reçoit un signal de type "message" du client    
    /*socket.on('message', function (message) {
        if (message == "getCatalogue")
		{
			getCatalogue(socket);
		}		 
    });	*/
}

// Function to execute when the "getCatalogue" message is received
function getCatalogue() {
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
	        var stringData = String.fromCharCode.apply(null, new Uint16Array(d));
	        // Parsing
			var arrayCatalogue = stringData.split("\r\n");
			console.log(arrayCatalogue);
			arrayCatalogue.forEach(ligne => parseLigneCatalogue(ligne));
	    });
	});

	req.on('error', (err) => {
	    console.error(err);
	});

	req.end();
}

// Fonction qui parse une ligne du catalogue 
// pour en créer un flux ajouté au catalogue des flux de l'appli
function parseLigneCatalogue(ligne) {
	var mots = ligne.split(" ");
	if (mots[0] == "Object") {
		var flux = new fluxFile.Flux();
		var regexGeneral = '^[A-Za-z]*=([A-Za-z0-9_.]*)$';
		for (i = 1; i < mots.length; i++) {
			if (mots[i].match(regexGeneral)) {
				couple = mots[i].split("=");
				flux[couple[0]] = couple[1];
			}
		}
		appFile.app.CatalogueFlux.push(flux);
		console.log(appFile.app.CatalogueFlux);
	}
}