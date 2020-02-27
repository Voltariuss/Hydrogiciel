//classe abstraite permettant de gerer les barrages/turbines
class Cible {

    //attributs
    id;         //id unique de la cible
    nom;        //nom de la cible
    mesures;    //tableau des mesures liées a la cible (ex : mesures = array("debit" => Flux1, "productionNRJ" => Flux2) )

    //constructeur
    // id => id unique caractérisant la turbine
    // nom => nom de la turbine
    // mesures => liste des mesures liées a la turbine
    constructor(id, nom, mesures) {
        if(this.constructor == Cible) {
            throw new TypeError('La classe abstraite "Cible" ne peut pas être directement instanciée');
        }
        else
        {
            this.id = id;
            this.nom = nom;
            this.mesures = mesures;
        }
    }

    //Récupere les données liées à une mesure
    RecupererDonnees(mesure, dateDebut, dateFin) {
        
        //TODO : recupere les données liées a la mesure indiqué en parametre dans la liste des flux de l'attribut mesures
    }

    //permet de différencier les objets de type cible (un barrage ou une turbine)
    EstBarrage() {
        if(this.constructor == Barrage)
            return true;
        else
            return false;
    }


}