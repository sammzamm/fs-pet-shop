'use strict' // just because
const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8000;  //where app lives in server externally or port 8000 locally
const http = require('http');
const petsPath = path.join(__dirname, 'pets.json') //seeks correct path for directory name

let app = express();  //express

// fs.readFile(petsPath, 'utf8', (err, petsData) => {
//     if (err) {
//         throw err;
//     } else {
//         let parsedPets = JSON.parse(petsData)
//         app.get('/pets', (req, res) => {
//                 console.log(req);
//         })
//       }
// })

app.get('/pets', (req, res)=>{  //http req for path
  fs.readFile(petsPath, 'utf8', (err, petsData)=>{ //http read req to access json file in db
    if (err) { //err handling
      throw err;
    }else {
      res.status(200);  //status code
      res.send(JSON.parse(petsData)); //parsed data
    }
  })
  // res.end();  //use while testing if unsure of response getting back
})


app.get('/pets/:id', (req, res)=>{
  fs.readFile(petsPath, 'utf8', (err, petsData)=>{ //reading file
    var petsJSON = JSON.parse(petsData); //parse as a var to access array vs string characters
    if (err) {
      throw err;
    }else if (req.params.id == 0) {
      // console.log(JSON.parse(petsData)[0]);
      res.status(200);
      res.send(petsJSON[0])
    } else if (req.params.id == 1) {
      res.status(200);
      res.send(petsJSON[1])
    }else {
      res.set('Content-Type', 'text/plain');
      res.status(404);
      res.send('Not Found');
    }
  })
})

app.listen(port);

module.exports = app;
