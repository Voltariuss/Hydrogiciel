// Require des modules node
var net = require('net');

// Require modules perso
var moduleDonnee = require('./Donnee.js')

//classe qui permet de gérer les données liées à une mesure et une cible
class Flux {

    //attributs;
    #ID;             //id unique du flux
    #groupe;         //nom du barrage et groupe de turbine du flux
    #attribute;      //nom de la mesure qui concerne ce flux
    #address;        //adresse sur le serveur ou trouver les données liées a la mesure
    #port;           //port du serveur ou trouver les données liées a la mesure
    #type;           //temps réel (RT) ou historique (H)
    #protocol;       //nom du protocole pour obtenir les données
    #frequency;      //fréquence de rafraichissement des données
    #donnees;        // Données récupérees sur ce flux, array d'objets Donnee
    #client;         // Socket TCP qui va faire les requêtes pour récupérer les données
    #scheduler;      // ID du scheduler qui envoie des requêtes à intervales réguliers

    //constructeur
    constructor(ID, groupe, attribute, address, port, type, protocol, frequency) {
        this.ID = ID;                   
        this.groupe = groupe;          
        this.attribute = attribute;     
        this.address = address;         
        this.port = port;               
        this.type = type;               
        this.protocol = protocol;       
        this.frequency = frequency;     
        this.donnees = [];  
        this.scheduler = -1;     
    }

    // Getters
    GetID() {return (this.ID);}
    GetGroupe() {return (this.groupe);}
    GetAttribute() {return (this.attribute);}
    GetAddress() {return (this.address);}
    GetPort() {return (this.port);}
    GetType() {return (this.type);}
    GetProtocol() {return (this.protocol);}
    GetFrequency() {return (this.frequency);}

    GetDonnees(debut, fin) {
        var dateDebut;
        var dateFin;
        // Check debut
        if (typeof debut == "string")
            dateDebut = ParseDate(debut);
        else if (debut instanceof Date)
            dateDebut = debut;
        else if (typeof debut == "number")
            dateDebut = new Date(debut);
        else
            dateDebut = null;
        // Check fin
        if (typeof fin == "string")
            dateFin = ParseDate(fin);
        else if (fin instanceof Date)
            dateFin = fin;
        else if (typeof fin == "number")
            dateFin = new Date(fin);
        else
            dateFin = null;
        // Check des deux
        if (dateFin == null || dateDebut == null)
            return null;
        // Check ok
        var retour = [];
        for (const donnee of this.donnees) {
            if (donnee.GetDate() >= dateDebut && donnee.GetDate() <= dateFin) {
                retour.push(donnee.GetDate(), donnee.GetMoyenne());
            }
        }
        return (retour);
    }

    // Autres méthodes
    Connexion() {
        const flux = this;
        this.client = net.createConnection({allowHalfOpen: true, host: this.address, port: this.port}, () => {
            console.log('connecté au serveur ' + this.address + ':' + this.port);
        });
        this.client.on('data', (data) => {
            flux.AddDonnee("" + data);
        });
    }

    Deconnexion() {
        if (this.scheduler != -1)
            this.StopScheduler();
        this.client.write('END\r\n\r\n');
    }

    StartScheduler() {
        var periode = parseFloat(this.frequency) * 1000;
        const flux = this;
        this.scheduler = setInterval(()=> {
            flux.client.write('GET\r\n\r\n');
        } , periode);
    }

    StopScheduler() {
        if (this.scheduler != -1) {
            clearInterval(this.scheduler);
            this.scheduler = -1;
        }
    }

    AddDonnee(nouvelleDonnee) {
        var splitted = nouvelleDonnee.split(" ");
        var date  = ParseDate(splitted[0] + ' ' + splitted[1]);
        var boolNouvelleDate = true;
        for (const donnee of this.donnees) {
            if (donnee.CompareDate(date)) {
                var valeur = parseFloat(splitted[2]);
                donnee.AddValeur(valeur);
                boolNouvelleDate = false;
            }
        }
        if (boolNouvelleDate) {
            var donnee = new moduleDonnee.Donnee(date, parseFloat(splitted[2]));
            this.donnees.push(donnee);
        }
    }
}

// Fonction qui parse la date au format du serveur en js Date
function ParseDate(chaineDate) {
    regexDate = '^[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]';
    if (!chaineDate.match(regexDate))
        return null;
    jour = chaineDate.slice(0, 2);
    mois = chaineDate.slice(3, 5);
    annee = chaineDate.slice(6, 10);
    heure = chaineDate.slice(-8);
    nouvelleChaine = annee + '-' + mois + '-' + jour + 'T' + heure;
    return (new Date(nouvelleChaine));
}   

module.exports.Flux = Flux;
module.exports.ParseDate = ParseDate;