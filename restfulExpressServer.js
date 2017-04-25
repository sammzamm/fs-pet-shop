'use strict'

var express = require('express')
var app = express()
var path = require('path')
var pathArray = path.join(__dirname, 'pets.json');
var fs = require('fs')
var url = require('url')
app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
var morgan = require('morgan');
app.use(morgan('short'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/pets', function(req, res, next) {
   fs.readFile(pathArray, 'utf8', function (err, data){
      if (err) throw err;
      res.send(JSON.parse(data))
   })
})

app.get('/pets/:index', function(req, res) {
    var index = Number.parseInt(req.params.index);
    fs.readFile('pets.json', 'utf8', (err, data) => {
        let parsedData = JSON.parse(data)
        if (Number.isNaN(index) || index < 0 || index >= parsedData.length) {
            return res.sendStatus(404);
        }
        res.send(parsedData[index]);
    })
})

app.post('/pets', function(req, res, next){
   var pet = req.body
   if (!pet || pet.name === ''){
      return res.sendStatus(400)
   } else {
      fs.readFile(pathArray, 'utf8', function (err, data){
         if (err) throw err;
         let pets = JSON.parse(data)
         pets.push(pet)
         fs.writeFile(pathArray, JSON.stringify(pets), function(err){
            if (err) throw err;
         })
      })
      res.send(pet)
   }
})

app.patch('/pets/1', function(req, res, next){
   let pet = req.body
   if (!pet || pet.name === ''){
      return res.sendStatus(400)
   }
   else if (pet.kind === undefined) {
      fs.readFile(pathArray, 'utf8', function (err, data){
         if (err) throw err;
         let pets = JSON.parse(data)
         let newPet = pets[1]
         newPet.age = pet.age
         pet = pets[1]
         res.send(pet)
          fs.writeFile(pathArray, JSON.stringify(pets), function(err){
            if (err) throw err;
         })
      })
   }
   else {
      fs.readFile(pathArray, 'utf8', function (err, data){
         if (err) throw err;
         let pets = JSON.parse(data)
         pets.splice(1, 0, pet)
         fs.writeFile(pathArray, JSON.stringify(pets), function(err){
            if (err) throw err;
         })
      })
   res.send(pet)
   }
})

app.delete('/pets/:index', function(req, res) {
    fs.readFile(pathArray, 'utf8', function(err, data) {
        if (err) throw err;
        let index = Number.parseInt(req.params.index)
        var pet = JSON.parse(data)
        if (Number.isNaN(index) || index < 0 || index >= pet.length) {
            return res.sendStatus(404);
        }
        let deletedPet = pet.splice(index, 1);
        let petJson = JSON.stringify(deletedPet)
        fs.writeFile(pathArray, petJson, (writeErr) => {
            if (writeErr) throw writeErr
            res.send(deletedPet[0])
        })
    })
})

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
module.exports = app
