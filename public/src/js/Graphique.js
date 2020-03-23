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
    chart;

    static listeType = ["bar", "line"];
    static listCouleur = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#FFD700", "#859c8e", "#FF7F50"];
    static couleur = 0;

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

    static initID(valeur = 0) {
        if (typeof Graphique.ID == 'undefined') {
            Graphique.ID = valeur;
        }
    }

    AjouterCourbe(courbe) {
        this.courbes.push(courbe);
    }

    SetChart(chart) {
        this.chart = chart;
    }

    GenererDatasetsChart() {
        var dataChart = [];

        this.courbes.forEach(function (element, index) {
            var dataCourbe = {}
            dataCourbe["borderColor"] = Graphique.listCouleur[Graphique.couleur % (Graphique.listCouleur.length)];
            dataCourbe["backgroundColor"] = Graphique.listCouleur[Graphique.couleur % (Graphique.listCouleur.length)];
            dataCourbe["fill"] = false;
            dataCourbe["label"] = element.label;
            dataCourbe["data"] = element.GetListeValeur();

            dataChart.push(dataCourbe);
            ++Graphique.couleur;
        });

        this.dateDebut = dataChart[0]["data"][0];
        // console.log("datedebut :");
        // console.log(this.dateDebut);

        console.log(dataChart);

        return dataChart;
    }

    GenererChart() {
        var dataChart = this.GenererDatasetsChart();
        var chart = {
            type: Graphique.listeType[this.type],
            data: {
                labels: this.courbes[0].GetListeDate(),
                datasets: dataChart
            },
            options: {
                title: {
                    display: true,
                    text: this.titre
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.mesureX
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: this.mesureY
                        }
                    }]
                }
            }
        }

        //this.chart = chart;

        return chart;
    }

}