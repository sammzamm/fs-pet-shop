'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8000;
const petRegExp = /^\/pets\/(.*)$/;
const petsPath = path.join(__dirname, 'pets.JSON');

var jPets = JSON.parse(require('fs').readFileSync(petsPath, 'utf8'));

const server = http.createServer(function(req, res) {
    res.setHeader('Content-Type', '/json/');
    if (req.method === 'GET' && req.url === '/pets') {
        res.setHeader('Content-Type', '/json/')
        let petsJSON = JSON.stringify(jPets);
        res.end(petsJSON);
    } else if (req.method === "GET" && req.url === '/pets/0') {
        res.setHeader('Content-Type', '/json/')
        let indexPet = jPets[0];
        let petsJSON = JSON.stringify(indexPet);
        res.end(petsJSON)
    } else if (req.method === "GET" && req.url === '/pets/1') {
        res.setHeader('Content-Type', '/json/')
        let indexPet = jPets[1];
        let petsJSON = JSON.stringify(indexPet);
        res.end(petsJSON)
    } else if (req.method === "GET") {
res.setHeader('Content-Type', 'text/plain');
res.statusCode = 404;
res.end('Not Found');
  }
});


server.listen(port, function() {
    console.log('Listening on port', port);
});


module.exports = server;
