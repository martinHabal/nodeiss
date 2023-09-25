// routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', // Název nebo IP adresa serveru databáze
  user: 'mh', // Uživatelské jméno
  password: 'befelemepeseveze44', // Heslo
  database: 'timetable', // Název databáze
  port: 3001
});



// router.post('/newtimetable', function (request, response, next) {


//   console.log(request.body)

//   // SQL dotaz pro vložení dat do databáze
//   var sql = `INSERT INTO timetable (day, hour, class, period) VALUES ('${request.body.day}', '${request.body.hour}', '${request.body.class}', '${request.body.period}')`;

//   connection.query(sql, (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     console.log(results);
//   })
//   let data = {
//     days: ["Po", "Út", "S", "Čt", "Pá"],
//     hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


//   }
//   response.render('newtimetable', { data });
//   // response.send("hotovo")

// })

// //update rozvrhu
// router.post('/timetableupdate', function (request, response, next) {


//   console.log(request.body.id)
//   console.log(request.body.data)

//   // Aktualizace záznamu v tabulce
//   const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
//   const newValues = {
//     data: request.body.data
//   };
//   // SQL dotaz pro vložení dat do databáze
//   const sqlQuery = 'UPDATE timetable_odd SET ? WHERE id = ?';

//   connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
//     if (err) {
//       console.error('Chyba při aktualizaci záznamu: ' + err.stack);
//       return;
//     }
//     console.log('Hodina s id ' + idToUpdate + 'byla nahrazena ' + request.body.data);
//   });
// });
//update rozvrhu
router.post('/firstDaySet', function (request, response, next) {


  console.log(request.body.id)
  console.log(request.body.data)

  // Aktualizace záznamu v tabulce
  const idToUpdate = 'day'; // ID záznamu, který chcete aktualizovat
  const newValues = {
    first_day: request.body.data
  };
  // SQL dotaz pro vložení dat do databáze
  const sqlQuery = 'UPDATE main SET ? WHERE id = ?';

  connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
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
  connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
    if (err) {
      console.error('Chyba při aktualizaci záznamu: ' + err.stack);
      return;
    }
    console.log('Změna záznamu s id: ' + idToUpdate + ' atributu proběhla úspěšně. Atribut byl nahrazen těmito daty: ' + request.body.data);
  });


  // response.render('newtimetable', { data });
  response.send("hotovo")

})



router.get('/iterace', (req, res) => {
  connection.query('SELECT * FROM statement', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    res.render('iterace', { results });

  })
});


//update tridy
router.post('/iteraceupdate', function (request, response, next) {


  console.log(request.body.id)
  console.log(request.body.data)

  // Aktualizace záznamu v tabulce
  const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
  const newValues = {
    class: request.body.data
  };
  // SQL dotaz pro vložení dat do databáze
  const sqlQuery = 'UPDATE statement SET ? WHERE id = ?';
  connection.query(sqlQuery, [newValues, idToUpdate], (err, result) => {
    if (err) {
      console.error('Chyba při aktualizaci záznamu: ' + err.stack);
      return;
    }
    console.log('Záznam byl úspěšně aktualizován.');
  });


  // response.render('newtimetable', { data });
  // response.send("hotovo")

})
// Exportování routeru
module.exports = router;
