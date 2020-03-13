//Gère le lien entre la partie données et affichage. Sera manipulée par main.js
class Controller {

    //attributs
    graphiques; //tableau de graphique

    constructor() {
        Controller.graphiques = [];
    }

    Initialisation() {
        Graphique.initID(0);
    }

    AjouterGraphique(donnees) {
        var graphique = new Graphique(donnees.cibles, donnees.titre, donnees.type, donnees.tempsreel, donnees.mesureX, donnees.mesureY, donnees.dateDebut, donnees.dateFin, 0);
        Controller.graphiques.push(graphique);

        //retourn l'id du graphique et le chart
        return { 'id': graphique.id, 'chart': graphique.GenererChart() };
    }

    ModifierGraphique(idGraphique, donnees) {

    }

    SupprimerGraphique(idGraphique) {

        let res = false;

        console.log(Controller.graphiques);
        //Mettre a jour les données
        Controller.graphiques.forEach(function (element, index) {
            if (element.id == idGraphique) {
                // this.graphiques.splice(index, 1);
                res = true;
            }
        });

        console.log(Controller.graphiques);

        //informer la vue qu'aucun élement n'a été supprimé
        return res;

    }

    //Ouvrir la configuration d'un fichier
    OuvrirFichierConfig(fichier, data) {
        var gestionFichier = new GestionFichierSauv();
        var listeGraphiques = [];

        gestionFichier.OuvrirConfig(fichier, data);
        Controller.graphiques = gestionFichier.GetGraphique();


        Controller.graphiques.forEach(function (element, index) {
            listeGraphiques.push({ 'id': element.id, 'chart': element.GenererChart() });
        })

        return listeGraphiques;
    }

    //Creer un fichier de configuration par rapport au tableau de bord actuel
    SauvegarderFichierConfig() {
        var gestionFichier = new GestionFichierSauv();
        gestionFichier.SauvegarderConfig(this.graphiques);
    }


}