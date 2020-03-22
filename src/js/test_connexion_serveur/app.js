var http = require('http');
var fs = require('fs');
var com = require('../Catalogue.js')
var flux = require('../Flux.js')



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
/*
debut = '22/03/2020 10:17:50';
fin = '22/03/2020 10:19:50'
dateDebut = flux.ParseDate(debut);
dateFin = flux.ParseDate(fin);
*/

app.ComServeur.recupererFichierCatalogue();
setTimeout(function() {
	var fluxxx = app.ComServeur.GetFlux()[0];
	fluxxx.Connexion();
	fluxxx.StartScheduler();
	setTimeout(function() {
		fluxxx.StopScheduler();
		console.log(fluxxx.GetDonnees('22/03/2020 00:00:00', Date.now()));
		fluxxx.Deconnexion();
		while(1);
	}, 1500)
} , 1000);

