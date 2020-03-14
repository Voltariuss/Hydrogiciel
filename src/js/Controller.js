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

    SelectionnerCibles(numBarrage){
    	var barragesOptions;
    	//barragesOptions = une fonction 
    	barragesOptions = [{label:"Barrage n°1", value:"1"}, {label:"Barrage n°2", value:"2"}, {label:"Barrage n°3", value:"3"}, {label:"Barrage n°4", value:"4"}];
    	let barrageSelectionne = [];
    	for (let i = 0; i < barragesOptions.length; ++i) {
    		if(barragesOptions[i].value == numBarrage)
    		{
    			barrageSelectionne.push(barragesOptions[i].value);
    		}
    	}

    	var turbines;
    	//turbines = une fonction
    	turbines = [{'b':1, 't':1}, {'b':1, 't':2}, {'b':1, 't':3}, {'b':2, 't':1}, {'b':2, 't':2}, {'b':3, 't':1}];
    	let turbinesOptions=[];
    	let turbinesSelectionnes=[];
    	let nbTurbines = 0;
    	for (let i = 0; i < turbines.length; ++i) {
    		if(turbines[i].b == numBarrage)
    		{
    			let turbineOption = {
				label: "Turbine n°"+ turbines[i].t +" du barrage n°"+turbines[i].b,
				value: ""+turbines[i].b+"-"+turbines[i].t,
				};

    			turbinesOptions.push(turbineOption);

    		}
    	}

    	return {'barragesOptions' : barragesOptions, 'turbinesOptions':turbinesOptions, 'barragesSelectionnes' : barrageSelectionne, 'turbinesSelectionnes':turbinesSelectionnes};
    }


}