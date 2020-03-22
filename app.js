var fs = require('fs');
var path = require('path');
var com = require(path.join(__dirname , '/public/src/js/Catalogue.js'));
var express = require('express');
var bodyParser = require('body-parser');



class GlobalApp {
	// Classe qui regroupe tous les objets globaux de l'appli
	ComServeur; 	// le module de communication serveur
	CatalogueFlux;		// liste des flux 
}

const app = new GlobalApp();

function getApp() {
	return app;
}



app.ComServeur = new com.Catalogue('127.0.0.1', 8081);
app.CatalogueFlux = [];

module.exports.app = app;
module.exports.getApp = getApp;
module.exports.text = "coucou";

/* ************************************************** initialisation du server *********************************************** */

var app2 = express();

app2.get('/', function (req, res) {

	app.ComServeur.recupererFichierCatalogue();

	fs.readFile("C:/wamp64/www/Hydrogiciel/public/src/html/tableau_de_bord.html", 'utf-8', function (error, content) {
		//console.log("ouiouiouoi");
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(content);
	});

	app2.use(express.static('C:/wamp64/www/Hydrogiciel/public'));
});

//APPELLE AJAX : SAUVEGARDE D'UN FICHIER DE CONFIGURATION
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));
app2.post('/ajax', function (req, res) {

	var data = JSON.parse(req.body.data)
	fs.writeFile("./public/configurations/" + req.body.nomFichier + ".json", req.body.data, function (err) {
		if (err) {
			console.log("erreur lors de la creation du fichier de sauvegarde");
			res.send(false);
		}
		else {
			console.log("le fichier de sauvegarde a été crée");
			res.send(true);
		}
	});

});

app2.post('/catalogue', function(req, res){
	console.log("je rentre dans ajax");
	res.send(app.ComServeur);
})

//app2.post('/catalogue', function(req, res){

//});

var server = app2.listen(8080, function () {
	console.log('application is listening on port 8080 .');
});
/* ************************************************* FIN initialisation server **************************************************** */

//app.ComServeur.recupererFichierCatalogue();
// setTimeout(function() {
// 	var fluxxx = app.ComServeur.GetFlux()[0];
// 	fluxxx.Connexion();
// 	fluxxx.StartScheduler();
// 	setTimeout(function() {
// 		fluxxx.StopScheduler();
// 		console.log(fluxxx.GetDonnees('22/03/2020 00:00:00', Date.now()));
// 		fluxxx.Deconnexion();
// 		while(1);
// 	}, 1500)
// } , 1000);
