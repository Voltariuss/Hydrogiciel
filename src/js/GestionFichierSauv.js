//Cette classe a pour but de gérer les fichiers de configuration (sauvegarde du dashboard)
class GestionFichierSauv {

    //attributs
    donnees;

    //constructeur
    constructor() {
        GestionFichierSauv.donnees = {};
    }

    //Permet d'ouvrir une configuration
    OuvrirConfig(fichier, data) {
        var graphiques = [];

        data.forEach(function (element, index) {
            var graphique = new Graphique(element.CIBLES, element.TITRE, element.TYPE, element.TEMPS_REEL, element.MESURE_X, element.MESURE_Y, element.DATE_DEBUT, element.DATE_FIN, element.DISPOSITION);

            graphiques.push(graphique);
        });

        GestionFichierSauv.donnees["graphiques"] = graphiques;
    }

    GetGraphique() {
        if (typeof GestionFichierSauv.donnees["graphiques"] != undefined)
            return GestionFichierSauv.donnees["graphiques"];
        else
            return [];
    }

    //Permet de sauvegarder le dashboard actuel
    SauvegarderConfig(data) {

        var datastring = JSON.stringify(data);
        //création du fichier json
        var fs = require('fs');
        fs.writeFile("test.json", datastring);

        console.log("fichier crée");

    }

}