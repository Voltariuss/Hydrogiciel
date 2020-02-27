//classe qui permet de gérer les données liées à une mesure et une cible
class Flux {

    //attributs;
    id;         //id unique du flux
    mesure;     //nom de la mesure qui concerne ce flux
    adresse;    //adresse sur le serveur ou trouver les données liées a la mesure
    donnees;    //données de la mesure

    //constructeur
    // id => id unique caractérisant le flux
    // mesure => nom de la mesure
    // adresse => adresse ou trouver les données sur le serveur
    constructor(id, mesure, adresse) {
        this.id = id;
        this.mesure = mesure;
        this.adresse = adresse;
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