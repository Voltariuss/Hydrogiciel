class Graphique {
 
    //attributs
    cibles;     //tableau de cible (barrages ou turbines qui seront source de données du graphique)
    id;         //id du graphique
    titre;      //titre du graphique
    type;       //type du graphique : COURBE, BATON, POINT
    tempsreel;  //boolean : temps reel ou historique
    mesureX;    //valeur de l'axe X
    mesureY;    //valeur de l'axe Y
    dateDebut;  //date de debut du graphique
    dateFin;    //date de fin dugraphique
    disposition;//disposition sur le dashboard

    static ID;

    constructor(cibles, titre, type, tempsreel, mesureX, mesureY, dateDebut, dateFin, disposition) {
        this.cibles = cibles;
        this.id = ++Graphique.ID;
        this.titre = titre;
        this.type = type;
        this.tempsreel = tempsreel;
        this.mesureX = mesureX;
        this.mesureY = mesureY;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.disposition = disposition;
    }

    static initID(valeur = 0)
    {
        if(typeof Graphique.ID == 'undefined') {
            Graphique.ID = valeur;
        }
    }

    //Permet d'ajouter une cible (barrage/turbine) du graphique
    AjouterCible(cible) {
        
    }

    //Permet de supprimer une cible (barrage/turbine) du graphique
    SupprimerCible(cible) {

    }

    GenererChart()
    {
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
                    text: this.titre
                }
            }
        }

        return chart;
    }

}