//Fonctions
function selectionnerBarrage()
{
  modaleCarteB.style.display = "block";
  //Pour charger correctement toute la carte
  carteBarrages.invalidateSize();
}

function configurerGraphique(barrage){
	modaleCarteB.style.display = "none";
	console.table("barrage");
	modaleConfigG.style.display = "block";
}

function ajouterGraphique(barrage)
{
  if(nombreGs == 0){
    document.getElementById('grilleVide').style.display = 'none'
  }
  //let idSupprimer = "supprimerG"+ nombreGs;
  let contenant = '<div class="grid-stack-item"><div class="grid-stack-item-content"><button type="button" class="supprimerG btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button><canvas class="graphique"></canvas></div></div>';
  var graphique = grille.addWidget(contenant, {width:4, height:5, minWidth:4, minHeight:4});
  redimensionnerGraphique(graphique);
  new Chart(document.getElementsByClassName("graphique")[nombreGs], {
	  type: 'line',
	  data: {
	    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999],
	    datasets: [{ 
	        data: [86,114,106,106,107,111,133,221,783],
	        label: "Africa",
	        borderColor: "#3e95cd",
	        fill: false
	      }, { 
	        data: [282,350,411,502,635,809,947,1402,3700],
	        label: "Asia",
	        borderColor: "#8e5ea2",
	        fill: false
	      }, { 
	        data: [168,170,178,190,203,276,408,547,675],
	        label: "Europe",
	        borderColor: "#3cba9f",
	        fill: false
	      }, { 
	        data: [40,20,10,16,24,38,74,167,508],
	        label: "Latin America",
	        borderColor: "#e8c3b9",
	        fill: false
	      }, { 
	        data: [6,3,2,2,7,26,82,172,312],
	        label: "North America",
	        borderColor: "#c45850",
	        fill: false
	      }
	    ]},
		options: {
			title: {
			  display: true,
			  text: 'World population per region (in millions)'
			}
		}
	});
		graphique.ondblclick = agrandirGraphique;
    document.getElementsByClassName("supprimerG")[nombreGs].onclick = supprimerGraphique;
    ++nombreGs;
	}

function supprimerGraphique()
{

  grille.removeWidget(this.parentElement.parentElement);
  --nombreGs;
  if(nombreGs == 0){
    document.getElementById('grilleVide').style.display = 'block'
  }
}

function supprimerTousLesGraphiques()
{
  grille.removeAll();
  nombreGs=0;
  document.getElementById('grilleVide').style.display = 'block'
}

function redimensionnerTousLesGraphiques() { 
  var elements = grille.el.children;
  //console.table(grille.el.children[0]);
  console.table(document.body.clientWidth);
  if (document.body.clientWidth < 1480)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 5);
    }
  }
  if(document.body.clientWidth > 1480 && document.body.clientWidth < 1810)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 4);
    }
  }
  if(document.body.clientWidth > 1810)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 3);
    }
  }
}

function redimensionnerGraphique(element) {
  if (document.body.clientWidth < 1480)
  {
    grille.minWidth(element, 5);
  }
  if(document.body.clientWidth > 1480 && document.body.clientWidth < 1810)
  {
    grille.minWidth(element, 4);
  }
  if(document.body.clientWidth > 1810)
  {
    grille.minWidth(element, 3);
  }
}

function agrandirGraphique() { 
  //grille.removeWidget(this);
  //graphOuvert = this;
  modaleZoomG.style.display = "block";
}

function viderFormConfigG(){
	//Vider tous les champs
}

function annulerAjoutG(){
	modaleConfigG.style.display = "none";
	viderFormConfigG();
}

function confirmerAjoutG(){
	modaleConfigG.style.display = "none";
	viderFormConfigG();
	ajouterGraphique(barrage);
}

//Main

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

//Initialisation de la grille
grille.opts.minWidth=200;
redimensionnerTousLesGraphiques();

//Lier fonctions
window.onresize = redimensionnerTousLesGraphiques;
document.getElementById('ajouterG').onclick = selectionnerBarrage;
document.getElementById('supprimerTousGs').onclick = supprimerTousLesGraphiques;

//Zoom sur un graphique
croixZoomG.onclick = function(){
  modaleZoomG.style.display = "none";
};

//Choix du barrage sur la carte
croixCarteB.onclick = function(){
  modaleCarteB.style.display = "none";
};
carteBAnnuler.onclick = function(){
  modaleCarteB.style.display = "none";
};

//Configuration du graphique
croixConfigG.onclick = annulerAjoutG;
configGAnnuler.onclick = annulerAjoutG;
configGValider.onclick = confirmerAjoutG;


window.onclick = function(event){
  if (event.target == modaleZoomG) {
    modaleZoomG.style.display = "none";
  }
  if (event.target == modaleConfigG) {
    modaleConfigG.style.display = "none";
  }
  if (event.target == modaleCarteB) {
    modaleCarteB.style.display = "none";
  }
};
//console.table(grille);



//Supprimer un graphique
//grille.removeWidget(test);
//Redimensionner un graphique
//grille.resize(test, 6, 4);





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
    var monMarqueur = L.marker([45.702591, 4.844217], {icon:monIcone},{title:"Barrage de",alt:"",draggable:true})
          .addTo(carteBarrages).on('click', function(e) {
    configurerGraphique("barrage");
});;