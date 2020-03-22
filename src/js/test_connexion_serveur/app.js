var http = require('http');
var fs = require('fs');
var com = require('../Catalogue.js')



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

app.ComServeur.recupererFichierCatalogue();
setTimeout(function() {
	console.log(app.ComServeur);
	while (1);
} , 3000);