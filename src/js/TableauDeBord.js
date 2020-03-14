//Main
document.addEventListener("DOMContentLoaded", function (event) {

  //initialisation des variables
    var controlleur = new Controller();
    controlleur.Initialisation();
    var grille = GridStack.init();
    var nombreGs = 0;

  //Initialisation de la grille
    grille.opts.minWidth = 200;
    redimensionnerTousLesGraphiques();
    document.getElementById('grilleVide').style.display = 'block';
    document.getElementById('grid').style.display = 'none';

  // Modale du choix d'un barrage
    var modaleCarteB = document.getElementById("modaleCarteB");
    document.getElementsByClassName("close")[1].onclick = function () {
      modaleCarteB.style.display = "none";
    };
    document.getElementById("annulerCarteB").onclick = function () {
      modaleCarteB.style.display = "none";
    };

  // Modale de configuration d'un graphique
    var modaleConfigG = document.getElementById("modaleConfigG");

    document.getElementsByClassName("close")[2].onclick = annulerAjoutG;
    document.getElementById("annulerAjoutGB").onclick = annulerAjoutG;
    document.getElementById("annulerAjoutGT").onclick = annulerAjoutG;

    var barrages; //champ de sélection de la cible
    var turbines; //champ de sélection de la cible

    // Conditions liées au clic sur l'onglet turbine
    document.getElementById("turbineOnglet").addEventListener('click', function (e){
      if (barrages.value().length ==0 ){
        alert("Selectionnez d'abord un barrage.");
        e.stopPropagation();
      }
      else if (barrages.value().length > 1){
        alert('Vous ne pouvez pas accéder à cet onglet car vous avez selectionné plusieurs barrages.');
        e.stopPropagation();
      }
      else{
        document.getElementById('turbinesConcernees').innerHTML = '';
        var cibles = controlleur.SelectionnerCibles(barrages.value()[0]);
        turbines = new SelectPure("#turbinesConcernees", genererChampsSelect(cibles.turbinesOptions, cibles.turbinesSelectionnees));
      }
    });

    viderFormConfigG();

    // Validation du formulaire pour un barrage
    document.getElementById("formB").onsubmit = function(){
      if(barrages.value().length>0){
        confirmerAjoutG();
      }
      else{
        alert("Il vous faut sélectionner au moins un barrage.");
      }
      return false; //Pour ne pas recharger la page
    };

    // Validation du formulaire pour une turbine
    document.getElementById("formT").onsubmit = function(){
      if(turbines.value().length>0){
        confirmerAjoutG();
      }
      else{
        alert("Il vous faut sélectionner au moins une turbine.");
      }
      return false; //Pour ne pas recharger la page
    };

  // Modale de zoom sur un graphique
    var modaleZoomG = document.getElementById("modaleZoomG");
    document.getElementsByClassName("close")[0].onclick = function () {
      modaleZoomG.style.display = "none";
      document.getElementById("graphiqueZoome").innerHTML = '';
    };

  // Modale de chargement d'un tableau de bord
    var modaleChargerGs = document.getElementById("modaleChargerGs");
    let validerChargerGs = document.getElementById("validerChargerGs");

    document.getElementsByClassName("close")[3].onclick = function () {
      modaleChargerGs.style.display = "none";
    };
    document.getElementById("annulerChargerGs").onclick = function () {
      modaleChargerGs.style.display = "none";
    };

  // Modale de sauvegarde du tableau de bord
    var modaleSauvegarderGs = document.getElementById("modaleSauvegarderGs");

    document.getElementsByClassName("close")[3].onclick = function () {
      modaleSauvegarderGs.style.display = "none";
    };
    document.getElementById("annulerSauvegarderGs").onclick = function () {
      modaleSauvegarderGs.style.display = "none";
    };

  // Fermer les modales par un clic sur l'extérieur de la modale
    window.onclick = function (event) {
      if (event.target == modaleZoomG) {
        modaleZoomG.style.display = "none";
        document.getElementById("graphiqueZoome").innerHTML = '';
      }
      if (event.target == modaleConfigG) {
        modaleConfigG.style.display = "none";
        viderFormConfigG();
      }
      if (event.target == modaleCarteB) {
        modaleCarteB.style.display = "none";
      }
      if (event.target == modaleChargerGs) {
        modaleChargerGs.style.display = "none";
      }
      if (event.target == modaleSauvegarderGs) {
        modaleSauvegarderGs.style.display = "none";
      }
    };

  //Liaison des fonctions
  window.onresize = redimensionnerTousLesGraphiques;
  document.getElementById('ajouterG').onclick = function(){
    modaleCarteB.style.display = "flex";
    //Pour charger correctement toute la carte
    carteBarrages.invalidateSize();
  };
  //document.getElementById('supprimerTousGs').onclick = supprimerTousLesGraphiques;
  document.getElementById('chargerGs').onclick = function () {
    modaleChargerGs.style.display = "flex";
  };

  document.getElementById('sauvegarderGs').onclick = function () {
    modaleSauvegarderGs.style.display = "flex";
  };

  //Fonctions

  function redimensionnerTousLesGraphiques() {
    var elements = grille.el.children;
    if (document.body.clientWidth < 1480) {
      for (var i = 0; i < elements.length; ++i) {
        grille.minWidth(elements[i], 5);
      }
    }
    if (document.body.clientWidth > 1480 && document.body.clientWidth < 1810) {
      for (var i = 0; i < elements.length; ++i) {
        grille.minWidth(elements[i], 4);
      }
    }
    if (document.body.clientWidth > 1810) {
      for (var i = 0; i < elements.length; ++i) {
        grille.minWidth(elements[i], 3);
      }
    }
  }

  function redimensionnerGraphique(element) {
    if (document.body.clientWidth < 1480) {
      grille.minWidth(element, 5);
    }
    if (document.body.clientWidth > 1480 && document.body.clientWidth < 1810) {
      grille.minWidth(element, 4);
    }
    if (document.body.clientWidth > 1810) {
      grille.minWidth(element, 3);
    }
  }

  // Génère un champ liste déroulante à choix multiple
  function genererChampsSelect(listeOptions, listeValeurs) {
    return {
      options: listeOptions,
      value: listeValeurs,
      multiple: true, // default: false
      autocomplete: true,
      classNames: {
        select: "select-pure__select",
        dropdownShown: "select-pure__select--opened",
        multiselect: "select-pure__select--multiple",
        label: "select-pure__label",
        placeholder: "select-pure__placeholder",
        dropdown: "select-pure__options",
        option: "select-pure__option",
        autocompleteInput: "select-pure__autocomplete",
        selectedLabel: "select-pure__selected-label",
        selectedOption: "select-pure__option--selected",
        placeholderHidden: "select-pure__placeholder--hidden",
        optionHidden: "select-pure__option--hidden",
      },
      inlineIcon: false, // custom cross icon for multiple select.
      icon: "fa fa-times" // uses Font Awesome
    };
  }

  // Etabli ou ouvre la modale servant à configurer un graphique
  function configurerGraphique(numBarrage) {
    var cibles = controlleur.SelectionnerCibles(numBarrage);
    barrages = new SelectPure("#barragesConcernes", genererChampsSelect(cibles.barragesOptions, cibles.barragesSelectionnes));
    modaleCarteB.style.display = "none";
    modaleConfigG.style.display = "flex";
    document.getElementById("barrageOnglet").click();
  }

  //Vide les formulaires de la modale configuration d'un graphique
  function viderFormConfigG() {
    document.getElementById('titreB').value = '';
    document.getElementById('titreT').value = '';
    document.getElementById('typeBatonB').checked = true;
    document.getElementById('typeBatonT').checked = true;
    document.getElementById('mesureXB').value = '';
    document.getElementById('mesureYB').value = '';
    document.getElementById('mesureXT').value = '';
    document.getElementById('mesureYT').value = '';
    document.getElementById('dateDebutB').valueAsDate = new Date();
    document.getElementById('dateFinB').valueAsDate = new Date();
    document.getElementById('dateDebutT').valueAsDate = new Date();
    document.getElementById('dateFinT').valueAsDate = new Date();
    document.getElementById('barragesConcernes').innerHTML = '';
    document.getElementById('turbinesConcernees').innerHTML = '';
  }

  //Créé et ajoute le graphique configuré à la grille
  function confirmerAjoutG() {
    var donnees;

    if (document.getElementById('barrage').classList.contains('active')) {
      let tempsReel;
      tempsReel = false;
      if (document.getElementById("tempsReelB").checked == true)
        tempsReel = true;
      
      donnees = {
        'titre': document.getElementById('titreB').value,
        'typeG': document.querySelector('input[name=typeGRadioB]:checked').value,
        'tempsReel': tempsReel,
        'mesureX': document.getElementById('mesureXB').value,
        'mesureY': document.getElementById('mesureYB').value,
        'dateDebut': document.getElementById('dateDebutB').value,
        'dateFin': document.getElementById('dateFinB').value,
        'cibles': barrages.value(),
      }
    }
    else {
      let tempsReel;
      tempsReel = false;
      if (document.getElementById("tempsReelT").checked == true)
        tempsReel = true;

      donnees = {
        'titre': document.getElementById('titreT').value,
        'typeG': document.querySelector('input[name=typeGRadioT]:checked').value,
        'tempsReel': tempsReel,
        'mesureX': document.getElementById('mesureXT').value,
        'mesureY': document.getElementById('mesureYT').value,
        'dateDebut': document.getElementById('dateDebutT').value,
        'dateFin': document.getElementById('dateFinT').value,
        'cibles': turbines.value(),
      }
    }

    modaleConfigG.style.display = "none";
    var informations = controlleur.AjouterGraphique(donnees);
    if (informations.id != -1) {

      if (nombreGs == 0) {
        document.getElementById('grilleVide').style.display = 'none';
        document.getElementById('grid').style.display = 'block';
      }
      let contenant = '<div class="grid-stack-item" idGraphique="' + informations.id + '" ><div class="grid-stack-item-content"><button type="button" class="supprimerG btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button><canvas class="graphique"></canvas></div></div>';
      var graphique = grille.addWidget(contenant, { width: 4, height: 5, minWidth: 4, minHeight: 4 });
      redimensionnerGraphique(graphique);
      new Chart(document.getElementsByClassName("graphique")[nombreGs], informations.chart);
      graphique.ondblclick = function(){
        agrandirGraphique(informations.chart);
      };
      document.getElementsByClassName("supprimerG")[nombreGs].onclick = supprimerGraphiqueVue;
      ++nombreGs;
    }
    viderFormConfigG();
  }

  //Annule la création d'un graphique et donc son ajout au tableau de bord
  function annulerAjoutG() {
    modaleConfigG.style.display = "none";
    viderFormConfigG();
  }

  // Supprime de la grille un graphique
  function supprimerGraphiqueVue() {
    if (controlleur.SupprimerGraphique(this.parentElement.parentElement.getAttribute("idGraphique")) == true) {
      grille.removeWidget(this.parentElement.parentElement);
      --nombreGs;
      if (nombreGs == 0) {
        document.getElementById('grilleVide').style.display = 'block';
        document.getElementById('grid').style.display = 'none';
      }
    }
  }

  function supprimerTousLesGraphiquesVue() {
    grille.removeAll();
    nombreGs = 0;
    document.getElementById('grilleVide').style.display = 'block'
  }

  //Ouvre la modale de zoom sur un graphique
  function agrandirGraphique(contexte) {
    //grille.removeWidget(this);

    let canvas = document.createElement('canvas');
    new Chart(canvas, contexte);
    document.getElementById("graphiqueZoome").appendChild(canvas);

    modaleZoomG.style.display = "flex"; 
  }

  

  // Carte des barrages

  var carteBarrages = L.map('carteBarrages').setView([44.717657, 4.810037], 7);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmFubnlydmVsIiwiYSI6ImNrNzdibDg2MDA0NGMzZm55ZXN0bzdkazAifQ.JS6naLdyKP8GfgfZBLyoVg'
  }).addTo(carteBarrages);

  var monIcone = L.icon({
    iconUrl: '../ressources/barrage_icone.png', /* Image à FOND TRANSPARENT !! */
    shadowUrl: '', /* Pas obligatoire, mais avec une ombre, ca fait plus pro */
    iconSize: [33, 33],
    //shadowSize: [50, 20],
    iconAnchor: [30, 20],
    //shadowAnchor: [10, 20],
    popupAnchor: [0, -24]
  });

  /*Les marqueurs de barrages*/
  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(1);
    });

  /*L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(2);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(3);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(4);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(5);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(6);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(7);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(8);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(9);
    });

  L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique(10);
    });*/


  //*********************************************** IMPORTER FICHIER ******************************************** */
  //selection du fichier via l'explorateur de fichier
  var fichier;
  document.getElementById("fichierconfiguration").addEventListener("change", function () {
    fichier = this.files[0];
  }, false);

  //clic sur le bouton valider
  validerChargerGs.onclick = function () {
    modaleChargerGs.style.display = "none";
    if (typeof fichier != "undefined") {

      //VERIFIER QUE le dashboard n'est pas vide
      //=> s'il est vide alors demander confirmation a l'utilisateur d'écraser les données
      //=> supprimer les grpahiques présents si l'utilisateur valide
      if (nombreGs != 0) {
        if (confirm("Des données sont encore présente sur le dashboard. Vérifiez que vous les avez bien enregistrées avant d'importer une nouvelle configuration. Dans le cas contraire toutes les données seront perdues. Continuez ?")) {
          
          supprimerTousLesGraphiquesVue();
          
          //chargement du fichier de config => json (méthode asynchrone => Impossible de la mettre ailleurs car genere des erreurs)
          fetch("../../configurations/" + fichier.name)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              //  une fois que les données sont chargées : appeler le controlleur pour generer les données du programme
              var listeGraphique = controlleur.OuvrirFichierConfig(fichier, data);

              //affichage des graphiques récupérés sur le fichier de configuration
              listeGraphique.forEach(function (element, index) {

                if (element.id != -1) {

                  if (nombreGs == 0) {
                    document.getElementById('grilleVide').style.display = 'none';
                    document.getElementById('grid').style.display = 'block';
                  }
                  let contenant = '<div class="grid-stack-item" idGraphique="' + element.id + '" ><div class="grid-stack-item-content"><button type="button" class="supprimerG btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button><canvas class="graphique"></canvas></div></div>';
                  var graphique = grille.addWidget(contenant, { width: 4, height: 5, minWidth: 4, minHeight: 4 });
                  redimensionnerGraphique(graphique);
                  new Chart(document.getElementsByClassName("graphique")[nombreGs], element.chart);
                  graphique.ondblclick = agrandirGraphique;
                  document.getElementsByClassName("supprimerG")[nombreGs].onclick = supprimerGraphiqueVue;
                  ++nombreGs;
                }
              });
            })
        }
      }
      alert('Le chargement a bien été effectué');
    }

  }

  //*********************************************** EXPORTER FICHIER ******************************************** */
  document.getElementById("validerSauvegarderGs").addEventListener("change", function () {
    controlleur.SauvegarderFichierConfig();
    alert("La sauvegarde a bien été effectuée.");
  }, false);
  
});