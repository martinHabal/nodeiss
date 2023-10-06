const express = require('express');
const router = express.Router();
const dbConnection = require('../db/db');

//novy uzivatel, zkopiruje se stavajici tabulka a nahazi se tam z ni data, ta tabulka bude prazdna, proste template
router.post('/signin', function (request, response, next) {

  //funkce pro vytvoreni tabulky s nazvem loginu a pridani loginu do tabulky users
  function makeSignin() {
    const sqlQuery = `CREATE TABLE ${login} AS SELECT * FROM timetable`;

    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Chyba při vytváření tabulky: ' + err.stack);
        return;
      }
      console.log(`Tabulka s loginem: ${request.body.login} byla úspěšně vytvořena.`);
    });

    const sqlSelectInsert = `INSERT INTO users (login) VALUES ('${login}')`;

    dbConnection.query(sqlSelectInsert, (err, result) => {
      if (err) {
        console.error('Chyba při vkládání loginu do tabulky users: ' + err.stack);
        return;
      }
      console.log(`Do tabulky users byl vložen uživatel ${login}`);
    });
  }

  console.log(`Byl obdržen požadavek na vytvoření taulky s loginem: ${request.body.login}`)

  // Aktualizace záznamu v tabulce
  const login = request.body.login; // ID záznamu, který chcete aktualizovat

  //kontrola tabulky
  let exists;
  const sqlTables = 'SHOW TABLES';

  dbConnection.query(sqlTables, (err, results) => {
    if (err) {
      console.error('Chyba při získávání seznamu tabulek: ' + err.stack);
      return;
    }
  
    console.log('Seznam tabulek:');
    for (const row of results) {
      if(results[row] === login) exists === true
      console.log(row[`Tables_in_${dbConnection.config.database}`]);
    }
    
    // Uzavřete připojení k databázi po získání seznamu tabulek.
    // dbConnection.end();
  });
  
  console.log(exists);
  // dbConnection.query(
  //   `SELECT 1 FROM ${login} LIMIT 1`,
  //   (err, results) => {
  //     if (err) {
  //       console.error(`Chyba při prověření existence tabulky: ${err.message}`);
  //       return;
  //     }
  //     if (results.length === 1) {
  //       console.log(`Tabulka ${login} existuje.`);
  //     } else {
  //       console.log(`Tabulka ${login} neexistuje.`);
  //       makeSignin()
  //     }
  //   }
  // );


});

module.exports = router;
//dodelat vlozeni zaznamu do tabulky users
//musim pak osetrit pokud login existuje