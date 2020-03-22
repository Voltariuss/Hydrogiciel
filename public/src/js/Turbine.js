//caractérise une turbine. Celle-ci a plusieurs mesure qui lui sont liées
class Turbine extends Cible{

    //constructeur
    // id => id unique caractérisant la cible
    // nom => nom de la cible
    // mesures => liste des mesures liées a la cible 
    constructor(id, nom, mesures) {
        super(id, nom, mesures);
    }

    //Récupere les données liées à une mesure
    RecupererDonnees(mesure, dateDebut, dateFin) {
        super(mesure, dateDebut, dateFin);
    }

    //Retourne false
    EstBarrage() {
        super();
    }

}