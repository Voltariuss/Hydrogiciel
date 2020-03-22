var http = require('http');
var fs = require('fs');
var ioS = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');
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

		var app = express();
		//express.request(express.static('src'));

		app.get('/', function (req, res) {
			fs.readFile("C:/wamp64/www/Hydrogiciel/public/src/html/tableau_de_bord.html", 'utf-8', function (error, content) {
				res.writeHead(200, { "Content-Type": "text/html" });
				res.end(content);
			});

			app.use(express.static('C:/wamp64/www/Hydrogiciel/public'));
		});

		//APPELLE AJAX : SAUVEGARDE D'UN FICHIER DE CONFIGURATION
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: false}));
		app.post('/ajax', function(req, res){
			
			var data = JSON.parse(req.body.data)
			fs.writeFile("./public/configurations/"+req.body.nomFichier+".json", req.body.data, function(err){
				if(err)
				{
					console.log("erreur lors de la creation du fichier de sauvegarde");
					res.send(false);
				}
				else
				{
					console.log("le fichier de sauvegarde a été crée");
					res.send(true);
				}
			});

		})
		/* ********************************************************* */



		var server = app.listen(this.port, function () {
			console.log('Example app listening on port '+this.port+' .');
		});

		//Chargement de socket.io
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

		//server.listen(this.port);
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