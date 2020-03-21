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
    	barragesOptions = [{label:"Barrage de Génissiat", value:"1"}, {label:"Barrage de Seyssel", value:"2"}, 
        {label:"Barrage de Motz", value:"3"}, {label:"Barrage de Lavours", value:"4"}, {label:"Barrage de Savières", value:"5"}, 
        {label:"Barrage de Champagneux", value:"6"},{label:"Barrage de Villebois", value:"7"}, {label:"Barrage de Pierre-Bénite", value:"8"},
        {label:"Barrage de Vaugris", value:"9"}, {label:"Barrage de Saint-Pierre-de-Bœuf", value:"10"},{label:"Barrage d'Arras-sur-Rhône", value:"11"},
        {label:"Barrage de la Roche-de-Glun", value:"12"},{label:"Barrage de Charmes-sur-Rhône", value:"13"},{label:"Barrage de Le Pouzin", value:"14"},
        {label:"Barrage de Donzère", value:"15"} ,{label:"Barrage de Caderousse", value:"16"},{label:"Barrage de Sauveterre", value:"17"},
        {label:"Barrage de Villeneuve", value:"18"},{label:"Barrage de Vallabrègues", value:"19"}];
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
				label: "Turbine n°"+ turbines[i].t +" du barrage",
				value: ""+turbines[i].b+"-"+turbines[i].t,
				};

    			turbinesOptions.push(turbineOption);

    		}
    	}

    	return {'barragesOptions' : barragesOptions, 'turbinesOptions':turbinesOptions, 'barragesSelectionnes' : barrageSelectionne, 'turbinesSelectionnes':turbinesSelectionnes};
    }


}