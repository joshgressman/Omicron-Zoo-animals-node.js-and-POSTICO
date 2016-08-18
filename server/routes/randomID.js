var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zoo_animals';

var random = function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + 100 - 1) + 1);
    }

    var $3 = random;

router.put('/randomID', function (req, res) {
 var id = req.params.id;
 var animal = req.body;

 pg.connect(connectionString, function (err, client, done) {
   if (err) {
     res.sendStatus(500);
   }
   client.query('UPDATE animals ' +
                 'SET animal_type = $1, ' +
                 'number = $2, ' +
                 'WHERE id = $3',
               [animal.type, animal.number, id],
             function (err, result) {
               done();

               if (err) {
                 console.log('err', err);
                 res.sendStatus(500);
               } else {
                 res.sendStatus(200);
               }
             });
 });
});


module.exports = router;
