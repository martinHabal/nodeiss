const express = require('express');
const router = express.Router();

const dbConnection = require('../db/db');

router.get('/timetable', (req, res) => {

    if (req.cookies.user) {
      const userCookie = req.cookies.user;
      const table = userCookie.toLowerCase() + "_statement"
      dbConnection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
        if (error) {
          console.error(error);
          return;
        }
        // console.log(results)
        var data = {
          results: results,
          userLogged: table,
        };
  
        res.render('timetable', { data });
  
      })
    } else {
  
      var data = {
        results: results,
        userLogged: table,
      };
  
      res.render('timetable', { data });
    }
  });
  
  
  
  //update rozvrhu
  router.post('/timetableupdate', function (request, response, next) {
  
    const userCookie = request.cookies.user;
    const table = userCookie.toLowerCase() + "_statement"
  
    console.log(request.body.id)
    console.log(request.body.data)
  
    // Aktualizace záznamu v tabulce
    const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
    const newValues = {
      class: request.body.data
    };
    // SQL dotaz pro vložení dat do databáze
    const sqlQuery = `UPDATE ${table} SET ? WHERE id = ?`;
  
    connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
      if (err) {
        console.error('Chyba při aktualizaci záznamu: ' + err.stack);
        return;
      }
      console.log('Hodina s id ' + idToUpdate + 'byla nahrazena ' + request.body.data);
    });
  });
  
module.exports = router;