//Gère le lien entre la partie données et affichage. Sera manipulée par main.js
class Controller {

    //attributs
    graphiques; //tableau de graphique
    listeAttributs;

    constructor() {
        Controller.graphiques = [];
    }

    Initialisation() {
        Graphique.initID(0);
        //initialisation controlleur
        ajax("POST", '/getAttributs', {}, function (res) {
            Controller.listeAttributs = res;
        });

        ajax("POST", '/getCentrales', {}, function (res) {
            Controller.centrales = res;
        });
    }

    AjouterGraphique(donnees) {
        var graphique = new Graphique(donnees.cibles, donnees.titre, donnees.type, donnees.tempsReel, donnees.mesureX, donnees.mesureY, donnees.dateDebut, donnees.dateFin);
        Controller.graphiques.push(graphique);
        
        this.UpdateGraphique(graphique.id);

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
                Controller.graphiques.splice(index, 1);
                res = true;
            }
        });

        //informer la vue qu'aucun élement n'a été supprimé
        return res;

    }

    //Ouvrir la configuration d'un fichier
    OuvrirFichierConfig(fichier, data) {
        var listeGraphiques = [];
        var tmplisteGraphiques = [];
        var erreur = false;

        for (var i = 0; i < data.length; i++) {

            if (data[i].cibles != undefined && data[i].titre != undefined && data[i].type !== undefined && data[i].tempsReel != undefined && data[i].mesureX != undefined && data[i].mesureY != undefined && data[i].dateDebut !== undefined && data[i].dateFin !== undefined && Graphique.listeType[data[i].type] !== undefined) {

                var graphique = new Graphique(data[i].cibles, data[i].titre, data[i].type, data[i].tempsReel, data[i].mesureX, data[i].mesureY, data[i].dateDebut, data[i].dateFin);

                tmplisteGraphiques.push(graphique);
            }
            else {
                erreur = true;
                break;
            }

        }

        if (erreur == false) {
            if (typeof tmplisteGraphiques != undefined)
                Controller.graphiques = tmplisteGraphiques
            else
                Controller.graphiques = [];


            Controller.graphiques.forEach(function (element, index) {
                listeGraphiques.push({ 'id': element.id, 'chart': element.GenererChart() });
            })
            return listeGraphiques;
        }
        else {
            return false;
        }
    }

    //Creer un fichier de configuration par rapport au tableau de bord actuel
    SauvegarderFichierConfig(nomFichier) {
        var data = Controller.graphiques;
        
        data.forEach(function(element){
            delete element["courbes"];
        })
        data = JSON.stringify(data);

        if (data.length == 0)
            return false;
        else {
            //APPELLE AJAX : creation du fichier 
            ajax("POST", '/ajax', { "nomFichier": nomFichier, "data": data }, function (sucess) {
                if (sucess)
                    return true;
                else
                    return false;

            });
        }
    }

    UpdateGraphique(idGraphique = -1) {
        console.log("update du graph");

        if(idGraphique != -1)   //ajouter un graphique : generation des courbes
        {
            for(var i=0; i<Controller.graphiques.length; i++)
            {
                if(Controller.graphiques[i].id == idGraphique)
                {
                    Controller.graphiques[i].cibles.forEach(function(element){
                        //console.log(Date.parse(Controller.graphiques[i].dateDebut));
                        var courbe = new Courbe(5, element, new Date(Controller.graphiques[i].dateDebut).getTime(), Date.now());

                        ajax("POST", '/getFlux', { 'idFlux' : courbe.id, 'dateDebut' : courbe.valeurDebutX }, function (res) {
                            console.log(res);

                        });
                        Controller.graphiques[i].AjouterCourbe(courbe);
                    });

                    break;
                }
            }
        }
        else    //tout mettre a jour
        {
            Controller.graphiques.forEach(function(element){
                element.courbes.forEach(function(courbe){
                    ajax("POST", '/getFlux', { 'idFlux' : courbe.id, 'dateDebut' : courbe.valeurDebutX }, function (res) {
                        console.log(res);
                    });
                })
            });
        }
    }

    SelectionnerCibles(numBarrage) {
        var barragesOptions;
        //barragesOptions = une fonction 
        barragesOptions = [{ label: "Barrage de Génissiat", value: "1" }, { label: "Barrage de Seyssel", value: "2" },
        { label: "Barrage de Motz", value: "3" }, { label: "Barrage de Lavours", value: "4" }, { label: "Barrage de Savières", value: "5" },
        { label: "Barrage de Champagneux", value: "6" }, { label: "Barrage de Villebois", value: "7" }, { label: "Barrage de Pierre-Bénite", value: "8" },
        { label: "Barrage de Vaugris", value: "9" }, { label: "Barrage de Saint-Pierre-de-Bœuf", value: "10" }, { label: "Barrage d'Arras-sur-Rhône", value: "11" },
        { label: "Barrage de la Roche-de-Glun", value: "12" }, { label: "Barrage de Charmes-sur-Rhône", value: "13" }, { label: "Barrage de Le Pouzin", value: "14" },
        { label: "Barrage de Donzère", value: "15" }, { label: "Barrage de Caderousse", value: "16" }, { label: "Barrage de Sauveterre", value: "17" },
        { label: "Barrage de Villeneuve", value: "18" }, { label: "Barrage de Vallabrègues", value: "19" }];
        let barrageSelectionne = [];
        for (let i = 0; i < barragesOptions.length; ++i) {
            if (barragesOptions[i].value == numBarrage) {
                barrageSelectionne.push(barragesOptions[i].value);
            }
        }

        var turbines;
        //turbines = une fonction
        turbines = [{ 'b': 1, 't': 1 }, { 'b': 1, 't': 2 }, { 'b': 1, 't': 3 }, { 'b': 2, 't': 1 }, { 'b': 2, 't': 2 }, { 'b': 3, 't': 1 }];
        let turbinesOptions = [];
        let turbinesSelectionnes = [];
        let nbTurbines = 0;
        for (let i = 0; i < turbines.length; ++i) {
            if (turbines[i].b == numBarrage) {
                let turbineOption = {
                    label: "Turbine n°" + turbines[i].t + " du barrage",
                    value: "" + turbines[i].b + "-" + turbines[i].t,
                };

                turbinesOptions.push(turbineOption);

            }
        }

        return { 'barragesOptions': barragesOptions, 'turbinesOptions': turbinesOptions, 'barragesSelectionnes': barrageSelectionne, 'turbinesSelectionnes': turbinesSelectionnes };
    }

    GetListeAttributs(type){
        let res;
        if(type == 1){
            res = Controller.listeAttributs.barrage;
        }
        else{
            res = Controller.listeAttributs.turbine;
        }
        return res;
    }


}