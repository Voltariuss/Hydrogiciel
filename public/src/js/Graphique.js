class Graphique {
 
    //attributs
    cibles;     //tableau de cible (barrages ou turbines qui seront source de données du graphique)
    id;         //id du graphique
    titre;      //titre du graphique
    type;       //type du graphique : COURBE, BATON, POINT
    tempsReel;  //boolean : temps reel ou historique
    mesureX;    //valeur de l'axe X
    mesureY;    //valeur de l'axe Y
    dateDebut;  //date de debut du graphique
    dateFin;    //date de fin dugraphique
    courbes;    //tableau des différentes courbes sur le graph

    static listeType = ["bar", "bubble", "line"];
    static listCouleur = ["#3e95cd","#8e5ea2","#3cba9f","#e8c3b9","#c45850"];

    static ID;

    constructor(cibles, titre, type, tempsreel, mesureX, mesureY, dateDebut, dateFin) {
        this.cibles = cibles;
        this.id = ++Graphique.ID;
        this.titre = titre;
        this.type = type;
        this.tempsReel = tempsreel;
        this.mesureX = mesureX;
        this.mesureY = mesureY;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.courbes = []
    }

    static initID(valeur = 0)
    {
        if(typeof Graphique.ID == 'undefined') {
            Graphique.ID = valeur;
        }
    }

    AjouterCourbe(courbe)
    {
        this.courbes.push(courbe);
    }

    GenererChart()
    {
        var dataChart = [];
        this.courbes.forEach(function(element, index){
            var dataCourbe = {}
            dataCourbe["borderColor"] = Graphique.listCouleur[index];
            dataCourbe["fill"] = false;
            dataCourbe["label"] = element.label;
            dataCourbe["data"] = element.GetListeValeur();
            console.log("liste des valeurs :");
            console.log(element.GetListeValeur());

            dataChart.push(dataCourbe);
        });
        console.log("liste des dates :");
        console.log(this.courbes[0].GetListeDate());
        var chart = {
            type: Graphique.listeType[this.type],
            data: {
                labels: this.courbes[0].GetListeDate(),
                datasets:  dataChart
            },
            options: {
                title: {
                    display: true,
                    text: this.titre
                }
            }
        }

        return chart;
    }

}