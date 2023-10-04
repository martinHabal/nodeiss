// routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');//NPM I MYSQL2//konektor na DB
const cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost', // Název nebo IP adresa serveru databáze
  user: 'mh', // Uživatelské jméno
  password: 'befelemepeseveze44', // Heslo
  database: 'timetable', // Název databáze
  port: 3001
});


router.get('/timetable', (req, res) => {

  const userCookie = req.cookies.user;
  const table = userCookie.toLowerCase() + "_statement"
  if(userCookie){
  connection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
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
    let results = "Nepřihlášen" 
    res.render('timetable', { results });
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
//index
router.get('/', (req, res) => {

  const userCookie = req.cookies.user;
  console.log(userCookie)
  if (userCookie) {
    connection.query(`SELECT * FROM users WHERE login='${userCookie}'`, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      // console.log(results)
      res.render('index', { results });
    })
  } else {
    let results = "Nepřihlášen" 
    res.render('index', { results });
  }
})



//novy uzivatel, zkopiruje se stavajici tabulka a nahazi se tam z ni data, ta tabulka bude prazdna, proste template
router.post('/signin', function (request, response, next) {
  
  // CREATE TABLE nový_zákazník LIKE zákazníci;
  // INSERT INTO nový_zákazník SELECT * FROM zákazníci;

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
});

//vykaz
router.get('/statement', (req, res) => {
  connection.query('SELECT * FROM statement', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    // console.log(results)
    res.render('statement', { results });

  })
});


//update tridy
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
router.post('/loadStatement', (req, res) => {


  // Vytvoření dotazu
  const sql = `
    SELECT
      id,
      class,
      state
    FROM
      timetable
    WHERE
        id IN (
          SELECT
            id
          FROM
            statement);
  `;



  // Spuštění dotazu
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results)
    // Aktualizace tabulky
    const updateSql = `
      UPDATE statement
      SET
        class = ?,
        state = ?
      WHERE
        id = ?;
    `;

    for (const result of results) {
      connection.query(
        updateSql,
        [result.class, result.id, result.id],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log("Data byla aktualizována");
        },
      );
    }
  });
});

router.post('/loadStatement2', (req, res) => {


  connection.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Vytvoření dotazu k výběru dat
    const selectSql = `
      SELECT
        *
      FROM
        timetable
      WHERE
        id IN (
          SELECT
            id
          FROM
            statement
        );
    `;

    // Spuštění dotazu
    connection.query(selectSql, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      // Aktualizace dat
      for (const result of results) {
        console.log(result.class)
        const updateSql = `
          UPDATE statement
          SET
            class = '${result.class}'
          WHERE
            id = ?;
        `;

        connection.query(
          updateSql,
          [result.id + 8],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log("Data byla duplikovana");
          },
        );
      }
    });


  });



  // // Spuštění dotazu
  // connection.query(sql, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(results)
  //   // Aktualizace tabulky
  //   const updateSql = `
  //     UPDATE statement
  //     SET
  //       class = ?,
  //       state = ?
  //     WHERE
  //       id = ?;
  //   `;

  //   for (const result of results) {
  //     connection.query(
  //       updateSql,
  //       [result.class, result.id, result.id],
  //       (err, results) => {
  //         if (err) {
  //           console.log(err);
  //           return;
  //         }

  //         console.log("Data byla aktualizována");
  //       },
  //     );
  //   }
  // });
});
// });
module.exports = router;
