// routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', // Název nebo IP adresa serveru databáze
  user: 'monty', // Uživatelské jméno
  password: 'monty88', // Heslo
  database: 'timetable', // Název databáze
  port: 3001
});


// Definice rout a obslužných funkcí
router.get('/timetable', (req, res) => {

  connection.query('SELECT * FROM timetable_odd', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)

    res.render('timetable', { results });
  })
  // const scheduleData = {
  //     days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //     timetable: [
  //       ['Math', 'Physics', 'Chemistry', ''],
  //       ['English', 'History', 'Geography', ''],
  //       ['Biology', 'Physics', '', ''],
  //       ['', '', 'Chemistry', ''],
  //       ['Math', 'English', 'History', '']
  //     ]
  //   };
  //     res.render('timetable', { scheduleData });
});
// new timetable
router.get('/newtimetable', (req, res) => {
  let data = {
    days: ["Po", "Út", "S", "Čt", "Pá"],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    period: ["odd", "even"],
  }
  res.render('newtimetable', { data });
});

// new timetable
router.get('/admin', (req, res) => {
  connection.query('SELECT * FROM subjects', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    res.render('admin', { results });

  })
});
router.post('/newtimetable', function (request, response, next) {


  console.log(request.body)

  // SQL dotaz pro vložení dat do databáze
  var sql = `INSERT INTO timetable (day, hour, class, period) VALUES ('${request.body.day}', '${request.body.hour}', '${request.body.class}', '${request.body.period}')`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })
  let data = {
    days: ["Po", "Út", "S", "Čt", "Pá"],
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]


  }
  response.render('newtimetable', { data });
  // response.send("hotovo")

})

//update rozvrhu
router.post('/timetableupdate', function (request, response, next) {


  console.log(request.body.id)
  console.log(request.body.data)

  // Aktualizace záznamu v tabulce
const idToUpdate = request.body.id; // ID záznamu, který chcete aktualizovat
const newValues = {
  data: request.body.data
};
  // SQL dotaz pro vložení dat do databáze
  const sqlQuery = 'UPDATE timetable_odd SET ? WHERE id = ?';
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
let newValues;
if(request.body.data === "overtime") {

  newValues = {
    overtime: 1,
    substit: 0,
    dropped: 0,
    doctor: 0
  };
} else if (request.body.data === "substit") {
  newValues = {
    overtime: 0,
    substit: 1,
    dropped: 0,
    doctor: 0
  };
} else if (request.body.data === "dropped") {
  newValues = {
    overtime: 0,
    substit: 0,
    dropped: 1,
    doctor: 0
  };
}else if (request.body.data === "doctor") {
  newValues = {
    overtime: 0,
    substit: 0,
    dropped: 0,
    doctor: 1
  };
}else if (request.body.data === "normal") {
  newValues = {
    overtime: 0,
    substit: 0,
    dropped: 0,
    doctor: 0
  };
}
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
  // response.send("hotovo")

})

// statement
router.get('/statement', (req, res) => {
  connection.query('SELECT * FROM statement', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results)
    res.render('statement', { results });

  })
});

router.get('/iterace', (req, res) => {
  connection.query('SELECT * FROM statement', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    // console.log(results)
    res.render('iterace', { results });

  })
});

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
