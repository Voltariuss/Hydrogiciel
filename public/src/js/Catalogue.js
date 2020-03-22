// Require des modules node
var http = require('http');

// Require des modules perso
var moduleFlux = require('./Flux.js');

class Catalogue {
	// Classe qui récupère via http, stocke, et gère l'accès au catalogue des flux de données

	// Attributs (privés)
	#listeFlux;			// Liste des flux
	#structureFlux;		// Liste des flux structurée pour être envoyée à la partie graphique
	#adresseServeur;	// Adresse du serveur http auquel s'adresser pour récupérer le catalogue
	#portServeur;		// Port du serveur http auquel s'adresser pour récupérer le catalogue

	// Constructeur
	constructor (adresse, port) {
		this.adresseServeur = adresse;
		this.portServeur = port;
		this.listeFlux = [];
		this.structureFlux = [];
	}

	// Getters
	GetAdresseServeur() {return (this.adresseServeur);}
	GetPortServeur() {return (this.portServeur);}
	GetFlux() {return (this.listeFlux);}
	GetListeAttributs()
    {
        var attributs = {}
        attributs["barrage"] = []
        attributs["turbine"] = [];
        this.listeFlux.forEach(function(element){
            var groupe = element.GetGroupe();
            var n = groupe.indexOf(".");
            if(n == -1)
            {
                if(!attributs["barrage"].includes(element.GetAttribute()))
                    attributs["barrage"].push(element.GetAttribute());
            }
            else
            {
                if(!attributs["turbine"].includes(element.GetAttribute()))
                    attributs["turbine"].push(element.GetAttribute());
            }

        });

        return attributs
    }

    GetStructureFlux() {return (this.structureFlux);}

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

	construireStructureFlux() {
		for (const flux of this.listeFlux) {
			var nomBarrage = flux.GetGroupe().split('.')[0];
			var nomTurbine = (flux.GetGroupe().split('.').length == 2 ? flux.GetGroupe().split('.')[1] : "");
			// Test si le barrage a déjà été vu
			var barrage = [];
			var boolPremierBarrage = true;
			for (const barrageIter of this.structureFlux) {
				if (barrageIter.nomBarrage == nomBarrage) {
					boolPremierBarrage = false;
					barrage = barrageIter;
				}
			}
			// Si c'est la première fois, on le construit
			if (boolPremierBarrage) {
				barrage['nomBarrage'] = nomBarrage;
				barrage['turbines'] = [];
				barrage['flux'] = [];
			}
			// 2 cas : barrage simple ou bien turbine
			if (nomTurbine == "") {
				// On ajoute le flux
				var caracFlux = [];
				caracFlux['ID'] = flux.GetID();
				caracFlux['attribut'] = flux.GetAttribute();
				barrage['flux'].push(caracFlux);
			}
			else {
				// Test si la turbine a déjà été vue
				var turbine = [];
				var boolPremiereTurbine = true;
				if (!boolPremierBarrage)
				{
					boolPremiereTurbine = true;
					for (const turbineIter of barrage.turbines) {
						if (turbineIter.nomTurbine == nomTurbine) {
							boolPremiereTurbine = false;
							turbine = turbineIter;
						}
					}
				}
				// Si c'est la première fois, on la construit
				if (boolPremiereTurbine) {
					turbine['nomTurbine'] = nomTurbine;
					turbine['flux'] = [];

				}
				// On ajoute le flux
				var caracFlux = [];
				caracFlux['ID'] = flux.GetID();
				caracFlux['attribut'] = flux.GetAttribute();
				turbine['flux'].push(caracFlux);
				// Si c'est la premère turbine, on l'ajoute
				if (boolPremiereTurbine)
					barrage['turbines'].push(turbine);
			}
			
			// Si c'est le premier barrage, on l'ajoute
			if (boolPremierBarrage)
				this.structureFlux.push(barrage);
			console.log(nomBarrage);
			console.log(nomTurbine);
		}
		console.log(this.structureFlux);
		console.log(this.structureFlux[0]['turbines']);
		console.log(this.structureFlux[0]['turbines'][0]['flux']);
	}

	connexionFlux(ID) {
		for (const flux of this.listeFlux) {
			if (flux.GetID() == ID) {
				flux.Connexion();
			}
		}
	}

	deconnexionFlux(ID) {
		for (const flux of this.listeFlux) {
			if (flux.GetID() == ID) {
				flux.Deconnexion();
			}
		}
	}

	recupererDonneesFlux(ID, dateDebut) {
		var retour;

		for (const flux of this.listeFlux) {
			if (flux.ID == ID) {
				retour = flux.GetDonnees(dateDebut, Date.now().toLocaleString());
			}
		}
		return (retour);
	}
}

module.exports.Catalogue = Catalogue;