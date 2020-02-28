//Fonctions
function ajouterGraphique()
{
  modaleConfigG.style.display = "block";

  var contenant = '<div class="grid-stack-item"><div class="grid-stack-item-content"><button type="button" id="supprimer" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button><canvas id="g1"></canvas></div></div>';
  var graphique = grille.addWidget(contenant, {width:4, height:4, minWidth:3, minHeight:3});
  redimensionner(graphique);
  new Chart(document.getElementById("g1"), {
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
    ]
  },
  options: {
    title: {
      display: true,
      text: 'World population per region (in millions)'
    }
  }
});
  graphique.ondblclick = agrandirGraphique;
  document.getElementById('supprimer').onclick = supprimerGraphique;
}

function supprimerGraphique()
{

  grille.removeWidget(this.parentElement.parentElement);
  
}

function supprimerTousLesGraphiques()
{
  grille.removeAll();
}

function redimensionner() { 
  var elements = grille.el.children;

  if (document.body.clientWidth > 701 && document.body.clientWidth < 900)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 6);
    }
  }
  if (document.body.clientWidth > 901 && document.body.clientWidth < 1000)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 5);
    }
  }
  if(document.body.clientWidth > 1001)
  {
    for (var i = 0; i < elements.length; ++i) {
      grille.minWidth(elements[i], 4);
    }
  }
}

function redimensionner(element) {
  console.table(element);
  if (document.body.clientWidth > 701 && document.body.clientWidth < 900)
  {
    grille.minWidth(element, 6);
  }
  if (document.body.clientWidth > 901 && document.body.clientWidth < 1000)
  {
    grille.minWidth(element, 5);
  }
  if(document.body.clientWidth > 1001)
  {
    grille.minWidth(element, 4);
  }
}

function agrandirGraphique() { 
  //grille.removeWidget(this);
  //graphOuvert = this;
  modaleZoomGr.style.display = "block";
}

//Main

var grille = GridStack.init();
var graphiqueOuvert = null;
var modaleZoomGr = document.getElementById("modaleZoomGr");
var croixZoomGr = document.getElementsByClassName("close")[0];
var modaleConfigG = document.getElementById("modaleConfigG");
var croixConfigG = document.getElementsByClassName("close")[1];

//Initialisation de la grille
grille.opts.minWidth=700;
redimensionner();

//Lier fonctions
window.onresize = redimensionner;
croixConfigG.onclick = function(){
  modaleConfigG.style.display = "none";
};
croixZoomGr.onclick = function(){
  modaleZoomGr.style.display = "none";
};
window.onclick = function(event){
  if (event.target == modaleZoomGr) {
    modaleZoomGr.style.display = "none";
  }
  if (event.target == modaleConfigG) {
    modaleConfigG.style.display = "none";
  }
};
document.getElementById('ajouter').onclick = ajouterGraphique;
document.getElementById('toutSupprimer').onclick = supprimerTousLesGraphiques;

//console.table(grille);



//Supprimer un graphique
//grille.removeWidget(test);
//Redimensionner un graphique
//grille.resize(test, 6, 4);





var instance = new SelectPure(".cibles-concernes", {
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