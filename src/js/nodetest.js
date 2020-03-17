var http = require('http');
var fichierhtml = require("../html/tableau_de_bord.html");

var server = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": 'text/html'});
    res.write(fichierhtml)
    res.end();
});

server.listen(8080);