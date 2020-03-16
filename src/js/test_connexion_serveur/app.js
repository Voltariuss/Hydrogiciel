var http = require('http');
var fs = require('fs');
var com = require('./CommunicationServeur.js')

const ComServeur = new com.CommunicationServeur(8080);

console.log(ComServeur);

ComServeur.init();

ComServeur.print();