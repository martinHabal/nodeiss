const express = require('express');
const router = express.Router();
const dbConnection = require('../db/db');

//novy uzivatel, zkopiruje se stavajici tabulka a nahazi se tam z ni data, ta tabulka bude prazdna, proste template
router.post('/signin', function (request, response, next) {

  //funkce pro vytvoreni tabulky s nazvem loginu a pridani loginu do tabulky users
  function createTable() {
    const sqlQuery = `CREATE TABLE IF NOT EXISTS ${login} AS SELECT * FROM timetable`;

    dbConnection.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Chyba při vytváření tabulky: ' + err.stack);
        return;
      }
      console.log(`Tabulka s loginem: ${request.body.login} byla úspěšně vytvořena.`);
    });
  }
  //naplneni zabulky ze sablony
  function fillTAble() {
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

  createTable()
  fillTAble()


});

//login probehne automaticky z cookies nebo po prihlaseni, tedy zatim bez cookies
router.post('/login', (req, res) => {

  // req.session.loggedIn = true;

  let login = req.body.login
  // const userCookie = req.cookies.user;
  // console.log(userCookie)

  // if (userCookie) {
    dbConnection.query(`SELECT * FROM users WHERE login='${login}'`, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(results)
      res.render('chat', { results });
      // dbConnection.close()
      // res.redirect('/chat');
      // res.sendStatus(200);
    })
  // } else {
  //   let results = "Nepřihlášen"
  //   res.render('index', { results });
  // }
  
})


module.exports = router;
//dodelat vlozeni zaznamu do tabulky users
//musim pak osetrit pokud login existuje