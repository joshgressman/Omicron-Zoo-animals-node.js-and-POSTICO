var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zoo_animals';

router.get('/', function(req, res) {
  // Retrieve animals from database
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done(); // we are done with our connection, let's close the connetion, I only have 10!
      // if we don't do done, nothing happens and it doesn't close the connection.

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});


router.post('/', function(req, res){
  var animal = req.body;

  pg.connect(connectionString, function(err,client,done){
    if(err) {
      res.sendStatus(500);
    }
    client.query('INSERT INTO animals (animal_type, number)'
    + 'VALUES($1, $2)',
       [animal.type, animal.number],
       function (err, result) {
         done();
         if(err){
           res.sendStatus(500);
         }
         res.sendStatus(201);
       });
  });
});


module.exports = router;
