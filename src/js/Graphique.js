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

    constructor(id, cibles, titre, type, tempsreel, mesureX, mesureY, dateDebut, dateFin, disposition) {
        this.cibles = cibles;
        this.id = id;
        this.titre = titre;
        this.type = type;
        this.tempsreel = tempsreel;
        this.mesureX = mesureX;
        this.mesureY = mesureY;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.disposition = disposition;
    }

    //Permet d'ajouter une cible (barrage/turbine) du graphique
    AjouterCible(cible) {
        
    }

    //Permet de supprimer une cible (barrage/turbine) du graphique
    SupprimerCible(cible) {

    }

}