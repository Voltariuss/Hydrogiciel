// Require des modules node
var http = require('http');

// Require des modules perso
var moduleFlux = require('./Flux.js');

class Catalogue {
	// Classe qui récupère via http, stocke, et gère l'accès au catalogue des flux de données

	// Attributs (privés)
	#listeFlux;			// Liste des flux
	#adresseServeur;	// Adresse du serveur http auquel s'adresser pour récupérer le catalogue
	#portServeur;		// Port du serveur http auquel s'adresser pour récupérer le catalogue

	// Constructeur
	constructor (adresse, port) {
		this.adresseServeur = adresse;
		this.portServeur = port;
		this.listeFlux = [];
	}

	// Getters
	GetAdresseServeur() {return (this.adresseServeur);}
	GetPortServeur() {return (this.portServeur);}
	GetFlux() {return (this.listeFlux);}
	GetListeAttributs()
	{
		var attributs = []
		this.listeFlux.forEach(function(element){
			if(!attributs.includes(element.GetAttribute()))
				attributs.push(element.GetAttribute());
		});

		return attributs
	}

	// Autres méthodes
	recupererFichierCatalogue() {
		const cat = this;
		// Requête http pour récupérer le catalogue
		const options = {
		    hostname: this.adresseServeur,
		    port: this.portServeur,
		    path: '/',
		    method: 'GET'
		};
		const req = http.request(options, (res) => {

		    console.log(`Requête catalogue, statusCode: ${res.statusCode}`);
		    
		    res.on('data', (data) => {
		    	cat.genererFlux("" + data);
		    });
		});

		req.on('error', (err) => {
		    console.error(err);
		});

		req.end();
	}

	genererFlux(chaineCatalogue) {
		var arrayCatalogue = chaineCatalogue.split("\r\n");

		for (const ligne of arrayCatalogue) {
			var mots = ligne.split(" ");
			if (mots[0] == "Object") {
				var flux = new moduleFlux.Flux();
				var regexGeneral = '^[A-Za-z]*=([A-Za-z0-9_.]*)$';
				for (var i = 1; i < mots.length; i++) {
					if (mots[i].match(regexGeneral)) {
						var couple = mots[i].split("=");
						flux[couple[0]] = couple[1];
					}
				}
				this.listeFlux.push(flux);
			}
		}
	}

	connexionFlux(groupe) {
		for (const flux of this.listeFlux) {
			if (flux.groupe == groupe) {
				flux.Connexion();
			}
		}
	}

	deconnexionFlux(groupe) {
		for (const flux of this.listeFlux) {
			if (flux.groupe == groupe) {
				flux.Deconnexion();
			}
		}
	}

	recupererDonneesFlux(ID, dateDebut) {
		var retour;

		for (const flux of this.listeFlux) {
			if (flux.ID == ID) {
				retour = flux.GetDonnees(dateDebut, Date.now());
			}
		}
		return (retour);
	}
}

module.exports.Catalogue = Catalogue;