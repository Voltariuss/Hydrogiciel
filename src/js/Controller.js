//Gère le lien entre la partie données et affichage. Sera manipulée par main.js
class Controller {

    //attributs
    graphiques; //tableau de graphique

    constructor() {
        this.graphiques = [];
    }

    Initialisation()
    {
        Graphique.initID(0);
    }

    AjouterGraphique(donnees) {
        var graphique = new Graphique(1, donnees.cibles, donnees.titre, donnees.type, donnees.tempsreel, donnees.mesureX, donnees.mesureY, donnees.dateDebut, donnees.dateFin, 0);
        this.graphiques.push(graphique);

        //creation de l'objet de retour
        var chart = {
            type: 'line',
            data: {
                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999],
                datasets: [{
                    data: [86, 114, 106, 106, 107, 111, 133, 221, 783],
                    label: "Africa",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700],
                    label: "Asia",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: [168, 170, 178, 190, 203, 276, 408, 547, 675],
                    label: "Europe",
                    borderColor: "#3cba9f",
                    fill: false
                }, {
                    data: [40, 20, 10, 16, 24, 38, 74, 167, 508],
                    label: "Latin America",
                    borderColor: "#e8c3b9",
                    fill: false
                }, {
                    data: [6, 3, 2, 2, 7, 26, 82, 172, 312],
                    label: "North America",
                    borderColor: "#c45850",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: graphique.titre
                }
            }
        }

        //retourn l'id du graphique et le chart
        return { 'id': graphique.id, 'chart': chart };


    }

    ModifierGraphique(idGraphique, donnees) {

    }

    SupprimerGraphique(idGraphique) {

        let res = false;

        console.log(this.graphiques);
        //Mettre a jour les données
        this.graphiques.forEach(function (element, index) {
            if (element.id == idGraphique) {
               // this.graphiques.splice(index, 1);
                res = true;
            }
        });

        console.log(this.graphiques);

        //informer la vue qu'aucun élement n'a été supprimé
        return res;

    }

    //Ouvrir la configuration d'un fichier
    OuvrirFichierConfig(fichier) {
        var gestionFichier = new GestionFichierSauv();
        gestionFichier.OuvrirConfig();
    }

    //Creer un fichier de configuration par rapport au tableau de bord actuel
    SauvegarderFichierConfig() {
        var gestionFichier = new GestionFichierSauv();
        gestionFichier.SauvegarderConfig();
    }


}