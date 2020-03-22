//caractérise un barrage. celui-ci est composé de turbines. Des mesures sont liées au barrage ainsi qu'aux différentes turbines
class Barrage extends Cible {

    //atributs
    turbines;   //tableau des turbines qui composent le barrage

    //constructeur
    // id => id unique caractérisant le barrage
    // nom => nom du barrage
    // mesures => liste des mesures liées au barrage
    constructor(id, nom, mesures) {
        super(id, nom, mesures);
    }

    //Récupere les données liées à une mesure
    RecupererDonnees(mesure, dateDebut, dateFin) {
        super(mesure, dateDebut, dateFin);
    }

    //Retourne true
    EstBarrage() {
        super();
    }

    /* ------------- A VOIR SI ON LAISSE CA
    //calcul la production globale en NRJ d'un barrage
    CalculerProductionGlobal() {

        //TODO: calcul glabal de la production
    }

    //calcul le débit global d'un barrage
    CalculerDebitGlobal() {
        
        //TODO: calcul du debit global
    }
    */

}