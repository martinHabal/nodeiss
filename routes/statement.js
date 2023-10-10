const express = require('express');
const router = express.Router();
const dbConnection = require('../db/db');

//vykaz
router.get('/statement', (req, res) => {
    dbConnection.query('SELECT * FROM statement', (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      // console.log(results)
      res.render('statement', { results });
  
    })
  });

  //update tridy ve vykazu
router.post('/statementupdate', function (request, response, next) {


    console.log(request.body.id)
    console.log(request.body.data)
  
    // Aktualizace záznamu v tabulce
    const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
    const newValues = {
      class: request.body.data
    };
    // SQL dotaz pro vložení dat do databáze
    const sqlQuery = 'UPDATE statement SET ? WHERE id = ?';
    dbConnection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
      if (err) {
        console.error('Chyba při aktualizaci záznamu: ' + err.stack);
        return;
      }
      console.log('Záznam byl úspěšně aktualizován.');
    });
  
    // response.render('newtimetable', { data });
    // response.send("hotovo")
  
  })

//update atributu rozvrhu
router.post('/atributupdate', function (request, response, next) {


    console.log("req" + request.body.data)
    console.log(request.body.id)
  
    // Aktualizace záznamu v tabulce
    const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
    let newValues = {
      state: request.body.data
    };
  
    // SQL dotaz pro vložení dat do databáze
    const sqlQuery = 'UPDATE statement SET ? WHERE id = ?';
    dbConnection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
      if (err) {
        console.error('Chyba při aktualizaci záznamu: ' + err.stack);
        return;
      }
      console.log('Změna záznamu s id: ' + idToUpdate + ' atributu proběhla úspěšně. Atribut byl nahrazen těmito daty: ' + request.body.data);
    });
  
  
    // response.render('newtimetable', { data });
    response.send("hotovo")
  
  })
  
module.exports = router;