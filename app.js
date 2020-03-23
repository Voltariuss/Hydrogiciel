var fs = require('fs');
var path = require('path');
var moduleCatalogue = require(path.join(__dirname , '/public/src/js/Catalogue.js'));
var express = require('express');
var bodyParser = require('body-parser');

/* ************************************************** initialisation du server *********************************************** */

var app2 = express();
var catalogue;

app2.get('/', function (req, res) {

	initialisationCatalogue();

	fs.readFile(path.join(__dirname , '/public/src/html/tableau_de_bord.html'), 'utf-8', function (error, content) {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(content);
	});

	app2.use(express.static(path.join(__dirname , '/public')));
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

app2.post('/getAttributs', function(req, res){
	res.send(catalogue.GetListeAttributs());
});

app2.post('/getCentrales', function(req, res){
	catalogue.construireStructureFlux();
	var structflux = catalogue.GetStructureFlux()
	console.log(structflux);
	res.send(structflux);
});

app2.post('/getFlux', function(req, res){
	var data = catalogue.recupererDonneesFlux(req.body.idFlux, req.body.dateDebut);
	console.log(data);
	res.send(data);
})

var server = app2.listen(8080, function () {
	console.log('application is listening on port 8080 .');
});
/* ************************************************* FIN initialisation server **************************************************** */

function initialisationCatalogue()
{
	catalogue = new moduleCatalogue.Catalogue('127.0.0.1', 8081);
	console.log("Récupération du catalogue.");
	catalogue.recupererFichierCatalogue();
	setTimeout(function() {
		var listeFlux = catalogue.GetFlux();
		if (listeFlux.length == 0)
			console.log("Erreur : Aucun flux dans le catalogue.")
		else {
			for (const flux of listeFlux) {
				flux.Connexion();
				flux.StartScheduler();
			}
		}
	}, 1000);
}
