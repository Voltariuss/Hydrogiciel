//Main
document.addEventListener("DOMContentLoaded", function (event) {

  //controlleur
  var controlleur = new Controller();

  var grille = GridStack.init();
  var graphiqueOuvert = null;
  var nombreGs = 0;

  var modaleZoomG = document.getElementById("modaleZoomG");
  var croixZoomG = document.getElementsByClassName("close")[0];

  var modaleCarteB = document.getElementById("modaleCarteB");
  var croixCarteB = document.getElementsByClassName("close")[1];
  var carteBAnnuler = document.getElementById("annulerCarteB");

  var modaleConfigG = document.getElementById("modaleConfigG");
  var croixConfigG = document.getElementsByClassName("close")[2];
  var configGAnnuler = document.getElementById("annulerAjoutG");
  var configGValider = document.getElementById("validerAjoutG");

  var modaleChargerGs = document.getElementById("modaleChargerGs");
  var croixChargerGs = document.getElementsByClassName("close")[3];
  var annulerChargerGs = document.getElementById("annulerChargerGs");
  var validerChargerGs = document.getElementById("validerChargerGs");

  //Initialisation de la grille
  grille.opts.minWidth = 200;
  redimensionnerTousLesGraphiques();

  //Liaison des fonctions
  window.onresize = redimensionnerTousLesGraphiques;
  document.getElementById('ajouterG').onclick = selectionnerBarrage;
  //document.getElementById('supprimerTousGs').onclick = supprimerTousLesGraphiques;
  document.getElementById('chargerGs').onclick = function () {
    modaleChargerGs.style.display = "block";
  };

  //Zoom sur un graphique
  croixZoomG.onclick = function () {
    modaleZoomG.style.display = "none";
  };

  //Choix du barrage sur la carte
  croixCarteB.onclick = function () {
    modaleCarteB.style.display = "none";
  };
  carteBAnnuler.onclick = function () {
    modaleCarteB.style.display = "none";
  };

  //Configuration du graphique
  croixConfigG.onclick = annulerAjoutG;
  configGAnnuler.onclick = annulerAjoutG;
  configGValider.onclick = confirmerAjoutG;

  //Chargement des graphiques enregistrés
  croixChargerGs.onclick = function () {
    modaleChargerGs.style.display = "none";
  };
  annulerChargerGs.onclick = function () {
    modaleChargerGs.style.display = "none";
  };
  validerChargerGs.onclick = function () {
    modaleChargerGs.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modaleZoomG) {
      modaleZoomG.style.display = "none";
    }
    if (event.target == modaleConfigG) {
      modaleConfigG.style.display = "none";
    }
    if (event.target == modaleCarteB) {
      modaleCarteB.style.display = "none";
    }
    if (event.target == modaleChargerGs) {
      modaleChargerGs.style.display = "none";
    }
  };


  //Fonctions
  function selectionnerBarrage() {
    modaleCarteB.style.display = "block";
    //Pour charger correctement toute la carte
    carteBarrages.invalidateSize();
  }

  function configurerGraphique(barrage) {
    modaleCarteB.style.display = "none";
    console.table("barrage");
    modaleConfigG.style.display = "block";
  }

  function supprimerGraphiqueVue() {
    if (controlleur.SupprimerGraphique(this.parentElement.parentElement.getAttribute("idGraphique")) == true) {
      grille.removeWidget(this.parentElement.parentElement);
      --nombreGs;
      if (nombreGs == 0) {
        document.getElementById('grilleVide').style.display = 'block'
      }
    }
  }

  function supprimerTousLesGraphiquesVue() {
    grille.removeAll();
    nombreGs = 0;
    document.getElementById('grilleVide').style.display = 'block'
  }

  function redimensionnerTousLesGraphiques() {
    var elements = grille.el.children;
    //console.table(grille.el.children[0]);
    console.table(document.body.clientWidth);
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

  function agrandirGraphique() {
    //grille.removeWidget(this);
    //graphOuvert = this;
    modaleZoomG.style.display = "block";
  }

  function viderFormConfigG() {
    //Vider tous les champs
  }

  function annulerAjoutG() {
    modaleConfigG.style.display = "none";
    viderFormConfigG();
  }

  function confirmerAjoutG() {

    var donnees = {
      'titre': document.getElementById('titre').value,
      'typeG': document.querySelector('input[name=typeGRadioB]:checked').value,
      'tempsReel': '',
      'mesureX': document.getElementById('mesureX').value,
      'mesureY': document.getElementById('mesureY').value,
      'dateDebut': document.getElementById('dateDebut').value,
      'dateFin': document.getElementById('dateFin').value,
      'cibles': '',
    }

    document.getElementById('tempsReel').value;




    modaleConfigG.style.display = "none";
    viderFormConfigG();
    informations = controlleur.AjouterGraphique(donnees);
    if (informations.id != -1) {

      if (nombreGs == 0) {
        document.getElementById('grilleVide').style.display = 'none'
      }
      let contenant = '<div class="grid-stack-item" idGraphique="' + informations.id + '" ><div class="grid-stack-item-content"><button type="button" class="supprimerG btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button><canvas class="graphique"></canvas></div></div>';
      var graphique = grille.addWidget(contenant, { width: 4, height: 5, minWidth: 4, minHeight: 4 });
      redimensionnerGraphique(graphique);
      new Chart(document.getElementsByClassName("graphique")[nombreGs], informations.chart);
      graphique.ondblclick = agrandirGraphique;
      document.getElementsByClassName("supprimerG")[nombreGs].onclick = supprimerGraphiqueVue;
      ++nombreGs;

    }
  }

  var instance = new SelectPure(".ciblesConcernees", {
    options: [
      {
        label: "New York",
        value: "NY",
      },
      {
        label: "Washington",
        value: "WA",
      },
      {
        label: "California",
        value: "CA",
      },
      {
        label: "New Jersey",
        value: "NJ",
      },
      {
        label: "North Carolina",
        value: "NC",
      },
    ],
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
  });


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
  var monMarqueur = L.marker([45.702591, 4.844217], { icon: monIcone }, { title: "Barrage de", alt: "", draggable: true })
    .addTo(carteBarrages).on('click', function (e) {
      configurerGraphique("barrage");
    });;
});