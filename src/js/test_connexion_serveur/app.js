var http = require('http');
var fs = require('fs');
var com = require('./CommunicationServeur.js')



class GlobalApp {
	// Classe qui regroupe tous les objets globaux de l'appli
	ComServeur; 	// le module de communication serveur
	CatalogueFlux;		// liste des flux 
}

const app = new GlobalApp();

function getApp() {
	return app;
}

app.ComServeur = new com.CommunicationServeur(8080);
app.CatalogueFlux = [];

module.exports.app = app;
module.exports.getApp = getApp;
module.exports.text = "coucou";

app.ComServeur.init();