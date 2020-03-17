//classe qui permet de gérer les données liées à une mesure et une cible
class Flux {

    //attributs;
    ID;             //id unique du flux
    groupe;         //nom du barrage et groupe de turbine du flux
    attribute;      //nom de la mesure qui concerne ce flux
    address;        //adresse sur le serveur ou trouver les données liées a la mesure
    port;           //port du serveur ou trouver les données liées a la mesure
    type;           //temps réel (RT) ou historique (H)
    protocol;       //nom du protocole pour obtenir les données
    frequency;      //fréquence de rafraichissement des données

    //constructeur
    // id => id unique caractérisant le flux
    // mesure => nom de la mesure
    // adresse => adresse ou trouver les données sur le serveur
    constructor(ID, groupe, attribute, address, port, type, protocol, frequency) {
        this.ID = ID;
        this.groupe = groupe;
        this.attribute = attribute;
        this.address = address;
        this.port = port;
        this.type = type;
        this.protocol = protocol;
        this.frequency = frequency;
    }

    // Récupere sur le serveur les données liées au flux entre les deux dates indiquée entre parametre
    // dateDebut => date de debut de la recuperation des données
    // dateFin => date de fin de la recuperation des données. Si non indiqué, la date de fin est la date actuelle
    RecupererDonnees(dateDebut, dateFin) {
        
        var res;

        //TODO : traitement permettant de récupérer les données associées a l'adresse du flux

        this.donnees = res;
    }

}

module.exports.Flux = Flux;